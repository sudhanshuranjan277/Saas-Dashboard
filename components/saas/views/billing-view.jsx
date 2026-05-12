'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Check, Sparkles, Crown, Zap, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const PLANS = [
  { name: 'Starter', icon: Sparkles, price: { m: 0, y: 0 }, desc: 'Perfect for trying out Nexus', features: ['Up to 3 team members', '1 GB storage', 'Basic analytics', 'Community support', '14-day trial of Pro features'], cta: 'Current plan' },
  { name: 'Pro', icon: Zap, price: { m: 29, y: 290 }, desc: 'For growing teams that need more', features: ['Up to 20 team members', '100 GB storage', 'Advanced analytics', 'Priority support', 'API access', 'Custom integrations', 'SSO authentication'], cta: 'Upgrade to Pro', popular: true },
  { name: 'Enterprise', icon: Crown, price: { m: 99, y: 990 }, desc: 'For organizations at scale', features: ['Unlimited members', '1 TB storage', 'Custom analytics', 'Dedicated CSM', 'Custom contracts', 'SLA & uptime guarantee', 'Advanced security', 'On-premise deployment'], cta: 'Talk to sales' },
]

export function BillingView() {
  const [yearly, setYearly] = useState(true)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Billing & Plans</h1>
        <p className="text-sm text-muted-foreground mt-1">Choose the right plan for your team.</p>
      </div>

      <Card>
        <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center"><Zap className="w-6 h-6 text-white" /></div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Pro Plan</span>
                <Badge variant="secondary">Yearly</Badge>
              </div>
              <div className="text-sm text-muted-foreground">Renews on July 18, 2025 · $290/year</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Manage subscription</Button>
            <Button variant="outline" size="sm">Update payment</Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center gap-3 py-2">
        <span className={cn('text-sm', !yearly && 'font-semibold')}>Monthly</span>
        <Switch checked={yearly} onCheckedChange={setYearly} />
        <span className={cn('text-sm', yearly && 'font-semibold')}>Yearly</span>
        <Badge className="bg-success/15 text-success border-0">Save 17%</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLANS.map((p, i) => {
          const Icon = p.icon
          return (
            <motion.div key={p.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Card className={cn('relative overflow-hidden h-full', p.popular && 'border-primary shadow-xl shadow-primary/10')}>
                {p.popular && (
                  <div className="absolute top-0 right-0 gradient-primary text-white text-[10px] font-semibold px-3 py-1 rounded-bl-lg">MOST POPULAR</div>
                )}
                <CardContent className="p-6 flex flex-col h-full">
                  <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center mb-3', p.popular ? 'gradient-primary text-white' : 'bg-secondary')}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold">{p.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-4">{p.desc}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold tracking-tight">${yearly ? Math.round(p.price.y / 12) : p.price.m}</span>
                    <span className="text-sm text-muted-foreground">/mo</span>
                    {yearly && p.price.y > 0 && <div className="text-xs text-muted-foreground mt-1">${p.price.y} billed annually</div>}
                  </div>
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {p.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={cn('w-full', p.popular ? 'gradient-primary text-white border-0' : '', i === 0 && 'pointer-events-none opacity-70')} variant={p.popular ? 'default' : 'outline'}>
                    {p.cta} <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <Card>
        <CardContent className="p-5 space-y-3">
          <h3 className="font-semibold">Payment method</h3>
          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-7 rounded gradient-primary flex items-center justify-center text-white text-[10px] font-bold">VISA</div>
              <div>
                <div className="text-sm font-medium">•••• •••• •••• 4242</div>
                <div className="text-xs text-muted-foreground">Expires 09/28</div>
              </div>
            </div>
            <Button variant="outline" size="sm">Update</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
