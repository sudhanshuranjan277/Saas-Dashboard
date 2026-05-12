'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Plus, Search, MoreHorizontal, Filter, LayoutGrid, List } from 'lucide-react'
import { projects } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const statusColors = {
  'In Progress': 'bg-info/15 text-info',
  'Review': 'bg-primary/15 text-primary',
  'Planning': 'bg-warning/15 text-warning',
  'Completed': 'bg-success/15 text-success',
}

const priorityColors = {
  Critical: 'bg-destructive/15 text-destructive border-destructive/30',
  High: 'bg-warning/15 text-warning border-warning/30',
  Medium: 'bg-info/15 text-info border-info/30',
  Low: 'bg-muted text-muted-foreground border-border',
}

export function ProjectsView() {
  const [query, setQuery] = useState('')
  const [view, setView] = useState('grid')
  const filtered = projects.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground mt-1">{projects.length} active projects across your workspace.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects..." className="pl-9 h-9 w-[200px] md:w-[260px]" />
          </div>
          <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => setView(view === 'grid' ? 'list' : 'grid')}>
            {view === 'grid' ? <List className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
          </Button>
          <Button size="sm" className="h-9 gradient-primary text-white border-0"><Plus className="w-4 h-4 mr-2" /> New Project</Button>
        </div>
      </div>

      <div className={cn(view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4' : 'space-y-3')}>
        {filtered.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Card className="hover:shadow-md transition-shadow group cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <Badge className={cn('text-[10px] font-medium border-0', statusColors[p.status])} variant="secondary">{p.status}</Badge>
                  <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"><MoreHorizontal className="w-4 h-4" /></Button>
                </div>
                <h3 className="font-semibold text-base mb-1 truncate">{p.name}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <span>Due {p.dueDate}</span>
                  <span>·</span>
                  <Badge variant="outline" className={cn('text-[10px] py-0 px-1.5 h-4', priorityColors[p.priority])}>{p.priority}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold">{p.progress}%</span>
                  </div>
                  <Progress value={p.progress} className="h-1.5" />
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div className="flex -space-x-2">
                    {p.team.map(t => (
                      <Avatar key={t} className="w-7 h-7 ring-2 ring-card"><AvatarFallback className="text-[10px] bg-secondary">{t}</AvatarFallback></Avatar>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground">{p.completed}/{p.tasks} tasks</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
