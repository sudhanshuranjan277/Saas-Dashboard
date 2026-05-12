'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip as ReTooltip, XAxis, YAxis, Cell } from 'recharts'
import { ArrowUpRight, ArrowDownRight, DollarSign, Users, ShoppingCart, Activity, Download, MoreHorizontal, TrendingUp, Sparkles } from 'lucide-react'
import { revenueData, userGrowthData, trafficSources, salesByCategory, activities } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const STATS = [
  { label: 'Total Revenue', value: '$847,290', change: 12.4, trend: 'up', icon: DollarSign, color: 'text-chart-1', bg: 'bg-chart-1/10', spark: [12, 18, 15, 22, 28, 24, 32, 38, 42] },
  { label: 'Active Users', value: '24,580', change: 8.2, trend: 'up', icon: Users, color: 'text-chart-2', bg: 'bg-chart-2/10', spark: [20, 22, 25, 24, 28, 32, 35, 38, 42] },
  { label: 'Conversion Rate', value: '4.82%', change: -2.1, trend: 'down', icon: ShoppingCart, color: 'text-chart-5', bg: 'bg-chart-5/10', spark: [42, 38, 35, 36, 32, 28, 30, 26, 24] },
  { label: 'API Calls', value: '1.42M', change: 24.8, trend: 'up', icon: Activity, color: 'text-chart-3', bg: 'bg-chart-3/10', spark: [10, 14, 18, 22, 28, 32, 38, 44, 52] },
]

export function StatCard({ stat, index }) {
  const Icon = stat.icon
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
      <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center mb-3', stat.bg)}>
                <Icon className={cn('w-4 h-4', stat.color)} />
              </div>
              <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
              <div className="text-2xl font-bold tracking-tight mt-1">{stat.value}</div>
              <div className={cn('text-xs font-medium mt-1.5 flex items-center gap-1', stat.trend === 'up' ? 'text-success' : 'text-destructive')}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {Math.abs(stat.change)}% <span className="text-muted-foreground font-normal">vs last month</span>
              </div>
            </div>
            <div className="w-20 h-12 -mr-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stat.spark.map((v, i) => ({ v, i }))}>
                  <Line type="monotone" dataKey="v" stroke={`hsl(var(${stat.color === 'text-chart-1' ? '--chart-1' : stat.color === 'text-chart-2' ? '--chart-2' : stat.color === 'text-chart-3' ? '--chart-3' : '--chart-5'}))`} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function ChartCard({ title, subtitle, children, action, className }) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export function DashboardView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Welcome back, Sarah 👋</h1>
          <p className="text-sm text-muted-foreground mt-1">Here's what's happening with your business today.</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="30d">
            <SelectTrigger className="w-[140px] h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">This year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="h-9"><Download className="w-4 h-4 mr-2" /> Export</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <ChartCard title="Revenue Overview" subtitle="Monthly revenue vs expenses" className="xl:col-span-2" action={<Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="w-4 h-4" /></Button>}>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="exp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <ReTooltip contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(var(--chart-1))" strokeWidth={2} fill="url(#rev)" />
              <Area type="monotone" dataKey="expenses" stroke="hsl(var(--chart-2))" strokeWidth={2} fill="url(#exp)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Traffic Sources" subtitle="Where users come from">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={trafficSources} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3} strokeWidth={0}>
                {trafficSources.map((s, i) => <Cell key={i} fill={s.color} />)}
              </Pie>
              <ReTooltip contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {trafficSources.map(s => (
              <div key={s.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                <span className="text-muted-foreground truncate">{s.name}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard title="User Growth" subtitle="Weekly signups vs active users" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={userGrowthData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
              <ReTooltip contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="users" fill="hsl(var(--chart-1))" radius={[6, 6, 0, 0]} />
              <Bar dataKey="active" fill="hsl(var(--chart-2))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
            <p className="text-xs text-muted-foreground">Latest team events</p>
          </CardHeader>
          <CardContent className="space-y-3 max-h-[280px] overflow-auto scrollbar-thin">
            {activities.slice(0, 6).map((a) => (
              <div key={a.id} className="flex items-start gap-3">
                <Avatar className="w-8 h-8 shrink-0"><AvatarFallback className="text-[10px] bg-secondary">{a.avatar}</AvatarFallback></Avatar>
                <div className="flex-1 min-w-0">
                  <div className="text-sm"><span className="font-semibold">{a.user}</span> <span className="text-muted-foreground">{a.action}</span> <span className="font-medium">{a.target}</span></div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{a.time}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Goals & live feed */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Monthly Revenue Goal', value: 73420, goal: 100000, color: 'chart-1' },
          { label: 'New Customers Goal', value: 286, goal: 400, color: 'chart-2' },
          { label: 'Customer Satisfaction', value: 94, goal: 100, color: 'chart-3', suffix: '%' },
        ].map((g, i) => (
          <motion.div key={g.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-muted-foreground">{g.label}</span>
                  <Badge variant="secondary" className="text-[10px]">{Math.round((g.value / g.goal) * 100)}%</Badge>
                </div>
                <div className="text-2xl font-bold tracking-tight">{g.suffix ? `${g.value}${g.suffix}` : g.value.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mb-2">of {g.suffix ? `${g.goal}${g.suffix}` : g.goal.toLocaleString()}</div>
                <Progress value={(g.value / g.goal) * 100} className="h-1.5" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
