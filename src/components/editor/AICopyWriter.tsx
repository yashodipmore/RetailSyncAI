'use client';

import React, { useState, useCallback } from 'react';
import { 
  Sparkles, Wand2, Copy, Check, Loader2, X, 
  Type, MessageSquare, Tag, Megaphone, ShoppingBag,
  Zap, RefreshCw, Star
} from 'lucide-react';

// Groq API Configuration
const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY || '';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

// Prompt templates for different ad copy types
const COPY_TEMPLATES = {
  headline: {
    name: 'Headlines',
    icon: Type,
    description: 'Catchy headlines',
    promptPrefix: 'Generate 5 short, catchy ad headlines (max 6-8 words each) for:',
  },
  tagline: {
    name: 'Taglines',
    icon: Tag,
    description: 'Brand taglines',
    promptPrefix: 'Generate 5 memorable, punchy taglines (max 5-7 words each) for:',
  },
  cta: {
    name: 'CTA',
    icon: Megaphone,
    description: 'Call to action',
    promptPrefix: 'Generate 5 compelling call-to-action button texts (2-4 words each) for:',
  },
  description: {
    name: 'Description',
    icon: MessageSquare,
    description: 'Product descriptions',
    promptPrefix: 'Generate 3 short, persuasive product descriptions (max 20 words each) for:',
  },
  offer: {
    name: 'Offer',
    icon: ShoppingBag,
    description: 'Sale copy',
    promptPrefix: 'Generate 5 exciting offer/sale announcement texts (max 10 words each) for:',
  },
};

type CopyType = keyof typeof COPY_TEMPLATES;

interface AICopyWriterProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertText: (text: string) => void;
  selectedText?: string;
}

const AICopyWriter: React.FC<AICopyWriterProps> = ({
  isOpen,
  onClose,
  onInsertText,
  selectedText = '',
}) => {
  const [activeType, setActiveType] = useState<CopyType>('headline');
  const [prompt, setPrompt] = useState(selectedText);
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateCopy = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a product/brand description');
      return;
    }

    if (!GROQ_API_KEY) {
      setError('Groq API key not configured');
      return;
    }

    setLoading(true);
    setError(null);
    setResults([]);

    const template = COPY_TEMPLATES[activeType];
    const fullPrompt = `${template.promptPrefix} "${prompt}"

Rules:
- Be creative and engaging
- Use power words that evoke emotion
- Keep it concise and impactful
- Make it suitable for retail/e-commerce ads
- No hashtags or emojis
- Return ONLY the generated texts, one per line, numbered 1-5
- Do not include any explanations`;

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            {
              role: 'system',
              content: 'You are an expert advertising copywriter. Create compelling, concise ad copy. Respond with only the requested copy, no explanations.'
            },
            { role: 'user', content: fullPrompt }
          ],
          temperature: 0.8,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || 'Failed to generate copy');
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content || '';
      
      const lines = content
        .split('\n')
        .map((line: string) => line.replace(/^\d+[\.\)]\s*/, '').trim())
        .filter((line: string) => line.length > 0 && line.length < 200);

      setResults(lines.slice(0, 5));
    } catch (err: any) {
      setError(err.message || 'Failed to generate copy');
      console.error('Groq API error:', err);
    } finally {
      setLoading(false);
    }
  }, [prompt, activeType]);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleInsert = (text: string) => {
    onInsertText(text);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#1a1a24] rounded-xl border border-white/10 w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-purple-400" />
            <h2 className="text-base font-semibold text-white">AI Copy Writer</h2>
            <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded">Groq</span>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-lg">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Copy Type Tabs */}
        <div className="flex gap-1 px-4 py-2 border-b border-white/5 bg-black/20">
          {(Object.entries(COPY_TEMPLATES) as [CopyType, typeof COPY_TEMPLATES[CopyType]][]).map(([key, template]) => {
            const Icon = template.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveType(key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeType === key
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {template.name}
              </button>
            );
          })}
        </div>

        {/* Input */}
        <div className="p-4 border-b border-white/5">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your product, brand, or offer..."
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500/50 resize-none h-20"
          />
          
          {/* Quick suggestions */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {['Fresh groceries', 'Fashion sale', 'Tech gadgets', 'Organic food'].map((s) => (
              <button
                key={s}
                onClick={() => setPrompt(s)}
                className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-xs text-gray-400 hover:text-white"
              >
                {s}
              </button>
            ))}
          </div>

          <button
            onClick={generateCopy}
            disabled={loading || !prompt.trim()}
            className="w-full mt-3 py-2 bg-purple-500 text-white text-sm font-medium rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate
              </>
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mx-4 mt-3 p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs">
            {error}
          </div>
        )}

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4">
          {results.length > 0 ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400" />
                  Generated results
                </span>
                <button
                  onClick={generateCopy}
                  disabled={loading}
                  className="flex items-center gap-1 px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-xs text-gray-400 hover:text-white"
                >
                  <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                  Regenerate
                </button>
              </div>

              {results.map((result, index) => (
                <div
                  key={index}
                  className="group p-3 bg-white/5 border border-white/10 rounded-lg hover:border-purple-500/30"
                >
                  <p className="text-white text-sm mb-2">{result}</p>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleInsert(result)}
                      className="flex-1 py-1.5 bg-purple-500 text-white text-xs font-medium rounded hover:bg-purple-600 flex items-center justify-center gap-1"
                    >
                      <Zap className="w-3 h-3" />
                      Add to Canvas
                    </button>
                    <button
                      onClick={() => copyToClipboard(result, index)}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs rounded flex items-center gap-1"
                    >
                      {copiedIndex === index ? (
                        <><Check className="w-3 h-3 text-green-400" /> Copied</>
                      ) : (
                        <><Copy className="w-3 h-3" /> Copy</>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : !loading && (
            <div className="flex flex-col items-center justify-center h-32 text-center">
              <Wand2 className="w-8 h-8 text-purple-400/50 mb-2" />
              <p className="text-gray-500 text-sm">Enter description and generate</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-white/10 bg-black/20">
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <Zap className="w-3 h-3 text-purple-400" />
            Powered by Groq LLaMA 3.3 70B
          </p>
        </div>
      </div>
    </div>
  );
};

export default AICopyWriter;
