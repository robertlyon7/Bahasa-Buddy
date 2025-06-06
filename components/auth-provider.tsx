"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { getCurrentUser, initializeAuth, logoutUser, type User } from "@/lib/auth"
import { migrateProgressData } from "@/lib/progress"

type AuthContextType = {
  user: Omit<User, "password"> | null
  isLoading: boolean
  isAuthenticated: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Omit<User, "password"> | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initialize auth system
    initializeAuth()

    // Check if user is logged in
    const currentUser = getCurrentUser()
    console.log("Auth Provider initialized, current user:", currentUser)
    setUser(currentUser)

    // Migrate old progress data to user-specific format if user is logged in
    if (currentUser) {
      migrateProgressData()
    }

    setIsLoading(false)
  }, [])

  useEffect(() => {
    // Listen for storage events to sync auth state across tabs
    const handleStorageChange = () => {
      const currentUser = getCurrentUser()
      setUser(currentUser)

      // Migrate progress data when user changes
      if (currentUser) {
        migrateProgressData()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const logout = () => {
    logoutUser()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
