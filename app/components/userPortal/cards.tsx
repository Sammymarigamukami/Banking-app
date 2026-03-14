"use client"
import { Snowflake, Eye, Lock, Settings, Plus } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"

const cards = [
  {
    id: "1",
    type: "Visa Debit",
    number: "4521 **** **** 7832",
    holder: "JOHN DOE",
    expiry: "09/28",
    status: "active",
    color: "from-primary via-primary to-accent",
  },
  {
    id: "2",
    type: "Mastercard Credit",
    number: "5432 **** **** 1234",
    holder: "JOHN DOE",
    expiry: "12/27",
    status: "active",
    color: "from-slate-700 via-slate-800 to-slate-900",
  },
]

export default function CardsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Cards</h1>
          <p className="text-muted-foreground">
            Manage your debit and credit cards.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Card
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {cards.map((card) => (
          <Card key={card.id} className="overflow-hidden">
            <CardContent className="p-6">
              {/* Card Design */}
              <div
                className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${card.color} p-5 text-primary-foreground`}
              >
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary-foreground/10" />
                <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-primary-foreground/10" />
                <div className="relative space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium opacity-90">NexusBank</span>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          card.status === "active"
                            ? "bg-green-500/20 text-green-100"
                            : "bg-amber-500/20 text-amber-100"
                        }`}
                      >
                        {card.status}
                      </Badge>
                      <span className="text-xs uppercase opacity-75">{card.type}</span>
                    </div>
                  </div>
                  <div className="font-mono text-lg tracking-widest">
                    {card.number}
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] uppercase opacity-75">Card Holder</p>
                      <p className="text-sm font-medium">{card.holder}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase opacity-75">Expires</p>
                      <p className="text-sm font-medium">{card.expiry}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="mt-4 grid grid-cols-4 gap-2">
                <Button variant="outline" size="sm" className="flex-col h-auto py-3">
                  <Snowflake className="h-4 w-4 mb-1" />
                  <span className="text-xs">Freeze</span>
                </Button>
                <Button variant="outline" size="sm" className="flex-col h-auto py-3">
                  <Eye className="h-4 w-4 mb-1" />
                  <span className="text-xs">Details</span>
                </Button>
                <Button variant="outline" size="sm" className="flex-col h-auto py-3">
                  <Lock className="h-4 w-4 mb-1" />
                  <span className="text-xs">PIN</span>
                </Button>
                <Button variant="outline" size="sm" className="flex-col h-auto py-3">
                  <Settings className="h-4 w-4 mb-1" />
                  <span className="text-xs">Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Card Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Card Benefits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Cashback", value: "2%", description: "On all purchases" },
              { title: "Points Earned", value: "12,450", description: "This month" },
              { title: "Travel Insurance", value: "Included", description: "Up to $500K" },
              { title: "ATM Withdrawals", value: "Free", description: "Worldwide" },
            ].map((benefit, i) => (
              <div key={i} className="rounded-lg bg-secondary/50 p-4">
                <p className="text-2xl font-bold text-foreground">{benefit.value}</p>
                <p className="text-sm font-medium">{benefit.title}</p>
                <p className="text-xs text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
