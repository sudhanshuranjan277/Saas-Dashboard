'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Plus, Calendar, Flag, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const INITIAL = [
  { id: 't1', title: 'Review pull request #1284 — Auth refactor', priority: 'high', done: false, due: 'Today', assignee: 'SC', tag: 'Engineering' },
  { id: 't2', title: 'Prepare slides for Q3 planning meeting', priority: 'medium', done: false, due: 'Tomorrow', assignee: 'DK', tag: 'Product' },
  { id: 't3', title: 'Draft customer onboarding email sequence', priority: 'medium', done: false, due: 'Jun 22', assignee: 'JW', tag: 'Marketing' },
  { id: 't4', title: 'Update SDK documentation for v2 release', priority: 'low', done: false, due: 'Jun 25', assignee: 'TG', tag: 'Docs' },
  { id: 't5', title: 'Fix billing page layout on mobile', priority: 'high', done: true, due: 'Jun 18', assignee: 'NA', tag: 'Design' },
  { id: 't6', title: 'Set up automated nightly backups', priority: 'critical', done: false, due: 'Jun 20', assignee: 'PP', tag: 'Engineering' },
  { id: 't7', title: 'Schedule customer feedback sessions', priority: 'low', done: true, due: 'Jun 15', assignee: 'DK', tag: 'Product' },
  { id: 't8', title: 'Migrate analytics to new pipeline', priority: 'medium', done: false, due: 'Jun 28', assignee: 'MJ', tag: 'Engineering' },
]

const priorityColor = {
  critical: 'text-destructive',
  high: 'text-warning',
  medium: 'text-info',
  low: 'text-muted-foreground',
}

export function TasksView() {
  const [tasks, setTasks] = useState(INITIAL)
  const [newTitle, setNewTitle] = useState('')

  const toggle = (id) => setTasks(t => t.map(x => x.id === id ? { ...x, done: !x.done } : x))
  const remove = (id) => setTasks(t => t.filter(x => x.id !== id))
  const add = (e) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    setTasks(t => [{ id: `n${Date.now()}`, title: newTitle, priority: 'medium', done: false, due: 'Today', assignee: 'SC', tag: 'General' }, ...t])
    setNewTitle('')
  }

  const done = tasks.filter(t => t.done).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">My Tasks</h1>
          <p className="text-sm text-muted-foreground mt-1">{done} of {tasks.length} completed today.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <form onSubmit={add} className="flex gap-2">
            <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Add a new task..." className="flex-1" />
            <Button type="submit" className="gradient-primary text-white border-0"><Plus className="w-4 h-4 mr-2" /> Add task</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">All tasks</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {tasks.map(t => (
              <div key={t.id} className="flex items-center gap-3 p-3 hover:bg-muted/30 transition-colors group">
                <Checkbox checked={t.done} onCheckedChange={() => toggle(t.id)} />
                <div className="flex-1 min-w-0">
                  <div className={cn('text-sm', t.done && 'line-through text-muted-foreground')}>{t.title}</div>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <Badge variant="outline" className="text-[10px] py-0">{t.tag}</Badge>
                    <span className={cn('text-[11px] font-medium flex items-center gap-1 capitalize', priorityColor[t.priority])}><Flag className="w-3 h-3" /> {t.priority}</span>
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" /> {t.due}</span>
                  </div>
                </div>
                <Avatar className="w-7 h-7"><AvatarFallback className="text-[10px] bg-secondary">{t.assignee}</AvatarFallback></Avatar>
                <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-destructive" onClick={() => remove(t.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
