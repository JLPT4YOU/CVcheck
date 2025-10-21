'use client'

import { useState, useEffect } from 'react'
import { FileText, Sparkles, Upload, CheckCircle, AlertCircle, Save, Trash2, Check, X, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { useLanguage } from '@/lib/language-context'
import type { JobDescription, CVAnalysisResult } from '@/types/cv-analysis'
import type { Language } from '@/lib/translations'

export default function Home() {
  const { language, setLanguage, t } = useLanguage()
  const [apiKey, setApiKey] = useState('')
  const [keyStatus, setKeyStatus] = useState<'idle' | 'valid' | 'invalid'>('idle')
  const [validating, setValidating] = useState(false)
  const [jobData, setJobData] = useState<JobDescription>({
    jobTitle: '',
    jobDescription: '',
    requiredSkills: '',
    experienceLevel: ''
  })
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [cvFileUri, setCvFileUri] = useState('')
  const [cvMimeType, setCvMimeType] = useState('')
  const [uploading, setUploading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<CVAnalysisResult | null>(null)
  const [error, setError] = useState('')

  // Load API key from localStorage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key')
    if (savedKey) {
      setApiKey(savedKey)
    }
  }, [])

  // Save API key to localStorage
  const handleSaveKey = () => {
    if (!apiKey.trim()) {
      setError('Vui lòng nhập API Key')
      return
    }
    localStorage.setItem('gemini_api_key', apiKey)
    setError('')
  }

  // Delete API key from localStorage
  const handleDeleteKey = () => {
    localStorage.removeItem('gemini_api_key')
    setApiKey('')
    setKeyStatus('idle')
    setError('')
  }

  // Validate API key
  const handleValidateKey = async () => {
    if (!apiKey.trim()) {
      setError('Vui lòng nhập API Key')
      return
    }

    setValidating(true)
    setError('')

    try {
      const response = await fetch('/api/validate-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ apiKey })
      })

      if (response.ok) {
        setKeyStatus('valid')
      } else {
        setKeyStatus('invalid')
        const data = await response.json()
        setError(data.error || 'API Key không hợp lệ')
      }
    } catch (err: any) {
      setKeyStatus('invalid')
      setError('Không thể kiểm tra API Key. Vui lòng thử lại.')
    } finally {
      setValidating(false)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      setError('Chỉ hỗ trợ file PDF')
      return
    }

    if (!apiKey) {
      setError('Vui lòng nhập API Key trước khi upload CV')
      return
    }

    setCvFile(file)
    setUploading(true)
    setError('')

    // Upload PDF using File API
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('apiKey', apiKey)

      const response = await fetch('/api/extract-pdf', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to upload PDF')
      }

      const data = await response.json()
      setCvFileUri(data.fileUri)
      setCvMimeType(data.mimeType)
    } catch (err: any) {
      setError(err.message || 'Không thể upload file PDF. Vui lòng thử lại.')
      setCvFile(null)
      setCvFileUri('')
      setCvMimeType('')
    } finally {
      setUploading(false)
    }
  }

  const handleAnalyze = async () => {
    if (!apiKey) {
      setError('Vui lòng nhập Gemini API Key')
      return
    }

    if (!cvFileUri || !cvMimeType) {
      setError('Vui lòng upload CV')
      return
    }

    if (!jobData.jobTitle || !jobData.jobDescription) {
      setError('Vui lòng nhập đầy đủ thông tin công việc')
      return
    }

    setAnalyzing(true)
    setError('')

    try {
      const response = await fetch('/api/analyze-cv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jobDescription: jobData,
          cvFileUri,
          cvMimeType,
          apiKey
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to analyze CV')
      }

      const analysisResult: CVAnalysisResult = await response.json()
      setResult(analysisResult)
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra. Vui lòng thử lại.')
    } finally {
      setAnalyzing(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-600'
    if (score >= 60) return 'bg-yellow-600'
    return 'bg-red-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">CV Checker AI</h1>
          </div>
          <p className="text-lg text-gray-600">
            Phân tích CV ứng viên bằng Gemini AI - Hỗ trợ HR đưa ra quyết định tuyển dụng chính xác
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* API Key */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Gemini API Key
                </CardTitle>
                <CardDescription>
                  Nhập API key của bạn từ{' '}
                  <a
                    href="https://makersuite.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Google AI Studio
                  </a>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    type="password"
                    placeholder="AIza..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="flex-1"
                  />
                </div>
                
                {/* Status indicator */}
                {keyStatus === 'valid' && (
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <Check className="w-4 h-4" />
                    <span>API Key hợp lệ ✓</span>
                  </div>
                )}
                {keyStatus === 'invalid' && (
                  <div className="flex items-center gap-2 text-red-600 text-sm">
                    <X className="w-4 h-4" />
                    <span>API Key không hợp lệ</span>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={handleValidateKey}
                    disabled={validating || !apiKey}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    {validating ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-1 animate-spin" />
                        Kiểm tra...
                      </>
                    ) : (
                      <>Check Key</>
                    )}
                  </Button>
                  <Button
                    onClick={handleSaveKey}
                    disabled={!apiKey}
                    variant="default"
                    size="sm"
                    className="flex-1"
                  >
                    <Save className="w-4 h-4 mr-1" />
                    Lưu
                  </Button>
                  <Button
                    onClick={handleDeleteKey}
                    disabled={!apiKey}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Job Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Thông tin công việc
                </CardTitle>
                <CardDescription>
                  Mô tả vị trí tuyển dụng và yêu cầu
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="jobTitle">Vị trí tuyển dụng *</Label>
                  <Input
                    id="jobTitle"
                    placeholder="VD: Frontend Developer"
                    value={jobData.jobTitle}
                    onChange={(e) => setJobData({ ...jobData, jobTitle: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="jobDescription">Mô tả công việc *</Label>
                  <Textarea
                    id="jobDescription"
                    placeholder="Mô tả chi tiết về công việc, trách nhiệm..."
                    rows={4}
                    value={jobData.jobDescription}
                    onChange={(e) => setJobData({ ...jobData, jobDescription: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="skills">Kỹ năng yêu cầu</Label>
                  <Textarea
                    id="skills"
                    placeholder="VD: React, TypeScript, Node.js, Git..."
                    rows={3}
                    value={jobData.requiredSkills}
                    onChange={(e) => setJobData({ ...jobData, requiredSkills: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Kinh nghiệm yêu cầu</Label>
                  <Input
                    id="experience"
                    placeholder="VD: 2-3 năm kinh nghiệm"
                    value={jobData.experienceLevel}
                    onChange={(e) => setJobData({ ...jobData, experienceLevel: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* CV Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload CV
                </CardTitle>
                <CardDescription>
                  Tải lên CV của ứng viên (định dạng PDF)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="cv-upload"
                    disabled={uploading || !apiKey}
                  />
                  <label htmlFor="cv-upload" className={uploading || !apiKey ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}>
                    {uploading ? (
                      <div className="flex items-center justify-center gap-2 text-blue-600">
                        <Sparkles className="w-5 h-5 animate-spin" />
                        <span className="font-medium">Đang upload...</span>
                      </div>
                    ) : cvFile ? (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">{cvFile.name}</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-8 h-8 mx-auto text-gray-400" />
                        <p className="text-sm text-gray-600">
                          {!apiKey ? 'Nhập API Key trước' : 'Click để chọn file PDF'}
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </CardContent>
            </Card>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <Button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="w-full"
              size="lg"
            >
              {analyzing ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                  Đang phân tích...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Phân tích CV
                </>
              )}
            </Button>
          </div>

          {/* Results Section */}
          <div>
            {result ? (
              <div className="space-y-6">
                {/* Match Score */}
                <Card>
                  <CardHeader>
                    <CardTitle>Độ phù hợp</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className={`text-6xl font-bold mb-2 ${getScoreColor(result.matchScore)}`}>
                        {result.matchScore}%
                      </div>
                      <Progress value={result.matchScore} className="h-3" />
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendation */}
                <Card className="border-l-4 border-l-blue-600">
                  <CardHeader>
                    <CardTitle>Khuyến nghị</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{result.recommendation}</p>
                  </CardContent>
                </Card>

                {/* Skills Match */}
                <Card>
                  <CardHeader>
                    <CardTitle>Kỹ năng</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-700 mb-2">✓ Kỹ năng phù hợp</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.skillsMatch.matched.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    {result.skillsMatch.missing.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-orange-700 mb-2">⚠ Kỹ năng còn thiếu</h4>
                        <div className="flex flex-wrap gap-2">
                          {result.skillsMatch.missing.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Strengths */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-700">Điểm mạnh</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.strengths.map((strength, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Weaknesses */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-700">Điểm cần cải thiện</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.weaknesses.map((weakness, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Detailed Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle>Phân tích chi tiết</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {result.detailedAnalysis}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="h-full flex items-center justify-center bg-gray-50">
                <CardContent className="text-center py-16">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    Kết quả phân tích sẽ hiển thị ở đây
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
