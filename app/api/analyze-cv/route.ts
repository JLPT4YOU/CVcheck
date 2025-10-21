import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI, createPartFromUri, createUserContent } from '@google/genai'
import type { CVAnalysisResult, AnalysisRequest } from '@/types/cv-analysis'
import { buildOptimizedPrompt } from '@/lib/prompts'

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

    // Build optimized prompt using best practices
    const prompt = buildOptimizedPrompt(
      responseLanguage as any,
      jobDescription.jobTitle,
      jobDescription.jobDescription,
      jobDescription.requiredSkills,
      jobDescription.experienceLevel
    )

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
