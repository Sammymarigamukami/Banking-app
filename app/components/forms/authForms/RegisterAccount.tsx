import React, { useState } from "react"
import { Card, CardHeader, CardContent, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Button } from "~/components/ui/button"
import { registerCustomer } from "~/api/auth"
import { Link, useNavigate } from "react-router"

export default function RegisterForm() {
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError]  = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)


  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)
    setError(null)

    const userData = {
      Username: username,
      Email: email,
      Password: password,
      FirstName: firstName,
      LastName: lastName,
      Phone: phone,
      role: "customer"
    }

    try {
      const data = await registerCustomer(userData);
      console.log("Registration success:", data)
      navigate("/customerPortal")
    } catch (error) {
      setError("Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
    console.log("Register:", {
      userName: username,
      email: email,
      password: password
    })
  };

  return (
    <Card className=" w-[350px] bg-muted/30 text-gray-100 shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-gray-950">Create Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className="space-y-3">
          <div className="space-y-2 flex gap-2">
            <div className="space-y-2">
            <Label htmlFor="firstName" className="text-gray-950">Firstname</Label>
            <Input
              id="firstname"
              type="text"
              placeholder="Firstname"
              value={firstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFirstName(e.target.value)
              }
              required
              className="text-gray-900 bg-muted/30 border-gray-600 placeholder:text-gray-400"
            />
            </div>
            <div className="space-y-2">
            <Label htmlFor="lastname" className="text-gray-950">Lastname</Label>
            <Input
              id="lastname"
              type="text"
              placeholder="Lastname"
              value={lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLastName(e.target.value)
              }
              required
              className="text-gray-900 bg-muted/30 border-gray-600 placeholder:text-gray-400"
            />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="username" className="text-gray-950">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
              required
              className="text-gray-900 bg-muted/30 border-gray-600 placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-950">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
              className="text-gray-900 bg-muted/30 border-gray-600 placeholder:text-gray-400"
            />
          </div>
            <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-950">Phone</Label>
            <Input
              id="phone"
              type="text"
              placeholder="phone"
              value={phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhone(e.target.value)
              }
              required
              className="text-gray-900 bg-muted/30 border-gray-600 placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-950">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
              className="text-gray-900 bg-muted/30 border-gray-600 placeholder:text-gray-400"
            />
          </div>

          <Button 
          type="submit" 
          variant="default"
          className="w-full"
          >
            {loading ? "Registering..." : "Create Account"}
          </Button>
          <p
          className="text-gray-950 underline cursor-pointer text-center text-sm"
          onClick={() => navigate("/CustomerLogin")}
          >
          Already have an account?
          </p>
        </form>
      </CardContent>
    </Card>
  )
}