

import {
  Users,
  CreditCard,
  TrendingUp,
  Clock,
} from 'lucide-react'
import { AdminLayout } from '../_components/layouts/adminLayout'
import { StatCard } from '../_components/statCard'
import { RecentActivityTable } from '../_components/recentActivityTable'
import { getDashboardStats, getSystemActivity } from '~/lib/adminMockData'

export const metadata = {
  title: 'Dashboard | NexusBank Admin',
  description: 'Admin dashboard for NexusBank',
}

export default function DashboardPage() {
  const stats = getDashboardStats()
  const activities = getSystemActivity()

  return (
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-2">Welcome back to NexusBank Admin Panel</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Customers"
            value={stats.totalCustomers}
            icon={<Users className="w-6 h-6" />}
            change={12}
          />
          <StatCard
            title="Active Accounts"
            value={stats.activeAccounts}
            icon={<CreditCard className="w-6 h-6" />}
            change={8}
          />
          <StatCard
            title="Total Transactions"
            value={stats.totalTransactions}
            icon={<TrendingUp className="w-6 h-6" />}
            change={-2}
          />
          <StatCard
            title="Pending Approvals"
            value={stats.pendingApprovals}
            icon={<Clock className="w-6 h-6" />}
            change={5}
          />
        </div>

        {/* Recent Activity */}
        <RecentActivityTable activities={activities} />
      </div>
  )
}
