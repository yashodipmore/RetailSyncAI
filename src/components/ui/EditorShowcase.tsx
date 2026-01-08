'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const editorImages = [
  {
    src: '/assets/editor-1.png',
    title: 'AI-Powered Canvas Editor',
    description: 'Design stunning retail ads with our intuitive drag-and-drop interface'
  },
  {
    src: '/assets/editor-2.png',
    title: 'Smart Templates Library',
    description: 'Choose from 100+ pre-designed templates optimized for conversions'
  },
  {
    src: '/assets/editor-3.png',
    title: 'Real-time Compliance Check',
    description: 'Instant brand guideline validation ensures your ads are always compliant'
  },
  {
    src: '/assets/editor-4.png',
    title: 'AI Copilot Assistant',
    description: 'Let AI suggest improvements, generate copy, and enhance your designs'
  },
  {
    src: '/assets/editor-5.png',
    title: 'One-Click Export',
    description: 'Export in multiple formats ready for any retail media platform'
  }
];

export default function EditorShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % editorImages.length);
        setIsTransitioning(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    if (index === activeIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <section className="relative py-16 px-2 md:px-4 bg-gradient-to-b from-white via-gray-50/50 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-violet-200/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-orange-200/40 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="font-poppins text-sm font-semibold tracking-widest uppercase bg-gradient-to-r from-[#00539F] via-violet-600 to-orange-500 bg-clip-text text-transparent mb-3">
            Powerful Editor
          </p>
          <h2 className="font-poppins text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Experience the Future of
            <span className="bg-gradient-to-r from-[#00539F] via-violet-600 to-orange-500 bg-clip-text text-transparent ml-2">
              Ad Creation
            </span>
          </h2>
          <p className="font-poppins text-base md:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
            AI-powered editor to create professional ads in minutes.
          </p>
        </div>

        {/* Main Showcase Container */}
        <div className="relative">
          {/* Browser Window Frame */}
          <div className="relative mx-auto w-full">
            {/* Subtle Shadow Glow - Bottom */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[85%] h-20 bg-gradient-to-r from-[#00539F] via-violet-500 to-violet-600 rounded-full blur-3xl opacity-40" />
            
            {/* Browser Chrome - White Glow Border */}
            <div className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-[2rem] p-3 md:p-4 shadow-[0_0_30px_rgba(255,255,255,0.15)] border-[3px] border-white/20">
              {/* Title Bar */}
              <div className="flex items-center justify-between px-3 py-2 mb-2 bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 mx-6">
                  <div className="bg-gray-700/50 rounded-md py-1.5 px-3 flex items-center justify-center gap-2 max-w-xs mx-auto">
                    <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="font-poppins text-xs text-gray-400">retailsync.ai/editor</span>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-orange-500 flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold font-poppins">RS</span>
                </div>
              </div>

              {/* Image Container */}
              <div className="relative aspect-[19.5/9] rounded-lg overflow-hidden bg-gray-900">
                {/* Image with smooth transition */}
                <div 
                  className={`absolute inset-0 transition-all duration-500 ease-out ${
                    isTransitioning 
                      ? 'opacity-0 scale-[1.02]' 
                      : 'opacity-100 scale-100'
                  }`}
                >
                  <Image
                    src={editorImages[activeIndex].src}
                    alt={editorImages[activeIndex].title}
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 768px) 100vw, 900px"
                  />
                </div>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent pointer-events-none" />

                {/* Current Feature Info - Compact */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="bg-black/60 backdrop-blur-md rounded-lg px-3 py-2 border border-white/10">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-poppins text-sm font-semibold text-white truncate">
                          {editorImages[activeIndex].title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1.5 bg-white/20 rounded-md px-2 py-1 shrink-0">
                        <span className="font-poppins text-[10px] font-medium text-white">
                          {activeIndex + 1}/{editorImages.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {editorImages.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className="group relative transition-all duration-300"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? 'bg-gradient-to-r from-[#00539F] via-violet-600 to-orange-500 w-8'
                      : 'bg-gray-300 hover:bg-gray-400 w-2'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {['AI Copilot', 'Brand Compliance', 'Smart Templates', '15+ Export Formats', 'Real-time Preview'].map((feature, index) => (
            <div
              key={index}
              className="font-poppins text-xs font-medium px-3 py-1.5 bg-white rounded-full border border-gray-200 text-gray-700 shadow-sm hover:shadow-md hover:border-violet-300 hover:text-violet-600 transition-all duration-200 cursor-default"
            >
              {feature}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
