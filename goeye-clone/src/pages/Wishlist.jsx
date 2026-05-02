import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext'
import ProductCard from '../components/ProductCard'

export default function Wishlist() {
  const { wishlist } = useApp()

  if (wishlist.length === 0) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <Heart size={64} className="text-gray-200 mx-auto mb-4" />
      <h2 className="text-xl font-bold text-gray-700 mb-2">Your wishlist is empty</h2>
      <p className="text-gray-400 mb-6">Save your favourite eyewear here</p>
      <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
        Shop Now <ArrowRight size={16} />
      </Link>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">My Wishlist ({wishlist.length})</h1>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4">
        {wishlist.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
