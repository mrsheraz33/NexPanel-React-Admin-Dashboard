# NexPanel — React Admin Dashboard

A modern, fully responsive Admin Dashboard built with **React**, **Tailwind CSS**, **Chart.js**, and **React Router v6**.

Developed by **Muhammad Sheeraz** — Full Stack Web Developer

---

## ✨ Features

- 🌙 **Dark / Light Mode** — persists via localStorage
- 📱 **Fully Responsive** — mobile, tablet, desktop
- 🗂️ **Collapsible Sidebar** — tooltip hints when collapsed
- 📊 **3 Chart Types** — Line, Bar, Doughnut (Chart.js)
- 👥 **Users Table** — search, filter, sort, pagination, bulk select
- 🔔 **Notification Dropdown** — unread badges
- 🔐 **Login Page** — validation, show/hide password
- 👤 **Profile Page** — skills, projects, activity
- ⚙️ **Settings Page** — 5 tabs (General, Security, Notifications, Appearance, Billing)
- 🎨 **Clean Architecture** — proper folder structure

---

## 🗂️ Project Structure

```
nexpanel/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx              ← Entry point
    ├── App.jsx               ← Router & layout
    ├── index.css             ← Global styles + Tailwind
    ├── context/
    │   └── AppContext.jsx    ← Global state (theme, sidebar)
    ├── data/
    │   └── dummyData.js      ← All dummy data (users, charts, etc.)
    ├── components/
    │   ├── ui/
    │   │   └── index.jsx     ← Avatar, Badge, Card, Toggle, StatCard, etc.
    │   ├── charts/
    │   │   └── index.jsx     ← LineChart, BarChart, DonutChart
    │   └── layout/
    │       ├── Sidebar.jsx   ← Collapsible sidebar with nav
    │       └── Topbar.jsx    ← Header with search, notifications, profile
    └── pages/
        ├── LoginPage.jsx     ← Auth page
        ├── DashboardPage.jsx ← Overview with charts & stats
        ├── UsersPage.jsx     ← Full users table
        ├── ProfilePage.jsx   ← Developer profile
        └── SettingsPage.jsx  ← Account settings (5 tabs)
```

---

## 🚀 Getting Started

### Step 1 — Install dependencies

```bash
npm install
```

### Step 2 — Start development server

```bash
npm run dev
```

### Step 3 — Open in browser

```
http://localhost:5173
```

### Demo Login

```
Email:    admin@nexpanel.io
Password: password123
```

---

## 🏗️ Build for Production

```bash
npm run build
```

Output will be in the `/dist` folder.

---

## ☁️ Deployment

### Netlify
1. Run `npm run build`
2. Drag & drop the `/dist` folder to [netlify.com/drop](https://app.netlify.com/drop)

### Vercel
```bash
npx vercel --prod
```

---

## 🔌 Connecting to Backend API

Replace dummy data in `src/data/dummyData.js` with real API calls.

Example using `fetch`:

```js
// In your page component
const [users, setUsers] = useState([])

useEffect(() => {
  fetch('/api/users', {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => setUsers(data))
}, [])
```

Example using `axios`:

```js
import axios from 'axios'

const { data } = await axios.get('/api/users', {
  headers: { Authorization: `Bearer ${token}` }
})
setUsers(data)
```

---

## 🎨 Customization

### Change accent color
Edit `tailwind.config.js` → `colors.brand`

```js
brand: {
  500: '#your-color', // primary accent
  600: '#your-darker-color',
}
```

### Add a new page
1. Create `src/pages/YourPage.jsx`
2. Add route in `src/App.jsx`
3. Add nav item in `src/components/layout/Sidebar.jsx`

### Add new chart data
Edit `src/data/dummyData.js` and update the corresponding chart component.

---

## 📦 Tech Stack

| Tech              | Version  | Purpose              |
|-------------------|----------|----------------------|
| React             | 18.2     | UI framework         |
| React Router DOM  | 6.22     | Client-side routing  |
| Tailwind CSS      | 3.4      | Utility CSS          |
| Chart.js          | 4.4      | Charts               |
| react-chartjs-2   | 5.2      | React chart wrapper  |
| Vite              | 5.0      | Build tool           |

---

## 👨‍💻 Author

**Muhammad Sheeraz**
Full Stack Web Developer · Rawalpindi, Pakistan

- 🌐 [Portfolio](https://sheraz-portfolio-web.netlify.app)
- 💼 [LinkedIn](www.linkedin.com/in/muhammad-sheraz-858612385)
- 🐙 [GitHub](https://github.com/mrsheraz33)

---

## 📄 License

For personal and commercial use.
Redistribution or resale of this template is not allowed.
