'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Progress } from '@/components/ui/progress'
import { Sparkles, LayoutDashboard, BarChart3, FolderKanban, Users, UserCircle2, CreditCard, Receipt, Activity, Plug, Calendar, KanbanSquare, ListTodo, Settings, ChevronLeft, ChevronRight, ChevronsUpDown, Zap, Check, Building2, Plus, Shield, FileText } from 'lucide-react'

const NAV_GROUPS = [
  {
    title: 'Overview',
    items: [
      { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { key: 'analytics', label: 'Analytics', icon: BarChart3 },
      { key: 'activity', label: 'Activity', icon: Activity, badge: 'Live' },
    ],
  },
  {
    title: 'Workspace',
    items: [
      { key: 'projects', label: 'Projects', icon: FolderKanban },
      { key: 'kanban', label: 'Kanban Board', icon: KanbanSquare },
      { key: 'tasks', label: 'Tasks', icon: ListTodo, badge: '12' },
      { key: 'calendar', label: 'Calendar', icon: Calendar },
      { key: 'team', label: 'Team', icon: Users },
    ],
  },
  {
    title: 'Business',
    items: [
      { key: 'customers', label: 'Customers', icon: UserCircle2 },
      { key: 'invoices', label: 'Invoices', icon: Receipt },
      { key: 'billing', label: 'Billing & Plans', icon: CreditCard },
      { key: 'api', label: 'API Usage', icon: Zap },
    ],
  },
  {
    title: 'System',
    items: [
      { key: 'integrations', label: 'Integrations', icon: Plug },
      { key: 'audit', label: 'Audit Logs', icon: Shield },
      { key: 'docs', label: 'Documentation', icon: FileText },
      { key: 'settings', label: 'Settings', icon: Settings },
    ],
  },
]

const WORKSPACES = [
  { id: 'w1', name: 'Nexus HQ', plan: 'Enterprise', initial: 'N' },
  { id: 'w2', name: 'Acme Inc.', plan: 'Pro', initial: 'A' },
  { id: 'w3', name: 'Personal', plan: 'Free', initial: 'P' },
]

export function Sidebar({ collapsed, setCollapsed, activeView, setActiveView, mobileOpen, setMobileOpen }) {
  const [workspace, setWorkspace] = [WORKSPACES[0], () => {}]

  const SidebarContent = (
    <div className={cn('flex flex-col h-full bg-sidebar border-r border-sidebar-border', collapsed ? 'w-[72px]' : 'w-64')}>
      {/* Workspace switcher */}
      <div className={cn('p-3 border-b border-sidebar-border', collapsed && 'p-2')}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className={cn('w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-sidebar-accent transition-colors', collapsed && 'justify-center')}>
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              {!collapsed && (
                <>
                  <div className="flex-1 text-left min-w-0">
                    <div className="text-sm font-semibold truncate">Nexus</div>
                    <div className="text-xs text-muted-foreground truncate">Enterprise</div>
                  </div>
                  <ChevronsUpDown className="w-4 h-4 text-muted-foreground shrink-0" />
                </>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64">
            <DropdownMenuLabel className="text-xs text-muted-foreground">Workspaces</DropdownMenuLabel>
            {WORKSPACES.map((w, i) => (
              <DropdownMenuItem key={w.id} className="gap-2.5 py-2">
                <div className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center text-xs font-semibold">{w.initial}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{w.name}</div>
                  <div className="text-xs text-muted-foreground">{w.plan}</div>
                </div>
                {i === 0 && <Check className="w-4 h-4 text-primary" />}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2.5"><Plus className="w-4 h-4" /> New workspace</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-2 space-y-5">
        <TooltipProvider delayDuration={0}>
          {NAV_GROUPS.map((group) => (
            <div key={group.title}>
              {!collapsed && <div className="px-2 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">{group.title}</div>}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon
                  const isActive = activeView === item.key
                  const btn = (
                    <button
                      key={item.key}
                      onClick={() => { setActiveView(item.key); setMobileOpen?.(false) }}
                      className={cn(
                        'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-all relative group',
                        isActive
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm'
                          : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50',
                        collapsed && 'justify-center'
                      )}
                    >
                      {isActive && <motion.div layoutId="nav-pill" className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-primary" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                      <Icon className={cn('w-4 h-4 shrink-0', isActive && 'text-primary')} />
                      {!collapsed && (
                        <>
                          <span className="truncate flex-1 text-left">{item.label}</span>
                          {item.badge && (
                            <span className={cn('text-[10px] font-semibold px-1.5 py-0.5 rounded-full', item.badge === 'Live' ? 'bg-success/15 text-success' : 'bg-primary/15 text-primary')}>
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </button>
                  )
                  return collapsed ? (
                    <Tooltip key={item.key}>
                      <TooltipTrigger asChild>{btn}</TooltipTrigger>
                      <TooltipContent side="right">{item.label}</TooltipContent>
                    </Tooltip>
                  ) : btn
                })}
              </div>
            </div>
          ))}
        </TooltipProvider>
      </nav>

      {/* Usage quota */}
      {!collapsed && (
        <div className="p-3 border-t border-sidebar-border">
          <div className="glass-card rounded-xl p-3 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold">API Usage</span>
              <span className="text-[10px] text-muted-foreground">68%</span>
            </div>
            <Progress value={68} className="h-1.5" />
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span>68k / 100k calls</span>
              <button className="text-primary font-medium hover:underline">Upgrade</button>
            </div>
          </div>
        </div>
      )}

      {/* Collapse toggle */}
      <div className="p-2 border-t border-sidebar-border hidden lg:block">
        <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className={cn('w-full justify-center text-muted-foreground hover:text-foreground', !collapsed && 'justify-start')}>
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <><ChevronLeft className="w-4 h-4 mr-2" /> Collapse</>}
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block sticky top-0 h-screen z-30">
        {SidebarContent}
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="lg:hidden fixed top-0 left-0 h-screen z-50 w-64"
            >
              {SidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
