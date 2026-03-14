import { ArrowLeftRight, Wallet, PiggyBank, Building2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { accounts } from "~/lib/mock-data"
import { Link } from "react-router"


const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  checking: Wallet,
  savings: PiggyBank,
  business: Building2,
}

export default function AccountsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Accounts</h1>
        <p className="text-muted-foreground">
          Manage and view all your bank accounts.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => {
          const Icon = iconMap[account.type] || Wallet

          return (
            <Card key={account.id} className="relative overflow-hidden">
              <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-primary/5" />
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-medium">
                      {account.name}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">{account.number}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="capitalize">
                  {account.type}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground">Available Balance</p>
                  <p className="text-2xl font-bold text-foreground">
                    ${account.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/dashboard/transfer">
                    <ArrowLeftRight className="mr-2 h-4 w-4" />
                    Quick Transfer
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Total Balance Summary */}
      <Card className="bg-primary text-primary-foreground">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm opacity-90">Total Balance Across All Accounts</p>
            <p className="text-3xl font-bold">
              $
              {accounts
                .reduce((sum, acc) => sum + acc.balance, 0)
                .toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/20">
            <Wallet className="h-6 w-6" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
