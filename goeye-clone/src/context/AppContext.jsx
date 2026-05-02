import React, { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export const useApp = () => useContext(AppContext)

const initialProducts = [
  { id: 1, name: 'Classic Aviator', category: 'eyeglasses', gender: 'men', price: 999, originalPrice: 1999, image: 'https://picsum.photos/seed/aviator1/400/400', rating: 4.5, reviews: 128, shape: 'aviator', color: 'Gold', stock: 15, featured: true, bestseller: true },
  { id: 2, name: 'Round Retro', category: 'eyeglasses', gender: 'women', price: 1299, originalPrice: 2499, image: 'https://picsum.photos/seed/round2/400/400', rating: 4.3, reviews: 95, shape: 'round', color: 'Black', stock: 10, featured: true, bestseller: false },
  { id: 3, name: 'Sport Shield', category: 'eyeglasses', gender: 'men', price: 1499, originalPrice: 2999, image: 'https://picsum.photos/seed/sport3/400/400', rating: 4.7, reviews: 210, shape: 'sport', color: 'Blue', stock: 8, featured: false, bestseller: true },
  { id: 4, name: 'Cat Eye Glam', category: 'eyeglasses', gender: 'women', price: 899, originalPrice: 1799, image: 'https://picsum.photos/seed/cateye4/400/400', rating: 4.6, reviews: 176, shape: 'cat-eye', color: 'Tortoise', stock: 12, featured: true, bestseller: true },
  { id: 5, name: 'Wayfarer Classic', category: 'sunglasses', gender: 'men', price: 1999, originalPrice: 3499, image: 'https://picsum.photos/seed/wayfarer5/400/400', rating: 4.8, reviews: 342, shape: 'wayfarer', color: 'Black', stock: 20, featured: true, bestseller: true },
  { id: 6, name: 'Oversized Chic', category: 'sunglasses', gender: 'women', price: 1799, originalPrice: 3299, image: 'https://picsum.photos/seed/oversized6/400/400', rating: 4.4, reviews: 89, shape: 'oversized', color: 'Brown', stock: 7, featured: false, bestseller: false },
  { id: 7, name: 'Slim Rectangle', category: 'eyeglasses', gender: 'men', price: 799, originalPrice: 1599, image: 'https://picsum.photos/seed/slim7/400/400', rating: 4.2, reviews: 67, shape: 'rectangle', color: 'Silver', stock: 18, featured: false, bestseller: false },
  { id: 8, name: 'Butterfly Frame', category: 'eyeglasses', gender: 'women', price: 1099, originalPrice: 2199, image: 'https://picsum.photos/seed/butterfly8/400/400', rating: 4.5, reviews: 143, shape: 'butterfly', color: 'Pink', stock: 9, featured: true, bestseller: false },
  { id: 9, name: 'Pilot Sunglasses', category: 'sunglasses', gender: 'unisex', price: 2499, originalPrice: 4499, image: 'https://picsum.photos/seed/pilot9/400/400', rating: 4.9, reviews: 412, shape: 'aviator', color: 'Gold', stock: 5, featured: true, bestseller: true },
  { id: 10, name: 'Kids Fun Frame', category: 'kids', gender: 'kids', price: 599, originalPrice: 1199, image: 'https://picsum.photos/seed/kids10/400/400', rating: 4.3, reviews: 55, shape: 'round', color: 'Red', stock: 25, featured: false, bestseller: false },
  { id: 11, name: 'Hexagon Trendy', category: 'eyeglasses', gender: 'unisex', price: 1199, originalPrice: 2399, image: 'https://picsum.photos/seed/hex11/400/400', rating: 4.4, reviews: 78, shape: 'hexagon', color: 'Black', stock: 14, featured: false, bestseller: false },
  { id: 12, name: 'Square Bold', category: 'sunglasses', gender: 'men', price: 1599, originalPrice: 2999, image: 'https://picsum.photos/seed/square12/400/400', rating: 4.6, reviews: 201, shape: 'square', color: 'Black', stock: 11, featured: true, bestseller: true },
]

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('ravisoptical_products_v2')
    return saved ? JSON.parse(saved) : initialProducts
  })
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('ravisoptical_cart_v2')
    return saved ? JSON.parse(saved) : []
  })
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('ravisoptical_wishlist_v2')
    return saved ? JSON.parse(saved) : []
  })
  const [user, setUser] = useState(null)
  const [adminUser] = useState({ email: 'admin@ravisoptical.in', password: 'admin123' })

  useEffect(() => { localStorage.setItem('ravisoptical_products_v2', JSON.stringify(products)) }, [products])
  useEffect(() => { localStorage.setItem('ravisoptical_cart_v2', JSON.stringify(cart)) }, [cart])
  useEffect(() => { localStorage.setItem('ravisoptical_wishlist_v2', JSON.stringify(wishlist)) }, [wishlist])

  const addToCart = (product, qty = 1, lensOption = 'Without Lens') => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id && i.lensOption === lensOption)
      if (existing) return prev.map(i => i.id === product.id && i.lensOption === lensOption ? { ...i, qty: i.qty + qty } : i)
      return [...prev, { ...product, qty, lensOption }]
    })
  }

  const removeFromCart = (id, lensOption) => setCart(prev => prev.filter(i => !(i.id === id && i.lensOption === lensOption)))

  const updateCartQty = (id, lensOption, qty) => {
    if (qty < 1) return removeFromCart(id, lensOption)
    setCart(prev => prev.map(i => i.id === id && i.lensOption === lensOption ? { ...i, qty } : i))
  }

  const clearCart = () => setCart([])

  const toggleWishlist = (product) => {
    setWishlist(prev => prev.find(i => i.id === product.id) ? prev.filter(i => i.id !== product.id) : [...prev, product])
  }

  const isInWishlist = (id) => wishlist.some(i => i.id === id)

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0)

  const addProduct = (product) => {
    const newProduct = { ...product, id: Date.now(), rating: 0, reviews: 0 }
    setProducts(prev => [...prev, newProduct])
  }

  const updateProduct = (id, data) => setProducts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p))

  const deleteProduct = (id) => setProducts(prev => prev.filter(p => p.id !== id))

  const loginAdmin = (email, password) => {
    if (email === adminUser.email && password === adminUser.password) {
      setUser({ email, role: 'admin' })
      return true
    }
    return false
  }

  const logout = () => setUser(null)

  return (
    <AppContext.Provider value={{
      products, cart, wishlist, user, cartCount, cartTotal,
      addToCart, removeFromCart, updateCartQty, clearCart,
      toggleWishlist, isInWishlist,
      addProduct, updateProduct, deleteProduct,
      loginAdmin, logout
    }}>
      {children}
    </AppContext.Provider>
  )
}
