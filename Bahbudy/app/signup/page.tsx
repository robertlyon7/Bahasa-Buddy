"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerUser } from "@/lib/auth"
import { ArrowLeft } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validate inputs
    if (!username || !password) {
      setError("Please enter both username and password")
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    // Attempt registration
    const user = registerUser(username, password, displayName || undefined, email || undefined)

    if (user) {
      // Successful registration
      router.push("/dashboard")
    } else {
      // Failed registration
      setError("Username already exists")
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
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
            {/* Left Side - Image */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 flex flex-col justify-center items-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10 text-center max-w-md">
                <div className="mb-8">
                  <img
                    src="/images/login2.png"
                    alt="Character illustration"
                    className="w-50 h-48 mx-auto object-cove"
                  />
                </div>
                <h2 className="text-3xl font-bold mb-4">Come Join Us!</h2>
                <p className="text-blue-100 text-lg font-poppins leading-relaxed">
                  Create an account to access learning content and track your progress.
                </p>
                <div className="mt-8">
                  <p className="text-blue-100 font-poppins">
                    Already have an account?{" "}
                    <Link href="/login" className="text-white font-semibold font-poppins hover:underline">
                      Login here
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-8 lg:p-12 flex flex-col justify-center bg-white">
              <div className="max-w-md mx-auto w-full">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2 ">Sign Up</h1>
                  <p className="text-gray-600 ">Create your account</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-5">
                  {error && (
                    <div className="p-4 text-sm bg-red-50 text-red-600 rounded-lg border border-red-200">{error}</div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-gray-700 font-medium font-poppins">
                      Username
                    </Label>
                    <Input
                      id="username"
                      placeholder="Choose a username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="h-11 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 font-poppins"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="displayName" className="text-gray-700 font-medium font-poppins">
                      Display Name <span className="text-gray-400">(optional)</span>
                    </Label>
                    <Input
                      id="displayName"
                      placeholder="How you want to be called"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="h-11 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 font-poppins"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium font-poppins">
                      Email <span className="text-gray-400">(optional)</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 font-poppins"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-700 font-medium font-poppins">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-11 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500  font-poppins"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-700 font-medium font-poppins">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="h-11 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 font-poppins"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 bg-gradient-to-r rounded-xl from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold text-base font-poppins"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Sign Up"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
