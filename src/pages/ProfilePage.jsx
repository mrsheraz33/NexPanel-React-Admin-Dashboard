import { useEffect, useRef, useState } from 'react'
import { useApp } from '../context/AppContext'
import { Card } from '../components/ui'

const SKILLS = [
  { name: 'React.js',      pct: 92, color: 'bg-brand-500'   },
  { name: 'Node.js',       pct: 85, color: 'bg-purple-500'  },
  { name: 'MongoDB',       pct: 80, color: 'bg-blue-500'    },
  { name: 'Tailwind CSS',  pct: 95, color: 'bg-amber-500'   },
  { name: 'TypeScript',    pct: 72, color: 'bg-green-500'   },
  { name: 'Express.js',    pct: 88, color: 'bg-rose-500'    },
]

const PROJECTS = [
  { name: 'KaamYaab Platform',  tech: 'MERN + Socket.io',  status: 'Live',     color: 'bg-brand-500/15 text-brand-400'   },
  { name: 'DC LIMITED Portal',  tech: 'React + Node.js',   status: 'Live',     color: 'bg-green-500/15 text-green-400'   },
  { name: 'NexPanel Dashboard', tech: 'React + Tailwind',  status: 'Live',     color: 'bg-purple-500/15 text-purple-400' },
  { name: 'E-Commerce Store',   tech: 'MERN + JWT',        status: 'In Dev',   color: 'bg-amber-500/15 text-amber-400'   },
]

const ProfilePage = () => {
  const { dark } = useApp()
  const [progV, setProgV] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setProgV(true) }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="p-4 lg:p-6 space-y-5 page-enter">

      {/* ── Hero Card ── */}
      <Card className="overflow-hidden">
        {/* Cover */}
        <div className="h-36 relative" style={{
          background: 'linear-gradient(135deg, #061614 0%, #0d2844 50%, #130f2e 100%)',
        }}>
          <div className="absolute inset-0 opacity-25"
            style={{ backgroundImage: 'radial-gradient(circle at 25% 60%, #1eb3a8 0%, transparent 55%), radial-gradient(circle at 75% 40%, #8b5cf6 0%, transparent 50%)' }} />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <button className={`absolute top-3 right-3 text-xs px-3 py-1.5 rounded-lg font-semibold
            bg-white/10 text-white/70 hover:bg-white/20 transition-all backdrop-blur-sm border border-white/10`}>
            <i className="fa-solid fa-camera text-xs mr-1.5" />Edit Cover
          </button>
        </div>

        {/* Info */}
        <div className="px-5 sm:px-6 pb-6">
          <div className="flex flex-wrap items-end gap-4 -mt-10 mb-5">
            <div className={`w-20 h-20 rounded-2xl ring-4 flex-shrink-0
              bg-gradient-to-br from-brand-400 to-brand-600
              flex items-center justify-center text-2xl font-bold text-white
              ${dark ? 'ring-gray-900' : 'ring-white'} shadow-brand
            `}>
              MS
              <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-[3px] ${dark ? 'border-gray-900' : 'border-white'}`} />
            </div>

            <div className="flex-1 min-w-0 pb-1 mt-[25%] lg:mt-[7%] ">
              <h2 className={`font-display font-bold text-xl truncate ${dark ? 'text-white' : 'text-gray-900'}`}>
                Muhammad Sheeraz
              </h2>
              <p className="text-sm text-gray-500 truncate">
                Full Stack Developer · Rawalpindi, Pakistan 🇵🇰
              </p>
            </div>

            <button className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold px-4 py-2 rounded-xl transition-all shadow-brand">
              <i className="fa-solid fa-pen text-xs" />Edit Profile
            </button>
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {[
              { icon: 'fa-envelope',  val: 'sheeraz@example.com',              color: 'text-brand-400'  },
              { icon: 'fa-globe',     val: 'sheraz-portfolio-web.netlify.app',  color: 'text-purple-400' },
              { icon: 'fa-calendar',  val: 'Member since Jan 2024',             color: 'text-blue-400'   },
              { icon: 'fa-code',      val: '2+ years experience',               color: 'text-amber-400'  },
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <i className={`fa-solid ${m.icon} ${m.color} text-xs`} />
                <span className="text-xs text-gray-500">{m.val}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* ── Left Column ── */}
        <div className="space-y-5">

          {/* Stats */}
          <Card className="p-5">
            <h3 className={`font-display font-bold text-sm mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>Overview</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Projects',  val: '12',  icon: 'fa-folder-open', bg: 'bg-brand-500/12',  color: 'text-brand-400'  },
                { label: 'Clients',   val: '8',   icon: 'fa-handshake',   bg: 'bg-purple-500/12', color: 'text-purple-400' },
                { label: 'Earned',    val: '85K', icon: 'fa-wallet',      bg: 'bg-amber-500/12',  color: 'text-amber-400'  },
                { label: 'Rating',    val: '4.9', icon: 'fa-star',        bg: 'bg-green-500/12',  color: 'text-green-400'  },
              ].map((s, i) => (
                <div key={i} className={`p-3.5 rounded-xl ${dark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center mb-2.5`}>
                    <i className={`fa-solid ${s.icon} ${s.color} text-xs`} />
                  </div>
                  <div className={`font-display font-bold text-xl ${dark ? 'text-white' : 'text-gray-900'}`}>{s.val}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Tech badges */}
          <Card className="p-5">
            <h3 className={`font-display font-bold text-sm mb-3.5 ${dark ? 'text-white' : 'text-gray-900'}`}>Tech Stack</h3>
            <div className="flex flex-wrap gap-1.5">
              {['React','Node.js','MongoDB','Express','Tailwind','Socket.io','JWT','REST APIs','Git','Vercel','Netlify'].map(t => (
                <span key={t} className={`px-2.5 py-1 rounded-lg text-xs font-semibold border
                  ${dark ? 'bg-gray-800 border-gray-700 text-gray-300 hover:border-brand-500/40 hover:text-brand-400' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-brand-300 hover:text-brand-600'}
                  transition-all cursor-default
                `}>{t}</span>
              ))}
            </div>
          </Card>

          {/* Social */}
          <Card className="p-5">
            <h3 className={`font-display font-bold text-sm mb-3.5 ${dark ? 'text-white' : 'text-gray-900'}`}>Social Links</h3>
            <div className="space-y-2">
              {[
                { icon: 'fa-brands fa-github',   label: 'GitHub',   val: 'github.com/sheraz',      color: 'text-gray-300 bg-gray-700/50'  },
                { icon: 'fa-brands fa-linkedin',  label: 'LinkedIn', val: 'linkedin.com/in/sheraz', color: 'text-blue-400 bg-blue-500/10'  },
                { icon: 'fa-brands fa-whatsapp',  label: 'WhatsApp', val: '+92 300 0000000',        color: 'text-green-400 bg-green-500/10'},
              ].map((s, i) => (
                <a key={i} href="#" className={`flex items-center gap-3 p-2.5 rounded-xl transition-all
                  ${dark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}
                `}>
                  <div className={`w-8 h-8 rounded-lg ${s.color.split(' ')[1]} flex items-center justify-center flex-shrink-0`}>
                    <i className={`${s.icon} ${s.color.split(' ')[0]} text-sm`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className={`text-xs font-semibold ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{s.label}</div>
                    <div className="text-xs text-gray-500 truncate">{s.val}</div>
                  </div>
                  <i className="fa-solid fa-arrow-up-right-from-square text-[10px] text-gray-600 flex-shrink-0" />
                </a>
              ))}
            </div>
          </Card>
        </div>

        {/* ── Right Column ── */}
        <div className="lg:col-span-2 space-y-5">

          {/* About */}
          <Card className="p-5">
            <h3 className={`font-display font-bold text-sm mb-3 ${dark ? 'text-white' : 'text-gray-900'}`}>About Me</h3>
            <p className={`text-sm leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
              Full Stack Developer with 2+ years of hands-on experience building modern, scalable web applications
              using the MERN stack. Currently in 4th semester BSCS and actively freelancing with <strong className={dark ? 'text-gray-200' : 'text-gray-800'}>12+ successful projects</strong> delivered
              and <strong className={dark ? 'text-gray-200' : 'text-gray-800'}>85K+ PKR</strong> earned.
            </p>
            <p className={`text-sm leading-relaxed mt-2 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
              Passionate about writing clean, maintainable code and delivering pixel-perfect UIs. Targeting
              top Pakistani product companies like Arbisoft, Tkxel, and 10Pearls as the next career move.
            </p>
          </Card>

          {/* Skills */}
          <Card className="p-5" ref={ref}>
            <h3 className={`font-display font-bold text-sm mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>Technical Skills</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SKILLS.map((s, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-xs font-semibold ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{s.name}</span>
                    <span className="font-mono text-xs text-gray-500">{s.pct}%</span>
                  </div>
                  <div className={`h-2 rounded-full ${dark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <div className={`h-full rounded-full ${s.color} prog-fill`} style={{ width: progV ? s.pct + '%' : '0%' }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Projects */}
          <Card className="p-5">
            <h3 className={`font-display font-bold text-sm mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>Recent Projects</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PROJECTS.map((p, i) => (
                <div key={i} className={`p-4 rounded-xl border transition-all hover-card cursor-pointer
                  ${dark ? 'border-gray-800 bg-gray-800/50 hover:bg-gray-800' : 'border-gray-200 bg-gray-50 hover:bg-white'}
                `}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className={`font-semibold text-sm ${dark ? 'text-gray-100' : 'text-gray-900'}`}>{p.name}</div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.color} whitespace-nowrap`}>{p.status}</span>
                  </div>
                  <div className="text-xs text-gray-500">{p.tech}</div>
                  <div className="flex items-center gap-3 mt-3">
                    <button className="text-xs text-brand-400 hover:underline font-semibold">GitHub →</button>
                    <button className="text-xs text-gray-500 hover:underline">Live Demo</button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
