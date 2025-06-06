"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    console.log("Protected route check - isAuthenticated:", isAuthenticated, "isLoading:", isLoading)

    if (!isLoading) {
      if (!isAuthenticated) {
        console.log("User not authenticated, redirecting to login")
        router.push("/login")
      } else {
        console.log("User is authenticated, showing protected content")
        setChecking(false)
      }
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || (checking && !isAuthenticated)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
