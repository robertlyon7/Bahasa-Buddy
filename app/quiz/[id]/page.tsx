"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Check, Heart, Lock, X, Lightbulb, Target, Trophy, Clock, Star, Zap } from "lucide-react"
import { getQuizData } from "@/data/quizData"
import { saveQuizProgress, isLessonUnlocked } from "@/lib/progress"
import { lessons } from "@/data/lessons"
import { useAuth } from "@/components/auth-provider"
import { LogoIcon } from "@/components/logo-icon"

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: string
}

export default function QuizPage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const { user } = useAuth()
  const [quizData, setQuizData] = useState<QuizQuestion[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [lives, setLives] = useState(3)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [lessonTitle, setLessonTitle] = useState("")
  const [lessonLevel, setLessonLevel] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [streak, setStreak] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [timerActive, setTimerActive] = useState(false)

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const unlocked = isLessonUnlocked(id)
        setIsUnlocked(unlocked)

        if (!unlocked) {
          router.push("/dashboard")
          return
        }

        const lesson = lessons.find((l) => l.id === id)
        if (lesson) {
          setLessonTitle(lesson.title)
          setLessonLevel(lesson.level)
        }

        const data = getQuizData(id)
        if (data) {
          setQuizData(data)
          setTimerActive(true)
        } else {
          router.push("/dashboard")
        }
      }
    } catch (error) {
      console.error("Error initializing quiz:", error)
    } finally {
      setIsLoading(false)
    }
  }, [id, router])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timerActive && timeLeft > 0 && selectedAnswer === null) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && selectedAnswer === null) {
      handleAnswerSelect("")
    }
    return () => clearInterval(interval)
  }, [timerActive, timeLeft, selectedAnswer])

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setIsCorrect(null)
    setScore(0)
    setQuizCompleted(false)
    setLives(3)
    setStreak(0)
    setTimeLeft(30)
    setTimerActive(true)
  }

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer !== null) return 

    setSelectedAnswer(answer)
    setTimerActive(false)
    const correct = answer === quizData[currentQuestion]?.correctAnswer
    setIsCorrect(correct)

    if (correct) {
      setScore(score + 1)
      setStreak(streak + 1)
    } else {
      setLives(lives - 1)
      setStreak(0)
    }

    setTimeout(() => {
      if (lives <= 1 && !correct) {
        setQuizCompleted(true)
        const progressPercentage = Math.round((score / quizData.length) * 100)
        saveQuizProgress(id, progressPercentage)
      } else if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setIsCorrect(null)
        setTimeLeft(30)
        setTimerActive(true)
        setShowHint(false)
      } else {
        setQuizCompleted(true)
        const progressPercentage = Math.round(((score + (correct ? 1 : 0)) / quizData.length) * 100)
        saveQuizProgress(id, progressPercentage)
      }
    }, 1500)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading quiz...</p>
        </div>
      </div>
    )
  }

  if (!isUnlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
        <div className="text-center p-6 bg-white rounded-xl shadow-sm max-w-md border w-full">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-amber-600" />
          </div>
          <h2 className="text-xl font-bold mb-2">Lesson Locked</h2>
          <p className="text-muted-foreground mb-4">This lesson is locked. Complete previous lessons to unlock.</p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700 w-full">
            <Link href="/dashboard">Return to Dashboard</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (quizData.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
        <div className="text-center p-6 bg-white rounded-xl shadow-sm max-w-md border w-full">
          <h2 className="text-xl font-bold mb-2">Quiz Not Found</h2>
          <p className="text-muted-foreground mb-4">We couldn't find the quiz you're looking for.</p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700 w-full">
            <Link href="/dashboard">Return to Dashboard</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (quizCompleted) {
    const finalScore = Math.round((score / quizData.length) * 100)
    const passed = finalScore >= 70

    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Link>
            <LogoIcon href={null} size="sm" />
          </div>
        </header>
        <main className="flex-1 container py-8 flex items-center justify-center px-4">
          <Card className="w-full max-w-md border shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-500" />
                Quiz Completed!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
                  {finalScore}%
                </p>
                <p className="text-muted-foreground">Your Score</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Correct Answers: {score} of {quizData.length}
                </p>
                <Progress
                  value={finalScore}
                  className="h-3 [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-indigo-500"
                />
              </div>
              {passed ? (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg text-center border border-green-200">
                  <p className="font-medium text-green-700">Great job! You've unlocked the next level.</p>
                  <p className="text-sm text-green-600 mt-1">Continue your Javanese learning journey!</p>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg text-center border border-amber-200">
                  <p className="font-medium text-amber-700">Keep practicing to improve your score!</p>
                  <p className="text-sm text-amber-600 mt-1">You need 70% or higher to unlock the next level.</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between gap-3">
              <Button variant="outline" onClick={resetQuiz} className="w-full sm:w-auto">
                Try Again
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 w-full sm:w-auto"
              >
                <Link href="/dashboard">Continue Learning</Link>
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    )
  }

  const question = quizData[currentQuestion] || {
    id: "",
    question: "Loading question...",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    correctAnswer: "",
  }

  const progress = (currentQuestion / quizData.length) * 100

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full blur-xl"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-indigo-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-purple-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-1/3 w-18 h-18 bg-pink-500 rounded-full blur-xl"></div>
      </div>

      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between">
          <Link
            href="/dashboard/javanese"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Exit Quiz</span>
            <span className="sm:hidden">Exit</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/60 px-3 py-1 rounded-full">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className={`text-sm font-medium ${timeLeft <= 10 ? "text-red-600" : "text-blue-600"}`}>
                {timeLeft}s
              </span>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: lives }).map((_, i) => (
                <Heart key={`filled-${i}`} className="h-4 w-4 md:h-5 md:w-5 text-red-500 fill-red-500" />
              ))}
              {Array.from({ length: 3 - lives }).map((_, i) => (
                <Heart key={`empty-${i}`} className="h-4 w-4 md:h-5 md:w-5 text-gray-300" />
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-4 md:py-8 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border">
                  <span className="text-sm font-medium text-blue-700">
                    Level {lessonLevel}: {lessonTitle}
                  </span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border">
                  <span className="text-sm font-medium text-indigo-700">
                    Question {currentQuestion + 1} of {quizData.length}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {streak > 0 && (
                  <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-1 rounded-full border border-yellow-200">
                    <Zap className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-700">{streak} streak!</span>
                  </div>
                )}
                <div className="flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-1 rounded-full border border-green-200">
                  <Target className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">Score: {score}</span>
                </div>
              </div>
            </div>
            <Progress
              value={progress}
              className="h-3 [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-indigo-500"
            />
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card className="border bg-white/80 backdrop-blur-sm border-blue-300 shadow-lg">
                <CardHeader className="p-6 md:p-8">
                  <CardTitle className="text-xl md:text-2xl text-center">{question.question}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6 md:p-8 pt-0">
                  {question.options.map((option, index) => (
                    <Button
                      key={index}
                      variant={
                        selectedAnswer === option
                          ? isCorrect
                            ? "default"
                            : "destructive"
                          : selectedAnswer !== null && option === question.correctAnswer
                            ? "default"
                            : "outline"
                      }
                      className={`w-full justify-start text-left h-auto py-4 md:py-6 px-6 md:px-8 text-base md:text-lg transition-all duration-200 hover:scale-[1.02] ${
                        selectedAnswer === option && isCorrect
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                          : ""
                      } ${selectedAnswer === option && !isCorrect ? "bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600" : ""} ${
                        selectedAnswer !== null && option === question.correctAnswer && selectedAnswer !== option
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                          : ""
                      }`}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={selectedAnswer !== null}
                    >
                      <div className="flex items-center justify-between w-full gap-4">
                        <span className="flex-1 text-left">{option}</span>
                        {selectedAnswer === option &&
                          (isCorrect ? (
                            <Check className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
                          ) : (
                            <X className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
                          ))}
                        {selectedAnswer !== null && option === question.correctAnswer && selectedAnswer !== option && (
                          <Check className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
                        )}
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-600" />
                    Need Help?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowHint(!showHint)}
                    className="w-full border-yellow-300 hover:bg-yellow-100"
                    disabled={selectedAnswer !== null}
                  >
                    {showHint ? "Hide Hint" : "Show Hint"}
                  </Button>
                  {showHint && (
                    <div className="mt-3 p-3 bg-yellow-100 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        Think about common greetings you might use when meeting someone for the first time.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Star className="h-5 w-5 text-blue-600" />
                    Your Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-700">Accuracy</span>
                    <span className="font-medium text-blue-800">
                      {currentQuestion > 0 ? Math.round((score / currentQuestion) * 100) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-700">Best Streak</span>
                    <span className="font-medium text-blue-800">{Math.max(streak, 0)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-700">Lives Left</span>
                    <span className="font-medium text-blue-800">{lives}/3</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-pink-600" />
                    Keep Going!
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-pink-700">
                    {score === currentQuestion && currentQuestion > 0
                      ? "Perfect so far! 🎉"
                      : streak >= 2
                        ? `Amazing ${streak} question streak! 🔥`
                        : "You're doing great! 💪"}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
