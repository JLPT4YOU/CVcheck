import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const apiKey = formData.get('apiKey') as string

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      )
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are supported' },
        { status: 400 }
      )
    }

    // Initialize Google GenAI client
    const ai = new GoogleGenAI({ apiKey })

    // Convert file to buffer for upload
    const bytes = await file.arrayBuffer()
    const fileBlob = new Blob([bytes], { type: 'application/pdf' })

    // Upload file using File API
    const uploadedFile = await ai.files.upload({
      file: fileBlob,
      config: {
        displayName: file.name,
        mimeType: 'application/pdf'
      }
    })

    if (!uploadedFile.name) {
      throw new Error('Failed to get uploaded file name')
    }

    // Wait for file to be processed
    let getFile = await ai.files.get({ name: uploadedFile.name })
    let attempts = 0
    const maxAttempts = 30 // 30 seconds max wait

    while (getFile.state === 'PROCESSING' && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      getFile = await ai.files.get({ name: uploadedFile.name })
      attempts++
    }

    if (getFile.state === 'FAILED') {
      return NextResponse.json(
        { error: 'File processing failed' },
        { status: 500 }
      )
    }

    if (getFile.state === 'PROCESSING') {
      return NextResponse.json(
        { error: 'File processing timeout' },
        { status: 408 }
      )
    }

    return NextResponse.json({
      fileUri: uploadedFile.uri,
      mimeType: uploadedFile.mimeType,
      fileName: uploadedFile.name,
      displayName: uploadedFile.displayName,
      state: getFile.state
    })
  } catch (error: any) {
    console.error('Error uploading PDF:', error)
    
    if (error.message?.includes('API key')) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to upload PDF' },
      { status: 500 }
    )
  }
}
