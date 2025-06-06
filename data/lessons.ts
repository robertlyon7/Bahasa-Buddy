export interface Lesson {
  id: string
  title: string
  description: string
  level: number
  image: string
  color?: string
  unlocked: boolean
}

export const lessons: Lesson[] = [
  {
    id: "greetings",
    title: "Greetings",
    description: "Learn basic Javanese greetings and introductions.",
    level: 1,
    image: "/placeholder.svg?height=200&width=400",
    color: "#3b82f6",
    unlocked: true,
  },
  {
    id: "numbers",
    title: "Numbers",
    description: "Count from 1 to 10 in Javanese.",
    level: 2,
    image: "/placeholder.svg?height=200&width=400",
    color: "#3b82f6",
    unlocked: false,
  },
  {
    id: "basic-sentences",
    title: "Basic Sentences",
    description: "Form simple sentences in Javanese.",
    level: 3,
    image: "/placeholder.svg?height=200&width=400",
    color: "#3b82f6",
    unlocked: false,
  },
  {
    id: "family-members",
    title: "Family Members",
    description: "Learn Javanese terms for family relationships.",
    level: 4,
    image: "/placeholder.svg?height=200&width=400",
    color: "#3b82f6",
    unlocked: false,
  },
  {
    id: "food-and-drinks",
    title: "Food & Drinks",
    description: "Essential Javanese vocabulary for meals and beverages.",
    level: 5,
    image: "/placeholder.svg?height=200&width=400",
    color: "#3b82f6",
    unlocked: false,
  },
  {
    id: "daily-activities",
    title: "Daily Activities",
    description: "Express common daily activities in Javanese.",
    level: 6,
    image: "/placeholder.svg?height=200&width=400",
    color: "#3b82f6",
    unlocked: false,
  },
]
