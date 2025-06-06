// Simple authentication library for BAHASABUDDY

// User interface
export interface User {
  id: string
  username: string
  password: string // In a real app, this would be hashed
  displayName?: string
  email?: string
  createdAt: number
}

// Default admin user
const DEFAULT_ADMIN: User = {
  id: "admin-id",
  username: "admin",
  password: "admin",
  displayName: "Administrator",
  createdAt: Date.now(),
}

// Initialize users in localStorage if not exists
export function initializeAuth(): void {
  if (typeof window !== "undefined") {
    const users = localStorage.getItem("bahasabuddy_users")

    if (!users) {
      // Create initial users array with admin
      localStorage.setItem("bahasabuddy_users", JSON.stringify([DEFAULT_ADMIN]))
    }
  }
}

// Get all users
export function getUsers(): User[] {
  if (typeof window !== "undefined") {
    const users = localStorage.getItem("bahasabuddy_users")

    if (users) {
      return JSON.parse(users)
    }
  }

  return [DEFAULT_ADMIN]
}

// Register a new user
export function registerUser(username: string, password: string, displayName?: string, email?: string): User | null {
  if (typeof window !== "undefined") {
    const users = getUsers()

    // Check if username already exists
    if (users.some((user) => user.username === username)) {
      return null
    }

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      username,
      password, // In a real app, this would be hashed
      displayName: displayName || username,
      email,
      createdAt: Date.now(),
    }

    // Add to users array
    users.push(newUser)
    localStorage.setItem("bahasabuddy_users", JSON.stringify(users))

    // Set as current user
    setCurrentUser(newUser)

    return newUser
  }

  return null
}

// Login user
export function loginUser(username: string, password: string): User | null {
  if (typeof window !== "undefined") {
    const users = getUsers()
    console.log("Available users:", users)

    // Find user with matching credentials
    const user = users.find((u) => u.username === username && u.password === password)
    console.log("Found user:", user)

    if (user) {
      // Set as current user
      setCurrentUser(user)
      return user
    }
  }

  return null
}

// Set current user
export function setCurrentUser(user: User | null): void {
  if (typeof window !== "undefined") {
    if (user) {
      // Store user without password for security
      const { password, ...safeUser } = user
      localStorage.setItem("bahasabuddy_current_user", JSON.stringify(safeUser))
      console.log("Current user set:", safeUser)
    } else {
      localStorage.removeItem("bahasabuddy_current_user")
      console.log("Current user cleared")
    }
  }
}

// Get current user
export function getCurrentUser(): Omit<User, "password"> | null {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("bahasabuddy_current_user")

    if (user) {
      return JSON.parse(user)
    }
  }

  return null
}

// Logout user
export function logoutUser(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("bahasabuddy_current_user")
  }
}

// Update user profile
export function updateUserProfile(userId: string, updates: Partial<Omit<User, "id" | "password">>): User | null {
  if (typeof window !== "undefined") {
    const users = getUsers()
    const userIndex = users.findIndex((u) => u.id === userId)

    if (userIndex !== -1) {
      // Update user
      users[userIndex] = {
        ...users[userIndex],
        ...updates,
      }

      localStorage.setItem("bahasabuddy_users", JSON.stringify(users))

      // Update current user if it's the same
      const currentUser = getCurrentUser()
      if (currentUser && currentUser.id === userId) {
        setCurrentUser(users[userIndex])
      }

      return users[userIndex]
    }
  }

  return null
}

// Delete user account
export function deleteUser(userId: string): boolean {
  if (typeof window !== "undefined") {
    const users = getUsers()

    // Prevent deletion of admin user
    const userToDelete = users.find((u) => u.id === userId)
    if (userToDelete && userToDelete.username === "admin") {
      return false
    }

    // Filter out the user to delete
    const updatedUsers = users.filter((u) => u.id !== userId)

    if (updatedUsers.length < users.length) {
      localStorage.setItem("bahasabuddy_users", JSON.stringify(updatedUsers))

      // Clear user-specific progress data
      localStorage.removeItem(`bahasabuddy_progress_${userId}`)
      localStorage.removeItem(`bahasabuddy_unlocked_${userId}`)

      return true
    }
  }

  return false
}
