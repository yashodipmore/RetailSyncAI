'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { 
  // Layout & Navigation
  Menu, X, ChevronDown, ChevronRight, ChevronLeft, LogOut, User,
  // Tools
  Type, Square, Circle, Image, Layers, MousePointer2, Hand, Pencil, PenTool, Highlighter, 
  // Actions
  Undo2, Redo2, Copy, Trash2, Lock, Unlock, Eye, EyeOff,
  // Alignment
  AlignLeft, AlignCenter, AlignRight, AlignStartVertical, AlignCenterVertical, AlignEndVertical,
  // Arrange
  ArrowUp, ArrowDown, ArrowUpToLine, ArrowDownToLine, FlipHorizontal2, FlipVertical2,
  // Effects
  Wand2, Sparkles, Palette, SunMedium, Contrast, Droplets,
  // Export & Save
  Download, Save, FolderOpen, Share2,
  // Panels
  Settings2, LayoutGrid, Shield, Brain, Award, Zap,
  // Media
  Upload, ImagePlus, Eraser, Crop, RotateCcw,
  // Text
  Bold, Italic, Underline, AlignJustify,
  // Other
  Plus, Minus, Check, AlertCircle, Info, Grid3X3, Maximize2, ZoomIn, ZoomOut,
  PanelLeftClose, PanelRightClose, MoreHorizontal, Search, Filter,
  // New Icons for Assets
  Sticker, Shapes, ImageIcon, Library, Star, Crown, Shirt, Package,
  // Additional shape icons
  Triangle, Hexagon, Pentagon, ArrowRight, MessageCircle, Cloud, MessageSquare,
  // Tools icons
  Minus as LineIcon, Group, Ungroup, Tag, Ribbon, DollarSign, Percent,
  // Grid icons
  Grid, Move,
  // New icons for additional features
  Heart, CircleDot, Blend, AlignHorizontalDistributeCenter, AlignVerticalDistributeCenter,
  Frame, CreditCard, Facebook, Instagram, Twitter, Youtube, Linkedin,
  ShoppingBag, Timer, Flame, BadgePercent, Gift, Truck, Box, Sparkle,
  Type as TypeIcon, GalleryHorizontalEnd, Bot
} from 'lucide-react';
import PropertiesPanel from '@/components/editor/PropertiesPanel';
import AdvancedCompliancePanel from '@/components/editor/AdvancedCompliancePanel';
import AIQualityPrediction from '@/components/editor/AIQualityPrediction';
import ExportPanel from '@/components/editor/ExportPanel';
import TemplateMarketplace, { Template } from '@/components/editor/TemplateMarketplace';
import AssetLibrary from '@/components/editor/AssetLibrary';
import StockImagesLibrary from '@/components/editor/StockImagesLibrary';
import AICopilotPanel from '@/components/editor/AICopilotPanel';
import { CANVAS_SIZES } from '@/components/editor/CanvasEditor';
import * as fabric from 'fabric';

// Dynamic import for CanvasEditor
const CanvasEditor = dynamic(() => import('@/components/editor/CanvasEditor'), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-[#1a1a24]">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-violet-500/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-500 animate-spin"></div>
        </div>
        <p className="text-gray-400 text-sm">Loading Canvas Editor...</p>
      </div>
    </div>
  ),
});

interface Layer {
  id: string;
  name: string;
  type: string;
  visible: boolean;
  locked: boolean;
}

// Icon Button Component
const IconButton = ({ 
  icon: Icon, 
  onClick, 
  active = false, 
  disabled = false,
  tooltip,
  size = 'md',
  variant = 'ghost'
}: {
  icon: any;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  tooltip?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'solid' | 'outline';
}) => {
  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11'
  };
  
  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={tooltip}
      className={`
        ${sizeClasses[size]} rounded-md flex items-center justify-center transition-colors
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-white/10'}
        ${active ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}
        ${variant === 'solid' ? 'bg-violet-500 text-white hover:bg-violet-600' : ''}
        ${variant === 'outline' ? 'border border-white/10' : ''}
      `}
    >
      <Icon size={iconSizes[size]} strokeWidth={1.5} />
    </button>
  );
};

// Divider Component
const ToolbarDivider = () => (
  <div className="w-px h-6 bg-white/10 mx-1" />
);

// Panel Header Component
const PanelHeader = ({ icon: Icon, title, action }: { icon: any; title: string; action?: React.ReactNode }) => (
  <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
    <div className="flex items-center gap-2">
      <Icon size={16} className="text-violet-400" strokeWidth={1.5} />
      <span className="font-medium text-sm text-white">{title}</span>
    </div>
    {action}
  </div>
);

// Section Component
const Section = ({ title, children, collapsible = true, defaultOpen = true }: {
  title: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border-b border-white/5">
      <button
        onClick={() => collapsible && setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-white/5 transition-colors"
      >
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{title}</span>
        {collapsible && (
          <ChevronRight 
            size={14} 
            className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} 
          />
        )}
      </button>
      {isOpen && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
};

export default function EditorPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  // Refs
  const canvasInstanceRef = useRef<fabric.Canvas | null>(null);
  const editorMethodsRef = useRef<any>(null);

  // State
  const [canvasSize, setCanvasSize] = useState({ width: 728, height: 90 });
  const [selectedObject, setSelectedObject] = useState<any>(null);
  const [layers, setLayers] = useState<Layer[]>([]);
  const [selectedRetailer, setSelectedRetailer] = useState('tesco');
  const [showExportPanel, setShowExportPanel] = useState(false);
  const [showTemplateMarketplace, setShowTemplateMarketplace] = useState(false);
  const [showAssetLibrary, setShowAssetLibrary] = useState(false);
  const [showStockImages, setShowStockImages] = useState(false);
  const [showAICopyWriter, setShowAICopyWriter] = useState(false);
  const [isRemovingBg, setIsRemovingBg] = useState(false);
  const [isCropMode, setIsCropMode] = useState(false);
  const [activeTool, setActiveTool] = useState<'select' | 'pan' | 'text' | 'shape' | 'draw'>('select');
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [showDrawingTools, setShowDrawingTools] = useState(false);
  const [activeLeftPanel, setActiveLeftPanel] = useState<'elements' | 'templates' | 'assets' | 'layers'>('elements');
  const [activeRightPanel, setActiveRightPanel] = useState<'properties' | 'compliance' | 'ai'>('properties');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [zoom, setZoom] = useState(100);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [currentUser, setCurrentUser] = useState<{ 
    name: string; 
    email: string; 
    image?: string;
    organization?: string; 
    role?: string; 
    purpose?: string;
    createdAt?: string;
  } | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAIDropdown, setShowAIDropdown] = useState(false);
  const [showImageToolsDropdown, setShowImageToolsDropdown] = useState(false);
  const [showAICopilot, setShowAICopilot] = useState(false);

  // Check authentication - NextAuth session OR custom JWT
  useEffect(() => {
    const checkAuth = async () => {
      // First check NextAuth session
      if (status === 'authenticated' && session?.user) {
        setCurrentUser({
          name: session.user.name || 'User',
          email: session.user.email || '',
          image: session.user.image || undefined,
        });
        setIsAuthenticated(true);
        return;
      }
      
      // If NextAuth is still loading, wait
      if (status === 'loading') {
        return;
      }
      
      // Fallback to custom JWT
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setCurrentUser(data.user);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
  }, [session, status]);

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/auth');
    }
  }, [isAuthenticated, router]);

  // Handle logout
  const handleLogout = async () => {
    try {
      // Sign out from NextAuth
      const { signOut } = await import('next-auth/react');
      await signOut({ redirect: false });
      
      // Also logout from custom JWT
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/auth');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Close user menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showUserMenu) {
        const target = e.target as HTMLElement;
        if (!target.closest('.user-menu-container')) {
          setShowUserMenu(false);
        }
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserMenu]);

  // Show notification
  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Update layers
  const updateLayers = useCallback(() => {
    if (canvasInstanceRef.current) {
      const objects = canvasInstanceRef.current.getObjects();
      const newLayers: Layer[] = objects.map((obj: any, index: number) => ({
        id: obj.id || `layer-${index}`,
        name: getLayerName(obj, index),
        type: obj.type || 'object',
        visible: obj.visible !== false,
        locked: obj.lockMovementX === true,
      }));
      setLayers(newLayers.reverse());
    }
  }, []);

  const getLayerName = (obj: any, index: number) => {
    if (obj.name) return obj.name;
    switch (obj.type) {
      case 'i-text':
      case 'text':
        return `Text: "${(obj.text || '').substring(0, 12)}${(obj.text || '').length > 12 ? '...' : ''}"`;
      case 'image':
        return `Image ${index + 1}`;
      case 'rect':
        return `Rectangle ${index + 1}`;
      case 'circle':
        return `Circle ${index + 1}`;
      case 'group':
        return obj.badgeType ? `Badge: ${obj.badgeType}` : `Group ${index + 1}`;
      default:
        return `${obj.type} ${index + 1}`;
    }
  };

  // Canvas handlers
  const handleCanvasReady = useCallback((canvas: fabric.Canvas) => {
    canvasInstanceRef.current = canvas;
    setTimeout(() => {
      editorMethodsRef.current = (window as any).canvasEditor;
    }, 100);
    setTimeout(updateLayers, 100);
  }, [updateLayers]);

  const handleSelectionChange = useCallback((obj: fabric.FabricObject | null) => {
    setSelectedObject(obj);
  }, []);

  // Loading state - shown at the end in the return, not as early return
  const isLoading = isAuthenticated === null || status === 'loading';

  const handlePropertyChange = (property: string, value: any) => {
    if (selectedObject && canvasInstanceRef.current) {
      selectedObject.set(property, value);
      selectedObject.setCoords();
      canvasInstanceRef.current.requestRenderAll();
      updateLayers();
    }
  };

  // Element Actions
  const handleAddText = () => {
    editorMethodsRef.current?.addText?.('Add your text');
    showNotification('Text added', 'success');
    updateLayers();
  };

  const handleAddHeading = () => {
    editorMethodsRef.current?.addHeading?.();
    showNotification('Heading added', 'success');
    updateLayers();
  };

  const handleAddRectangle = () => {
    editorMethodsRef.current?.addRectangle?.();
    showNotification('Rectangle added', 'success');
    updateLayers();
  };

  const handleAddCircle = () => {
    editorMethodsRef.current?.addCircle?.();
    showNotification('Circle added', 'success');
    updateLayers();
  };

  // New shape handlers
  const handleAddTriangle = () => {
    editorMethodsRef.current?.addTriangle?.();
    showNotification('Triangle added', 'success');
    updateLayers();
  };

  const handleAddStar = () => {
    editorMethodsRef.current?.addStar?.();
    showNotification('Star added', 'success');
    updateLayers();
  };

  const handleAddHexagon = () => {
    editorMethodsRef.current?.addHexagon?.();
    showNotification('Hexagon added', 'success');
    updateLayers();
  };

  const handleAddPentagon = () => {
    editorMethodsRef.current?.addPentagon?.();
    showNotification('Pentagon added', 'success');
    updateLayers();
  };

  const handleAddLine = (hasArrow: boolean = false) => {
    editorMethodsRef.current?.addLine?.(hasArrow);
    showNotification(hasArrow ? 'Arrow added' : 'Line added', 'success');
    updateLayers();
  };

  const handleAddCallout = (type: 'speech' | 'thought' = 'speech') => {
    editorMethodsRef.current?.addCallout?.(type);
    showNotification('Callout added', 'success');
    updateLayers();
  };

  // Group/Ungroup handlers
  const handleGroupSelected = () => {
    editorMethodsRef.current?.groupSelected?.();
    showNotification('Objects grouped', 'success');
    updateLayers();
  };

  const handleUngroupSelected = () => {
    editorMethodsRef.current?.ungroupSelected?.();
    showNotification('Objects ungrouped', 'success');
    updateLayers();
  };

  // Price tag and badge handlers
  const handleAddPriceTag = (price: string, originalPrice?: string) => {
    editorMethodsRef.current?.addPriceTag?.(price, originalPrice);
    showNotification('Price tag added', 'success');
    updateLayers();
  };

  const handleAddRibbon = (text: string, color: string) => {
    editorMethodsRef.current?.addRibbon?.(text, color);
    showNotification('Ribbon added', 'success');
    updateLayers();
  };

  // Drop shadow handler
  const handleAddDropShadow = (blur: number, offsetX: number, offsetY: number, color: string) => {
    editorMethodsRef.current?.addDropShadow?.(blur, offsetX, offsetY, color);
    showNotification('Shadow applied', 'success');
  };

  const handleRemoveShadow = () => {
    editorMethodsRef.current?.removeShadow?.();
    showNotification('Shadow removed', 'success');
  };

  // Text stroke handler
  const handleSetTextStroke = (color: string, width: number) => {
    editorMethodsRef.current?.setTextStroke?.(color, width);
    showNotification('Text stroke applied', 'success');
  };

  // Grid handlers
  const handleShowGrid = () => {
    editorMethodsRef.current?.showGrid?.();
    showNotification('Grid shown', 'success');
  };

  const handleHideGrid = () => {
    editorMethodsRef.current?.hideGrid?.();
    showNotification('Grid hidden', 'success');
  };

  const handleEnableSnap = () => {
    editorMethodsRef.current?.enableSnapToGrid?.();
    showNotification('Snap to grid enabled', 'success');
  };

  const handleDisableSnap = () => {
    editorMethodsRef.current?.disableSnapToGrid?.();
    showNotification('Snap to grid disabled', 'success');
  };

  // Add stroked text
  const handleAddStrokedText = () => {
    editorMethodsRef.current?.addStrokedText?.();
    showNotification('Outlined text added', 'success');
    updateLayers();
  };

  // ============ NEW FEATURE HANDLERS ============

  // Image masking
  const handleMaskImage = (shape: 'circle' | 'triangle' | 'star' | 'hexagon' | 'heart') => {
    editorMethodsRef.current?.maskImageToShape?.(shape);
    showNotification(`Image masked to ${shape}`, 'success');
  };

  // Image effects
  const handleAddGlow = (color?: string, blur?: number) => {
    editorMethodsRef.current?.addGlow?.(color, blur);
    showNotification('Glow effect applied', 'success');
  };

  const handleAddImageOutline = (color?: string, width?: number) => {
    editorMethodsRef.current?.addImageOutline?.(color, width);
    showNotification('Outline added', 'success');
  };

  // Smart object fit
  const handleSmartFit = (mode: 'contain' | 'cover' | 'fill') => {
    editorMethodsRef.current?.smartObjectFit?.(mode);
    showNotification(`Image fit: ${mode}`, 'success');
  };

  // Curved text
  const handleAddCurvedText = () => {
    editorMethodsRef.current?.addCurvedText?.('SALE NOW ON');
    showNotification('Curved text added', 'success');
    updateLayers();
  };

  // Gradient text
  const handleAddGradientText = () => {
    editorMethodsRef.current?.addGradientText?.('GRADIENT');
    showNotification('Gradient text added', 'success');
    updateLayers();
  };

  // Blur background
  const handleBlurBackground = () => {
    editorMethodsRef.current?.blurBackground?.(5);
    showNotification('Background blurred', 'success');
  };

  // Color overlay
  const handleAddColorOverlay = (color: string, opacity: number) => {
    editorMethodsRef.current?.addColorOverlay?.(color, opacity);
    showNotification('Color overlay applied', 'success');
  };

  // Remove image filters
  const handleRemoveImageFilters = () => {
    editorMethodsRef.current?.removeImageFilters?.();
    showNotification('Filters removed', 'success');
  };

  // Distribution
  const handleDistributeH = () => {
    editorMethodsRef.current?.distributeHorizontal?.();
    showNotification('Distributed horizontally', 'success');
  };

  const handleDistributeV = () => {
    editorMethodsRef.current?.distributeVertical?.();
    showNotification('Distributed vertically', 'success');
  };

  // Clone pattern
  const handleClonePattern = () => {
    editorMethodsRef.current?.clonePattern?.(2, 3, 10, 10);
    showNotification('Pattern cloned', 'success');
    updateLayers();
  };

  // Social media icons
  const handleAddSocialIcon = (platform: 'facebook' | 'instagram' | 'twitter' | 'youtube' | 'whatsapp' | 'linkedin') => {
    editorMethodsRef.current?.addSocialIcon?.(platform);
    showNotification(`${platform} icon added`, 'success');
    updateLayers();
  };

  // Payment icons
  const handleAddPaymentIcon = (method: 'upi' | 'visa' | 'mastercard' | 'cod' | 'paytm' | 'gpay') => {
    editorMethodsRef.current?.addPaymentIcon?.(method);
    showNotification(`${method} icon added`, 'success');
    updateLayers();
  };

  // Decorative frames
  const handleAddFrame = (style: 'simple' | 'double' | 'dashed' | 'rounded' | 'fancy' | 'gradient' | 'shadow' | 'neon' | 'dotted' | 'thick') => {
    editorMethodsRef.current?.addDecorativeFrame?.(style);
    showNotification('Frame added', 'success');
    updateLayers();
  };

  // Product placeholder
  const handleAddPlaceholder = (size: 'small' | 'medium' | 'large') => {
    editorMethodsRef.current?.addProductPlaceholder?.(size);
    showNotification('Placeholder added', 'success');
    updateLayers();
  };

  // Drawing handlers
  const handleToggleDrawingMode = () => {
    if (activeTool === 'draw') {
      setActiveTool('select');
      editorMethodsRef.current?.disableDrawingMode?.();
      showNotification('Drawing mode off', 'info');
    } else {
      setActiveTool('draw');
      editorMethodsRef.current?.enableDrawingMode?.(brushColor, brushSize);
      showNotification('Drawing mode on - sketch freely!', 'success');
    }
  };

  const handleBrushColorChange = (color: string) => {
    setBrushColor(color);
    editorMethodsRef.current?.setBrushColor?.(color);
  };

  const handleBrushSizeChange = (size: number) => {
    setBrushSize(size);
    editorMethodsRef.current?.setBrushSize?.(size);
  };

  const handleClearDrawing = () => {
    editorMethodsRef.current?.clearDrawing?.();
    showNotification('Drawing cleared', 'info');
  };

  const handleAddImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        editorMethodsRef.current?.addImageFromFile?.(file);
        showNotification('Image added', 'success');
        updateLayers();
      }
    };
    input.click();
  };

  const handleAddBackground = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        editorMethodsRef.current?.setBackgroundImage?.(file);
        showNotification('Background set', 'success');
      }
    };
    input.click();
  };

  // Object actions
  const handleDelete = () => {
    editorMethodsRef.current?.deleteSelected?.();
    setSelectedObject(null);
    updateLayers();
  };

  const handleDuplicate = () => {
    editorMethodsRef.current?.duplicateSelected?.();
    updateLayers();
  };

  const handleBringForward = () => {
    editorMethodsRef.current?.bringForward?.();
    updateLayers();
  };

  const handleSendBackward = () => {
    editorMethodsRef.current?.sendBackward?.();
    updateLayers();
  };

  const handleBringToFront = () => {
    editorMethodsRef.current?.bringToFront?.();
    updateLayers();
  };

  const handleSendToBack = () => {
    editorMethodsRef.current?.sendToBack?.();
    updateLayers();
  };

  const handleFlipHorizontal = () => editorMethodsRef.current?.flipHorizontal?.();
  const handleFlipVertical = () => editorMethodsRef.current?.flipVertical?.();
  const handleToggleLock = () => { editorMethodsRef.current?.toggleLock?.(); updateLayers(); };
  const handleAlignObject = (alignment: string) => editorMethodsRef.current?.alignObject?.(alignment);
  const handleRemoveBackground = async () => {
    if (!selectedObject || selectedObject.type !== 'image') {
      showNotification('Please select an image first', 'error');
      return;
    }
    setIsRemovingBg(true);
    showNotification('Removing background with AI...', 'info');
    try {
      await editorMethodsRef.current?.removeBackground?.();
      showNotification('Background removed successfully!', 'success');
    } catch (error) {
      showNotification('Failed to remove background', 'error');
    } finally {
      setIsRemovingBg(false);
    }
  };
  
  // Crop handlers
  const handleStartCrop = () => {
    if (!selectedObject || selectedObject.type !== 'image') {
      showNotification('Please select an image first', 'error');
      return;
    }
    const result = editorMethodsRef.current?.startCrop?.();
    if (result?.success) {
      setIsCropMode(true);
      showNotification('Crop mode activated. Adjust the selection and click Apply.', 'info');
    } else {
      showNotification(result?.message || 'Failed to start crop', 'error');
    }
  };

  const handleApplyCrop = () => {
    const result = editorMethodsRef.current?.applyCrop?.();
    if (result?.success) {
      setIsCropMode(false);
      showNotification('Image cropped successfully!', 'success');
      updateLayers();
    } else {
      showNotification(result?.message || 'Failed to apply crop', 'error');
    }
  };

  const handleCancelCrop = () => {
    editorMethodsRef.current?.cancelCrop?.();
    setIsCropMode(false);
    showNotification('Crop cancelled', 'info');
  };
  
  const handleApplyFilter = (filter: string) => editorMethodsRef.current?.applyFilter?.(filter);
  const handleAdjustImage = (type: string, value: number) => editorMethodsRef.current?.adjustImage?.(type, value);
  const handleAddTextShadow = (blur: number, offsetX: number, offsetY: number, color: string) => {
    editorMethodsRef.current?.addTextShadow?.(blur, offsetX, offsetY, color);
  };

  // AI Feature Handlers (Using Groq - FREE!)
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Generate AI Ad Copy
  const handleGenerateAdCopy = async () => {
    if (!aiPrompt.trim()) {
      showNotification('Enter a product or sale description', 'info');
      return;
    }
    setIsAiLoading(true);
    showNotification('Generating ad copy...', 'info');
    try {
      const response = await fetch('/api/huggingface', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: 'generate-copy', prompt: aiPrompt }),
      });
      const result = await response.json();
      if (result.success && result.result) {
        // Add the generated text to canvas
        editorMethodsRef.current?.addText?.(result.result);
        showNotification('Ad copy added to canvas!', 'success');
        updateLayers();
      } else {
        showNotification(result.error || 'Generation failed', 'error');
      }
    } catch {
      showNotification('AI generation failed', 'error');
    }
    setIsAiLoading(false);
  };

  // AI Color Palette Suggestion
  const handleSuggestColors = async () => {
    setIsAiLoading(true);
    showNotification('Getting AI color suggestions...', 'info');
    try {
      const response = await fetch('/api/huggingface', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          task: 'suggest-colors', 
          prompt: aiPrompt || 'modern sale banner with energy and urgency' 
        }),
      });
      const result = await response.json();
      if (result.success && result.result) {
        const colors = result.result;
        // Set first color as background
        if (colors[0]) {
          editorMethodsRef.current?.setBackgroundColor?.(colors[0]);
        }
        showNotification(`Colors: ${colors.join(', ')}`, 'success');
      } else {
        showNotification('Color suggestion failed', 'error');
      }
    } catch {
      showNotification('AI colors failed', 'error');
    }
    setIsAiLoading(false);
  };

  // AI Improve Text
  const handleImproveText = async () => {
    // Get selected text object
    const objects = editorMethodsRef.current?.getObjects?.();
    const selectedText = objects?.find((obj: any) => 
      (obj.type === 'i-text' || obj.type === 'text') && obj.selected
    );
    
    if (!selectedText) {
      showNotification('Select a text object first', 'info');
      return;
    }
    
    setIsAiLoading(true);
    showNotification('Improving text...', 'info');
    try {
      const response = await fetch('/api/huggingface', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          task: 'improve-text', 
          prompt: (selectedText as any).text || ''
        }),
      });
      const result = await response.json();
      if (result.success && result.result) {
        // Update the text
        (selectedText as any).set('text', result.result);
        editorMethodsRef.current?.getObjects?.(); // Trigger refresh
        showNotification('Text improved!', 'success');
      }
    } catch {
      showNotification('Text improvement failed', 'error');
    }
    setIsAiLoading(false);
  };

  const handleAutoArrange = () => {
    editorMethodsRef.current?.autoArrange?.();
    showNotification('Auto-arranged', 'success');
  };

  const handleExtractColors = () => {
    const colors = editorMethodsRef.current?.extractColors?.();
    if (colors?.length > 0) {
      showNotification(`${colors.length} colors extracted`, 'info');
    }
  };

  const handleUndo = () => { editorMethodsRef.current?.undo?.(); updateLayers(); };
  const handleRedo = () => { editorMethodsRef.current?.redo?.(); updateLayers(); };

  const handleCanvasSizeChange = (sizeKey: string) => {
    const size = CANVAS_SIZES[sizeKey as keyof typeof CANVAS_SIZES];
    if (size) {
      setCanvasSize({ width: size.width, height: size.height });
      editorMethodsRef.current?.setCanvasSize?.(size.width, size.height, true);
      showNotification(`Canvas: ${size.name}`, 'info');
    }
  };

  const handleBgColorChange = (color: string) => {
    setBgColor(color);
    editorMethodsRef.current?.setBackgroundColor?.(color);
  };

  const handleExport = (format: string, quality: number) => {
    return editorMethodsRef.current?.exportImage?.(format, quality);
  };

  const handleExportMultiple = (sizes: string[], format: string, quality: number) => {
    editorMethodsRef.current?.exportMultiple?.(sizes, format, quality);
    showNotification(`Exporting ${sizes.length} formats...`, 'info');
  };

  const handleSaveProject = () => {
    editorMethodsRef.current?.saveProject?.();
    showNotification('Project saved', 'success');
  };

  const handleLoadProject = () => {
    const loaded = editorMethodsRef.current?.loadProject?.();
    if (loaded) {
      showNotification('Project loaded', 'success');
      updateLayers();
    } else {
      showNotification('No saved project found', 'error');
    }
  };

  const handleSelectTemplate = (template: Template) => {
    if (canvasInstanceRef.current) {
      canvasInstanceRef.current.backgroundColor = template.elements.backgroundColor;
      
      const itext = new fabric.IText(template.elements.ctaText, {
        left: 50,
        top: 30,
        fontSize: 28,
        fontFamily: template.elements.fontPrimary,
        fill: template.elements.primaryColor,
        fontWeight: 'bold',
      });
      canvasInstanceRef.current.add(itext);
      canvasInstanceRef.current.requestRenderAll();
      updateLayers();
      showNotification(`Template "${template.name}" applied`, 'success');
    }
    setShowTemplateMarketplace(false);
  };

  const handleSelectLayer = (id: string) => {
    if (canvasInstanceRef.current) {
      const objects = canvasInstanceRef.current.getObjects();
      const idx = layers.findIndex(l => l.id === id);
      if (idx !== -1) {
        const obj = objects[layers.length - 1 - idx];
        if (obj) {
          canvasInstanceRef.current.setActiveObject(obj);
          canvasInstanceRef.current.requestRenderAll();
          setSelectedObject(obj);
        }
      }
    }
  };

  const handleToggleLayerVisibility = (id: string) => {
    if (canvasInstanceRef.current) {
      const objects = canvasInstanceRef.current.getObjects();
      const idx = layers.findIndex(l => l.id === id);
      if (idx !== -1) {
        const obj = objects[layers.length - 1 - idx];
        if (obj) {
          obj.visible = !obj.visible;
          canvasInstanceRef.current.requestRenderAll();
          updateLayers();
        }
      }
    }
  };

  const handleZoom = (delta: number) => {
    const newZoom = Math.max(25, Math.min(200, zoom + delta));
    setZoom(newZoom);
  };

  // Asset Library Handlers
  const handleAddSticker = (svg: string) => {
    if (canvasInstanceRef.current) {
      fabric.loadSVGFromString(svg).then((result) => {
        const objects = result.objects.filter((obj): obj is fabric.FabricObject => obj !== null);
        if (objects.length > 0) {
          const group = new fabric.Group(objects, {
            left: canvasInstanceRef.current!.width! / 2,
            top: canvasInstanceRef.current!.height! / 2,
            originX: 'center',
            originY: 'center',
            scaleX: 0.8,
            scaleY: 0.8,
          });
          canvasInstanceRef.current!.add(group);
          canvasInstanceRef.current!.setActiveObject(group);
          canvasInstanceRef.current!.requestRenderAll();
          updateLayers();
          showNotification('Sticker added', 'success');
        }
      });
    }
  };

  const handleAddShape = (shape: any) => {
    if (!canvasInstanceRef.current) return;
    
    let fabricObj: fabric.FabricObject | null = null;
    const centerX = canvasInstanceRef.current.width! / 2;
    const centerY = canvasInstanceRef.current.height! / 2;
    
    switch (shape.type) {
      case 'rect':
        fabricObj = new fabric.Rect({
          left: centerX,
          top: centerY,
          originX: 'center',
          originY: 'center',
          width: shape.props?.width || 150,
          height: shape.props?.height || 100,
          fill: shape.props?.fill || '#7c3aed',
          rx: shape.props?.rx || 0,
          ry: shape.props?.rx || 0,
          stroke: shape.props?.stroke,
          strokeWidth: shape.props?.strokeWidth,
        });
        break;
      case 'circle':
        fabricObj = new fabric.Circle({
          left: centerX,
          top: centerY,
          originX: 'center',
          originY: 'center',
          radius: shape.props?.radius || 50,
          fill: shape.props?.fill || '#ef4444',
          stroke: shape.props?.stroke,
          strokeWidth: shape.props?.strokeWidth,
        });
        break;
      case 'ellipse':
        fabricObj = new fabric.Ellipse({
          left: centerX,
          top: centerY,
          originX: 'center',
          originY: 'center',
          rx: shape.props?.rx || 80,
          ry: shape.props?.ry || 50,
          fill: shape.props?.fill || '#f97316',
        });
        break;
      case 'triangle':
        fabricObj = new fabric.Triangle({
          left: centerX,
          top: centerY,
          originX: 'center',
          originY: 'center',
          width: shape.props?.width || 120,
          height: shape.props?.height || 100,
          fill: shape.props?.fill || '#22c55e',
        });
        break;
      case 'polygon':
        // Create star or polygon
        const points = shape.points || 5;
        const outerRadius = 50;
        const innerRadius = shape.innerRadius ? outerRadius * shape.innerRadius : outerRadius * 0.5;
        const polyPoints: { x: number; y: number }[] = [];
        
        for (let i = 0; i < points * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (Math.PI / points) * i - Math.PI / 2;
          polyPoints.push({
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius
          });
        }
        
        fabricObj = new fabric.Polygon(polyPoints, {
          left: centerX,
          top: centerY,
          originX: 'center',
          originY: 'center',
          fill: shape.fill || '#fbbf24',
          angle: shape.rotation || 0,
        });
        break;
      case 'line':
        fabricObj = new fabric.Line([0, 0, shape.props?.x2 || 150, 0], {
          left: centerX - 75,
          top: centerY,
          stroke: shape.props?.stroke || '#1f2937',
          strokeWidth: shape.props?.strokeWidth || 4,
        });
        break;
    }
    
    if (fabricObj) {
      canvasInstanceRef.current.add(fabricObj);
      canvasInstanceRef.current.setActiveObject(fabricObj);
      canvasInstanceRef.current.requestRenderAll();
      updateLayers();
      showNotification('Shape added', 'success');
    }
  };

  const handleAddIcon = (iconName: string, color: string) => {
    if (canvasInstanceRef.current) {
      // Icon SVG paths from Lucide icons
      const iconPaths: Record<string, string> = {
        'Shopping Bag': 'M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z M3 6h18 M16 10a4 4 0 0 1-8 0',
        'Shopping Cart': 'M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6 M9 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M20 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
        'Tag': 'M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z M7 7h.01',
        'Percent': 'M19 5L5 19 M6.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z M17.5 20a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
        'Gift': 'M20 12v10H4V12 M2 7h20v5H2z M12 22V7 M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z',
        'Credit Card': 'M1 4h22v16H1z M1 10h22',
        'Wallet': 'M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4 M4 6v12a2 2 0 0 0 2 2h14v-4 M18 12a2 2 0 0 0 0 4h4v-4h-4z',
        'Package': 'M16.5 9.4l-9-5.19 M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z M3.27 6.96L12 12.01l8.73-5.05 M12 22.08V12',
        'Box': 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z',
        'Truck': 'M1 3h15v13H1z M16 8h4l3 3v5h-7V8z M5.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z M18.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
        'Store': 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
        'Award': 'M12 15l-3.77 3.03.93-4.58L5 10h4.6L12 5.5 14.4 10H19l-4.16 3.45.93 4.58z',
        'Heart': 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
        'Star': 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
        'Zap': 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
        'Rocket': 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0 M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5',
        'Phone': 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
        'Mail': 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
        'Map Pin': 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
        'Globe': 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z',
      };
      
      const pathData = iconPaths[iconName];
      if (pathData) {
        // Create icon as SVG path
        const icon = new fabric.Path(pathData, {
          left: canvasInstanceRef.current.width! / 2,
          top: canvasInstanceRef.current.height! / 2,
          originX: 'center',
          originY: 'center',
          fill: 'transparent',
          stroke: color,
          strokeWidth: 2,
          scaleX: 2,
          scaleY: 2,
        });
        canvasInstanceRef.current.add(icon);
        canvasInstanceRef.current.setActiveObject(icon);
      } else {
        // Fallback: Create styled text badge for icon
        const badgeWidth = iconName.length * 10 + 40;
        const bg = new fabric.Rect({
          width: badgeWidth,
          height: 40,
          fill: color,
          rx: 8,
          ry: 8,
        });
        const text = new fabric.Text(iconName, {
          fontSize: 14,
          fontFamily: 'Inter, sans-serif',
          fill: '#ffffff',
          fontWeight: '600',
          left: badgeWidth / 2,
          top: 20,
          originX: 'center',
          originY: 'center',
        });
        const group = new fabric.Group([bg, text], {
          left: canvasInstanceRef.current.width! / 2,
          top: canvasInstanceRef.current.height! / 2,
          originX: 'center',
          originY: 'center',
        });
        canvasInstanceRef.current.add(group);
        canvasInstanceRef.current.setActiveObject(group);
      }
      canvasInstanceRef.current.requestRenderAll();
      updateLayers();
      showNotification(`${iconName} icon added`, 'success');
    }
  };

  const handleApplyGradient = (colors: string[], angle: number) => {
    if (canvasInstanceRef.current) {
      const gradient = new fabric.Gradient({
        type: 'linear',
        coords: {
          x1: 0,
          y1: 0,
          x2: canvasInstanceRef.current.width!,
          y2: canvasInstanceRef.current.height!,
        },
        colorStops: colors.map((color, index) => ({
          offset: index / (colors.length - 1),
          color: color,
        })),
      });
      
      // Create a rect with gradient as background
      const bgRect = new fabric.Rect({
        left: 0,
        top: 0,
        width: canvasInstanceRef.current.width!,
        height: canvasInstanceRef.current.height!,
        fill: gradient,
        selectable: false,
        evented: false,
      });
      
      // Remove any existing background rect and add new one at bottom
      const objects = canvasInstanceRef.current.getObjects();
      objects.forEach((obj: any) => {
        if (obj.isBackground) {
          canvasInstanceRef.current!.remove(obj);
        }
      });
      
      (bgRect as any).isBackground = true;
      canvasInstanceRef.current.add(bgRect);
      canvasInstanceRef.current.sendObjectToBack(bgRect);
      canvasInstanceRef.current.requestRenderAll();
      showNotification('Gradient background applied', 'success');
    }
  };

  const handleApplyTemplate = (template: any) => {
    if (canvasInstanceRef.current) {
      // Clear canvas
      canvasInstanceRef.current.clear();
      
      // Apply background
      if (template.elements.background.type === 'gradient') {
        handleApplyGradient(template.elements.background.colors, 135);
      } else {
        canvasInstanceRef.current.backgroundColor = template.elements.background.color;
      }
      
      // Add headline
      if (template.elements.headline) {
        const headline = new fabric.IText(template.elements.headline.text, {
          left: canvasInstanceRef.current.width! / 2,
          top: canvasInstanceRef.current.height! * 0.35,
          originX: 'center',
          originY: 'center',
          fontSize: Math.min(template.elements.headline.size, canvasInstanceRef.current.height! * 0.4),
          fontFamily: template.elements.headline.font,
          fill: template.elements.headline.color,
          fontWeight: template.elements.headline.weight || '700',
        });
        canvasInstanceRef.current.add(headline);
      }
      
      // Add subtext
      if (template.elements.subtext) {
        const subtext = new fabric.IText(template.elements.subtext.text, {
          left: canvasInstanceRef.current.width! / 2,
          top: canvasInstanceRef.current.height! * 0.55,
          originX: 'center',
          originY: 'center',
          fontSize: Math.min(template.elements.subtext.size, canvasInstanceRef.current.height! * 0.2),
          fontFamily: template.elements.subtext.font,
          fill: template.elements.subtext.color,
        });
        canvasInstanceRef.current.add(subtext);
      }
      
      // Add CTA button
      if (template.elements.cta) {
        const ctaRect = new fabric.Rect({
          left: canvasInstanceRef.current.width! / 2 - 60,
          top: canvasInstanceRef.current.height! * 0.72,
          width: 120,
          height: 36,
          fill: template.elements.cta.bg,
          rx: 8,
          ry: 8,
        });
        
        const ctaText = new fabric.IText(template.elements.cta.text, {
          left: canvasInstanceRef.current.width! / 2,
          top: canvasInstanceRef.current.height! * 0.72 + 18,
          originX: 'center',
          originY: 'center',
          fontSize: 14,
          fontFamily: 'Inter, sans-serif',
          fill: template.elements.cta.color,
          fontWeight: '600',
        });
        
        canvasInstanceRef.current.add(ctaRect, ctaText);
      }
      
      canvasInstanceRef.current.requestRenderAll();
      updateLayers();
      showNotification(`Template "${template.name}" applied`, 'success');
    }
    setShowAssetLibrary(false);
  };

  const handleChangeFont = (fontFamily: string) => {
    if (selectedObject && selectedObject.type === 'i-text' && canvasInstanceRef.current) {
      selectedObject.set('fontFamily', fontFamily);
      canvasInstanceRef.current.requestRenderAll();
      showNotification('Font changed', 'success');
    } else {
      showNotification('Select a text element first', 'info');
    }
  };

  const handleAddStockImage = (url: string) => {
    if (canvasInstanceRef.current) {
      fabric.FabricImage.fromURL(url, { crossOrigin: 'anonymous' }).then((img) => {
        const scale = Math.min(
          (canvasInstanceRef.current!.width! * 0.5) / img.width!,
          (canvasInstanceRef.current!.height! * 0.8) / img.height!
        );
        img.scale(scale);
        img.set({
          left: canvasInstanceRef.current!.width! / 2,
          top: canvasInstanceRef.current!.height! / 2,
          originX: 'center',
          originY: 'center',
        });
        canvasInstanceRef.current!.add(img);
        canvasInstanceRef.current!.setActiveObject(img);
        canvasInstanceRef.current!.requestRenderAll();
        updateLayers();
        showNotification('Image added', 'success');
      });
    }
  };

  const handleSetStockBackground = (url: string) => {
    if (canvasInstanceRef.current) {
      fabric.FabricImage.fromURL(url, { crossOrigin: 'anonymous' }).then((img) => {
        const scaleX = canvasInstanceRef.current!.width! / img.width!;
        const scaleY = canvasInstanceRef.current!.height! / img.height!;
        const scale = Math.max(scaleX, scaleY);
        
        img.scale(scale);
        img.set({
          left: canvasInstanceRef.current!.width! / 2,
          top: canvasInstanceRef.current!.height! / 2,
          originX: 'center',
          originY: 'center',
          selectable: false,
          evented: false,
        });
        
        // Remove existing background images
        const objects = canvasInstanceRef.current!.getObjects();
        objects.forEach((obj: any) => {
          if (obj.isBackgroundImage) {
            canvasInstanceRef.current!.remove(obj);
          }
        });
        
        (img as any).isBackgroundImage = true;
        canvasInstanceRef.current!.add(img);
        canvasInstanceRef.current!.sendObjectToBack(img);
        canvasInstanceRef.current!.requestRenderAll();
        showNotification('Background set', 'success');
      });
    }
  };

  const handleAddLogo = (svg: string) => {
    if (canvasInstanceRef.current) {
      fabric.loadSVGFromString(svg).then((result) => {
        const objects = result.objects.filter((obj): obj is fabric.FabricObject => obj !== null);
        if (objects.length > 0) {
          const group = new fabric.Group(objects, {
            left: canvasInstanceRef.current!.width! / 2,
            top: canvasInstanceRef.current!.height! / 2,
            originX: 'center',
            originY: 'center',
            scaleX: 0.5,
            scaleY: 0.5,
          });
          canvasInstanceRef.current!.add(group);
          canvasInstanceRef.current!.setActiveObject(group);
          canvasInstanceRef.current!.requestRenderAll();
          updateLayers();
          showNotification('Logo added', 'success');
        }
      });
    }
  };

  return (
    <>
      {/* Loading State */}
      {isLoading && (
        <div className="min-h-screen bg-[#13131a] flex items-center justify-center">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-violet-500/20"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-500 animate-spin"></div>
            </div>
            <p className="text-gray-400 text-sm">Loading...</p>
          </div>
        </div>
      )}

      {/* Main Editor - only show when not loading */}
      {!isLoading && (
    <div className="h-screen flex flex-col bg-[#0f0f14] text-white overflow-hidden select-none">
      {/* Notification Toast */}
      {notification && (
        <div className={`
          fixed top-4 right-4 z-[100] px-4 py-2.5 rounded-lg flex items-center gap-2
          ${notification.type === 'success' ? 'bg-emerald-500 text-white' :
            notification.type === 'error' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}
        `}>
          {notification.type === 'success' && <Check size={18} />}
          {notification.type === 'error' && <AlertCircle size={18} />}
          {notification.type === 'info' && <Info size={18} />}
          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}

      {/* ======================= TOP HEADER ======================= */}
      <header className="h-12 border-b border-white/[0.06] flex items-center justify-between px-3 bg-[#16161d] shrink-0">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
            <span className="text-[16px] font-bold tracking-tight text-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Retail<span className="text-violet-400">Sync</span>
            </span>
          </Link>
          
          <div className="h-5 w-px bg-white/10" />
          
          <div className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-white/5 cursor-pointer transition-colors">
            <span className="text-sm text-gray-400">Untitled</span>
            <ChevronDown size={14} className="text-gray-500" />
          </div>
        </div>

        {/* Center: Canvas Size */}
        <div className="flex items-center gap-2">
          <select
            value={`${canvasSize.width}x${canvasSize.height}`}
            onChange={(e) => {
              const key = Object.keys(CANVAS_SIZES).find(k => {
                const s = CANVAS_SIZES[k as keyof typeof CANVAS_SIZES];
                return `${s.width}x${s.height}` === e.target.value;
              });
              if (key) handleCanvasSizeChange(key);
            }}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-violet-500 cursor-pointer hover:bg-white/10 transition-colors"
          >
            {Object.entries(CANVAS_SIZES).map(([key, size]) => (
              <option key={key} value={`${size.width}x${size.height}`} className="bg-[#1a1a24]">
                {size.name}
              </option>
            ))}
          </select>
          
          <div className="flex items-center gap-1 bg-white/5 rounded-lg px-2 py-1">
            <button onClick={() => handleZoom(-25)} className="p-1 hover:bg-white/10 rounded">
              <ZoomOut size={14} className="text-gray-400" />
            </button>
            <span className="text-xs text-gray-400 w-12 text-center">{zoom}%</span>
            <button onClick={() => handleZoom(25)} className="p-1 hover:bg-white/10 rounded">
              <ZoomIn size={14} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Crop Button */}
          {!isCropMode ? (
            <button
              onClick={handleStartCrop}
              disabled={!selectedObject || selectedObject?.type !== 'image'}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedObject?.type === 'image' 
                  ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                  : 'bg-white/5 text-gray-500 cursor-not-allowed'
              } disabled:opacity-50`}
            >
              <Crop size={16} />
              Crop
            </button>
          ) : (
            <div className="flex items-center gap-1">
              <button
                onClick={handleApplyCrop}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-green-500 hover:bg-green-600 text-white"
              >
                <Check size={16} />
                Apply
              </button>
              <button
                onClick={handleCancelCrop}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-red-500 hover:bg-red-600 text-white"
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          )}
          
          {/* Remove Background Button - Prominent */}
          <button
            onClick={handleRemoveBackground}
            disabled={isRemovingBg || !selectedObject || selectedObject?.type !== 'image'}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              selectedObject?.type === 'image' 
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/25' 
                : 'bg-white/5 text-gray-500 cursor-not-allowed'
            } disabled:opacity-50`}
          >
            {isRemovingBg ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Removing...
              </>
            ) : (
              <>
                <Eraser size={16} />
                Remove BG
              </>
            )}
          </button>
          
          <ToolbarDivider />
          <IconButton icon={Save} onClick={handleSaveProject} tooltip="Save Project" size="sm" />
          <IconButton icon={FolderOpen} onClick={handleLoadProject} tooltip="Load Project" size="sm" />
          <ToolbarDivider />
          <button
            onClick={() => setShowExportPanel(true)}
            className="flex items-center gap-2 px-4 py-1.5 bg-violet-500 hover:bg-violet-600 rounded-lg text-sm font-medium transition-colors"
          >
            <Download size={16} />
            Export
          </button>
          
          {/* User Profile Dropdown */}
          {currentUser && (
            <>
              <ToolbarDivider />
              <div className="relative user-menu-container">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-gray-300 hidden sm:block">{currentUser.name.split(' ')[0]}</span>
                  <ChevronDown size={14} className="text-gray-500" />
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-[#1a1a24] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden">
                    {/* User Info Header */}
                    <div className="p-4 bg-gradient-to-br from-violet-500/10 to-purple-600/10 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-lg font-bold text-white">
                          {currentUser.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate">{currentUser.name}</p>
                          <p className="text-xs text-gray-400 truncate">{currentUser.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* User Details */}
                    <div className="p-3 space-y-2 border-b border-white/10">
                      {currentUser.organization && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-gray-500">Organization:</span>
                          <span className="text-gray-300">{currentUser.organization}</span>
                        </div>
                      )}
                      {currentUser.role && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-gray-500">Role:</span>
                          <span className="text-gray-300">{currentUser.role}</span>
                        </div>
                      )}
                      {currentUser.purpose && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-gray-500">Purpose:</span>
                          <span className="text-gray-300">{currentUser.purpose}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </header>

      {/* ======================= MAIN TOOLBAR ======================= */}
      <div className="h-11 border-b border-white/[0.06] flex items-center px-3 bg-[#1a1a24] gap-1 shrink-0">
        {/* History */}
        <div className="flex items-center gap-0.5">
          <IconButton icon={Undo2} onClick={handleUndo} tooltip="Undo (Ctrl+Z)" size="sm" />
          <IconButton icon={Redo2} onClick={handleRedo} tooltip="Redo (Ctrl+Y)" size="sm" />
        </div>
        
        <ToolbarDivider />
        
        {/* Tools */}
        <div className="flex items-center gap-0.5">
          <IconButton 
            icon={MousePointer2} 
            onClick={() => { setActiveTool('select'); editorMethodsRef.current?.disableDrawingMode?.(); }} 
            active={activeTool === 'select'} 
            tooltip="Select (V)" 
            size="sm" 
          />
          <IconButton 
            icon={Hand} 
            onClick={() => { setActiveTool('pan'); editorMethodsRef.current?.disableDrawingMode?.(); }} 
            active={activeTool === 'pan'} 
            tooltip="Pan (H)" 
            size="sm" 
          />
          
          {/* Drawing Tool with Dropdown */}
          <div className="relative">
            <button
              onClick={handleToggleDrawingMode}
              className={`p-1.5 rounded-lg transition-all ${
                activeTool === 'draw' 
                  ? 'bg-pink-500 text-white' 
                  : 'hover:bg-white/10 text-gray-400'
              }`}
              title="Draw / Sketch (D)"
            >
              <Pencil size={16} />
            </button>
            {activeTool === 'draw' && (
              <button
                onClick={() => setShowDrawingTools(!showDrawingTools)}
                className="absolute -bottom-1 -right-1 w-3 h-3 bg-pink-600 rounded-full flex items-center justify-center"
              >
                <ChevronDown size={8} className="text-white" />
              </button>
            )}
            
            {/* Drawing Tools Panel */}
            {showDrawingTools && activeTool === 'draw' && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-[#1a1a24] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden p-3 space-y-3">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-2">Brush Color</p>
                  <div className="flex gap-1.5 flex-wrap">
                    {['#000000', '#ffffff', '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899'].map(color => (
                      <button
                        key={color}
                        onClick={() => handleBrushColorChange(color)}
                        className={`w-6 h-6 rounded-full border-2 transition-all ${
                          brushColor === color ? 'border-white scale-110' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <input
                    type="color"
                    value={brushColor}
                    onChange={(e) => handleBrushColorChange(e.target.value)}
                    className="w-full h-6 mt-2 rounded cursor-pointer"
                  />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-2">Brush Size: {brushSize}px</p>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={brushSize}
                    onChange={(e) => handleBrushSizeChange(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-pink-500"
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-gray-500">1px</span>
                    <span className="text-[10px] text-gray-500">50px</span>
                  </div>
                </div>
                <button
                  onClick={handleClearDrawing}
                  className="w-full py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium flex items-center justify-center gap-2"
                >
                  <Eraser size={14} />
                  Clear All Drawing
                </button>
              </div>
            )}
          </div>
        </div>
        
        <ToolbarDivider />
        
        {/* Add Elements */}
        <div className="flex items-center gap-0.5">
          <IconButton icon={Type} onClick={handleAddText} tooltip="Add Text (T)" size="sm" />
          <IconButton icon={Square} onClick={handleAddRectangle} tooltip="Rectangle (R)" size="sm" />
          <IconButton icon={Circle} onClick={handleAddCircle} tooltip="Circle (C)" size="sm" />
          <IconButton icon={ImagePlus} onClick={handleAddImage} tooltip="Add Image" size="sm" />
        </div>
        
        <ToolbarDivider />
        
        {/* Object Actions */}
        <div className="flex items-center gap-0.5">
          <IconButton icon={Copy} onClick={handleDuplicate} tooltip="Duplicate (Ctrl+D)" size="sm" disabled={!selectedObject} />
          <IconButton icon={Trash2} onClick={handleDelete} tooltip="Delete (Del)" size="sm" disabled={!selectedObject} />
        </div>
        
        <ToolbarDivider />
        
        {/* Arrange */}
        <div className="flex items-center gap-0.5">
          <IconButton icon={ArrowUpToLine} onClick={handleBringToFront} tooltip="Bring to Front" size="sm" disabled={!selectedObject} />
          <IconButton icon={ArrowUp} onClick={handleBringForward} tooltip="Bring Forward" size="sm" disabled={!selectedObject} />
          <IconButton icon={ArrowDown} onClick={handleSendBackward} tooltip="Send Backward" size="sm" disabled={!selectedObject} />
          <IconButton icon={ArrowDownToLine} onClick={handleSendToBack} tooltip="Send to Back" size="sm" disabled={!selectedObject} />
        </div>
        
        <ToolbarDivider />
        
        {/* Transform */}
        <div className="flex items-center gap-0.5">
          <IconButton icon={FlipHorizontal2} onClick={handleFlipHorizontal} tooltip="Flip Horizontal" size="sm" disabled={!selectedObject} />
          <IconButton icon={FlipVertical2} onClick={handleFlipVertical} tooltip="Flip Vertical" size="sm" disabled={!selectedObject} />
          <IconButton 
            icon={selectedObject?.lockMovementX ? Lock : Unlock} 
            onClick={handleToggleLock} 
            tooltip="Lock/Unlock" 
            size="sm" 
            disabled={!selectedObject}
            active={selectedObject?.lockMovementX}
          />
        </div>
        
        <ToolbarDivider />
        
        {/* Alignment */}
        <div className="flex items-center gap-0.5">
          <IconButton icon={AlignLeft} onClick={() => handleAlignObject('left')} tooltip="Align Left" size="sm" disabled={!selectedObject} />
          <IconButton icon={AlignCenter} onClick={() => handleAlignObject('center')} tooltip="Align Center" size="sm" disabled={!selectedObject} />
          <IconButton icon={AlignRight} onClick={() => handleAlignObject('right')} tooltip="Align Right" size="sm" disabled={!selectedObject} />
          <IconButton icon={AlignStartVertical} onClick={() => handleAlignObject('top')} tooltip="Align Top" size="sm" disabled={!selectedObject} />
          <IconButton icon={AlignCenterVertical} onClick={() => handleAlignObject('middle')} tooltip="Align Middle" size="sm" disabled={!selectedObject} />
          <IconButton icon={AlignEndVertical} onClick={() => handleAlignObject('bottom')} tooltip="Align Bottom" size="sm" disabled={!selectedObject} />
        </div>
        
        <ToolbarDivider />
        
        {/* AI Copywriter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowAIDropdown(!showAIDropdown)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              showAIDropdown 
                ? 'bg-violet-500 text-white' 
                : 'bg-violet-500/10 text-violet-400 hover:bg-violet-500/20'
            }`}
          >
            <Sparkles size={14} />
            <span>AI Copy</span>
            <ChevronDown size={12} className={`transition-transform ${showAIDropdown ? 'rotate-180' : ''}`} />
          </button>
          
          {showAIDropdown && (
            <div className="absolute top-full left-0 mt-2 w-72 bg-[#1a1a24] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden">
              <div className="p-3 border-b border-white/10">
                <p className="text-xs font-medium text-white mb-2">Generate Ad Copy</p>
                <input
                  type="text"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="e.g., 50% off electronics sale..."
                  className="w-full px-3 py-2 bg-[#16161d] border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-violet-500"
                />
                <button
                  onClick={() => { handleGenerateAdCopy(); setShowAIDropdown(false); }}
                  disabled={isAiLoading}
                  className="w-full mt-2 flex items-center justify-center gap-2 py-2 rounded-lg bg-violet-500 hover:bg-violet-600 text-white text-xs font-medium disabled:opacity-50"
                >
                  {isAiLoading ? (
                    <><div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating...</>
                  ) : (
                    <><Sparkles size={12} /> Generate</>
                  )}
                </button>
              </div>
              <div className="p-2 grid grid-cols-2 gap-1.5">
                <button onClick={() => { handleSuggestColors(); setShowAIDropdown(false); }} disabled={isAiLoading} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-gray-300">
                  <Palette size={12} className="text-cyan-400" /> AI Colors
                </button>
                <button onClick={() => { handleImproveText(); setShowAIDropdown(false); }} disabled={isAiLoading} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-gray-300">
                  <Wand2 size={12} className="text-pink-400" /> Improve Text
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Image Tools Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowImageToolsDropdown(!showImageToolsDropdown)}
            disabled={!selectedObject || selectedObject?.type !== 'image'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              showImageToolsDropdown 
                ? 'bg-cyan-500 text-white' 
                : selectedObject?.type === 'image'
                  ? 'bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20'
                  : 'bg-white/5 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Image size={14} />
            <span>Image</span>
            <ChevronDown size={12} className={`transition-transform ${showImageToolsDropdown ? 'rotate-180' : ''}`} />
          </button>
          
          {showImageToolsDropdown && selectedObject?.type === 'image' && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-[#1a1a24] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden">
              <div className="p-2 border-b border-white/10">
                <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-2">Mask to Shape</p>
                <div className="grid grid-cols-5 gap-1">
                  <button onClick={() => { handleMaskImage('circle'); setShowImageToolsDropdown(false); }} className="aspect-square rounded bg-white/5 hover:bg-white/10 flex items-center justify-center" title="Circle">
                    <Circle size={14} className="text-gray-400" />
                  </button>
                  <button onClick={() => { handleMaskImage('triangle'); setShowImageToolsDropdown(false); }} className="aspect-square rounded bg-white/5 hover:bg-white/10 flex items-center justify-center" title="Triangle">
                    <Triangle size={14} className="text-gray-400" />
                  </button>
                  <button onClick={() => { handleMaskImage('star'); setShowImageToolsDropdown(false); }} className="aspect-square rounded bg-white/5 hover:bg-white/10 flex items-center justify-center" title="Star">
                    <Star size={14} className="text-gray-400" />
                  </button>
                  <button onClick={() => { handleMaskImage('hexagon'); setShowImageToolsDropdown(false); }} className="aspect-square rounded bg-white/5 hover:bg-white/10 flex items-center justify-center" title="Hexagon">
                    <Hexagon size={14} className="text-gray-400" />
                  </button>
                  <button onClick={() => { handleMaskImage('heart'); setShowImageToolsDropdown(false); }} className="aspect-square rounded bg-white/5 hover:bg-white/10 flex items-center justify-center" title="Heart">
                    <Heart size={14} className="text-gray-400" />
                  </button>
                </div>
              </div>
              <div className="p-2 border-b border-white/10">
                <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-2">Smart Fit</p>
                <div className="grid grid-cols-3 gap-1">
                  <button onClick={() => { handleSmartFit('contain'); setShowImageToolsDropdown(false); }} className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-[10px] text-gray-400">Contain</button>
                  <button onClick={() => { handleSmartFit('cover'); setShowImageToolsDropdown(false); }} className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-[10px] text-gray-400">Cover</button>
                  <button onClick={() => { handleSmartFit('fill'); setShowImageToolsDropdown(false); }} className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-[10px] text-gray-400">Fill</button>
                </div>
              </div>
              <div className="p-2">
                <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-2">Effects</p>
                <div className="grid grid-cols-2 gap-1">
                  <button onClick={() => { handleAddGlow('#ffffff', 20); setShowImageToolsDropdown(false); }} className="flex items-center gap-1.5 p-1.5 rounded bg-white/5 hover:bg-white/10 text-[10px] text-gray-400">
                    <Sparkle size={12} className="text-yellow-400" /> Glow
                  </button>
                  <button onClick={() => { handleAddImageOutline('#000000', 3); setShowImageToolsDropdown(false); }} className="flex items-center gap-1.5 p-1.5 rounded bg-white/5 hover:bg-white/10 text-[10px] text-gray-400">
                    <CircleDot size={12} /> Outline
                  </button>
                  <button onClick={() => { handleAddColorOverlay('#000000', 0.5); setShowImageToolsDropdown(false); }} className="flex items-center gap-1.5 p-1.5 rounded bg-white/5 hover:bg-white/10 text-[10px] text-gray-400">
                    <Blend size={12} className="text-blue-400" /> Overlay
                  </button>
                  <button onClick={() => { handleRemoveImageFilters(); setShowImageToolsDropdown(false); }} className="flex items-center gap-1.5 p-1.5 rounded bg-white/5 hover:bg-white/10 text-[10px] text-gray-400">
                    <Eraser size={12} className="text-red-400" /> Clear
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex-1" />
        
        {/* Right Side Tools */}
        <div className="flex items-center gap-0.5">
          <IconButton icon={Wand2} onClick={handleAutoArrange} tooltip="Auto Arrange" size="sm" />
          <IconButton icon={Palette} onClick={handleExtractColors} tooltip="Extract Colors" size="sm" />
          <ToolbarDivider />
          
          {/* AI Agent Button */}
          <button
            onClick={() => setShowAICopilot(!showAICopilot)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              showAICopilot 
                ? 'bg-gradient-to-r from-violet-500 to-pink-500 text-white' 
                : 'bg-gradient-to-r from-violet-500/10 to-pink-500/10 text-violet-400 hover:from-violet-500/20 hover:to-pink-500/20'
            }`}
          >
            <Bot size={14} />
            <span>AI Agent</span>
          </button>
          
          <ToolbarDivider />
          <IconButton 
            icon={PanelLeftClose} 
            onClick={() => setLeftSidebarOpen(!leftSidebarOpen)} 
            active={leftSidebarOpen}
            tooltip="Toggle Left Panel"
            size="sm"
          />
          <IconButton 
            icon={PanelRightClose} 
            onClick={() => setRightSidebarOpen(!rightSidebarOpen)} 
            active={rightSidebarOpen}
            tooltip="Toggle Right Panel"
            size="sm"
          />
        </div>
      </div>

      {/* ======================= MAIN CONTENT ======================= */}
      <div className="flex-1 flex overflow-hidden">
        {/* ======================= LEFT SIDEBAR ======================= */}
        <aside className={`${leftSidebarOpen ? 'w-72' : 'w-0'} border-r border-white/[0.06] bg-[#16161d] flex flex-col overflow-hidden transition-all duration-300`}>
          {/* Panel Tabs */}
          <div className="flex border-b border-white/[0.06] shrink-0">
            {[
              { id: 'elements', icon: Plus, label: 'Elements' },
              { id: 'templates', icon: LayoutGrid, label: 'Templates' },
              { id: 'assets', icon: Sparkles, label: 'Assets' },
              { id: 'layers', icon: Layers, label: 'Layers' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveLeftPanel(tab.id as any)}
                className={`flex-1 py-2.5 flex flex-col items-center gap-1 transition-all text-xs
                  ${activeLeftPanel === tab.id 
                    ? 'bg-white/5 text-white border-b-2 border-violet-500' 
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]'}`}
              >
                <tab.icon size={16} strokeWidth={1.5} />
                <span className="text-[10px]">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {activeLeftPanel === 'elements' && (
              <>
                {/* Text Section */}
                <Section title="Text">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleAddHeading}
                      className="flex flex-col items-center justify-center p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
                    >
                      <span className="text-xl font-bold text-white">Aa</span>
                      <span className="text-[10px] text-gray-500 mt-1">Heading</span>
                    </button>
                    <button
                      onClick={handleAddText}
                      className="flex flex-col items-center justify-center p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
                    >
                      <span className="text-base text-white">Aa</span>
                      <span className="text-[10px] text-gray-500 mt-1">Body Text</span>
                    </button>
                    <button
                      onClick={handleAddStrokedText}
                      className="flex flex-col items-center justify-center p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors col-span-2"
                    >
                      <span className="text-lg font-bold text-white" style={{ WebkitTextStroke: '1px #666' }}>Aa</span>
                      <span className="text-[10px] text-gray-500 mt-1">Outlined Text</span>
                    </button>
                  </div>
                </Section>

                {/* Shapes Section */}
                <Section title="Shapes">
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={handleAddRectangle}
                      className="aspect-square rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center transition-colors"
                      title="Rectangle"
                    >
                      <Square size={18} className="text-gray-400" strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={handleAddCircle}
                      className="aspect-square rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center transition-colors"
                      title="Circle"
                    >
                      <Circle size={18} className="text-gray-400" strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={handleAddTriangle}
                      className="aspect-square rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center transition-colors"
                      title="Triangle"
                    >
                      <Triangle size={18} className="text-gray-400" strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={handleAddStar}
                      className="aspect-square rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center transition-colors"
                      title="Star"
                    >
                      <Star size={18} className="text-gray-400" strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={handleAddHexagon}
                      className="aspect-square rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center transition-colors"
                      title="Hexagon"
                    >
                      <Hexagon size={18} className="text-gray-400" strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={handleAddPentagon}
                      className="aspect-square rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center transition-colors"
                      title="Pentagon"
                    >
                      <Pentagon size={18} className="text-gray-400" strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={() => handleAddLine(false)}
                      className="aspect-square rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center transition-colors"
                      title="Line"
                    >
                      <LineIcon size={18} className="text-gray-400" strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={() => handleAddLine(true)}
                      className="aspect-square rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center transition-colors"
                      title="Arrow"
                    >
                      <ArrowRight size={18} className="text-gray-400" strokeWidth={1.5} />
                    </button>
                  </div>
                  {/* Callouts */}
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <button
                      onClick={() => handleAddCallout('speech')}
                      className="flex items-center justify-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
                    >
                      <MessageCircle size={16} className="text-gray-400" />
                      <span className="text-[10px] text-gray-400">Speech</span>
                    </button>
                    <button
                      onClick={() => handleAddCallout('thought')}
                      className="flex items-center justify-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
                    >
                      <Cloud size={16} className="text-gray-400" />
                      <span className="text-[10px] text-gray-400">Thought</span>
                    </button>
                  </div>
                </Section>

                {/* Social & Payment Icons */}
                <Section title="Social & Payment">
                  <div className="space-y-2">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">Social Media</p>
                    <div className="grid grid-cols-6 gap-1.5">
                      <button onClick={() => handleAddSocialIcon('facebook')} className="aspect-square rounded bg-[#1877F2]/20 hover:bg-[#1877F2]/30 flex items-center justify-center" title="Facebook">
                        <Facebook size={14} className="text-[#1877F2]" />
                      </button>
                      <button onClick={() => handleAddSocialIcon('instagram')} className="aspect-square rounded bg-[#E4405F]/20 hover:bg-[#E4405F]/30 flex items-center justify-center" title="Instagram">
                        <Instagram size={14} className="text-[#E4405F]" />
                      </button>
                      <button onClick={() => handleAddSocialIcon('twitter')} className="aspect-square rounded bg-gray-500/20 hover:bg-gray-500/30 flex items-center justify-center" title="Twitter/X">
                        <Twitter size={14} className="text-gray-300" />
                      </button>
                      <button onClick={() => handleAddSocialIcon('youtube')} className="aspect-square rounded bg-[#FF0000]/20 hover:bg-[#FF0000]/30 flex items-center justify-center" title="YouTube">
                        <Youtube size={14} className="text-[#FF0000]" />
                      </button>
                      <button onClick={() => handleAddSocialIcon('linkedin')} className="aspect-square rounded bg-[#0A66C2]/20 hover:bg-[#0A66C2]/30 flex items-center justify-center" title="LinkedIn">
                        <Linkedin size={14} className="text-[#0A66C2]" />
                      </button>
                      <button onClick={() => handleAddSocialIcon('whatsapp')} className="aspect-square rounded bg-[#25D366]/20 hover:bg-[#25D366]/30 flex items-center justify-center" title="WhatsApp">
                        <MessageCircle size={14} className="text-[#25D366]" />
                      </button>
                    </div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide mt-3">Payment Methods</p>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button onClick={() => handleAddPaymentIcon('upi')} className="p-1.5 rounded bg-purple-500/10 hover:bg-purple-500/20 text-[10px] text-purple-300 font-medium">UPI</button>
                      <button onClick={() => handleAddPaymentIcon('visa')} className="p-1.5 rounded bg-blue-500/10 hover:bg-blue-500/20 text-[10px] text-blue-300 font-medium">VISA</button>
                      <button onClick={() => handleAddPaymentIcon('mastercard')} className="p-1.5 rounded bg-orange-500/10 hover:bg-orange-500/20 text-[10px] text-orange-300 font-medium">MasterCard</button>
                      <button onClick={() => handleAddPaymentIcon('paytm')} className="p-1.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-[10px] text-cyan-300 font-medium">Paytm</button>
                      <button onClick={() => handleAddPaymentIcon('gpay')} className="p-1.5 rounded bg-blue-500/10 hover:bg-blue-500/20 text-[10px] text-blue-300 font-medium">GPay</button>
                      <button onClick={() => handleAddPaymentIcon('cod')} className="p-1.5 rounded bg-green-500/10 hover:bg-green-500/20 text-[10px] text-green-300 font-medium">COD</button>
                    </div>
                  </div>
                </Section>

                {/* Frames & Placeholders */}
                <Section title="Frames & Placeholders">
                  <div className="space-y-3">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">Decorative Frames</p>
                    <div className="grid grid-cols-5 gap-1.5">
                      <button onClick={() => handleAddFrame('simple')} className="aspect-square rounded bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center" title="Simple Border">
                        <Square size={14} className="text-gray-400" />
                      </button>
                      <button onClick={() => handleAddFrame('double')} className="aspect-square rounded bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center" title="Double Border">
                        <Frame size={14} className="text-gray-400" />
                      </button>
                      <button onClick={() => handleAddFrame('dashed')} className="aspect-square rounded bg-white/5 hover:bg-white/10 border border-dashed border-white/10 flex items-center justify-center" title="Dashed Border">
                        <Square size={14} className="text-gray-400" strokeDasharray="3 2" />
                      </button>
                      <button onClick={() => handleAddFrame('rounded')} className="aspect-square rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center" title="Rounded">
                        <Square size={14} className="text-gray-400" style={{ borderRadius: 4 }} />
                      </button>
                      <button onClick={() => handleAddFrame('fancy')} className="aspect-square rounded bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/20 flex items-center justify-center" title="Fancy Gold">
                        <Crown size={14} className="text-yellow-400" />
                      </button>
                      <button onClick={() => handleAddFrame('gradient')} className="aspect-square rounded bg-gradient-to-br from-violet-500/20 to-pink-500/20 hover:from-violet-500/30 hover:to-pink-500/30 border border-violet-500/20 flex items-center justify-center" title="Gradient">
                        <Blend size={14} className="text-violet-400" />
                      </button>
                      <button onClick={() => handleAddFrame('shadow')} className="aspect-square rounded bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center shadow-lg" title="Shadow Box">
                        <Square size={14} className="text-blue-400" />
                      </button>
                      <button onClick={() => handleAddFrame('neon')} className="aspect-square rounded bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 flex items-center justify-center" title="Neon Glow">
                        <Sparkle size={14} className="text-green-400" />
                      </button>
                      <button onClick={() => handleAddFrame('dotted')} className="aspect-square rounded bg-white/5 hover:bg-white/10 border border-dotted border-white/20 flex items-center justify-center" title="Dotted">
                        <CircleDot size={14} className="text-gray-400" />
                      </button>
                      <button onClick={() => handleAddFrame('thick')} className="aspect-square rounded bg-white/5 hover:bg-white/10 border-2 border-white/20 flex items-center justify-center" title="Thick Border">
                        <Square size={14} className="text-orange-400" strokeWidth={2.5} />
                      </button>
                    </div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide mt-3">Product Placeholders</p>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button onClick={() => handleAddPlaceholder('small')} className="p-2 rounded bg-white/5 hover:bg-white/10 border border-dashed border-white/10 text-center">
                        <Box size={16} className="text-gray-400 mx-auto" />
                        <span className="text-[10px] text-gray-500">Small</span>
                      </button>
                      <button onClick={() => handleAddPlaceholder('medium')} className="p-2 rounded bg-white/5 hover:bg-white/10 border border-dashed border-white/10 text-center">
                        <Box size={20} className="text-gray-400 mx-auto" />
                        <span className="text-[10px] text-gray-500">Medium</span>
                      </button>
                      <button onClick={() => handleAddPlaceholder('large')} className="p-2 rounded bg-white/5 hover:bg-white/10 border border-dashed border-white/10 text-center">
                        <Box size={24} className="text-gray-400 mx-auto" />
                        <span className="text-[10px] text-gray-500">Large</span>
                      </button>
                    </div>
                  </div>
                </Section>

                {/* Text Effects */}
                <Section title="Text Effects">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleAddCurvedText}
                      className="flex items-center gap-2 p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 transition-colors"
                    >
                      <GalleryHorizontalEnd size={14} className="text-cyan-400" />
                      <span className="text-xs text-gray-300">Curved</span>
                    </button>
                    <button
                      onClick={handleAddGradientText}
                      className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-pink-500/20 to-blue-500/20 hover:from-pink-500/30 hover:to-blue-500/30 border border-pink-500/20 transition-colors"
                    >
                      <Blend size={14} className="text-pink-400" />
                      <span className="text-xs text-gray-300">Gradient</span>
                    </button>
                  </div>
                </Section>

                {/* Tools Section */}
                <Section title="Tools">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleGroupSelected}
                      className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
                    >
                      <Group size={14} className="text-gray-400" />
                      <span className="text-xs text-gray-400">Group</span>
                    </button>
                    <button
                      onClick={handleUngroupSelected}
                      className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
                    >
                      <Ungroup size={14} className="text-gray-400" />
                      <span className="text-xs text-gray-400">Ungroup</span>
                    </button>
                    <button
                      onClick={handleDistributeH}
                      className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
                    >
                      <AlignHorizontalDistributeCenter size={14} className="text-gray-400" />
                      <span className="text-xs text-gray-400">Distribute H</span>
                    </button>
                    <button
                      onClick={handleDistributeV}
                      className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
                    >
                      <AlignVerticalDistributeCenter size={14} className="text-gray-400" />
                      <span className="text-xs text-gray-400">Distribute V</span>
                    </button>
                    <button
                      onClick={handleClonePattern}
                      className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
                    >
                      <Copy size={14} className="text-gray-400" />
                      <span className="text-xs text-gray-400">Clone Grid</span>
                    </button>
                    <button
                      onClick={handleBlurBackground}
                      className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
                    >
                      <Droplets size={14} className="text-gray-400" />
                      <span className="text-xs text-gray-400">Blur BG</span>
                    </button>
                    <button
                      onClick={handleShowGrid}
                      className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
                    >
                      <Grid size={14} className="text-gray-400" />
                      <span className="text-xs text-gray-400">Show Grid</span>
                    </button>
                    <button
                      onClick={handleHideGrid}
                      className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
                    >
                      <Grid3X3 size={14} className="text-gray-400" />
                      <span className="text-xs text-gray-400">Hide Grid</span>
                    </button>
                    <button
                      onClick={handleEnableSnap}
                      className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
                    >
                      <Move size={14} className="text-gray-400" />
                      <span className="text-xs text-gray-400">Snap On</span>
                    </button>
                    <button
                      onClick={handleDisableSnap}
                      className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
                    >
                      <Move size={14} className="text-gray-400 opacity-50" />
                      <span className="text-xs text-gray-400">Snap Off</span>
                    </button>
                  </div>
                </Section>

                {/* Media Section */}
                <Section title="Media">
                  <div className="space-y-2">
                    <button
                      onClick={handleAddImage}
                      className="w-full flex items-center gap-3 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 border-dashed transition-colors"
                    >
                      <div className="w-8 h-8 rounded bg-violet-500/10 flex items-center justify-center">
                        <Upload size={16} className="text-violet-400" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-white">Upload Image</p>
                        <p className="text-[10px] text-gray-500">PNG, JPG, SVG</p>
                      </div>
                    </button>
                    <button
                      onClick={handleAddBackground}
                      className="w-full flex items-center gap-3 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 border-dashed transition-colors"
                    >
                      <div className="w-8 h-8 rounded bg-fuchsia-500/10 flex items-center justify-center">
                        <Image size={16} className="text-fuchsia-400" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-white">Set Background</p>
                        <p className="text-[10px] text-gray-500">Background Image</p>
                      </div>
                    </button>
                  </div>
                </Section>

                {/* Background Color */}
                <Section title="Background">
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => handleBgColorChange(e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer border-2 border-white/10 overflow-hidden"
                    />
                    <input
                      type="text"
                      value={bgColor}
                      onChange={(e) => handleBgColorChange(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-8 gap-1.5 mt-3">
                    {['#ffffff', '#000000', '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'].map(color => (
                      <button
                        key={color}
                        onClick={() => handleBgColorChange(color)}
                        className={`w-full aspect-square rounded-lg border-2 transition-all ${bgColor === color ? 'border-violet-500 scale-110' : 'border-white/10 hover:border-white/30'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </Section>
              </>
            )}

            {activeLeftPanel === 'templates' && (
              <div className="p-4">
                <button
                  onClick={() => setShowTemplateMarketplace(true)}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 transition-colors"
                >
                  <LayoutGrid size={16} className="text-violet-400" />
                  <span className="text-sm text-white">Browse Templates</span>
                </button>
                
                {/* Quick Templates */}
                <div className="mt-4 space-y-2">
                  <h4 className="text-xs text-gray-500 uppercase tracking-wider">Quick Start</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {['Sale Banner', 'Product Card', 'Social Post', 'Story'].map((name) => (
                      <button
                        key={name}
                        onClick={() => setShowTemplateMarketplace(true)}
                        className="aspect-video rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-xs text-gray-400 hover:text-white transition-colors"
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeLeftPanel === 'assets' && (
              <div className="p-4 space-y-4">
                {/* Asset Library Buttons */}
                <button
                  onClick={() => setShowAssetLibrary(true)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 transition-colors"
                >
                  <div className="w-8 h-8 rounded bg-violet-500 flex items-center justify-center">
                    <Sparkles size={16} className="text-white" />
                  </div>
                  <div className="text-left">
                    <span className="text-sm text-white block">Asset Library</span>
                    <span className="text-[10px] text-gray-500">Templates, Stickers, Icons</span>
                  </div>
                </button>

                <button
                  onClick={() => setShowStockImages(true)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors"
                >
                  <div className="w-8 h-8 rounded bg-emerald-500 flex items-center justify-center">
                    <Image size={16} className="text-white" />
                  </div>
                  <div className="text-left">
                    <span className="text-sm text-white block">Stock Images</span>
                    <span className="text-[10px] text-gray-500">Free photos & logos</span>
                  </div>
                </button>

                {/* Quick Assets Grid */}
                <div className="mt-4">
                  <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-3">Quick Add</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { icon: Star, label: 'Stickers', color: 'bg-yellow-500' },
                      { icon: Square, label: 'Shapes', color: 'bg-blue-500' },
                      { icon: Type, label: 'Fonts', color: 'bg-purple-500' },
                      { icon: Palette, label: 'Gradients', color: 'bg-green-500' },
                      { icon: Crown, label: 'Premium', color: 'bg-amber-500' },
                      { icon: Award, label: 'Badges', color: 'bg-red-500' },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={() => setShowAssetLibrary(true)}
                        className="aspect-square rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] flex flex-col items-center justify-center gap-1 transition-colors"
                      >
                        <div className={`w-7 h-7 rounded-md ${item.color} flex items-center justify-center`}>
                          <item.icon size={14} className="text-white" />
                        </div>
                        <span className="text-[9px] text-gray-400">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="mt-4">
                  <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-3">Categories</h4>
                  <div className="space-y-1">
                    {[
                      { name: 'Sale & Discounts', count: '24 items' },
                      { name: 'Social Media', count: '18 items' },
                      { name: 'Food & Restaurant', count: '32 items' },
                      { name: 'Fashion & Beauty', count: '28 items' },
                      { name: 'Tech & Gadgets', count: '15 items' },
                    ].map((cat) => (
                      <button
                        key={cat.name}
                        onClick={() => setShowAssetLibrary(true)}
                        className="w-full flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] transition-colors"
                      >
                        <span className="text-sm text-white">{cat.name}</span>
                        <span className="text-[10px] text-gray-500">{cat.count}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeLeftPanel === 'layers' && (
              <div className="p-2">
                {layers.length === 0 ? (
                  <div className="text-center py-12">
                    <Layers size={32} className="mx-auto text-gray-600 mb-2" />
                    <p className="text-sm text-gray-500">No layers yet</p>
                    <p className="text-xs text-gray-600">Add elements to get started</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {layers.map((layer, index) => (
                      <div
                        key={layer.id}
                        onClick={() => handleSelectLayer(layer.id)}
                        className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                          selectedObject?.id === layer.id ? 'bg-violet-500/15 border border-violet-500/30' : 'hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <button
                          onClick={(e) => { e.stopPropagation(); handleToggleLayerVisibility(layer.id); }}
                          className="p-1 hover:bg-white/10 rounded"
                        >
                          {layer.visible ? <Eye size={14} className="text-gray-400" /> : <EyeOff size={14} className="text-gray-600" />}
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white truncate">{layer.name}</p>
                          <p className="text-[10px] text-gray-500 capitalize">{layer.type}</p>
                        </div>
                        {layer.locked && <Lock size={12} className="text-orange-400" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </aside>

        {/* ======================= CANVAS AREA ======================= */}
        <main className="flex-1 flex flex-col bg-[#0f0f14] overflow-hidden relative">
          {/* Grid Pattern - pointer-events-none to allow clicks through */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          />
          
          {/* Canvas Container */}
          <div className="flex-1 flex items-center justify-center overflow-auto p-8 relative z-10" style={{ background: 'radial-gradient(circle at center, #1a1a24 0%, #0f0f14 100%)' }}>
            {/* Canvas Wrapper - Simple container without conflicting transforms */}
            <div 
              className="relative shadow-2xl shadow-black/50 rounded-lg overflow-visible"
              style={{ 
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'center center'
              }}
            >
              <CanvasEditor
                width={canvasSize.width}
                height={canvasSize.height}
                onSelectionChange={handleSelectionChange}
                onCanvasChange={updateLayers}
                onReady={handleCanvasReady}
                onLayersChange={updateLayers}
                onComplianceCheck={() => {}}
              />
            </div>
          </div>
        </main>

        {/* ======================= RIGHT SIDEBAR ======================= */}
        <aside className={`${rightSidebarOpen ? 'w-80' : 'w-0'} border-l border-white/[0.06] bg-[#16161d] flex flex-col overflow-hidden transition-all duration-300`}>
          {/* Panel Tabs */}
          <div className="flex border-b border-white/[0.06] shrink-0">
            {[
              { id: 'properties', icon: Settings2, label: 'Properties' },
              { id: 'compliance', icon: Shield, label: 'Compliance' },
              { id: 'ai', icon: Brain, label: 'AI Analysis' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveRightPanel(tab.id as any)}
                className={`flex-1 py-2.5 flex flex-col items-center gap-1 transition-all text-xs
                  ${activeRightPanel === tab.id 
                    ? 'bg-white/5 text-white border-b-2 border-violet-500' 
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]'}`}
              >
                <tab.icon size={16} strokeWidth={1.5} />
                <span className="text-[10px]">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {activeRightPanel === 'properties' && (
              <PropertiesPanel
                selectedObject={selectedObject}
                onPropertyChange={handlePropertyChange}
                onDelete={handleDelete}
                onDuplicate={handleDuplicate}
                onBringForward={handleBringForward}
                onSendBackward={handleSendBackward}
                onBringToFront={handleBringToFront}
                onSendToBack={handleSendToBack}
                onFlipHorizontal={handleFlipHorizontal}
                onFlipVertical={handleFlipVertical}
                onToggleLock={handleToggleLock}
                onAlignObject={handleAlignObject}
                onRemoveBackground={handleRemoveBackground}
                onApplyFilter={handleApplyFilter}
                onAdjustImage={handleAdjustImage}
                onAddTextShadow={handleAddTextShadow}
                onAddDropShadow={handleAddDropShadow}
                onRemoveShadow={handleRemoveShadow}
                onSetTextStroke={handleSetTextStroke}
              />
            )}

            {activeRightPanel === 'compliance' && (
              <AdvancedCompliancePanel
                canvas={canvasInstanceRef.current}
                selectedRetailer={selectedRetailer}
                onRetailerChange={setSelectedRetailer}
              />
            )}

            {activeRightPanel === 'ai' && (
              <AIQualityPrediction
                canvas={canvasInstanceRef.current}
                category="snacks"
              />
            )}
          </div>
        </aside>
      </div>

      {/* ======================= MODALS ======================= */}
      <ExportPanel
        isOpen={showExportPanel}
        onClose={() => setShowExportPanel(false)}
        onExport={handleExport}
        onExportMultiple={handleExportMultiple}
      />

      <TemplateMarketplace
        isOpen={showTemplateMarketplace}
        onClose={() => setShowTemplateMarketplace(false)}
        onSelectTemplate={handleSelectTemplate}
      />

      <AssetLibrary
        isOpen={showAssetLibrary}
        onClose={() => setShowAssetLibrary(false)}
        onAddSticker={handleAddSticker}
        onAddShape={handleAddShape}
        onAddIcon={handleAddIcon}
        onApplyGradient={handleApplyGradient}
        onApplyTemplate={handleApplyTemplate}
        onChangeFont={handleChangeFont}
      />

      <StockImagesLibrary
        isOpen={showStockImages}
        onClose={() => setShowStockImages(false)}
        onSelectImage={handleAddStockImage}
        onSetBackground={handleSetStockBackground}
        onAddLogo={handleAddLogo}
      />

      {/* AI Copilot Panel */}
      <AICopilotPanel
        isOpen={showAICopilot}
        onClose={() => setShowAICopilot(false)}
        editorMethods={editorMethodsRef.current}
        selectedObject={selectedObject}
        canvasInfo={{
          width: canvasSize.width,
          height: canvasSize.height,
          backgroundColor: bgColor,
          objectCount: layers.length,
        }}
      />

      {/* Global Styles */}
      <style jsx global>{`
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
      )}
    </>
  );
}
