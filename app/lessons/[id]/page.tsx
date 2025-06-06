"use client"

import { use } from "react" 
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, BookOpen, Volume2, Clock, Users, Target, Star, Trophy, Lightbulb } from "lucide-react"
import { lessons } from "@/data/lessons"
import { isLessonUnlocked } from "@/lib/progress"
import { useAuth } from "@/components/auth-provider"
import { LogoIcon } from "@/components/logo-icon"

export default function LessonPage({ params }: { params: Promise<{id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { user } = useAuth()
  const [lesson, setLesson] = useState<(typeof lessons)[0] | null>(null)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set())

  const convertToTTSFriendly = (pronunciation: string) => {
    return pronunciation
      .replace(/-/g, " ") 
      .replace(/oo/g, "ooh") 
      .replace(/ah/g, "aah") 
      .replace(/eh/g, "ay") 
      .replace(/ng/g, "ng") 
      .replace(/nyoo/g, "nyooh") 
      .replace(/dheh/g, "day") 
      .replace(/koo/g, "kooh") 
      .replace(/goo/g, "gooh") 
      .replace(/see/g, "see") 
      .replace(/teh/g, "tay") 
      .replace(/weh/g, "way") 
      .replace(/lah/g, "laah") 
      .replace(/bahh/g, "baah") 
      .replace(/seem/g, "seem") 
      .replace(/pahk/g, "paak") 
      .replace(/boo/g, "booh") 
      .replace(/yoo/g, "yooh") 
  }

  const playAudio = (javaneseText: string, pronunciation: string, id: string) => {
    window.speechSynthesis.cancel()

    if (playingAudio === id) {
      setPlayingAudio(null)
      return
    }

    const ttsText = convertToTTSFriendly(pronunciation)

    const utterance = new SpeechSynthesisUtterance(ttsText)

    const voices = window.speechSynthesis.getVoices()

    const preferredVoice = voices.find(
      (voice) =>
        voice.lang.includes("id") || 
        voice.lang.includes("ms") || 
        voice.lang.includes("jv") || 
        voice.name.toLowerCase().includes("indonesia") ||
        voice.name.toLowerCase().includes("malay"),
    )

    const fallbackVoice = voices.find(
      (voice) =>
        voice.name.toLowerCase().includes("natural") ||
        voice.name.toLowerCase().includes("neural") ||
        voice.name.toLowerCase().includes("premium"),
    )

    if (preferredVoice) {
      utterance.voice = preferredVoice
      utterance.lang = preferredVoice.lang
    } else if (fallbackVoice) {
      utterance.voice = fallbackVoice
      utterance.lang = "id-ID" 
    } else {
      utterance.lang = "id-ID" 
    }

    utterance.rate = 0.7 
    utterance.pitch = 1.0 
    utterance.volume = 0.9 

    utterance.onstart = () => setPlayingAudio(id)
    utterance.onend = () => setPlayingAudio(null)
    utterance.onerror = () => {
      setPlayingAudio(null)
      console.log("Speech synthesis error, trying with original text...")

      const fallbackUtterance = new SpeechSynthesisUtterance(javaneseText)
      fallbackUtterance.lang = "id-ID"
      fallbackUtterance.rate = 0.6
      fallbackUtterance.pitch = 1.0
      fallbackUtterance.onend = () => setPlayingAudio(null)
      window.speechSynthesis.speak(fallbackUtterance)
    }

    window.speechSynthesis.speak(utterance)
  }

  const markSectionComplete = (sectionIndex: number) => {
    setCompletedSections((prev) => new Set([...prev, sectionIndex]))
  }

  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices()
    }

    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices

    const foundLesson = lessons.find((l) => l.id === id)
    if (foundLesson) {
      setLesson(foundLesson)

      const unlocked = isLessonUnlocked(id)
      setIsUnlocked(unlocked)

      if (!unlocked) {
        router.push("/dashboard")
      }
    } else {
      router.push("/dashboard")
    }
  }, [id, router])

  if (!lesson || !isUnlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading lesson...</p>
        </div>
      </div>
    )
  }

  const getLessonContent = () => {
    switch (lesson.id) {
      case "greetings":
        return {
          sections: [
            {
              title: "Common Greetings",
              content:
                "In Javanese, 'Hello' is 'Sugeng rawuh'. 'Good morning' is 'Sugeng enjing'. 'Good afternoon' is 'Sugeng siang'. 'Good evening' is 'Sugeng sonten'.",
              examples: [
                { javanese: "Sugeng rawuh", english: "Hello/Welcome", pronunciation: "soo-geng rah-wooh" },
                { javanese: "Sugeng enjing", english: "Good morning", pronunciation: "soo-geng en-jing" },
                { javanese: "Sugeng sonten", english: "Good evening", pronunciation: "soo-geng son-ten" },
              ],
            },
            {
              title: "Basic Phrases",
              content: "Here are some essential phrases in Javanese:",
              examples: [
                { javanese: "Matur nuwun", english: "Thank you", pronunciation: "mah-toor noo-woon" },
                { javanese: "Sami-sami", english: "You're welcome", pronunciation: "sah-mee sah-mee" },
                { javanese: "Nyuwun sewu", english: "Excuse me", pronunciation: "nyoo-woon seh-woo" },
                { javanese: "Inggih", english: "Yes", pronunciation: "ing-gih" },
                { javanese: "Mboten", english: "No", pronunciation: "mm-bo-ten" },
              ],
            },
            {
              title: "Introducing Yourself",
              content: "To introduce yourself in Javanese:",
              examples: [
                { javanese: "Jenengku...", english: "My name is...", pronunciation: "jeh-neng-koo" },
                { javanese: "Asalku saking...", english: "I am from...", pronunciation: "ah-sahl-koo sah-king" },
                { javanese: "Pripun kabare?", english: "How are you?", pronunciation: "pree-poon kah-bah-reh" },
                { javanese: "Kula sae", english: "I am fine", pronunciation: "koo-loh sah-eh" },
              ],
            },
          ],
        }
      case "numbers":
        return {
          sections: [
            {
              title: "Counting from 1-10",
              content: "Here are the numbers 1-10 in Javanese:",
              examples: [
                { javanese: "Siji", english: "One", pronunciation: "see-jee" },
                { javanese: "Loro", english: "Two", pronunciation: "lo-ro" },
                { javanese: "Telu", english: "Three", pronunciation: "teh-loo" },
                { javanese: "Papat", english: "Four", pronunciation: "pah-paht" },
                { javanese: "Lima", english: "Five", pronunciation: "lee-mah" },
                { javanese: "Enem", english: "Six", pronunciation: "eh-nem" },
                { javanese: "Pitu", english: "Seven", pronunciation: "pee-too" },
                { javanese: "Wolu", english: "Eight", pronunciation: "wo-loo" },
                { javanese: "Sanga", english: "Nine", pronunciation: "sah-ngah" },
                { javanese: "Sepuluh", english: "Ten", pronunciation: "seh-poo-looh" },
              ],
            },
            {
              title: "Using Numbers in Sentences",
              content: "Here's how to use numbers in basic Javanese sentences:",
              examples: [
                { javanese: "Aku duwe siji", english: "I have one", pronunciation: "ah-koo doo-weh see-jee" },
                { javanese: "Iki loro", english: "These are two", pronunciation: "ee-kee lo-ro" },
                { javanese: "Telu wae", english: "Just three", pronunciation: "teh-loo wah-eh" },
              ],
            },
          ],
        }
      case "basic-sentences":
        return {
          sections: [
            {
              title: "Simple Sentences",
              content: "Here are some basic sentence structures in Javanese:",
              examples: [
                { javanese: "Aku luwe", english: "I am hungry", pronunciation: "ah-koo loo-weh" },
                { javanese: "Kowe kesel?", english: "Are you tired?", pronunciation: "ko-weh keh-sel" },
                { javanese: "Dheweke turu", english: "He/She is sleeping", pronunciation: "dheh-weh-keh too-roo" },
              ],
            },
            {
              title: "Questions and Answers",
              content: "Learn how to ask and answer simple questions:",
              examples: [
                {
                  javanese: "Kowe saka ngendi?",
                  english: "Where are you from?",
                  pronunciation: "ko-weh sah-kah ngen-dee",
                },
                { javanese: "Aku saka Yogya", english: "I am from Yogya", pronunciation: "ah-koo sah-kah yog-yah" },
                {
                  javanese: "Kowe arep menyang ngendi?",
                  english: "Where are you going?",
                  pronunciation: "ko-weh ah-rep meh-nyang ngen-dee",
                },
              ],
            },
          ],
        }
      case "family-members":
        return {
          sections: [
            {
              title: "Immediate Family",
              content: "Learn the basic terms for immediate family members in Javanese:",
              examples: [
                { javanese: "Bapak", english: "Father", pronunciation: "bah-pahk" },
                { javanese: "Ibu", english: "Mother", pronunciation: "ee-boo" },
                { javanese: "Kakang", english: "Older brother", pronunciation: "kah-kahng" },
                { javanese: "Mbakyu", english: "Older sister", pronunciation: "mm-bah-kyoo" },
                { javanese: "Adik", english: "Younger sibling", pronunciation: "ah-deek" },
                { javanese: "Anak", english: "Child", pronunciation: "ah-nahk" },
              ],
            },
            {
              title: "Extended Family",
              content: "Extended family terms in Javanese:",
              examples: [
                { javanese: "Simbah", english: "Grandparent", pronunciation: "seem-bahh" },
                { javanese: "Pakdhe", english: "Uncle (father's younger brother)", pronunciation: "pahk-dheh" },
                { javanese: "Bulik", english: "Aunt (father's younger sister)", pronunciation: "boo-leek" },
                { javanese: "Paklik", english: "Uncle (father's older brother)", pronunciation: "pahk-leek" },
                { javanese: "Yu", english: "Aunt (mother's sister)", pronunciation: "yoo" },
              ],
            },
            {
              title: "Family Sentences",
              content: "Common sentences about family:",
              examples: [
                {
                  javanese: "Iki kulawarga kula",
                  english: "This is my family",
                  pronunciation: "ee-kee koo-lah-wahr-gah koo-lah",
                },
                {
                  javanese: "Bapak kula guru",
                  english: "My father is a teacher",
                  pronunciation: "bah-pahk koo-lah goo-roo",
                },
                {
                  javanese: "Aku duwe adik loro",
                  english: "I have two younger siblings",
                  pronunciation: "ah-koo doo-weh ah-deek lo-ro",
                },
              ],
            },
          ],
        }
      case "food-and-drinks":
        return {
          sections: [
            {
              title: "Basic Food Items",
              content: "Essential food vocabulary in Javanese:",
              examples: [
                { javanese: "Sega", english: "Rice", pronunciation: "seh-gah" },
                { javanese: "Iwak", english: "Fish/Side dish", pronunciation: "ee-wahk" },
                { javanese: "Jangan", english: "Vegetable", pronunciation: "jah-ngahn" },
                { javanese: "Panganan", english: "Food", pronunciation: "pah-ngah-nahn" },
                { javanese: "Gula", english: "Sugar", pronunciation: "goo-lah" },
                { javanese: "Uyah", english: "Salt", pronunciation: "oo-yahh" },
              ],
            },
            {
              title: "Drinks",
              content: "Common beverages in Javanese:",
              examples: [
                { javanese: "Banyu", english: "Water", pronunciation: "bah-nyoo" },
                { javanese: "Wedang", english: "Hot drink/Tea", pronunciation: "weh-dahng" },
                { javanese: "Kopi", english: "Coffee", pronunciation: "ko-pee" },
                { javanese: "Susu", english: "Milk", pronunciation: "soo-soo" },
                { javanese: "Es", english: "Ice", pronunciation: "ehs" },
              ],
            },
            {
              title: "Food-related Expressions",
              content: "Useful expressions about food and eating:",
              examples: [
                { javanese: "Aku ngelih", english: "I am hungry", pronunciation: "ah-koo ngeh-leeh" },
                { javanese: "Aku ngelak", english: "I am thirsty", pronunciation: "ah-koo ngeh-lahk" },
                { javanese: "Enak tenan", english: "Very delicious", pronunciation: "eh-nahk teh-nahn" },
                { javanese: "Wis wareg", english: "Already full", pronunciation: "wees wah-rehg" },
                { javanese: "Ayo mangan", english: "Let's eat", pronunciation: "ah-yo mah-ngahn" },
              ],
            },
          ],
        }
      case "daily-activities":
        return {
          sections: [
            {
              title: "Daily Routines",
              content: "Common daily activities in Javanese:",
              examples: [
                { javanese: "Turu", english: "Sleep", pronunciation: "too-roo" },
                { javanese: "Tangi", english: "Wake up", pronunciation: "tah-ngee" },
                { javanese: "Adus", english: "Bathe", pronunciation: "ah-doos" },
                { javanese: "Mangan", english: "Eat", pronunciation: "mah-ngahn" },
                { javanese: "Ngombe", english: "Drink", pronunciation: "ngo-mbeh" },
                { javanese: "Mlaku", english: "Walk", pronunciation: "mm-lah-koo" },
              ],
            },
            {
              title: "Work and Study",
              content: "Activities related to work and learning:",
              examples: [
                { javanese: "Nyambut gawe", english: "Work", pronunciation: "nyahm-boot gah-weh" },
                { javanese: "Sinau", english: "Study/Learn", pronunciation: "see-now" },
                { javanese: "Maca", english: "Read", pronunciation: "mah-chah" },
                { javanese: "Nulis", english: "Write", pronunciation: "noo-lees" },
                { javanese: "Lunga", english: "Go", pronunciation: "loo-ngah" },
                { javanese: "Mulih", english: "Go home", pronunciation: "moo-leeh" },
              ],
            },
            {
              title: "Activity Sentences",
              content: "Complete sentences about daily activities:",
              examples: [
                { javanese: "Aku lagi sinau", english: "I am studying", pronunciation: "ah-koo lah-gee see-now" },
                {
                  javanese: "Dheweke nyambut gawe",
                  english: "He/She is working",
                  pronunciation: "dheh-weh-keh nyahm-boot gah-weh",
                },
                {
                  javanese: "Ayo lunga sekolah",
                  english: "Let's go to school",
                  pronunciation: "ah-yo loo-ngah seh-ko-lahh",
                },
                {
                  javanese: "Wis wayahe turu",
                  english: "It's time to sleep",
                  pronunciation: "wees wah-yah-heh too-roo",
                },
              ],
            },
          ],
        }
      default:
        return {
          sections: [
            {
              title: "Introduction",
              content: `Welcome to the ${lesson.title} lesson! This is a placeholder content for this lesson. Complete the quiz to test your knowledge.`,
              examples: [],
            },
          ],
        }
    }
  }

  const lessonContent = getLessonContent()
  const totalSections = lessonContent.sections.length
  const progressPercentage = (completedSections.size / totalSections) * 100

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button asChild variant="ghost" size="sm" className="mr-4">
              <Link href="/dashboard/javanese" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Lessons</span>
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

      <main className="flex-1 container py-6 md:py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                    Level {lesson.level}
                  </Badge>
                  <Badge variant="outline" className="border-green-200 text-green-700">
                    <Clock className="w-3 h-3 mr-1" />
                    15-20 min
                  </Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{lesson.title}</h1>
                <p className="text-lg text-muted-foreground mb-6">{lesson.description}</p>

                <div className="bg-white rounded-lg p-4 border border-blue-100 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Lesson Progress</span>
                    <span className="text-sm text-blue-600 font-semibold">{Math.round(progressPercentage)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    {completedSections.size} of {totalSections} sections completed
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:w-64">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Users className="h-8 w-8 opacity-80" />
                      <div>
                        <p className="text-blue-100 text-sm">Vocabulary</p>
                        <p className="text-xl font-bold">
                          {lessonContent.sections.reduce((acc, section) => acc + section.examples.length, 0)} words
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Target className="h-8 w-8 opacity-80" />
                      <div>
                        <p className="text-green-100 text-sm">Sections</p>
                        <p className="text-xl font-bold">{totalSections} topics</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader
                  className="bg-cover bg-center p-6 rounded-t-lg relative overflow-hidden"
                  style={{
                    backgroundImage: `url("/images/learningmaterial.png")`,
                    backgroundColor: "#3b82f6",
                    backgroundPosition: "center 40%",
                  }}
                >
                  <div className="absolute inset-0"></div>
                  <div className="relative z-10">
                    <CardTitle className="text-white text-xl md:text-2xl flex items-center gap-3">
                      <BookOpen className="h-6 w-6" />
                      {lesson.title} - Learning Materials
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="p-6 space-y-8">
                  {lessonContent.sections.map((section, index) => (
                    <div key={index} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              completedSections.has(index) ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {completedSections.has(index) ? "✓" : index + 1}
                          </div>
                          {section.title}
                        </h3>
                        {!completedSections.has(index) && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => markSectionComplete(index)}
                            className="text-xs"
                          >
                            Mark Complete
                          </Button>
                        )}
                      </div>

                      <div className="pl-11 space-y-4">
                        <p className="text-muted-foreground">{section.content}</p>

                        {section.examples && section.examples.length > 0 && (
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                            <h4 className="font-medium text-sm text-blue-800 mb-4 flex items-center gap-2">
                              <Lightbulb className="w-4 h-4" />
                              Examples:
                            </h4>
                            <div className="grid gap-3">
                              {section.examples.map((example, i) => (
                                <div
                                  key={i}
                                  className="bg-white rounded-lg p-4 border border-blue-200 hover:shadow-md transition-shadow"
                                >
                                  <div className="flex items-center justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-3 mb-2">
                                        <p className="font-semibold text-lg text-gray-900">{example.javanese}</p>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-8 w-8 p-0 hover:bg-blue-100"
                                          onClick={() =>
                                            playAudio(
                                              example.javanese,
                                              example.pronunciation,
                                              `${lesson.id}-${index}-${i}`,
                                            )
                                          }
                                          disabled={!window.speechSynthesis}
                                        >
                                          <Volume2
                                            className={`h-4 w-4 ${playingAudio === `${lesson.id}-${index}-${i}` ? "text-blue-600" : "text-gray-500"}`}
                                          />
                                        </Button>
                                      </div>
                                      <p className="text-gray-600 mb-1">{example.english}</p>
                                      <p className="text-sm italic text-blue-600">/{example.pronunciation}/</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>

                <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 p-6 bg-gray-50 rounded-b-lg">
                  <Button variant="outline" asChild className="w-full sm:w-auto">
                    <Link href="/dashboard/javanese">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Lessons
                    </Link>
                  </Button>
                  <Button asChild className="bg-pink-500 hover:bg-pink-700 w-full sm:w-auto">
                    <Link href={`/quiz/${lesson.id}`}>
                      Take Quiz
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2 text-yellow-800">
                    <Star className="h-5 w-5" />
                    Quick Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-yellow-700">
                    <p className="mb-2">• Click the speaker icon to hear pronunciation</p>
                    <p className="mb-2">• Practice saying each word out loud</p>
                    <p>• Mark sections complete as you learn</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-pink-50 to-pink-50 border-pink-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2 text-pink-800">
                    <Trophy className="h-5 w-5" />
                    Achievement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl mb-2">🎯</div>
                    <p className="text-sm text-pink-700 font-medium">
                      Complete this lesson to earn the "{lesson.title}" badge!
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2 text-green-800">
                    <ArrowRight className="h-5 w-5" />
                    Up Next
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-green-700">
                    <p className="font-medium mb-1">Quiz Time!</p>
                    <p>Test your knowledge with interactive questions and earn points.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
