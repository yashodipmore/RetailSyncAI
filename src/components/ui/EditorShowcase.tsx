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
    <section className="relative py-24 md:py-32 px-4 md:px-8 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-500/[0.07] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/[0.05] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section Header - Minimal */}
        <div className="text-center mb-20">
          <p className="font-poppins text-sm font-medium tracking-[0.2em] uppercase text-violet-600 mb-4">
            The Editor
          </p>
          <h2 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-5 leading-[1.1]">
            Beautifully crafted.
            <br />
            <span className="text-gray-400">Incredibly powerful.</span>
          </h2>
        </div>

        {/* MacBook Showcase */}
        <div className="relative mx-auto">
          {/* MacBook Container - Slight curve */}
          <div 
            className="relative mx-auto max-w-[1200px]"
            style={{
              transform: 'perspective(2000px) rotateX(2deg)',
              transformOrigin: 'center center'
            }}
          >
            {/* MacBook Shadow */}
            <div className="absolute -bottom-10 left-[8%] right-[8%] h-20 bg-black/[0.08] blur-[40px] rounded-[100%]" />
            
            {/* MacBook Device */}
            <div className="relative">
              {/* Screen Bezel */}
              <div className="relative bg-[#1d1d1f] rounded-t-[20px] p-[8px] pb-0 shadow-[0_0_0_1px_rgba(0,0,0,0.8),0_40px_80px_-20px_rgba(0,0,0,0.5)]">
                {/* Camera Notch */}
                <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0a0a0a] rounded-full flex items-center justify-center z-20">
                  <div className="w-1.5 h-1.5 bg-[#1a1a2e] rounded-full" />
                </div>
                
                {/* Screen */}
                <div className="relative bg-[#0a0a0a] rounded-t-[12px] overflow-hidden">
                  {/* Menu Bar */}
                  <div className="flex items-center justify-between px-4 py-1.5 bg-[#1d1d1f]/95 backdrop-blur-sm border-b border-white/[0.05]">
                    <div className="flex items-center gap-4">
                      {/* Apple Logo */}
                      <svg className="w-3.5 h-3.5 text-white/90" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                      <span className="font-poppins text-[11px] text-white/80 font-medium">RetailSync</span>
                      <span className="font-poppins text-[11px] text-white/60">File</span>
                      <span className="font-poppins text-[11px] text-white/60">Edit</span>
                      <span className="font-poppins text-[11px] text-white/60">View</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-sm bg-white/20" />
                        <span className="font-poppins text-[11px] text-white/60">100%</span>
                      </div>
                      <span className="font-poppins text-[11px] text-white/60">Wed 12:45</span>
                    </div>
                  </div>
                  
                  {/* Browser Window inside screen */}
                  <div className="relative m-2 bg-[#2a2a2a] rounded-lg overflow-hidden shadow-2xl">
                    {/* Browser Tab Bar */}
                    <div className="flex items-center gap-2 px-3 py-2 bg-[#3a3a3a]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                      </div>
                      <div className="flex-1 flex items-center justify-center">
                        <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-md px-3 py-1 max-w-[300px] w-full">
                          <svg className="w-3 h-3 text-gray-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          <span className="font-poppins text-[11px] text-gray-400 truncate">retailsync.ai/editor</span>
                        </div>
                      </div>
                      <div className="w-6" />
                    </div>

                    {/* Editor Content */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-[#1a1a1a]">
                      <div 
                        className={`absolute inset-0 transition-all duration-700 ease-out ${
                          isTransitioning 
                            ? 'opacity-0 scale-[1.01]' 
                            : 'opacity-100 scale-100'
                        }`}
                      >
                        <Image
                          src={editorImages[activeIndex].src}
                          alt={editorImages[activeIndex].title}
                          fill
                          className="object-contain"
                          priority
                          sizes="(max-width: 768px) 100vw, 1200px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* MacBook Bottom/Keyboard Base */}
              <div className="relative">
                {/* Hinge */}
                <div className="h-[6px] bg-gradient-to-b from-[#4a4a4c] via-[#2d2d2f] to-[#1d1d1f] rounded-b-sm mx-[2px]" />
                
                {/* Base with notch */}
                <div className="relative bg-gradient-to-b from-[#c8c8ca] to-[#a8a8aa] h-[14px] rounded-b-[10px] mx-auto shadow-[0_4px_12px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.5)]" style={{ width: '70%' }}>
                  {/* Trackpad notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80px] h-[4px] bg-gradient-to-b from-[#8a8a8c] to-[#a8a8aa] rounded-b-md" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Dots - Clean */}
        <div className="flex items-center justify-center gap-3 mt-12">
          {editorImages.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className="group relative p-1"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div 
                className={`rounded-full transition-all duration-500 ${
                  activeIndex === index
                    ? 'w-8 h-2 bg-gray-900'
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Feature Label */}
        <p className="font-poppins text-center text-sm text-gray-500 mt-6">
          {editorImages[activeIndex].title}
        </p>
      </div>
    </section>
  );
}
