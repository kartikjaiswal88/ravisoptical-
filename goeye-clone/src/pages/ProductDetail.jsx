import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart, Star, ChevronLeft, ChevronRight, Shield, Truck, RotateCcw, Check } from 'lucide-react'
import { useApp } from '../context/AppContext'
import ProductCard from '../components/ProductCard'

const lensOptions = [
  { label: 'Without Lens', price: 0, desc: 'Frame only' },
  { label: 'Single Vision', price: 500, desc: 'For near or far sightedness' },
  { label: 'Bifocal', price: 800, desc: 'For near and far vision' },
  { label: 'Progressive', price: 1200, desc: 'No-line multifocal' },
  { label: 'Blue Light Block', price: 600, desc: 'Reduces digital eye strain' },
]

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, addToCart, toggleWishlist, isInWishlist } = useApp()
  const product = products.find(p => p.id === Number(id))

  const [selectedLens, setSelectedLens] = useState(lensOptions[0])
  const [qty, setQty] = useState(1)
  const [imgIdx, setImgIdx] = useState(0)
  const [added, setAdded] = useState(false)

  if (!product) return (
    <div className="text-center py-20 px-4">
      <p className="text-gray-400 text-lg">Product not found</p>
      <Link to="/shop" className="text-primary mt-4 inline-block">Back to Shop</Link>
    </div>
  )

  const images = [product.image, product.image, product.image]
  const totalPrice = product.price + selectedLens.price
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  const handleAddToCart = () => {
    addToCart({ ...product, price: totalPrice }, qty, selectedLens.label)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-5 sm:py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 flex-wrap">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link to={`/shop/${product.category}`} className="hover:text-primary capitalize">{product.category}</Link>
        <span>/</span>
        <span className="text-gray-800 truncate max-w-[140px] sm:max-w-none">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-10">
        {/* Images */}
        <div>
          <div className="relative bg-gray-50 rounded-xl sm:rounded-2xl overflow-hidden aspect-square mb-2 sm:mb-3">
            <img src={images[imgIdx]} alt={product.name} className="w-full h-full object-cover" />
            {discount > 0 && (
              <span className="absolute top-3 left-3 bg-green-500 text-white text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-semibold">
                {discount}% OFF
              </span>
            )}
            <button onClick={() => setImgIdx(p => (p - 1 + images.length) % images.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => setImgIdx(p => (p + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100">
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="flex gap-2">
            {images.map((img, i) => (
              <button key={i} onClick={() => setImgIdx(i)}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-colors ${i === imgIdx ? 'border-primary' : 'border-gray-200'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400 capitalize mb-1">{product.category} • {product.shape}</p>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">{product.name}</h1>
            </div>
            <button onClick={() => toggleWishlist(product)}
              className="w-9 h-9 sm:w-10 sm:h-10 border border-gray-200 rounded-full flex items-center justify-center hover:border-red-400 transition-colors shrink-0">
              <Heart size={16} className={isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
            </button>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-2 sm:mt-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-700">{product.rating}</span>
            <span className="text-xs sm:text-sm text-gray-400">({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4 flex-wrap">
            <span className="text-2xl sm:text-3xl font-black text-primary">₹{totalPrice.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <span className="text-base sm:text-lg text-gray-400 line-through">₹{(product.originalPrice + selectedLens.price).toLocaleString()}</span>
            )}
            {discount > 0 && (
              <span className="bg-green-100 text-green-700 text-xs sm:text-sm px-2 py-0.5 rounded-full font-semibold">{discount}% off</span>
            )}
          </div>
          <p className="text-[10px] sm:text-xs text-gray-400 mt-1">Inclusive of all taxes</p>

          {/* Color */}
          <div className="mt-3 sm:mt-5">
            <p className="text-xs sm:text-sm font-semibold text-gray-700">Color: <span className="font-normal text-gray-500">{product.color}</span></p>
          </div>

          {/* Lens Options */}
          <div className="mt-4 sm:mt-5">
            <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Select Lens</p>
            <div className="space-y-1.5 sm:space-y-2">
              {lensOptions.map(opt => (
                <label key={opt.label}
                  className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl border-2 cursor-pointer transition-colors ${selectedLens.label === opt.label ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <input type="radio" name="lens" checked={selectedLens.label === opt.label} onChange={() => setSelectedLens(opt)} className="accent-primary" />
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-800">{opt.label}</p>
                      <p className="text-[10px] sm:text-xs text-gray-400 hidden sm:block">{opt.desc}</p>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700 shrink-0 ml-2">{opt.price === 0 ? 'Free' : `+₹${opt.price}`}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Qty */}
          <div className="flex items-center gap-3 sm:gap-4 mt-4 sm:mt-6">
            <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 sm:px-4 py-2 hover:bg-gray-100 text-base sm:text-lg font-medium">−</button>
              <span className="px-3 sm:px-4 py-2 font-semibold text-sm sm:text-base">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="px-3 sm:px-4 py-2 hover:bg-gray-100 text-base sm:text-lg font-medium">+</button>
            </div>
            <span className="text-xs sm:text-sm text-gray-400">{product.stock} in stock</span>
          </div>

          {/* CTA */}
          <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6">
            <button onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 rounded-full font-semibold transition-all text-sm sm:text-base ${added ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-opacity-90'}`}>
              {added ? <><Check size={16} /> Added!</> : <><ShoppingCart size={16} /> Add to Cart</>}
            </button>
            <button onClick={() => { handleAddToCart(); navigate('/checkout') }}
              className="flex-1 bg-accent text-white py-2.5 sm:py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors text-sm sm:text-base">
              Buy Now
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
            {[
              { icon: Shield, text: 'Authentic' },
              { icon: Truck, text: 'Free Delivery' },
              { icon: RotateCcw, text: '14-Day Returns' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-center gap-1 text-center">
                <Icon size={18} className="text-primary" />
                <span className="text-[10px] sm:text-xs text-gray-500">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-10 sm:mt-16">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  )
}
