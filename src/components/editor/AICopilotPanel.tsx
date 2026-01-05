'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, X, Loader2, Check, Zap, Bot } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  actions?: AIAction[];
}

interface AIAction {
  type: string;
  description: string;
  command: string;
  params?: any;
  applied?: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  editorMethods: any;
  selectedObject: any;
  canvasInfo: { width: number; height: number; backgroundColor: string; objectCount: number; };
}

export default function AICopilotPanel({ isOpen, onClose, editorMethods, selectedObject, canvasInfo }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Hello! I\'m your AI Design Agent. I can add shapes, text, change colors, and more. Try: "add circle", "red background", "add text SALE"' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { 
    endRef.current?.scrollIntoView({ behavior: 'smooth' }); 
  }, [messages]);

  // Direct command executor - COMPLETE control over editor
  const executeCommand = useCallback((command: string, params?: any): boolean => {
    console.log('Executing:', command, params);
    
    if (!editorMethods) {
      console.log('No editor methods');
      return false;
    }

    try {
      switch (command) {
        // ============ SHAPES ============
        case 'addCircle':
          editorMethods.addCircle?.();
          return true;
        case 'addRectangle':
          editorMethods.addRectangle?.();
          return true;
        case 'addTriangle':
          editorMethods.addTriangle?.();
          return true;
        case 'addStar':
          editorMethods.addStar?.();
          return true;
        case 'addHexagon':
          editorMethods.addHexagon?.();
          return true;
        case 'addPentagon':
          editorMethods.addPentagon?.();
          return true;
        case 'addLine':
          editorMethods.addLine?.();
          return true;
          
        // ============ TEXT ============
        case 'addText':
          editorMethods.addText?.(params?.text || 'Text');
          return true;
        case 'addHeading':
          editorMethods.addHeading?.(params?.text || 'Heading');
          return true;
        case 'addCurvedText':
          editorMethods.addCurvedText?.(params?.text || 'Curved Text', params?.radius || 100);
          return true;
        case 'addGradientText':
          editorMethods.addGradientText?.(params?.text || 'Gradient', params?.colors);
          return true;
        case 'addStrokedText':
          editorMethods.addStrokedText?.(params?.text || 'Outlined');
          return true;
          
        // ============ BACKGROUND ============
        case 'setBackgroundColor':
          editorMethods.setBackgroundColor?.(params?.color || '#ffffff');
          return true;
        case 'setBackgroundImage':
          if (params?.file) editorMethods.setBackgroundImage?.(params.file);
          return true;
        case 'blurBackground':
          editorMethods.blurBackground?.(params?.amount || 5);
          return true;
        case 'addColorOverlay':
          editorMethods.addColorOverlay?.(params?.color || '#000000', params?.opacity || 0.5);
          return true;
          
        // ============ BASIC ACTIONS ============
        case 'undo':
          editorMethods.undo?.();
          return true;
        case 'redo':
          editorMethods.redo?.();
          return true;
        case 'deleteSelected':
        case 'delete':
          editorMethods.deleteSelected?.();
          return true;
        case 'duplicateSelected':
        case 'duplicate':
          editorMethods.duplicateSelected?.();
          return true;
        case 'clear':
        case 'clearAll':
          editorMethods.clear?.();
          return true;
        case 'toggleLock':
        case 'lock':
          editorMethods.toggleLock?.();
          return true;
          
        // ============ IMAGE OPERATIONS ============
        case 'removeBackground':
        case 'removeBg':
        case 'bgRemove':
          editorMethods.removeBackground?.();
          return true;
        case 'aiRemoveBackground':
          editorMethods.aiRemoveBackground?.();
          return true;
        case 'applyFilter':
          editorMethods.applyFilter?.(params?.filter || 'none');
          return true;
        case 'adjustImage':
          editorMethods.adjustImage?.(params?.type || 'brightness', params?.value || 0);
          return true;
        case 'removeImageFilters':
          editorMethods.removeImageFilters?.();
          return true;
        case 'maskImageToShape':
          editorMethods.maskImageToShape?.(params?.shape || 'circle');
          return true;
        case 'smartObjectFit':
          editorMethods.smartObjectFit?.(params?.mode || 'contain');
          return true;
          
        // ============ CROP ============
        case 'startCrop':
          editorMethods.startCrop?.();
          return true;
        case 'applyCrop':
          editorMethods.applyCrop?.();
          return true;
        case 'cancelCrop':
          editorMethods.cancelCrop?.();
          return true;
          
        // ============ ARRANGE / LAYERS ============
        case 'bringToFront':
        case 'front':
          editorMethods.bringToFront?.();
          return true;
        case 'sendToBack':
        case 'back':
          editorMethods.sendToBack?.();
          return true;
        case 'bringForward':
          editorMethods.bringForward?.();
          return true;
        case 'sendBackward':
          editorMethods.sendBackward?.();
          return true;
          
        // ============ TRANSFORM ============
        case 'flipHorizontal':
        case 'flipH':
          editorMethods.flipHorizontal?.();
          return true;
        case 'flipVertical':
        case 'flipV':
          editorMethods.flipVertical?.();
          return true;
          
        // ============ GROUP ============
        case 'groupSelected':
        case 'group':
          editorMethods.groupSelected?.();
          return true;
        case 'ungroupSelected':
        case 'ungroup':
          editorMethods.ungroupSelected?.();
          return true;
          
        // ============ ALIGNMENT ============
        case 'alignObject':
        case 'align':
          editorMethods.alignObject?.(params?.alignment || 'center');
          return true;
        case 'distributeHorizontal':
          editorMethods.distributeHorizontal?.();
          return true;
        case 'distributeVertical':
          editorMethods.distributeVertical?.();
          return true;
        case 'autoArrange':
          editorMethods.autoArrange?.();
          return true;
          
        // ============ FRAMES & BORDERS ============
        case 'addDecorativeFrame':
        case 'addFrame':
          editorMethods.addDecorativeFrame?.(params?.style || 'simple');
          return true;
        case 'addBorder':
          editorMethods.addBorder?.(params?.color || '#000000', params?.width || 2);
          return true;
          
        // ============ RETAIL ELEMENTS ============
        case 'addPriceTag':
          editorMethods.addPriceTag?.(params?.price || '₹999');
          return true;
        case 'addRibbon':
          editorMethods.addRibbon?.(params?.text || 'SALE');
          return true;
        case 'addCallout':
          editorMethods.addCallout?.(params?.text || 'NEW!');
          return true;
        case 'addProductPlaceholder':
          editorMethods.addProductPlaceholder?.(params?.size || 'medium');
          return true;
          
        // ============ SOCIAL ICONS ============
        case 'addSocialIcon':
          editorMethods.addSocialIcon?.(params?.platform || 'facebook');
          return true;
        case 'addPaymentIcon':
          editorMethods.addPaymentIcon?.(params?.method || 'upi');
          return true;
          
        // ============ EFFECTS ============
        case 'addGlow':
          editorMethods.addGlow?.(params?.color || '#ffffff', params?.blur || 20);
          return true;
        case 'addDropShadow':
        case 'addShadow':
          editorMethods.addDropShadow?.(params?.color || '#000000', params?.blur || 10, params?.offsetX || 5, params?.offsetY || 5);
          return true;
        case 'removeShadow':
          editorMethods.removeShadow?.();
          return true;
        case 'addImageOutline':
        case 'addOutline':
          editorMethods.addImageOutline?.(params?.color || '#ffffff', params?.width || 3);
          return true;
        case 'addTextShadow':
          editorMethods.addTextShadow?.(params?.blur || 2, params?.offsetX || 2, params?.offsetY || 2, params?.color || '#000000');
          return true;
        case 'setTextStroke':
          editorMethods.setTextStroke?.(params?.color || '#000000', params?.width || 2);
          return true;
          
        // ============ DRAWING ============
        case 'enableDrawingMode':
        case 'startDrawing':
          editorMethods.enableDrawingMode?.(params?.color || '#000000', params?.size || 5);
          return true;
        case 'disableDrawingMode':
        case 'stopDrawing':
          editorMethods.disableDrawingMode?.();
          return true;
        case 'setBrushColor':
          editorMethods.setBrushColor?.(params?.color || '#000000');
          return true;
        case 'setBrushSize':
          editorMethods.setBrushSize?.(params?.size || 5);
          return true;
        case 'clearDrawing':
          editorMethods.clearDrawing?.();
          return true;
          
        // ============ CANVAS ============
        case 'setCanvasSize':
          editorMethods.setCanvasSize?.(params?.width || 728, params?.height || 90);
          return true;
        case 'clonePattern':
          editorMethods.clonePattern?.(params?.rows || 2, params?.cols || 2, params?.spacingX || 10, params?.spacingY || 10);
          return true;
          
        // ============ EXPORT ============
        case 'exportImage':
          editorMethods.exportImage?.(params?.format || 'png', params?.quality || 1);
          return true;
        case 'saveProject':
          editorMethods.saveProject?.();
          return true;
        case 'loadProject':
          editorMethods.loadProject?.();
          return true;
          
        // ============ GRID ============
        case 'showGrid':
          editorMethods.showGrid?.(params?.size || 20);
          return true;
        case 'hideGrid':
          editorMethods.hideGrid?.();
          return true;
        case 'enableSnapToGrid':
          editorMethods.enableSnapToGrid?.(params?.size || 10);
          return true;
        case 'disableSnapToGrid':
          editorMethods.disableSnapToGrid?.();
          return true;
          
        default:
          // Dynamic fallback - try to call method directly
          if (typeof editorMethods[command] === 'function') {
            if (params && Object.keys(params).length > 0) {
              const paramValues = Object.values(params);
              editorMethods[command](...paramValues);
            } else {
              editorMethods[command]();
            }
            return true;
          }
          console.log('Unknown command:', command);
          return false;
      }
    } catch (error) {
      console.error('Execute error:', error);
      return false;
    }
  }, [editorMethods]);

  const sendMessage = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || isLoading) return;

    const userMsgId = Date.now().toString();
    setMessages(prev => [...prev, { id: userMsgId, role: 'user', content: msg }]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: msg,
          context: { 
            canvas: `${canvasInfo.width}x${canvasInfo.height}`, 
            bg: canvasInfo.backgroundColor,
            objects: canvasInfo.objectCount,
            selected: selectedObject?.type || null 
          },
        }),
      });
      
      const data = await res.json();
      
      const assistantMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: assistantMsgId,
        role: 'assistant',
        content: data.response || 'Ho gaya!',
        actions: data.actions || [],
      }]);
      
    } catch (err) {
      console.error('API error:', err);
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: 'Kuch gadbad ho gayi. Dobara try karo.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const applyAction = (action: AIAction, msgId: string) => {
    console.log('Applying action:', action);
    
    const success = executeCommand(action.command, action.params);
    
    if (success) {
      // Mark as applied
      setMessages(prev => prev.map(m => {
        if (m.id === msgId && m.actions) {
          return {
            ...m,
            actions: m.actions.map(a => 
              a.command === action.command && a.description === action.description 
                ? { ...a, applied: true } 
                : a
            )
          };
        }
        return m;
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[480px] bg-[#16161d] border border-white/10 rounded-2xl flex flex-col z-50 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-gradient-to-r from-violet-500/10 to-pink-500/10 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
            <Bot size={18} className="text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">AI Agent</h3>
            <p className="text-[10px] text-gray-400">Design Assistant</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-3 py-2 rounded-xl text-sm ${
              m.role === 'user' 
                ? 'bg-violet-500 text-white rounded-br-sm' 
                : 'bg-white/5 text-gray-200 rounded-bl-sm'
            }`}>
              <p className="whitespace-pre-wrap">{m.content}</p>
              
              {/* Action Buttons */}
              {m.actions && m.actions.length > 0 && (
                <div className="mt-2 space-y-1.5">
                  {m.actions.map((a, i) => (
                    <button 
                      key={`${m.id}-${i}`}
                      onClick={() => applyAction(a, m.id)} 
                      disabled={a.applied}
                      className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        a.applied 
                          ? 'bg-green-500/20 text-green-400 cursor-default' 
                          : 'bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 cursor-pointer'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {a.applied ? <Check size={14} /> : <Zap size={14} />}
                        {a.description}
                      </span>
                      {!a.applied && <span className="text-[10px] opacity-60">Click</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/5 px-3 py-2 rounded-xl rounded-bl-sm">
              <div className="flex items-center gap-2">
                <Loader2 size={14} className="animate-spin text-violet-400" />
                <span className="text-xs text-gray-400">Processing...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={endRef} />
      </div>

      {/* Quick Commands */}
      <div className="px-4 py-2 border-t border-white/5">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[
            { label: 'Circle', cmd: 'add circle' },
            { label: 'Rectangle', cmd: 'add rectangle' },
            { label: 'Text', cmd: 'add text SALE' },
            { label: 'Undo', cmd: 'undo' },
            { label: 'Red BG', cmd: 'set background red' },
          ].map(c => (
            <button 
              key={c.cmd}
              onClick={() => sendMessage(c.cmd)} 
              disabled={isLoading}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-gray-300 whitespace-nowrap transition-colors disabled:opacity-50"
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10">
        <form onSubmit={e => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
          <input 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            placeholder="What would you like to create?"
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 disabled:opacity-50" 
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading} 
            className="px-4 py-2.5 bg-violet-500 hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors"
          >
            <Send size={16} className="text-white" />
          </button>
        </form>
      </div>
    </div>
  );
}
