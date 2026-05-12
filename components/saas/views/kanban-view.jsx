'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Plus, MoreHorizontal } from 'lucide-react'
import { kanbanColumns } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const priorityColor = {
  critical: 'bg-destructive',
  high: 'bg-warning',
  medium: 'bg-info',
  low: 'bg-muted-foreground',
}

const tagColors = {
  Engineering: 'bg-primary/15 text-primary',
  Design: 'bg-chart-5/15 text-chart-5',
  Marketing: 'bg-chart-4/15 text-chart-4',
  Product: 'bg-chart-2/15 text-chart-2',
  Research: 'bg-muted text-muted-foreground',
  Docs: 'bg-chart-3/15 text-chart-3',
}

export function KanbanView() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Kanban Board</h1>
          <p className="text-sm text-muted-foreground mt-1">Drag, drop, and organize your team's work.</p>
        </div>
        <Button size="sm" className="h-9 gradient-primary text-white border-0"><Plus className="w-4 h-4 mr-2" /> Add task</Button>
      </div>

      <div className="flex-1 overflow-x-auto scrollbar-thin pb-4">
        <div className="grid grid-flow-col auto-cols-[280px] sm:auto-cols-[300px] gap-4 min-w-min">
          {Object.entries(kanbanColumns).map(([key, col], colIdx) => (
            <div key={key} className="flex flex-col gap-3 bg-muted/30 rounded-xl p-3 max-h-[calc(100vh-220px)]">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: col.color }} />
                  <span className="font-semibold text-sm">{col.title}</span>
                  <Badge variant="secondary" className="h-5 text-[10px] px-1.5">{col.tasks.length}</Badge>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7"><Plus className="w-4 h-4" /></Button>
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-thin space-y-2">
                {col.tasks.map((task, i) => (
                  <motion.div key={task.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (colIdx * 0.05) + (i * 0.03) }}>
                    <Card className="hover:shadow-md transition-all cursor-grab active:cursor-grabbing group">
                      <CardContent className="p-3 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <Badge className={cn('text-[10px] font-medium border-0 px-1.5 py-0', tagColors[task.tag] || 'bg-muted text-muted-foreground')} variant="secondary">{task.tag}</Badge>
                          <button className="opacity-0 group-hover:opacity-100 transition-opacity"><MoreHorizontal className="w-3.5 h-3.5 text-muted-foreground" /></button>
                        </div>
                        <div className="text-sm font-medium leading-snug">{task.title}</div>
                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center gap-1.5">
                            <span className={cn('w-1.5 h-1.5 rounded-full', priorityColor[task.priority])} />
                            <span className="text-[10px] text-muted-foreground capitalize">{task.priority}</span>
                          </div>
                          <Avatar className="w-6 h-6"><AvatarFallback className="text-[9px] bg-secondary">{task.assignee}</AvatarFallback></Avatar>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
