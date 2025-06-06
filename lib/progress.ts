import { getCurrentUser } from "@/lib/auth"

// Function to get user-specific storage key
function getUserProgressKey(): string | null {
  const user = getCurrentUser()
  if (!user) return null
  return `bahasabuddy_progress_${user.id}`
}

function getUserUnlockedKey(): string | null {
  const user = getCurrentUser()
  if (!user) return null
  return `bahasabuddy_unlocked_${user.id}`
}

// Function to save quiz progress to localStorage for current user
export function saveQuizProgress(lessonId: string, progressPercentage: number): void {
  if (typeof window !== "undefined") {
    try {
      const progressKey = getUserProgressKey()
      if (!progressKey) return

      // Get existing progress data for this user
      const progressData = localStorage.getItem(progressKey)
      let progress: Record<string, number> = {}

      if (progressData) {
        progress = JSON.parse(progressData)
      }

      // Update progress for this lesson
      progress[lessonId] = progressPercentage

      // Save back to localStorage
      localStorage.setItem(progressKey, JSON.stringify(progress))

      // If progress is 70% or more, unlock the next level
      if (progressPercentage >= 70) {
        unlockNextLevel(lessonId)
      }
    } catch (error) {
      console.error("Error saving quiz progress:", error)
    }
  }
}

// Function to unlock the next level for current user
function unlockNextLevel(completedLessonId: string): void {
  if (typeof window !== "undefined") {
    try {
      const unlockedKey = getUserUnlockedKey()
      if (!unlockedKey) return

      // Get existing unlocked levels for this user
      const unlockedData = localStorage.getItem(unlockedKey)
      let unlocked: Record<string, boolean> = {}

      if (unlockedData) {
        unlocked = JSON.parse(unlockedData)
      }

      // Import lessons dynamically to avoid circular dependencies
      import("@/data/lessons")
        .then(({ lessons }) => {
          // Find the completed lesson
          const completedLesson = lessons.find((lesson) => lesson.id === completedLessonId)
          if (!completedLesson) return

          // Find the next lesson by level
          const nextLesson = lessons.find((lesson) => lesson.level === completedLesson.level + 1)
          if (!nextLesson) return

          // Unlock the next lesson
          unlocked[nextLesson.id] = true
          localStorage.setItem(unlockedKey, JSON.stringify(unlocked))
        })
        .catch((error) => {
          console.error("Error importing lessons:", error)
        })
    } catch (error) {
      console.error("Error unlocking next level:", error)
    }
  }
}

// Function to check if a lesson is unlocked for current user
export function isLessonUnlocked(lessonId: string): boolean {
  if (typeof window !== "undefined") {
    try {
      // First lesson is always unlocked
      if (lessonId === "greetings") return true

      const unlockedKey = getUserUnlockedKey()
      if (!unlockedKey) return false

      const unlockedData = localStorage.getItem(unlockedKey)
      if (unlockedData) {
        const unlocked = JSON.parse(unlockedData)
        return !!unlocked[lessonId]
      }
    } catch (error) {
      console.error("Error checking if lesson is unlocked:", error)
      return lessonId === "greetings" // Fallback to only first lesson unlocked
    }
  }

  // By default, only first lesson is unlocked
  return lessonId === "greetings"
}

// Function to get lesson progress from localStorage for current user
export function getLessonProgress(lessonId: string): number {
  if (typeof window !== "undefined") {
    try {
      const progressKey = getUserProgressKey()
      if (!progressKey) return 0

      const progressData = localStorage.getItem(progressKey)

      if (progressData) {
        const progress = JSON.parse(progressData)
        return progress[lessonId] || 0
      }
    } catch (error) {
      console.error("Error getting lesson progress:", error)
    }
  }

  return 0
}

// Function to get all progress data for current user
export function getAllProgress(): Record<string, number> {
  if (typeof window !== "undefined") {
    try {
      const progressKey = getUserProgressKey()
      if (!progressKey) return {}

      const progressData = localStorage.getItem(progressKey)

      if (progressData) {
        return JSON.parse(progressData)
      }
    } catch (error) {
      console.error("Error getting all progress:", error)
    }
  }

  return {}
}

// Function to clear all progress data for current user
export function clearAllProgress(): void {
  if (typeof window !== "undefined") {
    try {
      const progressKey = getUserProgressKey()
      const unlockedKey = getUserUnlockedKey()

      if (progressKey) {
        localStorage.removeItem(progressKey)
      }
      if (unlockedKey) {
        localStorage.removeItem(unlockedKey)
      }
    } catch (error) {
      console.error("Error clearing all progress:", error)
    }
  }
}

// Function to migrate old progress data to user-specific format (for existing users)
export function migrateProgressData(): void {
  if (typeof window !== "undefined") {
    try {
      const user = getCurrentUser()
      if (!user) return

      // Check if old progress data exists
      const oldProgressData = localStorage.getItem("bahasabuddy_progress")
      const oldUnlockedData = localStorage.getItem("bahasabuddy_unlocked")

      if (oldProgressData || oldUnlockedData) {
        const userProgressKey = `bahasabuddy_progress_${user.id}`
        const userUnlockedKey = `bahasabuddy_unlocked_${user.id}`

        // Only migrate if user doesn't already have progress
        const existingUserProgress = localStorage.getItem(userProgressKey)
        const existingUserUnlocked = localStorage.getItem(userUnlockedKey)

        if (!existingUserProgress && oldProgressData) {
          localStorage.setItem(userProgressKey, oldProgressData)
        }

        if (!existingUserUnlocked && oldUnlockedData) {
          localStorage.setItem(userUnlockedKey, oldUnlockedData)
        }

        // Remove old global progress data
        localStorage.removeItem("bahasabuddy_progress")
        localStorage.removeItem("bahasabuddy_unlocked")
      }
    } catch (error) {
      console.error("Error migrating progress data:", error)
    }
  }
}
