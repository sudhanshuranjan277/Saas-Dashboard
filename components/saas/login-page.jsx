'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp'
import { Sparkles, Mail, Lock, ArrowRight, Github, Chrome, Eye, EyeOff, ShieldCheck, Zap, BarChart3, Users } from 'lucide-react'
import { toast } from 'sonner'

export function LoginPage({ onLogin }) {
  const [view, setView] = useState('login') // login | signup | forgot | otp
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('demo@nexus.io')
  const [password, setPassword] = useState('demo1234')

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (view === 'signup') {
        toast.success('Account created — check your email!')
        setView('otp')
      } else if (view === 'forgot') {
        toast.success('Reset link sent')
        setView('login')
      } else if (view === 'otp') {
        toast.success('Verified — welcome to Nexus!')
        onLogin({ name: 'Sarah Chen', email })
      } else {
        toast.success('Welcome back, Sarah!')
        onLogin({ name: 'Sarah Chen', email })
      }
    }, 900)
  }

  const handleSocial = (provider) => {
    setLoading(true)
    setTimeout(() => {
      toast.success(`Signed in with ${provider}`)
      onLogin({ name: 'Sarah Chen', email: 'sarah@nexus.io' })
    }, 700)
  }

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 bg-background gradient-mesh">
      {/* Left panel — hero */}
      <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Nexus</span>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6 max-w-md">
          <h1 className="text-5xl font-bold tracking-tight leading-[1.1]">
            The platform for <span className="gradient-text">modern teams</span>.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Everything you need to run, grow, and scale your SaaS — from real-time analytics to billing, in one unified workspace.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-6">
            {[
              { icon: BarChart3, label: 'Real-time analytics' },
              { icon: Users, label: 'Team collaboration' },
              { icon: Zap, label: 'Automated workflows' },
              { icon: ShieldCheck, label: 'Enterprise security' },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-3 glass-card rounded-xl p-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <f.icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">{f.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Trusted by 12,400+ teams</span>
          <Separator orientation="vertical" className="h-4" />
          <span>SOC2 · GDPR · HIPAA</span>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Nexus</span>
          </div>

          <AnimatePresence mode="wait">
            {view === 'otp' ? (
              <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Verify your email</h2>
                  <p className="text-sm text-muted-foreground mt-1">Enter the 6-digit code we sent to {email}</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex justify-center">
                    <InputOTP maxLength={6}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <Button type="submit" disabled={loading} className="w-full gradient-primary text-white border-0 hover:opacity-90">
                    {loading ? 'Verifying...' : 'Verify & continue'} <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <button type="button" onClick={() => setView('login')} className="text-sm text-muted-foreground hover:text-foreground w-full text-center">Back to login</button>
                </form>
              </motion.div>
            ) : view === 'forgot' ? (
              <motion.div key="forgot" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Reset your password</h2>
                  <p className="text-sm text-muted-foreground mt-1">Enter your email and we'll send a reset link.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="f-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="f-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="pl-9" required />
                    </div>
                  </div>
                  <Button type="submit" disabled={loading} className="w-full gradient-primary text-white border-0 hover:opacity-90">
                    {loading ? 'Sending...' : 'Send reset link'}
                  </Button>
                  <button type="button" onClick={() => setView('login')} className="text-sm text-muted-foreground hover:text-foreground w-full text-center">Back to login</button>
                </form>
              </motion.div>
            ) : (
              <motion.div key="auth" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">
                    {view === 'login' ? 'Welcome back' : 'Create your account'}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {view === 'login' ? 'Sign in to your Nexus workspace' : 'Start your 14-day free trial — no credit card required'}
                  </p>
                </div>

                <Tabs value={view} onValueChange={setView} className="w-full">
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="login">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>

                  <TabsContent value={view} className="space-y-4 mt-6">
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" onClick={() => handleSocial('Google')} disabled={loading} className="w-full">
                        <Chrome className="w-4 h-4 mr-2" /> Google
                      </Button>
                      <Button variant="outline" onClick={() => handleSocial('GitHub')} disabled={loading} className="w-full">
                        <Github className="w-4 h-4 mr-2" /> GitHub
                      </Button>
                    </div>

                    <div className="relative">
                      <Separator />
                      <span className="absolute left-1/2 -translate-x-1/2 -top-2 bg-background px-2 text-xs text-muted-foreground">or continue with email</span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {view === 'signup' && (
                        <div className="space-y-2">
                          <Label htmlFor="name">Full name</Label>
                          <Input id="name" placeholder="Jane Doe" required />
                        </div>
                      )}
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="pl-9" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          {view === 'login' && (
                            <button type="button" onClick={() => setView('forgot')} className="text-xs text-primary hover:underline">Forgot password?</button>
                          )}
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input id="password" type={showPwd ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pl-9 pr-9" required />
                          <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                            {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      {view === 'login' ? (
                        <div className="flex items-center gap-2">
                          <Checkbox id="remember" defaultChecked />
                          <label htmlFor="remember" className="text-sm text-muted-foreground">Keep me signed in</label>
                        </div>
                      ) : (
                        <div className="flex items-start gap-2">
                          <Checkbox id="tos" required className="mt-0.5" />
                          <label htmlFor="tos" className="text-xs text-muted-foreground leading-relaxed">
                            I agree to the <a className="text-primary hover:underline">Terms of Service</a> and <a className="text-primary hover:underline">Privacy Policy</a>
                          </label>
                        </div>
                      )}
                      <Button type="submit" disabled={loading} className="w-full gradient-primary text-white border-0 hover:opacity-90">
                        {loading ? 'Please wait...' : view === 'login' ? 'Sign in to Nexus' : 'Create my account'}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                <p className="text-xs text-center text-muted-foreground">
                  Protected by enterprise-grade encryption · SOC2 compliant
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
