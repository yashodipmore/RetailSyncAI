import { NextRequest, NextResponse } from 'next/server';

// AI Agent API - processes commands and returns executable actions
export async function POST(request: NextRequest) {
  try {
    const groqApiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;
    if (!groqApiKey) {
      return NextResponse.json({ error: 'API key missing' }, { status: 500 });
    }

    const { message, context } = await request.json();

    const systemPrompt = `You are an AI design agent for RetailSync - a retail ad editor. You have FULL CONTROL over the canvas. Parse user commands and return executable actions.

COMPLETE COMMAND LIST:

=== SHAPES ===
addCircle, addRectangle, addTriangle, addStar, addHexagon, addPentagon, addLine

=== TEXT ===
addText (params: {text: "your text"})
addHeading (params: {text: "heading"})
addCurvedText (params: {text: "curved", radius: 100})
addGradientText (params: {text: "gradient"})
addStrokedText (params: {text: "outlined"})

=== BACKGROUND ===
setBackgroundColor (params: {color: "#hexcode"})
blurBackground (params: {amount: 5})
addColorOverlay (params: {color: "#000000", opacity: 0.5})

=== BASIC ACTIONS ===
undo, redo, deleteSelected, duplicateSelected, clear, toggleLock

=== IMAGE OPERATIONS ===
removeBackground - removes background from selected image (keeps image!)
applyFilter (params: {filter: "grayscale/sepia/invert/blur/sharpen/none"})
adjustImage (params: {type: "brightness/contrast/saturation", value: 0-100})
removeImageFilters
maskImageToShape (params: {shape: "circle/triangle/star/hexagon/heart"})
smartObjectFit (params: {mode: "contain/cover/fill"})

=== CROP ===
startCrop - start cropping selected image
applyCrop - apply the crop
cancelCrop - cancel crop mode

=== ARRANGE / LAYERS ===
bringToFront, sendToBack, bringForward, sendBackward

=== TRANSFORM ===
flipHorizontal, flipVertical

=== GROUP ===
groupSelected, ungroupSelected

=== ALIGNMENT ===
alignObject (params: {alignment: "left/center/right/top/middle/bottom"})
distributeHorizontal, distributeVertical, autoArrange

=== FRAMES & BORDERS ===
addDecorativeFrame (params: {style: "simple/double/dashed/rounded/fancy/gradient/neon/shadow/dotted/thick"})
addBorder (params: {color: "#000", width: 2})

=== RETAIL ELEMENTS ===
addPriceTag (params: {price: "₹999"})
addRibbon (params: {text: "SALE"})
addCallout (params: {text: "NEW!"})
addProductPlaceholder (params: {size: "small/medium/large"})

=== SOCIAL & PAYMENT ICONS ===
addSocialIcon (params: {platform: "facebook/instagram/twitter/youtube/whatsapp/linkedin"})
addPaymentIcon (params: {method: "upi/visa/mastercard/cod/paytm/gpay"})

=== EFFECTS ===
addGlow (params: {color: "#fff", blur: 20})
addDropShadow (params: {color: "#000", blur: 10, offsetX: 5, offsetY: 5})
removeShadow
addImageOutline (params: {color: "#fff", width: 3})
addTextShadow (params: {blur: 2, offsetX: 2, offsetY: 2, color: "#000"})
setTextStroke (params: {color: "#000", width: 2})

=== DRAWING ===
enableDrawingMode (params: {color: "#000", size: 5})
disableDrawingMode
setBrushColor (params: {color: "#000"})
setBrushSize (params: {size: 5})
clearDrawing

=== CANVAS ===
setCanvasSize (params: {width: 728, height: 90})
clonePattern (params: {rows: 2, cols: 2, spacingX: 10, spacingY: 10})

=== GRID ===
showGrid (params: {size: 20})
hideGrid
enableSnapToGrid (params: {size: 10})
disableSnapToGrid

=== EXPORT ===
exportImage (params: {format: "png/jpeg/webp", quality: 1})
saveProject, loadProject

COLOR MAP:
red=#ef4444, blue=#3b82f6, green=#22c55e, yellow=#eab308, orange=#f97316
pink=#ec4899, purple=#8b5cf6, violet=#7c3aed, white=#ffffff, black=#000000
gray=#6b7280, tesco_blue=#00539F, tesco_red=#EE1C2E, gold=#fbbf24, cyan=#06b6d4

CONTEXT: Canvas ${context?.canvas || '728x90'}, Background ${context?.bg || '#fff'}, Objects ${context?.objects || 0}, Selected ${context?.selected || 'none'}

RESPONSE FORMAT (strict JSON):
{
  "response": "Short professional message describing what you're doing",
  "actions": [
    {"type": "category", "description": "Button label", "command": "commandName", "params": {...}}
  ]
}

CRITICAL RULES:
1. "remove background" / "bg remove" / "background hata" = removeBackground (NOT deleteSelected!)
2. "delete" / "remove this" / "hata de" = deleteSelected
3. Always use exact command names from the list above
4. For colors, convert names to hex codes from COLOR MAP
5. Can return multiple actions for complex requests
6. Keep response professional and concise

EXAMPLES:
"add a red circle" → addCircle + setBackgroundColor or just addCircle
"remove background" → removeBackground
"delete this" → deleteSelected
"make it bigger" → (need specific resize - ask user)
"add SALE text with shadow" → addText + addTextShadow
"blue background with white text saying 50% OFF" → setBackgroundColor + addText`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.2,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      console.error('Groq error:', await response.text());
      return NextResponse.json({ error: 'AI failed' }, { status: 500 });
    }

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content || '{}';

    try {
      const parsed = JSON.parse(content);
      return NextResponse.json({
        success: true,
        response: parsed.response || 'Done!',
        actions: parsed.actions || [],
      });
    } catch {
      return NextResponse.json({ success: true, response: content, actions: [] });
    }

  } catch (error) {
    console.error('AI Agent error:', error);
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}
