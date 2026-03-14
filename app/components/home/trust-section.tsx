const stats = [
  { value: "1M+", label: "Customers" },
  { value: "50+", label: "Countries Supported" },
  { value: "99.99%", label: "Platform Uptime" },
  { value: "Bank-Grade", label: "Security" },
]

export function TrustSection() {
  return (
    <section className="bg-primary px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl font-bold text-primary-foreground sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-primary-foreground/80 sm:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
