'use client';

import React, { useState } from 'react';
import { Palette, X, TrendingUp, Users, Sparkles, Grid3X3, Tag, Crown, Leaf, Cpu, UtensilsCrossed, Search, Star } from 'lucide-react';

export interface Template {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  avgCTR: number;
  uses: number;
  elements: {
    backgroundColor: string;
    primaryColor: string;
    layout: 'minimal' | 'bold' | 'premium' | 'modern';
    fontPrimary: string;
    fontSecondary: string;
    hasCTA: boolean;
    hasPrice: boolean;
    ctaText: string;
  };
}

// Template Database
export const TEMPLATE_MARKETPLACE: Template[] = [
  {
    id: 'tpl-001',
    name: 'Clean Minimal',
    category: 'minimal',
    thumbnail: '/templates/minimal.png',
    avgCTR: 2.8,
    uses: 1240,
    elements: {
      backgroundColor: '#ffffff',
      primaryColor: '#7c3aed',
      layout: 'minimal',
      fontPrimary: 'Poppins, sans-serif',
      fontSecondary: 'Inter, sans-serif',
      hasCTA: true,
      hasPrice: false,
      ctaText: 'Shop Now'
    }
  },
  {
    id: 'tpl-002',
    name: 'Bold Sale',
    category: 'sale',
    thumbnail: '/templates/bold.png',
    avgCTR: 3.4,
    uses: 2100,
    elements: {
      backgroundColor: '#1a1a2e',
      primaryColor: '#ef4444',
      layout: 'bold',
      fontPrimary: 'Oswald, sans-serif',
      fontSecondary: 'Inter, sans-serif',
      hasCTA: true,
      hasPrice: true,
      ctaText: 'Buy Now'
    }
  },
  {
    id: 'tpl-003',
    name: 'Premium Gold',
    category: 'premium',
    thumbnail: '/templates/premium.png',
    avgCTR: 2.6,
    uses: 890,
    elements: {
      backgroundColor: '#0f172a',
      primaryColor: '#f59e0b',
      layout: 'premium',
      fontPrimary: 'Playfair Display, serif',
      fontSecondary: 'Inter, sans-serif',
      hasCTA: true,
      hasPrice: false,
      ctaText: 'Discover'
    }
  },
  {
    id: 'tpl-004',
    name: 'Fresh Green',
    category: 'organic',
    thumbnail: '/templates/green.png',
    avgCTR: 2.9,
    uses: 760,
    elements: {
      backgroundColor: '#ecfdf5',
      primaryColor: '#059669',
      layout: 'modern',
      fontPrimary: 'Poppins, sans-serif',
      fontSecondary: 'Inter, sans-serif',
      hasCTA: true,
      hasPrice: true,
      ctaText: 'Order Now'
    }
  },
  {
    id: 'tpl-005',
    name: 'Electric Blue',
    category: 'tech',
    thumbnail: '/templates/blue.png',
    avgCTR: 3.1,
    uses: 1450,
    elements: {
      backgroundColor: '#0c0c1d',
      primaryColor: '#3b82f6',
      layout: 'modern',
      fontPrimary: 'Inter, sans-serif',
      fontSecondary: 'Inter, sans-serif',
      hasCTA: true,
      hasPrice: true,
      ctaText: 'Get It Now'
    }
  },
  {
    id: 'tpl-006',
    name: 'Sunset Orange',
    category: 'food',
    thumbnail: '/templates/orange.png',
    avgCTR: 3.2,
    uses: 1890,
    elements: {
      backgroundColor: '#fff7ed',
      primaryColor: '#f97316',
      layout: 'bold',
      fontPrimary: 'Poppins, sans-serif',
      fontSecondary: 'Inter, sans-serif',
      hasCTA: true,
      hasPrice: true,
      ctaText: 'Order Today'
    }
  }
];

interface TemplateMarketplaceProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: Template) => void;
}

const TemplateMarketplace: React.FC<TemplateMarketplaceProps> = ({
  isOpen,
  onClose,
  onSelectTemplate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'ctr'>('popular');

  const categories = [
    { id: 'all', name: 'All', icon: Grid3X3 },
    { id: 'minimal', name: 'Minimal', icon: Sparkles },
    { id: 'sale', name: 'Sale', icon: Tag },
    { id: 'premium', name: 'Premium', icon: Crown },
    { id: 'organic', name: 'Organic', icon: Leaf },
    { id: 'tech', name: 'Tech', icon: Cpu },
    { id: 'food', name: 'Food', icon: UtensilsCrossed }
  ];

  const filteredTemplates = TEMPLATE_MARKETPLACE
    .filter(t => selectedCategory === 'all' || t.category === selectedCategory)
    .sort((a, b) => sortBy === 'popular' ? b.uses - a.uses : b.avgCTR - a.avgCTR);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] rounded-2xl border border-white/10 w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-gradient-to-r from-violet-500/5 to-fuchsia-500/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Template Marketplace</h2>
              <p className="text-xs text-gray-500">AI-Optimized Templates • Proven CTR Performance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filters */}
        <div className="p-4 border-b border-white/10 bg-black/20">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search templates..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20"
            />
          </div>
          
          <div className="flex items-center justify-between">
            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((cat) => {
                const IconComponent = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/20'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {cat.name}
                  </button>
                );
              })}
            </div>
            
            {/* Sort Options */}
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => setSortBy('popular')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  sortBy === 'popular'
                    ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                Popular
              </button>
              <button
                onClick={() => setSortBy('ctr')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  sortBy === 'ctr'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                Highest CTR
              </button>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-220px)]">
          <div className="grid grid-cols-3 gap-5">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="group bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl border border-white/10 overflow-hidden hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10 transition-all cursor-pointer"
                onClick={() => {
                  onSelectTemplate(template);
                  onClose();
                }}
              >
                {/* Preview */}
                <div 
                  className="aspect-video relative overflow-hidden"
                  style={{ backgroundColor: template.elements.backgroundColor }}
                >
                  {/* AI Badge */}
                  <div className="absolute top-2 left-2 z-10">
                    <div className="flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-md">
                      <Sparkles className="w-3 h-3 text-violet-400" />
                      <span className="text-[10px] text-violet-300 font-medium">AI Optimized</span>
                    </div>
                  </div>

                  {/* CTR Badge */}
                  <div className="absolute top-2 right-2 z-10">
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 backdrop-blur-sm rounded-md border border-green-500/30">
                      <TrendingUp className="w-3 h-3 text-green-400" />
                      <span className="text-[10px] text-green-400 font-bold">{template.avgCTR}% CTR</span>
                    </div>
                  </div>
                  
                  {/* Simulated Preview */}
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div className="text-center">
                      <div 
                        className="w-14 h-14 mx-auto rounded-xl mb-2 shadow-lg"
                        style={{ backgroundColor: template.elements.primaryColor }}
                      />
                      <div 
                        className="h-3 w-20 mx-auto rounded-full mb-1.5"
                        style={{ backgroundColor: template.elements.primaryColor }}
                      />
                      <div 
                        className="h-2 w-14 mx-auto rounded-full opacity-50"
                        style={{ backgroundColor: template.elements.primaryColor }}
                      />
                      {template.elements.hasCTA && (
                        <div 
                          className="mt-3 px-3 py-1 rounded-lg text-[8px] font-bold text-white mx-auto inline-block"
                          style={{ backgroundColor: template.elements.primaryColor }}
                        >
                          {template.elements.ctaText}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-600/90 to-violet-600/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <span className="px-5 py-2.5 bg-white text-violet-600 rounded-xl font-semibold text-sm shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      Use Template
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 bg-black/20">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white">{template.name}</h3>
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className={`w-3 h-3 ${star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-gray-500" />
                      <span className="text-xs text-gray-500">{template.uses.toLocaleString()} uses</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 bg-white/5 rounded-full text-gray-400 capitalize">{template.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No Templates Found</h3>
              <p className="text-sm text-gray-500">Try a different category or search term</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateMarketplace;
