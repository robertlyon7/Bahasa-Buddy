"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { LogOut, User, Play, Lock } from "lucide-react"
import { getLessonProgress, isLessonUnlocked } from "@/lib/progress"
import { lessons } from "@/data/lessons"
import { useAuth } from "@/components/auth-provider"
import { LogoIcon } from "@/components/logo-icon"

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const [progress, setProgress] = useState<Record<string, number>>({})
  const [unlockedLessons, setUnlockedLessons] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const lessonProgress: Record<string, number> = {}
    const lessonUnlocked: Record<string, boolean> = {}

    lessons.forEach((lesson) => {
      lessonProgress[lesson.id] = getLessonProgress(lesson.id)
      lessonUnlocked[lesson.id] = isLessonUnlocked(lesson.id)
    })

    setProgress(lessonProgress)
    setUnlockedLessons(lessonUnlocked)
  }, [])

  const totalProgress = (Object.values(progress).reduce((sum, value) => sum + value, 0) / (lessons.length * 100)) * 100

  const completedLessons = Object.values(progress).filter((p) => p >= 100).length

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Bb</span>
              </div>
              <span className="font-bold text-xl">Bahasa Buddy</span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium transition-colors"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{user?.displayName || user?.username}</span>
              </Link>
              <Button onClick={handleLogout} className="flex items-center gap-2 bg-customBlue text-white hover:bg-blue-700 transition-colors">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.displayName || user?.username}!
          </h1>
          <p className="text-gray-600">Continue your Javanese learning journey</p>
        </div>

        <Card className="mb-8 border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Your Progress</h2>
              <div className="text-sm text-gray-500 mt-1 sm:mt-0">
                {completedLessons} of {lessons.length} lessons completed
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-gray-700">Overall Progress</span>
                <span className="text-blue-600">{Math.round(totalProgress)}%</span>
              </div>
              <Progress value={totalProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Javanese Language Course</h2>
        </div>

        <div className="space-y-4">
          {lessons.map((lesson, index) => {
            const isUnlocked = unlockedLessons[lesson.id] || lesson.id === "greetings"
            const currentProgress = progress[lesson.id] || 0
            const isCompleted = currentProgress >= 100

            return (
              <Card
                key={lesson.id}
                className={`border-0 shadow-sm transition-all duration-200 hover:shadow-md ${
                  !isUnlocked ? "opacity-60" : "hover:scale-[1.01]"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    {/* Lesson Number */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold flex-shrink-0 ${
                        isCompleted ? "bg-green-500" : isUnlocked ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    >
                      {isCompleted ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : isUnlocked ? (
                        lesson.level
                      ) : (
                        <Lock className="w-5 h-5" />
                      )}
                    </div>

                    {/* Lesson Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{lesson.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{lesson.description}</p>

                          {/* Progress Bar */}
                          {isUnlocked && (
                            <div className="flex items-center gap-3">
                              <div className="flex-1">
                                <Progress value={currentProgress} className="h-2" />
                              </div>
                              <span className="text-xs font-medium text-gray-500 min-w-[3rem]">{currentProgress}%</span>
                            </div>
                          )}
                        </div>

                        {/* Action Button */}
                        <div className="ml-4 flex-shrink-0">
                          {isUnlocked ? (
                            <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                              <Link href={`/lessons/${lesson.id}`} className="flex items-center gap-2">
                                <Play className="w-4 h-4" />
                                <span className="hidden sm:inline">{currentProgress > 0 ? "Continue" : "Start"}</span>
                              </Link>
                            </Button>
                          ) : (
                            <Button size="sm" disabled variant="outline" className="flex items-center gap-2">
                              <Lock className="w-4 h-4" />
                              <span className="hidden sm:inline">Locked</span>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="h-8"></div>
      </main>
    </div>
  )
}
