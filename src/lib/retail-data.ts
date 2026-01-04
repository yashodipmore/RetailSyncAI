/**
 * RetailSync AI - Retail Data API
 * Mimics dunhumby-style POS and retail intelligence data
 * TypeScript version for Next.js
 */

export interface CategoryData {
  name: string;
  avgCTR: number;
  avgROAS: number;
  topRegions: string[];
  peakHours: string[];
  seasonality: { Q1: number; Q2: number; Q3: number; Q4: number };
  topBrands: string[];
  avgBasketSize: number;
  repeatPurchaseRate: number;
}

export interface ProductInsight {
  product: string;
  category: string;
  categoryKey: string;
  timestamp: string;
  salesPerformance: {
    weeklyGrowth: string;
    topRegion: string;
    topRegionLift: string;
    peakTime: string;
    peakDay: string;
    vsCategory: string;
    trend: string;
  };
  inventory: {
    currentStock: number;
    stockStatus: string;
    lowStockAlert: boolean;
    restockIn: string;
    turnoverRate: string;
    daysOfStock: number;
  };
  competitorData: {
    pricePosition: string;
    competitorCount: number;
    marketShare: string;
    priceIndex: string;
    topCompetitors: string[];
  };
  customerInsights: {
    avgBasketSize: string;
    repeatPurchase: string;
    crossSellOpportunity: string[];
    customerSegment: string;
    loyaltyTier: string;
  };
  predictions: {
    predictedCTR: string;
    categoryAvgCTR: string;
    predictedROAS: string;
    confidence: number;
    vsAverage: string;
  };
  recommendations: Recommendation[];
  suggestedBadges: Badge[];
}

export interface Recommendation {
  type: string;
  icon: string;
  text: string;
  impact: string;
}

export interface Badge {
  type: string;
  text: string;
  priority: string;
  color: string;
}

export interface PricingInsight {
  yourPrice: number;
  marketLow: number;
  marketMid: number;
  marketHigh: number;
  position: string;
  recommendation: string;
  suggestedBadge: string;
  savingsMessage: string | null;
}

export interface TrendingProduct {
  name: string;
  growth: string;
}

export interface PromotionAlert {
  type: string;
  title: string;
  suggestion: string;
  endDate: string;
}

// Product Categories with realistic market data
const categories: Record<string, CategoryData> = {
  'food': {
    name: 'Food & Snacks',
    avgCTR: 1.4,
    avgROAS: 3.8,
    topRegions: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow'],
    peakHours: ['11:00-13:00', '19:00-21:00'],
    seasonality: { Q1: 0.9, Q2: 1.0, Q3: 1.1, Q4: 1.3 },
    topBrands: ['Tesco Finest', 'McVities', 'Walkers', 'Cadbury', 'Kelloggs'],
    avgBasketSize: 45,
    repeatPurchaseRate: 0.68
  },
  'beverage': {
    name: 'Beverages',
    avgCTR: 1.6,
    avgROAS: 4.2,
    topRegions: ['London', 'Bristol', 'Edinburgh', 'Manchester', 'Cardiff'],
    peakHours: ['14:00-17:00', '20:00-22:00'],
    seasonality: { Q1: 1.2, Q2: 1.4, Q3: 1.1, Q4: 1.0 },
    topBrands: ['Coca-Cola', 'Tesco Own', 'Innocent', 'Costa', 'Red Bull'],
    avgBasketSize: 32,
    repeatPurchaseRate: 0.72
  },
  'personal_care': {
    name: 'Personal Care',
    avgCTR: 1.2,
    avgROAS: 3.5,
    topRegions: ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Brighton'],
    peakHours: ['10:00-12:00', '18:00-20:00'],
    seasonality: { Q1: 1.0, Q2: 1.0, Q3: 1.0, Q4: 1.5 },
    topBrands: ['Dove', 'Nivea', 'LOreal', 'Tesco', 'Simple'],
    avgBasketSize: 28,
    repeatPurchaseRate: 0.58
  },
  'household': {
    name: 'Household & Cleaning',
    avgCTR: 0.9,
    avgROAS: 3.2,
    topRegions: ['London', 'Birmingham', 'Leeds', 'Sheffield', 'Bristol'],
    peakHours: ['09:00-11:00', '16:00-18:00'],
    seasonality: { Q1: 1.1, Q2: 1.0, Q3: 0.9, Q4: 1.2 },
    topBrands: ['Fairy', 'Flash', 'Dettol', 'Persil', 'Tesco'],
    avgBasketSize: 35,
    repeatPurchaseRate: 0.75
  },
  'fresh': {
    name: 'Fresh & Produce',
    avgCTR: 1.8,
    avgROAS: 5.2,
    topRegions: ['London', 'Cambridge', 'Oxford', 'Bristol', 'Edinburgh'],
    peakHours: ['10:00-12:00', '17:00-19:00'],
    seasonality: { Q1: 0.9, Q2: 1.2, Q3: 1.3, Q4: 1.0 },
    topBrands: ['Tesco Finest', 'Organic', 'Local', 'Seasonal', 'Premium'],
    avgBasketSize: 42,
    repeatPurchaseRate: 0.82
  },
  'frozen': {
    name: 'Frozen Foods',
    avgCTR: 1.3,
    avgROAS: 3.8,
    topRegions: ['Manchester', 'Leeds', 'Newcastle', 'Glasgow', 'Liverpool'],
    peakHours: ['12:00-14:00', '18:00-20:00'],
    seasonality: { Q1: 1.1, Q2: 0.9, Q3: 0.8, Q4: 1.3 },
    topBrands: ['Birds Eye', 'McCain', 'Tesco', 'Iceland', 'Aunt Bessies'],
    avgBasketSize: 38,
    repeatPurchaseRate: 0.65
  },
  'dairy': {
    name: 'Dairy & Eggs',
    avgCTR: 1.5,
    avgROAS: 4.0,
    topRegions: ['London', 'Bristol', 'Manchester', 'Leeds', 'Edinburgh'],
    peakHours: ['08:00-10:00', '17:00-19:00'],
    seasonality: { Q1: 1.0, Q2: 1.0, Q3: 1.0, Q4: 1.1 },
    topBrands: ['Tesco', 'Arla', 'Cathedral City', 'Lurpak', 'Yeo Valley'],
    avgBasketSize: 25,
    repeatPurchaseRate: 0.85
  }
};

// Competitor pricing database
const competitorPricing: Record<string, { low: number; mid: number; high: number }> = {
  'Premium Product': { low: 4.49, mid: 5.49, high: 6.99 },
  'Organic Snacks': { low: 1.99, mid: 2.99, high: 3.99 },
  'Energy Drink': { low: 1.29, mid: 1.79, high: 2.49 },
  'Shampoo': { low: 2.49, mid: 3.99, high: 5.99 },
  'Floor Cleaner': { low: 1.79, mid: 2.49, high: 3.49 },
  'default': { low: 1.99, mid: 3.49, high: 5.49 }
};

// Store-level data
const storeData = {
  zones: ['North', 'South', 'East', 'West', 'Central'],
  formats: ['Extra', 'Superstore', 'Metro', 'Express', 'Online'],
  footfallTrends: {
    weekday: { morning: 0.6, afternoon: 0.8, evening: 1.2, night: 0.7 },
    weekend: { morning: 0.9, afternoon: 1.4, evening: 1.5, night: 0.8 }
  }
};

export const RetailDataAPI = {
  categories,
  competitorPricing,
  storeData,

  /**
   * Get product insights
   */
  getProductInsights(productName: string, category: string | null = null): ProductInsight {
    if (!category) {
      category = this.detectCategory(productName);
    }
    
    const cat = categories[category] || categories['food'];
    const region = cat.topRegions[Math.floor(Math.random() * 3)];
    const salesLift = (15 + Math.random() * 25).toFixed(1);
    const inventoryUnits = Math.floor(50 + Math.random() * 200);
    const competitorCount = Math.floor(3 + Math.random() * 5);
    
    const currentHour = new Date().getHours();
    const isWeekend = [0, 6].includes(new Date().getDay());
    const timeSlot = currentHour < 12 ? 'morning' : currentHour < 17 ? 'afternoon' : currentHour < 21 ? 'evening' : 'night';
    const footfallMultiplier = storeData.footfallTrends[isWeekend ? 'weekend' : 'weekday'][timeSlot as keyof typeof storeData.footfallTrends.weekday];

    const baseCTR = cat.avgCTR;
    const adjustedCTR = (baseCTR * footfallMultiplier * (0.9 + Math.random() * 0.3)).toFixed(2);
    const predictedROAS = (cat.avgROAS * (0.85 + Math.random() * 0.4)).toFixed(2);
    
    return {
      product: productName,
      category: cat.name,
      categoryKey: category,
      timestamp: new Date().toISOString(),
      
      salesPerformance: {
        weeklyGrowth: `+${salesLift}%`,
        topRegion: region,
        topRegionLift: `+${(parseInt(salesLift) + 5 + Math.random() * 10).toFixed(0)}%`,
        peakTime: cat.peakHours[0],
        peakDay: isWeekend ? 'Weekend' : 'Weekday',
        vsCategory: `${Math.random() > 0.5 ? '+' : ''}${(Math.random() * 20 - 5).toFixed(1)}%`,
        trend: Math.random() > 0.3 ? 'rising' : 'stable'
      },

      inventory: {
        currentStock: inventoryUnits,
        stockStatus: inventoryUnits < 50 ? 'critical' : inventoryUnits < 100 ? 'low' : 'healthy',
        lowStockAlert: inventoryUnits < 75,
        restockIn: inventoryUnits < 75 ? `${Math.floor(1 + Math.random() * 3)} days` : 'N/A',
        turnoverRate: (2 + Math.random() * 3).toFixed(1),
        daysOfStock: Math.floor(inventoryUnits / (5 + Math.random() * 10))
      },

      competitorData: {
        pricePosition: Math.random() > 0.5 ? 'Below Market' : 'At Market',
        competitorCount: competitorCount,
        marketShare: `${(8 + Math.random() * 12).toFixed(1)}%`,
        priceIndex: (95 + Math.random() * 15).toFixed(0),
        topCompetitors: cat.topBrands.slice(0, 3)
      },

      customerInsights: {
        avgBasketSize: `£${cat.avgBasketSize}`,
        repeatPurchase: `${(cat.repeatPurchaseRate * 100).toFixed(0)}%`,
        crossSellOpportunity: this.getCrossSellProducts(category),
        customerSegment: this.getCustomerSegment(),
        loyaltyTier: Math.random() > 0.6 ? 'Clubcard Plus' : 'Clubcard'
      },

      predictions: {
        predictedCTR: adjustedCTR,
        categoryAvgCTR: baseCTR.toFixed(2),
        predictedROAS: predictedROAS,
        confidence: Math.floor(75 + Math.random() * 20),
        vsAverage: ((parseFloat(adjustedCTR) - baseCTR) / baseCTR * 100).toFixed(0)
      },

      recommendations: this.generateRecommendations(category, cat, inventoryUnits, adjustedCTR),
      suggestedBadges: this.getSuggestedBadges(inventoryUnits, salesLift)
    };
  },

  /**
   * Auto-detect product category
   */
  detectCategory(productName: string): string {
    const name = productName.toLowerCase();
    
    if (/drink|juice|water|coffee|tea|cola|energy|milk/.test(name)) return 'beverage';
    if (/snack|food|biscuit|chips|chocolate|sweet|crisp/.test(name)) return 'food';
    if (/shampoo|soap|cream|lotion|beauty|skin|hair/.test(name)) return 'personal_care';
    if (/clean|wash|detergent|floor|toilet|kitchen/.test(name)) return 'household';
    if (/fresh|fruit|vegetable|salad|produce/.test(name)) return 'fresh';
    if (/frozen|ice|pizza|chips/.test(name)) return 'frozen';
    if (/dairy|cheese|yogurt|butter|egg/.test(name)) return 'dairy';
    
    return 'food';
  },

  /**
   * Generate AI recommendations
   */
  generateRecommendations(category: string, catData: CategoryData, inventory: number, ctr: string): Recommendation[] {
    const recommendations: Recommendation[] = [];
    
    recommendations.push({
      type: 'targeting',
      icon: '🎯',
      text: `Target ${catData.topRegions[0]} region for ${(15 + Math.random() * 10).toFixed(0)}% higher engagement`,
      impact: '+15-25% CTR'
    });
    
    recommendations.push({
      type: 'scheduling',
      icon: '⏰',
      text: `Schedule ads during ${catData.peakHours[0]} for peak visibility`,
      impact: '+12% reach'
    });
    
    if (inventory < 100) {
      recommendations.push({
        type: 'urgency',
        icon: '🔥',
        text: `Add "Limited Stock" badge - only ${inventory} units left`,
        impact: '+23% conversion'
      });
    }
    
    if (parseFloat(ctr) < catData.avgCTR) {
      recommendations.push({
        type: 'creative',
        icon: '🎨',
        text: 'Add Clubcard Price badge to improve engagement',
        impact: '+18% CTR'
      });
    }
    
    const categoryRecs: Record<string, { icon: string; text: string; impact: string }> = {
      'food': { icon: '🍽️', text: 'Use "Bestseller" badge for social proof', impact: '+20% conversion' },
      'beverage': { icon: '❄️', text: 'Highlight "Refreshing" for summer months', impact: '+15% engagement' },
      'personal_care': { icon: '✨', text: 'Add "Natural Ingredients" callout', impact: '+22% trust' },
      'household': { icon: '🏠', text: 'Show "Family Size" value proposition', impact: '+18% cart size' },
      'fresh': { icon: '🥬', text: 'Display "Fresh Today" quality badge', impact: '+25% premium perception' },
      'frozen': { icon: '❄️', text: 'Add "Quick & Easy" convenience badge', impact: '+20% conversion' },
      'dairy': { icon: '🥛', text: 'Show "Farm Fresh" trust indicators', impact: '+22% conversion' }
    };
    
    if (categoryRecs[category]) {
      recommendations.push({
        type: 'category',
        ...categoryRecs[category]
      });
    }
    
    return recommendations.slice(0, 5);
  },

  /**
   * Get suggested badges
   */
  getSuggestedBadges(inventory: number, salesLift: string): Badge[] {
    const badges: Badge[] = [];
    
    if (inventory < 50) {
      badges.push({
        type: 'scarcity',
        text: `Only ${inventory} Left!`,
        priority: 'high',
        color: '#ef4444'
      });
    } else if (inventory < 100) {
      badges.push({
        type: 'scarcity',
        text: 'Selling Fast!',
        priority: 'medium',
        color: '#f97316'
      });
    }
    
    if (parseFloat(salesLift) > 20) {
      badges.push({
        type: 'social',
        text: 'Trending Now 📈',
        priority: 'high',
        color: '#22c55e'
      });
    }
    
    badges.push({
      type: 'clubcard',
      text: 'Clubcard Price',
      priority: 'high',
      color: '#00539f'
    });
    
    badges.push({
      type: 'value',
      text: 'Great Value',
      priority: 'medium',
      color: '#3b82f6'
    });
    
    return badges;
  },

  /**
   * Get cross-sell products
   */
  getCrossSellProducts(category: string): string[] {
    const crossSell: Record<string, string[]> = {
      'food': ['Beverages', 'Snacks', 'Condiments'],
      'beverage': ['Snacks', 'Ice', 'Mixers'],
      'personal_care': ['Cosmetics', 'Accessories', 'Fragrances'],
      'household': ['Storage', 'Tools', 'Organizers'],
      'fresh': ['Dairy', 'Bakery', 'Deli'],
      'frozen': ['Ice Cream', 'Ready Meals', 'Vegetables'],
      'dairy': ['Bread', 'Eggs', 'Spreads']
    };
    return crossSell[category] || crossSell['food'];
  },

  /**
   * Get customer segment
   */
  getCustomerSegment(): string {
    const segments = [
      'Value Seekers',
      'Premium Buyers',
      'Health Conscious',
      'Convenience Shoppers',
      'Clubcard Loyalists',
      'Deal Hunters'
    ];
    return segments[Math.floor(Math.random() * segments.length)];
  },

  /**
   * Get pricing insights
   */
  getPricingInsights(productName: string, basePrice: number): PricingInsight {
    const pricing = competitorPricing[productName] || competitorPricing['default'];
    
    const position = basePrice <= pricing.low ? 'lowest' : 
                    basePrice <= pricing.mid ? 'competitive' : 'premium';
    
    return {
      yourPrice: basePrice,
      marketLow: pricing.low,
      marketMid: pricing.mid,
      marketHigh: pricing.high,
      position: position,
      recommendation: position === 'lowest' ? 
        'Highlight "Best Price" badge' : 
        position === 'competitive' ?
        'Emphasize Clubcard value' :
        'Focus on Tesco Finest quality',
      suggestedBadge: position === 'lowest' ? 
        '💰 Lowest Price' : 
        position === 'competitive' ?
        '⭐ Clubcard Price' :
        '👑 Tesco Finest',
      savingsMessage: basePrice > pricing.low ? 
        `Compare at £${pricing.high}` : null
    };
  },

  /**
   * Get trending products
   */
  getTrendingProducts(category: string): TrendingProduct[] {
    const trends: Record<string, TrendingProduct[]> = {
      'food': [
        { name: 'Protein Snacks', growth: '+45%' },
        { name: 'Plant-Based Options', growth: '+38%' },
        { name: 'Ready Meals', growth: '+32%' }
      ],
      'beverage': [
        { name: 'Cold Brew Coffee', growth: '+52%' },
        { name: 'Flavored Water', growth: '+41%' },
        { name: 'Energy Drinks', growth: '+28%' }
      ],
      'personal_care': [
        { name: 'Natural Skincare', growth: '+48%' },
        { name: 'Men Grooming', growth: '+35%' },
        { name: 'Organic Products', growth: '+29%' }
      ],
      'household': [
        { name: 'Eco Cleaners', growth: '+55%' },
        { name: 'Refill Products', growth: '+42%' },
        { name: 'Storage Solutions', growth: '+25%' }
      ],
      'fresh': [
        { name: 'Organic Produce', growth: '+48%' },
        { name: 'Ready Salads', growth: '+35%' },
        { name: 'Meal Kits', growth: '+42%' }
      ],
      'frozen': [
        { name: 'Plant-Based', growth: '+62%' },
        { name: 'Premium Desserts', growth: '+35%' },
        { name: 'World Cuisines', growth: '+28%' }
      ],
      'dairy': [
        { name: 'Oat Milk', growth: '+58%' },
        { name: 'Greek Yogurt', growth: '+32%' },
        { name: 'Premium Cheese', growth: '+25%' }
      ]
    };
    return trends[category] || trends['food'];
  },

  /**
   * Get promotion alerts
   */
  getPromotionAlerts(category: string): PromotionAlert[] {
    const currentMonth = new Date().getMonth();
    const alerts: PromotionAlert[] = [];
    
    if (currentMonth === 0) {
      alerts.push({
        type: 'seasonal',
        title: 'New Year Sale Active',
        suggestion: 'Add "New Year Special" badge',
        endDate: 'Jan 15'
      });
    } else if (currentMonth === 11) {
      alerts.push({
        type: 'festival',
        title: 'Christmas Season',
        suggestion: 'Add "Christmas Offer" badge',
        endDate: 'Dec 26'
      });
    }
    
    if ([5, 6, 0].includes(new Date().getDay())) {
      alerts.push({
        type: 'weekend',
        title: 'Weekend Shopping Peak',
        suggestion: 'Use "Weekend Special" messaging',
        endDate: 'Sunday'
      });
    }
    
    // Clubcard promotion
    alerts.push({
      type: 'loyalty',
      title: 'Clubcard Prices Active',
      suggestion: 'Highlight Clubcard savings',
      endDate: 'Ongoing'
    });
    
    return alerts;
  },

  /**
   * Get campaign benchmarks
   */
  getCampaignBenchmarks(category: string) {
    const cat = categories[category] || categories['food'];
    
    return {
      category: cat.name,
      benchmarks: {
        ctr: {
          poor: cat.avgCTR * 0.5,
          average: cat.avgCTR,
          good: cat.avgCTR * 1.3,
          excellent: cat.avgCTR * 1.8
        },
        roas: {
          poor: cat.avgROAS * 0.6,
          average: cat.avgROAS,
          good: cat.avgROAS * 1.2,
          excellent: cat.avgROAS * 1.5
        },
        conversionRate: {
          poor: 0.5,
          average: 1.2,
          good: 2.0,
          excellent: 3.5
        }
      },
      topPerformers: {
        headline: 'Clubcard Price',
        cta: 'Shop Now',
        badgeType: 'clubcard',
        colorScheme: 'tesco-blue'
      }
    };
  }
};

export default RetailDataAPI;
