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

export function initializeAuth(): void {
  if (typeof window !== "undefined") {
    const users = localStorage.getItem("bahasabuddy_users")

    if (!users) {
      // Create initial users array with admin
      localStorage.setItem("bahasabuddy_users", JSON.stringify([DEFAULT_ADMIN]))
    }
  }
}

export function getUsers(): User[] {
  if (typeof window !== "undefined") {
    const users = localStorage.getItem("bahasabuddy_users")

    if (users) {
      return JSON.parse(users)
    }
  }

  return [DEFAULT_ADMIN]
}

export function registerUser(username: string, password: string, displayName?: string, email?: string): User | null {
  if (typeof window !== "undefined") {
    const users = getUsers()

    if (users.some((user) => user.username === username)) {
      return null
    }

    const newUser: User = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      username,
      password, 
      displayName: displayName || username,
      email,
      createdAt: Date.now(),
    }

    users.push(newUser)
    localStorage.setItem("bahasabuddy_users", JSON.stringify(users))

    setCurrentUser(newUser)

    return newUser
  }

  return null
}

export function loginUser(username: string, password: string): User | null {
  if (typeof window !== "undefined") {
    const users = getUsers()
    console.log("Available users:", users)

    const user = users.find((u) => u.username === username && u.password === password)
    console.log("Found user:", user)

    if (user) {
      setCurrentUser(user)
      return user
    }
  }

  return null
}

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

export function getCurrentUser(): Omit<User, "password"> | null {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("bahasabuddy_current_user")

    if (user) {
      return JSON.parse(user)
    }
  }

  return null
}

export function logoutUser(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("bahasabuddy_current_user")
  }
}

export function updateUserProfile(userId: string, updates: Partial<Omit<User, "id" | "password">>): User | null {
  if (typeof window !== "undefined") {
    const users = getUsers()
    const userIndex = users.findIndex((u) => u.id === userId)

    if (userIndex !== -1) {
      users[userIndex] = {
        ...users[userIndex],
        ...updates,
      }

      localStorage.setItem("bahasabuddy_users", JSON.stringify(users))

      const currentUser = getCurrentUser()
      if (currentUser && currentUser.id === userId) {
        setCurrentUser(users[userIndex])

        window.dispatchEvent(new CustomEvent("userProfileUpdated"))
      }

      return users[userIndex]
    }
  }

  return null
}

export function deleteUser(userId: string): boolean {
  if (typeof window !== "undefined") {
    const users = getUsers()

    const userToDelete = users.find((u) => u.id === userId)
    if (userToDelete && userToDelete.username === "admin") {
      return false
    }

    const updatedUsers = users.filter((u) => u.id !== userId)

    if (updatedUsers.length < users.length) {
      localStorage.setItem("bahasabuddy_users", JSON.stringify(updatedUsers))

      localStorage.removeItem(`bahasabuddy_progress_${userId}`)
      localStorage.removeItem(`bahasabuddy_unlocked_${userId}`)

      return true
    }
  }

  return false
}
