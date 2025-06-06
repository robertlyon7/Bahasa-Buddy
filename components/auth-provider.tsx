"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { getCurrentUser, initializeAuth, logoutUser, type User } from "@/lib/auth"
import { migrateProgressData } from "@/lib/progress"

type AuthContextType = {
  user: Omit<User, "password"> | null
  isLoading: boolean
  isAuthenticated: boolean
  logout: () => void
  refreshUser: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  logout: () => {},
  refreshUser: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Omit<User, "password"> | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshUser = () => {
    const currentUser = getCurrentUser()
    console.log("Refreshing user data:", currentUser)
    setUser(currentUser)

    if (currentUser) {
      migrateProgressData()
    }
  }

  useEffect(() => {
    initializeAuth()

    refreshUser()
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const handleStorageChange = () => {
      refreshUser()
    }

    const handleUserUpdate = () => {
      refreshUser()
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("userProfileUpdated", handleUserUpdate)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("userProfileUpdated", handleUserUpdate)
    }
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
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
