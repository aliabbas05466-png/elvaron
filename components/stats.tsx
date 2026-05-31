"use client"

import { Sparkles, Crown, Heart } from "lucide-react"

const features = [
  { 
    icon: Sparkles,
    title: "Limited Edition", 
    description: "Exclusive batches crafted for those who demand the extraordinary."
  },
  { 
    icon: Crown,
    title: "Premium Quality", 
    description: "Only the finest ingredients. No compromises. Pure luxury."
  },
  { 
    icon: Heart,
    title: "Unforgettable Impression", 
    description: "Leave a lasting mark wherever you go. Be remembered."
  },
]

export function Stats() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-center mb-4">
          Why Choose <span className="text-primary">ELVARON</span>
        </h2>
        <p className="text-center text-muted-foreground mb-10 sm:mb-16 max-w-2xl mx-auto text-sm sm:text-base px-4">
          Experience the difference of true luxury. Your signature scent awaits.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group text-center p-6 sm:p-8 rounded-2xl bg-glass border border-border hover:border-primary/50 transition-all duration-500 sm:hover:-translate-y-2 will-change-transform"
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl lg:text-2xl text-primary font-bold mb-2 sm:mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10 sm:mt-16">
          <a 
            href="#collection" 
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base active:scale-95 sm:hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary/25"
          >
            Explore Collection
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
