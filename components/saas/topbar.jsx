'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb'
import { Menu, Search, Bell, Sun, Moon, LogOut, User, Settings, CreditCard, Keyboard, HelpCircle, Sparkles, Command, Globe, Check } from 'lucide-react'
import { notifications } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const VIEW_LABELS = {
  dashboard: 'Dashboard', analytics: 'Analytics', activity: 'Activity Feed',
  projects: 'Projects', kanban: 'Kanban Board', tasks: 'Tasks', calendar: 'Calendar', team: 'Team',
  customers: 'Customers', invoices: 'Invoices', billing: 'Billing & Plans', api: 'API Usage',
  integrations: 'Integrations', audit: 'Audit Logs', docs: 'Documentation', settings: 'Settings',
}

export function Topbar({ activeView, setActiveView, setMobileOpen, onCommandOpen, user, onLogout }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [lang, setLang] = useState('English')
  useEffect(() => setMounted(true), [])

  const unread = notifications.filter(n => !n.read).length
  const sectionGroup = ['dashboard','analytics','activity'].includes(activeView) ? 'Overview'
    : ['projects','kanban','tasks','calendar','team'].includes(activeView) ? 'Workspace'
    : ['customers','invoices','billing','api'].includes(activeView) ? 'Business' : 'System'

  return (
    <header className="sticky top-0 z-20 h-16 glass border-b flex items-center gap-3 px-4 sm:px-6">
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)}>
        <Menu className="w-5 h-5" />
      </Button>

      {/* Breadcrumb */}
      <Breadcrumb className="hidden md:block">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="text-muted-foreground">Nexus</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="text-muted-foreground">{sectionGroup}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold">{VIEW_LABELS[activeView] || 'Dashboard'}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex-1" />

      {/* Search trigger */}
      <button onClick={onCommandOpen} className="hidden sm:flex items-center gap-2 h-9 px-3 rounded-lg border bg-muted/40 hover:bg-muted transition-colors text-sm text-muted-foreground w-[200px] md:w-[280px]">
        <Search className="w-4 h-4" />
        <span className="flex-1 text-left">Search or jump to...</span>
        <kbd className="text-[10px] font-mono bg-background/80 border rounded px-1.5 py-0.5">⌘K</kbd>
      </button>
      <Button variant="ghost" size="icon" className="sm:hidden" onClick={onCommandOpen}>
        <Search className="w-5 h-5" />
      </Button>

      {/* Theme toggle */}
      <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {mounted && theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </Button>

      {/* Language */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Globe className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuLabel>Language</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {['English', 'Español', 'Français', 'Deutsch', '日本語', '中文'].map(l => (
            <DropdownMenuItem key={l} onClick={() => setLang(l)} className="flex justify-between">
              {l} {lang === l && <Check className="w-4 h-4 text-primary" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Notifications */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-4 h-4" />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary pulse-glow" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[360px] p-0">
          <div className="p-3 border-b flex items-center justify-between">
            <div>
              <div className="font-semibold text-sm">Notifications</div>
              <div className="text-xs text-muted-foreground">{unread} unread messages</div>
            </div>
            <Button variant="ghost" size="sm" className="text-xs h-7">Mark all read</Button>
          </div>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b h-9 bg-transparent px-2">
              <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
              <TabsTrigger value="unread" className="text-xs">Unread</TabsTrigger>
              <TabsTrigger value="mentions" className="text-xs">Mentions</TabsTrigger>
            </TabsList>
          </Tabs>
          <ScrollArea className="h-[340px]">
            <div className="p-2 space-y-1">
              {notifications.map(n => (
                <button key={n.id} className="w-full text-left p-2.5 rounded-lg hover:bg-accent transition-colors flex gap-3">
                  <div className={cn('w-2 h-2 rounded-full mt-1.5 shrink-0', n.type === 'success' ? 'bg-success' : n.type === 'warning' ? 'bg-warning' : 'bg-info', n.read && 'opacity-30')} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{n.title}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1">{n.message}</div>
                    <div className="text-[10px] text-muted-foreground mt-1">{n.time}</div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
          <div className="p-2 border-t">
            <Button variant="ghost" size="sm" className="w-full text-xs">View all notifications</Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* User profile */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 p-1 rounded-lg hover:bg-accent transition-colors">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="gradient-primary text-white text-xs font-semibold">SC</AvatarFallback>
            </Avatar>
            <div className="hidden xl:block text-left pr-1">
              <div className="text-sm font-semibold leading-none">{user?.name || 'Sarah Chen'}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">Admin · Nexus HQ</div>
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="font-semibold">{user?.name || 'Sarah Chen'}</div>
            <div className="text-xs text-muted-foreground font-normal">{user?.email || 'sarah@nexus.io'}</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem><User className="w-4 h-4 mr-2" /> Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setActiveView('settings')}><Settings className="w-4 h-4 mr-2" /> Settings</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setActiveView('billing')}><CreditCard className="w-4 h-4 mr-2" /> Billing</DropdownMenuItem>
          <DropdownMenuItem onClick={onCommandOpen}><Keyboard className="w-4 h-4 mr-2" /> Keyboard shortcuts <kbd className="ml-auto text-[10px] font-mono">⌘K</kbd></DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem><HelpCircle className="w-4 h-4 mr-2" /> Help & support</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive" onClick={onLogout}><LogOut className="w-4 h-4 mr-2" /> Sign out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
