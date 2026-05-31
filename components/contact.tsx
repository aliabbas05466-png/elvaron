"use client"

import { useState } from "react"
import { Crown, Phone, Mail } from "lucide-react"

export function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-center mb-10 sm:mb-16 relative">
          Private Consultation
          <span className="absolute -bottom-3 sm:-bottom-5 left-1/2 -translate-x-1/2 w-16 sm:w-24 h-0.5 bg-primary" />
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          <div className="text-center lg:text-left">
            <h3 className="text-primary text-xl sm:text-2xl mb-3 sm:mb-4 flex items-center justify-center lg:justify-start gap-3">
              <Crown className="w-5 h-5 sm:w-6 sm:h-6" />
              VIP Experience
            </h3>
            <p className="text-muted-foreground text-base sm:text-lg mb-6 sm:mb-8">
              Custom fragrance creation with master perfumer. Starting $500.
            </p>
            <div className="space-y-3 sm:space-y-4 text-muted-foreground flex flex-col items-center lg:items-start">
              <p className="flex items-center gap-3 text-sm sm:text-base">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                0337 8027158
              </p>
              <p className="flex items-center gap-3 text-sm sm:text-base">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                teamelvaron@gmail.com
              </p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-glass backdrop-blur-xl p-5 sm:p-8 rounded-2xl border border-border"
          >
            <div className="mb-4 sm:mb-5">
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-input border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
              />
            </div>
            <div className="mb-4 sm:mb-5">
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-input border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
              />
            </div>
            <div className="mb-5 sm:mb-6">
              <textarea
                rows={4}
                placeholder="Your fragrance vision..."
                required
                className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-input border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm sm:text-base"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-br from-primary to-yellow-400 text-primary-foreground py-3.5 sm:py-5 rounded-full text-base sm:text-lg font-semibold shadow-[0_20px_40px_rgba(212,175,55,0.4)] transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(212,175,55,0.5)]"
            >
              {submitted ? "Consultation Booked!" : "Book Consultation"}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
