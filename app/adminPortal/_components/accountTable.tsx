'use client'



import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { MoreHorizontal, Eye, Lock, Trash2 } from 'lucide-react'
import type { Account } from '~/lib/type'
import { Card } from '~/components/ui/card'

interface AccountTableProps {
  accounts: Account[]
}

export function AccountTable({ accounts }: AccountTableProps) {
  return (
    <Card>
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-900">Accounts</h2>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-slate-200 hover:bg-transparent">
              <TableHead className="text-slate-600 font-semibold">Account Number</TableHead>
              <TableHead className="text-slate-600 font-semibold">Customer</TableHead>
              <TableHead className="text-slate-600 font-semibold">Type</TableHead>
              <TableHead className="text-slate-600 font-semibold">Balance</TableHead>
              <TableHead className="text-slate-600 font-semibold">Status</TableHead>
              <TableHead className="text-slate-600 font-semibold">Last Activity</TableHead>
              <TableHead className="text-slate-600 font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.number} className="border-b border-slate-100 hover:bg-slate-50">
                <TableCell className="text-slate-900 font-mono text-sm font-semibold">{account.number}</TableCell>
                <TableCell className="text-slate-600">{account.customerName}</TableCell>
                <TableCell className="text-slate-600 text-sm capitalize">{account.type}</TableCell>
                <TableCell className="text-slate-900 font-semibold">
                  ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      account.status === 'active'
                        ? 'default'
                        : account.status === 'frozen'
                          ? 'secondary'
                          : 'destructive'
                    }
                  >
                    {account.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-600 text-sm">{account.lastActivity}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Freeze Account
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                        <Trash2 className="w-4 h-4" />
                        Close Account
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
