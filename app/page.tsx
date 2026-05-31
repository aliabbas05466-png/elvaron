import { CartProvider } from "@/components/cart-provider"
import { CartDrawer } from "@/components/cart-drawer"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { Products } from "@/components/products"
import { Eitar } from "@/components/eitar"
import { About } from "@/components/about"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <CartProvider>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Products />
        <Eitar />
        <About />
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  )
}
