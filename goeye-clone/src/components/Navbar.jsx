import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingCart, Heart, Menu, X, ChevronDown, User } from 'lucide-react'
import { useApp } from '../context/AppContext'

const categories = [
  { label: 'Eyeglasses', path: '/shop/eyeglasses', sub: ['Men', 'Women', 'Kids', 'Sports'] },
  { label: 'Sunglasses', path: '/shop/sunglasses', sub: ['Men', 'Women', 'Unisex'] },
  { label: 'Kids', path: '/shop/kids', sub: [] },
  { label: 'Offers', path: '/shop?offer=true', sub: [] },
]

export default function Navbar() {
  const { cartCount, wishlist } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [announcementVisible, setAnnouncementVisible] = useState(true)
  const navigate = useNavigate()
  const searchRef = useRef()

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  // Close menu on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setMenuOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <>
      {/* Announcement Bar */}
      {announcementVisible && (
        <div className="bg-primary text-white text-center text-xs py-2 px-8 relative leading-5">
          <span className="hidden sm:inline">🎉 Free Prescription Lenses on all orders above ₹999 | Use code: <strong>FREELENS</strong></span>
          <span className="sm:hidden">🎉 Free Lenses above ₹999 | Code: <strong>FREELENS</strong></span>
          <button onClick={() => setAnnouncementVisible(false)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1">
            <X size={12} />
          </button>
        </div>
      )}

      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <div className="bg-primary text-white font-black text-lg sm:text-xl px-2.5 sm:px-3 py-1 rounded-lg tracking-wider">
              Ravis<span className="text-accent">Optical</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            {categories.map(cat => (
              <div key={cat.label} className="relative"
                onMouseEnter={() => setActiveDropdown(cat.label)}
                onMouseLeave={() => setActiveDropdown(null)}>
                <Link to={cat.path} className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-primary transition-colors py-5">
                  {cat.label}
                  {cat.sub.length > 0 && <ChevronDown size={13} />}
                </Link>
                {cat.sub.length > 0 && activeDropdown === cat.label && (
                  <div className="absolute top-full left-0 bg-white shadow-xl rounded-lg py-2 min-w-[150px] border border-gray-100 z-50">
                    {cat.sub.map(s => (
                      <Link key={s} to={`${cat.path}?gender=${s.toLowerCase()}`}
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors">
                        {s}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Desktop Search */}
            {searchOpen ? (
              <form onSubmit={handleSearch} className="hidden md:flex items-center border border-gray-300 rounded-full overflow-hidden">
                <input ref={searchRef} value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search eyewear..." className="px-3 py-1.5 text-sm outline-none w-36 lg:w-48" />
                <button type="submit" className="px-3 py-1.5 bg-primary text-white">
                  <Search size={15} />
                </button>
                <button type="button" onClick={() => setSearchOpen(false)} className="px-2 text-gray-500">
                  <X size={15} />
                </button>
              </form>
            ) : (
              <button onClick={() => setSearchOpen(true)} className="hidden md:flex p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Search size={19} className="text-gray-700" />
              </button>
            )}

            {/* Mobile search icon */}
            <button onClick={() => setMenuOpen(true)} className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search size={19} className="text-gray-700" />
            </button>

            <Link to="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Heart size={19} className="text-gray-700" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{wishlist.length}</span>
              )}
            </Link>

            <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ShoppingCart size={19} className="text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>
              )}
            </Link>

            <Link to="/admin/login" className="hidden md:flex p-2 hover:bg-gray-100 rounded-full transition-colors">
              <User size={19} className="text-gray-500" />
            </Link>

            {/* Mobile hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors">
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {menuOpen && (
          <>
            <div className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={() => setMenuOpen(false)} />
            <div className="fixed top-0 left-0 h-full w-72 bg-white z-50 md:hidden shadow-2xl flex flex-col overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
                <div className="bg-primary text-white font-black text-lg px-2.5 py-1 rounded-lg tracking-wider">
                  Ravis<span className="text-accent">Optical</span>
                </div>
                <button onClick={() => setMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X size={20} />
                </button>
              </div>

              {/* Search */}
              <div className="px-4 py-3 border-b border-gray-100">
                <form onSubmit={handleSearch} className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search eyewear..." className="px-3 py-2.5 text-sm outline-none flex-1" />
                  <button type="submit" className="px-3 py-2.5 bg-primary text-white"><Search size={15} /></button>
                </form>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 px-4 py-3">
                {categories.map(cat => (
                  <div key={cat.label} className="mb-1">
                    <Link to={cat.path} onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between font-semibold text-gray-800 py-3 border-b border-gray-50 text-sm">
                      {cat.label}
                    </Link>
                    {cat.sub.map(s => (
                      <Link key={s} to={`${cat.path}?gender=${s.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                        className="block text-sm text-gray-500 py-2 pl-3 hover:text-primary transition-colors">{s}</Link>
                    ))}
                  </div>
                ))}
                <Link to="/about" onClick={() => setMenuOpen(false)} className="block font-semibold text-gray-800 py-3 border-b border-gray-50 text-sm">About</Link>
                <Link to="/contact" onClick={() => setMenuOpen(false)} className="block font-semibold text-gray-800 py-3 text-sm">Contact</Link>
              </nav>

              <div className="px-4 py-4 border-t border-gray-100">
                <Link to="/admin/login" onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors">
                  <User size={16} /> Admin Panel
                </Link>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  )
}
