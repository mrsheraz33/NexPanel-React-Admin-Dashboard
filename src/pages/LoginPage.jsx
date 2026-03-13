import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const LoginPage = () => {
  const { dark, toggleDark } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: 'admin@nexpanel.io', password: 'password123' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (!form.email)    errs.email    = 'Email is required'
    if (!form.password) errs.password = 'Password is required'
    if (form.password && form.password.length < 6) errs.password = 'Minimum 6 characters'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/dashboard')
    }, 1300)
  }

  const inp = `
    w-full rounded-xl px-4 py-3 text-sm border outline-none transition-all
    ${dark
      ? 'bg-gray-800 border-gray-700/80 text-gray-100 placeholder-gray-600 focus:border-brand-500 focus:shadow-[0_0_0_3px_rgba(30,179,168,0.15)]'
      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-brand-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(30,179,168,0.12)]'
    }
  `

  return (
    <div className={`min-h-screen flex ${dark ? 'bg-gray-950' : 'bg-slate-50'}`}>

      {/* ── Left Panel ── */}
      <div className="hidden lg:flex flex-col w-[52%] relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #061614 0%, #0d1b2a 50%, #0f172a 100%)' }}>

        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #1eb3a8 0%, transparent 70%)', transform: 'translate(-40%, -40%)' }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)', transform: 'translate(40%, 40%)' }} />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 flex flex-col h-full p-12">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-500 flex items-center justify-center shadow-brand">
              <i className="fa-solid fa-bolt text-white text-base" />
            </div>
            <span className="font-display font-bold text-[20px] grad-text">NexPanel</span>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-3">
              <span className="text-xs font-bold text-brand-400 tracking-[0.15em] uppercase">Admin Dashboard</span>
            </div>
            <h2 className="font-display text-[2.6rem] font-bold text-white leading-[1.1] mb-5">
              Manage everything<br/>from one beautiful<br/><span className="grad-text">dashboard.</span>
            </h2>
            <p className="text-gray-400 text-[15px] leading-relaxed max-w-sm">
              Built with React, Tailwind CSS & Chart.js.
              Clean architecture, stunning UI, fully responsive.
            </p>
          </div>

          {/* Feature cards */}
          <div className="space-y-3">
            {[
              { icon: 'fa-chart-line',  color: 'text-brand-400',  bg: 'bg-brand-500/10',  label: 'Revenue',  val: '+24.5%',   sub: 'vs last month'    },
              { icon: 'fa-users',       color: 'text-purple-400', bg: 'bg-purple-500/10', label: 'Users',    val: '12,489',   sub: 'total registered' },
              { icon: 'fa-bolt',        color: 'text-amber-400',  bg: 'bg-amber-500/10',  label: 'Uptime',   val: '99.9%',    sub: 'last 30 days'     },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/[0.07] backdrop-blur-sm">
                <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
                  <i className={`fa-solid ${s.icon} ${s.color} text-sm`} />
                </div>
                <div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                  <div className="text-white font-bold text-[15px]">{s.val}</div>
                </div>
                <div className="ml-auto text-xs text-gray-500">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-2 lg:hidden">
            <div className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center">
              <i className="fa-solid fa-bolt text-white text-sm" />
            </div>
            <span className="font-display font-bold text-[17px] grad-text">NexPanel</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={toggleDark}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all
                ${dark ? 'bg-gray-800 text-amber-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
              `}
            >
              <i className={`fa-solid ${dark ? 'fa-sun' : 'fa-moon'} text-sm`} />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-[400px] animate-fade-up">

            <div className="mb-8">
              <h1 className={`font-display text-[1.75rem] font-bold mb-1.5 ${dark ? 'text-white' : 'text-gray-900'}`}>
                Welcome back 👋
              </h1>
              <p className="text-sm text-gray-500">Sign in to access your dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>

              {/* Email */}
              <div>
                <label className={`block text-xs font-semibold mb-1.5 tracking-wide ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  className={`${inp} ${errors.email ? '!border-red-500 !shadow-[0_0_0_3px_rgba(239,68,68,0.15)]' : ''}`}
                  placeholder="admin@example.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className={`text-xs font-semibold tracking-wide ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                    PASSWORD
                  </label>
                  <button type="button" className="text-xs text-brand-400 hover:underline">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    className={`${inp} pr-11 ${errors.password ? '!border-red-500 !shadow-[0_0_0_3px_rgba(239,68,68,0.15)]' : ''}`}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(s => !s)}
                    className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors ${dark ? 'text-gray-500 hover:text-brand-400' : 'text-gray-400 hover:text-brand-600'}`}
                  >
                    <i className={`fa-solid ${showPass ? 'fa-eye-slash' : 'fa-eye'} text-sm`} />
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
              </div>

              {/* Remember */}
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" defaultChecked
                  className="w-4 h-4 rounded accent-brand-500 cursor-pointer" />
                <label htmlFor="remember" className={`text-sm cursor-pointer ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Keep me signed in for 30 days
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-500 hover:bg-brand-600 disabled:opacity-60 disabled:cursor-not-allowed
                  text-white font-bold py-3 rounded-xl transition-all duration-200
                  flex items-center justify-center gap-2
                  shadow-[0_8px_24px_-4px_rgba(30,179,168,0.4)] hover:shadow-[0_12px_32px_-4px_rgba(30,179,168,0.5)]
                  hover:-translate-y-0.5 active:translate-y-0"
              >
                {loading
                  ? <><i className="fa-solid fa-spinner fa-spin" /><span>Signing in...</span></>
                  : <><i className="fa-solid fa-right-to-bracket" /><span>Sign In to Dashboard</span></>
                }
              </button>
            </form>

            {/* Demo hint */}
            <div className={`mt-5 p-3.5 rounded-xl border text-center ${dark ? 'bg-gray-800/60 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <p className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-500'} mb-0.5`}>Demo credentials</p>
              <p className="font-mono text-xs text-brand-400">admin@nexpanel.io  /  password123</p>
            </div>

            <p className="text-xs text-center text-gray-600 mt-5">
              Developed by <span className="text-brand-400 font-semibold">Muhammad Sheeraz</span> — Full Stack Developer
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
