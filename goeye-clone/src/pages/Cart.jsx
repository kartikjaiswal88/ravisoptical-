import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Cart() {
  const { cart, removeFromCart, updateCartQty, cartTotal } = useApp()
  const navigate = useNavigate()

  if (cart.length === 0) return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:py-20 text-center">
      <ShoppingBag size={56} className="text-gray-200 mx-auto mb-4" />
      <h2 className="text-lg sm:text-xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
      <p className="text-gray-400 text-sm mb-6">Add some eyewear to get started</p>
      <Link to="/shop" className="btn-primary inline-flex items-center gap-2 text-sm sm:text-base">
        Shop Now <ArrowRight size={15} />
      </Link>
    </div>
  )

  const shipping = cartTotal >= 999 ? 0 : 99
  const total = cartTotal + shipping

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-5 sm:py-8">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-8">
        Shopping Cart <span className="text-gray-400 font-normal text-base">({cart.length})</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3 sm:space-y-4">
          {cart.map(item => (
            <div key={`${item.id}-${item.lensOption}`} className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-3 sm:p-4 flex gap-3 sm:gap-4">
              <img src={item.image} alt={item.name}
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg sm:rounded-xl bg-gray-50 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{item.name}</h3>
                    <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{item.lensOption} • {item.color}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id, item.lensOption)}
                    className="text-gray-300 hover:text-red-500 transition-colors shrink-0 p-1">
                    <Trash2 size={15} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-2 sm:mt-3">
                  <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                    <button onClick={() => updateCartQty(item.id, item.lensOption, item.qty - 1)} className="px-2.5 sm:px-3 py-1 hover:bg-gray-100">
                      <Minus size={12} />
                    </button>
                    <span className="px-2.5 sm:px-3 py-1 text-xs sm:text-sm font-semibold">{item.qty}</span>
                    <button onClick={() => updateCartQty(item.id, item.lensOption, item.qty + 1)} className="px-2.5 sm:px-3 py-1 hover:bg-gray-100">
                      <Plus size={12} />
                    </button>
                  </div>
                  <span className="font-bold text-primary text-sm sm:text-base">₹{(item.price * item.qty).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-6 h-fit lg:sticky lg:top-24">
          <h3 className="font-bold text-gray-900 mb-4 sm:mb-5 text-sm sm:text-base">Order Summary</h3>
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-gray-400">Add ₹{(999 - cartTotal).toLocaleString()} more for free shipping</p>
            )}
            <div className="border-t border-gray-100 pt-2.5 flex justify-between font-bold text-gray-900 text-sm sm:text-base">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>

          {/* Coupon */}
          <div className="mt-4 flex gap-2">
            <input placeholder="Coupon code"
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm outline-none min-w-0" />
            <button className="px-3 py-2 bg-gray-100 text-xs sm:text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap">Apply</button>
          </div>

          <button onClick={() => navigate('/checkout')}
            className="w-full mt-4 sm:mt-5 bg-primary text-white py-2.5 sm:py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
            Checkout <ArrowRight size={15} />
          </button>

          <Link to="/shop" className="block text-center text-xs sm:text-sm text-primary mt-3 hover:underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
