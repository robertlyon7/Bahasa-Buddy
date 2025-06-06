"use client"

import { use } from "react" 
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, BookOpen, VolumeX } from "lucide-react"
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

  useEffect(() => {
    // Find the lesson by ID
    const foundLesson = lessons.find((l) => l.id === id)
    if (foundLesson) {
      setLesson(foundLesson)

      // Check if lesson is unlocked
      const unlocked = isLessonUnlocked(id)
      setIsUnlocked(unlocked)

      if (!unlocked) {
        // Redirect if lesson is locked
        router.push("/dashboard")
      }
    } else {
      // Redirect if lesson not found
      router.push("/dashboard")
    }
  }, [id, router])

  if (!lesson || !isUnlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading lesson...</p>
      </div>
    )
  }

  // Sample lesson content based on the lesson ID
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
      <main className="flex-1 container py-4 md:py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">
              Level {lesson.level}: {lesson.title}
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">{lesson.description}</p>
          </div>

          <Card className="border shadow-sm">
            <CardHeader
              className="bg-cover bg-center p-4 md:p-6"
              style={{
                backgroundImage: `url("/images/learningmaterial.png")`,
                backgroundColor: "#3b82f6",
                backgroundPosition: "center 40%",
              }}
            >
              <div className="bg-black/20 p-3 md:p-4 rounded-md">
                <CardTitle className="text-white text-lg md:text-xl">{lesson.title} - Learning Materials</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6 space-y-6 md:space-y-8">
              {lessonContent.sections.map((section, index) => (
                <div key={index} className="space-y-3 md:space-y-4">
                  <h3 className="text-lg md:text-xl font-bold flex items-center gap-2">
                    <BookOpen className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                    {section.title}
                  </h3>
                  <div className="pl-6 md:pl-7 space-y-3 md:space-y-4">
                    <p className="text-muted-foreground text-sm md:text-base">{section.content}</p>

                    {section.examples && section.examples.length > 0 && (
                      <div className="bg-white rounded-lg p-3 md:p-4 space-y-3 shadow-sm border">
                        <h4 className="font-medium text-xs md:text-sm text-muted-foreground">Examples:</h4>
                        {section.examples.map((example, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0 gap-2"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm md:text-base truncate">{example.javanese}</p>
                              <p className="text-xs md:text-sm text-muted-foreground">{example.english}</p>
                              <p className="text-xs italic text-muted-foreground">/{example.pronunciation}/</p>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 flex-shrink-0">
                              <VolumeX className="h-3 w-3 md:h-4 md:w-4" />
                              <span className="sr-only">Pronounce</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 p-4 md:p-6">
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link href="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Lessons
                </Link>
              </Button>
              <Button asChild className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                <Link href={`/quiz/${lesson.id}`}>
                  Take Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
