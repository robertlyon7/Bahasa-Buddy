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
import { ArrowLeft, Eye, EyeOff } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

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

    const user = registerUser(username, password, displayName || undefined, email || undefined)

    if (user) {
      router.push("/dashboard")
    } else {
      setError("Username already exists")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-poppins">Back to Home</span>
          </Link>
        </div>

        <Card className="overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
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
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-11 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 font-poppins pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-700 font-medium font-poppins">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="h-11 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 font-poppins pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 transition-colors"
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
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
