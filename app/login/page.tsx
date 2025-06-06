"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginUser } from "@/lib/auth"
import { ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validate inputs
    if (!username || !password) {
      setError("Please enter both username and password")
      setIsLoading(false)
      return
    }

    console.log("Attempting login with:", username, password)

    // Attempt login
    const user = loginUser(username, password)

    if (user) {
      // Successful login
      console.log("Login successful, redirecting to dashboard")
      setIsLoading(false)

      // Use a small timeout to ensure the auth state is updated before navigation
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 100)
    } else {
      // Failed login
      console.log("Login failed")
      setError("Invalid username or password")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Back to Home Link */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-poppins">Back to Home</span>
          </Link>
        </div>

        {/* Main Card */}
        <Card className="overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
            {/* Left Side - Form */}
            <div className="p-8 lg:p-12 flex flex-col justify-center bg-white">
              <div className="max-w-md mx-auto w-full">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Login</h1>
                  <p className="text-gray-600 font-poppins">Enter your credentials to access your account</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                  {error && (
                    <div className="p-4 text-sm bg-red-50 text-red-600 rounded-lg border border-red-200">{error}</div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="username" className="font-poppins text-gray-700 font-medium">
                      Username
                    </Label>
                    <Input
                      id="username"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="font-poppins text-gray-700 font-medium">
                        Password
                      </Label>
                      <Link href="#" className="font-poppins marker:text-sm text-blue-600 hover:text-blue-700 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="font-poppins rounded-xl w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold text-base"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 flex flex-col justify-center items-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10 text-center max-w-md">
                <div className="mb-8">
                  <img
                    src="/images/login2.png"
                    alt="Character illustration"
                    className="w-48 h-48 mx-auto object-cover"
                  />
                </div>
                <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
                <p className="font-poppins text-blue-100 text-lg leading-relaxed">
                  Let's continue your learning journey!
                </p>
                <div className="mt-8">
                  <p className="font-poppins text-blue-100">
                    Don't have an account?{" "}
                    <Link href="/signup" className="font-poppins text-white font-semibold hover:underline">
                      Sign up here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
