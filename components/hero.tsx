import Link from "next/link"

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center bg-gradient-to-br from-primary/10 to-transparent relative pt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center w-full">
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-4 tracking-tight text-balance">
          ELVARON
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 opacity-90 max-w-xl mx-auto text-pretty tracking-widest uppercase px-4">
          Where Every Drop Matters
        </p>
        <Link
          href="#collection"
          className="inline-block bg-gradient-to-br from-primary to-yellow-400 text-primary-foreground px-8 sm:px-12 py-4 sm:py-5 rounded-full text-base sm:text-lg font-semibold shadow-lg sm:shadow-[0_20px_40px_rgba(212,175,55,0.4)] transition-all duration-400 active:scale-95 sm:hover:-translate-y-1 sm:hover:shadow-[0_30px_60px_rgba(212,175,55,0.5)]"
        >
          Shop Collection
        </Link>
      </div>
    </section>
  )
}
