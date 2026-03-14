
import { User, Briefcase, PiggyBank, GraduationCap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

const services = [
  {
    icon: User,
    title: "Personal Banking",
    description: "Everyday accounts with digital tools and easy payments.",
  },
  {
    icon: Briefcase,
    title: "Business Banking",
    description: "Powerful financial tools designed for growing businesses.",
  },
  {
    icon: PiggyBank,
    title: "Investment Accounts",
    description: "Build long-term wealth with guided investment options.",
  },
  {
    icon: GraduationCap,
    title: "Youth Accounts",
    description: "Teach financial responsibility with accounts designed for young savers.",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Financial Solutions
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Comprehensive banking solutions tailored to your unique needs.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group border border-border/50 bg-card transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <CardHeader>
                <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <service.icon className="size-7 text-primary" />
                </div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
