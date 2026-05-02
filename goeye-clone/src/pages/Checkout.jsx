import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, CreditCard, Smartphone, Building2 } from 'lucide-react'
import { useApp } from '../context/AppContext'

const paymentMethods = [
  { id: 'upi', label: 'UPI', icon: Smartphone },
  { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
  { id: 'netbanking', label: 'Net Banking', icon: Building2 },
  { id: 'cod', label: 'Cash on Delivery', icon: Check },
]

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useApp()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [payMethod, setPayMethod] = useState('upi')
  const [ordered, setOrdered] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '' })

  const shipping = cartTotal >= 999 ? 0 : 99
  const total = cartTotal + shipping

  const handleOrder = () => {
    setOrdered(true)
    clearCart()
    setTimeout(() => navigate('/'), 3000)
  }

  if (ordered) return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-20 text-center">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
        <Check size={32} className="text-green-500" />
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Order Placed!</h2>
      <p className="text-gray-500 text-sm mb-2">Thank you! You'll receive a confirmation email shortly.</p>
      <p className="text-xs text-gray-400">Redirecting to home...</p>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 py-5 sm:py-8">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-8">Checkout</h1>

      {/* Steps */}
      <div className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
        {['Delivery', 'Payment', 'Review'].map((s, i) => (
          <React.Fragment key={s}>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-colors ${step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                {step > i + 1 ? <Check size={14} /> : i + 1}
              </div>
              <span className={`text-xs sm:text-sm font-medium hidden xs:block ${step === i + 1 ? 'text-primary' : 'text-gray-400'}`}>{s}</span>
            </div>
            {i < 2 && <div className={`flex-1 h-0.5 ${step > i + 1 ? 'bg-green-500' : 'bg-gray-200'}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-8">
        <div className="lg:col-span-2">
          {/* Step 1: Delivery */}
          {step === 1 && (
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-6">
              <h2 className="font-bold text-gray-900 mb-4 sm:mb-5 text-sm sm:text-base">Delivery Address</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[['name', 'Full Name', 'text'], ['email', 'Email', 'email'], ['phone', 'Phone Number', 'tel'],
                  ['address', 'Address', 'text'], ['city', 'City', 'text'], ['state', 'State', 'text'], ['pincode', 'Pincode', 'text']
                ].map(([key, label, type]) => (
                  <div key={key} className={key === 'address' ? 'sm:col-span-2' : ''}>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm outline-none focus:border-primary transition-colors" />
                  </div>
                ))}
              </div>
              <button onClick={() => setStep(2)}
                className="mt-5 sm:mt-6 bg-primary text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors text-sm sm:text-base">
                Continue to Payment
              </button>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-6">
              <h2 className="font-bold text-gray-900 mb-4 sm:mb-5 text-sm sm:text-base">Payment Method</h2>
              <div className="space-y-2 sm:space-y-3">
                {paymentMethods.map(({ id, label, icon: Icon }) => (
                  <label key={id}
                    className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-colors ${payMethod === id ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                    <input type="radio" name="payment" checked={payMethod === id} onChange={() => setPayMethod(id)} className="accent-primary" />
                    <Icon size={18} className="text-gray-600 shrink-0" />
                    <span className="font-medium text-gray-800 text-sm sm:text-base">{label}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-2 sm:gap-3 mt-5 sm:mt-6">
                <button onClick={() => setStep(1)}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-200 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors">
                  Back
                </button>
                <button onClick={() => setStep(3)}
                  className="bg-primary text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors text-sm sm:text-base">
                  Review Order
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-6">
              <h2 className="font-bold text-gray-900 mb-4 sm:mb-5 text-sm sm:text-base">Review Order</h2>
              <div className="space-y-3 mb-5 sm:mb-6">
                {cart.map(item => (
                  <div key={`${item.id}-${item.lensOption}`} className="flex gap-3 items-center">
                    <img src={item.image} alt={item.name} className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-lg bg-gray-50 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">{item.name}</p>
                      <p className="text-[10px] sm:text-xs text-gray-400">{item.lensOption} × {item.qty}</p>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-primary shrink-0">₹{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-3 sm:pt-4 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
                <div className="flex justify-between text-gray-600"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
                <div className="flex justify-between font-bold text-gray-900 text-sm sm:text-base pt-2 border-t border-gray-100">
                  <span>Total</span><span>₹{total.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex gap-2 sm:gap-3 mt-5 sm:mt-6">
                <button onClick={() => setStep(2)}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-200 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors">
                  Back
                </button>
                <button onClick={handleOrder}
                  className="flex-1 bg-accent text-white py-2.5 sm:py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors text-sm sm:text-base">
                  Place Order · ₹{total.toLocaleString()}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-5 h-fit lg:sticky lg:top-24">
          <h3 className="font-bold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Order Summary</h3>
          <div className="space-y-2 text-xs sm:text-sm text-gray-600">
            <div className="flex justify-between"><span>{cart.length} items</span><span>₹{cartTotal.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
            <div className="flex justify-between font-bold text-gray-900 text-sm sm:text-base pt-2 border-t border-gray-100">
              <span>Total</span><span>₹{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
