import { useEffect, useRef, useState } from 'react'
import { useApp } from '../context/AppContext'
import { Card, StatCard, SectionHeader, Badge, Avatar } from '../components/ui'
import { LineChart, BarChart, DonutChart } from '../components/charts'
import { RECENT_ORDERS, TOP_COUNTRIES, ACTIVITY } from '../data/dummyData'

const DashboardPage = () => {
  const { dark } = useApp()
  const [progVisible, setProgVisible] = useState(false)
  const progRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setProgVisible(true) },
      { threshold: 0.2 }
    )
    if (progRef.current) obs.observe(progRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="p-4 lg:p-6 space-y-6 page-enter">

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon="fa-dollar-sign"    label="Total Revenue"  value="$84,247"  change="12.5%" positive color="brand"  className="delay-1" />
        <StatCard icon="fa-users"          label="Total Users"    value="12,489"   change="8.2%"  positive color="purple" className="delay-2" />
        <StatCard icon="fa-cart-shopping"  label="Total Orders"   value="3,642"    change="5.1%"  positive color="blue"   className="delay-3" />
        <StatCard icon="fa-arrow-trend-up" label="Conversion Rate"value="3.8%"     change="1.2%"  positive={false} color="amber" className="delay-4" />
      </div>

      {/* ── Revenue + Traffic ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <Card className="xl:col-span-2 p-5 animate-fade-up delay-2">
          <SectionHeader title="Revenue Overview" subtitle="Full year 2024 performance" />
          <div style={{ height: 250 }}>
            <LineChart dark={dark} />
          </div>
        </Card>

        <Card className="p-5 animate-fade-up delay-3">
          <SectionHeader title="Traffic Sources" subtitle="Where users come from" />
          <div style={{ height: 200 }}>
            <DonutChart dark={dark} />
          </div>
        </Card>
      </div>

      {/* ── Bar + Countries + Quick Stats ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

        {/* Bar Chart */}
        <Card className="p-5 animate-fade-up delay-1">
          <SectionHeader title="New Users" subtitle="This week's daily signups" />
          <div style={{ height: 200 }}>
            <BarChart dark={dark} />
          </div>
        </Card>

        {/* Top Countries */}
        <Card className="p-5 animate-fade-up delay-2" ref={progRef}>
          <SectionHeader title="Top Countries" subtitle="User distribution by region" />
          <div className="space-y-4">
            {TOP_COUNTRIES.map((c, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-base leading-none">{c.code}</span>
                    <span className={`text-xs font-medium ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{c.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{c.users}</span>
                    <span className="font-mono text-xs text-gray-500">{c.pct}%</span>
                  </div>
                </div>
                <div className={`h-1.5 rounded-full ${dark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <div
                    className={`h-full rounded-full ${c.color} prog-fill`}
                    style={{ width: progVisible ? c.pct + '%' : '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Stats */}
        <Card className="p-5 animate-fade-up delay-3">
          <SectionHeader title="Quick Stats" subtitle="Server & session metrics" />
          <div className="space-y-2.5">
            {[
              { label: 'Avg. Session',    val: '4m 32s',  icon: 'fa-clock',       color: 'text-brand-400',  bg: 'bg-brand-500/10'  },
              { label: 'Bounce Rate',     val: '24.8%',   icon: 'fa-rotate-left', color: 'text-purple-400', bg: 'bg-purple-500/10' },
              { label: 'Pages/Session',   val: '5.2',     icon: 'fa-file-lines',  color: 'text-blue-400',   bg: 'bg-blue-500/10'   },
              { label: 'Active Now',      val: '842',     icon: 'fa-wifi',        color: 'text-green-400',  bg: 'bg-green-500/10'  },
              { label: 'Server Uptime',   val: '99.9%',   icon: 'fa-server',      color: 'text-amber-400',  bg: 'bg-amber-500/10'  },
            ].map((s, i) => (
              <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${dark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className={`w-7 h-7 rounded-lg ${s.bg} flex items-center justify-center flex-shrink-0`}>
                  <i className={`fa-solid ${s.icon} ${s.color} text-xs`} />
                </div>
                <span className={`text-sm flex-1 ${dark ? 'text-gray-300' : 'text-gray-600'}`}>{s.label}</span>
                <span className={`font-mono text-sm font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>{s.val}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── Recent Orders + Activity ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* Orders Table */}
        <Card className="xl:col-span-2 overflow-hidden animate-fade-up delay-1">
          <div className={`p-5 border-b ${dark ? 'border-gray-800' : 'border-gray-100'}`}>
            <SectionHeader title="Recent Orders" subtitle="Latest 5 transactions" action={() => {}} />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`text-[11px] font-bold uppercase tracking-wider ${dark ? 'text-gray-600 bg-gray-800/40' : 'text-gray-400 bg-gray-50'}`}>
                  {['Order','Customer','Amount','Status','Date'].map(h => (
                    <th key={h} className="px-5 py-3 text-left whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className={`divide-y ${dark ? 'divide-gray-800/60' : 'divide-gray-100'}`}>
                {RECENT_ORDERS.map((o, i) => (
                  <tr key={i} className={`tr-hover ${dark ? 'hover:bg-gray-800/30' : 'hover:bg-gray-50'}`}>
                    <td className="px-5 py-3.5 font-mono text-xs text-brand-400 font-semibold">{o.id}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <Avatar initials={o.customer.slice(0, 2).toUpperCase()} size="sm" color="brand" />
                        <span className={`text-sm font-medium whitespace-nowrap ${dark ? 'text-gray-200' : 'text-gray-800'}`}>{o.customer}</span>
                      </div>
                    </td>
                    <td className={`px-5 py-3.5 font-mono text-sm font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>{o.amount}</td>
                    <td className="px-5 py-3.5"><Badge status={o.status} /></td>
                    <td className="px-5 py-3.5 text-xs text-gray-500 whitespace-nowrap">{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Activity Feed */}
        <Card className="p-5 animate-fade-up delay-2">
          <SectionHeader title="Activity Feed" subtitle="Latest actions" />
          <div className="relative">
            <div className={`absolute left-3.5 top-0 bottom-0 w-px ${dark ? 'bg-gray-800' : 'bg-gray-200'}`} />
            <div className="space-y-5">
              {ACTIVITY.map((a, i) => (
                <div key={i} className="flex items-start gap-3.5 relative">
                  <div className={`w-7 h-7 rounded-xl ${a.bg} flex items-center justify-center flex-shrink-0 z-10 ring-2 ${dark ? 'ring-gray-900' : 'ring-white'}`}>
                    <i className={`fa-solid ${a.icon} ${a.color} text-[10px]`} />
                  </div>
                  <div className="pt-0.5 min-w-0">
                    <p className={`text-xs leading-5 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{a.action}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

    </div>
  )
}

export default DashboardPage
