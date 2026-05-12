'use client'

import { useEffect } from 'react'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '@/components/ui/command'
import { LayoutDashboard, BarChart3, FolderKanban, Users, UserCircle2, CreditCard, Receipt, Activity, Plug, Calendar, KanbanSquare, ListTodo, Settings, Sun, Moon, LogOut, Zap, Shield, Search } from 'lucide-react'
import { useTheme } from 'next-themes'

export function CommandPalette({ open, setOpen, setActiveView, onLogout }) {
  const { setTheme } = useTheme()

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [setOpen])

  const go = (view) => { setActiveView(view); setOpen(false) }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search pages, commands, or jump to anything..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => go('dashboard')}><LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard <CommandShortcut>G D</CommandShortcut></CommandItem>
          <CommandItem onSelect={() => go('analytics')}><BarChart3 className="w-4 h-4 mr-2" /> Analytics <CommandShortcut>G A</CommandShortcut></CommandItem>
          <CommandItem onSelect={() => go('projects')}><FolderKanban className="w-4 h-4 mr-2" /> Projects <CommandShortcut>G P</CommandShortcut></CommandItem>
          <CommandItem onSelect={() => go('kanban')}><KanbanSquare className="w-4 h-4 mr-2" /> Kanban Board</CommandItem>
          <CommandItem onSelect={() => go('tasks')}><ListTodo className="w-4 h-4 mr-2" /> Tasks</CommandItem>
          <CommandItem onSelect={() => go('calendar')}><Calendar className="w-4 h-4 mr-2" /> Calendar</CommandItem>
          <CommandItem onSelect={() => go('team')}><Users className="w-4 h-4 mr-2" /> Team</CommandItem>
          <CommandItem onSelect={() => go('customers')}><UserCircle2 className="w-4 h-4 mr-2" /> Customers</CommandItem>
          <CommandItem onSelect={() => go('invoices')}><Receipt className="w-4 h-4 mr-2" /> Invoices</CommandItem>
          <CommandItem onSelect={() => go('billing')}><CreditCard className="w-4 h-4 mr-2" /> Billing & Plans</CommandItem>
          <CommandItem onSelect={() => go('api')}><Zap className="w-4 h-4 mr-2" /> API Usage</CommandItem>
          <CommandItem onSelect={() => go('activity')}><Activity className="w-4 h-4 mr-2" /> Activity Feed</CommandItem>
          <CommandItem onSelect={() => go('integrations')}><Plug className="w-4 h-4 mr-2" /> Integrations</CommandItem>
          <CommandItem onSelect={() => go('audit')}><Shield className="w-4 h-4 mr-2" /> Audit Logs</CommandItem>
          <CommandItem onSelect={() => go('settings')}><Settings className="w-4 h-4 mr-2" /> Settings</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Theme">
          <CommandItem onSelect={() => { setTheme('light'); setOpen(false) }}><Sun className="w-4 h-4 mr-2" /> Light mode</CommandItem>
          <CommandItem onSelect={() => { setTheme('dark'); setOpen(false) }}><Moon className="w-4 h-4 mr-2" /> Dark mode</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Account">
          <CommandItem onSelect={() => { onLogout(); setOpen(false) }}><LogOut className="w-4 h-4 mr-2" /> Sign out</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
