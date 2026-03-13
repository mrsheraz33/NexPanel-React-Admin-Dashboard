import { useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Title, Tooltip, Legend, Filler,
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { REVENUE_DATA, TRAFFIC_DATA, WEEKLY_USERS } from '../../data/dummyData'

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Title, Tooltip, Legend, Filler
)

// ── Shared tooltip styles ─────────────────────────
const tooltip = (dark) => ({
  backgroundColor: dark ? '#1f2937' : '#ffffff',
  titleColor:      dark ? '#f9fafb' : '#111827',
  bodyColor:       dark ? '#9ca3af' : '#6b7280',
  borderColor:     dark ? '#374151' : '#e5e7eb',
  borderWidth: 1,
  padding: 12,
  cornerRadius: 10,
  usePointStyle: true,
  titleFont: { family: 'Plus Jakarta Sans', size: 12, weight: '600' },
  bodyFont:  { family: 'Plus Jakarta Sans', size: 12 },
})

const gridColor = (dark) => dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)'
const tickColor = (dark) => dark ? '#4b5563' : '#9ca3af'

// ── LineChart ─────────────────────────────────────
export const LineChart = ({ dark }) => {
  const canvasRef = useRef(null)

  const data = {
    labels: REVENUE_DATA.labels,
    datasets: [
      {
        label: 'Revenue',
        data: REVENUE_DATA.revenue,
        borderColor: '#1eb3a8',
        backgroundColor: (ctx) => {
          const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 260)
          g.addColorStop(0, 'rgba(30,179,168,0.22)')
          g.addColorStop(1, 'rgba(30,179,168,0)')
          return g
        },
        borderWidth: 2.5,
        pointRadius: 4,
        pointBackgroundColor: '#1eb3a8',
        pointBorderColor: dark ? '#111827' : '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        tension: 0.42,
        fill: true,
      },
      {
        label: 'Expenses',
        data: REVENUE_DATA.expenses,
        borderColor: '#8b5cf6',
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: '#8b5cf6',
        pointBorderColor: dark ? '#111827' : '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        tension: 0.42,
        fill: false,
        borderDash: [5, 4],
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          color: tickColor(dark),
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: { family: 'Plus Jakarta Sans', size: 12 },
        },
      },
      tooltip: tooltip(dark),
    },
    scales: {
      x: {
        grid: { color: gridColor(dark), drawBorder: false },
        ticks: { color: tickColor(dark), font: { family: 'Plus Jakarta Sans', size: 11 } },
        border: { display: false },
      },
      y: {
        grid: { color: gridColor(dark), drawBorder: false },
        ticks: {
          color: tickColor(dark),
          font: { family: 'Plus Jakarta Sans', size: 11 },
          callback: v => '$' + (v / 1000).toFixed(0) + 'K',
        },
        border: { display: false },
      },
    },
  }

  return <Line data={data} options={options} ref={canvasRef} />
}

// ── BarChart ──────────────────────────────────────
export const BarChart = ({ dark }) => {
  const data = {
    labels: WEEKLY_USERS.labels,
    datasets: [
      {
        label: 'New Users',
        data: WEEKLY_USERS.values,
        backgroundColor: (ctx) => {
          const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 220)
          g.addColorStop(0, 'rgba(30,179,168,0.9)')
          g.addColorStop(1, 'rgba(30,179,168,0.25)')
          return g
        },
        borderRadius: { topLeft: 8, topRight: 8 },
        borderSkipped: false,
        hoverBackgroundColor: '#1eb3a8',
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: tooltip(dark),
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: tickColor(dark), font: { family: 'Plus Jakarta Sans', size: 11 } },
        border: { display: false },
      },
      y: {
        grid: { color: gridColor(dark) },
        ticks: { color: tickColor(dark), font: { family: 'Plus Jakarta Sans', size: 11 } },
        border: { display: false },
      },
    },
  }

  return <Bar data={data} options={options} />
}

// ── DonutChart ────────────────────────────────────
export const DonutChart = ({ dark }) => {
  const data = {
    labels: TRAFFIC_DATA.labels,
    datasets: [
      {
        data: TRAFFIC_DATA.values,
        backgroundColor: TRAFFIC_DATA.colors,
        borderWidth: 0,
        hoverOffset: 8,
        borderRadius: 4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: tickColor(dark),
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 14,
          font: { family: 'Plus Jakarta Sans', size: 12 },
        },
      },
      tooltip: tooltip(dark),
    },
  }

  return <Doughnut data={data} options={options} />
}
