import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI, createPartFromUri, createUserContent } from '@google/genai'
import type { CVAnalysisResult, AnalysisRequest } from '@/types/cv-analysis'

export async function POST(request: NextRequest) {
  try {
    const body: AnalysisRequest = await request.json()
    const { jobDescription, cvFileUri, cvMimeType, apiKey, responseLanguage = 'vi', model = 'gemini-2.5-flash' } = body

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      )
    }

    if (!cvFileUri || !cvMimeType || !jobDescription.jobTitle) {
      return NextResponse.json(
        { error: 'CV file and job title are required' },
        { status: 400 }
      )
    }

    // Initialize Google GenAI client with user's API key
    const ai = new GoogleGenAI({ apiKey })

    // Determine language instruction
    const languageInstructions = {
      en: 'You are an HR recruitment expert. Analyze the candidate\'s CV PDF based on the provided job information.',
      vi: 'Bạn là một chuyên gia tuyển dụng HR. Hãy phân tích CV PDF của ứng viên dựa trên thông tin công việc được cung cấp.',
      ja: 'あなたはHR採用の専門家です。提供された会社情報に基づいて、候補者のCV PDFを分析してください。'
    }

    // Construct the prompt for Gemini
    const prompt = `
${languageInstructions[responseLanguage as keyof typeof languageInstructions]}

**THÔNG TIN CÔNG VIỆC:**
- Vị trí: ${jobDescription.jobTitle}
- Mô tả công việc: ${jobDescription.jobDescription}
- Kỹ năng yêu cầu: ${jobDescription.requiredSkills}
- Cấp độ kinh nghiệm: ${jobDescription.experienceLevel}

**YÊU CẦU PHÂN TÍCH:**
Hãy đánh giá CV này (được cung cấp dưới dạng PDF) và trả về kết quả dưới dạng JSON với cấu trúc sau:

{
  "matchScore": <số từ 0-100 đánh giá độ phù hợp>,
  "strengths": [<danh sách các điểm mạnh của ứng viên, tối thiểu 3 điểm>],
  "weaknesses": [<danh sách các điểm yếu hoặc thiếu sót, tối thiểu 2 điểm>],
  "skillsMatch": {
    "matched": [<danh sách kỹ năng ứng viên có khớp với yêu cầu>],
    "missing": [<danh sách kỹ năng còn thiếu>]
  },
  "recommendation": "<khuyến nghị cho HR: nên phỏng vấn/từ chối/cần xem xét thêm>",
  "detailedAnalysis": "<phân tích chi tiết về ứng viên, bao gồm kinh nghiệm, học vấn, và sự phù hợp với vị trí>"
}

CHỈ trả về JSON thuần túy, KHÔNG thêm markdown formatting hoặc text khác.
`

    // Create content with PDF file and prompt
    const contents = createUserContent([
      createPartFromUri(cvFileUri, cvMimeType),
      prompt
    ])

    // Call Gemini with selected model and File API
    const response = await ai.models.generateContent({
      model: model,
      contents: contents
    })

    let text = response.text || ''

    if (!text) {
      throw new Error('No response from Gemini API')
    }

    // Clean up the response - remove markdown code blocks if present
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

    // Parse the JSON response
    const analysisResult: CVAnalysisResult = JSON.parse(text)

    return NextResponse.json(analysisResult)
  } catch (error: any) {
    console.error('Error analyzing CV:', error)
    
    // Handle specific error types
    if (error.message?.includes('API key')) {
      return NextResponse.json(
        { error: 'Invalid API key. Please check your Gemini API key.' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to analyze CV. Please try again.' },
      { status: 500 }
    )
  }
}
