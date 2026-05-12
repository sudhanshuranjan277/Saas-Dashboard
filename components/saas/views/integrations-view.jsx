'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Search, Plug, Check } from 'lucide-react'
import { integrations } from '@/lib/mock-data'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function IntegrationsView() {
  const [query, setQuery] = useState('')
  const filtered = integrations.filter(i => i.name.toLowerCase().includes(query.toLowerCase()))
  const connected = filtered.filter(i => i.connected)
  const available = filtered.filter(i => !i.connected)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Integrations</h1>
          <p className="text-sm text-muted-foreground mt-1">Connect Nexus to your favorite tools.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search integrations..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9 h-9 w-[260px]" />
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({integrations.length})</TabsTrigger>
          <TabsTrigger value="connected">Connected ({integrations.filter(i => i.connected).length})</TabsTrigger>
          <TabsTrigger value="available">Available ({integrations.filter(i => !i.connected).length})</TabsTrigger>
        </TabsList>

        {[['all', filtered], ['connected', connected], ['available', available]].map(([k, list]) => (
          <TabsContent key={k} value={k} className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {list.map((it, i) => (
                <motion.div key={it.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                  <Card className="hover:shadow-md transition-shadow h-full">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center text-2xl">{it.icon}</div>
                        {it.connected ? (
                          <Badge className="bg-success/15 text-success border-0" variant="secondary"><Check className="w-3 h-3 mr-1" /> Connected</Badge>
                        ) : (
                          <Badge variant="outline" className="text-[10px]">{it.category}</Badge>
                        )}
                      </div>
                      <h3 className="font-semibold">{it.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2 mb-4">{it.desc}</p>
                      <Button variant={it.connected ? 'outline' : 'default'} size="sm" className={cn('w-full', !it.connected && 'gradient-primary text-white border-0')}>
                        {it.connected ? 'Configure' : 'Connect'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
