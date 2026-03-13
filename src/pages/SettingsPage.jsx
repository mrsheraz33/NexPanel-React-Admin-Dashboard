import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Card, Toggle } from '../components/ui'

const TABS = [
  { id: 'general',       icon: 'fa-user',           label: 'General'       },
  { id: 'security',      icon: 'fa-lock',           label: 'Security'      },
  { id: 'notifications', icon: 'fa-bell',           label: 'Notifications' },
  { id: 'appearance',    icon: 'fa-palette',        label: 'Appearance'    },
  { id: 'billing',       icon: 'fa-credit-card',    label: 'Billing'       },
]

const SettingsPage = () => {
  const { dark, toggleDark } = useApp()
  const [tab, setTab] = useState('general')
  const [toast, setToast] = useState(false)
  const [notifs, setNotifs] = useState({
    email: true, push: false, sms: true, marketing: false, security: true,
  })

  const save = () => {
    setToast(true)
    setTimeout(() => setToast(false), 2500)
  }

  const inp = `
    w-full rounded-xl px-4 py-2.5 text-sm border outline-none transition-all
    ${dark
      ? 'bg-gray-800 border-gray-700/80 text-gray-100 placeholder-gray-600 focus:border-brand-500 focus:shadow-[0_0_0_3px_rgba(30,179,168,0.15)]'
      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-brand-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(30,179,168,0.12)]'
    }
  `

  const ToggleRow = ({ label, desc, val, onChg }) => (
    <div className={`flex items-center justify-between p-4 rounded-xl ${dark ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div>
        <div className={`text-sm font-semibold ${dark ? 'text-gray-200' : 'text-gray-800'}`}>{label}</div>
        <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
      </div>
      <Toggle on={val} onChange={onChg} />
    </div>
  )

  return (
    <div className="p-4 lg:p-6 space-y-5 page-enter">

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-[100] flex items-center gap-2.5 bg-green-500 text-white px-4 py-3 rounded-2xl shadow-2xl animate-bounce-in">
          <i className="fa-solid fa-circle-check" />
          <span className="text-sm font-semibold">Changes saved successfully!</span>
        </div>
      )}

      <div>
        <h2 className={`font-display font-bold text-lg ${dark ? 'text-white' : 'text-gray-900'}`}>Settings</h2>
        <p className="text-xs text-gray-500 mt-0.5">Manage your account, security and preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 flex-wrap">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all
              ${tab === t.id
                ? 'bg-brand-500 text-white shadow-brand'
                : dark ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            <i className={`fa-solid ${t.icon} text-[11px]`} />
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* ── General ── */}
      {tab === 'general' && (
        <Card className="p-5 sm:p-6 space-y-5 animate-fade-up">
          <h3 className={`font-display font-bold text-base ${dark ? 'text-white' : 'text-gray-900'}`}>Profile Information</h3>

          {/* Avatar row */}
          <div className={`flex items-center gap-4 p-4 rounded-xl ${dark ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-2xl font-bold text-white flex-shrink-0 shadow-brand">
              MS
            </div>
            <div>
              <p className={`text-sm font-semibold ${dark ? 'text-gray-200' : 'text-gray-800'}`}>Profile Photo</p>
              <p className="text-xs text-gray-500 mb-2">JPG, PNG or GIF · max 2MB</p>
              <div className="flex items-center gap-2">
                <button className="text-xs font-semibold text-brand-400 hover:underline">Upload New</button>
                <span className="text-gray-700">·</span>
                <button className="text-xs text-gray-500 hover:underline">Remove</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'FIRST NAME',    val: 'Muhammad',                          type: 'text'  },
              { label: 'LAST NAME',     val: 'Sheeraz',                           type: 'text'  },
              { label: 'EMAIL ADDRESS', val: 'sheeraz@example.com',               type: 'email' },
              { label: 'PHONE NUMBER',  val: '+92 300 0000000',                   type: 'tel'   },
              { label: 'USERNAME',      val: 'sherazdev',                         type: 'text'  },
              { label: 'WEBSITE',       val: 'sheraz-portfolio-web.netlify.app',  type: 'url'   },
            ].map((f, i) => (
              <div key={i}>
                <label className={`block text-[10px] font-bold mb-1.5 tracking-widest ${dark ? 'text-gray-500' : 'text-gray-500'}`}>{f.label}</label>
                <input type={f.type} defaultValue={f.val} className={inp} />
              </div>
            ))}
          </div>

          <div>
            <label className={`block text-[10px] font-bold mb-1.5 tracking-widest ${dark ? 'text-gray-500' : 'text-gray-500'}`}>BIO</label>
            <textarea
              rows={3}
              defaultValue="Full Stack Developer passionate about building modern web applications using the MERN stack."
              className={`${inp} resize-none`}
            />
          </div>

          <div className="flex items-center gap-3">
            <button onClick={save} className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all shadow-brand">
              <i className="fa-solid fa-floppy-disk text-xs" />Save Changes
            </button>
            <button className={`text-sm font-semibold px-5 py-2.5 rounded-xl transition-all border
              ${dark ? 'border-gray-700 text-gray-400 hover:bg-gray-800' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}
            `}>
              Discard
            </button>
          </div>
        </Card>
      )}

      {/* ── Security ── */}
      {tab === 'security' && (
        <Card className="p-5 sm:p-6 space-y-5 animate-fade-up">
          <h3 className={`font-display font-bold text-base ${dark ? 'text-white' : 'text-gray-900'}`}>Security Settings</h3>

          <div className="max-w-md space-y-4">
            {[
              { label: 'CURRENT PASSWORD', placeholder: 'Enter current password' },
              { label: 'NEW PASSWORD',     placeholder: 'Min. 8 characters'      },
              { label: 'CONFIRM PASSWORD', placeholder: 'Repeat new password'    },
            ].map((f, i) => (
              <div key={i}>
                <label className={`block text-[10px] font-bold mb-1.5 tracking-widest ${dark ? 'text-gray-500' : 'text-gray-500'}`}>{f.label}</label>
                <input type="password" placeholder={f.placeholder} className={inp} />
              </div>
            ))}
          </div>

          <div className="space-y-3 max-w-md">
            <ToggleRow label="Two-Factor Authentication" desc="Extra security layer via authenticator app" val={true} onChg={() => {}} />
            <ToggleRow label="Login Alerts" desc="Get notified when someone signs into your account" val={true} onChg={() => {}} />
            <ToggleRow label="Suspicious Activity Detection" desc="Alert me about unusual login attempts" val={false} onChg={() => {}} />
          </div>

          <div className={`p-4 rounded-xl border ${dark ? 'bg-red-500/5 border-red-500/20' : 'bg-red-50 border-red-200'}`}>
            <div className={`text-sm font-semibold mb-1 ${dark ? 'text-red-400' : 'text-red-600'}`}>Danger Zone</div>
            <p className="text-xs text-gray-500 mb-3">Once you delete your account, there is no going back.</p>
            <button className="text-xs font-bold text-red-400 border border-red-500/30 px-4 py-2 rounded-xl hover:bg-red-500/10 transition-all">
              Delete Account
            </button>
          </div>

          <button onClick={save} className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all shadow-brand">
            <i className="fa-solid fa-lock text-xs" />Update Password
          </button>
        </Card>
      )}

      {/* ── Notifications ── */}
      {tab === 'notifications' && (
        <Card className="p-5 sm:p-6 space-y-4 animate-fade-up">
          <div className="mb-1">
            <h3 className={`font-display font-bold text-base ${dark ? 'text-white' : 'text-gray-900'}`}>Notification Preferences</h3>
            <p className="text-xs text-gray-500 mt-0.5">Choose how and when you want to be notified.</p>
          </div>
          <ToggleRow label="Email Notifications" desc="Receive daily summary and important alerts via email" val={notifs.email} onChg={v => setNotifs(p => ({ ...p, email: v }))} />
          <ToggleRow label="Push Notifications" desc="In-browser push notifications" val={notifs.push} onChg={v => setNotifs(p => ({ ...p, push: v }))} />
          <ToggleRow label="SMS Notifications" desc="Critical alerts via SMS" val={notifs.sms} onChg={v => setNotifs(p => ({ ...p, sms: v }))} />
          <ToggleRow label="Marketing Emails" desc="Promotions, new features and updates" val={notifs.marketing} onChg={v => setNotifs(p => ({ ...p, marketing: v }))} />
          <ToggleRow label="Security Alerts" desc="Login attempts and security events" val={notifs.security} onChg={v => setNotifs(p => ({ ...p, security: v }))} />
          <button onClick={save} className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all shadow-brand">
            <i className="fa-solid fa-floppy-disk text-xs" />Save Preferences
          </button>
        </Card>
      )}

      {/* ── Appearance ── */}
      {tab === 'appearance' && (
        <Card className="p-5 sm:p-6 space-y-5 animate-fade-up">
          <h3 className={`font-display font-bold text-base ${dark ? 'text-white' : 'text-gray-900'}`}>Appearance</h3>

          {/* Theme */}
          <div>
            <p className={`text-xs font-bold tracking-wider uppercase mb-3 ${dark ? 'text-gray-500' : 'text-gray-500'}`}>Theme</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-sm">
              {[
                { id: 'dark',   icon: 'fa-moon',    label: 'Dark'   },
                { id: 'light',  icon: 'fa-sun',     label: 'Light'  },
                { id: 'system', icon: 'fa-laptop',  label: 'System' },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => { if ((dark && t.id === 'light') || (!dark && t.id === 'dark')) toggleDark() }}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all
                    ${(dark && t.id === 'dark') || (!dark && t.id === 'light')
                      ? 'border-brand-500 bg-brand-500/10'
                      : dark ? 'border-gray-700 bg-gray-800 hover:border-gray-600' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                    }
                  `}
                >
                  <i className={`fa-solid ${t.icon} text-lg ${(dark && t.id === 'dark') || (!dark && t.id === 'light') ? 'text-brand-400' : 'text-gray-500'}`} />
                  <span className={`text-xs font-semibold ${(dark && t.id === 'dark') || (!dark && t.id === 'light') ? 'text-brand-400' : 'text-gray-500'}`}>{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Accent color */}
          <div>
            <p className={`text-xs font-bold tracking-wider uppercase mb-3 ${dark ? 'text-gray-500' : 'text-gray-500'}`}>Accent Color</p>
            <div className="flex gap-2 flex-wrap">
              {[
                { color: 'bg-brand-500',   ring: 'ring-brand-500'   },
                { color: 'bg-purple-500',  ring: 'ring-purple-500'  },
                { color: 'bg-blue-500',    ring: 'ring-blue-500'    },
                { color: 'bg-rose-500',    ring: 'ring-rose-500'    },
                { color: 'bg-amber-500',   ring: 'ring-amber-500'   },
                { color: 'bg-green-500',   ring: 'ring-green-500'   },
              ].map((c, i) => (
                <button key={i} className={`w-9 h-9 rounded-xl ${c.color} transition-all hover:scale-110 ${i === 0 ? `ring-2 ring-offset-2 ${c.ring} ${dark ? 'ring-offset-gray-900' : 'ring-offset-white'}` : ''}`} />
              ))}
            </div>
          </div>

          {/* Font size */}
          <div>
            <p className={`text-xs font-bold tracking-wider uppercase mb-3 ${dark ? 'text-gray-500' : 'text-gray-500'}`}>Font Size</p>
            <div className="flex gap-2">
              {['Small', 'Medium', 'Large'].map((s, i) => (
                <button key={i} className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all border
                  ${i === 1
                    ? 'bg-brand-500 text-white border-brand-500 shadow-brand'
                    : dark ? 'border-gray-700 text-gray-400 hover:bg-gray-800' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }
                `}>{s}</button>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <ToggleRow label="Compact Sidebar" desc="Use collapsed sidebar by default" val={false} onChg={() => {}} />
        </Card>
      )}

      {/* ── Billing ── */}
      {tab === 'billing' && (
        <div className="space-y-5 animate-fade-up">

          {/* Current Plan */}
          <Card className="p-5 sm:p-6">
            <h3 className={`font-display font-bold text-base mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>Current Plan</h3>
            <div className={`p-5 rounded-2xl mb-5 border relative overflow-hidden
              ${dark ? 'bg-gradient-to-r from-brand-950/80 to-purple-950/60 border-brand-800/50' : 'bg-gradient-to-r from-brand-50 to-purple-50 border-brand-200'}
            `}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className={`font-display font-bold text-xl mb-0.5 ${dark ? 'text-white' : 'text-gray-900'}`}>Pro Plan</div>
                  <div className="text-sm text-gray-500">Renews on January 12, 2025</div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-dot" />
                    <span className="text-xs text-green-400 font-semibold">Active</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-display font-bold text-3xl ${dark ? 'text-white' : 'text-gray-900'}`}>
                    $29<span className="text-base font-normal text-gray-500">/mo</span>
                  </div>
                  <button className="text-xs text-brand-400 hover:underline mt-1 block">Upgrade to Enterprise →</button>
                </div>
              </div>
            </div>

            {/* Usage */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Team Members', used: 12, max: 50,    unit: '',   color: 'bg-brand-500'  },
                { label: 'Storage',      used: 4.2,max: 20,    unit: 'GB', color: 'bg-purple-500' },
                { label: 'API Calls',    used: 8400,max:50000, unit: '',   color: 'bg-blue-500'   },
              ].map((r, i) => {
                const pct = Math.round((r.used / r.max) * 100)
                return (
                  <div key={i} className={`p-4 rounded-xl ${dark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <div className="flex justify-between text-xs mb-2">
                      <span className={dark ? 'text-gray-400' : 'text-gray-600'}>{r.label}</span>
                      <span className="font-mono text-gray-500 font-semibold">{pct}%</span>
                    </div>
                    <div className={`h-2 rounded-full mb-2 ${dark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div className={`h-full ${r.color} rounded-full transition-all`} style={{ width: pct + '%' }} />
                    </div>
                    <div className="text-xs text-gray-500">
                      {r.used}{r.unit} of {r.max}{r.unit}
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Payment Method */}
          <Card className="p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-display font-bold text-base ${dark ? 'text-white' : 'text-gray-900'}`}>Payment Method</h3>
              <button className="text-xs font-semibold text-brand-400 hover:underline">+ Add New</button>
            </div>
            <div className={`flex items-center gap-4 p-4 rounded-xl border ${dark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="w-14 h-9 rounded-lg bg-gradient-to-r from-blue-700 to-blue-500 flex items-center justify-center flex-shrink-0">
                <i className="fa-brands fa-cc-visa text-white text-xl" />
              </div>
              <div>
                <div className={`text-sm font-semibold ${dark ? 'text-gray-200' : 'text-gray-800'}`}>Visa ending in 4242</div>
                <div className="text-xs text-gray-500">Expires 12/2026 · Default</div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <button className="text-xs text-brand-400 hover:underline font-semibold">Edit</button>
                <button className="text-xs text-red-400 hover:underline">Remove</button>
              </div>
            </div>
          </Card>

          {/* Invoices */}
          <Card className="overflow-hidden">
            <div className={`flex items-center justify-between p-5 border-b ${dark ? 'border-gray-800' : 'border-gray-100'}`}>
              <h3 className={`font-display font-bold text-base ${dark ? 'text-white' : 'text-gray-900'}`}>Recent Invoices</h3>
              <button className="text-xs font-semibold text-brand-400 hover:underline">Download All</button>
            </div>
            {[
              { date: 'Jan 12, 2025', amount: '$29.00', status: 'Paid' },
              { date: 'Dec 12, 2024', amount: '$29.00', status: 'Paid' },
              { date: 'Nov 12, 2024', amount: '$29.00', status: 'Paid' },
            ].map((inv, i) => (
              <div key={i} className={`flex items-center gap-4 px-5 py-4 border-b last:border-0 ${dark ? 'border-gray-800' : 'border-gray-100'}`}>
                <div className={`w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0`}>
                  <i className="fa-solid fa-file-invoice text-green-400 text-xs" />
                </div>
                <div>
                  <div className={`text-sm font-semibold ${dark ? 'text-gray-200' : 'text-gray-800'}`}>Pro Plan – {inv.date}</div>
                  <div className="text-xs text-gray-500">{inv.amount}</div>
                </div>
                <span className="ml-auto text-xs font-semibold text-green-400 bg-green-500/10 px-2.5 py-1 rounded-lg">{inv.status}</span>
                <button className={`text-xs ${dark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-700'} transition-colors`}>
                  <i className="fa-solid fa-download" />
                </button>
              </div>
            ))}
          </Card>
        </div>
      )}

    </div>
  )
}

export default SettingsPage
