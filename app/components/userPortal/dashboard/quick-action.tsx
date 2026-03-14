"use client"

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Send, Download, Receipt, Landmark } from "lucide-react"
import { Link } from "react-router"


const actions = [
  { label: "Send Money", icon: Send, href: "/dashboard/transfer" },
  { label: "Request Money", icon: Download, href: "/dashboard/transfer" },
  { label: "Pay Bills", icon: Receipt, href: "/dashboard/payments" },
  { label: "Deposit", icon: Landmark, href: "/dashboard/transfer" },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              className="h-auto flex-col gap-2 py-4 hover:bg-primary hover:text-primary-foreground"
              asChild
            >
              <Link href={action.href}>
                <action.icon className="h-5 w-5" />
                <span className="text-xs">{action.label}</span>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}