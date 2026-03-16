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
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { MoreHorizontal, Eye, Lock, Key, Trash2 } from 'lucide-react'
import type { Customer } from '~/lib/type'

interface CustomerTableProps {
  customers: Customer[]
}

export function CustomerTable({ customers }: CustomerTableProps) {
  return (
    <Card>
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-900">Customers</h2>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-slate-200 hover:bg-transparent">
              <TableHead className="text-slate-600 font-semibold">Name</TableHead>
              <TableHead className="text-slate-600 font-semibold">Email</TableHead>
              <TableHead className="text-slate-600 font-semibold">Phone</TableHead>
              <TableHead className="text-slate-600 font-semibold">Type</TableHead>
              <TableHead className="text-slate-600 font-semibold">Status</TableHead>
              <TableHead className="text-slate-600 font-semibold">Balance</TableHead>
              <TableHead className="text-slate-600 font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id} className="border-b border-slate-100 hover:bg-slate-50">
                <TableCell className="text-slate-900 font-medium">{customer.name}</TableCell>
                <TableCell className="text-slate-600 text-sm">{customer.email}</TableCell>
                <TableCell className="text-slate-600 text-sm">{customer.phone}</TableCell>
                <TableCell className="text-slate-600 text-sm capitalize">{customer.accountType}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      customer.status === 'active'
                        ? 'default'
                        : customer.status === 'inactive'
                          ? 'secondary'
                          : 'destructive'
                    }
                  >
                    {customer.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-900 font-semibold">
                  ${customer.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </TableCell>
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
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Freeze Account
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Key className="w-4 h-4" />
                        Reset Password
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                        <Trash2 className="w-4 h-4" />
                        Deactivate
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
