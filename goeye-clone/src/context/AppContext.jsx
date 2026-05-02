import React, { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export const useApp = () => useContext(AppContext)

const initialProducts = [
  { id: 1, name: 'Classic Aviator', category: 'eyeglasses', gender: 'men', price: 999, originalPrice: 1999, image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&q=80', rating: 4.5, reviews: 128, shape: 'aviator', color: 'Gold', stock: 15, featured: true, bestseller: true },
  { id: 2, name: 'Round Retro', category: 'eyeglasses', gender: 'women', price: 1299, originalPrice: 2499, image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=400&q=80', rating: 4.3, reviews: 95, shape: 'round', color: 'Black', stock: 10, featured: true, bestseller: false },
  { id: 3, name: 'Sport Shield', category: 'eyeglasses', gender: 'men', price: 1499, originalPrice: 2999, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80', rating: 4.7, reviews: 210, shape: 'sport', color: 'Blue', stock: 8, featured: false, bestseller: true },
  { id: 4, name: 'Cat Eye Glam', category: 'eyeglasses', gender: 'women', price: 899, originalPrice: 1799, image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=400&q=80', rating: 4.6, reviews: 176, shape: 'cat-eye', color: 'Tortoise', stock: 12, featured: true, bestseller: true },
  { id: 5, name: 'Wayfarer Classic', category: 'sunglasses', gender: 'men', price: 1999, originalPrice: 3499, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80', rating: 4.8, reviews: 342, shape: 'wayfarer', color: 'Black', stock: 20, featured: true, bestseller: true },
  { id: 6, name: 'Oversized Chic', category: 'sunglasses', gender: 'women', price: 1799, originalPrice: 3299, image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=400&q=80', rating: 4.4, reviews: 89, shape: 'oversized', color: 'Brown', stock: 7, featured: false, bestseller: false },
  { id: 7, name: 'Slim Rectangle', category: 'eyeglasses', gender: 'men', price: 799, originalPrice: 1599, image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=400&q=80', rating: 4.2, reviews: 67, shape: 'rectangle', color: 'Silver', stock: 18, featured: false, bestseller: false },
  { id: 8, name: 'Butterfly Frame', category: 'eyeglasses', gender: 'women', price: 1099, originalPrice: 2199, image: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=400&q=80', rating: 4.5, reviews: 143, shape: 'butterfly', color: 'Pink', stock: 9, featured: true, bestseller: false },
  { id: 9, name: 'Pilot Sunglasses', category: 'sunglasses', gender: 'unisex', price: 2499, originalPrice: 4499, image: 'https://images.unsplash.com/photo-1473496169904-658ba7574b0d?w=400&q=80', rating: 4.9, reviews: 412, shape: 'aviator', color: 'Gold', stock: 5, featured: true, bestseller: true },
  { id: 10, name: 'Kids Fun Frame', category: 'kids', gender: 'kids', price: 599, originalPrice: 1199, image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&q=80', rating: 4.3, reviews: 55, shape: 'round', color: 'Red', stock: 25, featured: false, bestseller: false },
  { id: 11, name: 'Hexagon Trendy', category: 'eyeglasses', gender: 'unisex', price: 1199, originalPrice: 2399, image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=400&q=80', rating: 4.4, reviews: 78, shape: 'hexagon', color: 'Black', stock: 14, featured: false, bestseller: false },
  { id: 12, name: 'Square Bold', category: 'sunglasses', gender: 'men', price: 1599, originalPrice: 2999, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80', rating: 4.6, reviews: 201, shape: 'square', color: 'Black', stock: 11, featured: true, bestseller: true },
]

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('ravisoptical_products')
    return saved ? JSON.parse(saved) : initialProducts
  })
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('ravisoptical_cart')
    return saved ? JSON.parse(saved) : []
  })
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('ravisoptical_wishlist')
    return saved ? JSON.parse(saved) : []
  })
  const [user, setUser] = useState(null)
  const [adminUser] = useState({ email: 'admin@ravisoptical.in', password: 'admin123' })

  useEffect(() => { localStorage.setItem('ravisoptical_products', JSON.stringify(products)) }, [products])
  useEffect(() => { localStorage.setItem('ravisoptical_cart', JSON.stringify(cart)) }, [cart])
  useEffect(() => { localStorage.setItem('ravisoptical_wishlist', JSON.stringify(wishlist)) }, [wishlist])

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
