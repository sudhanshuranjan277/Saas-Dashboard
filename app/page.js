'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LoginPage } from '@/components/saas/login-page'
import { Sidebar } from '@/components/saas/sidebar'
import { Topbar } from '@/components/saas/topbar'
import { CommandPalette } from '@/components/saas/command-palette'
import { AIWidget } from '@/components/saas/ai-widget'
import { DashboardView } from '@/components/saas/views/dashboard-view'
import { AnalyticsView } from '@/components/saas/views/analytics-view'
import { ProjectsView } from '@/components/saas/views/projects-view'
import { KanbanView } from '@/components/saas/views/kanban-view'
import { CalendarView } from '@/components/saas/views/calendar-view'
import { TeamView } from '@/components/saas/views/team-view'
import { CustomersView } from '@/components/saas/views/customers-view'
import { InvoicesView } from '@/components/saas/views/invoices-view'
import { BillingView } from '@/components/saas/views/billing-view'
import { ApiView } from '@/components/saas/views/api-view'
import { IntegrationsView } from '@/components/saas/views/integrations-view'
import { AuditView } from '@/components/saas/views/audit-view'
import { ActivityView } from '@/components/saas/views/activity-view'
import { TasksView } from '@/components/saas/views/tasks-view'
import { SettingsView } from '@/components/saas/views/settings-view'
import { DocsView } from '@/components/saas/views/docs-view'

const viewMap = {
  dashboard: DashboardView,
  analytics: AnalyticsView,
  projects: ProjectsView,
  kanban: KanbanView,
  calendar: CalendarView,
  team: TeamView,
  customers: CustomersView,
  invoices: InvoicesView,
  billing: BillingView,
  api: ApiView,
  integrations: IntegrationsView,
  audit: AuditView,
  activity: ActivityView,
  tasks: TasksView,
  settings: SettingsView,
  docs: DocsView,
}

function App() {
  const [user, setUser] = useState(null)
  const [activeView, setActiveView] = useState('dashboard')
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)

  // Persist auth in localStorage so refreshes feel real
  useEffect(() => {
    const saved = typeof window !== 'undefined' && localStorage.getItem('nexus_user')
    if (saved) {
      try { setUser(JSON.parse(saved)) } catch {}
    }
  }, [])

  const handleLogin = (u) => {
    setUser(u)
    if (typeof window !== 'undefined') localStorage.setItem('nexus_user', JSON.stringify(u))
  }

  const handleLogout = () => {
    setUser(null)
    if (typeof window !== 'undefined') localStorage.removeItem('nexus_user')
  }

  if (!user) return <LoginPage onLogin={handleLogin} />

  const ViewComponent = viewMap[activeView] || DashboardView

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeView={activeView}
        setActiveView={setActiveView}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          activeView={activeView}
          setActiveView={setActiveView}
          setMobileOpen={setMobileOpen}
          onCommandOpen={() => setCommandOpen(true)}
          user={user}
          onLogout={handleLogout}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <ViewComponent />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <CommandPalette
        open={commandOpen}
        setOpen={setCommandOpen}
        setActiveView={setActiveView}
        onLogout={handleLogout}
      />
      <AIWidget />
    </div>
  )
}

export default App
