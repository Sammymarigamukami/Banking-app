import React, { useState } from "react"
import { useNavigate } from "react-router"

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Button } from "~/components/ui/button"

// Import the specific employee login function
import { loginEmployee } from "~/api/auth"

export default function AdminLoginForm() {
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
      // Call the isolated employee API
      const data = await loginEmployee({
        loginDetails: {
          userName: userName, // Our API utility handles 'username' vs 'userName'
          password,
        }
      })

      console.log("Admin Login API response:", data) // Log the full response for debugging

      console.log("Admin Login success:", data)

      // Redirect specifically to the admin/employee portal
      navigate("/adminPortal")

    } catch (err: any) {
      console.error("Admin Login failed:", err)
      // Display the error message returned by our API utility
      setError(err) 
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-[380px] bg-muted/30 text-gray-100 shadow-lg border-blue-900/20">
      <CardHeader>
        <CardTitle className="text-center text-gray-100">
          Admin & Staff Login
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 p-2 rounded">
                <p className="text-red-400 text-xs text-center">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="admin-username">Employee ID / Username</Label>
            <Input
              id="admin-username"
              type="text"
              placeholder="e.g. 9CSVGZX4"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="text-white bg-muted/30 border-gray-600 placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin-password">Password</Label>
            <Input
              id="admin-password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-white bg-muted/30 border-gray-600 placeholder:text-gray-500"
            />
          </div>

          <Button
            variant="default"
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-600 transition-colors"
          >
            {loading ? "Authenticating..." : "Secure Login"}
          </Button>
          
          <div className="pt-2 text-center">
            <p className="text-gray-500 text-xs">
              Authorized personnel only. Access is monitored.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}