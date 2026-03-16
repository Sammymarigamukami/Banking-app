import { getTransactions } from "~/lib/adminMockData"
import { AdminLayout } from "../_components/layouts/adminLayout"
import { TransactionFilters } from "../_components/transaction/transactionFilter"
import { TransactionTable } from "../_components/transaction/transactionTable"


export const metadata = {
  title: 'Transactions | NexusBank Admin',
  description: 'Transaction monitoring and management',
}

export default function TransactionsPage() {
  const transactions = getTransactions()

  return (
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Transactions</h1>
          <p className="text-slate-600 mt-2">Monitor all account transactions</p>
        </div>

        {/* Filters */}
        <TransactionFilters />

        {/* Table */}
        <TransactionTable transactions={transactions} />
      </div>
  )
}
