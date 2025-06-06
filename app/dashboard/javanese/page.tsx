"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Play, Lock, Trophy, Target, Clock } from "lucide-react"
import { getLessonProgress, isLessonUnlocked } from "@/lib/progress"
import { lessons } from "@/data/lessons"
import { useAuth } from "@/components/auth-provider"

export default function JavaneseDashboardPage() {
  const { user } = useAuth()
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
  const currentLevel = Math.floor(completedLessons / 3) + 1 
  const lessonsInCurrentLevel = completedLessons % 3
  const timeSpent = completedLessons * 15 

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button asChild variant="ghost" size="sm" className="mr-4">
              <Link href="/dashboard" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Dashboard</span>
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                J
              </div>
              <h1 className="text-lg font-semibold text-gray-900">Javanese Course</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Target className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Current Level</p>
                  <p className="text-2xl font-bold text-gray-900">{currentLevel}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Trophy className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Lessons Done</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {completedLessons}/{lessons.length}
                  </p>
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
                  <p className="text-2xl font-bold text-gray-900">{timeSpent}m</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Course Progress</h2>
              <div className="text-sm text-gray-500 mt-1 sm:mt-0">
                Level {currentLevel} • {lessonsInCurrentLevel}/3 lessons in current level
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-gray-700">Overall Progress</span>
                <span className="text-blue-600">{Math.round(totalProgress)}%</span>
              </div>
              <Progress value={totalProgress} className="h-3" />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {Array.from({ length: Math.ceil(lessons.length / 3) }, (_, levelIndex) => {
            const levelLessons = lessons.slice(levelIndex * 3, (levelIndex + 1) * 3)
            const levelNumber = levelIndex + 1
            const levelCompleted = levelLessons.every((lesson) => (progress[lesson.id] || 0) >= 100)
            const levelProgress =
              (levelLessons.reduce((sum, lesson) => sum + (progress[lesson.id] || 0), 0) /
                (levelLessons.length * 100)) *
              100

            return (
              <div key={levelNumber}>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-semibold ${
                      levelCompleted ? "bg-green-500" : levelProgress > 0 ? "bg-blue-500" : "bg-gray-400"
                    }`}
                  >
                    {levelNumber}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Level {levelNumber}</h3>
                    <p className="text-sm text-gray-600">{Math.round(levelProgress)}% complete</p>
                  </div>
                </div>

                <div className="space-y-4 ml-13">
                  {levelLessons.map((lesson) => {
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
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold flex-shrink-0 ${
                                isCompleted ? "bg-green-500" : isUnlocked ? "bg-blue-500" : "bg-gray-400"
                              }`}
                            >
                              {isCompleted ? (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              ) : isUnlocked ? (
                                lesson.level
                              ) : (
                                <Lock className="w-4 h-4" />
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900 mb-1">{lesson.title}</h4>
                                  <p className="text-sm text-gray-600 mb-3">{lesson.description}</p>

                                  {isUnlocked && (
                                    <div className="flex items-center gap-3">
                                      <div className="flex-1">
                                        <Progress value={currentProgress} className="h-2" />
                                      </div>
                                      <span className="text-xs font-medium text-gray-500 min-w-[3rem]">
                                        {currentProgress}%
                                      </span>
                                    </div>
                                  )}
                                </div>

                                <div className="ml-4 flex-shrink-0">
                                  {isUnlocked ? (
                                    <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                                      <Link href={`/lessons/${lesson.id}`} className="flex items-center gap-2">
                                        <Play className="w-4 h-4" />
                                        <span className="hidden sm:inline">
                                          {currentProgress > 0 ? "Continue" : "Start"}
                                        </span>
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
              </div>
            )
          })}
        </div>
        <div className="h-8"></div>
      </main>
    </div>
  )
}
