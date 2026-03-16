
import { Plus } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { getAccounts } from '~/lib/adminMockData'
import { AccountTable } from '../_components/accountTable'
export const metadata = {
  title: 'Accounts | NexusBank Admin',
  description: 'Account management',
}

export default function AccountsPage() {
  const accounts = getAccounts()

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Accounts</h1>
            <p className="text-slate-600 mt-2">View and manage all customer accounts</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Account
          </Button>
        </div>

        {/* Table */}
        <AccountTable accounts={accounts} />
      </div>
  )
}
