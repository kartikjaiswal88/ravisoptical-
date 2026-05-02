import React, { useState, useMemo } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { useApp } from '../context/AppContext'
import ProductCard from '../components/ProductCard'

const shapes = ['All', 'aviator', 'round', 'rectangle', 'square', 'cat-eye', 'wayfarer', 'oversized', 'sport', 'butterfly', 'hexagon']
const priceRanges = [
  { label: 'All', min: 0, max: Infinity },
  { label: 'Under ₹999', min: 0, max: 999 },
  { label: '₹999 - ₹1499', min: 999, max: 1499 },
  { label: '₹1499 - ₹2499', min: 1499, max: 2499 },
  { label: 'Above ₹2499', min: 2499, max: Infinity },
]
const sortOptions = ['Relevance', 'Price: Low to High', 'Price: High to Low', 'Rating', 'Newest']

export default function Shop() {
  const { category } = useParams()
  const [searchParams] = useSearchParams()
  const { products } = useApp()

  const [selectedShape, setSelectedShape] = useState('All')
  const [selectedPrice, setSelectedPrice] = useState(0)
  const [selectedGender, setSelectedGender] = useState('all')
  const [sortBy, setSortBy] = useState('Relevance')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const searchQuery = searchParams.get('search') || ''
  const genderParam = searchParams.get('gender') || ''
  const offerParam = searchParams.get('offer') || ''

  const filtered = useMemo(() => {
    let list = [...products]
    if (category) list = list.filter(p => p.category === category)
    if (genderParam) list = list.filter(p => p.gender === genderParam)
    if (selectedGender !== 'all') list = list.filter(p => p.gender === selectedGender)
    if (selectedShape !== 'All') list = list.filter(p => p.shape === selectedShape)
    if (offerParam) list = list.filter(p => p.originalPrice > p.price)
    if (searchQuery) list = list.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    const range = priceRanges[selectedPrice]
    list = list.filter(p => p.price >= range.min && p.price <= range.max)
    if (sortBy === 'Price: Low to High') list.sort((a, b) => a.price - b.price)
    else if (sortBy === 'Price: High to Low') list.sort((a, b) => b.price - a.price)
    else if (sortBy === 'Rating') list.sort((a, b) => b.rating - a.rating)
    return list
  }, [products, category, genderParam, selectedGender, selectedShape, selectedPrice, sortBy, searchQuery, offerParam])

  const title = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : searchQuery ? `"${searchQuery}"` : 'All Eyewear'

  const FilterPanel = () => (
    <div className="space-y-5">
      <div>
        <h4 className="font-semibold text-gray-800 mb-2.5 text-xs uppercase tracking-wide">Gender</h4>
        <div className="space-y-1.5">
          {['all', 'men', 'women', 'unisex', 'kids'].map(g => (
            <label key={g} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="gender" checked={selectedGender === g} onChange={() => setSelectedGender(g)} className="accent-primary" />
              <span className="text-sm text-gray-600 capitalize">{g === 'all' ? 'All' : g}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-800 mb-2.5 text-xs uppercase tracking-wide">Frame Shape</h4>
        <div className="flex flex-wrap gap-1.5">
          {shapes.map(s => (
            <button key={s} onClick={() => setSelectedShape(s)}
              className={`px-2.5 py-1 rounded-full text-xs border transition-colors capitalize ${selectedShape === s ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-600 hover:border-primary'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-800 mb-2.5 text-xs uppercase tracking-wide">Price Range</h4>
        <div className="space-y-1.5">
          {priceRanges.map((r, i) => (
            <label key={r.label} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="price" checked={selectedPrice === i} onChange={() => setSelectedPrice(i)} className="accent-primary" />
              <span className="text-sm text-gray-600">{r.label}</span>
            </label>
          ))}
        </div>
      </div>

      <button onClick={() => { setSelectedShape('All'); setSelectedPrice(0); setSelectedGender('all') }}
        className="text-sm text-red-500 hover:text-red-700 font-medium">
        Clear All Filters
      </button>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-5 sm:py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">{title}</span>
      </div>

      <div className="flex gap-5 sm:gap-8">
        {/* Desktop Filters */}
        <aside className="hidden md:block w-52 shrink-0">
          <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
            <h3 className="font-bold text-gray-900 mb-4 text-sm sm:text-base">Filters</h3>
            <FilterPanel />
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6 gap-3">
            <div>
              <h1 className="text-base sm:text-xl font-bold text-gray-900">{title}</h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{filtered.length} products</p>
            </div>
            <div className="flex items-center gap-2">
              {/* Mobile filter button */}
              <button onClick={() => setFiltersOpen(true)}
                className="md:hidden flex items-center gap-1.5 border border-gray-200 px-2.5 py-1.5 rounded-lg text-xs font-medium">
                <SlidersHorizontal size={13} /> Filters
              </button>

              {/* Sort */}
              <div className="relative">
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                  className="appearance-none border border-gray-200 rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm pr-6 sm:pr-8 outline-none cursor-pointer bg-white">
                  {sortOptions.map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 sm:py-20">
              <p className="text-gray-400 text-base sm:text-lg">No products found</p>
              <p className="text-gray-300 text-xs sm:text-sm mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setFiltersOpen(false)} />
          <div className="relative ml-auto w-72 bg-white h-full overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-900">Filters</h3>
              <button onClick={() => setFiltersOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
                <X size={18} />
              </button>
            </div>
            <FilterPanel />
          </div>
        </div>
      )}
    </div>
  )
}
