import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui';

export default function AnalyticsPage() {
  const metrics = [
    { label: 'Total Impressions', value: '2.4M', change: '+18%', trend: 'up' },
    { label: 'Click-Through Rate', value: '3.2%', change: '+0.4%', trend: 'up' },
    { label: 'Conversions', value: '12,847', change: '+24%', trend: 'up' },
    { label: 'Revenue Generated', value: '£48,290', change: '+31%', trend: 'up' },
  ];

  const topAds = [
    { name: 'Summer Sale Banner', impressions: '456K', ctr: '4.2%', conversions: '2,341' },
    { name: 'Clubcard Exclusive', impressions: '389K', ctr: '3.8%', conversions: '1,892' },
    { name: 'Fresh Produce Deal', impressions: '312K', ctr: '3.5%', conversions: '1,567' },
    { name: 'Weekend Specials', impressions: '287K', ctr: '3.1%', conversions: '1,234' },
    { name: 'Holiday Campaign', impressions: '245K', ctr: '2.9%', conversions: '987' },
  ];

  const complianceHistory = [
    { month: 'Jul', score: 82 },
    { month: 'Aug', score: 85 },
    { month: 'Sep', score: 88 },
    { month: 'Oct', score: 91 },
    { month: 'Nov', score: 94 },
    { month: 'Dec', score: 96 },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
              <p className="text-gray-600 mt-1">Track your ad performance and compliance metrics.</p>
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>This year</option>
              </select>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition-colors">
                Export Report
              </button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {metrics.map((metric, index) => (
              <Card key={index}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{metric.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{metric.value}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    metric.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {metric.change}
                  </span>
                </div>
                {/* Mini Chart Placeholder */}
                <div className="mt-4 h-12 bg-gradient-to-r from-primary-100 to-primary-50 rounded-lg flex items-end px-1 gap-1">
                  {[40, 55, 45, 70, 60, 80, 75].map((h, i) => (
                    <div key={i} className="flex-1 bg-primary-500 rounded-t" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Performance Chart */}
            <div className="lg:col-span-2">
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Performance Overview</h2>
                  <div className="flex gap-4 text-sm">
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-primary-500 rounded-full"></span>
                      Impressions
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-accent-500 rounded-full"></span>
                      Clicks
                    </span>
                  </div>
                </div>
                {/* Chart Placeholder */}
                <div className="h-64 bg-gradient-to-b from-primary-50 to-white rounded-lg flex items-end px-4 pb-4 gap-4">
                  {[65, 45, 78, 52, 89, 67, 94, 72, 85, 91, 78, 96].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col gap-1">
                      <div className="bg-primary-500/20 rounded-t relative" style={{ height: `${h}%` }}>
                        <div className="absolute bottom-0 left-0 right-0 bg-primary-500 rounded-t" style={{ height: '60%' }} />
                      </div>
                      <span className="text-xs text-gray-400 text-center">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Compliance Score */}
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Compliance Trend</h2>
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="56" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                    <circle 
                      cx="64" cy="64" r="56" fill="none" 
                      stroke="url(#gradient)"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray="352"
                      strokeDashoffset="14"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#7c3aed" />
                        <stop offset="100%" stopColor="#f97316" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-3xl font-bold text-gray-900">96%</span>
                    <span className="text-xs text-gray-500">Avg Score</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                {complianceHistory.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 w-8">{item.month}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div 
                        className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-700 w-8">{item.score}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Top Performing Ads */}
          <Card className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Top Performing Ads</h2>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All →
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Ad Name</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Impressions</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">CTR</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Conversions</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {topAds.map((ad, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded" />
                          <span className="font-medium text-gray-900">{ad.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right text-gray-600">{ad.impressions}</td>
                      <td className="py-4 px-4 text-right text-gray-600">{ad.ctr}</td>
                      <td className="py-4 px-4 text-right text-gray-600">{ad.conversions}</td>
                      <td className="py-4 px-4">
                        <div className="flex justify-end">
                          <div className="w-24 bg-gray-100 rounded-full h-2">
                            <div 
                              className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                              style={{ width: `${100 - index * 15}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
