'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip as ReTooltip, XAxis, YAxis, Bar, BarChart } from 'recharts'
import { Copy, Plus, Key, Activity, AlertTriangle, Zap, Eye, EyeOff } from 'lucide-react'
import { apiUsage } from '@/lib/mock-data'
import { useState } from 'react'
import { toast } from 'sonner'

const KEYS = [
  { name: 'Production', key: 'sk_live_***********a82f', created: 'Jan 12, 2025', lastUsed: '2m ago', env: 'live' },
  { name: 'Staging', key: 'sk_test_***********4b91', created: 'Mar 20, 2025', lastUsed: '1h ago', env: 'test' },
  { name: 'Development', key: 'sk_test_***********e23d', created: 'May 04, 2025', lastUsed: '1d ago', env: 'test' },
]

const ENDPOINTS = [
  { name: 'POST /v1/users', calls: 48200, latency: 124, error: 0.2 },
  { name: 'GET /v1/customers', calls: 32400, latency: 86, error: 0.1 },
  { name: 'POST /v1/charges', calls: 28800, latency: 245, error: 0.8 },
  { name: 'GET /v1/invoices', calls: 21400, latency: 92, error: 0.3 },
  { name: 'POST /v1/webhooks', calls: 18200, latency: 156, error: 1.2 },
]

export function ApiView() {
  const [show, setShow] = useState({})

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">API Usage</h1>
          <p className="text-sm text-muted-foreground mt-1">Monitor your API consumption and manage keys.</p>
        </div>
        <Button size="sm" className="h-9 gradient-primary text-white border-0"><Plus className="w-4 h-4 mr-2" /> Create new key</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-2"><Zap className="w-4 h-4 text-primary" /><span className="text-sm font-medium">This month</span></div>
            <div className="text-3xl font-bold mono">1.42M</div>
            <div className="text-xs text-muted-foreground mt-1">of 2M monthly quota</div>
            <Progress value={71} className="h-1.5 mt-3" />
            <div className="text-[11px] text-muted-foreground mt-1">71% used · Resets in 9 days</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-2"><Activity className="w-4 h-4 text-info" /><span className="text-sm font-medium">Avg latency</span></div>
            <div className="text-3xl font-bold mono">142<span className="text-base text-muted-foreground">ms</span></div>
            <div className="text-xs text-success mt-1">-12ms vs last week</div>
            <Progress value={28} className="h-1.5 mt-3" />
            <div className="text-[11px] text-muted-foreground mt-1">Target: 500ms p99</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-2"><AlertTriangle className="w-4 h-4 text-warning" /><span className="text-sm font-medium">Error rate</span></div>
            <div className="text-3xl font-bold mono">0.42<span className="text-base text-muted-foreground">%</span></div>
            <div className="text-xs text-success mt-1">Below 1% target</div>
            <Progress value={42} className="h-1.5 mt-3" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Requests last 7 days</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={apiUsage} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="api1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.5} /><stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="day" fontSize={11} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
              <YAxis fontSize={11} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
              <ReTooltip contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="calls" stroke="hsl(var(--chart-1))" strokeWidth={2.5} fill="url(#api1)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">API Keys</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {KEYS.map(k => (
              <div key={k.name} className="flex items-center gap-3 p-3 rounded-lg border">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><Key className="w-4 h-4 text-primary" /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{k.name}</span>
                    <Badge variant={k.env === 'live' ? 'default' : 'secondary'} className="text-[9px] h-4">{k.env}</Badge>
                  </div>
                  <div className="font-mono text-xs text-muted-foreground truncate">{show[k.name] ? k.key.replace('***********', 'a82f1b9c4d7') : k.key}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Created {k.created} · Last used {k.lastUsed}</div>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShow(s => ({ ...s, [k.name]: !s[k.name] }))}>{show[k.name] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}</Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { navigator.clipboard?.writeText(k.key); toast.success('API key copied') }}><Copy className="w-3.5 h-3.5" /></Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Top endpoints</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {ENDPOINTS.map(e => (
              <div key={e.name}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono">{e.name}</span>
                  <span className="text-muted-foreground">{e.calls.toLocaleString()} calls · {e.latency}ms</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full gradient-primary rounded-full" style={{ width: `${(e.calls / ENDPOINTS[0].calls) * 100}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
