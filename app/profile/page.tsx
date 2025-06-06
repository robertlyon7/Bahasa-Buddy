"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ArrowLeft, LogOut } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { updateUserProfile, deleteUser } from "@/lib/auth"
import { clearAllProgress } from "@/lib/progress"
import ProtectedRoute from "@/components/protected-route"
import { LogoIcon } from "@/components/logo-icon"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const [displayName, setDisplayName] = useState(user?.displayName || "")
  const [email, setEmail] = useState(user?.email || "")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setIsLoading(true)

    if (!user) {
      setMessage("You must be logged in to update your profile")
      setIsLoading(false)
      return
    }

    // Update profile
    const updatedUser = updateUserProfile(user.id, {
      displayName,
      email,
    })

    if (updatedUser) {
      setMessage("Profile updated successfully")
    } else {
      setMessage("Failed to update profile")
    }

    setIsLoading(false)
  }

  const handleResetProgress = () => {
    clearAllProgress()
    setMessage("Progress reset successfully")
  }

  const handleDeleteAccount = () => {
    if (!user) return

    // Prevent admin deletion
    if (user.username === "admin") {
      setMessage("Admin account cannot be deleted")
      return
    }

    // Delete the account
    const deleted = deleteUser(user.id)
    if (deleted) {
      // Logout and redirect to home
      logout()
      window.location.href = "/"
    } else {
      setMessage("Failed to delete account")
    }
  }

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  const isAdmin = user?.username === "admin"

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col bg-white">
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Bb</span>
              </div>
              <span className="font-bold text-xl">Bahasa Buddy</span>
            </div>
            <nav className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 text-sm font-medium"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Dashboard</span>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </nav>
          </div>
        </header>
        <main className="flex-1 container py-4 md:py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-lg md:text-xl font-bold">
                {user?.displayName?.[0] || user?.username?.[0] || "U"}
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold">{user?.displayName || user?.username}</h1>
                <p className="text-muted-foreground text-sm md:text-base">Account Settings</p>
              </div>
            </div>

            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 md:mb-8">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
                <Card className="border">
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your account information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      {message && <div className="p-3 text-sm bg-blue-50 text-blue-600 rounded-md">{message}</div>}
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" value={user?.username || ""} disabled className="bg-gray-50" />
                        <p className="text-xs text-muted-foreground">Username cannot be changed</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input
                          id="displayName"
                          placeholder="How you want to be called"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          className="text-base md:text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="text-base md:text-sm"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto"
                        disabled={isLoading}
                      >
                        {isLoading ? "Updating..." : "Update Profile"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="settings">
                <Card className="border">
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Reset Progress</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        This will reset all your learning progress. This action cannot be undone.
                      </p>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" className="w-full md:w-auto">
                            Reset All Progress
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="mx-4">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete all your learning progress. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                            <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleResetProgress}
                              className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
                            >
                              Reset Progress
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Delete Account</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {isAdmin
                          ? "Admin account cannot be deleted for security reasons."
                          : "Once you delete your account, there is no going back. Please be certain."}
                      </p>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" disabled={isAdmin} className="w-full md:w-auto">
                            Delete Account
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="mx-4">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Account</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete your account? This will permanently remove all your data
                              and progress. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                            <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDeleteAccount}
                              className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
                            >
                              Delete Account
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <footer className="border-t py-6 bg-white">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} BAHASABUDDY. All rights reserved.
            </p>
            <nav className="flex gap-4">
              <Link href="#" className="text-sm text-muted-foreground hover:underline">
                Help
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:underline">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:underline">
                Terms
              </Link>
            </nav>
          </div>
        </footer>
      </div>
    </ProtectedRoute>
  )
}
