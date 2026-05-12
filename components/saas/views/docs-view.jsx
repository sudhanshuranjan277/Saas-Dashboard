'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, FileText, Zap, Code, Shield, Search, ArrowRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'

const CATEGORIES = [
  { icon: Zap, title: 'Getting Started', desc: 'Set up your workspace, invite your team, configure basics', count: 12, color: 'bg-chart-1/15 text-chart-1' },
  { icon: Code, title: 'API Reference', desc: 'Full REST API documentation with examples in 8 languages', count: 48, color: 'bg-chart-2/15 text-chart-2' },
  { icon: Shield, title: 'Security & Auth', desc: 'SSO, RBAC, audit logs, compliance and SOC2 details', count: 22, color: 'bg-chart-3/15 text-chart-3' },
  { icon: FileText, title: 'Guides & Tutorials', desc: 'Step-by-step walkthroughs for common workflows', count: 34, color: 'bg-chart-5/15 text-chart-5' },
]

const POPULAR = [
  'Quickstart — deploy in 5 minutes',
  'Webhooks: signing & verification',
  'Connecting your own domain',
  'Setting up SSO with Okta',
  'Migrating from v1 to v2 API',
  'Working with rate limits',
]

export function DocsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2"><BookOpen className="w-7 h-7 text-primary" /> Documentation</h1>
        <p className="text-sm text-muted-foreground mt-1">Everything you need to build with Nexus.</p>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-8 gradient-mesh relative">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">How can we help?</h2>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input placeholder="Search the docs..." className="pl-11 h-12 text-base shadow-sm" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CATEGORIES.map((c, i) => {
          const Icon = c.icon
          return (
            <motion.div key={c.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer group h-full">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${c.color} flex items-center justify-center shrink-0`}><Icon className="w-5 h-5" /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{c.title}</h3>
                      <Badge variant="secondary" className="text-[10px]">{c.count} articles</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{c.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <Card>
        <CardContent className="p-5">
          <h3 className="font-semibold mb-3">Popular articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {POPULAR.map(p => (
              <Button key={p} variant="ghost" className="justify-start font-normal text-sm h-auto py-2">
                <FileText className="w-3.5 h-3.5 mr-2 text-muted-foreground" /> {p}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
