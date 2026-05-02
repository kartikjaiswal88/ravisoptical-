import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useApp()
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden card-hover border border-gray-100 group">
      <div className="relative overflow-hidden bg-gray-50 aspect-square">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {discount > 0 && (
            <span className="bg-green-500 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-semibold">{discount}% OFF</span>
          )}
          {product.bestseller && (
            <span className="bg-accent text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-semibold">Bestseller</span>
          )}
        </div>

        {/* Wishlist */}
        <button onClick={() => toggleWishlist(product)}
          className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform">
          <Heart size={13} className={isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
        </button>

        {/* Quick Add — hidden on mobile, shown on hover for desktop */}
        <div className="absolute bottom-0 left-0 right-0 bg-primary text-white text-center py-2 text-xs sm:text-sm font-medium
          translate-y-full group-hover:translate-y-0 transition-transform duration-300 cursor-pointer hidden sm:block"
          onClick={() => addToCart(product)}>
          <span className="flex items-center justify-center gap-1.5"><ShoppingCart size={13} /> Quick Add</span>
        </div>

        {/* Mobile tap to add */}
        <button
          className="absolute bottom-0 left-0 right-0 bg-primary text-white text-center py-1.5 text-xs font-medium sm:hidden"
          onClick={() => addToCart(product)}>
          + Add
        </button>
      </div>

      <div className="p-2.5 sm:p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-800 hover:text-primary transition-colors text-xs sm:text-sm leading-tight">{product.name}</h3>
        </Link>
        <p className="text-[10px] sm:text-xs text-gray-400 capitalize mt-0.5 hidden sm:block">{product.shape} • {product.color}</p>

        <div className="flex items-center gap-1 mt-1">
          <Star size={10} className="fill-yellow-400 text-yellow-400" />
          <span className="text-[10px] sm:text-xs font-medium text-gray-700">{product.rating}</span>
          <span className="text-[10px] sm:text-xs text-gray-400 hidden sm:inline">({product.reviews})</span>
        </div>

        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="font-bold text-primary text-sm sm:text-base">₹{product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && (
            <span className="text-[10px] sm:text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </div>
  )
}
