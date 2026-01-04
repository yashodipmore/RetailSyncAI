import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui';
import Link from 'next/link';

export default function DashboardPage() {
  const recentAds = [
    { id: '1', name: 'Summer Sale Banner', status: 'approved', score: 98, date: '2 hours ago', size: '728x90' },
    { id: '2', name: 'Product Spotlight', status: 'pending', score: 85, date: '5 hours ago', size: '300x250' },
    { id: '3', name: 'Holiday Campaign', status: 'draft', score: 72, date: '1 day ago', size: '160x600' },
    { id: '4', name: 'Flash Deal Alert', status: 'approved', score: 95, date: '2 days ago', size: '970x250' },
  ];

  const stats = [
    { label: 'Total Ads', value: '24', change: '+12%', icon: '📊' },
    { label: 'Approved', value: '18', change: '+8%', icon: '✅' },
    { label: 'Pending Review', value: '4', change: '-2%', icon: '⏳' },
    { label: 'Avg. Compliance', value: '94%', change: '+5%', icon: '🎯' },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back! Here&apos;s your ad performance overview.</p>
            </div>
            <Link
              href="/editor"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-glow"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Ad
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="relative overflow-hidden">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <span className="text-3xl">{stat.icon}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500" />
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Ads */}
            <div className="lg:col-span-2">
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Ads</h2>
                  <Link href="/ads" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View All →
                  </Link>
                </div>
                <div className="space-y-4">
                  {recentAds.map((ad) => (
                    <div key={ad.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="w-16 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-medium">{ad.size}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{ad.name}</h3>
                        <p className="text-sm text-gray-500">{ad.date}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        ad.status === 'approved' ? 'bg-green-100 text-green-700' :
                        ad.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {ad.status}
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          ad.score >= 90 ? 'text-green-600' :
                          ad.score >= 70 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>{ad.score}%</p>
                        <p className="text-xs text-gray-500">Compliance</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Quick Actions & Tips */}
            <div className="space-y-6">
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Link href="/editor" className="flex items-center gap-3 p-3 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors">
                    <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-900">Create New Ad</span>
                  </Link>
                  <Link href="/templates" className="flex items-center gap-3 p-3 bg-accent-50 rounded-xl hover:bg-accent-100 transition-colors">
                    <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-900">Browse Templates</span>
                  </Link>
                  <button className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-900">Import Assets</span>
                  </button>
                </div>
              </Card>

              <Card variant="gradient" padding="lg">
                <div className="text-white">
                  <h3 className="font-semibold text-lg mb-2">💡 Pro Tip</h3>
                  <p className="text-sm opacity-90 leading-relaxed">
                    Use AI Assist to automatically optimize your ad layouts and improve compliance scores by up to 25%.
                  </p>
                  <button className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">
                    Learn More
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
