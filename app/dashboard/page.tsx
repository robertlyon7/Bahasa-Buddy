"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { LogOut, User, BookOpen, Trophy, Clock, ArrowRight } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { LogoIcon } from "@/components/logo-icon"
import { getLessonProgress } from "@/lib/progress"
import { lessons } from "@/data/lessons"

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const [stats, setStats] = useState({
    totalCoursesCompleted: 0,
    totalLessonsCompleted: 0,
    totalTimeSpent: 0,
    currentStreak: 7,
  })

  useEffect(() => {
    let completedLessons = 0
    let completedCourses = 0

    const javaneseProgress = lessons.map((lesson) => getLessonProgress(lesson.id))
    const javaneseCompleted = javaneseProgress.filter((p) => p >= 100).length
    completedLessons += javaneseCompleted

    if (javaneseCompleted === lessons.length) {
      completedCourses += 1
    }

    setStats({
      totalCoursesCompleted: completedCourses,
      totalLessonsCompleted: completedLessons,
      totalTimeSpent: completedLessons * 15, 
      currentStreak: 7, 
    })
  }, [])

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  const languages = [
    {
      id: "javanese",
      name: "Javanese",
      description: "Learn the Javanese language",
      progress: Math.round((stats.totalLessonsCompleted / lessons.length) * 100),
      lessonsCompleted: stats.totalLessonsCompleted,
      totalLessons: lessons.length,
      available: true,
      color: "bg-blue-500",
    },
    {
      id: "sundanese",
      name: "Sundanese",
      description: "Learn the Sundanese language",
      progress: 0,
      lessonsCompleted: 0,
      totalLessons: 12,
      available: true,
      color: "bg-pink-500",
    },
    {
      id: "coming-soon",
      name: "More Languages",
      description: "Balinese, Minangkabau, and more coming soon...",
      progress: 0,
      lessonsCompleted: 0,
      totalLessons: 0,
      available: false,
      color: "bg-gray-400",
    },
  ]

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
              <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.displayName || user?.username}!
          </h1>
          <p className="text-gray-600">Choose a language to continue your learning journey</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Trophy className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Courses Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalCoursesCompleted}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <BookOpen className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Lessons Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalLessonsCompleted}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <Clock className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time Spent</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalTimeSpent}m</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Language</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {languages.map((language) => (
            <Card
              key={language.id}
              className={`border-0 shadow-sm transition-all duration-200 ${
                language.available ? "hover:shadow-md hover:scale-[1.02] cursor-pointer" : "opacity-75"
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold ${language.color}`}
                  >
                    {language.name.charAt(0)}
                  </div>
                  {language.available && language.id !== "coming-soon" && (
                    <Button asChild size="sm" variant="ghost" className="p-2">
                      <Link href={`/dashboard/${language.id}`}>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>

                <h3 className="font-semibold text-gray-900 mb-2">{language.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{language.description}</p>

                {language.available && language.id !== "coming-soon" ? (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-gray-900">{language.progress}%</span>
                    </div>
                    <Progress value={language.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{language.lessonsCompleted} lessons completed</span>
                      <span>{language.totalLessons} total</span>
                    </div>
                    <Button asChild className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                      <Link href={`/dashboard/${language.id}`}>
                        {language.progress > 0 ? "Continue Learning" : "Start Learning"}
                      </Link>
                    </Button>
                  </div>
                ) : language.id === "coming-soon" ? (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500 mb-3">More languages coming soon!</p>
                    <Button disabled variant="outline" className="w-full">
                      Coming Soon...
                    </Button>
                  </div>
                ) : (
                  <Button asChild className="w-full">
                    <Link href={`/dashboard/${language.id}`}>Start Learning</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Spacing */}
        <div className="h-8"></div>
      </main>
    </div>
  )
}
