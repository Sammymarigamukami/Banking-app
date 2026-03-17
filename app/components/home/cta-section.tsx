
import { ArrowRight } from "lucide-react"
import { Button } from "../ui/button"
import { useNavigate } from "react-router"

export function CTASection() {

    const navigate = useNavigate()
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-muted/50 px-6 py-16 text-center sm:px-12 sm:py-20">
          {/* Background decorations */}
          <div className="absolute -left-20 -top-20 size-72 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 size-72 rounded-full bg-accent/5 blur-3xl" />

          <div className="relative">
            <h2 className="mx-auto mb-4 max-w-xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Start your financial journey today
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-muted-foreground">
              Join millions of users who trust NexusBank for their everyday banking needs.
            </p>
            <Button 
            size="lg" 
            className="gap-2"
            onClick={() => navigate("/RegisterAccount")}
            >
              Create Free Account
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
