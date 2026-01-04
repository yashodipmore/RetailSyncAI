import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image_file') as File;
    
    if (!imageFile) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_REMOVEBG_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Remove.bg API key not configured' }, { status: 500 });
    }

    // Create form data for Remove.bg API
    const removeBgFormData = new FormData();
    removeBgFormData.append('image_file', imageFile);
    removeBgFormData.append('size', 'auto');

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
      },
      body: removeBgFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Remove.bg API error:', errorText);
      return NextResponse.json({ error: 'Failed to remove background' }, { status: response.status });
    }

    // Get the image as blob and convert to base64
    const imageBlob = await response.blob();
    const arrayBuffer = await imageBlob.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const dataUrl = `data:image/png;base64,${base64}`;

    return NextResponse.json({ 
      success: true, 
      image: dataUrl,
      message: 'Background removed successfully'
    });

  } catch (error) {
    console.error('Error removing background:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
