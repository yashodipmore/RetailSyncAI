'use client';

import React, { useState } from 'react';
import { 
  Search, X, Star, Download, Heart, Grid3X3, List, Filter, LayoutGrid,
  Sparkles, Image, Sticker, Type, Shapes, Palette, Crown,
  ShoppingBag, Utensils, Gift, Percent, Tag, Award, Zap,
  Clock, Truck, Shield, Phone, Mail, MapPin, Globe, Share2,
  Facebook, Instagram, Twitter, Youtube, Linkedin,
  ArrowRight, ChevronRight, Play, Pause, Volume2, Music,
  Sun, Moon, Cloud, Umbrella, Snowflake, Leaf, Flower2,
  Heart as HeartIcon, ThumbsUp, MessageCircle, Send, Bookmark,
  Camera, Video, Mic, Headphones, Monitor, Smartphone, Tablet,
  Laptop, Watch, Tv, Speaker, Gamepad2, Car, Plane, Train,
  Coffee, Pizza, Apple, Cake, Wine, Beer, IceCream,
  Shirt, ShoppingCart, CreditCard, Wallet, Package, Box,
  Home, Building, Store, Warehouse, Factory,
  Users, User, UserPlus, Baby, Dog, Cat,
  Dumbbell, Bike, Trophy, Medal, Target, Volleyball,
  Brush, Pen, Pencil, Scissors, Ruler, Eraser,
  Lightbulb, Rocket, Flag, Bell, Calendar, Calculator
} from 'lucide-react';

// ==================== STICKERS LIBRARY ====================
export const STICKERS_LIBRARY = {
  sale: [
    { id: 'sale-1', name: 'Sale Burst', svg: `<svg viewBox="0 0 100 100"><polygon points="50,0 61,35 97,35 68,57 79,91 50,70 21,91 32,57 3,35 39,35" fill="#ef4444"/><text x="50" y="55" text-anchor="middle" fill="white" font-size="14" font-weight="bold">SALE</text></svg>`, category: 'sale' },
    { id: 'sale-2', name: 'Discount Badge', svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="#f97316"/><text x="50" y="45" text-anchor="middle" fill="white" font-size="20" font-weight="bold">50%</text><text x="50" y="65" text-anchor="middle" fill="white" font-size="12">OFF</text></svg>`, category: 'sale' },
    { id: 'sale-3', name: 'Hot Deal', svg: `<svg viewBox="0 0 100 100"><path d="M50 5 C30 25 20 45 25 65 C30 85 45 95 50 95 C55 95 70 85 75 65 C80 45 70 25 50 5" fill="#ef4444"/><text x="50" y="55" text-anchor="middle" fill="white" font-size="10" font-weight="bold">HOT</text><text x="50" y="70" text-anchor="middle" fill="white" font-size="10" font-weight="bold">DEAL</text></svg>`, category: 'sale' },
    { id: 'sale-4', name: 'Limited Time', svg: `<svg viewBox="0 0 120 50"><rect x="0" y="0" width="120" height="50" rx="25" fill="#7c3aed"/><text x="60" y="32" text-anchor="middle" fill="white" font-size="12" font-weight="bold">LIMITED TIME</text></svg>`, category: 'sale' },
    { id: 'sale-5', name: 'Best Price', svg: `<svg viewBox="0 0 100 100"><rect x="5" y="20" width="90" height="60" rx="10" fill="#059669"/><text x="50" y="45" text-anchor="middle" fill="white" font-size="10" font-weight="bold">BEST</text><text x="50" y="65" text-anchor="middle" fill="white" font-size="14" font-weight="bold">PRICE</text></svg>`, category: 'sale' },
    { id: 'sale-6', name: 'Flash Sale', svg: `<svg viewBox="0 0 100 100"><polygon points="50,5 60,40 95,40 67,60 77,95 50,75 23,95 33,60 5,40 40,40" fill="#fbbf24"/><text x="50" y="55" text-anchor="middle" fill="#1f2937" font-size="10" font-weight="bold">FLASH</text><text x="50" y="68" text-anchor="middle" fill="#1f2937" font-size="10" font-weight="bold">SALE</text></svg>`, category: 'sale' },
  ],
  badges: [
    { id: 'badge-1', name: 'New', svg: `<svg viewBox="0 0 80 30"><rect x="0" y="0" width="80" height="30" rx="15" fill="#22c55e"/><text x="40" y="20" text-anchor="middle" fill="white" font-size="12" font-weight="bold">NEW</text></svg>`, category: 'badges' },
    { id: 'badge-2', name: 'Bestseller', svg: `<svg viewBox="0 0 100 30"><rect x="0" y="0" width="100" height="30" rx="15" fill="#f59e0b"/><text x="50" y="20" text-anchor="middle" fill="white" font-size="10" font-weight="bold">BESTSELLER</text></svg>`, category: 'badges' },
    { id: 'badge-3', name: 'Premium', svg: `<svg viewBox="0 0 100 30"><rect x="0" y="0" width="100" height="30" rx="15" fill="linear-gradient(90deg,#f59e0b,#fbbf24)"/><rect x="0" y="0" width="100" height="30" rx="15" fill="#f59e0b"/><text x="50" y="20" text-anchor="middle" fill="white" font-size="10" font-weight="bold">★ PREMIUM</text></svg>`, category: 'badges' },
    { id: 'badge-4', name: 'Free Shipping', svg: `<svg viewBox="0 0 120 30"><rect x="0" y="0" width="120" height="30" rx="15" fill="#3b82f6"/><text x="60" y="20" text-anchor="middle" fill="white" font-size="10" font-weight="bold">FREE SHIPPING</text></svg>`, category: 'badges' },
    { id: 'badge-5', name: 'Organic', svg: `<svg viewBox="0 0 90 30"><rect x="0" y="0" width="90" height="30" rx="15" fill="#16a34a"/><text x="45" y="20" text-anchor="middle" fill="white" font-size="10" font-weight="bold">🌿 ORGANIC</text></svg>`, category: 'badges' },
    { id: 'badge-6', name: 'Verified', svg: `<svg viewBox="0 0 100 30"><rect x="0" y="0" width="100" height="30" rx="15" fill="#0ea5e9"/><text x="50" y="20" text-anchor="middle" fill="white" font-size="10" font-weight="bold">✓ VERIFIED</text></svg>`, category: 'badges' },
  ],
  retail: [
    { id: 'retail-1', name: 'Add to Cart', svg: `<svg viewBox="0 0 120 40"><rect x="0" y="0" width="120" height="40" rx="8" fill="#7c3aed"/><text x="60" y="26" text-anchor="middle" fill="white" font-size="12" font-weight="bold">🛒 Add to Cart</text></svg>`, category: 'retail' },
    { id: 'retail-2', name: 'Buy Now', svg: `<svg viewBox="0 0 100 40"><rect x="0" y="0" width="100" height="40" rx="8" fill="#ef4444"/><text x="50" y="26" text-anchor="middle" fill="white" font-size="14" font-weight="bold">Buy Now</text></svg>`, category: 'retail' },
    { id: 'retail-3', name: 'Shop Now', svg: `<svg viewBox="0 0 100 40"><rect x="0" y="0" width="100" height="40" rx="20" fill="#1f2937"/><text x="50" y="26" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Shop Now →</text></svg>`, category: 'retail' },
    { id: 'retail-4', name: 'Order Now', svg: `<svg viewBox="0 0 100 40"><rect x="0" y="0" width="100" height="40" rx="8" fill="#059669"/><text x="50" y="26" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Order Now</text></svg>`, category: 'retail' },
    { id: 'retail-5', name: 'Learn More', svg: `<svg viewBox="0 0 100 40"><rect x="0" y="0" width="100" height="40" rx="8" fill="none" stroke="#7c3aed" stroke-width="2"/><text x="50" y="26" text-anchor="middle" fill="#7c3aed" font-size="12" font-weight="bold">Learn More</text></svg>`, category: 'retail' },
    { id: 'retail-6', name: 'Get Started', svg: `<svg viewBox="0 0 110 40"><rect x="0" y="0" width="110" height="40" rx="8" fill="#f97316"/><text x="55" y="26" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Get Started</text></svg>`, category: 'retail' },
  ],
  social: [
    { id: 'social-1', name: 'Like', svg: `<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="28" fill="#3b82f6"/><text x="30" y="38" text-anchor="middle" fill="white" font-size="24">👍</text></svg>`, category: 'social' },
    { id: 'social-2', name: 'Love', svg: `<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="28" fill="#ef4444"/><text x="30" y="38" text-anchor="middle" fill="white" font-size="24">❤️</text></svg>`, category: 'social' },
    { id: 'social-3', name: 'Star', svg: `<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="28" fill="#fbbf24"/><text x="30" y="38" text-anchor="middle" fill="white" font-size="24">⭐</text></svg>`, category: 'social' },
    { id: 'social-4', name: 'Fire', svg: `<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="28" fill="#f97316"/><text x="30" y="38" text-anchor="middle" fill="white" font-size="24">🔥</text></svg>`, category: 'social' },
    { id: 'social-5', name: 'Rocket', svg: `<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="28" fill="#8b5cf6"/><text x="30" y="38" text-anchor="middle" fill="white" font-size="24">🚀</text></svg>`, category: 'social' },
    { id: 'social-6', name: 'Crown', svg: `<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="28" fill="#f59e0b"/><text x="30" y="38" text-anchor="middle" fill="white" font-size="24">👑</text></svg>`, category: 'social' },
  ],
  arrows: [
    { id: 'arrow-1', name: 'Right Arrow', svg: `<svg viewBox="0 0 60 40"><path d="M5 20 L45 20 M35 10 L45 20 L35 30" stroke="#1f2937" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`, category: 'arrows' },
    { id: 'arrow-2', name: 'Circle Arrow', svg: `<svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="23" fill="#7c3aed"/><path d="M18 25 L32 25 M27 20 L32 25 L27 30" stroke="white" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`, category: 'arrows' },
    { id: 'arrow-3', name: 'Down Arrow', svg: `<svg viewBox="0 0 40 60"><path d="M20 5 L20 45 M10 35 L20 45 L30 35" stroke="#ef4444" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`, category: 'arrows' },
    { id: 'arrow-4', name: 'Curved Arrow', svg: `<svg viewBox="0 0 60 40"><path d="M10 30 Q30 5 50 30" stroke="#059669" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M45 25 L50 30 L45 35" stroke="#059669" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`, category: 'arrows' },
  ],
  decorative: [
    { id: 'deco-1', name: 'Sparkle', svg: `<svg viewBox="0 0 50 50"><path d="M25 5 L28 20 L43 25 L28 30 L25 45 L22 30 L7 25 L22 20 Z" fill="#fbbf24"/></svg>`, category: 'decorative' },
    { id: 'deco-2', name: 'Burst', svg: `<svg viewBox="0 0 60 60"><polygon points="30,2 35,22 55,15 40,30 55,45 35,38 30,58 25,38 5,45 20,30 5,15 25,22" fill="#ef4444"/></svg>`, category: 'decorative' },
    { id: 'deco-3', name: 'Ribbon', svg: `<svg viewBox="0 0 120 40"><path d="M0 20 L15 10 L15 30 L0 20 M15 5 L105 5 L105 35 L15 35 Z M105 10 L120 20 L105 30" fill="#7c3aed"/></svg>`, category: 'decorative' },
    { id: 'deco-4', name: 'Banner', svg: `<svg viewBox="0 0 140 50"><path d="M10 10 L130 10 L140 25 L130 40 L10 40 L0 25 Z" fill="#1f2937"/></svg>`, category: 'decorative' },
    { id: 'deco-5', name: 'Circle Frame', svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="none" stroke="#f59e0b" stroke-width="4"/><circle cx="50" cy="50" r="38" fill="none" stroke="#f59e0b" stroke-width="1" stroke-dasharray="5,5"/></svg>`, category: 'decorative' },
    { id: 'deco-6', name: 'Corner Flourish', svg: `<svg viewBox="0 0 60 60"><path d="M5 55 Q5 5 55 5" stroke="#7c3aed" stroke-width="3" fill="none"/><circle cx="55" cy="5" r="4" fill="#7c3aed"/><circle cx="5" cy="55" r="4" fill="#7c3aed"/></svg>`, category: 'decorative' },
  ],
};

// ==================== SHAPES LIBRARY ====================
export const SHAPES_LIBRARY = {
  basic: [
    { id: 'shape-rect', name: 'Rectangle', type: 'rect', props: { width: 150, height: 100, fill: '#7c3aed', rx: 0 } },
    { id: 'shape-rounded', name: 'Rounded Rect', type: 'rect', props: { width: 150, height: 100, fill: '#3b82f6', rx: 20 } },
    { id: 'shape-circle', name: 'Circle', type: 'circle', props: { radius: 60, fill: '#ef4444' } },
    { id: 'shape-ellipse', name: 'Ellipse', type: 'ellipse', props: { rx: 80, ry: 50, fill: '#f97316' } },
    { id: 'shape-triangle', name: 'Triangle', type: 'triangle', props: { width: 120, height: 100, fill: '#22c55e' } },
    { id: 'shape-line', name: 'Line', type: 'line', props: { x1: 0, y1: 0, x2: 150, y2: 0, stroke: '#1f2937', strokeWidth: 4 } },
  ],
  special: [
    { id: 'shape-star', name: 'Star', type: 'polygon', points: 5, fill: '#fbbf24', innerRadius: 0.4 },
    { id: 'shape-hexagon', name: 'Hexagon', type: 'polygon', points: 6, fill: '#8b5cf6' },
    { id: 'shape-pentagon', name: 'Pentagon', type: 'polygon', points: 5, fill: '#06b6d4' },
    { id: 'shape-octagon', name: 'Octagon', type: 'polygon', points: 8, fill: '#f43f5e' },
    { id: 'shape-diamond', name: 'Diamond', type: 'polygon', points: 4, fill: '#0ea5e9', rotation: 45 },
    { id: 'shape-cross', name: 'Cross', type: 'path', fill: '#ef4444' },
  ],
  frames: [
    { id: 'frame-square', name: 'Square Frame', type: 'rect', props: { width: 150, height: 150, fill: 'transparent', stroke: '#1f2937', strokeWidth: 4 } },
    { id: 'frame-circle', name: 'Circle Frame', type: 'circle', props: { radius: 70, fill: 'transparent', stroke: '#7c3aed', strokeWidth: 4 } },
    { id: 'frame-rounded', name: 'Rounded Frame', type: 'rect', props: { width: 150, height: 100, fill: 'transparent', stroke: '#f59e0b', strokeWidth: 4, rx: 20 } },
    { id: 'frame-double', name: 'Double Frame', type: 'rect', props: { width: 150, height: 100, fill: 'transparent', stroke: '#ef4444', strokeWidth: 2, strokeDashArray: [10, 5] } },
  ],
  callouts: [
    { id: 'callout-1', name: 'Speech Bubble', type: 'path', fill: '#ffffff', stroke: '#1f2937' },
    { id: 'callout-2', name: 'Thought Bubble', type: 'path', fill: '#ffffff', stroke: '#7c3aed' },
    { id: 'callout-3', name: 'Arrow Callout', type: 'path', fill: '#3b82f6' },
  ],
};

// ==================== ICONS BY CATEGORY ====================
export const ICONS_LIBRARY = {
  ecommerce: [
    { name: 'Shopping Bag', icon: ShoppingBag, color: '#7c3aed' },
    { name: 'Shopping Cart', icon: ShoppingCart, color: '#3b82f6' },
    { name: 'Tag', icon: Tag, color: '#ef4444' },
    { name: 'Percent', icon: Percent, color: '#f97316' },
    { name: 'Gift', icon: Gift, color: '#ec4899' },
    { name: 'Credit Card', icon: CreditCard, color: '#0ea5e9' },
    { name: 'Wallet', icon: Wallet, color: '#22c55e' },
    { name: 'Package', icon: Package, color: '#8b5cf6' },
    { name: 'Box', icon: Box, color: '#f59e0b' },
    { name: 'Truck', icon: Truck, color: '#6366f1' },
    { name: 'Store', icon: Store, color: '#14b8a6' },
    { name: 'Award', icon: Award, color: '#fbbf24' },
  ],
  food: [
    { name: 'Coffee', icon: Coffee, color: '#78350f' },
    { name: 'Pizza', icon: Pizza, color: '#f97316' },
    { name: 'Apple', icon: Apple, color: '#ef4444' },
    { name: 'Cake', icon: Cake, color: '#ec4899' },
    { name: 'Wine', icon: Wine, color: '#7c2d12' },
    { name: 'Beer', icon: Beer, color: '#fbbf24' },
    { name: 'Ice Cream', icon: IceCream, color: '#f472b6' },
    { name: 'Utensils', icon: Utensils, color: '#6b7280' },
  ],
  tech: [
    { name: 'Monitor', icon: Monitor, color: '#1f2937' },
    { name: 'Smartphone', icon: Smartphone, color: '#3b82f6' },
    { name: 'Tablet', icon: Tablet, color: '#8b5cf6' },
    { name: 'Laptop', icon: Laptop, color: '#6366f1' },
    { name: 'Watch', icon: Watch, color: '#0ea5e9' },
    { name: 'TV', icon: Tv, color: '#1f2937' },
    { name: 'Speaker', icon: Speaker, color: '#f97316' },
    { name: 'Headphones', icon: Headphones, color: '#ef4444' },
    { name: 'Camera', icon: Camera, color: '#1f2937' },
    { name: 'Video', icon: Video, color: '#dc2626' },
    { name: 'Gamepad', icon: Gamepad2, color: '#7c3aed' },
  ],
  social: [
    { name: 'Heart', icon: HeartIcon, color: '#ef4444' },
    { name: 'Thumbs Up', icon: ThumbsUp, color: '#3b82f6' },
    { name: 'Message', icon: MessageCircle, color: '#22c55e' },
    { name: 'Share', icon: Share2, color: '#6366f1' },
    { name: 'Send', icon: Send, color: '#0ea5e9' },
    { name: 'Bookmark', icon: Bookmark, color: '#f59e0b' },
    { name: 'Star', icon: Star, color: '#fbbf24' },
    { name: 'Users', icon: Users, color: '#8b5cf6' },
  ],
  action: [
    { name: 'Zap', icon: Zap, color: '#fbbf24' },
    { name: 'Rocket', icon: Rocket, color: '#ef4444' },
    { name: 'Target', icon: Target, color: '#dc2626' },
    { name: 'Trophy', icon: Trophy, color: '#f59e0b' },
    { name: 'Medal', icon: Medal, color: '#fbbf24' },
    { name: 'Flag', icon: Flag, color: '#22c55e' },
    { name: 'Bell', icon: Bell, color: '#f97316' },
    { name: 'Lightbulb', icon: Lightbulb, color: '#fbbf24' },
    { name: 'Sparkles', icon: Sparkles, color: '#8b5cf6' },
  ],
  contact: [
    { name: 'Phone', icon: Phone, color: '#22c55e' },
    { name: 'Mail', icon: Mail, color: '#3b82f6' },
    { name: 'Map Pin', icon: MapPin, color: '#ef4444' },
    { name: 'Globe', icon: Globe, color: '#0ea5e9' },
    { name: 'Calendar', icon: Calendar, color: '#6366f1' },
    { name: 'Clock', icon: Clock, color: '#f97316' },
  ],
  transport: [
    { name: 'Car', icon: Car, color: '#3b82f6' },
    { name: 'Plane', icon: Plane, color: '#0ea5e9' },
    { name: 'Train', icon: Train, color: '#22c55e' },
    { name: 'Bike', icon: Bike, color: '#f97316' },
  ],
  lifestyle: [
    { name: 'Home', icon: Home, color: '#8b5cf6' },
    { name: 'Building', icon: Building, color: '#6b7280' },
    { name: 'Dumbbell', icon: Dumbbell, color: '#ef4444' },
    { name: 'Volleyball', icon: Volleyball, color: '#22c55e' },
    { name: 'Music', icon: Music, color: '#ec4899' },
    { name: 'Sun', icon: Sun, color: '#fbbf24' },
    { name: 'Moon', icon: Moon, color: '#6366f1' },
    { name: 'Cloud', icon: Cloud, color: '#0ea5e9' },
    { name: 'Leaf', icon: Leaf, color: '#22c55e' },
    { name: 'Flower', icon: Flower2, color: '#ec4899' },
  ],
};

// ==================== GRADIENT BACKGROUNDS ====================
export const GRADIENTS_LIBRARY = [
  { id: 'grad-1', name: 'Sunset', colors: ['#f97316', '#ec4899'], angle: 135 },
  { id: 'grad-2', name: 'Ocean', colors: ['#0ea5e9', '#6366f1'], angle: 135 },
  { id: 'grad-3', name: 'Forest', colors: ['#22c55e', '#14b8a6'], angle: 135 },
  { id: 'grad-4', name: 'Purple Dream', colors: ['#8b5cf6', '#ec4899'], angle: 135 },
  { id: 'grad-5', name: 'Fire', colors: ['#ef4444', '#f97316'], angle: 135 },
  { id: 'grad-6', name: 'Gold', colors: ['#f59e0b', '#fbbf24'], angle: 135 },
  { id: 'grad-7', name: 'Night Sky', colors: ['#1f2937', '#4b5563'], angle: 135 },
  { id: 'grad-8', name: 'Royal', colors: ['#7c3aed', '#3b82f6'], angle: 135 },
  { id: 'grad-9', name: 'Fresh', colors: ['#06b6d4', '#22c55e'], angle: 135 },
  { id: 'grad-10', name: 'Berry', colors: ['#ec4899', '#f43f5e'], angle: 135 },
  { id: 'grad-11', name: 'Mint', colors: ['#10b981', '#6ee7b7'], angle: 135 },
  { id: 'grad-12', name: 'Peach', colors: ['#fb923c', '#fbbf24'], angle: 135 },
  { id: 'grad-13', name: 'Electric', colors: ['#3b82f6', '#06b6d4'], angle: 90 },
  { id: 'grad-14', name: 'Coral', colors: ['#f43f5e', '#fb7185'], angle: 135 },
  { id: 'grad-15', name: 'Lavender', colors: ['#a78bfa', '#c4b5fd'], angle: 135 },
  { id: 'grad-16', name: 'Emerald', colors: ['#059669', '#34d399'], angle: 135 },
];

// ==================== PROFESSIONAL TEMPLATES ====================
export const PROFESSIONAL_TEMPLATES = {
  retail: [
    {
      id: 'tpl-retail-1',
      name: 'Flash Sale Banner',
      category: 'retail',
      thumbnail: 'flash-sale',
      preview: { bg: '#1a1a2e', accent: '#ef4444' },
      elements: {
        background: { type: 'gradient', colors: ['#1a1a2e', '#2d1f47'] },
        headline: { text: 'FLASH SALE', font: 'Oswald', size: 48, color: '#ffffff', weight: 'bold' },
        subtext: { text: 'Up to 70% OFF', font: 'Inter', size: 24, color: '#fbbf24' },
        badge: { type: 'sale', text: '70%', color: '#ef4444' },
        cta: { text: 'Shop Now', bg: '#ef4444', color: '#ffffff' },
      }
    },
    {
      id: 'tpl-retail-2',
      name: 'Product Showcase',
      category: 'retail',
      thumbnail: 'product-showcase',
      preview: { bg: '#ffffff', accent: '#7c3aed' },
      elements: {
        background: { type: 'solid', color: '#ffffff' },
        headline: { text: 'New Arrival', font: 'Poppins', size: 36, color: '#1f2937', weight: '600' },
        price: { original: '₹1999', discounted: '₹999', color: '#ef4444' },
        cta: { text: 'Buy Now', bg: '#7c3aed', color: '#ffffff' },
      }
    },
    {
      id: 'tpl-retail-3',
      name: 'Grocery Deal',
      category: 'retail',
      thumbnail: 'grocery',
      preview: { bg: '#ecfdf5', accent: '#059669' },
      elements: {
        background: { type: 'solid', color: '#ecfdf5' },
        headline: { text: 'Fresh Groceries', font: 'Poppins', size: 32, color: '#059669', weight: 'bold' },
        badge: { type: 'organic', text: 'Organic', color: '#22c55e' },
        cta: { text: 'Order Now', bg: '#059669', color: '#ffffff' },
      }
    },
  ],
  food: [
    {
      id: 'tpl-food-1',
      name: 'Restaurant Promo',
      category: 'food',
      thumbnail: 'restaurant',
      preview: { bg: '#1f2937', accent: '#f97316' },
      elements: {
        background: { type: 'gradient', colors: ['#1f2937', '#374151'] },
        headline: { text: 'Delicious Food', font: 'Playfair Display', size: 40, color: '#ffffff' },
        subtext: { text: 'Order Online & Get 20% Off', font: 'Inter', size: 18, color: '#fbbf24' },
        cta: { text: 'Order Now', bg: '#f97316', color: '#ffffff' },
      }
    },
    {
      id: 'tpl-food-2',
      name: 'Coffee Shop',
      category: 'food',
      thumbnail: 'coffee',
      preview: { bg: '#451a03', accent: '#fbbf24' },
      elements: {
        background: { type: 'solid', color: '#451a03' },
        headline: { text: 'Premium Coffee', font: 'Playfair Display', size: 36, color: '#fbbf24' },
        subtext: { text: 'Start Your Day Right', font: 'Inter', size: 16, color: '#fef3c7' },
      }
    },
  ],
  fashion: [
    {
      id: 'tpl-fashion-1',
      name: 'Fashion Sale',
      category: 'fashion',
      thumbnail: 'fashion-sale',
      preview: { bg: '#fdf2f8', accent: '#ec4899' },
      elements: {
        background: { type: 'gradient', colors: ['#fdf2f8', '#fce7f3'] },
        headline: { text: 'SEASON SALE', font: 'Oswald', size: 48, color: '#1f2937', weight: 'bold' },
        subtext: { text: 'Up to 50% Off on All Items', font: 'Inter', size: 18, color: '#6b7280' },
        cta: { text: 'Shop Collection', bg: '#ec4899', color: '#ffffff' },
      }
    },
    {
      id: 'tpl-fashion-2',
      name: 'Luxury Brand',
      category: 'fashion',
      thumbnail: 'luxury',
      preview: { bg: '#0f172a', accent: '#f59e0b' },
      elements: {
        background: { type: 'solid', color: '#0f172a' },
        headline: { text: 'EXCLUSIVE', font: 'Playfair Display', size: 42, color: '#f59e0b' },
        subtext: { text: 'Limited Edition Collection', font: 'Inter', size: 16, color: '#94a3b8' },
      }
    },
  ],
  tech: [
    {
      id: 'tpl-tech-1',
      name: 'Tech Launch',
      category: 'tech',
      thumbnail: 'tech-launch',
      preview: { bg: '#0c0c1d', accent: '#3b82f6' },
      elements: {
        background: { type: 'gradient', colors: ['#0c0c1d', '#1e1b4b'] },
        headline: { text: 'Next Gen Tech', font: 'Inter', size: 40, color: '#ffffff', weight: 'bold' },
        subtext: { text: 'Experience the Future', font: 'Inter', size: 18, color: '#60a5fa' },
        cta: { text: 'Pre-Order Now', bg: '#3b82f6', color: '#ffffff' },
      }
    },
    {
      id: 'tpl-tech-2',
      name: 'Gadget Deal',
      category: 'tech',
      thumbnail: 'gadget',
      preview: { bg: '#18181b', accent: '#06b6d4' },
      elements: {
        background: { type: 'solid', color: '#18181b' },
        headline: { text: 'MEGA SALE', font: 'Oswald', size: 44, color: '#06b6d4' },
        badge: { type: 'discount', text: '40% OFF', color: '#ef4444' },
      }
    },
  ],
  event: [
    {
      id: 'tpl-event-1',
      name: 'Event Announcement',
      category: 'event',
      thumbnail: 'event',
      preview: { bg: '#7c3aed', accent: '#fbbf24' },
      elements: {
        background: { type: 'gradient', colors: ['#7c3aed', '#8b5cf6'] },
        headline: { text: 'LIVE EVENT', font: 'Oswald', size: 48, color: '#ffffff' },
        date: { text: 'Jan 15, 2026', font: 'Inter', size: 24, color: '#fbbf24' },
        cta: { text: 'Register Now', bg: '#fbbf24', color: '#1f2937' },
      }
    },
  ],
  social: [
    {
      id: 'tpl-social-1',
      name: 'Instagram Post',
      category: 'social',
      thumbnail: 'instagram',
      preview: { bg: 'gradient', accent: '#ec4899' },
      size: { width: 1080, height: 1080 },
      elements: {
        background: { type: 'gradient', colors: ['#f97316', '#ec4899', '#8b5cf6'] },
        headline: { text: 'Follow Us', font: 'Poppins', size: 48, color: '#ffffff' },
      }
    },
    {
      id: 'tpl-social-2',
      name: 'Story Template',
      category: 'social',
      thumbnail: 'story',
      preview: { bg: '#1f2937', accent: '#22c55e' },
      size: { width: 1080, height: 1920 },
      elements: {
        background: { type: 'solid', color: '#1f2937' },
        headline: { text: 'Swipe Up', font: 'Poppins', size: 36, color: '#ffffff' },
      }
    },
  ],
};

// ==================== FONTS ====================
export const GOOGLE_FONTS = [
  { name: 'Poppins', family: 'Poppins, sans-serif', weights: ['400', '500', '600', '700'], category: 'sans-serif' },
  { name: 'Inter', family: 'Inter, sans-serif', weights: ['400', '500', '600', '700'], category: 'sans-serif' },
  { name: 'Roboto', family: 'Roboto, sans-serif', weights: ['400', '500', '700'], category: 'sans-serif' },
  { name: 'Open Sans', family: 'Open Sans, sans-serif', weights: ['400', '600', '700'], category: 'sans-serif' },
  { name: 'Montserrat', family: 'Montserrat, sans-serif', weights: ['400', '500', '600', '700', '800'], category: 'sans-serif' },
  { name: 'Lato', family: 'Lato, sans-serif', weights: ['400', '700'], category: 'sans-serif' },
  { name: 'Oswald', family: 'Oswald, sans-serif', weights: ['400', '500', '600', '700'], category: 'display' },
  { name: 'Raleway', family: 'Raleway, sans-serif', weights: ['400', '500', '600', '700'], category: 'sans-serif' },
  { name: 'Nunito', family: 'Nunito, sans-serif', weights: ['400', '600', '700'], category: 'sans-serif' },
  { name: 'Playfair Display', family: 'Playfair Display, serif', weights: ['400', '500', '600', '700'], category: 'serif' },
  { name: 'Merriweather', family: 'Merriweather, serif', weights: ['400', '700'], category: 'serif' },
  { name: 'Lora', family: 'Lora, serif', weights: ['400', '500', '600', '700'], category: 'serif' },
  { name: 'PT Serif', family: 'PT Serif, serif', weights: ['400', '700'], category: 'serif' },
  { name: 'Source Serif Pro', family: 'Source Serif Pro, serif', weights: ['400', '600', '700'], category: 'serif' },
  { name: 'Bebas Neue', family: 'Bebas Neue, sans-serif', weights: ['400'], category: 'display' },
  { name: 'Anton', family: 'Anton, sans-serif', weights: ['400'], category: 'display' },
  { name: 'Archivo Black', family: 'Archivo Black, sans-serif', weights: ['400'], category: 'display' },
  { name: 'Righteous', family: 'Righteous, cursive', weights: ['400'], category: 'display' },
  { name: 'Pacifico', family: 'Pacifico, cursive', weights: ['400'], category: 'handwriting' },
  { name: 'Dancing Script', family: 'Dancing Script, cursive', weights: ['400', '500', '600', '700'], category: 'handwriting' },
  { name: 'Satisfy', family: 'Satisfy, cursive', weights: ['400'], category: 'handwriting' },
  { name: 'Great Vibes', family: 'Great Vibes, cursive', weights: ['400'], category: 'handwriting' },
];

// ==================== COMPONENT ====================
interface AssetLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSticker: (svg: string) => void;
  onAddShape: (shape: any) => void;
  onAddIcon: (iconName: string, color: string) => void;
  onApplyGradient: (colors: string[], angle: number) => void;
  onApplyTemplate: (template: any) => void;
  onChangeFont: (fontFamily: string) => void;
}

const AssetLibrary: React.FC<AssetLibraryProps> = ({
  isOpen,
  onClose,
  onAddSticker,
  onAddShape,
  onAddIcon,
  onApplyGradient,
  onApplyTemplate,
  onChangeFont,
}) => {
  const [activeTab, setActiveTab] = useState<'stickers' | 'shapes' | 'icons' | 'gradients' | 'templates' | 'fonts'>('templates');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (!isOpen) return null;

  const tabs = [
    { id: 'templates', label: 'Templates', icon: LayoutGrid },
    { id: 'stickers', label: 'Stickers', icon: Sticker },
    { id: 'shapes', label: 'Shapes', icon: Shapes },
    { id: 'icons', label: 'Icons', icon: Sparkles },
    { id: 'gradients', label: 'Gradients', icon: Palette },
    { id: 'fonts', label: 'Fonts', icon: Type },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#0f0f1a] rounded-xl border border-white/10 w-full max-w-6xl h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-violet-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Asset Library</h2>
              <p className="text-xs text-gray-500">Templates • Stickers • Icons • Shapes • Fonts</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-md transition-colors">
            <X className="w-5 h-5 text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 bg-black/20 px-4">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? 'text-violet-400 border-violet-500'
                    : 'text-gray-500 border-transparent hover:text-white hover:bg-white/5'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="p-4 border-b border-white/5">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500/50"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Templates Tab */}
          {activeTab === 'templates' && (
            <div className="space-y-8">
              {Object.entries(PROFESSIONAL_TEMPLATES).map(([category, templates]) => (
                <div key={category}>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Crown className="w-4 h-4 text-violet-400" />
                    {category} Templates
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {templates.map((template: any) => (
                      <div
                        key={template.id}
                        onClick={() => onApplyTemplate(template)}
                        className="group cursor-pointer rounded-lg overflow-hidden border border-white/10 hover:border-violet-500/40 transition-colors"
                      >
                        <div 
                          className="aspect-video p-4 flex flex-col justify-center items-center"
                          style={{ 
                            background: template.preview.bg.includes('#') 
                              ? template.preview.bg 
                              : `linear-gradient(135deg, ${template.elements.background.colors?.[0] || '#1a1a2e'}, ${template.elements.background.colors?.[1] || '#2d1f47'})`
                          }}
                        >
                          <span className="text-lg font-bold text-white text-center">{template.elements.headline.text}</span>
                          {template.elements.subtext && (
                            <span className="text-xs mt-1 opacity-70 text-white">{template.elements.subtext.text}</span>
                          )}
                        </div>
                        <div className="p-3 bg-black/40">
                          <p className="text-sm text-white font-medium">{template.name}</p>
                          <p className="text-xs text-gray-500 capitalize">{template.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stickers Tab */}
          {activeTab === 'stickers' && (
            <div className="space-y-8">
              {Object.entries(STICKERS_LIBRARY).map(([category, stickers]) => (
                <div key={category}>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 capitalize">{category}</h3>
                  <div className="grid grid-cols-6 gap-3">
                    {stickers.map((sticker) => (
                      <button
                        key={sticker.id}
                        onClick={() => onAddSticker(sticker.svg)}
                        className="aspect-square rounded-lg bg-white/5 border border-white/10 hover:border-violet-500/40 hover:bg-white/10 transition-colors p-3 flex items-center justify-center"
                        title={sticker.name}
                      >
                        <div 
                          className="w-full h-full"
                          dangerouslySetInnerHTML={{ __html: sticker.svg }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Shapes Tab */}
          {activeTab === 'shapes' && (
            <div className="space-y-8">
              {Object.entries(SHAPES_LIBRARY).map(([category, shapes]) => (
                <div key={category}>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 capitalize">{category} Shapes</h3>
                  <div className="grid grid-cols-6 gap-3">
                    {shapes.map((shape: any) => (
                      <button
                        key={shape.id}
                        onClick={() => onAddShape(shape)}
                        className="aspect-square rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/50 hover:bg-white/10 transition-all p-4 flex items-center justify-center group"
                        title={shape.name}
                      >
                        {shape.type === 'rect' && (
                          <div 
                            className="w-10 h-7 group-hover:scale-110 transition-transform"
                            style={{ 
                              backgroundColor: shape.props?.fill || '#7c3aed',
                              borderRadius: shape.props?.rx || 0,
                              border: shape.props?.stroke ? `2px solid ${shape.props.stroke}` : 'none'
                            }}
                          />
                        )}
                        {shape.type === 'circle' && (
                          <div 
                            className="w-10 h-10 rounded-full group-hover:scale-110 transition-transform"
                            style={{ 
                              backgroundColor: shape.props?.fill || '#ef4444',
                              border: shape.props?.stroke ? `2px solid ${shape.props.stroke}` : 'none'
                            }}
                          />
                        )}
                        {shape.type === 'ellipse' && (
                          <div 
                            className="w-12 h-8 rounded-full group-hover:scale-110 transition-transform"
                            style={{ backgroundColor: shape.props?.fill || '#f97316' }}
                          />
                        )}
                        {shape.type === 'triangle' && (
                          <div 
                            className="w-0 h-0 group-hover:scale-110 transition-transform"
                            style={{ 
                              borderLeft: '20px solid transparent',
                              borderRight: '20px solid transparent',
                              borderBottom: `35px solid ${shape.props?.fill || '#22c55e'}`
                            }}
                          />
                        )}
                        {shape.type === 'polygon' && (
                          <div 
                            className="w-10 h-10 group-hover:scale-110 transition-transform flex items-center justify-center"
                          >
                            <Star className="w-full h-full" style={{ color: shape.fill || '#fbbf24' }} fill={shape.fill || '#fbbf24'} />
                          </div>
                        )}
                        {shape.type === 'line' && (
                          <div 
                            className="w-10 h-1 group-hover:scale-110 transition-transform"
                            style={{ backgroundColor: shape.props?.stroke || '#1f2937' }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Icons Tab */}
          {activeTab === 'icons' && (
            <div className="space-y-8">
              {Object.entries(ICONS_LIBRARY).map(([category, icons]) => (
                <div key={category}>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 capitalize">{category}</h3>
                  <div className="grid grid-cols-8 gap-3">
                    {icons.map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <button
                          key={index}
                          onClick={() => onAddIcon(item.name, item.color)}
                          className="aspect-square rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/50 hover:bg-white/10 transition-all p-3 flex flex-col items-center justify-center gap-1 group"
                          title={item.name}
                        >
                          <IconComponent 
                            className="w-6 h-6 group-hover:scale-110 transition-transform" 
                            style={{ color: item.color }}
                          />
                          <span className="text-[9px] text-gray-500 truncate w-full text-center">{item.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Gradients Tab */}
          {activeTab === 'gradients' && (
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Background Gradients</h3>
              <div className="grid grid-cols-4 gap-4">
                {GRADIENTS_LIBRARY.map((gradient) => (
                  <button
                    key={gradient.id}
                    onClick={() => onApplyGradient(gradient.colors, gradient.angle)}
                    className="group rounded-xl overflow-hidden border border-white/10 hover:border-violet-500/50 transition-all hover:shadow-lg hover:shadow-violet-500/10"
                  >
                    <div 
                      className="aspect-video"
                      style={{ 
                        background: `linear-gradient(${gradient.angle}deg, ${gradient.colors.join(', ')})`
                      }}
                    />
                    <div className="p-2 bg-black/40">
                      <p className="text-xs text-white font-medium text-center">{gradient.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Fonts Tab */}
          {activeTab === 'fonts' && (
            <div className="space-y-6">
              {['sans-serif', 'serif', 'display', 'handwriting'].map((category) => (
                <div key={category}>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 capitalize">{category}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {GOOGLE_FONTS.filter(f => f.category === category).map((font) => (
                      <button
                        key={font.name}
                        onClick={() => onChangeFont(font.family)}
                        className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/50 hover:bg-white/10 transition-all text-left group"
                      >
                        <p 
                          className="text-2xl text-white mb-1 group-hover:text-violet-400 transition-colors"
                          style={{ fontFamily: font.family }}
                        >
                          {font.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Weights: {font.weights.join(', ')}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetLibrary;
