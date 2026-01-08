import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import ScrollReveal from '@/components/ui/ScrollReveal';
import TeamMemberCard from '@/components/ui/TeamMemberCard';
import EditorShowcase from '@/components/ui/EditorShowcase';

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-white relative overflow-hidden">
        {/* Subtle orange and violet tints in background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/70 via-white to-violet-50/60 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-gradient-to-bl from-violet-100/50 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-gradient-to-tr from-orange-100/40 to-transparent pointer-events-none" />
        
        {/* Professional Grid Lines */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #e5e5e5 1px, transparent 1px),
              linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Hero Section */}
        <section className="relative pt-36 md:pt-44 lg:pt-52 pb-8 px-6">
          <div className="max-w-[1100px] mx-auto">
            {/* Center Content */}
            <div className="text-center relative z-10">
              {/* Main Headline with Glassy Shine Animation */}
              <ScrollReveal delay={80} duration={800} distance={25}>
                <h1 className="relative font-poppins text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-semibold leading-[1.05] tracking-[-0.03em] text-gray-900 mb-8 overflow-hidden inline-block">
                  {/* Glassy shimmer sweep */}
                  <span 
                    className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
                    aria-hidden="true"
                  >
                    <span 
                      className="absolute inset-0 w-[50%] bg-gradient-to-r from-transparent via-white/60 to-transparent"
                      style={{
                        animation: 'glassyShine 4s ease-in-out infinite',
                        animationDelay: '1s'
                      }}
                    />
                  </span>
                  <span className="block">Build retail ads</span>
                  <span className="block bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                    that actually convert
                  </span>
                </h1>
              </ScrollReveal>

              {/* Subtitle - Two lines with emphasis */}
              <ScrollReveal delay={160} duration={800} distance={20}>
                <p className="font-poppins text-lg md:text-xl lg:text-[1.35rem] text-gray-500 leading-[1.7] max-w-[580px] mx-auto mb-10 font-normal tracking-[-0.01em]">
                  <span className="text-gray-600">Design stunning retail ads in minutes.</span>
                  <br className="hidden sm:block" />
                  <span className="text-gray-400">AI-powered. Brand-compliant. No design skills needed.</span>
                </p>
              </ScrollReveal>

              {/* CTA Group - Refined */}
              <ScrollReveal delay={240} duration={800} distance={15}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
                  <Link
                    href="/editor"
                    className="group relative inline-flex items-center justify-center h-12 px-8 bg-gray-900 text-white font-poppins font-medium text-[15px] rounded-full hover:bg-black transition-all duration-300 shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.12)] hover:shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_4px_8px_rgba(0,0,0,0.08),0_16px_32px_rgba(0,0,0,0.16)] hover:-translate-y-0.5"
                  >
                    Start Creating — it&apos;s free
                    <svg className="w-4 h-4 ml-2.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="group inline-flex items-center justify-center h-12 px-6 text-gray-600 font-poppins font-medium text-[15px] rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.04)]"
                  >
                    <svg className="w-4 h-4 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    Watch Demo
                  </Link>
                </div>
              </ScrollReveal>

              {/* Keyboard shortcut hint */}
              <ScrollReveal delay={300} duration={800} distance={10}>
                <p className="font-poppins text-xs text-gray-400 mb-14">
                  Press <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded text-[11px] font-medium text-gray-500 mx-0.5">⌘</kbd> + <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded text-[11px] font-medium text-gray-500 mx-0.5">K</kbd> to quick start
                </p>
              </ScrollReveal>

              {/* Trusted By - Logo Cloud */}
              <ScrollReveal delay={380} duration={800} distance={15}>
                <div className="pt-8 border-t border-gray-100">
                  <p className="font-poppins text-xs font-medium uppercase tracking-[0.15em] text-gray-400 mb-6">
                    Trusted by teams at
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-50 grayscale hover:opacity-70 hover:grayscale-0 transition-all duration-500">
                    {/* Placeholder logos - using text for now */}
                    <span className="font-poppins text-xl font-semibold text-gray-400">Tesco</span>
                    <span className="font-poppins text-lg font-semibold text-gray-400">Walmart</span>
                    <span className="font-poppins text-xl font-semibold text-gray-400">Amazon</span>
                    <span className="font-poppins text-lg font-semibold text-gray-400">Target</span>
                    <span className="font-poppins text-xl font-semibold text-gray-400">Carrefour</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Editor Showcase Section */}
        <EditorShowcase />

        {/* Problem Section - World-Class Premium Design */}
        <section className="relative py-32 px-6 lg:px-12 overflow-hidden">
          {/* Main background - slightly darker to contrast */}
          <div className="absolute inset-0 bg-gray-100/60" />
          
          {/* Outer curved border container with more curve */}
          <div className="absolute inset-4 md:inset-6 lg:inset-8 rounded-[3.5rem] border-2 border-gray-800/20 bg-gradient-to-b from-orange-100/70 via-orange-50/40 to-white shadow-[0_0_60px_rgba(0,0,0,0.06)]" />
          
          {/* Soft orange glow from top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-48 bg-orange-200/40 rounded-full blur-[80px]" />
          
          <div className="max-w-6xl mx-auto relative">
            <ScrollReveal duration={1200} distance={40}>
              <div className="text-center mb-20">
                {/* Premium badge */}
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-xl border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] mb-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-900" />
                  <span className="text-[11px] font-poppins font-semibold text-gray-700 tracking-[0.2em] uppercase">The Challenge</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-900" />
                </div>
                
                {/* Heading - Clean without animation */}
                <h2 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6 tracking-[-0.02em] leading-[1.1]">
                  Why Current Processes
                  <br />
                  <span className="bg-gradient-to-r from-gray-600 via-gray-800 to-gray-600 bg-clip-text text-transparent">Fall Short</span>
                </h2>
                <p className="font-poppins text-base md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed font-light">
                  Traditional ad creation is slow, expensive, and error-prone.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  title: 'Time Consuming',
                  description: 'Average ad takes 4-6 hours to create, review, and approve. Multiply by hundreds of SKUs.',
                  stat: '4-6',
                  statUnit: 'hrs',
                  statLabel: 'per ad',
                  numberColor: 'text-[#00539F]'
                },
                {
                  title: 'Compliance Failures',
                  description: '40% of ads get rejected for brand guideline violations, causing costly delays.',
                  stat: '40',
                  statUnit: '%',
                  statLabel: 'rejection rate',
                  numberColor: 'text-violet-600'
                },
                {
                  title: 'High Costs',
                  description: 'Agencies charge premium rates. In-house teams need expensive software and training.',
                  stat: '$500',
                  statUnit: '+',
                  statLabel: 'per campaign',
                  numberColor: 'text-orange-500'
                }
              ].map((problem, index) => (
                <div key={index} className="relative h-full">
                  {/* Premium glass card - No animation */}
                  <div className="relative h-full bg-white/95 backdrop-blur-2xl rounded-[1.75rem] p-8 border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_32px_rgba(0,0,0,0.04)]">
                    
                    {/* Inner glass shine effect */}
                    <div className="absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-white via-transparent to-gray-50/50 opacity-80" />
                    
                    {/* Top accent line */}
                    <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                    
                    <div className="relative z-10">
                      {/* Step number indicator - Minimal, no icon */}
                      <div className="inline-flex items-center gap-2 mb-6">
                        <span className="font-poppins text-xs font-semibold text-gray-400 tracking-[0.15em] uppercase">0{index + 1}</span>
                        <div className="w-8 h-px bg-gray-200" />
                      </div>
                      
                      {/* Title with better typography */}
                      <h3 className="font-poppins font-semibold text-[1.35rem] text-gray-900 mb-3 tracking-[-0.01em]">{problem.title}</h3>
                      
                      {/* Description with refined styling */}
                      <p className="font-poppins text-[0.9rem] text-gray-500 leading-[1.7] mb-8 font-light">{problem.description}</p>
                      
                      {/* Premium stat display with color accent */}
                      <div className="pt-6 border-t border-gray-100/80">
                        <div className="flex items-baseline gap-1">
                          <span className={`font-poppins text-[2.75rem] font-bold ${problem.numberColor} leading-none`}>
                            {problem.stat}
                          </span>
                          <span className={`font-poppins text-xl font-semibold ${problem.numberColor} opacity-70`}>{problem.statUnit}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-poppins font-medium mt-2">{problem.statLabel}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution Section - Unique Diagonal Layout */}
        <section id="how-it-works" className="relative py-32 px-6 overflow-hidden bg-gray-950">
          {/* Animated gradient mesh background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_rgba(0,83,159,0.15)_0%,_transparent_50%)]" />
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_rgba(139,92,246,0.15)_0%,_transparent_50%)]" />
          </div>
          
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }} />
          
          <div className="max-w-7xl mx-auto relative">
            {/* Header - Left aligned */}
            <ScrollReveal duration={1200} distance={40}>
              <div className="mb-20 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#00539F] animate-pulse" />
                  <span className="text-xs font-poppins font-medium text-gray-400 tracking-wider uppercase">How It Works</span>
                </div>
                
                <h2 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 tracking-[-0.02em] leading-[1.1]">
                  Three Steps to
                  <br />
                  <span className="bg-gradient-to-r from-[#00539F] via-violet-500 to-orange-500 bg-clip-text text-transparent">Perfect Ads</span>
                </h2>
                <p className="font-poppins text-lg text-gray-400 leading-relaxed font-light">
                  From upload to deployment in minutes, not hours.
                </p>
              </div>
            </ScrollReveal>

            {/* Staggered Cards - Unique diagonal layout */}
            <div className="relative">
              {/* Vertical connecting line */}
              <div className="hidden lg:block absolute left-[120px] top-0 bottom-0 w-px bg-gradient-to-b from-[#00539F]/50 via-violet-500/50 to-orange-500/50" />
              
              <div className="space-y-8 lg:space-y-0">
                {[
                  {
                    step: '01',
                    title: 'Upload & Choose',
                    description: 'Drop your product images or pick from 500+ retail templates. Our AI instantly analyzes brand assets, color palettes, and typography.',
                    color: '#00539F',
                    gradient: 'from-[#00539F] to-blue-500',
                    offset: 'lg:ml-0'
                  },
                  {
                    step: '02',
                    title: 'AI Enhancement',
                    description: 'Watch AI remove backgrounds, suggest layouts, generate compelling copy, and ensure every pixel meets brand guidelines.',
                    color: '#8B5CF6',
                    gradient: 'from-violet-500 to-purple-500',
                    offset: 'lg:ml-32'
                  },
                  {
                    step: '03',
                    title: 'Export & Deploy',
                    description: 'One-click export for Tesco, Amazon, Walmart, or any platform. Multiple formats, instant delivery.',
                    color: '#F97316',
                    gradient: 'from-orange-500 to-amber-500',
                    offset: 'lg:ml-64'
                  }
                ].map((item, index) => (
                  <ScrollReveal key={index} delay={index * 200} duration={1000} distance={60}>
                    <div className={`relative ${item.offset} lg:mb-12`}>
                      {/* Step indicator on the line */}
                      <div className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 items-center">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-poppins font-bold text-sm"
                          style={{ backgroundColor: item.color }}
                        >
                          {item.step}
                        </div>
                        <div className="w-24 h-px" style={{ background: `linear-gradient(to right, ${item.color}, transparent)` }} />
                      </div>
                      
                      {/* Main Card - Glassmorphism on dark */}
                      <div className="lg:ml-40 relative group">
                        <div className="relative bg-white/[0.03] backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/[0.05]">
                          {/* Glow effect on hover */}
                          <div 
                            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                            style={{ background: `radial-gradient(circle at center, ${item.color}20, transparent 70%)` }}
                          />
                          
                          {/* Mobile step indicator */}
                          <div className="lg:hidden flex items-center gap-4 mb-6">
                            <div 
                              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-poppins font-bold"
                              style={{ backgroundColor: item.color }}
                            >
                              {item.step}
                            </div>
                            <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${item.color}, transparent)` }} />
                          </div>
                          
                          {/* Content */}
                          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                            <div className="flex-1">
                              <h3 className="font-poppins font-semibold text-2xl lg:text-3xl text-white mb-4 tracking-[-0.01em]">{item.title}</h3>
                              <p className="font-poppins text-base text-gray-400 leading-relaxed font-light max-w-xl">{item.description}</p>
                            </div>
                            
                            {/* Arrow indicator */}
                            <div className="hidden lg:flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-all">
                              <svg className="w-6 h-6 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Innovation Section - Pure Black with Glass Container */}
        <section className="relative py-32 px-6 lg:px-12 overflow-hidden">
          {/* Pure black background */}
          <div className="absolute inset-0 bg-black" />
          
          {/* Outer curved glass container */}
          <div className="absolute inset-4 md:inset-6 lg:inset-8 rounded-[3.5rem] border border-white/10 overflow-hidden">
            {/* Glass frosted effect from top */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-transparent" />
            
            {/* Subtle inner border glow */}
            <div className="absolute inset-0 rounded-[3.5rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" />
          </div>
          
          {/* Glass reflection effect at top */}
          <div className="absolute top-4 md:top-6 lg:top-8 left-[10%] right-[10%] h-32 bg-gradient-to-b from-white/[0.06] to-transparent rounded-t-[3.5rem] blur-sm" />
          
          {/* Subtle color accents - very minimal */}
          <div className="absolute top-20 left-20 w-64 h-64 bg-violet-500/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-orange-500/5 rounded-full blur-[100px]" />
          
          <div className="max-w-6xl mx-auto relative">
            <ScrollReveal duration={1200} distance={40}>
              <div className="text-center mb-20">
                {/* Premium badge */}
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.05] backdrop-blur-xl border border-white/10 mb-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-orange-400" />
                  <span className="text-[11px] font-poppins font-semibold text-white/70 tracking-[0.2em] uppercase">Innovation</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-orange-400" />
                </div>
                
                <h2 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 tracking-[-0.02em] leading-[1.1]">
                  What Makes Us
                  <br />
                  <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">Different</span>
                </h2>
                <p className="font-poppins text-base md:text-lg text-white/50 max-w-xl mx-auto leading-relaxed font-light">
                  Built specifically for retail media, not adapted from generic design tools.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  title: 'AI Design Agent',
                  description: 'Chat with AI to control your entire editor. 70+ commands at your fingertips.',
                  tag: 'Groq LLaMA 3.3',
                  number: '01',
                  accentColor: 'text-violet-400'
                },
                {
                  title: 'Background Removal',
                  description: 'One-click AI-powered product isolation with Remove.bg integration.',
                  tag: 'Remove.bg API',
                  number: '02',
                  accentColor: 'text-rose-400'
                },
                {
                  title: 'Stock Library',
                  description: 'Access millions of free, high-quality Pexels images across 12+ categories.',
                  tag: '1M+ Images',
                  number: '03',
                  accentColor: 'text-amber-400'
                },
                {
                  title: 'Real-Time Compliance',
                  description: 'Auto-validates against Tesco brand guidelines as you design.',
                  tag: 'Brand Engine',
                  number: '04',
                  accentColor: 'text-emerald-400'
                },
                {
                  title: 'Asset Library',
                  description: 'Stickers, shapes, badges, social icons, payment logos ready to use.',
                  tag: '100+ Assets',
                  number: '05',
                  accentColor: 'text-blue-400'
                },
                {
                  title: 'Multi-Format Export',
                  description: 'Export in 15+ formats - Instagram, Facebook, Leaderboard, Skyscraper.',
                  tag: 'PNG, JPG, WebP',
                  number: '06',
                  accentColor: 'text-cyan-400'
                }
              ].map((feature, index) => (
                <ScrollReveal key={index} delay={index * 80} duration={1000} distance={30}>
                  <div className="relative h-full group">
                    {/* Card with subtle glass effect */}
                    <div className="relative h-full bg-white/[0.02] backdrop-blur-sm rounded-[1.5rem] p-7 border border-white/[0.06] hover:border-white/15 hover:bg-white/[0.04] transition-all duration-500">
                      
                      {/* Top shine line */}
                      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      
                      <div className="relative z-10">
                        {/* Number indicator */}
                        <div className="flex items-center gap-3 mb-5">
                          <span className={`font-poppins text-xs font-semibold ${feature.accentColor} tracking-[0.15em]`}>{feature.number}</span>
                          <div className="w-8 h-px bg-white/20" />
                        </div>
                        
                        <h3 className="font-poppins font-semibold text-[1.25rem] text-white mb-3 tracking-[-0.01em]">{feature.title}</h3>
                        <p className="font-poppins text-sm text-white/40 leading-[1.7] mb-5 font-light">{feature.description}</p>
                        
                        {/* Tag */}
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-[10px] font-poppins font-medium text-white/60 tracking-wide uppercase">
                          {feature.tag}
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Professional Tools Section - Premium Bento Grid */}
        <section className="relative py-32 px-6 overflow-hidden">
          {/* Subtle background */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/40 to-white" />
          
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
          
          <div className="max-w-7xl mx-auto relative">
            <ScrollReveal duration={1200} distance={40}>
              <div className="text-center mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/80 backdrop-blur-sm border border-blue-100/50 mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#00539F]" />
                  <span className="text-xs font-poppins font-medium text-[#00539F] tracking-wider uppercase">Complete Toolkit</span>
                </div>
                <h2 className="font-poppins text-4xl md:text-5xl font-semibold text-gray-900 mb-6 tracking-tight">
                  Professional-Grade{' '}
                  <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">Tools</span>
                </h2>
                <p className="font-poppins text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
                  Every feature crafted for efficiency. Zero learning curve.
                </p>
              </div>
            </ScrollReveal>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-12 gap-4">
              {/* Large Card - AI Agent */}
              <ScrollReveal delay={0} duration={1000} distance={40} className="col-span-12 lg:col-span-5 row-span-2">
                <div className="h-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 rounded-3xl p-8 relative overflow-hidden group">
                  {/* Subtle glow */}
                  <div className="absolute top-0 right-0 w-72 h-72 bg-violet-500/10 rounded-full blur-[80px] group-hover:bg-violet-500/15 transition-all duration-700" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[60px]" />
                  
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-violet-500/25 group-hover:scale-105 transition-transform duration-500">
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                      </svg>
                    </div>
                    <h3 className="font-poppins font-semibold text-2xl text-white mb-3">AI Design Agent</h3>
                    <p className="font-poppins text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                      Natural language control over your entire canvas. Just type what you want — add shapes, change colors, remove backgrounds, adjust layouts.
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs font-poppins font-medium text-white/90">70+ Commands</span>
                      <span className="px-3 py-1.5 bg-violet-500/20 backdrop-blur-sm rounded-full text-xs font-poppins font-medium text-violet-300">Groq LLaMA 3.3</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Background Removal Card */}
              <ScrollReveal delay={100} duration={1000} distance={40} className="col-span-12 sm:col-span-6 lg:col-span-4">
                <div className="h-full bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/60 shadow-[0_8px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 group hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center mb-5 shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform duration-500">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-2">Background Removal</h3>
                  <p className="font-poppins text-gray-500 text-sm leading-relaxed">One-click AI-powered product isolation with Remove.bg integration</p>
                </div>
              </ScrollReveal>

              {/* Stock Library Card */}
              <ScrollReveal delay={150} duration={1000} distance={40} className="col-span-12 sm:col-span-6 lg:col-span-3">
                <div className="h-full bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/60 shadow-[0_8px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 group hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mb-5 shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-500">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z" />
                    </svg>
                  </div>
                  <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-2">Stock Library</h3>
                  <p className="font-poppins text-gray-500 text-sm">1M+ Pexels images</p>
                </div>
              </ScrollReveal>

              {/* Compliance Card */}
              <ScrollReveal delay={200} duration={1000} distance={40} className="col-span-12 sm:col-span-6 lg:col-span-4">
                <div className="h-full bg-gradient-to-br from-emerald-50/80 to-teal-50/80 backdrop-blur-xl rounded-3xl p-6 border border-emerald-200/60 shadow-[0_8px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(16,185,129,0.1)] transition-all duration-500 group hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-500">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-500/10 rounded-full text-xs font-poppins font-medium text-emerald-600">Live</span>
                  </div>
                  <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-2">Brand Compliance</h3>
                  <p className="font-poppins text-gray-600 text-sm leading-relaxed">Real-time Tesco brand guideline validation</p>
                </div>
              </ScrollReveal>

              {/* Small Tool Cards */}
              <ScrollReveal delay={250} duration={1000} distance={40} className="col-span-6 lg:col-span-2">
                <div className="h-full bg-white/80 backdrop-blur-xl rounded-2xl p-5 border border-gray-200/60 hover:shadow-lg transition-all duration-500 group text-center hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-200/50 flex items-center justify-center mb-3 mx-auto group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-500">
                    <svg className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199" />
                    </svg>
                  </div>
                  <p className="font-poppins font-medium text-sm text-gray-900">Shapes</p>
                  <p className="font-poppins text-xs text-gray-400">20+ Types</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300} duration={1000} distance={40} className="col-span-6 lg:col-span-2">
                <div className="h-full bg-white/80 backdrop-blur-xl rounded-2xl p-5 border border-gray-200/60 hover:shadow-lg transition-all duration-500 group text-center hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 border border-purple-200/50 flex items-center justify-center mb-3 mx-auto group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-purple-600 transition-all duration-500">
                    <svg className="w-5 h-5 text-purple-600 group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                    </svg>
                  </div>
                  <p className="font-poppins font-medium text-sm text-gray-900">Stickers</p>
                  <p className="font-poppins text-xs text-gray-400">Sale Badges</p>
                </div>
              </ScrollReveal>

              {/* Export Card - Wide */}
              <ScrollReveal delay={350} duration={1000} distance={40} className="col-span-12 lg:col-span-4">
                <div className="h-full bg-gradient-to-br from-[#00539F] via-blue-600 to-violet-600 rounded-3xl p-6 relative overflow-hidden group">
                  {/* Subtle glow */}
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                  <div className="absolute top-0 left-0 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl" />
                  
                  <div className="relative z-10 flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-poppins font-semibold text-xl text-white mb-1">Multi-Format Export</h3>
                      <p className="font-poppins text-white/70 text-sm">15+ sizes • PNG, JPG, WebP</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Text & Icons Cards */}
              <ScrollReveal delay={400} duration={1000} distance={40} className="col-span-6 lg:col-span-2">
                <div className="h-full bg-white/80 backdrop-blur-xl rounded-2xl p-5 border border-gray-200/60 hover:shadow-lg transition-all duration-500 group text-center hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-100 to-cyan-50 border border-cyan-200/50 flex items-center justify-center mb-3 mx-auto group-hover:bg-gradient-to-br group-hover:from-cyan-500 group-hover:to-cyan-600 transition-all duration-500">
                    <svg className="w-5 h-5 text-cyan-600 group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25" />
                    </svg>
                  </div>
                  <p className="font-poppins font-medium text-sm text-gray-900">Layers</p>
                  <p className="font-poppins text-xs text-gray-400">Full Control</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={450} duration={1000} distance={40} className="col-span-6 lg:col-span-2">
                <div className="h-full bg-white/80 backdrop-blur-xl rounded-2xl p-5 border border-gray-200/60 hover:shadow-lg transition-all duration-500 group text-center hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-200/50 flex items-center justify-center mb-3 mx-auto group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-amber-600 transition-all duration-500">
                    <svg className="w-5 h-5 text-amber-600 group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574" />
                    </svg>
                  </div>
                  <p className="font-poppins font-medium text-sm text-gray-900">Crop</p>
                  <p className="font-poppins text-xs text-gray-400">Interactive</p>
                </div>
              </ScrollReveal>

              {/* Text Tools Card */}
              <ScrollReveal delay={500} duration={1000} distance={40} className="col-span-12 sm:col-span-6 lg:col-span-4">
                <div className="h-full bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/60 shadow-[0_8px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 group hover:-translate-y-1">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/20 group-hover:scale-105 transition-transform duration-500">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-poppins font-semibold text-lg text-gray-900">Advanced Text</h3>
                      <p className="font-poppins text-gray-500 text-sm">Curved, gradient, outlined styles</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Social Icons Card */}
              <ScrollReveal delay={550} duration={1000} distance={40} className="col-span-12 sm:col-span-6 lg:col-span-4">
                <div className="h-full bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/60 shadow-[0_8px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 group hover:-translate-y-1">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-500">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-poppins font-semibold text-lg text-gray-900">Social & Payment</h3>
                      <p className="font-poppins text-gray-500 text-sm">All platform icons, UPI, cards</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* CTA Section - Dark Professional with Grid */}
        <section className="relative py-32 px-6 overflow-hidden">
          {/* Dark professional background */}
          <div className="absolute inset-0 bg-gray-950" />
          
          {/* Grid lines - small white grid */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
          
          {/* Subtle glow accents */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/8 rounded-full blur-[120px]" />
          
          <div className="max-w-4xl mx-auto relative">
            <ScrollReveal duration={1200} distance={50}>
              {/* Glass card container - bright white glassy */}
              <div className="relative bg-white/90 backdrop-blur-2xl rounded-[2.5rem] p-12 md:p-16 border border-white/60 shadow-[0_20px_80px_rgba(255,255,255,0.15),0_0_0_1px_rgba(255,255,255,0.2)] text-center">
                {/* Bright inner glow from top */}
                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-b from-white via-white/95 to-white/80" />
                
                {/* Top shine line */}
                <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
                
                {/* Inner border glow */}
                <div className="absolute inset-0 rounded-[2.5rem] shadow-[inset_0_2px_20px_rgba(255,255,255,0.5)]" />
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-100 via-orange-50 to-amber-100 backdrop-blur-xl border border-orange-200/80 shadow-[0_4px_20px_rgba(249,115,22,0.15)] mb-8">
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                    <span className="text-xs font-poppins font-medium text-orange-700">Free to start • No credit card</span>
                  </div>
                  
                  <h2 className="font-poppins text-4xl md:text-5xl font-semibold text-gray-900 mb-6 tracking-tight">
                    Ready to Transform{' '}
                    <span className="bg-gradient-to-r from-[#00539F] via-violet-600 to-purple-600 bg-clip-text text-transparent">Your Workflow?</span>
                  </h2>
                  
                  <p className="font-poppins text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Join brands already saving hours on every campaign. Create professional retail ads in minutes.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/editor"
                      className="group relative px-10 py-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white font-poppins font-medium rounded-2xl shadow-lg shadow-gray-900/30 hover:shadow-xl hover:shadow-gray-900/40 transition-all duration-500 hover:-translate-y-0.5 overflow-hidden"
                    >
                      <span className="relative z-10">Open Editor — Free</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </Link>
                    <Link
                      href="/auth"
                      className="px-10 py-4 bg-white border border-gray-200 text-gray-700 font-poppins font-medium rounded-2xl hover:border-gray-300 hover:shadow-lg transition-all duration-500 hover:-translate-y-0.5"
                    >
                      Create Account
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Team Section - Minimal Professional */}
        <section className="relative py-32 px-6 overflow-hidden">
          {/* Clean white background */}
          <div className="absolute inset-0 bg-white" />
          
          <div className="max-w-5xl mx-auto relative">
            <ScrollReveal duration={1200} distance={40}>
              <div className="text-center mb-24">
                {/* Minimal overline */}
                <p className="font-poppins text-[11px] font-medium text-gray-400 tracking-[0.3em] uppercase mb-6">The Minds Behind</p>
                
                {/* Brand-style heading - italic serif mix */}
                <h2 className="font-poppins text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 tracking-[-0.03em] leading-[1]">
                  Team <span className="italic font-normal text-gray-400">Sarthak</span>
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
              {[
                {
                  name: 'Yashodip More',
                  role: 'Full Stack Developer',
                  image: '/team/Yashodip.jpeg'
                },
                {
                  name: 'Komal Kumavat',
                  role: 'UI/UX Designer',
                  image: '/team/komal.jpeg'
                },
                {
                  name: 'Jaykumar Girase',
                  role: 'Backend Developer',
                  image: '/team/jaykumar.jpeg'
                },
                {
                  name: 'Tejas Patil',
                  role: 'ML Engineer',
                  image: '/team/tejas.jpeg'
                }
              ].map((member, index) => (
                <ScrollReveal key={index} delay={index * 100} duration={1000} distance={30}>
                  <div className="group text-center">
                    {/* Large Photo with thin border */}
                    <div className="relative mb-6">
                      <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border border-gray-200 group-hover:border-gray-300 transition-all duration-500">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                        />
                      </div>
                    </div>
                    
                    {/* Name - Mixed typography */}
                    <h3 className="font-poppins text-lg text-gray-900 mb-1 tracking-[-0.01em]">
                      <span className="font-semibold">{member.name.split(' ')[0]}</span>{' '}
                      <span className="font-normal italic text-gray-500">{member.name.split(' ')[1]}</span>
                    </h3>
                    
                    {/* Role - minimal */}
                    <p className="font-poppins text-[13px] text-gray-400 tracking-wide">{member.role}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Professional Footer - Premium */}
        <footer className="relative bg-gradient-to-b from-gray-950 to-gray-900 text-white overflow-hidden">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
          
          {/* Subtle glow */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]" />

          <div className="relative max-w-6xl mx-auto px-6">
            {/* Main Footer */}
            <div className="py-20 grid md:grid-cols-12 gap-12">
              {/* Brand Column */}
              <div className="md:col-span-5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 border border-white/10 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold text-xl text-white">RetailSync AI</h3>
                    <p className="text-gray-500 text-xs font-poppins">AI-Powered Ad Creation</p>
                  </div>
                </div>
                <p className="font-poppins text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
                  Revolutionizing retail media ad creation with AI. Built for brands who demand efficiency, compliance, and creativity.
                </p>
                <div className="flex items-center gap-3">
                  <span className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-xs font-poppins font-medium text-gray-300 border border-white/10">
                    🏆 Tesco Hackathon 2025
                  </span>
                </div>
              </div>

              {/* Quick Links */}
              <div className="md:col-span-3">
                <h4 className="font-poppins font-semibold text-sm uppercase tracking-wider text-gray-400 mb-6">Product</h4>
                <ul className="space-y-4">
                  <li>
                    <Link href="/editor" className="font-poppins text-sm text-gray-400 hover:text-white transition-colors duration-300">
                      Editor
                    </Link>
                  </li>
                  <li>
                    <Link href="/templates" className="font-poppins text-sm text-gray-400 hover:text-white transition-colors duration-300">
                      Templates
                    </Link>
                  </li>
                  <li>
                    <Link href="#how-it-works" className="font-poppins text-sm text-gray-400 hover:text-white transition-colors duration-300">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="/auth" className="font-poppins text-sm text-gray-400 hover:text-white transition-colors duration-300">
                      Sign Up
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="md:col-span-4">
                <h4 className="font-poppins font-semibold text-sm uppercase tracking-wider text-gray-400 mb-6">Built With</h4>
                <div className="flex flex-wrap gap-2">
                  {['Next.js 16', 'Fabric.js', 'Groq LLaMA 3.3', 'Remove.bg', 'Pexels API', 'MongoDB'].map((tech) => (
                    <span key={tech} className="px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-lg text-xs font-poppins text-gray-400 border border-white/5">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="py-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="font-poppins text-sm text-gray-500">
                © 2025 RetailSync AI. Made by Team Sarthak for Tesco Retail Media Hackathon.
              </p>
              <div className="flex items-center gap-4">
                <Link href="https://github.com/yashodipmore" target="_blank" className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </Link>
                <Link href="https://linkedin.com/in/yashodipmore" target="_blank" className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
