'use client';

import React from 'react';

interface Layer {
  id: string;
  name: string;
  type: string;
  visible: boolean;
  locked: boolean;
}

interface LayersPanelProps {
  layers: Layer[];
  selectedLayerId: string | null;
  onSelectLayer: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onToggleLock: (id: string) => void;
  onDeleteLayer: (id: string) => void;
  onReorderLayer: (id: string, direction: 'up' | 'down') => void;
  onRenameLayer: (id: string, newName: string) => void;
}

const LayersPanel: React.FC<LayersPanelProps> = ({
  layers,
  selectedLayerId,
  onSelectLayer,
  onToggleVisibility,
  onToggleLock,
  onDeleteLayer,
  onReorderLayer,
  onRenameLayer,
}) => {
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editingName, setEditingName] = React.useState('');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'i-text':
      case 'text':
      case 'textbox':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7V4h16v3M9 20h6M12 4v16" />
          </svg>
        );
      case 'rect':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
          </svg>
        );
      case 'circle':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
          </svg>
        );
      case 'triangle':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3l10 18H2L12 3z" />
          </svg>
        );
      case 'image':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        );
      case 'path':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3c4 0 6 6 6 10s2 8 8 8" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
          </svg>
        );
    }
  };

  const startEditing = (layer: Layer) => {
    setEditingId(layer.id);
    setEditingName(layer.name);
  };

  const finishEditing = () => {
    if (editingId && editingName.trim()) {
      onRenameLayer(editingId, editingName.trim());
    }
    setEditingId(null);
    setEditingName('');
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <h3 className="font-semibold text-white flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="5" rx="1" />
            <rect x="3" y="10" width="18" height="5" rx="1" />
            <rect x="3" y="17" width="18" height="5" rx="1" />
          </svg>
          Layers
        </h3>
        <p className="text-xs text-gray-400 mt-1">{layers.length} objects</p>
      </div>

      {/* Layers List */}
      <div className="flex-1 overflow-y-auto">
        {layers.length === 0 ? (
          <div className="flex items-center justify-center h-full p-4">
            <div className="text-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="5" rx="1" />
                <rect x="3" y="10" width="18" height="5" rx="1" />
                <rect x="3" y="17" width="18" height="5" rx="1" />
              </svg>
              <p className="text-sm">No layers yet</p>
              <p className="text-xs mt-1">Add objects to canvas</p>
            </div>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {[...layers].reverse().map((layer, index) => (
              <div
                key={layer.id}
                className={`group flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all ${
                  selectedLayerId === layer.id
                    ? 'bg-violet-500/20 border border-violet-500/30'
                    : 'hover:bg-white/5 border border-transparent'
                }`}
                onClick={() => onSelectLayer(layer.id)}
              >
                {/* Type Icon */}
                <div className={`text-gray-400 ${!layer.visible && 'opacity-40'}`}>
                  {getTypeIcon(layer.type)}
                </div>

                {/* Name */}
                <div className="flex-1 min-w-0">
                  {editingId === layer.id ? (
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onBlur={finishEditing}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') finishEditing();
                        if (e.key === 'Escape') setEditingId(null);
                      }}
                      className="w-full bg-white/10 border border-violet-500 rounded px-2 py-0.5 text-sm text-white focus:outline-none"
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <span
                      className={`text-sm truncate block ${
                        layer.visible ? 'text-white' : 'text-gray-500'
                      } ${layer.locked && 'italic'}`}
                      onDoubleClick={(e) => {
                        e.stopPropagation();
                        startEditing(layer);
                      }}
                    >
                      {layer.name}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* Move Up */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onReorderLayer(layer.id, 'up');
                    }}
                    className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors"
                    title="Move Up"
                    disabled={index === 0}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                  </button>

                  {/* Move Down */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onReorderLayer(layer.id, 'down');
                    }}
                    className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors"
                    title="Move Down"
                    disabled={index === layers.length - 1}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>

                  {/* Visibility */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleVisibility(layer.id);
                    }}
                    className={`p-1 hover:bg-white/10 rounded transition-colors ${
                      layer.visible ? 'text-gray-400 hover:text-white' : 'text-gray-600'
                    }`}
                    title={layer.visible ? 'Hide' : 'Show'}
                  >
                    {layer.visible ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    )}
                  </button>

                  {/* Lock */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleLock(layer.id);
                    }}
                    className={`p-1 hover:bg-white/10 rounded transition-colors ${
                      layer.locked ? 'text-orange-400' : 'text-gray-400 hover:text-white'
                    }`}
                    title={layer.locked ? 'Unlock' : 'Lock'}
                  >
                    {layer.locked ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 019.9-1" />
                      </svg>
                    )}
                  </button>

                  {/* Delete */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteLayer(layer.id);
                    }}
                    className="p-1 hover:bg-red-500/20 rounded text-gray-400 hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-white/10">
        <div className="text-xs text-gray-500 space-y-1">
          <p>💡 Double-click to rename</p>
          <p>↕️ Drag or use arrows to reorder</p>
        </div>
      </div>
    </div>
  );
};

export default LayersPanel;
