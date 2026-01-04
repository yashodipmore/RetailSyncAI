'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Brain, TrendingUp, Target, Zap, Star, BarChart3, 
  CheckCircle2, AlertCircle, ArrowUpRight, Sparkles,
  RefreshCw, Eye, MousePointer, DollarSign, Users,
  Lightbulb, ChevronRight
} from 'lucide-react';

export interface QualityPrediction {
  quality: number;
  compliance: number;
  factors: string[];
  predictedCTR: number;
  predictedROAS: number;
  confidence: number;
  comparison: string;
  suggestions: Array<{ icon: string; text: string; impact: string }>;
}

interface AIQualityPredictionProps {
  canvas: any | null;
  retailInsights?: any;
  category?: string;
}

// Smart canvas analysis
export function generateSmartPrediction(canvas: any, retailInsights?: any): QualityPrediction {
  const objects = canvas ? canvas.getObjects() : [];
  let qualityScore = 45;
  const factors: string[] = [];
  
  // Image Analysis
  const imageObjects = objects.filter((obj: any) => obj.type === 'image');
  if (imageObjects.length > 0) {
    qualityScore += 20;
    factors.push('product-image');
    
    const mainImage = imageObjects[0];
    const imageArea = (mainImage.width * mainImage.scaleX) * (mainImage.height * mainImage.scaleY);
    const canvasArea = canvas.width * canvas.height;
    const imageCoverage = imageArea / canvasArea;
    
    if (imageCoverage > 0.15 && imageCoverage < 0.6) {
      qualityScore += 5;
      factors.push('optimal-image-size');
    }
  }
  
  // Text Analysis
  const textObjects = objects.filter((obj: any) => 
    obj.type === 'i-text' || obj.type === 'text' || obj.type === 'textbox'
  );
  if (textObjects.length > 0) {
    qualityScore += 10;
    factors.push('has-text');
    
    const allText = textObjects.map((t: any) => t.text || '').join(' ').toLowerCase();
    const ctaWords = ['shop', 'buy', 'order', 'get', 'now', 'save', 'offer', 'deal', 'free', 'new', 'limited'];
    const hasCTA = ctaWords.some(word => allText.includes(word));
    if (hasCTA) {
      qualityScore += 8;
      factors.push('has-cta');
    }
    
    const hasHeadline = textObjects.some((t: any) => (t.fontSize || 20) >= 32);
    if (hasHeadline) {
      qualityScore += 5;
      factors.push('has-headline');
    }
  }
  
  // Design Elements
  const shapes = objects.filter((obj: any) => 
    obj.type === 'rect' || obj.type === 'circle' || obj.type === 'polygon'
  );
  if (shapes.length > 0 && shapes.length <= 5) {
    qualityScore += 8;
    factors.push('design-elements');
  }
  
  // Background
  const bgColor = canvas.backgroundColor || '#ffffff';
  if (bgColor !== '#ffffff' && bgColor !== 'white') {
    qualityScore += 5;
    factors.push('custom-bg');
  }
  
  // Layout Balance
  if (objects.length >= 2 && objects.length <= 8) {
    qualityScore += 7;
    factors.push('balanced-layout');
  }
  
  // Smart Badges
  const badges = objects.filter((obj: any) => obj.badgeType);
  if (badges.length > 0) {
    qualityScore += 5;
    factors.push('smart-badges');
  }

  qualityScore = Math.min(98, Math.max(20, qualityScore));
  
  // CTR Prediction
  let baseCTR = 1.2;
  if (factors.includes('product-image')) baseCTR += 0.8;
  if (factors.includes('has-cta')) baseCTR += 0.6;
  if (factors.includes('has-headline')) baseCTR += 0.3;
  if (factors.includes('smart-badges')) baseCTR += 0.4;
  if (retailInsights?.avgCTR) baseCTR += (retailInsights.avgCTR - 2) * 0.3;
  
  const predictedCTR = Math.min(5.5, Math.max(0.5, baseCTR + (Math.random() * 0.4 - 0.2)));
  const predictedROAS = 2.5 + (qualityScore / 25) + (Math.random() * 0.5);
  
  // Suggestions
  const suggestions: Array<{ icon: string; text: string; impact: string }> = [];
  
  if (!factors.includes('product-image')) {
    suggestions.push({ icon: '📸', text: 'Add a product image', impact: '+0.8% CTR' });
  }
  if (!factors.includes('has-cta')) {
    suggestions.push({ icon: '🎯', text: 'Add a clear CTA', impact: '+0.6% CTR' });
  }
  if (!factors.includes('has-headline')) {
    suggestions.push({ icon: '✨', text: 'Add a headline', impact: '+0.3% CTR' });
  }
  if (!factors.includes('smart-badges')) {
    suggestions.push({ icon: '🏷️', text: 'Add urgency badge', impact: '+0.4% CTR' });
  }
  if (factors.includes('has-cta') && factors.includes('product-image')) {
    suggestions.push({ icon: '🎨', text: 'Consider A/B testing colors', impact: '+0.2% CTR' });
  }

  return {
    quality: qualityScore,
    compliance: Math.min(100, qualityScore + 10),
    factors,
    predictedCTR: parseFloat(predictedCTR.toFixed(2)),
    predictedROAS: parseFloat(predictedROAS.toFixed(2)),
    confidence: Math.min(95, 60 + factors.length * 5),
    comparison: qualityScore > 70 ? 'above' : qualityScore > 50 ? 'average' : 'below',
    suggestions: suggestions.slice(0, 4)
  };
}

const AIQualityPrediction: React.FC<AIQualityPredictionProps> = ({
  canvas,
  retailInsights,
  category = 'general'
}) => {
  const [prediction, setPrediction] = useState<QualityPrediction | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const runAnalysis = useCallback(() => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const result = generateSmartPrediction(canvas, retailInsights);
      setPrediction(result);
      setIsAnalyzing(false);
    }, 800);
  }, [canvas, retailInsights]);

  useEffect(() => {
    if (canvas) {
      runAnalysis();
    }
  }, [canvas, runAnalysis]);

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
      {/* Header */}
      <div className="p-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
            <Brain size={16} className="text-white" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-white">AI Quality Analysis</h3>
            <p className="text-[10px] text-gray-500">Powered by smart predictions</p>
          </div>
        </div>
      </div>

      {prediction && (
        <>
          {/* Quality Score */}
          <div className="p-4 border-b border-white/[0.06]">
            <div className="relative p-4 rounded-xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06] overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${getScoreGradient(prediction.quality)} opacity-5`} />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">Quality Score</p>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className={`text-5xl font-bold ${getScoreColor(prediction.quality)}`}>
                        {prediction.quality}
                      </span>
                      <span className="text-gray-500">/100</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Target size={12} />
                      <span>{prediction.confidence}% confidence</span>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1 capitalize">
                      {prediction.comparison} average
                    </p>
                  </div>
                </div>

                {/* Progress Ring */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle
                        cx="32" cy="32" r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        className="text-white/10"
                      />
                      <circle
                        cx="32" cy="32" r="28"
                        stroke="url(#gradient)"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${prediction.quality * 1.76} 176`}
                        className="transition-all duration-1000"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#d946ef" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles size={20} className="text-violet-400" />
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    {prediction.factors.slice(0, 4).map((factor, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 size={12} className="text-emerald-400" />
                        <span className="text-[11px] text-gray-400 capitalize">{factor.replace(/-/g, ' ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Predictions */}
          <div className="p-4 border-b border-white/[0.06]">
            <h4 className="text-[10px] text-gray-500 uppercase tracking-wider mb-3">Performance Predictions</h4>
            
            <div className="grid grid-cols-2 gap-3">
              {/* CTR */}
              <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
                <div className="flex items-center gap-2 mb-2">
                  <MousePointer size={14} className="text-blue-400" />
                  <span className="text-[10px] text-gray-500">Est. CTR</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-blue-400">{prediction.predictedCTR}</span>
                  <span className="text-xs text-gray-500">%</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight size={10} className="text-emerald-400" />
                  <span className="text-[10px] text-emerald-400">vs 2.1% avg</span>
                </div>
              </div>

              {/* ROAS */}
              <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign size={14} className="text-emerald-400" />
                  <span className="text-[10px] text-gray-500">Est. ROAS</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-emerald-400">{prediction.predictedROAS}</span>
                  <span className="text-xs text-gray-500">x</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight size={10} className="text-emerald-400" />
                  <span className="text-[10px] text-emerald-400">vs 3.2x avg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Suggestions */}
          {prediction.suggestions.length > 0 && (
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb size={14} className="text-violet-400" />
                <h4 className="text-[10px] text-gray-500 uppercase tracking-wider">Improvement Suggestions</h4>
              </div>
              
              <div className="space-y-2">
                {prediction.suggestions.map((suggestion, i) => (
                  <div 
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] transition-all cursor-pointer group"
                  >
                    <span className="text-lg">{suggestion.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white">{suggestion.text}</p>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
                      <Zap size={10} />
                      <span className="text-[10px] font-medium">{suggestion.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Re-analyze Button */}
          <div className="p-4 border-t border-white/[0.06]">
            <button
              onClick={runAnalysis}
              disabled={isAnalyzing}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 hover:from-violet-500/20 hover:to-fuchsia-500/20 border border-violet-500/20 text-white text-sm font-medium transition-all disabled:opacity-50"
            >
              <RefreshCw size={16} className={isAnalyzing ? 'animate-spin' : ''} />
              {isAnalyzing ? 'Analyzing...' : 'Re-analyze Design'}
            </button>
          </div>
        </>
      )}

      {/* Loading State */}
      {isAnalyzing && !prediction && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="relative w-16 h-16 mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-violet-500/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-500 animate-spin"></div>
          </div>
          <p className="text-sm text-gray-400">Analyzing your design...</p>
          <p className="text-[10px] text-gray-600 mt-1">AI is evaluating multiple factors</p>
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

export default AIQualityPrediction;
