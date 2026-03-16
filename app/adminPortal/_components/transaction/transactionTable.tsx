'use client'

import { Card } from '~/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { Badge } from '~/components/ui/badge'
import { ArrowDownLeft, ArrowUpRight, Replace, CreditCard } from 'lucide-react'
import type { Transaction } from '~/lib/type'

interface TransactionTableProps {
  transactions: Transaction[]
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft className="w-4 h-4 text-green-600" />
      case 'withdrawal':
        return <ArrowUpRight className="w-4 h-4 text-red-600" />
      case 'transfer':
        return <Replace className="w-4 h-4 text-blue-600" />
      case 'payment':
        return <CreditCard className="w-4 h-4 text-purple-600" />
      default:
        return null
    }
  }

  return (
    <Card>
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-900">Transactions</h2>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-slate-200 hover:bg-transparent">
              <TableHead className="text-slate-600 font-semibold">Date</TableHead>
              <TableHead className="text-slate-600 font-semibold">Type</TableHead>
              <TableHead className="text-slate-600 font-semibold">Account</TableHead>
              <TableHead className="text-slate-600 font-semibold">Description</TableHead>
              <TableHead className="text-slate-600 font-semibold text-right">Amount</TableHead>
              <TableHead className="text-slate-600 font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id} className="border-b border-slate-100 hover:bg-slate-50">
                <TableCell className="text-slate-900 text-sm">{transaction.date}</TableCell>
                <TableCell className="text-slate-600">
                  <div className="flex items-center gap-2">
                    {getTransactionIcon(transaction.type)}
                    <span className="capitalize text-sm">{transaction.type}</span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-600 font-mono text-sm">{transaction.accountNumber}</TableCell>
                <TableCell className="text-slate-600 text-sm">{transaction.description}</TableCell>
                <TableCell className="text-slate-900 font-semibold text-right">
                  <span className={transaction.type === 'withdrawal' || transaction.type === 'payment' ? 'text-red-600' : 'text-green-600'}>
                    {transaction.type === 'withdrawal' || transaction.type === 'payment' ? '-' : '+'}${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      transaction.status === 'completed'
                        ? 'default'
                        : transaction.status === 'pending'
                          ? 'secondary'
                          : 'destructive'
                    }
                  >
                    {transaction.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
