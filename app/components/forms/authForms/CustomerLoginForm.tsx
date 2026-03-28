import React, { useState } from "react"
import { useNavigate } from "react-router"

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Button } from "~/components/ui/button"

// Import the specific customer login function
import { loginCustomer } from "~/api/auth"

export default function CustomerLoginForm() {
  const navigate = useNavigate()

  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)
    setError(null)

    try {
      // Call the isolated customer API utility
      const data = await loginCustomer({
        loginDetails: {
          userName: userName,
          password,
        }
      })

      console.log("Customer Login success:", data)

      // Redirect to customer-specific area
      navigate("/customerPortal")

    } catch (err: any) {
      console.error("Customer Login failed:", err)
      // Display the error string returned by the API utility
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-[380px] bg-muted/30 text-gray-100 shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-gray-100">
          Customer Login
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <div className="space-y-2">
            <Label htmlFor="customer-username">Username</Label>
            <Input
              id="customer-username"
              type="text"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="text-gray-900 bg-muted/30 border-gray-600 placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customer-password">Password</Label>
            <Input
              id="customer-password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-gray-900 bg-muted/30 border-gray-600 placeholder:text-gray-400"
            />
          </div>

          <Button
            variant="default"
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          
          <p className="text-gray-950 cursor-pointer text-center text-sm">
            Create an account?{" "}
            <span 
              className="underline" 
              onClick={() => navigate("/RegisterAccount")}
            >
              Click here
            </span>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}