import { NavLink, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { Avatar } from '../ui'

const NAV_ITEMS = [
  { path: '/dashboard', icon: 'fa-grid-2',      label: 'Dashboard' },
  { path: '/users',     icon: 'fa-users',        label: 'Users'     },
  { path: '/profile',   icon: 'fa-user-circle',  label: 'Profile'   },
  { path: '/settings',  icon: 'fa-gear',         label: 'Settings'  },
]

const OTHER_ITEMS = [
  { icon: 'fa-chart-bar',     label: 'Analytics'     },
  { icon: 'fa-bell',          label: 'Notifications' },
  { icon: 'fa-shield-halved', label: 'Security'      },
]

const Sidebar = () => {
  const { dark, sidebarCollapsed, toggleCollapse, sidebarOpen, closeSidebar } = useApp()
  const location = useLocation()
  const W = sidebarCollapsed ? 70 : 256

  const base = dark
    ? 'bg-gray-900 border-gray-800/60'
    : 'bg-white border-gray-200 shadow-[4px_0_24px_rgba(0,0,0,0.04)]'

  return (
    <>
      {/* Overlay — mobile */}
      {sidebarOpen && (
        <div className="sidebar-overlay lg:hidden" onClick={closeSidebar} />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-40 h-full flex flex-col border-r
          transition-[transform,width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${base}
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{ width: W }}
      >
        {/* ── Logo ── */}
        <div className={`
          flex items-center h-16 border-b flex-shrink-0 px-4
          ${dark ? 'border-gray-800/60' : 'border-gray-200'}
          ${sidebarCollapsed ? 'justify-center' : 'justify-between'}
        `}>
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center flex-shrink-0 shadow-brand">
              <i className="fa-solid fa-bolt text-white text-sm" />
            </div>
            {!sidebarCollapsed && (
              <span className="font-display font-bold text-[17px] grad-text truncate">
                NexPanel
              </span>
            )}
          </div>

          {/* Collapse toggle — desktop */}
          {!sidebarCollapsed && (
            <button
              onClick={toggleCollapse}
              className={`hidden lg:flex w-7 h-7 rounded-lg items-center justify-center transition-all
                ${dark ? 'hover:bg-gray-800 text-gray-500 hover:text-brand-400' : 'hover:bg-gray-100 text-gray-400 hover:text-brand-600'}
              `}
            >
              <i className="fa-solid fa-chevron-left text-xs" />
            </button>
          )}

          {/* Expand icon when collapsed (desktop) */}
          {sidebarCollapsed && (
            <button
              onClick={toggleCollapse}
              className={`hidden lg:flex w-7 h-7 rounded-lg items-center justify-center transition-all
                ${dark ? 'hover:bg-gray-800 text-gray-500 hover:text-brand-400' : 'hover:bg-gray-100 text-gray-400 hover:text-brand-600'}
              `}
            >
              <i className="fa-solid fa-chevron-right text-xs" />
            </button>
          )}

          {/* Mobile close */}
          <button className="lg:hidden text-gray-400 hover:text-gray-200" onClick={closeSidebar}>
            <i className="fa-solid fa-xmark text-lg" />
          </button>
        </div>

        {/* ── Navigation ── */}
        <nav className="flex-1 py-5 px-3 space-y-0.5 overflow-y-auto no-scrollbar">

          {!sidebarCollapsed && (
            <p className={`px-3 mb-2 text-[10px] font-bold tracking-[0.12em] uppercase
              ${dark ? 'text-gray-600' : 'text-gray-400'}
            `}>
              Main Menu
            </p>
          )}

          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              data-tooltip={sidebarCollapsed ? item.label : undefined}
              onClick={closeSidebar}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-150 relative group
                ${sidebarCollapsed ? 'justify-center' : ''}
                ${isActive
                  ? `nav-item-active ${dark ? 'text-brand-400' : 'text-brand-600'}`
                  : `${dark ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
                }
              `}
            >
              <i className={`fa-solid ${item.icon} w-4 text-center text-[15px] flex-shrink-0`} />
              {!sidebarCollapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {location.pathname === item.path && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                  )}
                </>
              )}
            </NavLink>
          ))}

          {!sidebarCollapsed && (
            <p className={`px-3 pt-5 pb-2 text-[10px] font-bold tracking-[0.12em] uppercase
              ${dark ? 'text-gray-600' : 'text-gray-400'}
            `}>
              Other
            </p>
          )}
          {sidebarCollapsed && <div className="my-3 mx-2 border-t border-gray-800/60" />}

          {OTHER_ITEMS.map(item => (
            <button
              key={item.label}
              data-tooltip={sidebarCollapsed ? item.label : undefined}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-150
                ${sidebarCollapsed ? 'justify-center' : ''}
                ${dark ? 'text-gray-500 hover:text-gray-300 hover:bg-gray-800' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}
              `}
            >
              <i className={`fa-solid ${item.icon} w-4 text-center text-[15px] flex-shrink-0`} />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* ── User Profile ── */}
        <div className={`p-3 border-t flex-shrink-0 ${dark ? 'border-gray-800/60' : 'border-gray-200'}`}>
          {sidebarCollapsed
            ? <div className="flex justify-center"><Avatar initials="MS" size="sm" color="brand" /></div>
            : (
              <div className={`flex items-center gap-3 p-2.5 rounded-xl transition-colors cursor-pointer
                ${dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}
              `}>
                <Avatar initials="MS" size="md" color="brand" />
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-semibold truncate ${dark ? 'text-gray-100' : 'text-gray-900'}`}>
                    M. Sheeraz
                  </div>
                  <div className="text-xs text-gray-500 truncate">Super Admin</div>
                </div>
                <i className="fa-solid fa-ellipsis text-xs text-gray-500" />
              </div>
            )
          }
        </div>
      </aside>
    </>
  )
}

export default Sidebar
