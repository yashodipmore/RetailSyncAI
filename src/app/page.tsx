import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import ScrollReveal from '@/components/ui/ScrollReveal';
import TeamMemberCard from '@/components/ui/TeamMemberCard';

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-white relative overflow-hidden">
        {/* Background Grid */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #e5e7eb 1px, transparent 1px),
              linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Gradient Blobs */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-orange-200 to-orange-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-violet-200 to-violet-100 rounded-full blur-3xl opacity-40 translate-y-1/3 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-br from-orange-100 to-violet-100 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />

        {/* Hero Section */}
        <section className="relative pt-28 pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div>
                {/* Badge */}
                <ScrollReveal duration={1200} distance={30}>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-orange-100 to-violet-100 border border-orange-300/50 rounded-full mb-6">
                    <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-violet-600 rounded-full animate-pulse"></span>
                    <span className="text-xs font-semibold font-inter tracking-wide bg-gradient-to-r from-orange-600 to-violet-600 bg-clip-text text-transparent">TESCO RETAIL MEDIA HACKATHON 2025</span>
                  </div>
                </ScrollReveal>

                {/* Main Heading */}
                <ScrollReveal delay={150} duration={1200} distance={50}>
                  <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] mb-6">
                    Retail Ads,
                    <br />
                    <span className="bg-gradient-to-r from-[#00539F] via-violet-600 to-orange-500 bg-clip-text text-transparent">Reimagined</span>
                  </h1>
                </ScrollReveal>

                {/* Subheading */}
                <ScrollReveal delay={300} duration={1200} distance={40}>
                  <p className="font-inter text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
                    Create stunning, brand-compliant advertisements in minutes — not hours. 
                    Let AI handle the complexity while you focus on creativity.
                  </p>
                </ScrollReveal>

                {/* CTA Buttons */}
                <ScrollReveal delay={450} duration={1200} distance={40}>
                  <div className="flex flex-col sm:flex-row gap-4 mb-10">
                    <Link
                      href="/editor"
                      className="px-8 py-4 bg-gradient-to-r from-[#00539F] to-violet-600 text-white font-semibold font-inter rounded-xl hover:shadow-xl hover:shadow-violet-200 transition-all hover:-translate-y-0.5"
                    >
                      Start Creating — It&apos;s Free
                    </Link>
                    <Link
                      href="#how-it-works"
                      className="px-8 py-4 border-2 border-gray-200 text-gray-700 font-medium font-inter rounded-xl hover:border-orange-300 hover:text-orange-600 transition-all"
                    >
                      See How It Works
                    </Link>
                  </div>
                </ScrollReveal>

                {/* Stats */}
                <ScrollReveal delay={600} duration={1200} distance={30}>
                  <div className="flex items-center gap-8">
                    <div>
                      <p className="font-space text-3xl font-bold bg-gradient-to-r from-violet-600 to-violet-500 bg-clip-text text-transparent">70+</p>
                      <p className="text-sm font-inter text-gray-500">AI Commands</p>
                    </div>
                    <div className="w-px h-12 bg-gradient-to-b from-orange-200 to-violet-200"></div>
                    <div>
                      <p className="font-space text-3xl font-bold bg-gradient-to-r from-[#00539F] to-violet-500 bg-clip-text text-transparent">15+</p>
                      <p className="text-sm font-inter text-gray-500">Export Formats</p>
                    </div>
                    <div className="w-px h-12 bg-gradient-to-b from-violet-200 to-orange-200"></div>
                    <div>
                      <p className="font-space text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">1M+</p>
                      <p className="text-sm font-inter text-gray-500">Stock Images</p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right - Preview */}
              <ScrollReveal delay={400} duration={1400} direction="right" distance={60} className="relative hidden lg:block">
                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-5 shadow-2xl border border-white/10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-4 text-xs text-gray-500 font-inter">RetailSync Editor</span>
                  </div>
                  <div className="bg-gray-800/80 rounded-lg p-4">
                    <div className="flex gap-3">
                      <div className="w-40 space-y-2">
                        <div className="h-6 bg-gray-700/50 rounded"></div>
                        <div className="h-6 bg-gray-700/50 rounded"></div>
                        <div className="h-6 bg-violet-500/20 rounded border border-violet-500/30"></div>
                        <div className="h-6 bg-gray-700/50 rounded"></div>
                      </div>
                      <div className="flex-1 bg-gray-700/30 rounded-lg flex items-center justify-center min-h-[180px]">
                        <div className="w-[90%] h-24 bg-gradient-to-r from-[#00539F] via-violet-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                          <span className="text-white font-semibold">Your Ad Preview</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Card - Compliance */}
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Compliant</p>
                      <p className="text-xs text-green-600 font-medium">Brand Safe ✓</p>
                    </div>
                  </div>
                </div>

                {/* Floating Card - AI */}
                <div className="absolute -right-4 bottom-8 bg-white rounded-xl shadow-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-100 to-orange-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">AI Suggestion</p>
                      <p className="text-xs text-violet-600 font-medium">Applied ✓</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="relative py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal duration={1200} distance={40}>
              <div className="text-center mb-16">
                <p className="text-sm font-space font-semibold text-orange-500 tracking-wider uppercase mb-3">The Problem</p>
                <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Creating Retail Ads is <span className="text-red-500">Broken</span>
                </h2>
                <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
                  Traditional ad creation is slow, expensive, and error-prone. 
                  Most brands struggle with compliance and consistency.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Time Consuming',
                  description: 'Average ad takes 4-6 hours to create, review, and approve. Multiply by hundreds of SKUs.',
                  stat: '4-6 hrs',
                  statLabel: 'per ad'
                },
                {
                  title: 'Compliance Failures',
                  description: '40% of ads get rejected for brand guideline violations, causing costly delays.',
                  stat: '40%',
                  statLabel: 'rejection rate'
                },
                {
                  title: 'High Costs',
                  description: 'Agencies charge premium rates. In-house teams need expensive software and training.',
                  stat: '$500+',
                  statLabel: 'per campaign'
                }
              ].map((problem, index) => (
                <ScrollReveal key={index} delay={index * 150} duration={1200} distance={50}>
                  <div className="bg-white rounded-2xl p-6 border-2 border-gray-800 shadow-sm h-full">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-4">
                      <span className="text-red-500 font-bold font-space">{index + 1}</span>
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2 font-inter">{problem.title}</h3>
                    <p className="font-inter text-sm text-gray-600 mb-4">{problem.description}</p>
                    <div className="pt-4 border-t border-gray-100">
                      <p className="font-space text-2xl font-bold text-red-500">{problem.stat}</p>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-inter">{problem.statLabel}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section id="how-it-works" className="relative py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal duration={1200} distance={40}>
              <div className="text-center mb-16">
                <p className="text-sm font-space font-semibold bg-gradient-to-r from-violet-600 to-violet-500 bg-clip-text text-transparent tracking-wider uppercase mb-3">Our Solution</p>
                <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  AI That <span className="bg-gradient-to-r from-violet-600 to-orange-500 bg-clip-text text-transparent">Understands</span> Retail
                </h2>
                <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
                  RetailSync AI combines deep learning with retail expertise to automate 
                  ad creation while ensuring brand compliance.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Upload & Choose',
                  description: 'Upload your product images or select from templates. AI analyzes your brand assets automatically.',
                  color: 'from-[#00539F] to-blue-600'
                },
                {
                  step: '02',
                  title: 'AI Enhancement',
                  description: 'Our AI suggests layouts, removes backgrounds, generates copy, and ensures brand compliance in real-time.',
                  color: 'from-violet-500 to-violet-600'
                },
                {
                  step: '03',
                  title: 'Export & Deploy',
                  description: 'One-click export in multiple formats. Ready for Tesco, Amazon, or any retail media platform.',
                  color: 'from-orange-500 to-orange-600'
                }
              ].map((item, index) => (
                <ScrollReveal key={index} delay={index * 200} duration={1200} distance={50}>
                  <div className="relative h-full">
                    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow h-full">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white font-bold text-lg font-space mb-6`}>
                        {item.step}
                      </div>
                      <h3 className="font-semibold text-xl text-gray-900 mb-3 font-inter">{item.title}</h3>
                      <p className="font-inter text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                    {index < 2 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 w-8 text-gray-300 text-2xl">→</div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Innovation Section */}
        <section className="relative py-24 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal duration={1200} distance={40}>
              <div className="text-center mb-16">
                <p className="text-sm font-space font-semibold bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent tracking-wider uppercase mb-3">Innovation</p>
                <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                  What Makes Us <span className="text-orange-400">Different</span>
                </h2>
                <p className="font-inter text-lg text-gray-400 max-w-2xl mx-auto">
                  Built specifically for retail media, not adapted from generic design tools.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  ),
                  title: 'AI Design Agent',
                  description: 'Chat with AI to control your entire editor. Just say "add red circle" or "remove background" - 70+ commands at your fingertips.',
                  highlight: 'Powered by Groq LLaMA 3.3'
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: 'One-Click Background Removal',
                  description: 'Instantly isolate products with Remove.bg API. Perfect cutouts every time, with smart fallback for any image.',
                  highlight: 'Remove.bg API + AI Fallback'
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: 'Pexels Stock Library',
                  description: 'Access millions of free, high-quality stock images. 12+ retail categories including food, fashion, tech, and more.',
                  highlight: '1M+ Free Stock Images'
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: 'Real-Time Compliance',
                  description: 'Auto-checks against Tesco brand guidelines. Colors, fonts, spacing - everything validated in real-time.',
                  highlight: 'Brand Guideline Engine'
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  ),
                  title: 'Rich Asset Library',
                  description: 'Stickers, shapes, frames, retail badges, social icons, payment logos - everything you need for retail ads.',
                  highlight: '100+ Ready-to-Use Assets'
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  ),
                  title: 'Multi-Format Export',
                  description: 'Export in 15+ standard ad formats. Instagram, Facebook, Leaderboard, Skyscraper - one design, all sizes.',
                  highlight: 'PNG, JPG, WebP Support'
                }
              ].map((feature, index) => (
                <ScrollReveal key={index} delay={index * 150} duration={1200} distance={50}>
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-500 to-orange-500 flex items-center justify-center text-white mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="font-inter font-semibold text-xl text-white mb-2">{feature.title}</h3>
                    <p className="font-inter text-gray-400 text-sm mb-4">{feature.description}</p>
                    <p className="text-xs font-space font-medium text-orange-400 uppercase tracking-wider">{feature.highlight}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Professional Tools Section - Asymmetric Bento Grid */}
        <section className="relative py-28 px-6 bg-gradient-to-b from-white via-gray-50/50 to-white overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
          
          <div className="max-w-7xl mx-auto relative">
            <ScrollReveal duration={1200} distance={40}>
              <div className="text-center mb-20">
                <p className="text-sm font-inter font-semibold text-violet-600 tracking-[0.2em] uppercase mb-4">Complete Toolkit</p>
                <h2 className="font-playfair text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                  Professional-Grade Tools
                </h2>
                <p className="font-inter text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
                  Every feature crafted for efficiency. Zero learning curve.
                </p>
              </div>
            </ScrollReveal>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-12 gap-5">
              {/* Large Card - AI Agent */}
              <ScrollReveal delay={0} duration={1000} distance={40} className="col-span-12 md:col-span-8 lg:col-span-5 row-span-2">
                <div className="h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl group-hover:bg-violet-500/20 transition-all duration-700" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center mb-6 shadow-lg shadow-violet-500/25">
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                      </svg>
                    </div>
                    <h3 className="font-inter font-bold text-2xl text-white mb-3">AI Design Agent</h3>
                    <p className="font-inter text-gray-400 text-sm leading-relaxed mb-6">
                      Natural language control over your entire canvas. Just type what you want — add shapes, change colors, remove backgrounds.
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1.5 bg-white/10 rounded-full text-xs font-inter font-medium text-white">70+ Commands</span>
                      <span className="px-3 py-1.5 bg-violet-500/20 rounded-full text-xs font-inter font-medium text-violet-300">Groq Powered</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Medium Card - Remove Background */}
              <ScrollReveal delay={100} duration={1000} distance={40} className="col-span-12 md:col-span-4 lg:col-span-4">
                <div className="h-full bg-white rounded-3xl p-6 border border-gray-100 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-500 group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                    </svg>
                  </div>
                  <h3 className="font-inter font-semibold text-lg text-gray-900 mb-2">Background Removal</h3>
                  <p className="font-inter text-gray-500 text-sm">One-click AI-powered isolation with Remove.bg</p>
                </div>
              </ScrollReveal>

              {/* Medium Card - Stock Library */}
              <ScrollReveal delay={150} duration={1000} distance={40} className="col-span-12 md:col-span-6 lg:col-span-3">
                <div className="h-full bg-white rounded-3xl p-6 border border-gray-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-500 group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>
                  <h3 className="font-inter font-semibold text-lg text-gray-900 mb-2">Stock Library</h3>
                  <p className="font-inter text-gray-500 text-sm">1M+ Pexels images</p>
                </div>
              </ScrollReveal>

              {/* Wide Card - Compliance */}
              <ScrollReveal delay={200} duration={1000} distance={40} className="col-span-12 md:col-span-6 lg:col-span-4">
                <div className="h-full bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 border border-emerald-100 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-500/10 rounded-full text-xs font-inter font-medium text-emerald-600">Live</span>
                  </div>
                  <h3 className="font-inter font-semibold text-lg text-gray-900 mb-2">Brand Compliance</h3>
                  <p className="font-inter text-gray-600 text-sm">Real-time Tesco guideline validation</p>
                </div>
              </ScrollReveal>

              {/* Small Cards Row */}
              <ScrollReveal delay={250} duration={1000} distance={40} className="col-span-6 md:col-span-3 lg:col-span-2">
                <div className="h-full bg-white rounded-2xl p-5 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-500 group text-center">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mb-3 mx-auto group-hover:bg-blue-500 transition-colors duration-500">
                    <svg className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664" />
                    </svg>
                  </div>
                  <p className="font-inter font-medium text-sm text-gray-900">Shapes</p>
                  <p className="font-inter text-xs text-gray-400">20+ Types</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300} duration={1000} distance={40} className="col-span-6 md:col-span-3 lg:col-span-2">
                <div className="h-full bg-white rounded-2xl p-5 border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all duration-500 group text-center">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center mb-3 mx-auto group-hover:bg-purple-500 transition-colors duration-500">
                    <svg className="w-5 h-5 text-purple-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                    </svg>
                  </div>
                  <p className="font-inter font-medium text-sm text-gray-900">Stickers</p>
                  <p className="font-inter text-xs text-gray-400">Sale Badges</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={350} duration={1000} distance={40} className="col-span-6 md:col-span-3 lg:col-span-2">
                <div className="h-full bg-white rounded-2xl p-5 border border-gray-100 hover:border-cyan-200 hover:shadow-lg transition-all duration-500 group text-center">
                  <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center mb-3 mx-auto group-hover:bg-cyan-500 transition-colors duration-500">
                    <svg className="w-5 h-5 text-cyan-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
                  </div>
                  <p className="font-inter font-medium text-sm text-gray-900">Crop</p>
                  <p className="font-inter text-xs text-gray-400">Interactive</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={400} duration={1000} distance={40} className="col-span-6 md:col-span-3 lg:col-span-2">
                <div className="h-full bg-white rounded-2xl p-5 border border-gray-100 hover:border-amber-200 hover:shadow-lg transition-all duration-500 group text-center">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center mb-3 mx-auto group-hover:bg-amber-500 transition-colors duration-500">
                    <svg className="w-5 h-5 text-amber-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                    </svg>
                  </div>
                  <p className="font-inter font-medium text-sm text-gray-900">Layers</p>
                  <p className="font-inter text-xs text-gray-400">Full Control</p>
                </div>
              </ScrollReveal>

              {/* Wide Export Card */}
              <ScrollReveal delay={450} duration={1000} distance={40} className="col-span-12 lg:col-span-4">
                <div className="h-full bg-gradient-to-r from-[#00539F] to-violet-600 rounded-3xl p-6 relative overflow-hidden group">
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                  <div className="relative z-10 flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-inter font-semibold text-xl text-white mb-1">Multi-Format Export</h3>
                      <p className="font-inter text-white/70 text-sm">15+ sizes • PNG, JPG, WebP</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Text Tools Card */}
              <ScrollReveal delay={500} duration={1000} distance={40} className="col-span-12 md:col-span-6 lg:col-span-4">
                <div className="h-full bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-500">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-inter font-semibold text-lg text-gray-900">Advanced Text</h3>
                      <p className="font-inter text-gray-500 text-sm">Curved, gradient, outlined styles</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Icons Card */}
              <ScrollReveal delay={550} duration={1000} distance={40} className="col-span-12 md:col-span-6 lg:col-span-4">
                <div className="h-full bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-500">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-inter font-semibold text-lg text-gray-900">Social & Payment</h3>
                      <p className="font-inter text-gray-500 text-sm">All platform icons, UPI, cards</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal duration={1200} distance={50}>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Ready to Transform Your Workflow?
              </h2>
              <p className="font-inter text-lg text-gray-600 mb-10">
                Join brands already saving hours on every campaign. Start free, no credit card required.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={300} duration={1200} distance={40}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/editor"
                  className="px-10 py-4 bg-gradient-to-r from-[#00539F] via-violet-600 to-orange-500 text-white font-inter font-semibold rounded-xl hover:shadow-xl transition-all hover:-translate-y-0.5"
                >
                  Open Editor — Free
                </Link>
                <Link
                  href="/auth"
                  className="px-10 py-4 border-2 border-gray-200 text-gray-700 font-inter font-medium rounded-xl hover:border-violet-300 transition-colors"
                >
                  Create Account
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Team Section */}
        <section className="relative py-28 px-6 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal duration={1200} distance={40}>
              <div className="text-center mb-16">
                <p className="text-sm font-inter font-semibold text-violet-600 tracking-[0.2em] uppercase mb-4">The Team Behind</p>
                <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Team <span className="bg-gradient-to-r from-[#00539F] to-violet-600 bg-clip-text text-transparent">Sarthak</span>
                </h2>
                <p className="font-inter text-lg text-gray-500 max-w-xl mx-auto">
                  B.Tech students passionate about AI and design innovation
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: 'Yashodip More',
                  role: 'Full Stack Developer',
                  year: 'Final Year, B.Tech',
                  color: 'from-violet-500 to-purple-600',
                  initial: 'YM',
                  expertise: 'AI Integration',
                  image: '/team/Yashodip.jpeg'
                },
                {
                  name: 'Komal Kumavat',
                  role: 'UI/UX Designer',
                  year: 'Final Year, B.Tech',
                  color: 'from-rose-500 to-pink-600',
                  initial: 'KK',
                  expertise: 'Design Systems',
                  image: '/team/komal.jpeg'
                },
                {
                  name: 'Jaykumar Girase',
                  role: 'Backend Developer',
                  year: 'Final Year, B.Tech',
                  color: 'from-emerald-500 to-teal-600',
                  initial: 'JG',
                  expertise: 'API Architecture',
                  image: '/team/jaykumar.jpeg'
                },
                {
                  name: 'Tejas Patil',
                  role: 'ML Engineer',
                  year: '2nd Year, B.Tech AIDS',
                  color: 'from-orange-500 to-amber-600',
                  initial: 'TP',
                  expertise: 'Model Training',
                  image: '/team/tejas.jpeg'
                }
              ].map((member, index) => (
                <ScrollReveal key={index} delay={index * 100} duration={1000} distance={40}>
                  <TeamMemberCard {...member} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Professional Footer */}
        <footer className="relative bg-gray-900 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>

          <div className="relative max-w-6xl mx-auto px-6">
            {/* Main Footer */}
            <div className="py-16 grid md:grid-cols-4 gap-12">
              {/* Brand Column */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-orange-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-playfair font-bold text-xl">RetailSync AI</h3>
                    <p className="text-gray-400 text-xs font-inter">AI-Powered Ad Creation</p>
                  </div>
                </div>
                <p className="font-inter text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
                  Revolutionizing retail media ad creation with AI. Built for brands who demand efficiency, compliance, and creativity.
                </p>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1.5 bg-white/10 rounded-full text-xs font-inter font-medium text-gray-300">
                    🏆 Tesco Hackathon 2025
                  </span>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-inter font-semibold text-sm uppercase tracking-wider text-gray-300 mb-5">Product</h4>
                <ul className="space-y-3">
                  <li>
                    <Link href="/editor" className="font-inter text-sm text-gray-400 hover:text-white transition-colors">
                      Editor
                    </Link>
                  </li>
                  <li>
                    <Link href="/templates" className="font-inter text-sm text-gray-400 hover:text-white transition-colors">
                      Templates
                    </Link>
                  </li>
                  <li>
                    <Link href="#how-it-works" className="font-inter text-sm text-gray-400 hover:text-white transition-colors">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="/auth" className="font-inter text-sm text-gray-400 hover:text-white transition-colors">
                      Sign Up
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="font-inter font-semibold text-sm uppercase tracking-wider text-gray-300 mb-5">Built With</h4>
                <ul className="space-y-3">
                  <li className="font-inter text-sm text-gray-400">Next.js 16</li>
                  <li className="font-inter text-sm text-gray-400">Fabric.js</li>
                  <li className="font-inter text-sm text-gray-400">Groq LLaMA 3.3</li>
                  <li className="font-inter text-sm text-gray-400">Remove.bg API</li>
                  <li className="font-inter text-sm text-gray-400">Pexels API</li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="py-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="font-inter text-sm text-gray-500">
                © 2025 RetailSync AI. Made by Team Sarthak for Tesco Retail Media Hackathon.
              </p>
              <div className="flex items-center gap-6">
                <Link href="https://github.com/yashodipmore" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </Link>
                <Link href="https://linkedin.com/in/yashodipmore" target="_blank" className="text-gray-400 hover:text-white transition-colors">
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
