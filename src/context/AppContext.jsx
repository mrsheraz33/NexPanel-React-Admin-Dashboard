import { createContext, useContext, useState, useEffect } from 'react'

export const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('nexpanel_theme')
    return saved ? saved === 'dark' : true
  })

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('nexpanel_theme', dark ? 'dark' : 'light')
  }, [dark])

  const toggleDark = () => setDark(d => !d)
  const toggleCollapse = () => setSidebarCollapsed(c => !c)
  const openSidebar = () => setSidebarOpen(true)
  const closeSidebar = () => setSidebarOpen(false)

  return (
    <AppContext.Provider value={{
      dark, toggleDark,
      sidebarCollapsed, toggleCollapse,
      sidebarOpen, openSidebar, closeSidebar,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
