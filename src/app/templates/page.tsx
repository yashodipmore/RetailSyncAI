'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui';
import Link from 'next/link';
import { adTemplates, getCategories, AdTemplate } from '@/lib/templates';

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSize, setSelectedSize] = useState('all');

  const categories = [
    { id: 'all', name: 'All Templates', count: adTemplates.length },
    { id: 'promotion', name: 'Promotions', count: adTemplates.filter(t => t.category === 'promotion').length },
    { id: 'product', name: 'Products', count: adTemplates.filter(t => t.category === 'product').length },
    { id: 'clubcard', name: 'Clubcard', count: adTemplates.filter(t => t.category === 'clubcard').length },
    { id: 'seasonal', name: 'Seasonal', count: adTemplates.filter(t => t.category === 'seasonal').length },
    { id: 'awareness', name: 'Brand Awareness', count: adTemplates.filter(t => t.category === 'awareness').length },
  ];

  const sizes = [
    { value: 'all', label: 'All Sizes' },
    { value: '728x90', label: 'Leaderboard (728x90)' },
    { value: '300x250', label: 'Medium Rectangle (300x250)' },
    { value: '160x600', label: 'Skyscraper (160x600)' },
    { value: '970x250', label: 'Billboard (970x250)' },
  ];

  const filteredTemplates = adTemplates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSize = selectedSize === 'all' || `${template.width}x${template.height}` === selectedSize;
    return matchesCategory && matchesSearch && matchesSize;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'promotion': return 'from-red-500 to-orange-500';
      case 'product': return 'from-violet-500 to-purple-500';
      case 'clubcard': return 'from-blue-600 to-blue-800';
      case 'seasonal': return 'from-green-500 to-emerald-600';
      case 'awareness': return 'from-indigo-500 to-violet-600';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Ad Templates
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our library of professionally designed templates, 
              optimized for compliance and performance.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select 
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {sizes.map(size => (
                <option key={size.value} value={size.value}>{size.label}</option>
              ))}
            </select>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  cat.id === selectedCategory
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600 border border-gray-200'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} padding="none" className="group overflow-hidden">
                <div className={`aspect-[4/3] bg-gradient-to-br ${getCategoryColor(template.category)} flex items-center justify-center relative`}>
                  <div className="text-white text-center">
                    <div className="text-4xl mb-2">📐</div>
                    <p className="text-sm font-medium opacity-80">{template.width}x{template.height}</p>
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                    <Link
                      href={`/editor?template=${template.id}`}
                      className="px-6 py-2 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors transform -translate-y-2 group-hover:translate-y-0"
                    >
                      Use Template
                    </Link>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full capitalize">{template.category}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{template.width}x{template.height}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No templates found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
