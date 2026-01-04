'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Shield, ShieldCheck, ShieldAlert, ShieldX, 
  Check, AlertTriangle, X, ChevronRight, 
  Image, Type, MousePointer, Palette, FileText,
  RefreshCw, Store, Info, Lightbulb, Zap
} from 'lucide-react';

// Compliance Rules Database
export const COMPLIANCE_RULES_DB = {
  tesco: {
    name: 'Tesco',
    logo: '🏪',
    color: '#00539f',
    rules: {
      logoMinSize: 15,
      logoMaxSize: 30,
      textMinContrast: 4.5,
      requiredElements: ['product_image', 'price', 'cta'],
      forbiddenWords: ['best', 'guaranteed', 'miracle', 'cure'],
      maxTextPercentage: 40,
      ctaRequired: true,
      priceRequired: true
    }
  },
  bigbasket: {
    name: 'BigBasket',
    logo: '🛒',
    color: '#84c225',
    rules: {
      logoMinSize: 10,
      logoMaxSize: 25,
      textMinContrast: 4.5,
      requiredElements: ['product_image', 'brand_logo'],
      forbiddenWords: ['cheap', 'lowest', 'free'],
      maxTextPercentage: 35,
      ctaRequired: true,
      priceRequired: false
    }
  },
  amazon: {
    name: 'Amazon',
    logo: '📦',
    color: '#ff9900',
    rules: {
      logoMinSize: 12,
      logoMaxSize: 20,
      textMinContrast: 4.5,
      requiredElements: ['product_image'],
      forbiddenWords: ['amazon', 'prime', 'best seller', 'guaranteed'],
      maxTextPercentage: 30,
      ctaRequired: false,
      priceRequired: true
    }
  },
  flipkart: {
    name: 'Flipkart',
    logo: '🛍️',
    color: '#2874f0',
    rules: {
      logoMinSize: 10,
      logoMaxSize: 22,
      textMinContrast: 4.5,
      requiredElements: ['product_image', 'price'],
      forbiddenWords: ['flipkart', 'big billion', 'lowest'],
      maxTextPercentage: 35,
      ctaRequired: true,
      priceRequired: true
    }
  }
};

export interface ComplianceResult {
  passed: Array<{ rule: string; message: string }>;
  warnings: Array<{ rule: string; message: string; fix: string }>;
  failed: Array<{ rule: string; message: string; fix: string }>;
  score: number;
  suggestions: string[];
}

interface AdvancedCompliancePanelProps {
  canvas: any | null;
  selectedRetailer: string;
  onRetailerChange: (retailer: string) => void;
}

// Check compliance function
export function checkAdvancedCompliance(canvas: any, retailer: string = 'tesco'): ComplianceResult {
  const config = COMPLIANCE_RULES_DB[retailer as keyof typeof COMPLIANCE_RULES_DB] || COMPLIANCE_RULES_DB.tesco;
  const rules = config.rules;
  
  const results: ComplianceResult = {
    passed: [],
    warnings: [],
    failed: [],
    score: 0,
    suggestions: []
  };

  if (!canvas) {
    results.failed.push({ rule: 'canvas', message: 'Canvas not available', fix: 'Wait for canvas to load' });
    return results;
  }

  const objects = canvas.getObjects();
  const textObjects = objects.filter((obj: any) => obj.type === 'i-text' || obj.type === 'text' || obj.type === 'textbox');
  const imageObjects = objects.filter((obj: any) => obj.type === 'image');

  // Check 1: Product Image
  if (imageObjects.length > 0) {
    results.passed.push({ rule: 'product_image', message: 'Product image present' });
  } else {
    results.failed.push({ rule: 'product_image', message: 'No product image found', fix: 'Add a product image to your design' });
  }

  // Check 2: CTA Text
  const allText = textObjects.map((t: any) => (t.text || '').toLowerCase()).join(' ');
  const ctaWords = ['shop', 'buy', 'order', 'get', 'now', 'add to cart', 'discover'];
  const hasCTA = ctaWords.some(word => allText.includes(word));
  
  if (rules.ctaRequired) {
    if (hasCTA) {
      results.passed.push({ rule: 'cta', message: 'Call-to-action detected' });
    } else {
      results.warnings.push({ rule: 'cta', message: 'No clear CTA found', fix: 'Add a CTA like "Shop Now" or "Buy Now"' });
    }
  }

  // Check 3: Price Display
  const pricePattern = /[₹$€£]\s*\d+|(\d+)\s*(off|%)/i;
  const hasPrice = pricePattern.test(allText);
  
  if (rules.priceRequired) {
    if (hasPrice) {
      results.passed.push({ rule: 'price', message: 'Price/offer displayed' });
    } else {
      results.warnings.push({ rule: 'price', message: 'No price information', fix: 'Add price or discount information' });
    }
  }

  // Check 4: Text Coverage
  const canvasArea = canvas.width * canvas.height;
  let textArea = 0;
  textObjects.forEach((obj: any) => {
    textArea += (obj.width * (obj.scaleX || 1)) * (obj.height * (obj.scaleY || 1));
  });
  const textCoverage = (textArea / canvasArea) * 100;
  
  if (textCoverage <= rules.maxTextPercentage) {
    results.passed.push({ rule: 'text_coverage', message: `Text coverage: ${textCoverage.toFixed(1)}%` });
  } else {
    results.failed.push({ 
      rule: 'text_coverage', 
      message: `Text coverage too high (${textCoverage.toFixed(1)}%)`,
      fix: `Reduce text to under ${rules.maxTextPercentage}%`
    });
  }

  // Check 5: Forbidden Words
  const foundForbidden = rules.forbiddenWords.filter(word => allText.includes(word.toLowerCase()));
  if (foundForbidden.length === 0) {
    results.passed.push({ rule: 'forbidden_words', message: 'No prohibited words' });
  } else {
    results.failed.push({ 
      rule: 'forbidden_words', 
      message: `Contains prohibited words: ${foundForbidden.join(', ')}`,
      fix: 'Remove or replace prohibited words'
    });
  }

  // Check 6: Readability (text size)
  const smallText = textObjects.filter((t: any) => (t.fontSize || 12) * (t.scaleY || 1) < 12);
  if (smallText.length === 0) {
    results.passed.push({ rule: 'readability', message: 'All text is readable' });
  } else {
    results.warnings.push({ 
      rule: 'readability', 
      message: `${smallText.length} text element(s) too small`,
      fix: 'Increase font size to at least 12px'
    });
  }

  // Calculate score
  const totalChecks = results.passed.length + results.warnings.length + results.failed.length;
  results.score = totalChecks > 0 ? Math.round((results.passed.length / totalChecks) * 100) : 0;

  // Add suggestions
  if (results.score < 70) {
    results.suggestions.push('Add more visual elements for better engagement');
  }
  if (!hasCTA) {
    results.suggestions.push('Strong CTAs can increase click-through rates by 30%');
  }
  if (imageObjects.length < 2) {
    results.suggestions.push('Consider adding supporting images or icons');
  }

  return results;
}

const AdvancedCompliancePanel: React.FC<AdvancedCompliancePanelProps> = ({
  canvas,
  selectedRetailer,
  onRetailerChange
}) => {
  const [results, setResults] = useState<ComplianceResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const runCheck = useCallback(() => {
    setIsChecking(true);
    setTimeout(() => {
      const complianceResults = checkAdvancedCompliance(canvas, selectedRetailer);
      setResults(complianceResults);
      setIsChecking(false);
    }, 500);
  }, [canvas, selectedRetailer]);

  useEffect(() => {
    if (canvas) {
      runCheck();
    }
  }, [canvas, selectedRetailer, runCheck]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-emerald-500 to-green-500';
    if (score >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-rose-500';
  };

  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      {/* Retailer Selector */}
      <div className="p-4 border-b border-white/[0.06]">
        <label className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 block">Platform</label>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(COMPLIANCE_RULES_DB).map(([key, config]) => (
            <button
              key={key}
              onClick={() => onRetailerChange(key)}
              className={`flex items-center gap-2 p-2.5 rounded-lg transition-all ${
                selectedRetailer === key
                  ? 'bg-violet-500/20 border border-violet-500/50 ring-1 ring-violet-500/20'
                  : 'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06]'
              }`}
            >
              <span className="text-lg">{config.logo}</span>
              <span className={`text-xs font-medium ${selectedRetailer === key ? 'text-white' : 'text-gray-400'}`}>
                {config.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Score Card */}
      {results && (
        <div className="p-4 border-b border-white/[0.06]">
          <div className="relative p-4 rounded-xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06] overflow-hidden">
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${getScoreGradient(results.score)} opacity-5`} />
            
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">Compliance Score</p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${getScoreColor(results.score)}`}>
                    {results.score}
                  </span>
                  <span className="text-lg text-gray-500">/ 100</span>
                </div>
              </div>
              
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getScoreGradient(results.score)} flex items-center justify-center shadow-lg`}>
                {results.score >= 80 ? (
                  <ShieldCheck size={28} className="text-white" />
                ) : results.score >= 60 ? (
                  <ShieldAlert size={28} className="text-white" />
                ) : (
                  <ShieldX size={28} className="text-white" />
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${getScoreGradient(results.score)} transition-all duration-500`}
                style={{ width: `${results.score}%` }}
              />
            </div>
          </div>

          <button
            onClick={runCheck}
            disabled={isChecking}
            className="w-full mt-3 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-sm transition-all disabled:opacity-50"
          >
            <RefreshCw size={14} className={isChecking ? 'animate-spin' : ''} />
            {isChecking ? 'Checking...' : 'Re-check Compliance'}
          </button>
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="p-4 space-y-4">
          {/* Passed */}
          {results.passed.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Check size={12} className="text-emerald-400" />
                </div>
                <span className="text-xs font-medium text-emerald-400">Passed ({results.passed.length})</span>
              </div>
              <div className="space-y-1.5">
                {results.passed.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                    <Check size={12} className="text-emerald-500 shrink-0" />
                    <span className="text-xs text-gray-300">{item.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Warnings */}
          {results.warnings.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <AlertTriangle size={12} className="text-yellow-400" />
                </div>
                <span className="text-xs font-medium text-yellow-400">Warnings ({results.warnings.length})</span>
              </div>
              <div className="space-y-1.5">
                {results.warnings.map((item, i) => (
                  <div key={i} className="px-3 py-2 rounded-lg bg-yellow-500/5 border border-yellow-500/10">
                    <div className="flex items-start gap-2">
                      <AlertTriangle size={12} className="text-yellow-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-300">{item.message}</p>
                        <p className="text-[10px] text-yellow-500/80 mt-1">💡 {item.fix}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Failed */}
          {results.failed.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center">
                  <X size={12} className="text-red-400" />
                </div>
                <span className="text-xs font-medium text-red-400">Failed ({results.failed.length})</span>
              </div>
              <div className="space-y-1.5">
                {results.failed.map((item, i) => (
                  <div key={i} className="px-3 py-2 rounded-lg bg-red-500/5 border border-red-500/10">
                    <div className="flex items-start gap-2">
                      <X size={12} className="text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-300">{item.message}</p>
                        <p className="text-[10px] text-red-500/80 mt-1">⚡ {item.fix}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {results.suggestions.length > 0 && (
            <div className="p-3 rounded-lg bg-violet-500/5 border border-violet-500/10">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb size={14} className="text-violet-400" />
                <span className="text-xs font-medium text-violet-400">Pro Tips</span>
              </div>
              <ul className="space-y-1.5">
                {results.suggestions.map((suggestion, i) => (
                  <li key={i} className="text-[11px] text-gray-400 flex items-start gap-2">
                    <span className="text-violet-400">•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Loading State */}
      {isChecking && !results && (
        <div className="flex items-center justify-center py-12">
          <RefreshCw size={24} className="text-violet-400 animate-spin" />
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
      `}</style>
    </div>
  );
};

export default AdvancedCompliancePanel;
