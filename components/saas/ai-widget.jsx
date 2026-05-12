'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Sparkles, X, Send, Bot } from 'lucide-react'
import { cn } from '@/lib/utils'

const SUGGESTIONS = [
  'Show me this month\'s revenue',
  'Top 5 customers by MRR',
  'Generate a sales report',
  'What are my overdue invoices?',
]

const CANNED = {
  default: "I'm your Nexus AI assistant. I can help with analytics, reports, drafting emails, and answering questions about your workspace.",
  revenue: "This month you\u2019re at **$73,420**, up 12.4% from last month. Pro plan drives 58% of MRR.",
  customers: "Your top 5 customers by MRR: Stark Industries ($12.8k), Umbrella Co ($6.4k), Acme Corp ($4.3k), Wayne Enterprises ($3.7k), Hooli ($2.5k).",
  report: "Drafted a Q2 sales report \u2014 12 pages, 8 charts. Want me to email it to the team?",
  overdue: "You have 1 overdue invoice: INV-1038 (Hooli) \u2014 $2,480, 17 days past due. Send a reminder?",
}

function reply(q) {
  const x = q.toLowerCase()
  if (x.includes('revenue') || x.includes('month')) return CANNED.revenue
  if (x.includes('customer')) return CANNED.customers
  if (x.includes('report')) return CANNED.report
  if (x.includes('overdue') || x.includes('invoice')) return CANNED.overdue
  return CANNED.default
}

export function AIWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi Sarah 👋 I\u2019m Nexus AI. Ask me anything about your business.' },
  ])
  const [input, setInput] = useState('')

  const send = (text) => {
    const q = (text ?? input).trim()
    if (!q) return
    setMessages((m) => [...m, { role: 'user', text: q }])
    setInput('')
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'assistant', text: reply(q) }])
    }, 500)
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full gradient-primary shadow-xl shadow-primary/30 flex items-center justify-center text-white pulse-glow"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X className="w-6 h-6" /></motion.div>
          ) : (
            <motion.div key="s" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><Sparkles className="w-6 h-6" /></motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-40 w-[calc(100vw-3rem)] sm:w-[380px] h-[520px] glass-card rounded-2xl shadow-2xl border flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center"><Bot className="w-5 h-5 text-white" /></div>
              <div className="flex-1">
                <div className="font-semibold text-sm">Nexus AI</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-success" /> Online · GPT-4o</div>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {messages.map((m, i) => (
                  <div key={i} className={cn('flex gap-2', m.role === 'user' && 'flex-row-reverse')}>
                    {m.role === 'assistant' && <Avatar className="w-7 h-7"><AvatarFallback className="gradient-primary text-white text-[10px]">AI</AvatarFallback></Avatar>}
                    <div className={cn('rounded-2xl px-3 py-2 text-sm max-w-[80%]', m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {messages.length <= 1 && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                {SUGGESTIONS.map(s => (
                  <button key={s} onClick={() => send(s)} className="text-[11px] px-2 py-1 rounded-full bg-muted hover:bg-accent transition-colors">{s}</button>
                ))}
              </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); send() }} className="p-3 border-t flex gap-2">
              <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask me anything..." className="h-9" />
              <Button type="submit" size="icon" className="h-9 w-9 shrink-0 gradient-primary border-0"><Send className="w-4 h-4" /></Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
