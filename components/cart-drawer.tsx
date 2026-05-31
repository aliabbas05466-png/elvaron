"use client"

import { useState } from "react"
import { X, Minus, Plus, ShoppingBag, ArrowLeft, CheckCircle } from "lucide-react"
import { useCart } from "@/components/cart-provider"

type Step = "cart" | "details" | "confirmation"

export function CartDrawer() {
  const { cart, isOpen, setIsOpen, removeFromCart, updateQuantity, clearCart, total } = useCart()
  const [step, setStep] = useState<Step>("cart")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => {
      setStep("cart")
      setFormData({ name: "", email: "", phone: "", city: "", address: "" })
      setErrors({})
    }, 300)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required"
    } else if (!/^[\d\s\-+()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number"
    }
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setStep("confirmation")
    }
  }

  const handleConfirmOrder = async () => {
    try {
      // Validate form first
      if (!validateForm()) {
        return
      }

      // Send order to email
      const orderPayload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        address: formData.address,
        cart: cart.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total: total,
      }

      console.log('[v0] Submitting order:', orderPayload)

      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      })

      console.log('[v0] Order API response status:', response.status)
      const responseData = await response.json()
      console.log('[v0] Order API response:', responseData)

      if (response.ok) {
        console.log('[v0] Order submitted successfully')
        alert('✓ Order submitted successfully! Email confirmation has been sent.')
        clearCart()
        handleClose()
      } else {
        console.error('[v0] Order submission failed:', responseData)
        alert('⚠ Error: ' + (responseData.message || responseData.error || responseData.details || 'Failed to submit order'))
      }
    } catch (error) {
      console.error('[v0] Error sending order:', error)
      alert('❌ Error submitting order. Check your internet connection and try again.')
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={handleClose}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          {step !== "cart" && step !== "confirmation" && (
            <button
              onClick={() => setStep("cart")}
              className="p-2 hover:bg-secondary rounded-full transition-colors mr-2"
              aria-label="Back to cart"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <h2 className="font-serif text-2xl flex items-center gap-3 flex-1">
            <ShoppingBag className="w-6 h-6 text-primary" />
            {step === "cart" && "Your Cart"}
            {step === "details" && "Order Details"}
            {step === "confirmation" && "Order Confirmed"}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart View */}
        {step === "cart" && (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center text-muted-foreground py-12">
                  <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 bg-secondary/50 rounded-xl"
                    >
                      <div className="flex-1">
                        <h3 className="font-serif text-lg text-primary">
                          {item.name}
                        </h3>
                        <p className="text-muted-foreground">₨{item.price}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center hover:border-primary transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center hover:border-primary transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="self-start p-2 hover:text-destructive transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-border">
                <div className="flex justify-between text-lg mb-6">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-serif text-2xl text-primary">₨{total}</span>
                </div>
                <button 
                  onClick={() => setStep("details")}
                  className="w-full bg-gradient-to-br from-primary to-yellow-400 text-primary-foreground py-4 rounded-full text-lg font-semibold shadow-[0_20px_40px_rgba(212,175,55,0.4)] transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(212,175,55,0.5)]"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </>
        )}

        {/* Order Details Form */}
        {step === "details" && (
          <>
            <form onSubmit={handleSubmitOrder} className="flex-1 overflow-y-auto p-6">
              <div className="space-y-5">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 bg-input border rounded-xl outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 ${errors.name ? 'border-destructive' : 'border-border'}`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 bg-input border rounded-xl outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 ${errors.email ? 'border-destructive' : 'border-border'}`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-4 py-3 bg-input border rounded-xl outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 ${errors.phone ? 'border-destructive' : 'border-border'}`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                </div>

                {/* City */}
                <div className="space-y-2">
                  <label htmlFor="city" className="block text-sm font-medium text-muted-foreground">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={`w-full px-4 py-3 bg-input border rounded-xl outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 ${errors.city ? 'border-destructive' : 'border-border'}`}
                    placeholder="Enter your city"
                  />
                  {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <label htmlFor="address" className="block text-sm font-medium text-muted-foreground">
                    Delivery Address
                  </label>
                  <textarea
                    id="address"
                    rows={3}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={`w-full px-4 py-3 bg-input border rounded-xl outline-none transition-all resize-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${errors.address ? 'border-destructive' : 'border-border'}`}
                    placeholder="Enter your delivery address"
                  />
                  {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
                </div>

                {/* Order Summary */}
                <div className="mt-6 p-4 bg-secondary/50 rounded-xl space-y-3">
                  <h3 className="font-serif text-lg text-primary mb-3">Order Summary</h3>
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.name} x {item.quantity}</span>
                      <span>₨{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-border flex justify-between font-semibold">
                    <span>Total Bill</span>
                    <span className="text-primary text-xl">₨{total}</span>
                  </div>
                </div>
              </div>
            </form>

            <div className="p-6 border-t border-border">
              <button 
                onClick={handleSubmitOrder}
                className="w-full bg-gradient-to-br from-primary to-yellow-400 text-primary-foreground py-4 rounded-full text-lg font-semibold shadow-[0_20px_40px_rgba(212,175,55,0.4)] transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(212,175,55,0.5)]"
              >
                Place Order
              </button>
            </div>
          </>
        )}

        {/* Confirmation */}
        {step === "confirmation" && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 animate-in zoom-in duration-500">
              <CheckCircle className="w-12 h-12 text-primary" />
            </div>
            <h3 className="font-serif text-2xl mb-3">Thank You!</h3>
            <p className="text-muted-foreground mb-2">Your order has been placed successfully.</p>
            <p className="text-sm text-muted-foreground mb-8">
              We&apos;ll send a confirmation email to <span className="text-primary">{formData.email}</span>
            </p>
            
            <div className="w-full p-4 bg-secondary/50 rounded-xl space-y-2 text-left mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Name</span>
                <span>{formData.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Phone</span>
                <span>{formData.phone}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">City</span>
                <span>{formData.city}</span>
              </div>
              <div className="pt-2 border-t border-border flex justify-between font-semibold">
                <span>Total Paid</span>
                <span className="text-primary text-lg">₨{total}</span>
              </div>
            </div>

            <button 
              onClick={handleConfirmOrder}
              className="w-full bg-gradient-to-br from-primary to-yellow-400 text-primary-foreground py-4 rounded-full text-lg font-semibold shadow-[0_20px_40px_rgba(212,175,55,0.4)] transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(212,175,55,0.5)]"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
