'use client';

import React, { useState } from 'react';
import { Clock, Package, Star, Percent, Shield, Plus, Zap, TrendingUp, Users, Award } from 'lucide-react';

// Smart Badges Data
const SMART_BADGES = {
  urgency: {
    name: 'Urgency',
    icon: Clock,
    color: 'from-red-500 to-orange-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
    badges: [
      { text: 'Limited Time Offer!', bg: '#ef4444' },
      { text: 'Ends Tonight!', bg: '#f97316' },
      { text: 'Last Few Hours!', bg: '#dc2626' },
      { text: 'Flash Sale!', bg: '#b91c1c' },
      { text: 'Hurry Up!', bg: '#ea580c' }
    ]
  },
  scarcity: {
    name: 'Scarcity',
    icon: Package,
    color: 'from-violet-500 to-purple-500',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/20',
    badges: [
      { text: 'Only 5 Left!', bg: '#7c3aed' },
      { text: 'Selling Fast!', bg: '#8b5cf6' },
      { text: 'Low Stock', bg: '#6d28d9' },
      { text: 'Almost Gone!', bg: '#5b21b6' },
      { text: '100+ Sold Today', bg: '#9333ea' }
    ]
  },
  social: {
    name: 'Social Proof',
    icon: Users,
    color: 'from-emerald-500 to-green-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    badges: [
      { text: 'Bestseller', bg: '#059669' },
      { text: '500+ Happy Customers', bg: '#10b981' },
      { text: 'Customer Favorite', bg: '#047857' },
      { text: 'Trending Now', bg: '#065f46' },
      { text: 'Top Rated ★★★★★', bg: '#15803d' }
    ]
  },
  value: {
    name: 'Value',
    icon: Percent,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    badges: [
      { text: '20% OFF', bg: '#dc2626' },
      { text: 'Best Value', bg: '#2563eb' },
      { text: 'Save ₹500', bg: '#16a34a' },
      { text: 'Buy 2 Get 1 Free', bg: '#9333ea' },
      { text: 'Special Offer', bg: '#ea580c' }
    ]
  },
  trust: {
    name: 'Trust',
    icon: Shield,
    color: 'from-cyan-500 to-teal-500',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
    badges: [
      { text: 'Verified Quality', bg: '#0891b2' },
      { text: 'Premium Product', bg: '#1d4ed8' },
      { text: '100% Authentic', bg: '#0d9488' },
      { text: 'Official Store', bg: '#0ea5e9' },
      { text: 'Quality Assured', bg: '#0284c7' }
    ]
  }
};

interface SmartBadgesPanelProps {
  onAddBadge: (type: string, text: string, bgColor: string) => void;
}

const SmartBadgesPanel: React.FC<SmartBadgesPanelProps> = ({ onAddBadge }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [customText, setCustomText] = useState('');
  const [customColor, setCustomColor] = useState('#7c3aed');

  const handleAddCustomBadge = () => {
    if (customText.trim()) {
      onAddBadge('custom', customText.trim(), customColor);
      setCustomText('');
    }
  };

  return (
    <div className="space-y-3">
      {/* Badge Categories */}
      <div className="space-y-2">
        {Object.entries(SMART_BADGES).map(([key, category]) => {
          const Icon = category.icon;
          const isActive = activeCategory === key;
          
          return (
            <div key={key}>
              {/* Category Header */}
              <button
                onClick={() => setActiveCategory(isActive ? null : key)}
                className={`w-full flex items-center gap-2 p-2 rounded-lg transition-all ${
                  isActive 
                    ? `${category.bgColor} ${category.borderColor} border` 
                    : 'hover:bg-white/5'
                }`}
              >
                <div className={`w-7 h-7 rounded-md bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                  <Icon size={14} className="text-white" />
                </div>
                <span className="text-sm font-medium text-white flex-1 text-left">{category.name}</span>
                <Zap size={12} className={`transition-transform ${isActive ? 'text-violet-400 rotate-12' : 'text-gray-600'}`} />
              </button>
              
              {/* Badges List */}
              {isActive && (
                <div className="mt-2 ml-9 space-y-1.5 animate-in slide-in-from-top-2 duration-200">
                  {category.badges.map((badge, index) => (
                    <button
                      key={index}
                      onClick={() => onAddBadge(key, badge.text, badge.bg)}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-white transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                      style={{ backgroundColor: badge.bg }}
                    >
                      {badge.text}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Divider */}
      <div className="border-t border-white/[0.06] pt-3">
        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Custom Badge</p>
        
        {/* Custom Badge Input */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="color"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              className="w-10 h-10 rounded-lg cursor-pointer border border-white/10 overflow-hidden shrink-0"
            />
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Enter badge text..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
              onKeyDown={(e) => e.key === 'Enter' && handleAddCustomBadge()}
            />
          </div>
          <button
            onClick={handleAddCustomBadge}
            disabled={!customText.trim()}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium transition-all"
          >
            <Plus size={16} />
            Add Custom Badge
          </button>
        </div>
      </div>

      {/* Pro Tip */}
      <div className="p-3 rounded-lg bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20">
        <div className="flex items-start gap-2">
          <TrendingUp size={14} className="text-violet-400 mt-0.5 shrink-0" />
          <p className="text-[11px] text-gray-400 leading-relaxed">
            <span className="text-violet-400 font-medium">Pro Tip:</span> Urgency and scarcity badges can increase CTR by up to 35%
          </p>
        </div>
      </div>
    </div>
  );
};

export default SmartBadgesPanel;
