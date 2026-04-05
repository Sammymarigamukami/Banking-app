"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "../ui/button"
import { useNavigate, Link } from "react-router"
import { logout } from "~/api/auth"

export function Navbar() {
    const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <svg
              className="size-5 text-primary-foreground"
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
          <span className="text-xl font-semibold text-foreground">NexusBank</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="#"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            to="#services"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Services
          </Link>
          <Link
            to="#security"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Security
          </Link>
          <Link
            to="#contact"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" size="sm" onClick={() => navigate("/EmployeeLogin")}>
            Employee Login
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigate("/CustomerLogin")}>
            Customer Login
          </Button>
          <Button
          onClick={() => navigate("/RegisterAccount")}
           size="sm">Open Account</Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex size-10 items-center justify-center rounded-lg text-foreground md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="flex flex-col gap-4 p-4">
            <Link
              to="#"
              className="text-sm font-medium text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="#services"
              className="text-sm font-medium text-muted-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="#security"
              className="text-sm font-medium text-muted-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Security
            </Link>
            <Link
              to="#contact"
              className="text-sm font-medium text-muted-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col gap-2 pt-4">
              <Button 
              onClick={() => navigate("/EmployeeLogin")}
              variant="outline" className="w-full">
                Employee Login
              </Button>
              <Button 
              onClick={() => navigate("/CustomerLogin")}
              variant="outline" className="w-full">
                Customer Login
              </Button>
              <Button
               onClick={() => navigate("/RegisterAccount")}
               className="w-full">Open Account</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
