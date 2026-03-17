"use client"

import {
  Zap,
  Droplets,
  Wifi,
  Phone,
  Tv,
  Shield,
  ChevronRight,
  Search,
  Calendar,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Input } from "../ui/input"

const billCategories = [
  { name: "Electricity", icon: Zap, color: "text-yellow-500", pending: 1 },
  { name: "Water", icon: Droplets, color: "text-blue-500", pending: 0 },
  { name: "Internet", icon: Wifi, color: "text-purple-500", pending: 1 },
  { name: "Phone", icon: Phone, color: "text-green-500", pending: 0 },
  { name: "TV/Cable", icon: Tv, color: "text-red-500", pending: 0 },
  { name: "Insurance", icon: Shield, color: "text-indigo-500", pending: 1 },
]

const scheduledPayments = [
  { name: "Netflix Subscription", amount: 2315.99, date: "Mar 15, 2026", status: "upcoming" },
  { name: "Gym Membership", amount: 3249.0, date: "Mar 18, 2026", status: "upcoming" },
  { name: "Spotify Premium", amount: 2329.99, date: "Mar 20, 2026", status: "upcoming" },
]

const recentPayments = [
  { name: "Electric Company", amount: 1244.5, date: "Mar 10, 2026", status: "paid" },
  { name: "Water Utility", amount: 4554.0, date: "Mar 8, 2026", status: "paid" },
  { name: "Internet Provider", amount: 5679.99, date: "Mar 5, 2026", status: "paid" },
]

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Payments</h1>
        <p className="text-muted-foreground">
          Pay bills and manage your scheduled payments.
        </p>
      </div>

      {/* Bill Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Pay Bills</CardTitle>
          <CardDescription>Select a category to pay your bills</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {billCategories.map((category) => (
              <button
                key={category.name}
                className="relative flex flex-col items-center gap-2 rounded-lg border border-border p-4 transition-colors hover:bg-secondary"
              >
                {category.pending > 0 && (
                  <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
                    {category.pending}
                  </span>
                )}
                <category.icon className={`h-6 w-6 ${category.color}`} />
                <span className="text-xs font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Scheduled Payments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Scheduled Payments
              </CardTitle>
            </div>
            <Button variant="ghost" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {scheduledPayments.map((payment, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{payment.name}</p>
                    <p className="text-sm text-muted-foreground">{payment.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">Ksh{payment.amount.toFixed(2)}</p>
                  <Badge variant="secondary" className="text-xs">
                    {payment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Payments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Recent Payments
              </CardTitle>
            </div>
            <Button variant="ghost" size="sm">
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentPayments.map((payment, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-secondary/50"
              >
                <div>
                  <p className="font-medium">{payment.name}</p>
                  <p className="text-sm text-muted-foreground">{payment.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">Ksh{payment.amount.toFixed(2)}</p>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700 text-xs hover:bg-green-100"
                  >
                    {payment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Pay */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Pay</CardTitle>
          <CardDescription>
            Search for a biller and pay instantly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search billers..." className="pl-9" />
            </div>
            <Button>Pay Now</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
