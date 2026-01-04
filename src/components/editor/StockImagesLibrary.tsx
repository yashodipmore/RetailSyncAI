'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Search, X, Download, Image, Loader2, Camera, Sparkles, TrendingUp, Grid3X3 } from 'lucide-react';

// Pexels API Configuration
const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY || '';

interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  alt: string;
}

interface PexelsResponse {
  total_results: number;
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  next_page?: string;
}

// Popular search categories for retail/ads
const POPULAR_CATEGORIES = [
  { id: 'food', label: 'Food & Drinks', icon: '🍕', query: 'food photography' },
  { id: 'grocery', label: 'Grocery', icon: '🛒', query: 'fresh vegetables fruits' },
  { id: 'fashion', label: 'Fashion', icon: '👗', query: 'fashion clothing' },
  { id: 'tech', label: 'Technology', icon: '📱', query: 'technology gadgets' },
  { id: 'beauty', label: 'Beauty', icon: '💄', query: 'beauty cosmetics' },
  { id: 'fitness', label: 'Fitness', icon: '💪', query: 'fitness workout' },
  { id: 'home', label: 'Home & Living', icon: '🏠', query: 'home interior' },
  { id: 'nature', label: 'Nature', icon: '🌿', query: 'nature landscape' },
  { id: 'business', label: 'Business', icon: '💼', query: 'business office' },
  { id: 'celebration', label: 'Celebration', icon: '🎉', query: 'celebration party' },
  { id: 'sale', label: 'Sale & Offers', icon: '🏷️', query: 'shopping bags sale' },
  { id: 'backgrounds', label: 'Backgrounds', icon: '🎨', query: 'abstract gradient background' },
];

// Brand Logos (SVG representations)
const BRAND_LOGOS = {
  social: [
    { id: 'fb', name: 'Facebook', svg: `<svg viewBox="0 0 24 24" fill="#1877f2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>` },
    { id: 'ig', name: 'Instagram', svg: `<svg viewBox="0 0 24 24" fill="#e4405f"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>` },
    { id: 'tw', name: 'Twitter/X', svg: `<svg viewBox="0 0 24 24" fill="#000000"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>` },
    { id: 'yt', name: 'YouTube', svg: `<svg viewBox="0 0 24 24" fill="#ff0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>` },
    { id: 'li', name: 'LinkedIn', svg: `<svg viewBox="0 0 24 24" fill="#0a66c2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>` },
    { id: 'wa', name: 'WhatsApp', svg: `<svg viewBox="0 0 24 24" fill="#25d366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>` },
    { id: 'tiktok', name: 'TikTok', svg: `<svg viewBox="0 0 24 24" fill="#000000"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>` },
  ],
  payment: [
    { id: 'visa', name: 'Visa', svg: `<svg viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="8" fill="#1434CB"/><text x="24" y="30" text-anchor="middle" fill="white" font-size="12" font-weight="bold" font-style="italic">VISA</text></svg>` },
    { id: 'mc', name: 'Mastercard', svg: `<svg viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="8" fill="#1f2937"/><circle cx="18" cy="24" r="10" fill="#eb001b"/><circle cx="30" cy="24" r="10" fill="#f79e1b"/></svg>` },
    { id: 'gpay', name: 'Google Pay', svg: `<svg viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="8" fill="white" stroke="#e5e7eb"/><text x="24" y="30" text-anchor="middle" fill="#1f2937" font-size="10" font-weight="bold">GPay</text></svg>` },
    { id: 'ppay', name: 'PhonePe', svg: `<svg viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="8" fill="#5f259f"/><text x="24" y="30" text-anchor="middle" fill="white" font-size="8" font-weight="bold">PhonePe</text></svg>` },
    { id: 'upi', name: 'UPI', svg: `<svg viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="8" fill="#097969"/><text x="24" y="30" text-anchor="middle" fill="white" font-size="12" font-weight="bold">UPI</text></svg>` },
    { id: 'paytm', name: 'Paytm', svg: `<svg viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="8" fill="#00baf2"/><text x="24" y="30" text-anchor="middle" fill="white" font-size="8" font-weight="bold">Paytm</text></svg>` },
  ],
  retail: [
    { id: 'tesco', name: 'Tesco', svg: `<svg viewBox="0 0 100 40"><rect width="100" height="40" rx="4" fill="#00539f"/><text x="50" y="28" text-anchor="middle" fill="white" font-size="18" font-weight="bold">TESCO</text></svg>` },
    { id: 'amazon', name: 'Amazon', svg: `<svg viewBox="0 0 100 40"><rect width="100" height="40" rx="4" fill="#ff9900"/><text x="50" y="28" text-anchor="middle" fill="#1f2937" font-size="14" font-weight="bold">amazon</text></svg>` },
    { id: 'flipkart', name: 'Flipkart', svg: `<svg viewBox="0 0 100 40"><rect width="100" height="40" rx="4" fill="#2874f0"/><text x="50" y="28" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Flipkart</text></svg>` },
    { id: 'bigbasket', name: 'BigBasket', svg: `<svg viewBox="0 0 100 40"><rect width="100" height="40" rx="4" fill="#84c225"/><text x="50" y="28" text-anchor="middle" fill="white" font-size="10" font-weight="bold">BigBasket</text></svg>` },
    { id: 'swiggy', name: 'Swiggy', svg: `<svg viewBox="0 0 100 40"><rect width="100" height="40" rx="4" fill="#fc8019"/><text x="50" y="28" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Swiggy</text></svg>` },
    { id: 'zomato', name: 'Zomato', svg: `<svg viewBox="0 0 100 40"><rect width="100" height="40" rx="4" fill="#e23744"/><text x="50" y="28" text-anchor="middle" fill="white" font-size="12" font-weight="bold">zomato</text></svg>` },
  ],
};

interface StockImagesLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (url: string) => void;
  onSetBackground: (url: string) => void;
  onAddLogo: (svg: string) => void;
}

const StockImagesLibrary: React.FC<StockImagesLibraryProps> = ({
  isOpen,
  onClose,
  onSelectImage,
  onSetBackground,
  onAddLogo,
}) => {
  const [activeTab, setActiveTab] = useState<'images' | 'logos'>('images');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('food');
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Search Pexels API
  const searchPexels = useCallback(async (query: string, pageNum: number = 1, append: boolean = false) => {
    if (!PEXELS_API_KEY) {
      setError('Pexels API key not configured');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=20&page=${pageNum}`,
        {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }

      const data: PexelsResponse = await response.json();
      
      if (append) {
        setPhotos(prev => [...prev, ...data.photos]);
      } else {
        setPhotos(data.photos);
      }
      setTotalResults(data.total_results);
      setPage(pageNum);
    } catch (err) {
      setError('Failed to load images. Please try again.');
      console.error('Pexels API error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get curated photos (trending)
  const getCuratedPhotos = useCallback(async () => {
    if (!PEXELS_API_KEY) {
      setError('Pexels API key not configured');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.pexels.com/v1/curated?per_page=20&page=1`,
        {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }

      const data: PexelsResponse = await response.json();
      setPhotos(data.photos);
      setTotalResults(data.total_results);
    } catch (err) {
      setError('Failed to load images. Please try again.');
      console.error('Pexels API error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load initial photos on mount
  useEffect(() => {
    if (isOpen && photos.length === 0) {
      const category = POPULAR_CATEGORIES.find(c => c.id === selectedCategory);
      if (category) {
        searchPexels(category.query);
      }
    }
  }, [isOpen, selectedCategory, searchPexels, photos.length]);

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const category = POPULAR_CATEGORIES.find(c => c.id === categoryId);
    if (category) {
      searchPexels(category.query);
    }
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchPexels(searchQuery);
    }
  };

  // Load more photos
  const loadMore = () => {
    const query = searchQuery || POPULAR_CATEGORIES.find(c => c.id === selectedCategory)?.query || 'popular';
    searchPexels(query, page + 1, true);
  };

  // Handle image selection
  const handleImageClick = (photo: PexelsPhoto, asBackground: boolean = false) => {
    setLoadingImage(photo.src.large);
    if (asBackground) {
      onSetBackground(photo.src.large2x);
    } else {
      onSelectImage(photo.src.large);
    }
    setTimeout(() => setLoadingImage(null), 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#0f0f1a] rounded-xl border border-white/10 w-full max-w-6xl h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Stock Images & Logos</h2>
              <p className="text-xs text-gray-500">Powered by Pexels - Free HD Images</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-md transition-colors">
            <X className="w-5 h-5 text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 bg-black/20 px-4">
          <button
            onClick={() => setActiveTab('images')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all border-b-2 -mb-px ${
              activeTab === 'images'
                ? 'text-emerald-400 border-emerald-500'
                : 'text-gray-500 border-transparent hover:text-white'
            }`}
          >
            <Image className="w-4 h-4" />
            Stock Images
            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">Live API</span>
          </button>
          <button
            onClick={() => setActiveTab('logos')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all border-b-2 -mb-px ${
              activeTab === 'logos'
                ? 'text-emerald-400 border-emerald-500'
                : 'text-gray-500 border-transparent hover:text-white'
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
            Brand Logos
          </button>
        </div>

        {activeTab === 'images' && (
          <>
            {/* Search & Categories */}
            <div className="p-4 border-b border-white/5">
              <form onSubmit={handleSearch} className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search millions of free images..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </form>
              
              {/* Categories */}
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-thin">
                {POPULAR_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Info */}
            {totalResults > 0 && (
              <div className="px-4 py-2 bg-black/20 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-gray-400">
                  Found <span className="text-white font-medium">{totalResults.toLocaleString()}</span> images
                </span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mx-4 mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Images Grid */}
            <div className="flex-1 overflow-y-auto p-4">
              {loading && photos.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                  <Loader2 className="w-10 h-10 text-emerald-400 animate-spin" />
                  <p className="text-gray-500">Loading images from Pexels...</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-4 gap-4">
                    {photos.map((photo) => (
                      <div
                        key={photo.id}
                        className="group relative rounded-lg overflow-hidden border border-white/10 hover:border-emerald-500/40 transition-colors cursor-pointer"
                        style={{ backgroundColor: photo.avg_color }}
                      >
                        <div className="aspect-video relative">
                          <img
                            src={photo.src.medium}
                            alt={photo.alt || 'Stock photo'}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          {loadingImage === photo.src.large && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
                            </div>
                          )}
                        </div>
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                          <p className="text-white text-xs font-medium mb-1 truncate">{photo.alt || 'Photo'}</p>
                          <p className="text-gray-400 text-xs mb-3">by {photo.photographer}</p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleImageClick(photo, false)}
                              className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium rounded-md transition-colors flex items-center justify-center gap-1"
                            >
                              <Download className="w-3 h-3" />
                              Add to Canvas
                            </button>
                            <button
                              onClick={() => handleImageClick(photo, true)}
                              className="px-3 py-2 bg-white/20 hover:bg-white/30 text-white text-xs font-medium rounded-md transition-colors"
                              title="Set as Background"
                            >
                              BG
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Load More */}
                  {photos.length > 0 && photos.length < totalResults && (
                    <div className="flex justify-center mt-6">
                      <button
                        onClick={loadMore}
                        disabled={loading}
                        className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            Load More Images
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}

        {activeTab === 'logos' && (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-8">
              {Object.entries(BRAND_LOGOS).map(([category, logos]) => (
                <div key={category}>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    {category} Logos
                  </h3>
                  <div className="grid grid-cols-6 gap-4">
                    {logos.map((logo) => (
                      <button
                        key={logo.id}
                        onClick={() => onAddLogo(logo.svg)}
                        className="aspect-square rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-white/10 transition-all p-4 flex flex-col items-center justify-center gap-2 group"
                      >
                        <div 
                          className="w-12 h-12 group-hover:scale-110 transition-transform"
                          dangerouslySetInnerHTML={{ __html: logo.svg }}
                        />
                        <span className="text-xs text-gray-500 group-hover:text-white transition-colors">{logo.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-black/20">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500 flex items-center gap-2">
              <Camera className="w-4 h-4 text-emerald-400" />
              Images by <a href="https://www.pexels.com" target="_blank" rel="noopener" className="text-emerald-400 hover:underline">Pexels</a> - Free for commercial use
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockImagesLibrary;
