// Ad Types
export interface Ad {
  id: string;
  name: string;
  template: AdTemplate;
  elements: AdElement[];
  createdAt: Date;
  updatedAt: Date;
  complianceScore: number;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
}

export interface AdTemplate {
  id: string;
  name: string;
  category: TemplateCategory;
  width: number;
  height: number;
  thumbnail?: string;
}

export type TemplateCategory = 
  | 'banner' 
  | 'square' 
  | 'leaderboard' 
  | 'skyscraper' 
  | 'mobile' 
  | 'social';

export interface AdElement {
  id: string;
  type: 'text' | 'image' | 'shape' | 'product' | 'price' | 'logo';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  locked: boolean;
  properties: ElementProperties;
}

export interface ElementProperties {
  // Text properties
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
  
  // Image properties
  src?: string;
  alt?: string;
  objectFit?: 'contain' | 'cover' | 'fill';
  
  // Shape properties
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  borderRadius?: number;
  
  // Product properties
  productId?: string;
  productName?: string;
  productPrice?: number;
  productImage?: string;
}

// Compliance Types
export interface ComplianceResult {
  score: number;
  passed: boolean;
  checks: ComplianceCheck[];
  suggestions: string[];
}

export interface ComplianceCheck {
  id: string;
  name: string;
  category: 'brand' | 'legal' | 'accessibility' | 'quality';
  passed: boolean;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

// Product Types (Tesco specific)
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  clubcardPrice?: number;
  isClubcardOffer?: boolean;
  nutritionInfo?: NutritionInfo;
}

export interface NutritionInfo {
  calories: number;
  fat: number;
  saturates: number;
  sugars: number;
  salt: number;
}

// Canvas Types
export interface CanvasState {
  zoom: number;
  panX: number;
  panY: number;
  selectedElementId: string | null;
  showGrid: boolean;
  snapToGrid: boolean;
  gridSize: number;
}

// History Types
export interface HistoryEntry {
  id: string;
  timestamp: Date;
  action: string;
  state: string;
}

// AI Model Types
export interface ModelPrediction {
  score: number;
  confidence: number;
  suggestions: AISuggestion[];
}

export interface AISuggestion {
  type: 'layout' | 'color' | 'text' | 'image' | 'compliance';
  message: string;
  priority: 'high' | 'medium' | 'low';
  autoFix?: () => void;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'designer' | 'viewer';
  avatar?: string;
}
