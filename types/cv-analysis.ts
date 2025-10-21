export interface JobDescription {
  jobTitle: string
  jobDescription: string
  requiredSkills: string
  experienceLevel: string
}

export interface CVAnalysisResult {
  matchScore: number
  strengths: string[]
  weaknesses: string[]
  skillsMatch: {
    matched: string[]
    missing: string[]
  }
  recommendation: string
  detailedAnalysis: string
}

export interface AnalysisRequest {
  jobDescription: JobDescription
  cvFileUri?: string
  cvMimeType?: string
  apiKey: string
  responseLanguage?: 'en' | 'vi' | 'ja'
  model?: string
}
