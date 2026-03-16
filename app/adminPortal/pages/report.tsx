
import { Download, FileText, BarChart3, PieChart } from 'lucide-react'
import { AdminLayout } from '../_components/layouts/adminLayout'
import { Card } from '~/components/ui/card'
import { Button } from '~/components/ui/button'

export const metadata = {
  title: 'Reports | NexusBank Admin',
  description: 'Generate and download reports',
}

const reports = [
  {
    title: 'Daily Transactions Report',
    description: 'Complete list of all transactions for the selected day',
    icon: <FileText className="w-8 h-8 text-blue-600" />,
    formats: ['CSV', 'PDF'],
  },
  {
    title: 'Monthly Summary Report',
    description: 'Monthly summary of transactions, accounts, and customer activity',
    icon: <BarChart3 className="w-8 h-8 text-green-600" />,
    formats: ['CSV', 'PDF'],
  },
  {
    title: 'Customer Activity Report',
    description: 'Individual customer activity and account details',
    icon: <PieChart className="w-8 h-8 text-purple-600" />,
    formats: ['CSV', 'PDF'],
  },
  {
    title: 'Fraud Analysis Report',
    description: 'Detailed analysis of fraud alerts and suspicious activities',
    icon: <BarChart3 className="w-8 h-8 text-red-600" />,
    formats: ['CSV', 'PDF'],
  },
]

export default function ReportsPage() {
  return (
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Reports</h1>
          <p className="text-slate-600 mt-2">Generate and download various reports</p>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-slate-50 p-3 rounded-lg">{report.icon}</div>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{report.title}</h3>
              <p className="text-slate-600 text-sm mb-6">{report.description}</p>
              <div className="flex gap-3">
                {report.formats.map((format) => (
                  <Button key={format} variant="outline" size="sm" className="gap-2 flex-1">
                    <Download className="w-4 h-4" />
                    {format}
                  </Button>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Advanced Filters */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Custom Report Generator</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Report Type</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Select report type</option>
                <option>Transactions</option>
                <option>Customers</option>
                <option>Accounts</option>
                <option>Fraud Alerts</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Date Range</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
                <option>This Quarter</option>
                <option>Custom Range</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Format</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>CSV</option>
                <option>PDF</option>
                <option>Excel</option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            <Button className="gap-2">
              <Download className="w-4 h-4" />
              Generate Report
            </Button>
          </div>
        </Card>
      </div>
  )
}
