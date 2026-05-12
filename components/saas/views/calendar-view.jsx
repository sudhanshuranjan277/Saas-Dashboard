'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { calendarEvents } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const colorMap = {
  primary: 'bg-primary/15 text-primary border-primary/30',
  blue: 'bg-info/15 text-info border-info/30',
  green: 'bg-success/15 text-success border-success/30',
  orange: 'bg-warning/15 text-warning border-warning/30',
  pink: 'bg-chart-5/15 text-chart-5 border-chart-5/30',
}

export function CalendarView() {
  const [date, setDate] = useState(new Date(2025, 5, 1)) // June 2025
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const today = new Date()
  const isToday = (d) => d === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-sm text-muted-foreground mt-1">Schedule, meetings & deadlines.</p>
        </div>
        <div className="flex gap-2 items-center">
          <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))}><ChevronLeft className="w-4 h-4" /></Button>
          <div className="text-base font-semibold min-w-[140px] text-center">{monthNames[date.getMonth()]} {date.getFullYear()}</div>
          <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))}><ChevronRight className="w-4 h-4" /></Button>
          <Button size="sm" className="h-9 ml-2 gradient-primary text-white border-0"><Plus className="w-4 h-4 mr-2" /> New event</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-7 border-b bg-muted/30">
              {dayNames.map(d => <div key={d} className="p-2 text-xs font-semibold text-center text-muted-foreground">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 auto-rows-[88px] sm:auto-rows-[110px]">
              {cells.map((d, i) => {
                const events = d ? calendarEvents.filter(e => e.day === d) : []
                return (
                  <div key={i} className={cn('border-r border-b p-1.5 overflow-hidden', !d && 'bg-muted/20')}>
                    {d && (
                      <>
                        <div className={cn('text-xs font-semibold mb-1 w-6 h-6 flex items-center justify-center rounded-full', isToday(d) && 'gradient-primary text-white')}>{d}</div>
                        <div className="space-y-1">
                          {events.slice(0, 2).map(e => (
                            <div key={e.id} className={cn('text-[10px] px-1.5 py-0.5 rounded-md border truncate font-medium', colorMap[e.color])}>{e.title}</div>
                          ))}
                          {events.length > 2 && <div className="text-[10px] text-muted-foreground px-1">+{events.length - 2} more</div>}
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Upcoming events</CardTitle></CardHeader>
          <CardContent className="space-y-3 max-h-[480px] overflow-y-auto scrollbar-thin">
            {calendarEvents.map((e, i) => (
              <motion.div key={e.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="flex gap-3">
                <div className="text-center shrink-0 w-12">
                  <div className="text-[10px] uppercase text-muted-foreground font-semibold">{monthNames[5].slice(0, 3)}</div>
                  <div className="text-lg font-bold leading-none">{String(e.day).padStart(2, '0')}</div>
                </div>
                <div className={cn('flex-1 rounded-lg p-2.5 border', colorMap[e.color])}>
                  <div className="text-sm font-semibold">{e.title}</div>
                  <div className="text-[11px] mt-0.5 opacity-80">{e.time} · {e.duration}h</div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
