import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { apiKey } = body

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      )
    }

    // Try to initialize Gemini with the key
    const ai = new GoogleGenAI({ apiKey })

    // Try to list models to validate the key
    const models = await ai.models.list()

    // If we get here, the key is valid
    return NextResponse.json({
      valid: true,
      message: 'API Key hợp lệ'
    })
  } catch (error: any) {
    console.error('Error validating API key:', error)

    if (error.message?.includes('API key') || error.message?.includes('401')) {
      return NextResponse.json(
        { error: 'API Key không hợp lệ hoặc đã hết hạn' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: 'Không thể kiểm tra API Key' },
      { status: 500 }
    )
  }
}
