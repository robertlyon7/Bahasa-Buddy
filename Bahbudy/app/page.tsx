import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogoIcon } from "@/components/logo-icon"
import { User } from "lucide-react"
import React from 'react';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-50 bg-white border-b py-4 md:py-6">
        <div className="container flex items-center justify-between">
          <LogoIcon size="lg" />
          <nav>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-gray-900 rounded-lg text-gray-900 hover:bg-gray-900 hover:text-white"
            >
              <Link href="/login" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <p className="font-poppins font-medium">Login</p>
              </Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1 flex flex-col">
        <section className="py-16 md:py-24">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <img
                  src="/images/homepage1.png"
                  alt="Person learning language on computer"
                  className="w-full max-w-md mx-auto"
                />
              </div>
              <div className="order-1 md:order-2 text-center md:text-left">
                <h1 className="text-4xl font-serif font-bold tracking-tight sm:text-5xl mb-6">
                  The free, fun, effective way to learn a language!
                </h1>
                <Button asChild size="lg" className="rounded-xl bg-blue-600 hover:bg-blue-700 px-8">
                  <Link href="/signup"><p className="font-poppins font-semibold">Get Started</p></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="border-t border-gray-200 w-full"></div>

        <section className="py-20">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-serif font-bold text-blue-600 mb-4">Stay motivated</h2>
                <p className="text-lg text-gray-700">
                  We make it easy to form a habit of language learning with game-like features, fun challenges, and
                  reminders.
                </p>
              </div>
              <div>
                <img
                  src="/images/homepage2.png"
                  alt="Motivation illustration"
                  className="w-full max-w-sm mx-auto"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1">
                <img
                  src="/images/homepage3.png"
                  alt="Personalized learning illustration"
                  className="w-full max-w-sm mx-auto"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl font-serif font-bold text-blue-600 mb-4">Tailored learning for you</h2>
                <p className="text-lg text-gray-700">
                  Lessons are tailored to help you learn at just the right level and pace.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-serif font-bold text-blue-600 mb-4">Learn Anytime, Anywhere</h2>
                <p className="text-lg text-gray-700">
                  Practice your language skills wherever you are. Whether you've got 5 minutes or an hour, Bahasa Buddy
                  fits into your day.
                </p>
              </div>
              <div>
                <img
                  src="/images/homepage4.png"
                  alt="Learning anywhere illustration"
                  className="w-full max-w-sm mx-auto"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1">
                <img
                  src="/images/homepage7.png"
                  alt="Everyday conversation illustration"
                  className="w-full max-w-sm mx-auto"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl font-serif font-bold text-blue-600 mb-4">Master Everyday Talk</h2>
                <p className="text-lg text-gray-700">
                  Lessons are tailored to help you learn at just the right level and pace.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-8 bg-white">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} BAHASABUDDY. All rights reserved.</p>
          <nav className="flex gap-6">
            <Link href="#" className="text-sm text-gray-600 hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-sm text-gray-600 hover:underline">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-gray-600 hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
