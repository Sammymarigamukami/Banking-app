

import { TrendingUp, TrendingDown, DollarSign, PiggyBank } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Progress } from "../ui/progress"
import { analytics, monthlyStats } from "~/lib/mock-data"

const monthlyData = [
  { month: "Jan", income: 5200, expenses: 2100 },
  { month: "Feb", income: 5800, expenses: 2400 },
  { month: "Mar", income: 6450, expenses: 2340 },
]

export default function AnalyticsPage() {
  const totalSpending = analytics.reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">
          Track your spending patterns and financial insights.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Income",
            value: `$${monthlyStats.income.toLocaleString()}`,
            change: "+12.5%",
            trend: "up",
            icon: DollarSign,
          },
          {
            title: "Total Expenses",
            value: `$${monthlyStats.expenses.toLocaleString()}`,
            change: "-3.2%",
            trend: "down",
            icon: TrendingDown,
          },
          {
            title: "Savings Rate",
            value: "63.7%",
            change: "+5.1%",
            trend: "up",
            icon: PiggyBank,
          },
          {
            title: "Net Worth",
            value: "$146,801",
            change: "+8.4%",
            trend: "up",
            icon: TrendingUp,
          },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p
                    className={`mt-1 text-xs font-medium ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change} from last month
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Spending by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {analytics.map((item, i) => (
              <div key={item.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-3 w-3 rounded-full`}
                      style={{
                        backgroundColor: `hsl(var(--chart-${i + 1}))`,
                      }}
                    />
                    <span className="font-medium">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold">${item.amount}</span>
                    <span className="ml-2 text-sm text-muted-foreground">
                      ({item.percentage}%)
                    </span>
                  </div>
                </div>
                <Progress
                  value={item.percentage}
                  className="h-2"
                  style={
                    {
                      "--tw-progress-color": `hsl(var(--chart-${i + 1}))`,
                    } as React.CSSProperties
                  }
                />
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-border pt-4">
              <span className="font-medium">Total</span>
              <span className="text-lg font-bold">${totalSpending.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {monthlyData.map((month) => (
              <div key={month.month} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{month.month} 2026</span>
                  <span className="text-muted-foreground">
                    Net: ${(month.income - month.expenses).toLocaleString()}
                  </span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-green-600">Income</span>
                      <span>${month.income.toLocaleString()}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-green-100">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${(month.income / 7000) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-red-600">Expenses</span>
                      <span>${month.expenses.toLocaleString()}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-red-100">
                      <div
                        className="h-full bg-red-500"
                        style={{ width: `${(month.expenses / 7000) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Budget Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { category: "Food & Dining", budget: 600, spent: 450, color: "bg-chart-1" },
              { category: "Transportation", budget: 300, spent: 180, color: "bg-chart-2" },
              { category: "Shopping", budget: 500, spent: 620, color: "bg-chart-3" },
              { category: "Utilities", budget: 250, spent: 250, color: "bg-chart-4" },
            ].map((item) => {
              const percentage = Math.min((item.spent / item.budget) * 100, 100)
              const isOver = item.spent > item.budget

              return (
                <div key={item.category} className="rounded-lg border border-border p-4">
                  <p className="text-sm font-medium">{item.category}</p>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className={`text-xl font-bold ${isOver ? "text-red-600" : ""}`}>
                      ${item.spent}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / ${item.budget}
                    </span>
                  </div>
                  <Progress
                    value={percentage}
                    className={`mt-2 h-2 ${isOver ? "[&>div]:bg-red-500" : ""}`}
                  />
                  <p
                    className={`mt-1 text-xs ${
                      isOver ? "text-red-600" : "text-muted-foreground"
                    }`}
                  >
                    {isOver
                      ? `$${item.spent - item.budget} over budget`
                      : `$${item.budget - item.spent} remaining`}
                  </p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}