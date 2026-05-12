'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Shield, Search, Download, AlertTriangle, Info, AlertCircle } from 'lucide-react'
import { auditLogs } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const severityColors = {
  info: 'bg-info/15 text-info',
  warning: 'bg-warning/15 text-warning',
  critical: 'bg-destructive/15 text-destructive',
}

const severityIcon = {
  info: Info,
  warning: AlertTriangle,
  critical: AlertCircle,
}

export function AuditView() {
  const [query, setQuery] = useState('')
  const filtered = auditLogs.filter(l => l.action.toLowerCase().includes(query.toLowerCase()) || l.user.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="w-7 h-7 text-primary" /> Audit Logs
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Full audit trail of workspace activity.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search logs..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9 h-9 w-[200px]" />
          </div>
          <Button variant="outline" size="sm" className="h-9"><Download className="w-4 h-4 mr-2" /> Export</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Severity</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead className="hidden md:table-cell">IP Address</TableHead>
                  <TableHead className="text-right">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(l => {
                  const Icon = severityIcon[l.severity]
                  return (
                    <TableRow key={l.id} className="hover:bg-muted/30">
                      <TableCell>
                        <Badge className={cn('border-0 text-[10px] gap-1', severityColors[l.severity])} variant="secondary">
                          <Icon className="w-3 h-3" /> {l.severity}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{l.action}</TableCell>
                      <TableCell className="text-sm font-medium">{l.user}</TableCell>
                      <TableCell className="hidden md:table-cell text-xs font-mono text-muted-foreground">{l.ip}</TableCell>
                      <TableCell className="text-right text-xs text-muted-foreground">{l.time}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
