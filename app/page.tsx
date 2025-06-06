import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Menu, X, Users, BookOpen, Zap } from "lucide-react"
import { useState } from "react"

export default function HomePage() {
  return (

    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Bb</span>
              </div>
              <span className="font-bold text-xl">Bahasa Buddy</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="hidden sm:block text-gray-600 hover:text-gray-900 transition-colors">
              Login
            </Link>
            <Button className="bg-blue-600 hover:bg-blue-700 transition-colors">
              <Link href="/signup"><p>Sign Up</p></Link></Button>
          </div>
        </div>
      </header>

      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                The free, fun,
                <br />
                effective way to
                <br />
                learn a language!
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
                Master Languages with our AI-powered learning platform. Interactive lessons, personalized practice, and
                real-world conversations await you.
              </p>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 rounded-xl w-full sm:w-auto">
                Start Learning <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative mt-8 lg:mt-0">
              <img
                  src="/images/homepage1.png"
                  alt="Motivation illustration"
                  className="w-full max-w-md mx-auto"
                />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
              <div className="text-center lg:text-left">
                <div className="text-sm font-semibold text-pink-500 mb-4 tracking-wide">LANGUAGE LEARNING</div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                  Learning experience that grows
                  <br />
                  with your progress.
                </h2>
              </div>
              <div className="flex items-center">
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed text-center lg:text-left">
                  Build a personalized learning journey that adapts to your pace and style. From beginner basics to
                  advanced conversations.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 duration-200">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mb-4 sm:mb-6 mx-auto sm:mx-0">
                  <BookOpen className="w-full h-full text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 text-center sm:text-left">
                  Interactive Lessons
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base text-center sm:text-left">
                  Engage with dynamic content that makes learning Indonesian fun and memorable through games and
                  exercises.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 duration-200">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mb-4 sm:mb-6 mx-auto sm:mx-0">
                  <Users className="w-full h-full text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 text-center sm:text-left">
                  Community Practice
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base text-center sm:text-left">
                  Connect with fellow learners and native speakers for real conversation practice and cultural exchange.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 duration-200 sm:col-span-2 lg:col-span-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mb-4 sm:mb-6 mx-auto sm:mx-0">
                  <Zap className="w-full h-full text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 text-center sm:text-left">
                  AI-Powered Progress
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base text-center sm:text-left">
                  Smart algorithms track your learning patterns and adapt lessons to maximize your language acquisition
                  speed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
                Why learners choose BahasaBuddy
              </h2>
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <div className="text-4xl sm:text-5xl font-bold text-pink-500 mb-2">50k+</div>
                  <div className="text-lg sm:text-xl text-gray-900 font-semibold">
                    Students already mastering languages
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-sm sm:text-base">Learn at your own pace</div>
                    <div className="text-gray-600 text-sm sm:text-base">
                      No pressure, no deadlines - study whenever works for you
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-sm sm:text-base">Real-time pronunciation feedback</div>
                    <div className="text-gray-600 text-sm sm:text-base">
                      AI-powered speech recognition helps perfect your accent
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-sm sm:text-base">Cultural immersion content</div>
                    <div className="text-gray-600 text-sm sm:text-base">
                      Learn language through Indonesian culture, food, and traditions
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative mt-8 lg:mt-0">
              <img
                  src="/images/homepage7.png"
                  alt="Motivation illustration"
                  className="w-full max-w-sm mx-auto"
                />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Your Indonesian learning journey
              <br className="hidden sm:block" />
              starts with three simple steps
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-lg sm:text-2xl font-bold">
                1
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Take placement test</h3>
              <p className="text-gray-300 text-sm sm:text-base">
                Quick assessment to determine your current Indonesian level and create a personalized learning path.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-lg sm:text-2xl font-bold">
                2
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Start daily lessons</h3>
              <p className="text-gray-300 text-sm sm:text-base">
                Bite-sized lessons that fit into your schedule. Just 15 minutes a day to build fluency.
              </p>
            </div>
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-lg sm:text-2xl font-bold">
                3
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Practice with natives</h3>
              <p className="text-gray-300 text-sm sm:text-base">
                Join conversation sessions with Indonesian speakers to apply what you've learned.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-sm font-semibold text-blue-600 mb-4 tracking-wide">OUR IMPACT</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Proven results from
              <br />
              language learners worldwide
            </h2>
            <p className="text-gray-600 mb-12 lg:mb-16 max-w-2xl mx-auto text-sm sm:text-base">
              Join thousands of successful Indonesian learners who have achieved fluency with BahasaBuddy.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 lg:mb-16">
              <div>
                <div className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">95%</div>
                <div className="text-gray-600 text-sm sm:text-base">Student satisfaction</div>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">6 months</div>
                <div className="text-gray-600 text-sm sm:text-base">Average to conversational</div>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">24/7</div>
                <div className="text-gray-600 text-sm sm:text-base">Learning support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl">
              <div className="text-sm font-semibold text-pink-500 mb-4 sm:mb-6 tracking-wide">START TODAY</div>
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-8">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white leading-tight">
                    Ready to speak 
                    <br />
                    with confidence?
                  </h2>
                  <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                    Join our community of learners and start your Indonesian journey today.
                    <br className="hidden sm:block" />
                    Free trial available - no credit card required.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 rounded-xl w-full sm:w-auto">
                    Start Free Trial
                  </Button>
                  <Button
                    size="lg"
                    className="bg-slate-800 text-white hover:bg-gray-700 rounded-xl w-full sm:w-auto"
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">Bb</span>
                  </div>
                  <span className="font-bold text-xl">Bahasa Buddy</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4 sm:mb-6 text-gray-900">Learning</h4>
                <div className="space-y-2 sm:space-y-3 text-gray-600 text-sm sm:text-base">
                  <div>Beginner Course</div>
                  <div>Intermediate</div>
                  <div>Advanced</div>
                  <div>Business Indonesian</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4 sm:mb-6 text-gray-900">Company</h4>
                <div className="space-y-2 sm:space-y-3 text-gray-600 text-sm sm:text-base">
                  <div>About Us</div>
                  <div>Careers</div>
                  <div>Contact</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4 sm:mb-6 text-gray-900">Resources</h4>
                <div className="space-y-2 sm:space-y-3 text-gray-600 text-sm sm:text-base">
                  <div>Blog</div>
                  <div>Study Guides</div>
                  <div>Grammar Tips</div>
                  <div>Culture Corner</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center pt-6 sm:pt-8 border-t border-gray-200 space-y-4 sm:space-y-0">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} BAHASABUDDY. All rights reserved.
              </p>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <span className="text-gray-600 text-xs sm:text-sm">Follow us on</span>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.5 21.5h-5v-13h5v13zM4 6.5C2.5 6.5 1.5 5.3 1.5 4s1-2.4 2.5-2.4c1.6 0 2.5 1 2.6 2.5 0 1.4-1 2.5-2.6 2.5zm11.5 6c-1 0-2 1-2 2v7h-5v-13h5v1.5c1-1.6 2.7-2.5 4.5-2.5 3.5 0 6 2.5 6 6.5v7.5h-5v-7c0-1-1-2-2-2h-1.5z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

