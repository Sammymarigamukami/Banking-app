
import { Zap, Shield, BarChart3 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

const features = [
  {
    icon: Zap,
    title: "Instant Transfers",
    description: "Send and receive money instantly with secure real-time transactions.",
  },
  {
    icon: Shield,
    title: "Advanced Security",
    description: "Multi-layer encryption, biometric authentication, and fraud protection.",
  },
  {
    icon: BarChart3,
    title: "Smart Financial Insights",
    description: "AI-powered analytics that help customers track spending and manage savings.",
  },
]

export function FeaturesSection() {
  return (
    <section id="security" className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why Choose NexusBank
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Experience banking that puts your needs first with cutting-edge technology and security.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 bg-card shadow-lg transition-shadow hover:shadow-xl">
              <CardHeader>
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="size-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}