'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Activity, Rocket, GitMerge, MessageSquare, Plus, X, Share2, RefreshCw } from 'lucide-react'
import { activities } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const typeMap = {
  deploy: { icon: Rocket, color: 'text-success bg-success/15' },
  code: { icon: GitMerge, color: 'text-info bg-info/15' },
  comment: { icon: MessageSquare, color: 'text-chart-5 bg-chart-5/15' },
  create: { icon: Plus, color: 'text-primary bg-primary/15' },
  close: { icon: X, color: 'text-warning bg-warning/15' },
  share: { icon: Share2, color: 'text-chart-3 bg-chart-3/15' },
  update: { icon: RefreshCw, color: 'text-info bg-info/15' },
}

export function ActivityView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
            Activity Feed
            <Badge className="bg-success/15 text-success border-0 gap-1"><span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> Live</Badge>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Real-time updates from your workspace.</p>
        </div>
        <Tabs defaultValue="all"><TabsList><TabsTrigger value="all">All</TabsTrigger><TabsTrigger value="mentions">Mentions</TabsTrigger><TabsTrigger value="team">My team</TabsTrigger></TabsList></Tabs>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {activities.map((a, i) => {
              const T = typeMap[a.type] || typeMap.update
              const Icon = T.icon
              return (
                <motion.div key={a.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors">
                  <Avatar className="w-10 h-10"><AvatarFallback className="text-xs bg-secondary">{a.avatar}</AvatarFallback></Avatar>
                  <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0', T.color)}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm"><span className="font-semibold">{a.user}</span> <span className="text-muted-foreground">{a.action}</span> <span className="font-medium">{a.target}</span></div>
                    <div className="text-xs text-muted-foreground mt-0.5">{a.time}</div>
                  </div>
                  <Button variant="ghost" size="sm" className="hidden sm:inline-flex">View</Button>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
