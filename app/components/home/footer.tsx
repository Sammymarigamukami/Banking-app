import { Link } from "react-router";


export function Footer() {
  return (
    <footer id="contact" className="bg-foreground px-4 py-12 text-background sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand Column */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-background">
                <svg
                  className="size-5 text-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <span className="text-xl font-semibold text-background">NexusBank</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-background/70">
              A digital banking platform built for the modern generation. Empowering individuals and businesses with secure, intelligent financial services.
            </p>
          </div>

          {/* Products Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background">
              Products
            </h3>
            <ul className="space-y-3">
              {["Personal Banking", "Business Banking", "Investments", "Savings"].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="text-sm text-background/70 transition-colors hover:text-background"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-background/70">
              <li>
                <span className="block">Email</span>
                <a href="mailto:support@nexusbank.com" className="text-background hover:underline">
                  support@nexusbank.com
                </a>
              </li>
              <li>
                <span className="block">Phone</span>
                <a href="tel:+1-800-123-4567" className="text-background hover:underline">
                  +1 (800) 123-4567
                </a>
              </li>
              <li>
                <span className="block">Address</span>
                <span className="text-background">100 Financial Plaza, Kenya, Nairobi 00100</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-background/10 pt-8 text-center">
          <p className="text-sm text-background/60">
            © 2026 NexusBank. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}