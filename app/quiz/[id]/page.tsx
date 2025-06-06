"use client"

import { use } from "react" 
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Check, Heart, Lock, X } from "lucide-react"
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

export default function QuizPage({ params }: { params: Promise<{id: string }> }) {
  const { id } = use(params)
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

  useEffect(() => {
    // Wrap in try/catch to handle any potential errors
    try {
      // Check if lesson is unlocked
      if (typeof window !== "undefined") {
        const unlocked = isLessonUnlocked(id)
        setIsUnlocked(unlocked)

        if (!unlocked) {
          // Redirect if lesson is locked
          router.push("/dashboard")
          return
        }

        // Find lesson info
        const lesson = lessons.find((l) => l.id === id)
        if (lesson) {
          setLessonTitle(lesson.title)
          setLessonLevel(lesson.level)
        }

        // Load quiz data
        const data = getQuizData(id)
        if (data) {
          setQuizData(data)
        } else {
          // Redirect if quiz not found
          router.push("/dashboard")
        }
      }
    } catch (error) {
      console.error("Error initializing quiz:", error)
    } finally {
      setIsLoading(false)
    }
  }, [id, router])

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setIsCorrect(null)
    setScore(0)
    setQuizCompleted(false)
    setLives(3)
  }

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer !== null) return // Prevent changing answer after selection

    setSelectedAnswer(answer)
    const correct = answer === quizData[currentQuestion]?.correctAnswer
    setIsCorrect(correct)

    if (correct) {
      setScore(score + 1)
    } else {
      // Reduce lives on incorrect answer
      setLives(lives - 1)
    }

    // Move to next question after delay or end quiz if out of lives
    setTimeout(() => {
      if (lives <= 1 && !correct) {
        // Game over - out of lives
        setQuizCompleted(true)
        const progressPercentage = Math.round((score / quizData.length) * 100)
        saveQuizProgress(id, progressPercentage)
      } else if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setIsCorrect(null)
      } else {
        // Quiz completed
        setQuizCompleted(true)
        const progressPercentage = Math.round(((score + (correct ? 1 : 0)) / quizData.length) * 100)
        saveQuizProgress(id, progressPercentage)
      }
    }, 1500)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading quiz...</p>
        </div>
      </div>
    )
  }

  if (!isUnlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-4">
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
      <div className="flex min-h-screen items-center justify-center bg-white px-4">
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
      <div className="flex min-h-screen flex-col bg-white">
        <header className="bg-white border-b">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Link>
            <LogoIcon href={null} size="sm" />
          </div>
        </header>
        <main className="flex-1 container py-8 flex items-center justify-center px-4">
          <Card className="w-full max-w-md border shadow-sm">
            <CardHeader>
              <CardTitle className="text-center">Quiz Completed!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">
                  {finalScore}%
                </p>
                <p className="text-muted-foreground">Your Score</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Correct Answers: {score} of {quizData.length}
                </p>
                <Progress value={finalScore} className="h-2" />
              </div>
              {passed ? (
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="font-medium text-blue-600">Great job! You've unlocked the next level.</p>
                  <p className="text-sm text-blue-600/80 mt-1">Continue your Javanese learning journey!</p>
                </div>
              ) : (
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <p className="font-medium text-amber-600">Keep practicing to improve your score!</p>
                  <p className="text-sm text-amber-600/80 mt-1">You need 70% or higher to unlock the next level.</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between gap-3">
              <Button variant="outline" onClick={resetQuiz} className="w-full sm:w-auto">
                Try Again
              </Button>
              <Button asChild className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                <Link href="/dashboard">Continue Learning</Link>
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    )
  }

  // Safety check to ensure we have a valid question
  const question = quizData[currentQuestion] || {
    id: "",
    question: "Loading question...",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    correctAnswer: "",
  }

  const progress = (currentQuestion / quizData.length) * 100

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="bg-white border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Exit Quiz</span>
            <span className="sm:hidden">Exit</span>
          </Link>
          <div className="flex items-center gap-1">
            {Array.from({ length: lives }).map((_, i) => (
              <Heart key={`filled-${i}`} className="h-4 w-4 md:h-5 md:w-5 text-red-500 fill-red-500" />
            ))}
            {Array.from({ length: 3 - lives }).map((_, i) => (
              <Heart key={`empty-${i}`} className="h-4 w-4 md:h-5 md:w-5 text-gray-300" />
            ))}
          </div>
        </div>
      </header>
      <main className="flex-1 container py-4 md:py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
              <span className="text-xs md:text-sm font-medium">
                Level {lessonLevel}: {lessonTitle} - Question {currentQuestion + 1} of {quizData.length}
              </span>
              <span className="text-xs md:text-sm text-muted-foreground">Score: {score}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="border shadow-sm">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-lg md:text-xl">{question.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6 pt-0">
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
                  className={`w-full justify-start text-left h-auto py-3 md:py-4 px-4 md:px-6 text-sm md:text-base ${
                    selectedAnswer === option && isCorrect ? "bg-green-600 hover:bg-green-600" : ""
                  } ${selectedAnswer === option && !isCorrect ? "bg-red-600 hover:bg-red-600" : ""} ${
                    selectedAnswer !== null && option === question.correctAnswer && selectedAnswer !== option
                      ? "bg-green-600 hover:bg-green-600"
                      : ""
                  }`}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={selectedAnswer !== null}
                >
                  <div className="flex items-center justify-between w-full gap-2">
                    <span className="flex-1 text-left">{option}</span>
                    {selectedAnswer === option &&
                      (isCorrect ? (
                        <Check className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                      ) : (
                        <X className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                      ))}
                    {selectedAnswer !== null && option === question.correctAnswer && selectedAnswer !== option && (
                      <Check className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                    )}
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
