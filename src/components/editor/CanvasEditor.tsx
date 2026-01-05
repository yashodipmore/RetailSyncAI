'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as fabric from 'fabric';

// Filter types for image processing
type FilterType = 'grayscale' | 'sepia' | 'invert' | 'blur' | 'sharpen' | 'none';

// Canvas size presets
export const CANVAS_SIZES = {
  'banner-728x90': { width: 728, height: 90, name: 'Banner (728×90)' },
  'square-300x300': { width: 300, height: 300, name: 'Square (300×300)' },
  'mrec-300x250': { width: 300, height: 250, name: 'Medium Rectangle (300×250)' },
  'leaderboard-970x90': { width: 970, height: 90, name: 'Leaderboard (970×90)' },
  'skyscraper-160x600': { width: 160, height: 600, name: 'Skyscraper (160×600)' },
  'billboard-970x250': { width: 970, height: 250, name: 'Billboard (970×250)' },
  'facebook-1200x628': { width: 1200, height: 628, name: 'Facebook (1200×628)' },
  'instagram-1080x1080': { width: 1080, height: 1080, name: 'Instagram (1080×1080)' },
  'instagram-story-1080x1920': { width: 1080, height: 1920, name: 'Instagram Story (1080×1920)' },
  'twitter-1200x675': { width: 1200, height: 675, name: 'Twitter (1200×675)' },
  'linkedin-1200x627': { width: 1200, height: 627, name: 'LinkedIn (1200×627)' },
};

interface CanvasEditorProps {
  width?: number;
  height?: number;
  tool?: string;
  onSelectionChange?: (obj: fabric.FabricObject | null) => void;
  onCanvasChange?: () => void;
  onReady?: (canvas: fabric.Canvas) => void;
  onLayersChange?: () => void;
  onComplianceCheck?: () => void;
}

export interface CanvasRef {
  canvas: fabric.Canvas | null;
  addText: (text?: string) => void;
  addHeading: () => void;
  addRectangle: () => void;
  addCircle: () => void;
  addImage: (url: string) => void;
  addImageFromFile: (file: File) => void;
  setBackgroundImage: (file: File) => void;
  removeBackground: () => void;
  deleteSelected: () => void;
  duplicateSelected: () => void;
  bringForward: () => void;
  sendBackward: () => void;
  bringToFront: () => void;
  sendToBack: () => void;
  flipHorizontal: () => void;
  flipVertical: () => void;
  toggleLock: () => void;
  alignObject: (alignment: string) => void;
  autoArrange: () => void;
  extractColors: () => string[];
  applyFilter: (filter: FilterType) => void;
  adjustImage: (type: 'brightness' | 'contrast' | 'saturation', value: number) => void;
  undo: () => void;
  redo: () => void;
  exportImage: (format: string, quality?: number) => string | null;
  exportMultiple: (sizes: string[], format: string, quality: number) => void;
  setCanvasSize: (width: number, height: number, scaleObjects?: boolean) => void;
  setBackgroundColor: (color: string) => void;
  getObjects: () => fabric.FabricObject[];
  clear: () => void;
  loadJSON: (json: string) => void;
  toJSON: () => string;
  saveProject: () => void;
  loadProject: () => boolean;
  addTextShadow: (blur: number, offsetX: number, offsetY: number, color: string) => void;
  // AI Features
  generateAIImage: (prompt: string) => Promise<void>;
  enhanceImage: () => Promise<void>;
  getImageCaption: () => Promise<string | null>;
  aiRemoveBackground: () => Promise<void>;
  // New features
  maskImageToShape: (shape: 'circle' | 'triangle' | 'star' | 'hexagon' | 'heart') => void;
  addGlow: (color?: string, blur?: number) => void;
  addImageOutline: (color?: string, width?: number) => void;
  smartObjectFit: (mode: 'contain' | 'cover' | 'fill') => void;
  addCurvedText: (text?: string, radius?: number, startAngle?: number) => void;
  addGradientText: (text?: string, colors?: string[]) => void;
  blurBackground: (blurAmount?: number) => void;
  addColorOverlay: (color?: string, opacity?: number) => void;
  removeImageFilters: () => void;
  distributeHorizontal: () => void;
  distributeVertical: () => void;
  clonePattern: (rows?: number, cols?: number, spacingX?: number, spacingY?: number) => void;
  addSocialIcon: (platform: 'facebook' | 'instagram' | 'twitter' | 'youtube' | 'whatsapp' | 'linkedin') => void;
  addPaymentIcon: (method: 'upi' | 'visa' | 'mastercard' | 'cod' | 'paytm' | 'gpay') => void;
  addDecorativeFrame: (style: 'simple' | 'double' | 'dashed' | 'rounded' | 'fancy' | 'gradient' | 'shadow' | 'neon' | 'dotted' | 'thick') => void;
  addProductPlaceholder: (size?: 'small' | 'medium' | 'large') => void;
  // Drawing tools
  enableDrawingMode: (brushColor?: string, brushSize?: number) => void;
  disableDrawingMode: () => void;
  setBrushColor: (color: string) => void;
  setBrushSize: (size: number) => void;
  clearDrawing: () => void;
  // Crop tools
  startCrop: () => { success: boolean; message: string };
  applyCrop: () => { success: boolean; message: string };
  cancelCrop: () => { success: boolean; message: string } | void;
}

export default function CanvasEditor({ 
  width = 728, 
  height = 90,
  tool,
  onSelectionChange,
  onCanvasChange,
  onReady,
  onLayersChange,
  onComplianceCheck
}: CanvasEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isReady, setIsReady] = useState(false);
  const historyRef = useRef<{ states: string[]; index: number }>({ states: [], index: -1 });

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current || fabricRef.current) return;

    // Get device pixel ratio for high DPI displays
    const pixelRatio = window.devicePixelRatio || 1;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width,
      height,
      backgroundColor: '#ffffff',
      preserveObjectStacking: true,
      enableRetinaScaling: true, // Enable retina/high DPI support
      imageSmoothingEnabled: true, // Smooth image rendering
    });

    // Set higher resolution for crisp rendering
    const ctx = canvas.getContext();
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    }

    // Selection styling
    canvas.selectionColor = 'rgba(124, 58, 237, 0.1)';
    canvas.selectionBorderColor = '#7c3aed';
    canvas.selectionLineWidth = 2;

    // Event handlers
    canvas.on('selection:created', (e: any) => {
      onSelectionChange?.(e.selected?.[0] || null);
    });

    canvas.on('selection:updated', (e: any) => {
      onSelectionChange?.(e.selected?.[0] || null);
    });

    canvas.on('selection:cleared', () => {
      onSelectionChange?.(null);
    });

    canvas.on('object:modified', () => {
      saveStateInternal();
      onCanvasChange?.();
      onLayersChange?.();
      onComplianceCheck?.();
    });

    canvas.on('object:added', () => {
      saveStateInternal();
      onCanvasChange?.();
      onLayersChange?.();
      onComplianceCheck?.();
    });

    canvas.on('object:removed', () => {
      saveStateInternal();
      onCanvasChange?.();
      onLayersChange?.();
      onComplianceCheck?.();
    });

    fabricRef.current = canvas;
    setIsReady(true);
    saveStateInternal();
    
    // Call onReady callback
    onReady?.(canvas);

    return () => {
      canvas.dispose();
      fabricRef.current = null;
    };
  }, []);

  // Update canvas size
  useEffect(() => {
    if (fabricRef.current && isReady) {
      fabricRef.current.setDimensions({ width, height });
      fabricRef.current.renderAll();
    }
  }, [width, height, isReady]);

  // Internal save state function
  const saveStateInternal = () => {
    if (!fabricRef.current) return;
    
    const json = JSON.stringify(fabricRef.current.toJSON());
    const newStates = historyRef.current.states.slice(0, historyRef.current.index + 1);
    newStates.push(json);
    
    // Keep last 50 states
    if (newStates.length > 50) {
      newStates.shift();
    }
    
    historyRef.current.states = newStates;
    historyRef.current.index = newStates.length - 1;
    
    setHistory([...newStates]);
    setHistoryIndex(historyRef.current.index);
  };

  // Save state for undo/redo
  const saveState = useCallback(() => {
    saveStateInternal();
  }, []);

  // Undo
  const undo = useCallback(() => {
    if (!fabricRef.current || historyRef.current.index <= 0) return;
    
    const newIndex = historyRef.current.index - 1;
    const state = historyRef.current.states[newIndex];
    
    if (state) {
      fabricRef.current.loadFromJSON(JSON.parse(state)).then(() => {
        fabricRef.current?.renderAll();
        historyRef.current.index = newIndex;
        setHistoryIndex(newIndex);
        onLayersChange?.();
        onComplianceCheck?.();
      });
    }
  }, [onLayersChange, onComplianceCheck]);

  // Redo
  const redo = useCallback(() => {
    if (!fabricRef.current || historyRef.current.index >= historyRef.current.states.length - 1) return;
    
    const newIndex = historyRef.current.index + 1;
    const state = historyRef.current.states[newIndex];
    
    if (state) {
      fabricRef.current.loadFromJSON(JSON.parse(state)).then(() => {
        fabricRef.current?.renderAll();
        historyRef.current.index = newIndex;
        setHistoryIndex(newIndex);
        onLayersChange?.();
        onComplianceCheck?.();
      });
    }
  }, [onLayersChange, onComplianceCheck]);

  // Add text
  const addText = useCallback((text: string = 'Add your text') => {
    if (!fabricRef.current) return;
    
    const textObj = new fabric.IText(text, {
      left: fabricRef.current.width! / 2,
      top: fabricRef.current.height! / 2,
      originX: 'center',
      originY: 'center',
      fontSize: 24,
      fontFamily: 'Poppins, sans-serif',
      fill: '#1f2937',
      fontWeight: '500',
    });
    
    fabricRef.current.add(textObj);
    fabricRef.current.setActiveObject(textObj);
    fabricRef.current.renderAll();
  }, []);

  // Add heading
  const addHeading = useCallback(() => {
    if (!fabricRef.current) return;
    
    const heading = new fabric.IText('Heading', {
      left: fabricRef.current.width! / 2,
      top: fabricRef.current.height! / 2,
      originX: 'center',
      originY: 'center',
      fontSize: 48,
      fontFamily: 'Poppins, sans-serif',
      fill: '#111827',
      fontWeight: '700',
    });
    
    fabricRef.current.add(heading);
    fabricRef.current.setActiveObject(heading);
    fabricRef.current.renderAll();
  }, []);

  // Add rectangle
  const addRectangle = useCallback(() => {
    if (!fabricRef.current) return;
    
    const rect = new fabric.Rect({
      left: fabricRef.current.width! / 2 - 50,
      top: fabricRef.current.height! / 2 - 50,
      width: 100,
      height: 100,
      fill: '#7c3aed',
      rx: 8,
      ry: 8,
    });
    
    fabricRef.current.add(rect);
    fabricRef.current.setActiveObject(rect);
    fabricRef.current.renderAll();
  }, []);

  // Add circle
  const addCircle = useCallback(() => {
    if (!fabricRef.current) return;
    
    const circle = new fabric.Circle({
      left: fabricRef.current.width! / 2 - 50,
      top: fabricRef.current.height! / 2 - 50,
      radius: 50,
      fill: '#f97316',
    });
    
    fabricRef.current.add(circle);
    fabricRef.current.setActiveObject(circle);
    fabricRef.current.renderAll();
  }, []);

  // Add image from URL - HIGH QUALITY
  const addImage = useCallback((url: string) => {
    if (!fabricRef.current) return;
    
    fabric.FabricImage.fromURL(url, { crossOrigin: 'anonymous' }).then((img: fabric.FabricImage) => {
      const scale = Math.min(
        (fabricRef.current!.width! * 0.5) / img.width!,
        (fabricRef.current!.height! * 0.5) / img.height!
      );
      
      img.scale(scale);
      img.set({
        left: fabricRef.current!.width! / 2,
        top: fabricRef.current!.height! / 2,
        originX: 'center',
        originY: 'center',
        // High quality image settings
        objectCaching: true,
        statefullCache: true,
        noScaleCache: false,
      });
      
      fabricRef.current!.add(img);
      fabricRef.current!.setActiveObject(img);
      fabricRef.current!.renderAll();
    });
  }, []);

  // Add image from File - HIGH QUALITY
  const addImageFromFile = useCallback((file: File) => {
    if (!fabricRef.current) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      
      // Create a high-quality image element first
      const imgElement = new Image();
      imgElement.crossOrigin = 'anonymous';
      imgElement.onload = () => {
        fabric.FabricImage.fromURL(dataUrl, { crossOrigin: 'anonymous' }).then((img: fabric.FabricImage) => {
          // Scale image to fit nicely but preserve quality
          const maxWidth = fabricRef.current!.width! * 0.6;
          const maxHeight = fabricRef.current!.height! * 0.6;
          const scale = Math.min(maxWidth / img.width!, maxHeight / img.height!, 1);
          
          img.scale(scale);
          img.set({
            left: fabricRef.current!.width! / 2,
            top: fabricRef.current!.height! / 2,
            originX: 'center',
            originY: 'center',
            // High quality settings
            objectCaching: true,
            statefullCache: true,
            noScaleCache: false,
          });
          
          fabricRef.current!.add(img);
          fabricRef.current!.setActiveObject(img);
          fabricRef.current!.renderAll();
        });
      };
      imgElement.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }, []);

  // Set background image - HIGH QUALITY
  const setBackgroundImage = useCallback((file: File) => {
    if (!fabricRef.current) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      
      fabric.FabricImage.fromURL(dataUrl, { crossOrigin: 'anonymous' }).then((img: fabric.FabricImage) => {
        // Scale to cover canvas
        const scaleX = fabricRef.current!.width! / img.width!;
        const scaleY = fabricRef.current!.height! / img.height!;
        const scale = Math.max(scaleX, scaleY);
        
        img.scale(scale);
        img.set({
          left: fabricRef.current!.width! / 2,
          top: fabricRef.current!.height! / 2,
          originX: 'center',
          originY: 'center',
          selectable: false,
          evented: false,
          // High quality settings
          objectCaching: true,
          statefullCache: true,
          noScaleCache: false,
        });
        
        // Add to back
        fabricRef.current!.add(img);
        fabricRef.current!.sendObjectToBack(img);
        fabricRef.current!.renderAll();
      });
    };
    reader.readAsDataURL(file);
  }, []);

  // Remove background from image using Remove.bg API (with fallback to algorithmic)
  const removeBackground = useCallback(async () => {
    if (!fabricRef.current) return;
    
    const activeObject = fabricRef.current.getActiveObject();
    if (!activeObject || activeObject.type !== 'image') return;
    
    const imgElement = (activeObject as fabric.FabricImage).getElement() as HTMLImageElement;
    
    // Create canvas to get image data
    const tempCanvas = document.createElement('canvas');
    const ctx = tempCanvas.getContext('2d');
    if (!ctx) return;
    
    tempCanvas.width = imgElement.naturalWidth;
    tempCanvas.height = imgElement.naturalHeight;
    ctx.drawImage(imgElement, 0, 0);
    
    // Convert to blob for API
    const blob = await new Promise<Blob | null>((resolve) => {
      tempCanvas.toBlob(resolve, 'image/png');
    });
    
    if (!blob) return;
    
    try {
      // Try Remove.bg API first
      const formData = new FormData();
      formData.append('image_file', blob, 'image.png');
      
      const response = await fetch('/api/remove-bg', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.image) {
          // Use the API result
          fabric.FabricImage.fromURL(result.image, { crossOrigin: 'anonymous' }).then((newImg: fabric.FabricImage) => {
            newImg.set({
              left: activeObject.left,
              top: activeObject.top,
              scaleX: activeObject.scaleX,
              scaleY: activeObject.scaleY,
              angle: activeObject.angle,
              originX: activeObject.originX,
              originY: activeObject.originY,
            });
            
            fabricRef.current!.remove(activeObject);
            fabricRef.current!.add(newImg);
            fabricRef.current!.setActiveObject(newImg);
            fabricRef.current!.renderAll();
            saveStateInternal();
          });
          return;
        }
      }
    } catch (error) {
      console.log('Remove.bg API failed, using fallback algorithm');
    }
    
    // Fallback: Algorithmic background removal
    const imageData = ctx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
    const data = imageData.data;
    
    // Get corner colors (likely background)
    const corners = [
      { x: 0, y: 0 },
      { x: tempCanvas.width - 1, y: 0 },
      { x: 0, y: tempCanvas.height - 1 },
      { x: tempCanvas.width - 1, y: tempCanvas.height - 1 }
    ];
    
    let bgR = 0, bgG = 0, bgB = 0;
    corners.forEach(corner => {
      const idx = (corner.y * tempCanvas.width + corner.x) * 4;
      bgR += data[idx];
      bgG += data[idx + 1];
      bgB += data[idx + 2];
    });
    bgR = Math.round(bgR / 4);
    bgG = Math.round(bgG / 4);
    bgB = Math.round(bgB / 4);
    
    // Remove similar colors with tolerance
    const tolerance = 50;
    for (let i = 0; i < data.length; i += 4) {
      const rDiff = Math.abs(data[i] - bgR);
      const gDiff = Math.abs(data[i + 1] - bgG);
      const bDiff = Math.abs(data[i + 2] - bgB);
      
      if (rDiff < tolerance && gDiff < tolerance && bDiff < tolerance) {
        data[i + 3] = 0; // Make transparent
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
    
    // Create new image
    const newDataUrl = tempCanvas.toDataURL('image/png');
    fabric.FabricImage.fromURL(newDataUrl, { crossOrigin: 'anonymous' }).then((newImg: fabric.FabricImage) => {
      newImg.set({
        left: activeObject.left,
        top: activeObject.top,
        scaleX: activeObject.scaleX,
        scaleY: activeObject.scaleY,
        angle: activeObject.angle,
        originX: activeObject.originX,
        originY: activeObject.originY,
      });
      
      fabricRef.current!.remove(activeObject);
      fabricRef.current!.add(newImg);
      fabricRef.current!.setActiveObject(newImg);
      fabricRef.current!.renderAll();
      saveStateInternal();
    });
  }, []);

  // Flip horizontal
  const flipHorizontal = useCallback(() => {
    if (!fabricRef.current) return;
    
    const activeObject = fabricRef.current.getActiveObject();
    if (activeObject) {
      activeObject.set('flipX', !activeObject.flipX);
      fabricRef.current.renderAll();
      saveStateInternal();
    }
  }, []);

  // Flip vertical
  const flipVertical = useCallback(() => {
    if (!fabricRef.current) return;
    
    const activeObject = fabricRef.current.getActiveObject();
    if (activeObject) {
      activeObject.set('flipY', !activeObject.flipY);
      fabricRef.current.renderAll();
      saveStateInternal();
    }
  }, []);

  // Toggle lock
  const toggleLock = useCallback(() => {
    if (!fabricRef.current) return;
    
    const activeObject = fabricRef.current.getActiveObject();
    if (activeObject) {
      const isLocked = activeObject.lockMovementX;
      activeObject.set({
        lockMovementX: !isLocked,
        lockMovementY: !isLocked,
        lockScalingX: !isLocked,
        lockScalingY: !isLocked,
        lockRotation: !isLocked,
        hasControls: isLocked,
        selectable: true,
      });
      fabricRef.current.renderAll();
    }
  }, []);

  // Align object
  const alignObject = useCallback((alignment: string) => {
    if (!fabricRef.current) return;
    
    const activeObject = fabricRef.current.getActiveObject();
    if (!activeObject) return;
    
    const canvasWidth = fabricRef.current.width!;
    const canvasHeight = fabricRef.current.height!;
    
    switch (alignment) {
      case 'left':
        activeObject.set({ left: activeObject.width! * activeObject.scaleX! / 2 });
        break;
      case 'center-h':
        activeObject.set({ left: canvasWidth / 2, originX: 'center' });
        break;
      case 'right':
        activeObject.set({ left: canvasWidth - activeObject.width! * activeObject.scaleX! / 2 });
        break;
      case 'top':
        activeObject.set({ top: activeObject.height! * activeObject.scaleY! / 2 });
        break;
      case 'center-v':
        activeObject.set({ top: canvasHeight / 2, originY: 'center' });
        break;
      case 'bottom':
        activeObject.set({ top: canvasHeight - activeObject.height! * activeObject.scaleY! / 2 });
        break;
    }
    
    activeObject.setCoords();
    fabricRef.current.renderAll();
    saveStateInternal();
  }, []);

  // Auto arrange objects
  const autoArrange = useCallback(() => {
    if (!fabricRef.current) return;
    
    const objects = fabricRef.current.getObjects();
    if (objects.length === 0) return;
    
    // Categorize objects
    const images = objects.filter(o => o.type === 'image');
    const texts = objects.filter(o => o.type === 'i-text' || o.type === 'text' || o.type === 'textbox');
    const shapes = objects.filter(o => o.type === 'rect' || o.type === 'circle');
    
    const canvasWidth = fabricRef.current.width!;
    const canvasHeight = fabricRef.current.height!;
    
    // Position main image on left
    if (images.length > 0) {
      const mainImage = images[0];
      const scale = Math.min(
        (canvasWidth * 0.4) / mainImage.width!,
        (canvasHeight * 0.8) / mainImage.height!
      );
      mainImage.scale(scale);
      mainImage.set({
        left: canvasWidth * 0.25,
        top: canvasHeight / 2,
        originX: 'center',
        originY: 'center',
      });
      mainImage.setCoords();
    }
    
    // Position texts on right side
    let textY = canvasHeight * 0.2;
    texts.forEach((text, index) => {
      text.set({
        left: canvasWidth * 0.65,
        top: textY + index * 50,
        originX: 'center',
      });
      text.setCoords();
    });
    
    // Position shapes
    shapes.forEach((shape, index) => {
      shape.set({
        left: 20 + index * 30,
        top: 20,
      });
      shape.setCoords();
    });
    
    fabricRef.current.renderAll();
    saveStateInternal();
  }, []);

  // Extract colors from image
  const extractColors = useCallback((): string[] => {
    if (!fabricRef.current) return [];
    
    const activeObject = fabricRef.current.getActiveObject();
    if (!activeObject || activeObject.type !== 'image') return [];
    
    const imgElement = (activeObject as fabric.FabricImage).getElement() as HTMLImageElement;
    
    const tempCanvas = document.createElement('canvas');
    const ctx = tempCanvas.getContext('2d');
    if (!ctx) return [];
    
    tempCanvas.width = 50; // Sample at reduced size
    tempCanvas.height = 50;
    ctx.drawImage(imgElement, 0, 0, 50, 50);
    
    const imageData = ctx.getImageData(0, 0, 50, 50);
    const data = imageData.data;
    
    // Simple color quantization
    const colorCounts: { [key: string]: number } = {};
    
    for (let i = 0; i < data.length; i += 4) {
      // Round to nearest 32 for grouping
      const r = Math.round(data[i] / 32) * 32;
      const g = Math.round(data[i + 1] / 32) * 32;
      const b = Math.round(data[i + 2] / 32) * 32;
      const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      colorCounts[hex] = (colorCounts[hex] || 0) + 1;
    }
    
    // Get top 5 colors
    const sortedColors = Object.entries(colorCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([color]) => color);
    
    return sortedColors;
  }, []);

  // Apply filter to image
  const applyFilter = useCallback((filterType: FilterType) => {
    if (!fabricRef.current) return;
    
    const activeObject = fabricRef.current.getActiveObject();
    if (!activeObject || activeObject.type !== 'image') return;
    
    const img = activeObject as fabric.FabricImage;
    img.filters = [];
    
    switch (filterType) {
      case 'grayscale':
        img.filters.push(new fabric.filters.Grayscale());
        break;
      case 'sepia':
        img.filters.push(new fabric.filters.Sepia());
        break;
      case 'invert':
        img.filters.push(new fabric.filters.Invert());
        break;
      case 'blur':
        img.filters.push(new fabric.filters.Blur({ blur: 0.2 }));
        break;
      case 'sharpen':
        img.filters.push(new fabric.filters.Convolute({
          matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0]
        }));
        break;
      case 'none':
      default:
        break;
    }
    
    img.applyFilters();
    fabricRef.current.renderAll();
    saveStateInternal();
  }, []);

  // Adjust image (brightness, contrast, saturation)
  const adjustImage = useCallback((type: 'brightness' | 'contrast' | 'saturation', value: number) => {
    if (!fabricRef.current) return;
    
    const activeObject = fabricRef.current.getActiveObject();
    if (!activeObject || activeObject.type !== 'image') return;
    
    const img = activeObject as fabric.FabricImage;
    
    // Remove existing filter of same type
    img.filters = img.filters?.filter(f => {
      if (type === 'brightness' && f instanceof fabric.filters.Brightness) return false;
      if (type === 'contrast' && f instanceof fabric.filters.Contrast) return false;
      if (type === 'saturation' && f instanceof fabric.filters.Saturation) return false;
      return true;
    }) || [];
    
    // Add new filter
    switch (type) {
      case 'brightness':
        img.filters.push(new fabric.filters.Brightness({ brightness: value }));
        break;
      case 'contrast':
        img.filters.push(new fabric.filters.Contrast({ contrast: value }));
        break;
      case 'saturation':
        img.filters.push(new fabric.filters.Saturation({ saturation: value }));
        break;
    }
    
    img.applyFilters();
    fabricRef.current.renderAll();
  }, []);

  // Delete selected
  const deleteSelected = useCallback(() => {
    if (!fabricRef.current) return;
    
    const activeObjects = fabricRef.current.getActiveObjects();
    if (activeObjects.length) {
      activeObjects.forEach((obj: fabric.FabricObject) => fabricRef.current?.remove(obj));
      fabricRef.current.discardActiveObject();
      fabricRef.current.renderAll();
    }
  }, []);

  // Duplicate selected
  const duplicateSelected = useCallback(() => {
    if (!fabricRef.current) return;
    
    const activeObject = fabricRef.current.getActiveObject();
    if (!activeObject) return;
    
    activeObject.clone().then((cloned: fabric.FabricObject) => {
      cloned.set({
        left: (cloned.left || 0) + 20,
        top: (cloned.top || 0) + 20,
      });
      fabricRef.current?.add(cloned);
      fabricRef.current?.setActiveObject(cloned);
      fabricRef.current?.renderAll();
    });
  }, []);

  // Bring forward
  const bringForward = useCallback(() => {
    if (!fabricRef.current) return;
    
    const activeObject = fabricRef.current.getActiveObject();
    if (activeObject) {
      const objects = fabricRef.current.getObjects();
      const idx = objects.indexOf(activeObject);
      if (idx < objects.length - 1) {
        fabricRef.current.moveObjectTo(activeObject, idx + 1);
        fabricRef.current.renderAll();
        onLayersChange?.();
      }
    }
  }, [onLayersChange]);

  // Send backward
  const sendBackward = useCallback(() => {
    if (!fabricRef.current) return;
    
    const activeObject = fabricRef.current.getActiveObject();
    if (activeObject) {
      const objects = fabricRef.current.getObjects();
      const idx = objects.indexOf(activeObject);
      if (idx > 0) {
        fabricRef.current.moveObjectTo(activeObject, idx - 1);
        fabricRef.current.renderAll();
        onLayersChange?.();
      }
    }
  }, [onLayersChange]);

  // Bring to front
  const bringToFront = useCallback(() => {
    if (!fabricRef.current) return;
    
    const activeObject = fabricRef.current.getActiveObject();
    if (activeObject) {
      fabricRef.current.bringObjectToFront(activeObject);
      fabricRef.current.renderAll();
      onLayersChange?.();
    }
  }, [onLayersChange]);

  // Send to back
  const sendToBack = useCallback(() => {
    if (!fabricRef.current) return;
    
    const activeObject = fabricRef.current.getActiveObject();
    if (activeObject) {
      fabricRef.current.sendObjectToBack(activeObject);
      fabricRef.current.renderAll();
      onLayersChange?.();
    }
  }, [onLayersChange]);

  // Export image - HIGH QUALITY
  const exportImage = useCallback((format: string = 'png', quality: number = 1): string | null => {
    if (!fabricRef.current) return null;
    
    // Use 4x multiplier for high quality export
    const multiplier = 4;
    
    const dataURL = fabricRef.current.toDataURL({
      format: format as 'png' | 'jpeg',
      quality: format === 'jpeg' ? quality : 1, // PNG doesn't use quality
      multiplier,
      enableRetinaScaling: true,
    });
    
    return dataURL;
  }, []);

  // Export multiple sizes - HIGH QUALITY
  const exportMultiple = useCallback((sizes: string[], format: string, quality: number) => {
    if (!fabricRef.current) return;
    
    const originalWidth = fabricRef.current.width!;
    const originalHeight = fabricRef.current.height!;
    
    sizes.forEach((sizeKey, index) => {
      setTimeout(() => {
        const size = CANVAS_SIZES[sizeKey as keyof typeof CANVAS_SIZES];
        if (!size) return;
        
        // Use at least 2x multiplier, or scale up for larger exports
        const baseMultiplier = Math.max(size.width / originalWidth, size.height / originalHeight);
        const multiplier = Math.max(baseMultiplier * 2, 2); // Minimum 2x for quality
        
        const dataURL = fabricRef.current!.toDataURL({
          format: format as 'png' | 'jpeg',
          quality: format === 'jpeg' ? quality : 1,
          multiplier,
          enableRetinaScaling: true,
        });
        
        // Download
        const link = document.createElement('a');
        link.download = `RetailSync_${size.name.replace(/[^a-zA-Z0-9]/g, '_')}.${format}`;
        link.href = dataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, index * 500);
    });
  }, []);

  // Set canvas size with optional object scaling
  const setCanvasSize = useCallback((newWidth: number, newHeight: number, scaleObjects: boolean = true) => {
    if (!fabricRef.current) return;
    
    if (scaleObjects) {
      const scaleX = newWidth / fabricRef.current.width!;
      const scaleY = newHeight / fabricRef.current.height!;
      
      fabricRef.current.getObjects().forEach(obj => {
        obj.set({
          scaleX: (obj.scaleX || 1) * scaleX,
          scaleY: (obj.scaleY || 1) * scaleY,
          left: (obj.left || 0) * scaleX,
          top: (obj.top || 0) * scaleY,
        });
        obj.setCoords();
      });
    }
    
    fabricRef.current.setDimensions({ width: newWidth, height: newHeight });
    fabricRef.current.renderAll();
    saveStateInternal();
  }, []);

  // Set background color
  const setBackgroundColor = useCallback((color: string) => {
    if (!fabricRef.current) return;
    
    fabricRef.current.backgroundColor = color;
    fabricRef.current.renderAll();
    saveStateInternal();
  }, []);

  // Get objects
  const getObjects = useCallback(() => {
    return fabricRef.current?.getObjects() || [];
  }, []);

  // Clear canvas
  const clear = useCallback(() => {
    if (!fabricRef.current) return;
    
    fabricRef.current.clear();
    fabricRef.current.backgroundColor = '#ffffff';
    fabricRef.current.renderAll();
    saveStateInternal();
  }, []);

  // Load from JSON
  const loadJSON = useCallback((json: string) => {
    if (!fabricRef.current) return;
    
    fabricRef.current.loadFromJSON(JSON.parse(json)).then(() => {
      fabricRef.current?.renderAll();
      onLayersChange?.();
      onComplianceCheck?.();
    });
  }, [onLayersChange, onComplianceCheck]);

  // Export to JSON
  const toJSON = useCallback(() => {
    return JSON.stringify(fabricRef.current?.toJSON() || {});
  }, []);

  // Save project to localStorage
  const saveProject = useCallback(() => {
    if (!fabricRef.current) return;
    
    const projectData = {
      canvas: fabricRef.current.toJSON(),
      width: fabricRef.current.width,
      height: fabricRef.current.height,
      timestamp: Date.now(),
    };
    
    localStorage.setItem('retailsync_project', JSON.stringify(projectData));
  }, []);

  // Load project from localStorage
  const loadProject = useCallback((): boolean => {
    if (!fabricRef.current) return false;
    
    const saved = localStorage.getItem('retailsync_project');
    if (!saved) return false;
    
    try {
      const projectData = JSON.parse(saved);
      fabricRef.current.setDimensions({ 
        width: projectData.width, 
        height: projectData.height 
      });
      fabricRef.current.loadFromJSON(projectData.canvas).then(() => {
        fabricRef.current?.renderAll();
        onLayersChange?.();
        onComplianceCheck?.();
      });
      return true;
    } catch {
      return false;
    }
  }, [onLayersChange, onComplianceCheck]);

  // Add text shadow
  const addTextShadow = useCallback((blur: number, offsetX: number, offsetY: number, color: string) => {
    if (!fabricRef.current) return;
    
    const activeObject = fabricRef.current.getActiveObject();
    if (!activeObject || (activeObject.type !== 'i-text' && activeObject.type !== 'text')) return;
    
    activeObject.set('shadow', new fabric.Shadow({
      color,
      blur,
      offsetX,
      offsetY,
    }));
    
    fabricRef.current.renderAll();
    saveStateInternal();
  }, []);

  // ==================== AI FEATURES (Hugging Face) ====================

  // Generate AI Image using Stable Diffusion
  const generateAIImage = useCallback(async (prompt: string) => {
    if (!fabricRef.current) return;
    
    try {
      const response = await fetch('/api/huggingface', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: 'generate', prompt }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        if (error.loading) {
          console.log('Model loading, retry in a few seconds...');
          return;
        }
        throw new Error(error.error || 'Failed to generate image');
      }
      
      const result = await response.json();
      if (result.success && result.image) {
        fabric.FabricImage.fromURL(result.image, { crossOrigin: 'anonymous' }).then((img) => {
          const maxSize = Math.min(fabricRef.current!.width! * 0.8, fabricRef.current!.height! * 0.8);
          const scale = Math.min(maxSize / img.width!, maxSize / img.height!);
          
          img.set({
            left: fabricRef.current!.width! / 2,
            top: fabricRef.current!.height! / 2,
            originX: 'center',
            originY: 'center',
            scaleX: scale,
            scaleY: scale,
          });
          
          fabricRef.current!.add(img);
          fabricRef.current!.setActiveObject(img);
          fabricRef.current!.renderAll();
          saveStateInternal();
        });
      }
    } catch (error) {
      console.error('AI Image generation failed:', error);
    }
  }, []);

  // Enhance/Upscale Image using AI
  const enhanceImage = useCallback(async () => {
    if (!fabricRef.current) return;
    
    const activeObject = fabricRef.current.getActiveObject();
    if (!activeObject || activeObject.type !== 'image') return;
    
    const imgElement = (activeObject as fabric.FabricImage).getElement() as HTMLImageElement;
    
    // Get image as base64
    const tempCanvas = document.createElement('canvas');
    const ctx = tempCanvas.getContext('2d');
    if (!ctx) return;
    
    tempCanvas.width = imgElement.naturalWidth;
    tempCanvas.height = imgElement.naturalHeight;
    ctx.drawImage(imgElement, 0, 0);
    const imageBase64 = tempCanvas.toDataURL('image/png');
    
    try {
      const response = await fetch('/api/huggingface', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: 'enhance', imageBase64 }),
      });
      
      if (!response.ok) throw new Error('Enhancement failed');
      
      const result = await response.json();
      if (result.success && result.image) {
        fabric.FabricImage.fromURL(result.image, { crossOrigin: 'anonymous' }).then((newImg) => {
          newImg.set({
            left: activeObject.left,
            top: activeObject.top,
            scaleX: activeObject.scaleX! / 2, // Upscaled 2x so reduce scale
            scaleY: activeObject.scaleY! / 2,
            angle: activeObject.angle,
            originX: activeObject.originX,
            originY: activeObject.originY,
          });
          
          fabricRef.current!.remove(activeObject);
          fabricRef.current!.add(newImg);
          fabricRef.current!.setActiveObject(newImg);
          fabricRef.current!.renderAll();
          saveStateInternal();
        });
      }
    } catch (error) {
      console.error('Image enhancement failed:', error);
    }
  }, []);

  // Get AI-generated caption for image
  const getImageCaption = useCallback(async (): Promise<string | null> => {
    if (!fabricRef.current) return null;
    
    const activeObject = fabricRef.current.getActiveObject();
    if (!activeObject || activeObject.type !== 'image') return null;
    
    const imgElement = (activeObject as fabric.FabricImage).getElement() as HTMLImageElement;
    
    const tempCanvas = document.createElement('canvas');
    const ctx = tempCanvas.getContext('2d');
    if (!ctx) return null;
    
    tempCanvas.width = imgElement.naturalWidth;
    tempCanvas.height = imgElement.naturalHeight;
    ctx.drawImage(imgElement, 0, 0);
    const imageBase64 = tempCanvas.toDataURL('image/png');
    
    try {
      const response = await fetch('/api/huggingface', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: 'caption', imageBase64 }),
      });
      
      if (!response.ok) throw new Error('Caption generation failed');
      
      const result = await response.json();
      if (result.success && result.result) {
        // Hugging Face returns array with generated_text
        const caption = result.result[0]?.generated_text || result.result.generated_text;
        return caption || null;
      }
    } catch (error) {
      console.error('Image caption failed:', error);
    }
    return null;
  }, []);

  // AI Background Removal using Hugging Face
  const aiRemoveBackground = useCallback(async () => {
    if (!fabricRef.current) return;
    
    const activeObject = fabricRef.current.getActiveObject();
    if (!activeObject || activeObject.type !== 'image') return;
    
    const imgElement = (activeObject as fabric.FabricImage).getElement() as HTMLImageElement;
    
    const tempCanvas = document.createElement('canvas');
    const ctx = tempCanvas.getContext('2d');
    if (!ctx) return;
    
    tempCanvas.width = imgElement.naturalWidth;
    tempCanvas.height = imgElement.naturalHeight;
    ctx.drawImage(imgElement, 0, 0);
    const imageBase64 = tempCanvas.toDataURL('image/png');
    
    try {
      const response = await fetch('/api/huggingface', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: 'remove-bg', imageBase64 }),
      });
      
      if (!response.ok) throw new Error('AI background removal failed');
      
      const result = await response.json();
      if (result.success && result.image) {
        fabric.FabricImage.fromURL(result.image, { crossOrigin: 'anonymous' }).then((newImg) => {
          newImg.set({
            left: activeObject.left,
            top: activeObject.top,
            scaleX: activeObject.scaleX,
            scaleY: activeObject.scaleY,
            angle: activeObject.angle,
            originX: activeObject.originX,
            originY: activeObject.originY,
          });
          
          fabricRef.current!.remove(activeObject);
          fabricRef.current!.add(newImg);
          fabricRef.current!.setActiveObject(newImg);
          fabricRef.current!.renderAll();
          saveStateInternal();
        });
      }
    } catch (error) {
      console.error('AI background removal failed:', error);
    }
  }, []);

  // ==================== NEW FEATURES ====================

  // Image Masking - Clip image to shape
  const maskImageToShape = useCallback((shape: 'circle' | 'triangle' | 'star' | 'hexagon' | 'heart') => {
    if (!fabricRef.current) return;
    
    const activeObject = fabricRef.current.getActiveObject();
    if (!activeObject || activeObject.type !== 'image') return;
    
    const width = activeObject.width! * (activeObject.scaleX || 1);
    const height = activeObject.height! * (activeObject.scaleY || 1);
    const size = Math.min(width, height);
    
    let clipPath: fabric.FabricObject;
    
    switch (shape) {
      case 'circle':
        clipPath = new fabric.Circle({
          radius: size / 2,
          originX: 'center',
          originY: 'center',
        });
        break;
      case 'triangle':
        clipPath = new fabric.Triangle({
          width: size,
          height: size,
          originX: 'center',
          originY: 'center',
        });
        break;
      case 'star':
        const starPoints = [];
        const outerRadius = size / 2;
        const innerRadius = size / 4;
        for (let i = 0; i < 10; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (Math.PI / 5) * i - Math.PI / 2;
          starPoints.push({ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius });
        }
        clipPath = new fabric.Polygon(starPoints, {
          originX: 'center',
          originY: 'center',
        });
        break;
      case 'hexagon':
        const hexPoints = [];
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          hexPoints.push({ x: Math.cos(angle) * size / 2, y: Math.sin(angle) * size / 2 });
        }
        clipPath = new fabric.Polygon(hexPoints, {
          originX: 'center',
          originY: 'center',
        });
        break;
      case 'heart':
        clipPath = new fabric.Path('M 0 -30 C -25 -60 -70 -30 -70 10 C -70 50 -35 80 0 100 C 35 80 70 50 70 10 C 70 -30 25 -60 0 -30', {
          originX: 'center',
          originY: 'center',
          scaleX: size / 140,
          scaleY: size / 140,
        });
        break;
      default:
        return;
    }
    
    activeObject.set('clipPath', clipPath);
    fabricRef.current.renderAll();
    saveStateInternal();
  }, []);

  // Add glow effect to object
  const addGlow = useCallback((color: string = '#ffffff', blur: number = 20) => {
    if (!fabricRef.current) return;
    
    const activeObject = fabricRef.current.getActiveObject();
    if (!activeObject) return;
    
    activeObject.set('shadow', new fabric.Shadow({
      color: color,
      blur: blur,
      offsetX: 0,
      offsetY: 0,
    }));
    
    fabricRef.current.renderAll();
    saveStateInternal();
  }, []);

  // Add outline to image
  const addImageOutline = useCallback((color: string = '#000000', width: number = 3) => {
    if (!fabricRef.current) return;
    
    const activeObject = fabricRef.current.getActiveObject();
    if (!activeObject) return;
    
    activeObject.set({
      stroke: color,
      strokeWidth: width,
    });
    
    fabricRef.current.renderAll();
    saveStateInternal();
  }, []);

  // Smart Object Fit (contain/cover)
  const smartObjectFit = useCallback((mode: 'contain' | 'cover' | 'fill') => {
    if (!fabricRef.current) return;
    
    const activeObject = fabricRef.current.getActiveObject() as fabric.FabricImage;
    if (!activeObject || activeObject.type !== 'image') return;
    
    const canvasWidth = fabricRef.current.width!;
    const canvasHeight = fabricRef.current.height!;
    const imgWidth = activeObject.width!;
    const imgHeight = activeObject.height!;
    
    let scaleX = 1, scaleY = 1;
    
    if (mode === 'contain') {
      const scale = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight);
      scaleX = scale;
      scaleY = scale;
    } else if (mode === 'cover') {
      const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
      scaleX = scale;
      scaleY = scale;
    } else if (mode === 'fill') {
      scaleX = canvasWidth / imgWidth;
      scaleY = canvasHeight / imgHeight;
    }
    
    activeObject.set({
      scaleX,
      scaleY,
      left: canvasWidth / 2,
      top: canvasHeight / 2,
      originX: 'center',
      originY: 'center',
    });
    
    fabricRef.current.renderAll();
    saveStateInternal();
  }, []);

  // Curved Text / Arc Text
  const addCurvedText = useCallback((text: string = 'CURVED TEXT', radius: number = 100, startAngle: number = 180) => {
    if (!fabricRef.current) return;
    
    const chars = text.split('');
    const anglePerChar = 180 / (chars.length - 1 || 1);
    const textObjects: fabric.Text[] = [];
    
    chars.forEach((char, i) => {
      const angle = (startAngle + i * anglePerChar) * Math.PI / 180;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      
      const textObj = new fabric.Text(char, {
        left: x,
        top: y,
        fontSize: 24,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fill: '#000000',
        originX: 'center',
        originY: 'center',
        angle: (startAngle + i * anglePerChar) + 90,
      });
      
      textObjects.push(textObj);
    });
    
    const curvedGroup = new fabric.Group(textObjects, {
      left: fabricRef.current.width! / 2,
      top: fabricRef.current.height! / 2,
      originX: 'center',
      originY: 'center',
    });
    
    (curvedGroup as any).isCurvedText = true;
    (curvedGroup as any).curvedTextContent = text;
    
    fabricRef.current.add(curvedGroup);
    fabricRef.current.setActiveObject(curvedGroup);
    fabricRef.current.renderAll();
    saveStateInternal();
  }, []);

  // Text with gradient fill
  const addGradientText = useCallback((text: string = 'GRADIENT', colors: string[] = ['#ff0000', '#0000ff']) => {
    if (!fabricRef.current) return;
    
    const textObj = new fabric.Text(text, {
      left: fabricRef.current.width! / 2,
      top: fabricRef.current.height! / 2,
      fontSize: 48,
      fontFamily: 'Arial',
      fontWeight: 'bold',
      originX: 'center',
      originY: 'center',
    });
    
    const gradient = new fabric.Gradient({
      type: 'linear',
      coords: { x1: 0, y1: 0, x2: textObj.width!, y2: 0 },
      colorStops: colors.map((color, i) => ({
        offset: i / (colors.length - 1),
        color: color,
      })),
    });
    
    textObj.set('fill', gradient);
    
    fabricRef.current.add(textObj);
    fabricRef.current.setActiveObject(textObj);
    fabricRef.current.renderAll();
    saveStateInternal();
  }, []);

  // Blur background effect
  const blurBackground = useCallback((blurAmount: number = 5) => {
    if (!fabricRef.current) return;
    
    // Find background image
    const objects = fabricRef.current.getObjects();
    const bgImage = objects.find(obj => obj.type === 'image' && (obj as any).isBackground);
    
    if (bgImage && bgImage.type === 'image') {
      const img = bgImage as fabric.FabricImage;
      img.filters = img.filters || [];
      img.filters.push(new fabric.filters.Blur({ blur: blurAmount / 10 }));
      img.applyFilters();
      fabricRef.current.renderAll();
      saveStateInternal();
    }
  }, []);

  // Color overlay on image
  const addColorOverlay = useCallback((color: string = '#000000', opacity: number = 0.5) => {
    if (!fabricRef.current) return;
    
    const activeObject = fabricRef.current.getActiveObject() as fabric.FabricImage;
    if (!activeObject || activeObject.type !== 'image') return;
    
    // Add blend color filter
    activeObject.filters = activeObject.filters || [];
    activeObject.filters.push(new fabric.filters.BlendColor({
      color: color,
      mode: 'tint',
      alpha: opacity,
    }));
    activeObject.applyFilters();
    
    fabricRef.current.renderAll();
    saveStateInternal();
  }, []);

  // Remove all filters from image
  const removeImageFilters = useCallback(() => {
    if (!fabricRef.current) return;
    
    const activeObject = fabricRef.current.getActiveObject() as fabric.FabricImage;
    if (!activeObject || activeObject.type !== 'image') return;
    
    activeObject.filters = [];
    activeObject.applyFilters();
    fabricRef.current.renderAll();
    saveStateInternal();
  }, []);

  // Distribute objects evenly (horizontal)
  const distributeHorizontal = useCallback(() => {
    if (!fabricRef.current) return;
    
    const activeObjects = fabricRef.current.getActiveObjects();
    if (activeObjects.length < 3) return;
    
    const sorted = [...activeObjects].sort((a, b) => a.left! - b.left!);
    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    const totalSpace = last.left! - first.left!;
    const spacing = totalSpace / (sorted.length - 1);
    
    sorted.forEach((obj, i) => {
      obj.set('left', first.left! + spacing * i);
    });
    
    fabricRef.current.renderAll();
    saveStateInternal();
  }, []);

  // Distribute objects evenly (vertical)
  const distributeVertical = useCallback(() => {
    if (!fabricRef.current) return;
    
    const activeObjects = fabricRef.current.getActiveObjects();
    if (activeObjects.length < 3) return;
    
    const sorted = [...activeObjects].sort((a, b) => a.top! - b.top!);
    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    const totalSpace = last.top! - first.top!;
    const spacing = totalSpace / (sorted.length - 1);
    
    sorted.forEach((obj, i) => {
      obj.set('top', first.top! + spacing * i);
    });
    
    fabricRef.current.renderAll();
    saveStateInternal();
  }, []);

  // Clone/Duplicate in pattern
  const clonePattern = useCallback(async (rows: number = 2, cols: number = 2, spacingX: number = 20, spacingY: number = 20) => {
    if (!fabricRef.current) return;
    
    const activeObject = fabricRef.current.getActiveObject();
    if (!activeObject) return;
    
    const objWidth = activeObject.width! * (activeObject.scaleX || 1);
    const objHeight = activeObject.height! * (activeObject.scaleY || 1);
    const startX = activeObject.left!;
    const startY = activeObject.top!;
    
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (r === 0 && c === 0) continue;
        
        const cloned = await activeObject.clone();
        cloned.set({
          left: startX + c * (objWidth + spacingX),
          top: startY + r * (objHeight + spacingY),
        });
        fabricRef.current!.add(cloned);
      }
    }
    
    fabricRef.current.renderAll();
    saveStateInternal();
  }, []);

  // Add social media icon
  const addSocialIcon = useCallback((platform: 'facebook' | 'instagram' | 'twitter' | 'youtube' | 'whatsapp' | 'linkedin') => {
    if (!fabricRef.current) return;
    
    const icons: Record<string, { path: string; color: string }> = {
      facebook: {
        path: 'M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.47h-2.796v8.385C19.612 22.954 24 17.99 24 12z',
        color: '#1877F2'
      },
      instagram: {
        path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
        color: '#E4405F'
      },
      twitter: {
        path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
        color: '#000000'
      },
      youtube: {
        path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
        color: '#FF0000'
      },
      whatsapp: {
        path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z',
        color: '#25D366'
      },
      linkedin: {
        path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
        color: '#0A66C2'
      }
    };
    
    const iconData = icons[platform];
    if (!iconData) return;
    
    const icon = new fabric.Path(iconData.path, {
      left: fabricRef.current.width! / 2,
      top: fabricRef.current.height! / 2,
      fill: iconData.color,
      originX: 'center',
      originY: 'center',
      scaleX: 1.5,
      scaleY: 1.5,
    });
    
    fabricRef.current.add(icon);
    fabricRef.current.setActiveObject(icon);
    fabricRef.current.renderAll();
    saveStateInternal();
  }, []);

  // Add payment method icon - Load PNG from internet
  const addPaymentIcon = useCallback((method: 'upi' | 'visa' | 'mastercard' | 'cod' | 'paytm' | 'gpay') => {
    if (!fabricRef.current) return;
    
    const logos: Record<string, string> = {
      upi: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/200px-UPI-Logo-vector.svg.png',
      visa: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png',
      mastercard: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png',
      cod: 'https://cdn-icons-png.flaticon.com/128/2331/2331941.png',
      paytm: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/200px-Paytm_Logo_%28standalone%29.svg.png',
      gpay: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/200px-Google_Pay_Logo.svg.png',
    };
    
    const logoUrl = logos[method];
    if (!logoUrl) return;
    
    const centerX = fabricRef.current.width! / 2;
    const centerY = fabricRef.current.height! / 2;
    
    fabric.FabricImage.fromURL(logoUrl, { crossOrigin: 'anonymous' }).then((img) => {
      if (!fabricRef.current) return;
      
      // Scale to reasonable size
      const maxSize = 100;
      const scale = Math.min(maxSize / img.width!, maxSize / img.height!);
      
      img.set({
        left: centerX,
        top: centerY,
        originX: 'center',
        originY: 'center',
        scaleX: scale,
        scaleY: scale,
      });
      
      fabricRef.current.add(img);
      fabricRef.current.setActiveObject(img);
      fabricRef.current.renderAll();
      saveStateInternal();
    }).catch((err) => {
      console.error('Failed to load payment logo:', err);
    });
  }, []);

  // Add decorative frame
  const addDecorativeFrame = useCallback((style: 'simple' | 'double' | 'dashed' | 'rounded' | 'fancy' | 'gradient' | 'shadow' | 'neon' | 'dotted' | 'thick') => {
    if (!fabricRef.current) return;
    
    const padding = 20;
    const width = fabricRef.current.width! - padding * 2;
    const height = fabricRef.current.height! - padding * 2;
    
    let frame: fabric.FabricObject;
    
    switch (style) {
      case 'simple':
        frame = new fabric.Rect({
          width,
          height,
          fill: 'transparent',
          stroke: '#333333',
          strokeWidth: 3,
          left: padding,
          top: padding,
        });
        break;
      case 'double':
        const outer = new fabric.Rect({
          width,
          height,
          fill: 'transparent',
          stroke: '#333333',
          strokeWidth: 2,
        });
        const inner = new fabric.Rect({
          width: width - 10,
          height: height - 10,
          fill: 'transparent',
          stroke: '#333333',
          strokeWidth: 1,
          left: 5,
          top: 5,
        });
        frame = new fabric.Group([outer, inner], {
          left: padding,
          top: padding,
        });
        break;
      case 'dashed':
        frame = new fabric.Rect({
          width,
          height,
          fill: 'transparent',
          stroke: '#333333',
          strokeWidth: 2,
          strokeDashArray: [10, 5],
          left: padding,
          top: padding,
        });
        break;
      case 'rounded':
        frame = new fabric.Rect({
          width,
          height,
          fill: 'transparent',
          stroke: '#333333',
          strokeWidth: 3,
          rx: 20,
          ry: 20,
          left: padding,
          top: padding,
        });
        break;
      case 'fancy':
        const mainFrame = new fabric.Rect({
          width,
          height,
          fill: 'transparent',
          stroke: '#D4AF37',
          strokeWidth: 4,
          rx: 5,
          ry: 5,
        });
        // Corner decorations
        const cornerSize = 15;
        const corners = [
          new fabric.Rect({ width: cornerSize, height: cornerSize, fill: '#D4AF37', left: -2, top: -2 }),
          new fabric.Rect({ width: cornerSize, height: cornerSize, fill: '#D4AF37', left: width - cornerSize + 2, top: -2 }),
          new fabric.Rect({ width: cornerSize, height: cornerSize, fill: '#D4AF37', left: -2, top: height - cornerSize + 2 }),
          new fabric.Rect({ width: cornerSize, height: cornerSize, fill: '#D4AF37', left: width - cornerSize + 2, top: height - cornerSize + 2 }),
        ];
        frame = new fabric.Group([mainFrame, ...corners], {
          left: padding,
          top: padding,
        });
        break;
      case 'gradient':
        // Purple to pink gradient border effect
        const gradientOuter = new fabric.Rect({
          width,
          height,
          fill: 'transparent',
          stroke: '#8B5CF6',
          strokeWidth: 4,
          rx: 8,
          ry: 8,
        });
        const gradientInner = new fabric.Rect({
          width: width - 8,
          height: height - 8,
          fill: 'transparent',
          stroke: '#EC4899',
          strokeWidth: 2,
          rx: 6,
          ry: 6,
          left: 4,
          top: 4,
        });
        frame = new fabric.Group([gradientOuter, gradientInner], {
          left: padding,
          top: padding,
        });
        break;
      case 'shadow':
        // Shadow box effect with multiple layers
        const shadowBack = new fabric.Rect({
          width,
          height,
          fill: 'transparent',
          stroke: '#666666',
          strokeWidth: 3,
          left: 6,
          top: 6,
        });
        const shadowFront = new fabric.Rect({
          width,
          height,
          fill: 'transparent',
          stroke: '#3B82F6',
          strokeWidth: 3,
        });
        frame = new fabric.Group([shadowBack, shadowFront], {
          left: padding,
          top: padding,
        });
        break;
      case 'neon':
        // Neon glow effect with multiple borders
        const neonOuter = new fabric.Rect({
          width: width + 8,
          height: height + 8,
          fill: 'transparent',
          stroke: '#22C55E',
          strokeWidth: 1,
          opacity: 0.3,
          rx: 12,
          ry: 12,
          left: -4,
          top: -4,
        });
        const neonMid = new fabric.Rect({
          width: width + 4,
          height: height + 4,
          fill: 'transparent',
          stroke: '#22C55E',
          strokeWidth: 2,
          opacity: 0.5,
          rx: 10,
          ry: 10,
          left: -2,
          top: -2,
        });
        const neonInner = new fabric.Rect({
          width,
          height,
          fill: 'transparent',
          stroke: '#22C55E',
          strokeWidth: 3,
          rx: 8,
          ry: 8,
        });
        frame = new fabric.Group([neonOuter, neonMid, neonInner], {
          left: padding,
          top: padding,
        });
        break;
      case 'dotted':
        frame = new fabric.Rect({
          width,
          height,
          fill: 'transparent',
          stroke: '#666666',
          strokeWidth: 3,
          strokeDashArray: [3, 6],
          left: padding,
          top: padding,
        });
        break;
      case 'thick':
        // Thick bold border
        const thickOuter = new fabric.Rect({
          width,
          height,
          fill: 'transparent',
          stroke: '#F97316',
          strokeWidth: 8,
          rx: 4,
          ry: 4,
        });
        const thickInner = new fabric.Rect({
          width: width - 16,
          height: height - 16,
          fill: 'transparent',
          stroke: '#FDBA74',
          strokeWidth: 2,
          rx: 2,
          ry: 2,
          left: 8,
          top: 8,
        });
        frame = new fabric.Group([thickOuter, thickInner], {
          left: padding,
          top: padding,
        });
        break;
      default:
        return;
    }
    
    (frame as any).isFrame = true;
    fabricRef.current.add(frame);
    fabricRef.current.sendObjectToBack(frame);
    fabricRef.current.renderAll();
    saveStateInternal();
  }, []);

  // Add product placeholder - Box style with dashed border
  const addProductPlaceholder = useCallback((size: 'small' | 'medium' | 'large' = 'medium') => {
    if (!fabricRef.current) return;
    
    const sizes = {
      small: { width: 80, height: 80 },
      medium: { width: 120, height: 120 },
      large: { width: 180, height: 180 },
    };
    
    const s = sizes[size];
    const centerX = fabricRef.current.width! / 2;
    const centerY = fabricRef.current.height! / 2;
    
    // Create dashed border box
    const box = new fabric.Rect({
      left: -s.width / 2,
      top: -s.height / 2,
      width: s.width,
      height: s.height,
      fill: '#f3f4f6',
      stroke: '#9ca3af',
      strokeWidth: 2,
      strokeDashArray: [8, 4],
      rx: 8,
      ry: 8,
    });
    
    // Add text
    const text = new fabric.Text('+ Add Image', {
      fontSize: 12,
      fontFamily: 'Arial, sans-serif',
      fill: '#6b7280',
      left: 0,
      top: 0,
      originX: 'center',
      originY: 'center',
    });
    
    const group = new fabric.Group([box, text], {
      left: centerX,
      top: centerY,
      originX: 'center',
      originY: 'center',
    });
    
    (group as any).isPlaceholder = true;
    fabricRef.current.add(group);
    fabricRef.current.setActiveObject(group);
    fabricRef.current.renderAll();
    saveStateInternal();
  }, []);

  // ============== DRAWING TOOLS ==============
  
  // Enable free drawing mode
  const enableDrawingMode = useCallback((brushColor: string = '#000000', brushSize: number = 5) => {
    if (!fabricRef.current) return;
    
    fabricRef.current.isDrawingMode = true;
    fabricRef.current.freeDrawingBrush = new fabric.PencilBrush(fabricRef.current);
    fabricRef.current.freeDrawingBrush.color = brushColor;
    fabricRef.current.freeDrawingBrush.width = brushSize;
    fabricRef.current.freeDrawingBrush.strokeLineCap = 'round';
    fabricRef.current.freeDrawingBrush.strokeLineJoin = 'round';
  }, []);

  // Disable free drawing mode
  const disableDrawingMode = useCallback(() => {
    if (!fabricRef.current) return;
    fabricRef.current.isDrawingMode = false;
    saveStateInternal();
  }, []);

  // Set brush color
  const setBrushColor = useCallback((color: string) => {
    if (!fabricRef.current || !fabricRef.current.freeDrawingBrush) return;
    fabricRef.current.freeDrawingBrush.color = color;
  }, []);

  // Set brush size
  const setBrushSize = useCallback((size: number) => {
    if (!fabricRef.current || !fabricRef.current.freeDrawingBrush) return;
    fabricRef.current.freeDrawingBrush.width = size;
  }, []);

  // Clear all drawing paths
  const clearDrawing = useCallback(() => {
    if (!fabricRef.current) return;
    
    const objects = fabricRef.current.getObjects();
    const pathsToRemove = objects.filter(obj => obj.type === 'path');
    pathsToRemove.forEach(path => fabricRef.current?.remove(path));
    fabricRef.current.renderAll();
    saveStateInternal();
  }, []);

  // Add Drop Shadow to any object
  const addDropShadow = useCallback((blur: number, offsetX: number, offsetY: number, color: string) => {
    if (!fabricRef.current) return;
    
    const activeObject = fabricRef.current.getActiveObject();
    if (!activeObject) return;
    
    activeObject.set('shadow', new fabric.Shadow({
      color,
      blur,
      offsetX,
      offsetY,
    }));
    
    fabricRef.current.renderAll();
    saveStateInternal();
  }, []);

  // Remove shadow from object
  const removeShadow = useCallback(() => {
    if (!fabricRef.current) return;
    
    const activeObject = fabricRef.current.getActiveObject();
    if (!activeObject) return;
    
    activeObject.set('shadow', null);
    fabricRef.current.renderAll();
    saveStateInternal();
  }, []);

  // Add Line
  const addLine = useCallback((hasArrow: boolean = false) => {
    if (!fabricRef.current) return;
    
    const centerX = fabricRef.current.width! / 2;
    const centerY = fabricRef.current.height! / 2;
    
    const line = new fabric.Line([centerX - 80, centerY, centerX + 80, centerY], {
      stroke: '#1f2937',
      strokeWidth: 3,
      strokeLineCap: 'round',
    });
    
    if (hasArrow) {
      // Create arrow head
      const arrowHead = new fabric.Triangle({
        width: 15,
        height: 15,
        fill: '#1f2937',
        left: centerX + 80,
        top: centerY,
        angle: 90,
        originX: 'center',
        originY: 'center',
      });
      
      const group = new fabric.Group([line, arrowHead], {
        left: centerX - 80,
        top: centerY - 7.5,
      });
      
      fabricRef.current.add(group);
      fabricRef.current.setActiveObject(group);
    } else {
      fabricRef.current.add(line);
      fabricRef.current.setActiveObject(line);
    }
    
    fabricRef.current.renderAll();
  }, []);

  // Add Triangle
  const addTriangle = useCallback(() => {
    if (!fabricRef.current) return;
    
    const triangle = new fabric.Triangle({
      left: fabricRef.current.width! / 2 - 50,
      top: fabricRef.current.height! / 2 - 43,
      width: 100,
      height: 86,
      fill: '#22c55e',
    });
    
    fabricRef.current.add(triangle);
    fabricRef.current.setActiveObject(triangle);
    fabricRef.current.renderAll();
  }, []);

  // Add Star
  const addStar = useCallback((points: number = 5) => {
    if (!fabricRef.current) return;
    
    const centerX = fabricRef.current.width! / 2;
    const centerY = fabricRef.current.height! / 2;
    const outerRadius = 50;
    const innerRadius = 25;
    
    const starPoints: { x: number; y: number }[] = [];
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (Math.PI / points) * i - Math.PI / 2;
      starPoints.push({
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      });
    }
    
    const star = new fabric.Polygon(starPoints, {
      fill: '#fbbf24',
      left: centerX - outerRadius,
      top: centerY - outerRadius,
    });
    
    fabricRef.current.add(star);
    fabricRef.current.setActiveObject(star);
    fabricRef.current.renderAll();
  }, []);

  // Add Hexagon
  const addHexagon = useCallback(() => {
    if (!fabricRef.current) return;
    
    const centerX = fabricRef.current.width! / 2;
    const centerY = fabricRef.current.height! / 2;
    const radius = 50;
    const points = 6;
    
    const hexPoints: { x: number; y: number }[] = [];
    for (let i = 0; i < points; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      hexPoints.push({
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      });
    }
    
    const hexagon = new fabric.Polygon(hexPoints, {
      fill: '#8b5cf6',
      left: centerX - radius,
      top: centerY - radius,
    });
    
    fabricRef.current.add(hexagon);
    fabricRef.current.setActiveObject(hexagon);
    fabricRef.current.renderAll();
  }, []);

  // Add Pentagon
  const addPentagon = useCallback(() => {
    if (!fabricRef.current) return;
    
    const centerX = fabricRef.current.width! / 2;
    const centerY = fabricRef.current.height! / 2;
    const radius = 50;
    const points = 5;
    
    const pentPoints: { x: number; y: number }[] = [];
    for (let i = 0; i < points; i++) {
      const angle = (Math.PI * 2 / points) * i - Math.PI / 2;
      pentPoints.push({
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      });
    }
    
    const pentagon = new fabric.Polygon(pentPoints, {
      fill: '#06b6d4',
      left: centerX - radius,
      top: centerY - radius,
    });
    
    fabricRef.current.add(pentagon);
    fabricRef.current.setActiveObject(pentagon);
    fabricRef.current.renderAll();
  }, []);

  // Add Callout/Speech Bubble
  const addCallout = useCallback((type: 'speech' | 'thought' = 'speech') => {
    if (!fabricRef.current) return;
    
    const centerX = fabricRef.current.width! / 2;
    const centerY = fabricRef.current.height! / 2;
    
    if (type === 'speech') {
      // Speech bubble path
      const pathData = 'M 0 20 Q 0 0 20 0 L 130 0 Q 150 0 150 20 L 150 70 Q 150 90 130 90 L 50 90 L 30 110 L 35 90 L 20 90 Q 0 90 0 70 Z';
      const bubble = new fabric.Path(pathData, {
        fill: '#ffffff',
        stroke: '#1f2937',
        strokeWidth: 2,
        left: centerX - 75,
        top: centerY - 55,
      });
      fabricRef.current.add(bubble);
      fabricRef.current.setActiveObject(bubble);
    } else {
      // Thought bubble - circles
      const mainBubble = new fabric.Ellipse({
        rx: 80,
        ry: 50,
        fill: '#ffffff',
        stroke: '#1f2937',
        strokeWidth: 2,
        left: centerX - 80,
        top: centerY - 60,
      });
      
      const dot1 = new fabric.Circle({
        radius: 10,
        fill: '#ffffff',
        stroke: '#1f2937',
        strokeWidth: 2,
        left: centerX - 60,
        top: centerY + 5,
      });
      
      const dot2 = new fabric.Circle({
        radius: 6,
        fill: '#ffffff',
        stroke: '#1f2937',
        strokeWidth: 2,
        left: centerX - 70,
        top: centerY + 25,
      });
      
      const group = new fabric.Group([mainBubble, dot1, dot2]);
      fabricRef.current.add(group);
      fabricRef.current.setActiveObject(group);
    }
    
    fabricRef.current.renderAll();
  }, []);

  // Add Frame/Border around element
  const addBorder = useCallback((width: number, color: string, padding: number = 10) => {
    if (!fabricRef.current) return;
    
    const activeObject = fabricRef.current.getActiveObject();
    if (!activeObject) return;
    
    activeObject.set({
      stroke: color,
      strokeWidth: width,
      padding: padding,
    });
    
    fabricRef.current.renderAll();
    saveStateInternal();
  }, []);

  // Group selected objects
  const groupSelected = useCallback(() => {
    if (!fabricRef.current) return;
    
    const activeSelection = fabricRef.current.getActiveObject();
    if (!activeSelection || activeSelection.type !== 'activeSelection') return;
    
    // Get selected objects and create a new group
    const objects = (activeSelection as any)._objects;
    if (!objects || objects.length < 2) return;
    
    fabricRef.current.discardActiveObject();
    
    const group = new fabric.Group(objects, {
      left: activeSelection.left,
      top: activeSelection.top,
    });
    
    // Remove individual objects
    objects.forEach((obj: fabric.FabricObject) => {
      fabricRef.current!.remove(obj);
    });
    
    fabricRef.current.add(group);
    fabricRef.current.setActiveObject(group);
    fabricRef.current.renderAll();
    saveStateInternal();
  }, []);

  // Ungroup selected group
  const ungroupSelected = useCallback(() => {
    if (!fabricRef.current) return;
    
    const activeObject = fabricRef.current.getActiveObject();
    if (!activeObject || activeObject.type !== 'group') return;
    
    const items = (activeObject as fabric.Group).getObjects();
    const groupLeft = activeObject.left || 0;
    const groupTop = activeObject.top || 0;
    
    // Remove the group
    fabricRef.current.remove(activeObject);
    
    // Add back individual items with correct positions
    items.forEach((item: fabric.FabricObject) => {
      item.set({
        left: (item.left || 0) + groupLeft,
        top: (item.top || 0) + groupTop,
      });
      item.setCoords();
      fabricRef.current!.add(item);
    });
    
    fabricRef.current.renderAll();
    saveStateInternal();
  }, []);

  // Add Text with Stroke/Outline
  const addStrokedText = useCallback((text: string = 'OUTLINED', strokeColor: string = '#000000', strokeWidth: number = 2) => {
    if (!fabricRef.current) return;
    
    const textObj = new fabric.IText(text, {
      left: fabricRef.current.width! / 2,
      top: fabricRef.current.height! / 2,
      originX: 'center',
      originY: 'center',
      fontSize: 48,
      fontFamily: 'Poppins, sans-serif',
      fill: '#ffffff',
      fontWeight: 'bold',
      stroke: strokeColor,
      strokeWidth: strokeWidth,
      paintFirst: 'stroke',
    });
    
    fabricRef.current.add(textObj);
    fabricRef.current.setActiveObject(textObj);
    fabricRef.current.renderAll();
  }, []);

  // Set text stroke
  const setTextStroke = useCallback((color: string, width: number) => {
    if (!fabricRef.current) return;
    
    const activeObject = fabricRef.current.getActiveObject();
    if (!activeObject || (activeObject.type !== 'i-text' && activeObject.type !== 'text')) return;
    
    activeObject.set({
      stroke: color,
      strokeWidth: width,
      paintFirst: 'stroke',
    });
    
    fabricRef.current.renderAll();
    saveStateInternal();
  }, []);

  // Add Price Tag - Clean text style
  const addPriceTag = useCallback((price: string, originalPrice?: string) => {
    if (!fabricRef.current) return;
    
    const centerX = fabricRef.current.width! / 2;
    const centerY = fabricRef.current.height! / 2;
    
    // Create price text to measure
    const priceText = new fabric.Text(price, {
      fontSize: 24,
      fontFamily: 'Arial, sans-serif',
      fontWeight: 'bold',
      fill: '#ffffff',
    });
    
    const padding = 20;
    const tagWidth = Math.max(priceText.width! + padding * 2, 100);
    const tagHeight = originalPrice ? 56 : 44;
    
    const bg = new fabric.Rect({
      left: -tagWidth / 2,
      top: -tagHeight / 2,
      width: tagWidth,
      height: tagHeight,
      fill: '#ef4444',
      rx: 6,
      ry: 6,
    });
    
    const elements: fabric.FabricObject[] = [bg];
    
    if (originalPrice) {
      const originalText = new fabric.Text(originalPrice, {
        fontSize: 12,
        fontFamily: 'Arial, sans-serif',
        fill: '#fecaca',
        left: 0,
        top: -12,
        originX: 'center',
        originY: 'center',
        linethrough: true,
      });
      elements.push(originalText);
      
      priceText.set({
        left: 0,
        top: 10,
        originX: 'center',
        originY: 'center',
      });
    } else {
      priceText.set({
        left: 0,
        top: 0,
        originX: 'center',
        originY: 'center',
      });
    }
    elements.push(priceText);
    
    const group = new fabric.Group(elements, {
      left: centerX,
      top: centerY,
      originX: 'center',
      originY: 'center',
    });
    
    fabricRef.current.add(group);
    fabricRef.current.setActiveObject(group);
    fabricRef.current.renderAll();
    saveStateInternal();
  }, []);

  // Add Ribbon Banner - Clean text style
  const addRibbon = useCallback((text: string, color: string = '#7c3aed') => {
    if (!fabricRef.current) return;
    
    const centerX = fabricRef.current.width! / 2;
    const centerY = fabricRef.current.height! / 2;
    
    // Create text to measure
    const ribbonText = new fabric.Text(text, {
      fontSize: 14,
      fontFamily: 'Arial, sans-serif',
      fontWeight: 'bold',
      fill: '#ffffff',
    });
    
    const padding = 24;
    const ribbonWidth = ribbonText.width! + padding * 2;
    const ribbonHeight = 32;
    
    const bg = new fabric.Rect({
      left: -ribbonWidth / 2,
      top: -ribbonHeight / 2,
      width: ribbonWidth,
      height: ribbonHeight,
      fill: color,
      rx: 0,
      ry: 0,
    });
    
    ribbonText.set({
      left: 0,
      top: 0,
      originX: 'center',
      originY: 'center',
    });
    
    const group = new fabric.Group([bg, ribbonText], {
      left: centerX,
      top: centerY,
      originX: 'center',
      originY: 'center',
    });
    
    fabricRef.current.add(group);
    fabricRef.current.setActiveObject(group);
    fabricRef.current.renderAll();
    saveStateInternal();
  }, []);

  // Crop image (set clip path)
  const cropImage = useCallback((x: number, y: number, width: number, height: number) => {
    if (!fabricRef.current) return;
    
    const activeObject = fabricRef.current.getActiveObject();
    if (!activeObject || activeObject.type !== 'image') return;
    
    const clipRect = new fabric.Rect({
      left: x,
      top: y,
      width: width,
      height: height,
      absolutePositioned: true,
    });
    
    activeObject.set('clipPath', clipRect);
    fabricRef.current.renderAll();
    saveStateInternal();
  }, []);

  // Interactive crop - starts crop mode on selected image
  const startCrop = useCallback(() => {
    if (!fabricRef.current) return { success: false, message: 'Canvas not ready' };
    
    const activeObject = fabricRef.current.getActiveObject();
    if (!activeObject || activeObject.type !== 'image') {
      return { success: false, message: 'Please select an image first' };
    }
    
    const img = activeObject as fabric.Image;
    const imgLeft = img.left || 0;
    const imgTop = img.top || 0;
    const imgWidth = (img.width || 100) * (img.scaleX || 1);
    const imgHeight = (img.height || 100) * (img.scaleY || 1);
    
    // Create crop rectangle overlay
    const cropRect = new fabric.Rect({
      left: imgLeft + imgWidth * 0.1,
      top: imgTop + imgHeight * 0.1,
      width: imgWidth * 0.8,
      height: imgHeight * 0.8,
      fill: 'rgba(124, 58, 237, 0.2)',
      stroke: '#7c3aed',
      strokeWidth: 2,
      strokeDashArray: [5, 5],
      cornerColor: '#7c3aed',
      cornerStrokeColor: '#fff',
      cornerSize: 12,
      transparentCorners: false,
      hasRotatingPoint: false,
      lockRotation: true,
      // @ts-ignore - custom property
      isCropRect: true,
      // @ts-ignore
      targetImage: img,
    });
    
    fabricRef.current.add(cropRect);
    fabricRef.current.setActiveObject(cropRect);
    fabricRef.current.renderAll();
    
    return { success: true, message: 'Crop mode activated. Adjust the selection and click Apply Crop.' };
  }, []);

  // Apply the crop
  const applyCrop = useCallback(() => {
    if (!fabricRef.current) return { success: false, message: 'Canvas not ready' };
    
    const activeObject = fabricRef.current.getActiveObject();
    // @ts-ignore
    if (!activeObject || !activeObject.isCropRect) {
      return { success: false, message: 'No crop selection active' };
    }
    
    // @ts-ignore
    const targetImage = activeObject.targetImage as fabric.Image;
    if (!targetImage) {
      return { success: false, message: 'Target image not found' };
    }
    
    const cropRect = activeObject as fabric.Rect;
    const cropLeft = cropRect.left || 0;
    const cropTop = cropRect.top || 0;
    const cropWidth = (cropRect.width || 100) * (cropRect.scaleX || 1);
    const cropHeight = (cropRect.height || 100) * (cropRect.scaleY || 1);
    
    const imgLeft = targetImage.left || 0;
    const imgTop = targetImage.top || 0;
    const imgScaleX = targetImage.scaleX || 1;
    const imgScaleY = targetImage.scaleY || 1;
    
    // Calculate crop coordinates relative to image
    const relativeLeft = (cropLeft - imgLeft) / imgScaleX;
    const relativeTop = (cropTop - imgTop) / imgScaleY;
    const relativeWidth = cropWidth / imgScaleX;
    const relativeHeight = cropHeight / imgScaleY;
    
    // Create clip path
    const clipPath = new fabric.Rect({
      left: relativeLeft,
      top: relativeTop,
      width: relativeWidth,
      height: relativeHeight,
      absolutePositioned: false,
    });
    
    targetImage.set('clipPath', clipPath);
    
    // Optionally move image to crop position
    targetImage.set({
      left: cropLeft,
      top: cropTop,
    });
    
    // Remove crop rectangle
    fabricRef.current.remove(cropRect);
    fabricRef.current.setActiveObject(targetImage);
    fabricRef.current.renderAll();
    saveStateInternal();
    
    return { success: true, message: 'Image cropped successfully!' };
  }, []);

  // Cancel crop mode
  const cancelCrop = useCallback(() => {
    if (!fabricRef.current) return;
    
    const objects = fabricRef.current.getObjects();
    objects.forEach(obj => {
      // @ts-ignore
      if (obj.isCropRect) {
        fabricRef.current?.remove(obj);
      }
    });
    fabricRef.current.renderAll();
    return { success: true, message: 'Crop cancelled' };
  }, []);

  // Enable snap to grid
  const enableSnapToGrid = useCallback((gridSize: number = 10) => {
    if (!fabricRef.current) return;
    
    fabricRef.current.on('object:moving', (e: any) => {
      const obj = e.target;
      obj.set({
        left: Math.round(obj.left! / gridSize) * gridSize,
        top: Math.round(obj.top! / gridSize) * gridSize,
      });
    });
  }, []);

  // Disable snap to grid  
  const disableSnapToGrid = useCallback(() => {
    if (!fabricRef.current) return;
    fabricRef.current.off('object:moving');
  }, []);

  // Draw grid on canvas
  const showGrid = useCallback((gridSize: number = 20, color: string = 'rgba(0,0,0,0.1)') => {
    if (!fabricRef.current) return;
    
    const canvasWidth = fabricRef.current.width!;
    const canvasHeight = fabricRef.current.height!;
    const lines: fabric.Line[] = [];
    
    // Vertical lines
    for (let x = 0; x <= canvasWidth; x += gridSize) {
      lines.push(new fabric.Line([x, 0, x, canvasHeight], {
        stroke: color,
        strokeWidth: 1,
        selectable: false,
        evented: false,
      }));
    }
    
    // Horizontal lines
    for (let y = 0; y <= canvasHeight; y += gridSize) {
      lines.push(new fabric.Line([0, y, canvasWidth, y], {
        stroke: color,
        strokeWidth: 1,
        selectable: false,
        evented: false,
      }));
    }
    
    const gridGroup = new fabric.Group(lines, {
      selectable: false,
      evented: false,
    });
    
    (gridGroup as any).isGrid = true;
    fabricRef.current.add(gridGroup);
    fabricRef.current.sendObjectToBack(gridGroup);
    fabricRef.current.renderAll();
  }, []);

  // Hide grid
  const hideGrid = useCallback(() => {
    if (!fabricRef.current) return;
    
    const objects = fabricRef.current.getObjects();
    const gridGroup = objects.find((obj: any) => obj.isGrid);
    if (gridGroup) {
      fabricRef.current.remove(gridGroup);
      fabricRef.current.renderAll();
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      // Delete
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        deleteSelected();
      }
      
      // Undo/Redo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
      
      // Redo with Ctrl+Y
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        redo();
      }
      
      // Duplicate
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        duplicateSelected();
      }
      
      // Save project
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveProject();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deleteSelected, undo, redo, duplicateSelected, saveProject]);

  // Expose methods via ref-like pattern using a callback
  useEffect(() => {
    // Store methods on window for external access (temporary solution)
    (window as any).canvasEditor = {
      canvas: fabricRef.current,
      addText,
      addHeading,
      addRectangle,
      addCircle,
      addImage,
      addImageFromFile,
      setBackgroundImage,
      removeBackground,
      deleteSelected,
      duplicateSelected,
      bringForward,
      sendBackward,
      bringToFront,
      sendToBack,
      flipHorizontal,
      flipVertical,
      toggleLock,
      alignObject,
      autoArrange,
      extractColors,
      applyFilter,
      adjustImage,
      undo,
      redo,
      exportImage,
      exportMultiple,
      setCanvasSize,
      setBackgroundColor,
      getObjects,
      clear,
      loadJSON,
      toJSON,
      saveProject,
      loadProject,
      addTextShadow,
      // New features
      addDropShadow,
      removeShadow,
      addLine,
      addTriangle,
      addStar,
      addHexagon,
      addPentagon,
      addCallout,
      addBorder,
      groupSelected,
      ungroupSelected,
      addStrokedText,
      setTextStroke,
      addPriceTag,
      addRibbon,
      cropImage,
      enableSnapToGrid,
      disableSnapToGrid,
      showGrid,
      hideGrid,
      // AI Features
      generateAIImage,
      enhanceImage,
      getImageCaption,
      aiRemoveBackground,
      // Newly added features
      maskImageToShape,
      addGlow,
      addImageOutline,
      smartObjectFit,
      addCurvedText,
      addGradientText,
      blurBackground,
      addColorOverlay,
      removeImageFilters,
      distributeHorizontal,
      distributeVertical,
      clonePattern,
      addSocialIcon,
      addPaymentIcon,
      addDecorativeFrame,
      addProductPlaceholder,
      // Drawing tools
      enableDrawingMode,
      disableDrawingMode,
      setBrushColor,
      setBrushSize,
      clearDrawing,
      // Crop tools
      startCrop,
      applyCrop,
      cancelCrop,
    };
  }, [addText, addHeading, addRectangle, addCircle, addImage, addImageFromFile,
      setBackgroundImage, removeBackground, deleteSelected, duplicateSelected, 
      bringForward, sendBackward, bringToFront, sendToBack, flipHorizontal,
      flipVertical, toggleLock, alignObject, autoArrange, extractColors,
      applyFilter, adjustImage, undo, redo, exportImage, exportMultiple,
      setCanvasSize, setBackgroundColor, getObjects, clear, loadJSON, toJSON,
      saveProject, loadProject, addTextShadow, generateAIImage, enhanceImage,
      getImageCaption, aiRemoveBackground,
      addDropShadow, removeShadow, addLine, addTriangle, addStar, addHexagon,
      addPentagon, addCallout, addBorder, groupSelected, ungroupSelected,
      addStrokedText, setTextStroke, addPriceTag, addRibbon,
      cropImage, enableSnapToGrid, disableSnapToGrid, showGrid, hideGrid,
      maskImageToShape, addGlow, addImageOutline, smartObjectFit, addCurvedText,
      addGradientText, blurBackground, addColorOverlay, removeImageFilters,
      distributeHorizontal, distributeVertical, clonePattern, addSocialIcon,
      addPaymentIcon, addDecorativeFrame, addProductPlaceholder,
      enableDrawingMode, disableDrawingMode, setBrushColor, setBrushSize, clearDrawing,
      startCrop, applyCrop, cancelCrop]);

  return (
    <div className="relative bg-white rounded-lg shadow-lg" style={{ width, height }}>
      <canvas ref={canvasRef} />
    </div>
  );
}
