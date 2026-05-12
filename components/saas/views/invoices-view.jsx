'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Download, Plus, FileText, Filter } from 'lucide-react'
import { invoices } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const statusColors = {
  Paid: 'bg-success/15 text-success',
  Pending: 'bg-warning/15 text-warning',
  Overdue: 'bg-destructive/15 text-destructive',
  Draft: 'bg-muted text-muted-foreground',
}

export function InvoicesView() {
  const total = invoices.reduce((a, i) => a + i.amount, 0)
  const paid = invoices.filter(i => i.status === 'Paid').reduce((a, i) => a + i.amount, 0)
  const pending = invoices.filter(i => i.status === 'Pending').reduce((a, i) => a + i.amount, 0)
  const overdue = invoices.filter(i => i.status === 'Overdue').reduce((a, i) => a + i.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-sm text-muted-foreground mt-1">Track and manage all your invoices.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9"><Download className="w-4 h-4 mr-2" /> Download all</Button>
          <Button size="sm" className="h-9 gradient-primary text-white border-0"><Plus className="w-4 h-4 mr-2" /> New invoice</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total billed', value: `$${total.toLocaleString()}`, sub: `${invoices.length} invoices`, color: 'text-foreground' },
          { label: 'Paid', value: `$${paid.toLocaleString()}`, sub: `${invoices.filter(i => i.status === 'Paid').length} invoices`, color: 'text-success' },
          { label: 'Pending', value: `$${pending.toLocaleString()}`, sub: 'Awaiting payment', color: 'text-warning' },
          { label: 'Overdue', value: `$${overdue.toLocaleString()}`, sub: 'Needs follow-up', color: 'text-destructive' },
        ].map(s => (
          <Card key={s.label}><CardContent className="p-4">
            <div className="text-xs text-muted-foreground">{s.label}</div>
            <div className={cn('text-2xl font-bold mt-1', s.color)}>{s.value}</div>
            <div className="text-[11px] text-muted-foreground mt-1">{s.sub}</div>
          </CardContent></Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between"><CardTitle className="text-base">All invoices</CardTitle><Button variant="outline" size="sm" className="h-8"><Filter className="w-4 h-4 mr-2" /> Filter</Button></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden md:table-cell">Plan</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map(inv => (
                  <TableRow key={inv.id} className="hover:bg-muted/30">
                    <TableCell className="font-mono text-sm font-semibold">{inv.id}</TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">{inv.customer}</div>
                      <div className="text-xs text-muted-foreground">{inv.email}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm">{inv.plan}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{inv.date}</TableCell>
                    <TableCell><Badge className={cn('border-0 text-[10px]', statusColors[inv.status])} variant="secondary">{inv.status}</Badge></TableCell>
                    <TableCell className="text-right font-semibold mono">${inv.amount.toLocaleString()}</TableCell>
                    <TableCell><Button variant="ghost" size="icon" className="h-8 w-8"><FileText className="w-4 h-4" /></Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
