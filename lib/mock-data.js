// Mock data for the SaaS dashboard

export const revenueData = [
  { month: 'Jan', revenue: 42000, profit: 12000, expenses: 30000 },
  { month: 'Feb', revenue: 48000, profit: 15000, expenses: 33000 },
  { month: 'Mar', revenue: 55000, profit: 18000, expenses: 37000 },
  { month: 'Apr', revenue: 51000, profit: 16000, expenses: 35000 },
  { month: 'May', revenue: 67000, profit: 24000, expenses: 43000 },
  { month: 'Jun', revenue: 73000, profit: 28000, expenses: 45000 },
  { month: 'Jul', revenue: 82000, profit: 32000, expenses: 50000 },
  { month: 'Aug', revenue: 89000, profit: 36000, expenses: 53000 },
  { month: 'Sep', revenue: 95000, profit: 41000, expenses: 54000 },
  { month: 'Oct', revenue: 108000, profit: 48000, expenses: 60000 },
  { month: 'Nov', revenue: 121000, profit: 55000, expenses: 66000 },
  { month: 'Dec', revenue: 138000, profit: 64000, expenses: 74000 },
]

export const userGrowthData = [
  { week: 'W1', users: 1240, active: 980 },
  { week: 'W2', users: 1480, active: 1180 },
  { week: 'W3', users: 1820, active: 1450 },
  { week: 'W4', users: 2150, active: 1720 },
  { week: 'W5', users: 2480, active: 1980 },
  { week: 'W6', users: 2890, active: 2340 },
  { week: 'W7', users: 3240, active: 2680 },
  { week: 'W8', users: 3680, active: 3040 },
]

export const trafficSources = [
  { name: 'Organic Search', value: 4280, color: 'hsl(252 95% 60%)' },
  { name: 'Direct', value: 3120, color: 'hsl(199 89% 48%)' },
  { name: 'Social Media', value: 2450, color: 'hsl(340 82% 60%)' },
  { name: 'Referral', value: 1680, color: 'hsl(142 71% 45%)' },
  { name: 'Email', value: 980, color: 'hsl(38 92% 50%)' },
]

export const salesByCategory = [
  { category: 'Pro Plan', sales: 4280 },
  { category: 'Team Plan', sales: 3650 },
  { category: 'Enterprise', sales: 2840 },
  { category: 'Starter', sales: 1920 },
  { category: 'Add-ons', sales: 1240 },
]

export const conversionFunnel = [
  { stage: 'Visitors', value: 24580 },
  { stage: 'Signups', value: 8420 },
  { stage: 'Trials', value: 3680 },
  { stage: 'Customers', value: 1240 },
]

export const teamMembers = [
  { id: '1', name: 'Sarah Chen', email: 'sarah@nexus.io', role: 'Admin', status: 'Active', avatar: 'SC', dept: 'Engineering', joined: '2023-01-15' },
  { id: '2', name: 'Marcus Johnson', email: 'marcus@nexus.io', role: 'Developer', status: 'Active', avatar: 'MJ', dept: 'Engineering', joined: '2023-03-22' },
  { id: '3', name: 'Elena Rodriguez', email: 'elena@nexus.io', role: 'Designer', status: 'Active', avatar: 'ER', dept: 'Design', joined: '2023-02-10' },
  { id: '4', name: 'David Kim', email: 'david@nexus.io', role: 'Manager', status: 'Away', avatar: 'DK', dept: 'Product', joined: '2022-11-05' },
  { id: '5', name: 'Priya Patel', email: 'priya@nexus.io', role: 'Developer', status: 'Active', avatar: 'PP', dept: 'Engineering', joined: '2023-05-18' },
  { id: '6', name: 'James Wilson', email: 'james@nexus.io', role: 'Analyst', status: 'Offline', avatar: 'JW', dept: 'Marketing', joined: '2023-04-12' },
  { id: '7', name: 'Nora Ahmed', email: 'nora@nexus.io', role: 'Designer', status: 'Active', avatar: 'NA', dept: 'Design', joined: '2023-06-01' },
  { id: '8', name: 'Tomás García', email: 'tomas@nexus.io', role: 'Developer', status: 'Active', avatar: 'TG', dept: 'Engineering', joined: '2023-07-14' },
]

export const projects = [
  { id: 'p1', name: 'Mobile App Redesign', status: 'In Progress', progress: 68, team: ['SC', 'ER', 'MJ'], dueDate: 'Jul 18', priority: 'High', tasks: 24, completed: 16 },
  { id: 'p2', name: 'API v2 Migration', status: 'In Progress', progress: 42, team: ['MJ', 'PP', 'TG'], dueDate: 'Aug 02', priority: 'Critical', tasks: 38, completed: 16 },
  { id: 'p3', name: 'Marketing Site Launch', status: 'Review', progress: 92, team: ['ER', 'NA', 'JW'], dueDate: 'Jun 30', priority: 'High', tasks: 18, completed: 17 },
  { id: 'p4', name: 'Customer Onboarding Flow', status: 'Planning', progress: 15, team: ['DK', 'SC'], dueDate: 'Aug 25', priority: 'Medium', tasks: 12, completed: 2 },
  { id: 'p5', name: 'Analytics Dashboard v3', status: 'In Progress', progress: 56, team: ['MJ', 'NA', 'PP', 'TG'], dueDate: 'Jul 30', priority: 'High', tasks: 32, completed: 18 },
  { id: 'p6', name: 'Billing System Overhaul', status: 'Completed', progress: 100, team: ['DK', 'SC', 'JW'], dueDate: 'Jun 15', priority: 'Critical', tasks: 28, completed: 28 },
]

export const invoices = [
  { id: 'INV-1042', customer: 'Acme Corp', email: 'billing@acme.com', amount: 4280, status: 'Paid', date: '2025-06-15', plan: 'Enterprise' },
  { id: 'INV-1041', customer: 'Globex Inc', email: 'ap@globex.com', amount: 1240, status: 'Pending', date: '2025-06-14', plan: 'Pro' },
  { id: 'INV-1040', customer: 'Initech', email: 'finance@initech.com', amount: 890, status: 'Paid', date: '2025-06-12', plan: 'Team' },
  { id: 'INV-1039', customer: 'Umbrella Co', email: 'pay@umbrella.com', amount: 6420, status: 'Paid', date: '2025-06-10', plan: 'Enterprise' },
  { id: 'INV-1038', customer: 'Hooli', email: 'billing@hooli.com', amount: 2480, status: 'Overdue', date: '2025-05-28', plan: 'Pro' },
  { id: 'INV-1037', customer: 'Pied Piper', email: 'richard@pp.com', amount: 580, status: 'Paid', date: '2025-06-08', plan: 'Starter' },
  { id: 'INV-1036', customer: 'Stark Industries', email: 'pepper@stark.com', amount: 12840, status: 'Paid', date: '2025-06-05', plan: 'Enterprise' },
  { id: 'INV-1035', customer: 'Wayne Enterprises', email: 'lucius@wayne.com', amount: 3680, status: 'Pending', date: '2025-06-04', plan: 'Pro' },
]

export const customers = [
  { id: 'c1', name: 'Acme Corp', contact: 'John Doe', email: 'john@acme.com', plan: 'Enterprise', mrr: 4280, status: 'Active', country: 'USA', joined: '2024-01-10' },
  { id: 'c2', name: 'Globex Inc', contact: 'Hank Scorpio', email: 'hank@globex.com', plan: 'Pro', mrr: 1240, status: 'Active', country: 'Canada', joined: '2024-03-22' },
  { id: 'c3', name: 'Initech', contact: 'Bill Lumbergh', email: 'bill@initech.com', plan: 'Team', mrr: 890, status: 'Active', country: 'USA', joined: '2024-02-15' },
  { id: 'c4', name: 'Umbrella Co', contact: 'Albert Wesker', email: 'wesker@umbrella.com', plan: 'Enterprise', mrr: 6420, status: 'Active', country: 'UK', joined: '2023-11-05' },
  { id: 'c5', name: 'Hooli', contact: 'Gavin Belson', email: 'gavin@hooli.com', plan: 'Pro', mrr: 2480, status: 'At Risk', country: 'USA', joined: '2024-04-18' },
  { id: 'c6', name: 'Pied Piper', contact: 'Richard Hendricks', email: 'richard@pp.com', plan: 'Starter', mrr: 580, status: 'Trial', country: 'USA', joined: '2025-05-30' },
  { id: 'c7', name: 'Stark Industries', contact: 'Pepper Potts', email: 'pepper@stark.com', plan: 'Enterprise', mrr: 12840, status: 'Active', country: 'USA', joined: '2023-09-12' },
  { id: 'c8', name: 'Wayne Enterprises', contact: 'Lucius Fox', email: 'lucius@wayne.com', plan: 'Pro', mrr: 3680, status: 'Active', country: 'USA', joined: '2024-06-08' },
]

export const activities = [
  { id: 'a1', user: 'Sarah Chen', avatar: 'SC', action: 'deployed', target: 'production-v2.4.1', time: '2m ago', type: 'deploy' },
  { id: 'a2', user: 'Marcus Johnson', avatar: 'MJ', action: 'merged PR', target: '#1284 — Add OAuth flow', time: '12m ago', type: 'code' },
  { id: 'a3', user: 'Elena Rodriguez', avatar: 'ER', action: 'commented on', target: 'Mobile App Redesign', time: '24m ago', type: 'comment' },
  { id: 'a4', user: 'David Kim', avatar: 'DK', action: 'created', target: 'Q3 OKRs document', time: '1h ago', type: 'create' },
  { id: 'a5', user: 'Priya Patel', avatar: 'PP', action: 'closed', target: 'Bug #4821 — Login flow', time: '2h ago', type: 'close' },
  { id: 'a6', user: 'James Wilson', avatar: 'JW', action: 'shared report', target: 'June Marketing Analytics', time: '3h ago', type: 'share' },
  { id: 'a7', user: 'Nora Ahmed', avatar: 'NA', action: 'updated', target: 'Design System v2', time: '5h ago', type: 'update' },
]

export const notifications = [
  { id: 'n1', title: 'New customer signup', message: 'Pied Piper just started a trial', time: '5m ago', read: false, type: 'success' },
  { id: 'n2', title: 'Payment received', message: 'Stark Industries — $12,840', time: '1h ago', read: false, type: 'success' },
  { id: 'n3', title: 'Subscription cancelled', message: 'Cyberdyne Systems cancelled their Pro plan', time: '3h ago', read: false, type: 'warning' },
  { id: 'n4', title: 'API limit warning', message: "You've used 80% of your monthly quota", time: '6h ago', read: true, type: 'warning' },
  { id: 'n5', title: 'New team member', message: 'Tomás García accepted your invite', time: '1d ago', read: true, type: 'info' },
]

export const apiUsage = [
  { day: 'Mon', calls: 24800, errors: 124 },
  { day: 'Tue', calls: 32400, errors: 89 },
  { day: 'Wed', calls: 28900, errors: 156 },
  { day: 'Thu', calls: 41200, errors: 78 },
  { day: 'Fri', calls: 48600, errors: 92 },
  { day: 'Sat', calls: 22400, errors: 45 },
  { day: 'Sun', calls: 18900, errors: 32 },
]

export const kanbanColumns = {
  backlog: {
    title: 'Backlog',
    color: 'hsl(240 5% 65%)',
    tasks: [
      { id: 't1', title: 'Research competitor pricing', tag: 'Research', priority: 'low', assignee: 'JW' },
      { id: 't2', title: 'Set up A/B testing framework', tag: 'Engineering', priority: 'medium', assignee: 'MJ' },
      { id: 't3', title: 'Customer interview script', tag: 'Product', priority: 'low', assignee: 'DK' },
    ],
  },
  todo: {
    title: 'To Do',
    color: 'hsl(199 89% 48%)',
    tasks: [
      { id: 't4', title: 'Design new pricing page', tag: 'Design', priority: 'high', assignee: 'ER' },
      { id: 't5', title: 'Implement SSO with SAML', tag: 'Engineering', priority: 'critical', assignee: 'PP' },
      { id: 't6', title: 'Write Q3 blog content', tag: 'Marketing', priority: 'medium', assignee: 'JW' },
    ],
  },
  inprogress: {
    title: 'In Progress',
    color: 'hsl(38 92% 50%)',
    tasks: [
      { id: 't7', title: 'Build dashboard v3 components', tag: 'Engineering', priority: 'high', assignee: 'SC' },
      { id: 't8', title: 'Mobile onboarding flow', tag: 'Design', priority: 'high', assignee: 'NA' },
    ],
  },
  review: {
    title: 'In Review',
    color: 'hsl(252 95% 60%)',
    tasks: [
      { id: 't9', title: 'API rate limiting docs', tag: 'Docs', priority: 'medium', assignee: 'TG' },
      { id: 't10', title: 'Stripe webhooks v2', tag: 'Engineering', priority: 'critical', assignee: 'MJ' },
    ],
  },
  done: {
    title: 'Done',
    color: 'hsl(142 71% 45%)',
    tasks: [
      { id: 't11', title: 'Launch referral program', tag: 'Marketing', priority: 'high', assignee: 'DK' },
      { id: 't12', title: 'Refactor billing service', tag: 'Engineering', priority: 'high', assignee: 'PP' },
      { id: 't13', title: 'New brand guidelines', tag: 'Design', priority: 'medium', assignee: 'ER' },
    ],
  },
}

export const calendarEvents = [
  { id: 'e1', title: 'Sprint Planning', day: 2, time: '09:00', duration: 2, color: 'primary' },
  { id: 'e2', title: 'Design Review', day: 3, time: '11:00', duration: 1, color: 'pink' },
  { id: 'e3', title: 'Customer Call — Acme', day: 4, time: '14:00', duration: 1, color: 'blue' },
  { id: 'e4', title: 'All-Hands', day: 5, time: '10:00', duration: 1, color: 'green' },
  { id: 'e5', title: 'Product Demo', day: 8, time: '15:00', duration: 1, color: 'orange' },
  { id: 'e6', title: '1:1 with David', day: 10, time: '13:00', duration: 1, color: 'primary' },
  { id: 'e7', title: 'Q3 Strategy Sync', day: 12, time: '10:00', duration: 2, color: 'blue' },
  { id: 'e8', title: 'Engineering Review', day: 15, time: '14:00', duration: 1, color: 'green' },
  { id: 'e9', title: 'Board Meeting', day: 18, time: '09:00', duration: 3, color: 'pink' },
  { id: 'e10', title: 'Customer Workshop', day: 22, time: '11:00', duration: 2, color: 'orange' },
]

export const integrations = [
  { name: 'Slack', desc: 'Team messaging and notifications', connected: true, category: 'Communication', icon: '💬' },
  { name: 'GitHub', desc: 'Source control and code reviews', connected: true, category: 'Development', icon: '🐙' },
  { name: 'Stripe', desc: 'Payments and subscription billing', connected: true, category: 'Billing', icon: '💳' },
  { name: 'Linear', desc: 'Issue tracking and project planning', connected: false, category: 'Productivity', icon: '📐' },
  { name: 'Figma', desc: 'Design files and collaboration', connected: true, category: 'Design', icon: '🎨' },
  { name: 'Notion', desc: 'Docs and knowledge management', connected: false, category: 'Productivity', icon: '📝' },
  { name: 'Google Drive', desc: 'Cloud file storage', connected: false, category: 'Storage', icon: '📁' },
  { name: 'Zapier', desc: 'Automate workflows across apps', connected: true, category: 'Automation', icon: '⚡' },
  { name: 'Intercom', desc: 'Customer support and chat', connected: false, category: 'Support', icon: '💭' },
]

export const auditLogs = [
  { id: 'l1', user: 'Sarah Chen', action: 'updated billing settings', ip: '192.168.1.42', time: '2m ago', severity: 'info' },
  { id: 'l2', user: 'Marcus Johnson', action: 'created API key prod_*****a82f', ip: '10.0.4.15', time: '14m ago', severity: 'warning' },
  { id: 'l3', user: 'Admin', action: 'deleted user account demo@test.com', ip: '192.168.1.1', time: '1h ago', severity: 'critical' },
  { id: 'l4', user: 'David Kim', action: 'invited 3 new members', ip: '172.16.0.8', time: '2h ago', severity: 'info' },
  { id: 'l5', user: 'Priya Patel', action: 'rotated webhook secret', ip: '10.0.4.22', time: '4h ago', severity: 'warning' },
  { id: 'l6', user: 'System', action: 'automatic backup completed', ip: 'internal', time: '6h ago', severity: 'info' },
  { id: 'l7', user: 'Elena Rodriguez', action: 'changed workspace permissions', ip: '192.168.1.55', time: '8h ago', severity: 'warning' },
]
