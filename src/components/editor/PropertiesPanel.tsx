'use client';

import React, { useState, useEffect } from 'react';
import {
  Trash2, Copy, ArrowUp, ArrowDown, ArrowUpToLine, ArrowDownToLine,
  FlipHorizontal2, FlipVertical2, Lock, Unlock,
  AlignLeft, AlignCenter, AlignRight, AlignStartVertical, AlignCenterVertical, AlignEndVertical,
  Type, Square, Circle, Image, Palette, SunMedium, Contrast, Droplets,
  Eraser, Sliders, Eye, ChevronRight, RotateCcw, Bold, Italic, Underline,
  Move, Maximize2, CornerUpLeft
} from 'lucide-react';

interface PropertiesPanelProps {
  selectedObject: any | null;
  onPropertyChange: (property: string, value: any) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onBringForward: () => void;
  onSendBackward: () => void;
  onBringToFront: () => void;
  onSendToBack: () => void;
  onFlipHorizontal: () => void;
  onFlipVertical: () => void;
  onToggleLock: () => void;
  onAlignObject: (alignment: string) => void;
  onRemoveBackground?: () => void;
  onApplyFilter?: (filter: string) => void;
  onAdjustImage?: (type: string, value: number) => void;
  onAddTextShadow?: (blur: number, offsetX: number, offsetY: number, color: string) => void;
  onAddDropShadow?: (blur: number, offsetX: number, offsetY: number, color: string) => void;
  onRemoveShadow?: () => void;
  onSetTextStroke?: (color: string, width: number) => void;
}

// Section Component
const Section = ({ title, icon: Icon, children, defaultOpen = true }: {
  title: string;
  icon: any;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border-b border-white/[0.06]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 px-4 py-3 hover:bg-white/[0.02] transition-colors"
      >
        <Icon size={14} className="text-violet-400" strokeWidth={1.5} />
        <span className="text-xs font-medium text-white flex-1 text-left">{title}</span>
        <ChevronRight 
          size={14} 
          className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} 
        />
      </button>
      {isOpen && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
};

// Input Field Component
const InputField = ({ label, value, onChange, type = 'number', min, max, step = 1, suffix }: {
  label: string;
  value: number | string;
  onChange: (value: any) => void;
  type?: 'number' | 'text';
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</label>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(type === 'number' ? parseFloat(e.target.value) : e.target.value)}
        min={min}
        max={max}
        step={step}
        className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
      />
      {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">{suffix}</span>}
    </div>
  </div>
);

// Slider Component
const SliderField = ({ label, value, onChange, min = 0, max = 100, step = 1 }: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <label className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</label>
      <span className="text-xs text-gray-400">{value}</span>
    </div>
    <input
      type="range"
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      min={min}
      max={max}
      step={step}
      className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-violet-500
        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 
        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-violet-500"
    />
  </div>
);

// Color Input Component
const ColorInput = ({ label, value, onChange }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => (
  <div className="space-y-2">
    <label className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</label>
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-8 h-8 rounded-lg cursor-pointer border border-white/10 overflow-hidden"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white font-mono focus:outline-none focus:ring-1 focus:ring-violet-500"
      />
    </div>
  </div>
);

// Icon Button Component
const IconBtn = ({ icon: Icon, onClick, active = false, disabled = false, tooltip }: {
  icon: any;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  tooltip?: string;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={tooltip}
    className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors
      ${disabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10'}
      ${active ? 'bg-violet-500/20 text-violet-400' : 'text-gray-400 hover:text-white'}`}
  >
    <Icon size={16} strokeWidth={1.5} />
  </button>
);

// Filter Button Component
const FilterBtn = ({ label, active, onClick }: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors
      ${active 
        ? 'bg-violet-500 text-white' 
        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
  >
    {label}
  </button>
);

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedObject,
  onPropertyChange,
  onDelete,
  onDuplicate,
  onBringForward,
  onSendBackward,
  onBringToFront,
  onSendToBack,
  onFlipHorizontal,
  onFlipVertical,
  onToggleLock,
  onAlignObject,
  onRemoveBackground,
  onApplyFilter,
  onAdjustImage,
  onAddTextShadow,
  onAddDropShadow,
  onRemoveShadow,
  onSetTextStroke,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('none');
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [shadowColor, setShadowColor] = useState('#000000');
  const [shadowBlur, setShadowBlur] = useState(8);
  const [shadowOffsetX, setShadowOffsetX] = useState(0);
  const [shadowOffsetY, setShadowOffsetY] = useState(4);
  // Text stroke state
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(2);

  // Update values when object changes
  useEffect(() => {
    if (selectedObject) {
      setBrightness(0);
      setContrast(0);
      setSaturation(0);
    }
  }, [selectedObject]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    onApplyFilter?.(filter);
  };

  const handleAdjustment = (type: string, value: number) => {
    switch (type) {
      case 'brightness':
        setBrightness(value);
        break;
      case 'contrast':
        setContrast(value);
        break;
      case 'saturation':
        setSaturation(value);
        break;
    }
    onAdjustImage?.(type, value);
  };

  const handleApplyShadow = () => {
    onAddTextShadow?.(shadowBlur, shadowOffsetX, shadowOffsetY, shadowColor);
  };

  if (!selectedObject) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-6 py-12">
        <div className="w-16 h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center mb-4">
          <MousePointer size={24} className="text-gray-600" />
        </div>
        <h3 className="text-sm font-medium text-white mb-1">No Selection</h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Select an element on the canvas to view and edit its properties
        </p>
      </div>
    );
  }

  const isText = selectedObject.type === 'i-text' || selectedObject.type === 'text' || selectedObject.type === 'textbox';
  const isImage = selectedObject.type === 'image';
  const isShape = selectedObject.type === 'rect' || selectedObject.type === 'circle' || selectedObject.type === 'polygon';
  const isLocked = selectedObject.lockMovementX;

  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      {/* Quick Actions */}
      <div className="p-4 border-b border-white/[0.06]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-white capitalize">
            {selectedObject.type?.replace('-', ' ') || 'Object'}
          </span>
          <div className="flex items-center gap-1">
            <IconBtn icon={isLocked ? Lock : Unlock} onClick={onToggleLock} active={isLocked} tooltip={isLocked ? 'Unlock' : 'Lock'} />
            <IconBtn icon={Copy} onClick={onDuplicate} tooltip="Duplicate" />
            <IconBtn icon={Trash2} onClick={onDelete} tooltip="Delete" />
          </div>
        </div>
        
        {/* Arrange Buttons */}
        <div className="grid grid-cols-4 gap-1">
          <IconBtn icon={ArrowUpToLine} onClick={onBringToFront} tooltip="Bring to Front" />
          <IconBtn icon={ArrowUp} onClick={onBringForward} tooltip="Bring Forward" />
          <IconBtn icon={ArrowDown} onClick={onSendBackward} tooltip="Send Backward" />
          <IconBtn icon={ArrowDownToLine} onClick={onSendToBack} tooltip="Send to Back" />
        </div>
      </div>

      {/* Transform Section */}
      <Section title="Transform" icon={Move} defaultOpen={true}>
        <div className="grid grid-cols-2 gap-3">
          <InputField
            label="X Position"
            value={Math.round(selectedObject.left || 0)}
            onChange={(v) => onPropertyChange('left', v)}
            suffix="px"
          />
          <InputField
            label="Y Position"
            value={Math.round(selectedObject.top || 0)}
            onChange={(v) => onPropertyChange('top', v)}
            suffix="px"
          />
          <InputField
            label="Width"
            value={Math.round((selectedObject.width || 0) * (selectedObject.scaleX || 1))}
            onChange={(v) => {
              const newScale = v / (selectedObject.width || 1);
              onPropertyChange('scaleX', newScale);
            }}
            suffix="px"
          />
          <InputField
            label="Height"
            value={Math.round((selectedObject.height || 0) * (selectedObject.scaleY || 1))}
            onChange={(v) => {
              const newScale = v / (selectedObject.height || 1);
              onPropertyChange('scaleY', newScale);
            }}
            suffix="px"
          />
          <InputField
            label="Rotation"
            value={Math.round(selectedObject.angle || 0)}
            onChange={(v) => onPropertyChange('angle', v)}
            min={0}
            max={360}
            suffix="°"
          />
          <InputField
            label="Opacity"
            value={Math.round((selectedObject.opacity || 1) * 100)}
            onChange={(v) => onPropertyChange('opacity', v / 100)}
            min={0}
            max={100}
            suffix="%"
          />
        </div>
        
        {/* Flip Buttons */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/[0.06]">
          <button
            onClick={onFlipHorizontal}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs transition-all"
          >
            <FlipHorizontal2 size={14} />
            Flip H
          </button>
          <button
            onClick={onFlipVertical}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs transition-all"
          >
            <FlipVertical2 size={14} />
            Flip V
          </button>
        </div>
      </Section>

      {/* Alignment Section */}
      <Section title="Alignment" icon={AlignCenter} defaultOpen={false}>
        <div className="space-y-3">
          <div>
            <label className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 block">Horizontal</label>
            <div className="grid grid-cols-3 gap-1">
              <IconBtn icon={AlignLeft} onClick={() => onAlignObject('left')} tooltip="Align Left" />
              <IconBtn icon={AlignCenter} onClick={() => onAlignObject('center')} tooltip="Align Center" />
              <IconBtn icon={AlignRight} onClick={() => onAlignObject('right')} tooltip="Align Right" />
            </div>
          </div>
          <div>
            <label className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 block">Vertical</label>
            <div className="grid grid-cols-3 gap-1">
              <IconBtn icon={AlignStartVertical} onClick={() => onAlignObject('top')} tooltip="Align Top" />
              <IconBtn icon={AlignCenterVertical} onClick={() => onAlignObject('middle')} tooltip="Align Middle" />
              <IconBtn icon={AlignEndVertical} onClick={() => onAlignObject('bottom')} tooltip="Align Bottom" />
            </div>
          </div>
        </div>
      </Section>

      {/* Drop Shadow - Works on all objects */}
      <Section title="Drop Shadow" icon={Eye} defaultOpen={false}>
        <div className="space-y-3">
          <ColorInput
            label="Shadow Color"
            value={shadowColor}
            onChange={setShadowColor}
          />
          <SliderField
            label="Blur"
            value={shadowBlur}
            onChange={setShadowBlur}
            min={0}
            max={50}
          />
          <div className="grid grid-cols-2 gap-3">
            <SliderField
              label="Offset X"
              value={shadowOffsetX}
              onChange={setShadowOffsetX}
              min={-30}
              max={30}
            />
            <SliderField
              label="Offset Y"
              value={shadowOffsetY}
              onChange={setShadowOffsetY}
              min={-30}
              max={30}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onAddDropShadow?.(shadowBlur, shadowOffsetX, shadowOffsetY, shadowColor)}
              className="py-2 rounded-md bg-violet-500 hover:bg-violet-600 text-white text-xs font-medium transition-colors"
            >
              Apply Shadow
            </button>
            <button
              onClick={() => onRemoveShadow?.()}
              className="py-2 rounded-md bg-white/5 hover:bg-white/10 text-gray-400 text-xs font-medium transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      </Section>

      {/* Text Properties */}
      {isText && (
        <Section title="Text" icon={Type} defaultOpen={true}>
          <div className="space-y-4">
            {/* Font Family */}
            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 uppercase tracking-wider">Font Family</label>
              <select
                value={selectedObject.fontFamily || 'Arial'}
                onChange={(e) => onPropertyChange('fontFamily', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
              >
                {['Poppins', 'Inter', 'Arial', 'Roboto', 'Open Sans', 'Montserrat', 'Oswald', 'Playfair Display'].map(font => (
                  <option key={font} value={font} className="bg-[#1a1a24]">{font}</option>
                ))}
              </select>
            </div>
            
            {/* Font Size & Weight */}
            <div className="grid grid-cols-2 gap-3">
              <InputField
                label="Size"
                value={selectedObject.fontSize || 16}
                onChange={(v) => onPropertyChange('fontSize', v)}
                min={8}
                max={200}
                suffix="px"
              />
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 uppercase tracking-wider">Weight</label>
                <select
                  value={selectedObject.fontWeight || 'normal'}
                  onChange={(e) => onPropertyChange('fontWeight', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                >
                  <option value="300" className="bg-[#1a1a24]">Light</option>
                  <option value="normal" className="bg-[#1a1a24]">Regular</option>
                  <option value="500" className="bg-[#1a1a24]">Medium</option>
                  <option value="600" className="bg-[#1a1a24]">Semibold</option>
                  <option value="bold" className="bg-[#1a1a24]">Bold</option>
                  <option value="800" className="bg-[#1a1a24]">Extra Bold</option>
                </select>
              </div>
            </div>
            
            {/* Text Styles */}
            <div>
              <label className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 block">Style</label>
              <div className="flex items-center gap-1">
                <IconBtn 
                  icon={Bold} 
                  onClick={() => onPropertyChange('fontWeight', selectedObject.fontWeight === 'bold' ? 'normal' : 'bold')}
                  active={selectedObject.fontWeight === 'bold'}
                  tooltip="Bold"
                />
                <IconBtn 
                  icon={Italic} 
                  onClick={() => onPropertyChange('fontStyle', selectedObject.fontStyle === 'italic' ? 'normal' : 'italic')}
                  active={selectedObject.fontStyle === 'italic'}
                  tooltip="Italic"
                />
                <IconBtn 
                  icon={Underline} 
                  onClick={() => onPropertyChange('underline', !selectedObject.underline)}
                  active={selectedObject.underline}
                  tooltip="Underline"
                />
              </div>
            </div>
            
            {/* Text Alignment */}
            <div>
              <label className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 block">Alignment</label>
              <div className="flex items-center gap-1">
                <IconBtn 
                  icon={AlignLeft} 
                  onClick={() => onPropertyChange('textAlign', 'left')}
                  active={selectedObject.textAlign === 'left'}
                  tooltip="Left"
                />
                <IconBtn 
                  icon={AlignCenter} 
                  onClick={() => onPropertyChange('textAlign', 'center')}
                  active={selectedObject.textAlign === 'center'}
                  tooltip="Center"
                />
                <IconBtn 
                  icon={AlignRight} 
                  onClick={() => onPropertyChange('textAlign', 'right')}
                  active={selectedObject.textAlign === 'right'}
                  tooltip="Right"
                />
              </div>
            </div>
            
            {/* Text Color */}
            <ColorInput
              label="Text Color"
              value={selectedObject.fill || '#000000'}
              onChange={(v) => onPropertyChange('fill', v)}
            />
            
            {/* Line Height & Letter Spacing */}
            <div className="grid grid-cols-2 gap-3">
              <InputField
                label="Line Height"
                value={selectedObject.lineHeight || 1.2}
                onChange={(v) => onPropertyChange('lineHeight', v)}
                step={0.1}
                min={0.5}
                max={3}
              />
              <InputField
                label="Letter Spacing"
                value={selectedObject.charSpacing || 0}
                onChange={(v) => onPropertyChange('charSpacing', v)}
                step={10}
                min={-200}
                max={1000}
              />
            </div>
          </div>
        </Section>
      )}

      {/* Text Shadow */}
      {/* Text Stroke/Outline */}
      {isText && (
        <Section title="Text Stroke" icon={Type} defaultOpen={false}>
          <div className="space-y-3">
            <ColorInput
              label="Stroke Color"
              value={strokeColor}
              onChange={setStrokeColor}
            />
            <SliderField
              label="Stroke Width"
              value={strokeWidth}
              onChange={setStrokeWidth}
              min={0}
              max={10}
            />
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onSetTextStroke?.(strokeColor, strokeWidth)}
                className="py-2 rounded-md bg-violet-500 hover:bg-violet-600 text-white text-xs font-medium transition-colors"
              >
                Apply Stroke
              </button>
              <button
                onClick={() => onSetTextStroke?.('transparent', 0)}
                className="py-2 rounded-md bg-white/5 hover:bg-white/10 text-gray-400 text-xs font-medium transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </Section>
      )}

      {/* Shape Properties */}
      {isShape && (
        <Section title="Shape" icon={Square} defaultOpen={true}>
          <div className="space-y-4">
            <ColorInput
              label="Fill Color"
              value={selectedObject.fill || '#000000'}
              onChange={(v) => onPropertyChange('fill', v)}
            />
            <ColorInput
              label="Stroke Color"
              value={selectedObject.stroke || '#000000'}
              onChange={(v) => onPropertyChange('stroke', v)}
            />
            <SliderField
              label="Stroke Width"
              value={selectedObject.strokeWidth || 0}
              onChange={(v) => onPropertyChange('strokeWidth', v)}
              min={0}
              max={20}
            />
            {selectedObject.type === 'rect' && (
              <SliderField
                label="Corner Radius"
                value={selectedObject.rx || 0}
                onChange={(v) => {
                  onPropertyChange('rx', v);
                  onPropertyChange('ry', v);
                }}
                min={0}
                max={100}
              />
            )}
          </div>
        </Section>
      )}

      {/* Image Properties */}
      {isImage && (
        <>
          <Section title="Image Tools" icon={Image} defaultOpen={true}>
            <div className="space-y-4">
              {/* Remove Background */}
              <button
                onClick={onRemoveBackground}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 hover:from-violet-500/20 hover:to-fuchsia-500/20 border border-violet-500/20 text-white text-sm font-medium transition-all"
              >
                <Eraser size={16} className="text-violet-400" />
                Remove Background
              </button>
              
              {/* Filters */}
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 uppercase tracking-wider">Filters</label>
                <div className="flex flex-wrap gap-2">
                  {['none', 'grayscale', 'sepia', 'invert', 'blur', 'sharpen'].map(filter => (
                    <FilterBtn
                      key={filter}
                      label={filter.charAt(0).toUpperCase() + filter.slice(1)}
                      active={activeFilter === filter}
                      onClick={() => handleFilterChange(filter)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Section title="Adjustments" icon={Sliders} defaultOpen={false}>
            <div className="space-y-4">
              <SliderField
                label="Brightness"
                value={brightness}
                onChange={(v) => handleAdjustment('brightness', v)}
                min={-100}
                max={100}
              />
              <SliderField
                label="Contrast"
                value={contrast}
                onChange={(v) => handleAdjustment('contrast', v)}
                min={-100}
                max={100}
              />
              <SliderField
                label="Saturation"
                value={saturation}
                onChange={(v) => handleAdjustment('saturation', v)}
                min={-100}
                max={100}
              />
              <button
                onClick={() => {
                  setBrightness(0);
                  setContrast(0);
                  setSaturation(0);
                  handleAdjustment('brightness', 0);
                  handleAdjustment('contrast', 0);
                  handleAdjustment('saturation', 0);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs transition-all"
              >
                <RotateCcw size={14} />
                Reset All
              </button>
            </div>
          </Section>
        </>
      )}

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.2);
        }
      `}</style>
    </div>
  );
};

// Missing import for no selection state
const MousePointer = ({ size, className }: { size: number; className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
    <path d="M13 13l6 6" />
  </svg>
);

export default PropertiesPanel;
