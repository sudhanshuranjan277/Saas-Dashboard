'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Camera, Trash2, Palette, Bell, Shield, Globe, CreditCard, User } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const PRIMARY_COLORS = [
  { name: 'Purple', value: '252 95% 60%' },
  { name: 'Blue', value: '217 91% 60%' },
  { name: 'Green', value: '142 71% 45%' },
  { name: 'Pink', value: '340 82% 60%' },
  { name: 'Orange', value: '24 95% 53%' },
  { name: 'Slate', value: '215 28% 17%' },
]

export function SettingsView() {
  const { theme, setTheme } = useTheme()
  const [color, setColor] = useState(PRIMARY_COLORS[0].value)

  const applyColor = (c) => {
    setColor(c)
    document.documentElement.style.setProperty('--primary', c)
    document.documentElement.style.setProperty('--ring', c)
    document.documentElement.style.setProperty('--sidebar-primary', c)
    toast.success('Theme color updated')
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account, workspace and preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="flex-wrap h-auto justify-start">
          <TabsTrigger value="profile"><User className="w-3.5 h-3.5 mr-1.5" /> Profile</TabsTrigger>
          <TabsTrigger value="appearance"><Palette className="w-3.5 h-3.5 mr-1.5" /> Appearance</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="w-3.5 h-3.5 mr-1.5" /> Notifications</TabsTrigger>
          <TabsTrigger value="security"><Shield className="w-3.5 h-3.5 mr-1.5" /> Security</TabsTrigger>
          <TabsTrigger value="workspace"><Globe className="w-3.5 h-3.5 mr-1.5" /> Workspace</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4 space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Profile</CardTitle><CardDescription>This information will be displayed on your public profile.</CardDescription></CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20"><AvatarFallback className="gradient-primary text-white text-lg font-semibold">SC</AvatarFallback></Avatar>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm"><Camera className="w-4 h-4 mr-2" /> Change photo</Button>
                  <Button variant="ghost" size="sm" className="text-destructive"><Trash2 className="w-4 h-4 mr-2" /> Remove</Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Full name</Label><Input defaultValue="Sarah Chen" /></div>
                <div className="space-y-2"><Label>Email</Label><Input type="email" defaultValue="sarah@nexus.io" /></div>
                <div className="space-y-2"><Label>Role</Label><Input defaultValue="Admin" disabled /></div>
                <div className="space-y-2"><Label>Timezone</Label><Input defaultValue="Pacific Time (PT)" /></div>
              </div>
              <div className="space-y-2"><Label>Bio</Label><Textarea rows={3} placeholder="Tell your team a bit about yourself..." defaultValue="Engineering lead at Nexus. Previously at Stripe & Vercel." /></div>
              <div className="flex gap-2 justify-end"><Button variant="outline">Cancel</Button><Button className="gradient-primary text-white border-0" onClick={() => toast.success('Profile saved!')}>Save changes</Button></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-4 space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Theme</CardTitle><CardDescription>Customize the look and feel of your dashboard.</CardDescription></CardHeader>
            <CardContent className="space-y-5">
              <div>
                <Label className="mb-2 block">Mode</Label>
                <div className="grid grid-cols-2 gap-3">
                  {['light', 'dark'].map(m => (
                    <button key={m} onClick={() => setTheme(m)} className={cn('relative rounded-lg border-2 p-3 text-left transition-all', theme === m ? 'border-primary shadow-sm' : 'border-border hover:border-muted-foreground/30')}>
                      <div className={cn('h-16 rounded-md mb-2', m === 'light' ? 'bg-white border' : 'bg-zinc-900')}>
                        <div className={cn('h-2 rounded-t-md', m === 'light' ? 'bg-zinc-100' : 'bg-zinc-800')} />
                        <div className="p-2 space-y-1">
                          <div className={cn('h-1.5 rounded-full w-2/3', m === 'light' ? 'bg-zinc-300' : 'bg-zinc-700')} />
                          <div className={cn('h-1.5 rounded-full w-1/2', m === 'light' ? 'bg-zinc-200' : 'bg-zinc-800')} />
                        </div>
                      </div>
                      <div className="text-sm font-medium capitalize">{m}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="mb-2 block">Primary color</Label>
                <div className="flex flex-wrap gap-2">
                  {PRIMARY_COLORS.map(c => (
                    <button key={c.name} onClick={() => applyColor(c.value)} className={cn('w-10 h-10 rounded-lg border-2 transition-all', color === c.value ? 'border-foreground scale-110 shadow-md' : 'border-transparent hover:scale-105')} style={{ background: `hsl(${c.value})` }} title={c.name} />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Notification preferences</CardTitle></CardHeader>
            <CardContent className="divide-y">
              {[
                { label: 'Email notifications', desc: 'Receive emails about your account activity', defaultOn: true },
                { label: 'Push notifications', desc: 'Get push notifications on your devices', defaultOn: true },
                { label: 'Weekly summary', desc: 'A weekly digest of your workspace stats', defaultOn: true },
                { label: 'Product updates', desc: "News and updates from the Nexus team", defaultOn: false },
                { label: 'Security alerts', desc: 'Important security notifications', defaultOn: true },
                { label: 'Mentions only', desc: 'Only notify when someone @mentions you', defaultOn: false },
              ].map(o => (
                <div key={o.label} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="text-sm font-medium">{o.label}</div>
                    <div className="text-xs text-muted-foreground">{o.desc}</div>
                  </div>
                  <Switch defaultChecked={o.defaultOn} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4 space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Two-factor authentication</CardTitle><CardDescription>Add an extra layer of security to your account.</CardDescription></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div><div className="text-sm font-medium">Authenticator app</div><div className="text-xs text-muted-foreground">Use an app like 1Password or Authy</div></div>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div><div className="text-sm font-medium">SMS verification</div><div className="text-xs text-muted-foreground">Receive codes via text message</div></div>
                <Switch />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Change password</CardTitle></CardHeader>
            <CardContent className="space-y-3 max-w-md">
              <div className="space-y-2"><Label>Current password</Label><Input type="password" /></div>
              <div className="space-y-2"><Label>New password</Label><Input type="password" /></div>
              <div className="space-y-2"><Label>Confirm password</Label><Input type="password" /></div>
              <Button className="gradient-primary text-white border-0">Update password</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workspace" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Workspace</CardTitle></CardHeader>
            <CardContent className="space-y-4 max-w-md">
              <div className="space-y-2"><Label>Workspace name</Label><Input defaultValue="Nexus HQ" /></div>
              <div className="space-y-2"><Label>Workspace URL</Label><div className="flex"><span className="inline-flex items-center px-3 rounded-l-md border border-r-0 bg-muted text-sm text-muted-foreground">nexus.io/</span><Input className="rounded-l-none" defaultValue="nexus-hq" /></div></div>
              <Separator />
              <div className="space-y-2">
                <div className="text-sm font-semibold text-destructive">Danger zone</div>
                <Button variant="destructive" size="sm">Delete workspace</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
