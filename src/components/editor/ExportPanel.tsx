'use client';

import React, { useState } from 'react';
import { 
  X, Download, Image, FileImage, Check, 
  Monitor, Smartphone, Zap, Package, Share2
} from 'lucide-react';
import { CANVAS_SIZES } from './CanvasEditor';

interface ExportPanelProps {
  onExport: (format: string, quality: number) => string | null;
  onExportMultiple: (sizes: string[], format: string, quality: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

const EXPORT_FORMATS = [
  { value: 'png', label: 'PNG', description: 'Best for transparency', icon: FileImage },
  { value: 'jpeg', label: 'JPEG', description: 'Smaller file size', icon: Image },
];

const EXPORT_PRESETS = [
  { 
    name: 'Social Media',
    description: 'Facebook, Instagram, Twitter',
    sizes: ['facebook-1200x628', 'instagram-1080x1080', 'instagram-story-1080x1920', 'twitter-1200x675'],
    icon: Share2,
    color: 'from-pink-500 to-rose-500'
  },
  {
    name: 'Display Ads',
    description: 'Banners & rectangles',
    sizes: ['banner-728x90', 'mrec-300x250', 'leaderboard-970x90', 'skyscraper-160x600'],
    icon: Monitor,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'All Formats',
    description: 'Export everything',
    sizes: Object.keys(CANVAS_SIZES),
    icon: Package,
    color: 'from-violet-500 to-fuchsia-500'
  }
];

const ExportPanel: React.FC<ExportPanelProps> = ({
  onExport,
  onExportMultiple,
  isOpen,
  onClose
}) => {
  const [format, setFormat] = useState('png');
  const [quality, setQuality] = useState(1); // Default to max quality
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [activeTab, setActiveTab] = useState<'single' | 'batch'>('single');

  const handleToggleSize = (sizeKey: string) => {
    setSelectedSizes(prev => 
      prev.includes(sizeKey) 
        ? prev.filter(s => s !== sizeKey)
        : [...prev, sizeKey]
    );
  };

  const handleSelectPreset = (sizes: string[]) => {
    setSelectedSizes(sizes);
  };

  const handleSingleExport = () => {
    const dataUrl = onExport(format, quality);
    if (dataUrl) {
      const link = document.createElement('a');
      link.download = `RetailSync_Creative_${Date.now()}.${format}`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleMultiExport = async () => {
    if (selectedSizes.length === 0) return;
    
    setIsExporting(true);
    onExportMultiple(selectedSizes, format, quality);
    
    setTimeout(() => {
      setIsExporting(false);
    }, selectedSizes.length * 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-[#16161d] rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <Download size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Export Creative</h2>
              <p className="text-xs text-gray-500">Download in multiple formats</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/[0.06]">
          <button
            onClick={() => setActiveTab('single')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'single' ? 'text-white border-b-2 border-violet-500 bg-white/5' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Single Export
          </button>
          <button
            onClick={() => setActiveTab('batch')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'batch' ? 'text-white border-b-2 border-violet-500 bg-white/5' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Batch Export
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-180px)]">
          {activeTab === 'single' ? (
            <div className="space-y-6">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider mb-3 block">Format</label>
                <div className="grid grid-cols-2 gap-3">
                  {EXPORT_FORMATS.map((f) => {
                    const Icon = f.icon;
                    return (
                      <button
                        key={f.value}
                        onClick={() => setFormat(f.value)}
                        className={`flex items-center gap-3 p-4 rounded-xl transition-all ${format === f.value ? 'bg-violet-500/20 border-2 border-violet-500 ring-2 ring-violet-500/20' : 'bg-white/[0.03] border-2 border-white/[0.06] hover:border-white/20'}`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${format === f.value ? 'bg-violet-500' : 'bg-white/10'}`}>
                          <Icon size={20} className="text-white" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-white">{f.label}</p>
                          <p className="text-xs text-gray-500">{f.description}</p>
                        </div>
                        {format === f.value && <Check size={18} className="text-violet-400 ml-auto" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {format === 'jpeg' && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs text-gray-500 uppercase tracking-wider">Quality</label>
                    <span className="text-sm text-white font-medium">{Math.round(quality * 100)}%</span>
                  </div>
                  <input type="range" value={quality} onChange={(e) => setQuality(parseFloat(e.target.value))} min={0.1} max={1} step={0.1}
                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-violet-500" />
                </div>
              )}

              <button onClick={handleSingleExport} className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white font-medium transition-all shadow-lg shadow-violet-500/20">
                <Download size={18} />
                Download {format.toUpperCase()}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider mb-3 block">Quick Presets</label>
                <div className="grid grid-cols-3 gap-3">
                  {EXPORT_PRESETS.map((preset) => {
                    const Icon = preset.icon;
                    const isSelected = preset.sizes.every(s => selectedSizes.includes(s));
                    return (
                      <button key={preset.name} onClick={() => handleSelectPreset(preset.sizes)}
                        className={`p-4 rounded-xl transition-all ${isSelected ? 'bg-violet-500/20 border-2 border-violet-500' : 'bg-white/[0.03] border-2 border-white/[0.06] hover:border-white/20'}`}>
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${preset.color} flex items-center justify-center mx-auto mb-2`}>
                          <Icon size={18} className="text-white" />
                        </div>
                        <p className="font-medium text-white text-sm">{preset.name}</p>
                        <p className="text-[10px] text-gray-500">{preset.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs text-gray-500 uppercase tracking-wider">Select Sizes</label>
                  <span className="text-xs text-violet-400">{selectedSizes.length} selected</span>
                </div>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-2">
                  {Object.entries(CANVAS_SIZES).map(([key, size]) => (
                    <button key={key} onClick={() => handleToggleSize(key)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all ${selectedSizes.includes(key) ? 'bg-violet-500/20 border border-violet-500/50' : 'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06]'}`}>
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${selectedSizes.includes(key) ? 'bg-violet-500 border-violet-500' : 'border-gray-600'}`}>
                        {selectedSizes.includes(key) && <Check size={10} className="text-white" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-white truncate">{size.name}</p>
                        <p className="text-[10px] text-gray-500">{size.width}×{size.height}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <select value={format} onChange={(e) => setFormat(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-violet-500">
                  <option value="png" className="bg-[#1a1a24]">PNG Format</option>
                  <option value="jpeg" className="bg-[#1a1a24]">JPEG Format</option>
                </select>
                <button onClick={handleMultiExport} disabled={selectedSizes.length === 0 || isExporting}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-all">
                  {isExporting ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Exporting...</>
                  ) : (
                    <><Zap size={16} /> Export {selectedSizes.length} Files</>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-white/[0.06] bg-white/[0.02]">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>💡 Tip: Use PNG for transparent backgrounds</span>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;
