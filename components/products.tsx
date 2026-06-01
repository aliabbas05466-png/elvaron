"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"

const menProducts = [
  {
    id: "zyron",
    name: "ZYRON",
    description: "Power in Every Drop",
    price: 4290,
    price100ml: 8390,
    price50ml: 4290,
    price30ml: 2690,
    price10ml: 890,
    image: "/products/zyron.jpg",
    gradient: "linear-gradient(135deg, #D4A574, #8B6F47)",
    isSignature: true,
  },
  {
    id: "velour",
    name: "VELOUR",
    description: "Elegance Redefined",
    price: 3890,
    price100ml: 6790,
    price50ml: 3890,
    price30ml: 2490,
    price10ml: 790,
    image: "/products/velour.jpg",
    gradient: "linear-gradient(135deg, #2C3E50, #4A5568)",
  },
  {
    id: "virex",
    name: "VIREX",
    description: "Pure freshness. Unstoppable energy.",
    price: 3790,
    price100ml: 6590,
    price50ml: 3790,
    price30ml: 2390,
    price10ml: 790,
    image: "/products/virex.jpg",
    gradient: "linear-gradient(135deg, #8B3A3A, #5C1E1E)",
  },
  {
    id: "elixir",
    name: "ELIXIR",
    description: "Crystal clarity. Oceanic serenity.",
    price: 3990,
    price100ml: 7990,
    price50ml: 3990,
    price30ml: 2599,
    price10ml: 890,
    image: "/products/elixir.jpg",
    gradient: "linear-gradient(135deg, #4A90E2, #1E5DA8)",
  },
  {
    id: "eclipse",
    name: "ECLIPSE",
    description: "Mystery. Power. You.",
    price: 3690,
    price100ml: 6390,
    price50ml: 3690,
    price30ml: 2290,
    price10ml: 790,
    image: "/products/eclipse.jpg",
    gradient: "linear-gradient(135deg, #1a1a1a, #2d2d2d)",
  },
]

const womenProducts = [
  {
    id: "aurelia",
    name: "AURELIA",
    description: "Warm. Luxurious. Unforgettable.",
    price: 3790,
    price100ml: 6390,
    price50ml: 3790,
    price30ml: 2390,
    price10ml: 790,
    image: "/products/aurelia.jpg",
    gradient: "linear-gradient(135deg, #E8B4CB, #F5D5E0)",
  },
  {
    id: "allure",
    name: "ALLURE",
    description: "Irresistibly Yours",
    price: 3990,
    price100ml: 7990,
    price50ml: 3990,
    price30ml: 2590,
    price10ml: 890,
    image: "/products/allure.jpg",
    gradient: "linear-gradient(135deg, #C9A0DC, #E8B4CB)",
    isSignature: true,
  },
  {
    id: "lumina",
    name: "LUMINA",
    description: "Light Up the Moment",
    price: 3590,
    price100ml: 7190,
    price50ml: 3590,
    price30ml: 2190,
    price10ml: 790,
    image: "/products/lumina.jpg",
    gradient: "linear-gradient(135deg, #7B68EE, #A0A0FF)",
  },
]

export function Products() {
  const [activeTab, setActiveTab] = useState<"men" | "women">("men")

  return (
    <section id="collection" className="py-16 sm:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-center mb-3 sm:mb-4">
          Our Collection
        </h2>
        <p className="text-center text-muted-foreground mb-8 sm:mb-12 text-base sm:text-lg">
          Discover your signature scent
        </p>

        {/* Animated Tab Switcher */}
        <div className="flex justify-center mb-10 sm:mb-16">
          <div className="relative flex bg-secondary/50 rounded-full p-1 sm:p-1.5 backdrop-blur-sm border border-border">
            {/* Animated background slider */}
            <div
              className={`absolute top-1 sm:top-1.5 bottom-1 sm:bottom-1.5 w-[calc(50%-4px)] sm:w-[calc(50%-6px)] bg-primary rounded-full transition-all duration-500 ease-out shadow-md sm:shadow-[0_0_20px_rgba(212,175,55,0.4)] will-change-transform
                ${activeTab === "men" ? "left-1 sm:left-1.5" : "left-[calc(50%+2px)] sm:left-[calc(50%+3px)]"}`}
            />
            
            <button
              onClick={() => setActiveTab("men")}
              className={`relative z-10 px-5 sm:px-8 py-2.5 sm:py-3 font-serif text-base sm:text-lg tracking-wider transition-all duration-300
                ${activeTab === "men" 
                  ? "text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground"}`}
            >
              {"Men's"}
            </button>
            
            <button
              onClick={() => setActiveTab("women")}
              className={`relative z-10 px-5 sm:px-8 py-2.5 sm:py-3 font-serif text-base sm:text-lg tracking-wider transition-all duration-300
                ${activeTab === "women" 
                  ? "text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground"}`}
            >
              {"Women's"}
            </button>
          </div>
        </div>

        {/* Products Grid with Animation */}
        <div className="relative min-h-[400px] sm:min-h-[500px]">
          {/* Men's Products */}
          <div
            className={`transition-all duration-500 ease-out
              ${activeTab === "men" 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 -translate-x-8 pointer-events-none absolute inset-0"}`}
          >
            <p className="text-center text-muted-foreground mb-8 sm:mb-12 text-sm sm:text-base italic px-4">
              Bold fragrances crafted for the modern gentleman
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {menProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          {/* Women's Products */}
          <div
            className={`transition-all duration-500 ease-out
              ${activeTab === "women" 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 translate-x-8 pointer-events-none absolute inset-0"}`}
          >
            <p className="text-center text-muted-foreground mb-8 sm:mb-12 text-sm sm:text-base italic px-4">
              Elegant essences for the sophisticated woman
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
              {womenProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
