"use client"

import Image from "next/image"
import { ProductCard } from "@/components/product-card"

const eitarProducts = [
  {
    id: "oud-royal",
    name: "OUD ROYAL ATTAR",
    description: "Ancient mystique. Timeless allure.",
    price10ml: 1990,
    price6ml: 1390,
    image: "/oideitar/oud-royal-attar.jpg",
    gradient: "linear-gradient(135deg, #2D5F3F, #4A8F5F)",
    isSignature: true,
  },
  {
    id: "amber-noir",
    name: "AMBER NOIR ATTAR",
    description: "Deep warmth. Exotic richness.",
    price10ml: 1790,
    price6ml: 1190,
    image: "/oideitar/amber-noir-attar.jpg",
    gradient: "linear-gradient(135deg, #4A3728, #8B6914)",
  },
  {
    id: "musk-supreme",
    name: "MUSK SUPREME ATTAR",
    description: "Pure essence. Lasting impression.",
    price10ml: 1790,
    price6ml: 1190,
    image: "/oideitar/musk-supreme-attar.jpg",
    gradient: "linear-gradient(135deg, #1E3A52, #4A7BA7)",
  },
]

export function Eitar() {
  return (
    <section id="eitar" className="py-16 sm:py-24 lg:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4">
            <span className="text-primary">ATTAR</span> Collection
          </h2>
          <div className="w-16 sm:w-24 h-0.5 bg-primary mx-auto mb-4 sm:mb-6" />
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
            Premium concentrated oils. The essence of Arabian luxury.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {eitarProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: "both" }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
