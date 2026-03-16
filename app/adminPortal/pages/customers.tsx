
import { Plus } from 'lucide-react'
import { getCustomers } from '~/lib/adminMockData'
import { AdminLayout } from '../_components/layouts/adminLayout'
import { Button } from '~/components/ui/button'
import { CustomerTable } from '../_components/customerTable'

export const metadata = {
  title: 'Customers | NexusBank Admin',
  description: 'Customer management',
}

export default function CustomersPage() {
  const customers = getCustomers()

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Customers</h1>
            <p className="text-slate-600 mt-2">Manage and view all customers</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Customer
          </Button>
        </div>

        {/* Table */}
        <CustomerTable customers={customers} />
      </div>
  )
}
