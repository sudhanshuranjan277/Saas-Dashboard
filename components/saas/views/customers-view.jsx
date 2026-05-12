'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Search, Plus, Filter, Download, ArrowUpDown } from 'lucide-react'
import { customers } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const planColors = {
  Enterprise: 'bg-primary/15 text-primary',
  Pro: 'bg-info/15 text-info',
  Team: 'bg-chart-3/15 text-chart-3',
  Starter: 'bg-muted text-muted-foreground',
}
const statusColors = {
  Active: 'bg-success/15 text-success',
  'At Risk': 'bg-warning/15 text-warning',
  Trial: 'bg-info/15 text-info',
  Churned: 'bg-destructive/15 text-destructive',
}

export function CustomersView() {
  const [query, setQuery] = useState('')
  const filtered = customers.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || c.email.toLowerCase().includes(query.toLowerCase()))
  const totalMRR = customers.reduce((a, c) => a + c.mrr, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your customer relationships.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9"><Download className="w-4 h-4 mr-2" /> Export CSV</Button>
          <Button size="sm" className="h-9 gradient-primary text-white border-0"><Plus className="w-4 h-4 mr-2" /> Add customer</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total customers', value: customers.length, sub: '+12 this month' },
          { label: 'Monthly MRR', value: `$${(totalMRR / 1000).toFixed(1)}k`, sub: '+8.4% MoM' },
          { label: 'Active', value: customers.filter(c => c.status === 'Active').length, sub: '' },
          { label: 'At risk', value: customers.filter(c => c.status === 'At Risk').length, sub: 'Action needed' },
        ].map(s => (
          <Card key={s.label}><CardContent className="p-4">
            <div className="text-xs text-muted-foreground">{s.label}</div>
            <div className="text-2xl font-bold mt-1">{s.value}</div>
            {s.sub && <div className="text-[11px] text-muted-foreground mt-1">{s.sub}</div>}
          </CardContent></Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <CardTitle className="text-base">All customers</CardTitle>
          <div className="flex gap-2 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search customers..." className="pl-9 h-9 w-[200px] md:w-[280px]" />
            </div>
            <Button variant="outline" size="sm" className="h-9"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead className="hidden md:table-cell">Contact</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead className="text-right">MRR</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Country</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(c => (
                  <TableRow key={c.id} className="hover:bg-muted/30 cursor-pointer">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-9 h-9"><AvatarFallback className="text-xs bg-secondary">{c.name.slice(0, 2).toUpperCase()}</AvatarFallback></Avatar>
                        <div>
                          <div className="text-sm font-semibold">{c.name}</div>
                          <div className="text-xs text-muted-foreground md:hidden">{c.contact}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="text-sm">{c.contact}</div>
                      <div className="text-xs text-muted-foreground">{c.email}</div>
                    </TableCell>
                    <TableCell><Badge className={cn('border-0 text-[10px]', planColors[c.plan])} variant="secondary">{c.plan}</Badge></TableCell>
                    <TableCell className="text-right font-semibold mono">${c.mrr.toLocaleString()}</TableCell>
                    <TableCell><Badge className={cn('border-0 text-[10px]', statusColors[c.status])} variant="secondary">{c.status}</Badge></TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{c.country}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between px-4 py-3 border-t text-xs text-muted-foreground">
            <span>Showing {filtered.length} of {customers.length} customers</span>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" className="h-7">Previous</Button>
              <Button variant="outline" size="sm" className="h-7">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
