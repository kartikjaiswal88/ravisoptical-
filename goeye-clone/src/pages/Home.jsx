import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowRight, Shield, Truck, RotateCcw, Headphones } from 'lucide-react'
import { useApp } from '../context/AppContext'
import ProductCard from '../components/ProductCard'

const banners = [
  {
    id: 1,
    title: 'Get Eyewear at',
    highlight: '₹999',
    subtitle: 'Free Prescription Lenses on all orders',
    cta: 'Shop Now',
    link: '/shop',
    bg: 'from-primary to-blue-900',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&q=80',
  },
  {
    id: 2,
    title: 'Sunglasses',
    highlight: 'Starting ₹1999',
    subtitle: 'UV400 Protection | Polarized Lenses',
    cta: 'Explore',
    link: '/shop/sunglasses',
    bg: 'from-orange-900 to-orange-700',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
  },
  {
    id: 3,
    title: 'Kids Collection',
    highlight: 'From ₹599',
    subtitle: 'Durable & Stylish frames for kids',
    cta: 'Shop Kids',
    link: '/shop/kids',
    bg: 'from-purple-900 to-purple-700',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80',
  },
]

const eyeglassCategories = [
  { label: 'Men', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80', link: '/shop/eyeglasses?gender=men' },
  { label: 'Women', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80', link: '/shop/eyeglasses?gender=women' },
  { label: 'Sports', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&q=80', link: '/shop/eyeglasses?shape=sport' },
  { label: 'Kids', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300&q=80', link: '/shop/kids' },
]

const sunglassCategories = [
  { label: 'Men', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80', link: '/shop/sunglasses?gender=men' },
  { label: 'Women', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80', link: '/shop/sunglasses?gender=women' },
  { label: 'Unisex', image: 'https://images.unsplash.com/photo-1473496169904-658ba7574b0d?w=300&q=80', link: '/shop/sunglasses?gender=unisex' },
]

const features = [
  { icon: Shield, title: '100% Authentic', desc: 'Genuine branded frames' },
  { icon: Truck, title: 'Free Delivery', desc: 'On orders above ₹999' },
  { icon: RotateCcw, title: 'Easy Returns', desc: '14-day hassle-free returns' },
  { icon: Headphones, title: '24/7 Support', desc: 'Expert eye care advice' },
]

export default function Home() {
  const { products } = useApp()
  const [currentBanner, setCurrentBanner] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrentBanner(p => (p + 1) % banners.length), 4000)
    return () => clearInterval(timer)
  }, [])

  const bestsellers = products.filter(p => p.bestseller).slice(0, 8)
  const featured = products.filter(p => p.featured).slice(0, 4)

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative overflow-hidden h-[280px] sm:h-[360px] md:h-[480px]">
        {banners.map((banner, i) => (
          <div key={banner.id}
            className={`absolute inset-0 bg-gradient-to-r ${banner.bg} transition-opacity duration-700 ${i === currentBanner ? 'opacity-100' : 'opacity-0'}`}>
            <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
              <div className="flex-1 text-white z-10 pr-4">
                <p className="text-[10px] sm:text-xs font-medium text-white/70 mb-1 sm:mb-2 uppercase tracking-widest">New Collection 2024</p>
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                  {banner.title}<br />
                  <span className="text-accent">{banner.highlight}</span>
                </h1>
                <p className="text-white/80 mt-2 sm:mt-3 text-xs sm:text-base md:text-lg line-clamp-2">{banner.subtitle}</p>
                <Link to={banner.link}
                  className="inline-flex items-center gap-2 mt-4 sm:mt-6 bg-accent text-white px-5 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors text-sm sm:text-base">
                  {banner.cta} <ArrowRight size={15} />
                </Link>
              </div>
              <div className="hidden md:block flex-1 h-full relative">
                <img src={banner.image} alt={banner.title}
                  className="absolute right-0 bottom-0 h-full w-full object-cover object-center opacity-40 rounded-l-3xl" />
              </div>
            </div>
          </div>
        ))}

        {/* Controls */}
        <button onClick={() => setCurrentBanner(p => (p - 1 + banners.length) % banners.length)}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors">
          <ChevronLeft size={16} />
        </button>
        <button onClick={() => setCurrentBanner(p => (p + 1) % banners.length)}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors">
          <ChevronRight size={16} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {banners.map((_, i) => (
            <button key={i} onClick={() => setCurrentBanner(i)}
              className={`h-1.5 rounded-full transition-all ${i === currentBanner ? 'bg-white w-5' : 'bg-white/40 w-1.5'}`} />
          ))}
        </div>
      </div>

      {/* Features Bar */}
      <div className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <Icon size={15} className="text-primary" />
              </div>
              <div>
                <p className="font-semibold text-xs sm:text-sm text-gray-800">{title}</p>
                <p className="text-[10px] sm:text-xs text-gray-500 hidden sm:block">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Eyeglasses Section */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Eyeglasses</h2>
          <Link to="/shop/eyeglasses" className="text-xs sm:text-sm text-primary font-medium flex items-center gap-1">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          {eyeglassCategories.map(cat => (
            <Link key={cat.label} to={cat.link} className="group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-square card-hover">
              <img src={cat.image} alt={cat.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white font-bold text-sm sm:text-lg">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="bg-gray-50 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Bestsellers</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Most loved by our customers</p>
            </div>
            <Link to="/shop" className="text-xs sm:text-sm text-primary font-medium flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
            {bestsellers.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Offer Banner */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="bg-gradient-to-r from-primary to-blue-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-center sm:text-left">
          <div className="text-white">
            <p className="text-accent font-semibold text-xs uppercase tracking-widest mb-1 sm:mb-2">Limited Time Offer</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">Buy 1 Get 1 Free</h2>
            <p className="text-white/70 mt-1 sm:mt-2 text-sm sm:text-base">On all eyeglasses. Use code: <strong className="text-accent">BOGO</strong></p>
          </div>
          <Link to="/shop/eyeglasses"
            className="bg-accent text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors whitespace-nowrap text-sm sm:text-base">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Sunglasses Section */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 pb-8 sm:pb-12">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Sunglasses</h2>
          <Link to="/shop/sunglasses" className="text-xs sm:text-sm text-primary font-medium flex items-center gap-1">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {sunglassCategories.map(cat => (
            <Link key={cat.label} to={cat.link} className="group relative rounded-xl sm:rounded-2xl overflow-hidden h-32 sm:h-48 card-hover">
              <img src={cat.image} alt={cat.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white font-bold text-sm sm:text-lg">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Featured Collection</h2>
            <Link to="/shop" className="text-xs sm:text-sm text-primary font-medium flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-6 sm:mb-8">What Our Customers Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { name: 'Priya S.', text: 'Amazing quality frames at such affordable prices! The free lens offer is a great deal.', rating: 5 },
            { name: 'Rahul M.', text: 'Ordered sunglasses and they arrived in 2 days. Perfect fit and great UV protection.', rating: 5 },
            { name: 'Anita K.', text: 'Love the variety of frames. The cat-eye glasses I ordered are exactly as shown.', rating: 4 },
          ].map(t => (
            <div key={t.name} className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
              <div className="flex gap-0.5 mb-2 sm:mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-base sm:text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-3 sm:mb-4">"{t.text}"</p>
              <p className="font-semibold text-gray-800 text-sm">— {t.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
