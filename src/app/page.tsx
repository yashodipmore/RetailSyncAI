import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';

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
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-orange-100 to-violet-100 border border-orange-300/50 rounded-full mb-6">
                  <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-violet-600 rounded-full animate-pulse"></span>
                  <span className="text-xs font-semibold font-opensans tracking-wide bg-gradient-to-r from-orange-600 to-violet-600 bg-clip-text text-transparent">TESCO RETAIL MEDIA HACKATHON 2025</span>
                </div>

                {/* Main Heading */}
                <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] mb-6">
                  Retail Ads,
                  <br />
                  <span className="bg-gradient-to-r from-[#00539F] via-violet-600 to-orange-500 bg-clip-text text-transparent">Reimagined</span>
                </h1>

                {/* Subheading */}
                <p className="font-opensans text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
                  Create stunning, brand-compliant advertisements in minutes — not hours. 
                  Let AI handle the complexity while you focus on creativity.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <Link
                    href="/editor"
                    className="px-8 py-4 bg-gradient-to-r from-[#00539F] to-violet-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-violet-200 transition-all hover:-translate-y-0.5"
                  >
                    Start Creating — It&apos;s Free
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="px-8 py-4 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-orange-300 hover:text-orange-600 transition-all"
                  >
                    See How It Works
                  </Link>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-8">
                  <div>
                    <p className="font-playfair text-3xl font-bold bg-gradient-to-r from-violet-600 to-violet-500 bg-clip-text text-transparent">10x</p>
                    <p className="text-sm font-opensans text-gray-500">Faster Creation</p>
                  </div>
                  <div className="w-px h-12 bg-gradient-to-b from-orange-200 to-violet-200"></div>
                  <div>
                    <p className="font-playfair text-3xl font-bold bg-gradient-to-r from-[#00539F] to-violet-500 bg-clip-text text-transparent">98%</p>
                    <p className="text-sm font-opensans text-gray-500">Compliance Rate</p>
                  </div>
                  <div className="w-px h-12 bg-gradient-to-b from-violet-200 to-orange-200"></div>
                  <div>
                    <p className="font-playfair text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">50+</p>
                    <p className="text-sm font-opensans text-gray-500">Templates</p>
                  </div>
                </div>
              </div>

              {/* Right - Preview */}
              <div className="relative hidden lg:block">
                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-5 shadow-2xl border border-white/10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-4 text-xs text-gray-500 font-opensans">RetailSync Editor</span>
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
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="relative py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm font-opensans font-semibold text-orange-500 tracking-wider uppercase mb-3">The Problem</p>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Creating Retail Ads is <span className="text-red-500">Broken</span>
              </h2>
              <p className="font-opensans text-lg text-gray-600 max-w-2xl mx-auto">
                Traditional ad creation is slow, expensive, and error-prone. 
                Most brands struggle with compliance and consistency.
              </p>
            </div>

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
                <div key={index} className="bg-white rounded-2xl p-6 border-2 border-gray-800 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-4">
                    <span className="text-red-500 font-bold">{index + 1}</span>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{problem.title}</h3>
                  <p className="font-opensans text-sm text-gray-600 mb-4">{problem.description}</p>
                  <div className="pt-4 border-t border-gray-100">
                    <p className="font-playfair text-2xl font-bold text-red-500">{problem.stat}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{problem.statLabel}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section id="how-it-works" className="relative py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm font-opensans font-semibold bg-gradient-to-r from-violet-600 to-violet-500 bg-clip-text text-transparent tracking-wider uppercase mb-3">Our Solution</p>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                AI That <span className="bg-gradient-to-r from-violet-600 to-orange-500 bg-clip-text text-transparent">Understands</span> Retail
              </h2>
              <p className="font-opensans text-lg text-gray-600 max-w-2xl mx-auto">
                RetailSync AI combines deep learning with retail expertise to automate 
                ad creation while ensuring brand compliance.
              </p>
            </div>

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
                <div key={index} className="relative">
                  <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow h-full">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white font-bold text-lg mb-6`}>
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-xl text-gray-900 mb-3">{item.title}</h3>
                    <p className="font-opensans text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 text-gray-300 text-2xl">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Innovation Section */}
        <section className="relative py-24 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm font-opensans font-semibold bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent tracking-wider uppercase mb-3">Innovation</p>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                What Makes Us <span className="text-orange-400">Different</span>
              </h2>
              <p className="font-opensans text-lg text-gray-400 max-w-2xl mx-auto">
                Built specifically for retail media, not adapted from generic design tools.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: 'Real-Time Compliance Engine',
                  description: 'Our AI checks every element against Tesco brand guidelines instantly. No more rejection surprises.',
                  highlight: 'Trained on 10,000+ approved Tesco ads'
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: 'Smart Background Removal',
                  description: 'One-click product isolation using advanced AI. Perfect cutouts every time, no manual editing.',
                  highlight: 'Powered by Remove.bg API'
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  ),
                  title: 'AI Copywriting Assistant',
                  description: 'Generate compelling ad copy, headlines, and CTAs tailored to retail context. Groq-powered for speed.',
                  highlight: 'Retail-specific language model'
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  ),
                  title: 'Multi-Format Export',
                  description: 'Create once, export everywhere. Automatic resizing for leaderboards, squares, skyscrapers, and more.',
                  highlight: '15+ standard ad formats'
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-500 to-orange-500 flex items-center justify-center text-white mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-xl text-white mb-2">{feature.title}</h3>
                  <p className="font-opensans text-gray-400 text-sm mb-4">{feature.description}</p>
                  <p className="text-xs font-medium text-orange-400 uppercase tracking-wider">{feature.highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Workflow?
            </h2>
            <p className="font-opensans text-lg text-gray-600 mb-10">
              Join brands already saving hours on every campaign. Start free, no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/editor"
                className="px-10 py-4 bg-gradient-to-r from-[#00539F] via-violet-600 to-orange-500 text-white font-semibold rounded-xl hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                Open Editor — Free
              </Link>
              <Link
                href="/auth"
                className="px-10 py-4 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-violet-300 transition-colors"
              >
                Create Account
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative py-10 px-6 border-t border-gray-100 bg-gray-50">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00539F] to-violet-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <span className="font-playfair font-bold text-lg text-gray-900">RetailSync AI</span>
                <p className="text-xs text-gray-500">AI-Powered Ad Creation</p>
              </div>
            </div>
            <p className="text-sm font-opensans text-gray-500">
              © 2025 RetailSync AI — Built for Tesco Retail Media Hackathon
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
