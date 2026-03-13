// ─────────────────────────────────────────────────
//  Reusable UI primitives
// ─────────────────────────────────────────────────
import { useApp } from '../../context/AppContext'

// ── Avatar ────────────────────────────────────────
const AVATAR_COLORS = {
  brand:  'bg-brand-500/20  text-brand-400  ring-brand-500/30',
  purple: 'bg-purple-500/20 text-purple-400 ring-purple-500/30',
  blue:   'bg-blue-500/20   text-blue-400   ring-blue-500/30',
  amber:  'bg-amber-500/20  text-amber-400  ring-amber-500/30',
  green:  'bg-green-500/20  text-green-400  ring-green-500/30',
  rose:   'bg-rose-500/20   text-rose-400   ring-rose-500/30',
}
const AVATAR_SIZES = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-xs',
  md: 'w-9 h-9 text-sm',
  lg: 'w-11 h-11 text-sm',
  xl: 'w-14 h-14 text-base',
  '2xl':'w-20 h-20 text-xl',
}

export const Avatar = ({ initials, size = 'md', color = 'brand', className = '' }) => (
  <div className={`
    ${AVATAR_SIZES[size]} ${AVATAR_COLORS[color]}
    rounded-xl flex items-center justify-center font-bold ring-1 flex-shrink-0 select-none
    ${className}
  `}>
    {initials}
  </div>
)

// ── Badge ─────────────────────────────────────────
const BADGE_STYLES = {
  Active:    'bg-green-500/12  text-green-400  border-green-500/20',
  Inactive:  'bg-gray-500/12   text-gray-400   border-gray-500/20',
  Pending:   'bg-amber-500/12  text-amber-400  border-amber-500/20',
  Admin:     'bg-brand-500/12  text-brand-400  border-brand-500/20',
  Editor:    'bg-purple-500/12 text-purple-400 border-purple-500/20',
  Manager:   'bg-blue-500/12   text-blue-400   border-blue-500/20',
  User:      'bg-gray-500/12   text-gray-400   border-gray-500/20',
  Completed: 'bg-green-500/12  text-green-400  border-green-500/20',
  Failed:    'bg-red-500/12    text-red-400    border-red-500/20',
  Cancelled: 'bg-red-500/12    text-red-400    border-red-500/20',
}

export const Badge = ({ status, className = '' }) => (
  <span className={`
    inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border
    ${BADGE_STYLES[status] || BADGE_STYLES.User}
    ${className}
  `}>
    <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-70" />
    {status}
  </span>
)

// ── Card ──────────────────────────────────────────
export const Card = ({ children, className = '', hover = false }) => {
  const { dark } = useApp()
  return (
    <div className={`
      rounded-2xl border
      ${dark
        ? 'bg-gray-900 border-gray-800/60 shadow-card-dark'
        : 'bg-white border-gray-200/80 shadow-card'}
      ${hover ? 'hover-card cursor-pointer' : ''}
      ${className}
    `}>
      {children}
    </div>
  )
}

// ── Toggle ────────────────────────────────────────
export const Toggle = ({ on, onChange, size = 'md' }) => (
  <div
    className={`toggle-track ${on ? 'on' : ''}`}
    style={{ background: on ? '#1eb3a8' : '#374151' }}
    onClick={() => onChange(!on)}
    role="switch"
    aria-checked={on}
  >
    <div className="toggle-thumb" />
  </div>
)

// ── Stat Card ─────────────────────────────────────
const STAT_ICON_COLORS = {
  brand:  { bg: 'bg-brand-500/12',  icon: 'text-brand-400',  ring: 'ring-brand-500/20'  },
  purple: { bg: 'bg-purple-500/12', icon: 'text-purple-400', ring: 'ring-purple-500/20' },
  blue:   { bg: 'bg-blue-500/12',   icon: 'text-blue-400',   ring: 'ring-blue-500/20'   },
  amber:  { bg: 'bg-amber-500/12',  icon: 'text-amber-400',  ring: 'ring-amber-500/20'  },
  green:  { bg: 'bg-green-500/12',  icon: 'text-green-400',  ring: 'ring-green-500/20'  },
  rose:   { bg: 'bg-rose-500/12',   icon: 'text-rose-400',   ring: 'ring-rose-500/20'   },
}

export const StatCard = ({ icon, label, value, change, positive, color = 'brand', className = '' }) => {
  const { dark } = useApp()
  const c = STAT_ICON_COLORS[color]
  return (
    <div className={`
      stat-card rounded-2xl border p-5 animate-fade-up
      ${dark ? 'bg-gray-900 border-gray-800/60' : 'bg-white border-gray-200/80 shadow-card'}
      ${className}
    `}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl ${c.bg} ring-1 ${c.ring} flex items-center justify-center`}>
          <i className={`fa-solid ${icon} ${c.icon} text-[17px]`} />
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg ${positive
          ? 'bg-green-500/10 text-green-400'
          : 'bg-red-500/10 text-red-400'
        }`}>
          <i className={`fa-solid fa-arrow-${positive ? 'up' : 'down'} text-[9px]`} />
          {change}
        </div>
      </div>
      <div className={`font-display text-2xl font-bold mb-0.5 tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}>
        {value}
      </div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  )
}

// ── Section Header ────────────────────────────────
export const SectionHeader = ({ title, subtitle, action, actionLabel = 'View all →' }) => {
  const { dark } = useApp()
  return (
    <div className="flex items-start justify-between gap-4 mb-5">
      <div>
        <h3 className={`font-display font-bold text-[15px] leading-tight ${dark ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h3>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {action && (
        <button onClick={action} className="text-xs font-semibold text-brand-400 hover:text-brand-300 transition-colors whitespace-nowrap">
          {actionLabel}
        </button>
      )}
    </div>
  )
}

// ── Empty State ───────────────────────────────────
export const EmptyState = ({ icon = 'fa-inbox', title = 'No data found', desc = '' }) => {
  const { dark } = useApp()
  return (
    <div className="py-16 flex flex-col items-center gap-3 text-center">
      <div className={`w-14 h-14 rounded-2xl ${dark ? 'bg-gray-800' : 'bg-gray-100'} flex items-center justify-center`}>
        <i className={`fa-solid ${icon} text-xl text-gray-500`} />
      </div>
      <div className={`font-semibold ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{title}</div>
      {desc && <div className="text-sm text-gray-500 max-w-xs">{desc}</div>}
    </div>
  )
}

// ── Input Field ───────────────────────────────────
export const InputField = ({ label, error, className = '', ...props }) => {
  const { dark } = useApp()
  return (
    <div className={className}>
      {label && (
        <label className={`block text-xs font-semibold mb-1.5 tracking-wide ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
          {label}
        </label>
      )}
      <input
        className={`input-field ${
          dark
            ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-600 focus:bg-gray-800'
            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white'
        } ${error ? '!border-red-500' : ''}`}
        {...props}
      />
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  )
}
