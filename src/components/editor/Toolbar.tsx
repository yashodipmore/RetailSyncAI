'use client';

import React from 'react';

export type Tool = 'select' | 'text' | 'rectangle' | 'circle' | 'triangle' | 'line' | 'pen' | 'image' | 'eraser';

interface ToolbarProps {
  activeTool: Tool;
  onToolChange: (tool: Tool) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  zoom: number;
  onAddImage: () => void;
}

const tools: { id: Tool; name: string; icon: React.ReactNode }[] = [
  {
    id: 'select',
    name: 'Select',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
        <path d="M13 13l6 6" />
      </svg>
    ),
  },
  {
    id: 'text',
    name: 'Text',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 7V4h16v3M9 20h6M12 4v16" />
      </svg>
    ),
  },
  {
    id: 'rectangle',
    name: 'Rectangle',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
      </svg>
    ),
  },
  {
    id: 'circle',
    name: 'Circle',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    id: 'triangle',
    name: 'Triangle',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3l10 18H2L12 3z" />
      </svg>
    ),
  },
  {
    id: 'line',
    name: 'Line',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="5" y1="19" x2="19" y2="5" />
      </svg>
    ),
  },
  {
    id: 'pen',
    name: 'Pen',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    id: 'eraser',
    name: 'Eraser',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 21h10M18 7l-5 5m-8.5 6.5l10-10a2.12 2.12 0 013 3l-10 10H5a1 1 0 01-1-1v-2.5a2 2 0 01.59-1.42z" />
      </svg>
    ),
  },
];

const Toolbar: React.FC<ToolbarProps> = ({
  activeTool,
  onToolChange,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  zoom,
  onAddImage,
}) => {
  return (
    <div className="flex items-center gap-2 p-3 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
      {/* Tools */}
      <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onToolChange(tool.id)}
            className={`p-2.5 rounded-lg transition-all relative group ${
              activeTool === tool.id
                ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/30'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
            title={tool.name}
          >
            {tool.icon}
            {/* Tooltip */}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {tool.name}
            </span>
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-white/10" />

      {/* Image Button */}
      <button
        onClick={onAddImage}
        className="p-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all relative group"
        title="Add Image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Add Image
        </span>
      </button>

      {/* Divider */}
      <div className="w-px h-8 bg-white/10" />

      {/* Undo/Redo */}
      <div className="flex items-center gap-1">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`p-2.5 rounded-lg transition-all relative group ${
            canUndo
              ? 'text-gray-400 hover:text-white hover:bg-white/10'
              : 'text-gray-600 cursor-not-allowed'
          }`}
          title="Undo (Ctrl+Z)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 7v6h6" />
            <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" />
          </svg>
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Undo
          </span>
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className={`p-2.5 rounded-lg transition-all relative group ${
            canRedo
              ? 'text-gray-400 hover:text-white hover:bg-white/10'
              : 'text-gray-600 cursor-not-allowed'
          }`}
          title="Redo (Ctrl+Y)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 7v6h-6" />
            <path d="M3 17a9 9 0 019-9 9 9 0 016 2.3l3 2.7" />
          </svg>
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Redo
          </span>
        </button>
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-white/10" />

      {/* Zoom */}
      <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1">
        <button
          onClick={onZoomOut}
          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          title="Zoom Out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </button>
        <button
          onClick={onResetZoom}
          className="px-3 py-1 text-sm text-gray-300 hover:text-white transition-colors min-w-[60px]"
          title="Reset Zoom"
        >
          {Math.round(zoom * 100)}%
        </button>
        <button
          onClick={onZoomIn}
          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          title="Zoom In"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </button>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Keyboard Shortcuts Info */}
      <div className="text-xs text-gray-500 hidden lg:block">
        <span className="px-1.5 py-0.5 bg-white/10 rounded mr-1">V</span> Select
        <span className="px-1.5 py-0.5 bg-white/10 rounded mx-1 ml-3">T</span> Text
        <span className="px-1.5 py-0.5 bg-white/10 rounded mx-1 ml-3">R</span> Rectangle
        <span className="px-1.5 py-0.5 bg-white/10 rounded mx-1 ml-3">Del</span> Delete
      </div>
    </div>
  );
};

export default Toolbar;
