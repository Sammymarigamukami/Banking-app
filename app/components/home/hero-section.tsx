
import { ArrowRight, CreditCard, Shield, TrendingUp } from "lucide-react"
import { Button } from "../ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div className="flex flex-col gap-6">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Banking built for the digital generation
            </h1>
            <p className="max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
              Secure, fast and intelligent financial services designed to help individuals and businesses grow.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="gap-2">
                Open an Account
                <ArrowRight className="size-4" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right - Dashboard Preview */}
          <div className="relative">
            <div className="rounded-2xl bg-card p-6 shadow-xl ring-1 ring-border">
              {/* Mini Dashboard */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Balance</p>
                  <p className="text-3xl font-bold text-foreground">Ksh 1,734,743</p>
                </div>
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                  <TrendingUp className="size-6 text-primary" />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-muted/50 p-4">
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <CreditCard className="size-5 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Monthly Spending</p>
                  <p className="text-xl font-semibold text-foreground">Ksh 3,240</p>
                </div>
                <div className="rounded-xl bg-muted/50 p-4">
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Shield className="size-5 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Savings Goal</p>
                  <p className="text-xl font-semibold text-foreground">78%</p>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="mt-6">
                <p className="mb-3 text-sm font-medium text-foreground">Recent Transactions</p>
                <div className="space-y-3">
                  {[
                    { name: "Coffee Shop", amount: "Ksh 600", type: "expense" },
                    { name: "Salary Deposit", amount: "Ksh +500,099.00", type: "income" },
                    { name: "Grocery Store", amount: "Ksh -89,578.40", type: "expense" },
                  ].map((tx, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg bg-background p-3">
                      <span className="text-sm text-foreground">{tx.name}</span>
                      <span
                        className={`text-sm font-medium ${
                          tx.type === "income" ? "text-green-600" : "text-foreground"
                        }`}
                      >
                        {tx.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -right-4 -top-4 -z-10 size-72 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -bottom-4 -left-4 -z-10 size-72 rounded-full bg-accent/5 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
