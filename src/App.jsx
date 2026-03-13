import { Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import Sidebar from './components/layout/Sidebar'
import Topbar  from './components/layout/Topbar'
import LoginPage    from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import UsersPage    from './pages/UsersPage'
import ProfilePage  from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'

// ── Layout wrapper (authenticated pages) ─────────
const DashboardLayout = () => {
  const { sidebarCollapsed } = useApp()
  const sideW = sidebarCollapsed ? 70 : 256

  return (
    <div className="flex h-screen overflow-hidden bg-gray-950 dark:bg-gray-950">
      <Sidebar />
      <div
        className="flex flex-col flex-1 min-w-0 transition-[margin] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ marginLeft: typeof window !== 'undefined' && window.innerWidth >= 1024 ? sideW : 0 }}
      >
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="users"     element={<UsersPage />}     />
            <Route path="profile"   element={<ProfilePage />}   />
            <Route path="settings"  element={<SettingsPage />}  />
            <Route path="*"         element={<Navigate to="dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

// ── Root App ─────────────────────────────────────
const AppRoutes = () => (
  <Routes>
    <Route path="/"       element={<Navigate to="/login" replace />} />
    <Route path="/login"  element={<LoginPage />} />
    <Route path="/*"      element={<DashboardLayout />} />
  </Routes>
)

const App = () => (
  <AppProvider>
    <AppRoutes />
  </AppProvider>
)

export default App
