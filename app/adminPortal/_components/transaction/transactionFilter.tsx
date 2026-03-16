'use client'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Card } from '~/components/ui/card'
import { Filter } from 'lucide-react'

export function TransactionFilters() {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-slate-600" />
        <h3 className="font-semibold text-slate-900">Filters</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="text-sm font-medium text-slate-700 mb-2 block">Type</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="deposit">Deposit</SelectItem>
              <SelectItem value="withdrawal">Withdrawal</SelectItem>
              <SelectItem value="transfer">Transfer</SelectItem>
              <SelectItem value="payment">Payment</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 mb-2 block">Status</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 mb-2 block">From Date</label>
          <Input type="date" />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 mb-2 block">To Date</label>
          <Input type="date" />
        </div>

        <div className="lg:col-span-1 md:col-span-2 lg:col-span-4">
          <label className="text-sm font-medium text-slate-700 mb-2 block">Amount Range</label>
          <div className="flex items-center gap-4">
            <Input type="number" placeholder="Min amount" />
            <span className="text-slate-400">to</span>
            <Input type="number" placeholder="Max amount" />
          </div>
        </div>

        <div className="md:col-span-2 lg:col-span-4 flex gap-2">
          <Button className="flex-1">Apply Filters</Button>
          <Button variant="outline" className="flex-1">Reset</Button>
        </div>
      </div>
    </Card>
  )
}
