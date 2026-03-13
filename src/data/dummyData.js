// ── Users ──────────────────────────────────────────────
export const USERS = [
  { id:1,  name:'John Doe',        email:'john@example.com',    role:'Admin',   status:'Active',   joined:'Jan 12, 2024', avatar:'JD', revenue:'$12,400', country:'🇺🇸 USA',       phone:'+1 555 0001' },
  { id:2,  name:'Sarah Smith',     email:'sarah@example.com',   role:'Editor',  status:'Active',   joined:'Feb 3, 2024',  avatar:'SS', revenue:'$8,200',  country:'🇬🇧 UK',        phone:'+44 7911 0002' },
  { id:3,  name:'Ahmed Khan',      email:'ahmed@example.com',   role:'User',    status:'Active',   joined:'Feb 18, 2024', avatar:'AK', revenue:'$5,600',  country:'🇵🇰 Pakistan',  phone:'+92 300 0003' },
  { id:4,  name:'Emily Chen',      email:'emily@example.com',   role:'Manager', status:'Inactive', joined:'Mar 5, 2024',  avatar:'EC', revenue:'$9,800',  country:'🇨🇳 China',     phone:'+86 138 0004' },
  { id:5,  name:'Carlos Rivera',   email:'carlos@example.com',  role:'User',    status:'Active',   joined:'Mar 22, 2024', avatar:'CR', revenue:'$3,100',  country:'🇪🇸 Spain',     phone:'+34 612 0005' },
  { id:6,  name:'Priya Patel',     email:'priya@example.com',   role:'Editor',  status:'Pending',  joined:'Apr 1, 2024',  avatar:'PP', revenue:'$6,700',  country:'🇮🇳 India',     phone:'+91 982 0006' },
  { id:7,  name:'Marcus Johnson',  email:'marcus@example.com',  role:'Admin',   status:'Active',   joined:'Apr 14, 2024', avatar:'MJ', revenue:'$14,200', country:'🇺🇸 USA',       phone:'+1 555 0007' },
  { id:8,  name:'Lena Müller',     email:'lena@example.com',    role:'User',    status:'Active',   joined:'May 2, 2024',  avatar:'LM', revenue:'$4,500',  country:'🇩🇪 Germany',   phone:'+49 162 0008' },
  { id:9,  name:'Yuki Tanaka',     email:'yuki@example.com',    role:'Editor',  status:'Inactive', joined:'May 20, 2024', avatar:'YT', revenue:'$7,300',  country:'🇯🇵 Japan',     phone:'+81 90 0009' },
  { id:10, name:'Fatima Al-Zahra', email:'fatima@example.com',  role:'Manager', status:'Active',   joined:'Jun 8, 2024',  avatar:'FA', revenue:'$11,600', country:'🇸🇦 Saudi',     phone:'+966 50 0010' },
  { id:11, name:'James Wilson',    email:'james@example.com',   role:'User',    status:'Active',   joined:'Jun 25, 2024', avatar:'JW', revenue:'$2,900',  country:'🇦🇺 Australia', phone:'+61 4 0011' },
  { id:12, name:'Sofia Rossi',     email:'sofia@example.com',   role:'Editor',  status:'Pending',  joined:'Jul 10, 2024', avatar:'SR', revenue:'$5,100',  country:'🇮🇹 Italy',     phone:'+39 328 0012' },
]

// ── Recent Orders ──────────────────────────────────────
export const RECENT_ORDERS = [
  { id:'#ORD-1042', customer:'John Doe',      product:'Pro Plan',    amount:'$299', status:'Completed', date:'Today, 12:34'   },
  { id:'#ORD-1041', customer:'Sarah Smith',   product:'Enterprise',  amount:'$899', status:'Pending',   date:'Today, 09:15'   },
  { id:'#ORD-1040', customer:'Ahmed Khan',    product:'Starter',     amount:'$49',  status:'Completed', date:'Yesterday'      },
  { id:'#ORD-1039', customer:'Emily Chen',    product:'Pro Plan',    amount:'$299', status:'Failed',    date:'Yesterday'      },
  { id:'#ORD-1038', customer:'Carlos Rivera', product:'Starter',     amount:'$49',  status:'Completed', date:'2 days ago'     },
]

// ── Notifications ─────────────────────────────────────
export const NOTIFICATIONS = [
  { id:1, icon:'fa-user-plus',           color:'text-brand-400', bg:'bg-brand-500/10',  msg:'New user John Doe registered',     time:'2 min ago',  unread:true  },
  { id:2, icon:'fa-credit-card',         color:'text-green-400', bg:'bg-green-500/10',  msg:'Payment of $899 received',         time:'15 min ago', unread:true  },
  { id:3, icon:'fa-triangle-exclamation',color:'text-amber-400', bg:'bg-amber-500/10',  msg:'Server CPU usage above 85%',       time:'1 hr ago',   unread:true  },
  { id:4, icon:'fa-star',                color:'text-yellow-400',bg:'bg-yellow-500/10', msg:'New 5-star review posted',         time:'3 hr ago',   unread:false },
  { id:5, icon:'fa-arrow-up-from-bracket',color:'text-purple-400',bg:'bg-purple-500/10',msg:'Withdrawal of $500 completed',    time:'5 hr ago',   unread:false },
]

// ── Chart data ────────────────────────────────────────
export const REVENUE_DATA = {
  labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  revenue:  [18400,22100,19800,25600,28200,24700,31400,29800,35200,38600,33900,42100],
  expenses: [12000,14800,13200,17400,19600,16800,21200,20100,23800,25400,22600,28900],
}

export const TRAFFIC_DATA = {
  labels: ['Direct','Organic','Referral','Social','Email'],
  values: [35, 28, 18, 12, 7],
  colors: ['#1eb3a8','#8b5cf6','#3b82f6','#f59e0b','#ef4444'],
}

export const WEEKLY_USERS = {
  labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
  values: [65, 82, 74, 91, 88, 42, 38],
}

// ── Top countries ─────────────────────────────────────
export const TOP_COUNTRIES = [
  { name:'United States', code:'🇺🇸', pct:38, color:'bg-brand-500',  users:'4,721' },
  { name:'United Kingdom',code:'🇬🇧', pct:22, color:'bg-purple-500', users:'2,747' },
  { name:'Germany',       code:'🇩🇪', pct:18, color:'bg-blue-500',   users:'2,248' },
  { name:'Pakistan',      code:'🇵🇰', pct:12, color:'bg-amber-500',  users:'1,499' },
  { name:'Others',        code:'🌍',  pct:10, color:'bg-gray-600',   users:'1,249' },
]

// ── Activity feed ────────────────────────────────────
export const ACTIVITY = [
  { icon:'fa-user-plus',           color:'text-brand-400',  bg:'bg-brand-500/10',  action:'New user Ahmed Khan registered',          time:'2 min ago'   },
  { icon:'fa-shopping-cart',       color:'text-green-400',  bg:'bg-green-500/10',  action:'Order #ORD-1042 completed',               time:'18 min ago'  },
  { icon:'fa-triangle-exclamation',color:'text-amber-400',  bg:'bg-amber-500/10',  action:'High memory usage detected on server',    time:'1 hr ago'    },
  { icon:'fa-pen',                 color:'text-purple-400', bg:'bg-purple-500/10', action:'Profile settings updated by admin',       time:'3 hr ago'    },
  { icon:'fa-file-invoice',        color:'text-blue-400',   bg:'bg-blue-500/10',   action:'Monthly report generated for October',   time:'5 hr ago'    },
]
