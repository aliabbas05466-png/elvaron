"use client"

import { useState } from "react"
import Image from "next/image"
import { useCart } from "@/components/cart-provider"

interface Product {
  id: string
  name: string
  description: string
  price: number
  price100ml?: number
  price50ml?: number
  price30ml?: number
  price10ml?: number
  price12ml?: number
  price6ml?: number
  price3ml?: number
  image?: string
  gradient: string
  isSignature?: boolean
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  
  // Determine product type (perfume or attar)
  // Attar has 6ml/10ml sizes, perfumes have 10ml/30ml/50ml/100ml sizes
  const isAttar = product.price6ml !== undefined && product.price100ml === undefined
  const defaultSize = isAttar ? "6ml" : "50ml"
  const [selectedSize, setSelectedSize] = useState<"100ml" | "50ml" | "30ml" | "10ml" | "12ml" | "6ml" | "3ml">(defaultSize as any)

  const getPrice = () => {
    if (isAttar) {
      switch (selectedSize) {
        case "10ml":
          return product.price10ml
        case "6ml":
          return product.price6ml
        default:
          return product.price6ml
      }
    } else {
      switch (selectedSize) {
        case "100ml":
          return product.price100ml
        case "50ml":
          return product.price50ml
        case "30ml":
          return product.price30ml
        case "10ml":
          return product.price10ml
        default:
          return product.price50ml
      }
    }
  }

  const handleAddToCart = () => {
    const price = getPrice()
    if (price === undefined) {
      console.error("Price is not available for selected size")
      return
    }
    const cartItem = {
      ...product,
      id: `${product.id}-${selectedSize}`,
      name: `${product.name} - ${selectedSize}`,
      price: price,
    }
    addToCart(cartItem)
  }

  return (
    <div className="group bg-glass backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-border transition-all duration-500 cursor-pointer hover:shadow-lg sm:hover:-translate-y-4 sm:hover:shadow-[0_30px_60px_rgba(212,175,55,0.3)] will-change-transform relative">
      {product.isSignature && (
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg z-10">
          SIGNATURE
        </div>
      )}
      <div className="h-48 sm:h-64 lg:h-72 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 overflow-hidden relative bg-secondary/50">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{ background: product.gradient }}
          >
            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-[left] duration-700 group-hover:left-full" />
          </div>
        )}
      </div>
      <h3 className="font-serif text-xl sm:text-2xl mb-2 sm:mb-3 text-primary">{product.name}</h3>
      <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">{product.description}</p>

      {/* Size Selection */}
      <div className="mb-4 sm:mb-6">
        <p className="text-xs sm:text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Select Size</p>
        <div className={isAttar ? "flex gap-2 mb-4" : "grid grid-cols-2 gap-2 mb-4"}>
          {isAttar ? (
            <>
              <button
                onClick={() => setSelectedSize("10ml")}
                className={`flex-1 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 ${
                  selectedSize === "10ml"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                10mL
              </button>
              <button
                onClick={() => setSelectedSize("6ml")}
                className={`flex-1 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 ${
                  selectedSize === "6ml"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                6mL
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setSelectedSize("100ml")}
                className={`py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 ${
                  selectedSize === "100ml"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                100mL
              </button>
              <button
                onClick={() => setSelectedSize("50ml")}
                className={`py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 ${
                  selectedSize === "50ml"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                50mL
              </button>
              <button
                onClick={() => setSelectedSize("30ml")}
                className={`py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 ${
                  selectedSize === "30ml"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                30mL
              </button>
              <button
                onClick={() => setSelectedSize("10ml")}
                className={`py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 ${
                  selectedSize === "10ml"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                10mL
              </button>
            </>
          )}
        </div>

        {/* Price Display */}
        <div className="text-lg sm:text-xl font-semibold text-primary">
          ₨{getPrice()}
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full bg-primary text-primary-foreground py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 active:scale-95 sm:hover:bg-yellow-400 sm:hover:scale-[1.02]"
      >
        Add to Cart
      </button>
    </div>
  )
}
