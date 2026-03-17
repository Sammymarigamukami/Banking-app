

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Progress } from "~/components/ui/progress"
import { analytics } from "~/lib/mock-data"


export function AnalyticsCards() {
  const total = analytics.reduce((sum, item) => sum + item.amount, 0)

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Spending Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {analytics.map((item) => (
          <div key={item.category} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{item.category}</span>
              <span className="text-muted-foreground">Ksh{item.amount}</span>
            </div>
            <Progress value={item.percentage} className="h-2" />
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-border pt-4">
          <span className="text-sm font-medium">Total Spending</span>
          <span className="text-lg font-semibold">Ksh{total.toLocaleString()}</span>
        </div>
      </CardContent>
    </Card>
  )
}
