import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { Avatar, Badge } from '../ui'
import { NOTIFICATIONS } from '../../data/dummyData'

const PAGE_TITLES = {
  '/dashboard': { title: 'Dashboard',  sub: 'Welcome back, Sheeraz 👋' },
  '/users':     { title: 'Users',      sub: 'Manage your team members' },
  '/profile':   { title: 'My Profile', sub: 'View and edit your profile' },
  '/settings':  { title: 'Settings',   sub: 'Manage preferences & account' },
}

const Topbar = () => {
  const { dark, toggleDark, openSidebar } = useApp()
  const location = useLocation()
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [search, setSearch] = useState('')
  const notifRef = useRef(null)
  const profileRef = useRef(null)

  const { title, sub } = PAGE_TITLES[location.pathname] || PAGE_TITLES['/dashboard']
  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header className={`
      h-16 flex items-center gap-3 px-4 lg:px-6 flex-shrink-0 border-b
      ${dark ? 'bg-gray-900 border-gray-800/60' : 'bg-white border-gray-200 shadow-sm'}
    `}>

      {/* Mobile menu */}
      <button
        onClick={openSidebar}
        className={`lg:hidden w-9 h-9 rounded-xl flex items-center justify-center
          ${dark ? 'text-gray-400 hover:bg-gray-800 hover:text-brand-400' : 'text-gray-600 hover:bg-gray-100 hover:text-brand-600'}
        `}
      >
        <i className="fa-solid fa-bars text-base" />
      </button>

      {/* Page title */}
      <div className="min-w-0">
        <h1 className={`font-display font-bold text-[17px] leading-tight truncate ${dark ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h1>
        <p className="text-xs text-gray-500 hidden sm:block truncate">{sub}</p>
      </div>

      {/* Search — desktop */}
      <div className={`
        hidden md:flex items-center gap-2 rounded-xl border px-3 py-2 ml-6 transition-all duration-200
        ${dark ? 'bg-gray-800 border-gray-700/50 focus-within:border-brand-500/60 focus-within:bg-gray-800' : 'bg-gray-50 border-gray-200 focus-within:border-brand-500 focus-within:bg-white'}
      `} style={{ minWidth: 220 }}>
        <i className="fa-solid fa-search text-gray-500 text-xs flex-shrink-0" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search..."
          className={`bg-transparent text-sm outline-none flex-1 min-w-0 ${dark ? 'text-gray-300 placeholder-gray-600' : 'text-gray-700 placeholder-gray-400'}`}
        />
        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md flex-shrink-0 ${dark ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-500'}`}>
          ⌘K
        </span>
      </div>

      {/* Right actions */}
      <div className="ml-auto flex items-center gap-1.5">

        {/* Dark mode */}
        <button
          onClick={toggleDark}
          title={dark ? 'Switch to light' : 'Switch to dark'}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all
            ${dark ? 'bg-gray-800 text-amber-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
          `}
        >
          <i className={`fa-solid ${dark ? 'fa-sun' : 'fa-moon'} text-sm`} />
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setNotifOpen(o => !o); setProfileOpen(false) }}
            className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all
              ${dark ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
              ${notifOpen ? (dark ? '!bg-gray-700 text-brand-400' : '!bg-gray-200') : ''}
            `}
          >
            <i className="fa-solid fa-bell text-sm" />
            {unreadCount > 0 && (
              <span className={`notif-dot ${dark ? 'border-gray-900' : 'border-white'}`}>
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className={`
              absolute right-0 top-11 w-80 rounded-2xl border shadow-2xl z-50
              animate-scale-in origin-top-right
              ${dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}
            `}>
              <div className={`flex items-center justify-between px-4 py-3.5 border-b ${dark ? 'border-gray-800' : 'border-gray-100'}`}>
                <div className="flex items-center gap-2">
                  <span className={`font-display font-bold text-sm ${dark ? 'text-white' : 'text-gray-900'}`}>
                    Notifications
                  </span>
                  {unreadCount > 0 && (
                    <span className="bg-brand-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <button className="text-xs text-brand-400 font-semibold hover:underline">Mark all read</button>
              </div>

              <div className="py-1 max-h-80 overflow-y-auto no-scrollbar">
                {NOTIFICATIONS.map(n => (
                  <div
                    key={n.id}
                    className={`
                      flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors
                      ${dark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}
                      ${n.unread ? (dark ? 'bg-brand-500/5' : 'bg-brand-50/50') : ''}
                    `}
                  >
                    <div className={`w-8 h-8 rounded-lg ${n.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <i className={`fa-solid ${n.icon} ${n.color} text-xs`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs leading-5 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{n.msg}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">{n.time}</p>
                    </div>
                    {n.unread && <div className="w-1.5 h-1.5 rounded-full bg-brand-400 flex-shrink-0 mt-1.5" />}
                  </div>
                ))}
              </div>

              <div className={`px-4 py-3 border-t ${dark ? 'border-gray-800' : 'border-gray-100'}`}>
                <button className="w-full text-center text-xs text-brand-400 font-semibold hover:underline">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative ml-1" ref={profileRef}>
          <button
            onClick={() => { setProfileOpen(o => !o); setNotifOpen(false) }}
            className="flex items-center gap-2 p-1 rounded-xl transition-all hover:bg-gray-800/50"
          >
            <Avatar initials="MS" size="sm" color="brand" />
            <div className="hidden sm:block text-left">
              <div className={`text-xs font-semibold leading-tight ${dark ? 'text-gray-200' : 'text-gray-800'}`}>
                M. Sheeraz
              </div>
              <div className="text-[10px] text-gray-500">Admin</div>
            </div>
            <i className="fa-solid fa-chevron-down text-[9px] text-gray-500 hidden sm:block" />
          </button>

          {profileOpen && (
            <div className={`
              absolute right-0 top-11 w-52 rounded-2xl border shadow-2xl z-50
              animate-scale-in origin-top-right
              ${dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}
            `}>
              <div className={`p-3 border-b ${dark ? 'border-gray-800' : 'border-gray-100'}`}>
                <div className={`text-sm font-semibold ${dark ? 'text-gray-100' : 'text-gray-900'}`}>Muhammad Sheeraz</div>
                <div className="text-xs text-gray-500">sheeraz@example.com</div>
              </div>
              {[
                { icon: 'fa-user-circle', label: 'My Profile' },
                { icon: 'fa-gear',        label: 'Settings'   },
                { icon: 'fa-life-ring',   label: 'Help'       },
              ].map(item => (
                <button key={item.label} className={`
                  w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors
                  ${dark ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-200' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}>
                  <i className={`fa-solid ${item.icon} w-4 text-center text-xs`} />
                  {item.label}
                </button>
              ))}
              <div className={`border-t ${dark ? 'border-gray-800' : 'border-gray-100'}`}>
                <button className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                  <i className="fa-solid fa-right-from-bracket w-4 text-center text-xs" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Topbar
