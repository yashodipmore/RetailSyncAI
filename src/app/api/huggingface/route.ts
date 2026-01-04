import { NextRequest, NextResponse } from 'next/server';

// Using Groq API for AI text generation (FREE & FAST)
// HuggingFace image APIs are deprecated/paid, so we use Groq for text

export async function POST(request: NextRequest) {
  try {
    const groqApiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;
    
    if (!groqApiKey) {
      return NextResponse.json({ error: 'Groq API key not configured' }, { status: 500 });
    }

    const body = await request.json();
    const { task, prompt } = body;

    switch (task) {
      case 'generate':
        // For image generation - return helpful message
        return NextResponse.json({ 
          error: 'AI Image generation requires paid API. Use stock images from Pexels instead!',
          suggestion: 'Use the Stock Images section in the sidebar'
        }, { status: 400 });

      case 'generate-copy':
        // AI Ad Copy Generation using Groq (FREE!)
        const copyResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${groqApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              {
                role: 'system',
                content: 'You are an expert advertising copywriter. Generate short, punchy ad copy for retail banners. Keep responses under 50 words. Be creative and persuasive.'
              },
              {
                role: 'user',
                content: prompt || 'Generate a catchy headline and tagline for a sale banner'
              }
            ],
            max_tokens: 150,
            temperature: 0.8,
          }),
        });

        if (!copyResponse.ok) {
          const errorText = await copyResponse.text();
          console.error('Groq API error:', errorText);
          return NextResponse.json({ error: 'AI copy generation failed' }, { status: 500 });
        }

        const copyResult = await copyResponse.json();
        const generatedCopy = copyResult.choices?.[0]?.message?.content || '';

        return NextResponse.json({
          success: true,
          result: generatedCopy,
          task: 'generate-copy',
        });

      case 'suggest-colors':
        // AI Color Palette Suggestion
        const colorResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${groqApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              {
                role: 'system',
                content: 'You are a design expert. Suggest color palettes for retail ads. Return ONLY a JSON array of 5 hex color codes, nothing else. Example: ["#FF5733", "#33FF57", "#3357FF", "#F3FF33", "#FF33F3"]'
              },
              {
                role: 'user',
                content: prompt || 'Suggest a modern, energetic color palette for a sale banner'
              }
            ],
            max_tokens: 100,
            temperature: 0.7,
          }),
        });

        if (!colorResponse.ok) {
          return NextResponse.json({ error: 'Color suggestion failed' }, { status: 500 });
        }

        const colorResult = await colorResponse.json();
        const colorText = colorResult.choices?.[0]?.message?.content || '[]';
        
        // Parse colors from response
        let colors: string[] = [];
        try {
          const match = colorText.match(/\[[\s\S]*\]/);
          if (match) {
            colors = JSON.parse(match[0]);
          }
        } catch {
          colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
        }

        return NextResponse.json({
          success: true,
          result: colors,
          task: 'suggest-colors',
        });

      case 'improve-text':
        // Improve/rewrite existing text
        const improveResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${groqApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              {
                role: 'system',
                content: 'You are an expert copywriter. Improve the given text to make it more compelling for retail advertising. Keep it concise. Return ONLY the improved text, nothing else.'
              },
              {
                role: 'user',
                content: `Improve this ad text: "${prompt}"`
              }
            ],
            max_tokens: 100,
            temperature: 0.7,
          }),
        });

        if (!improveResponse.ok) {
          return NextResponse.json({ error: 'Text improvement failed' }, { status: 500 });
        }

        const improveResult = await improveResponse.json();
        const improvedText = improveResult.choices?.[0]?.message?.content || prompt;

        return NextResponse.json({
          success: true,
          result: improvedText.replace(/^["']|["']$/g, ''), // Remove quotes if any
          task: 'improve-text',
        });

      case 'caption':
      case 'remove-bg':
      case 'enhance':
        return NextResponse.json({ 
          error: 'This feature requires paid API credits. Use Remove.bg button instead for background removal.',
        }, { status: 400 });

      default:
        return NextResponse.json({ error: 'Invalid task specified' }, { status: 400 });
    }

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
