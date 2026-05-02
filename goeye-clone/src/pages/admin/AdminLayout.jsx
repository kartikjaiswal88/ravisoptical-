import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingBag, LogOut, Menu, X, Plus } from 'lucide-react'
import { useApp } from '../../context/AppContext'

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Products', path: '/admin/products', icon: Package },
  { label: 'Orders', path: '/admin/orders', icon: ShoppingBag },
]

export default function AdminLayout({ children }) {
  const { logout, user } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => { logout(); navigate('/admin/login') }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-5 sm:p-6 border-b border-white/10">
        <div className="bg-white text-primary font-black text-lg px-3 py-1 rounded-lg tracking-wider inline-block">
          Ravis<span className="text-accent">Optical</span>
        </div>
        <p className="text-white/50 text-xs mt-1.5">Admin Panel</p>
      </div>
      <nav className="flex-1 p-3 sm:p-4 space-y-1">
        {navItems.map(({ label, path, icon: Icon }) => (
          <Link key={path} to={path} onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-sm font-medium transition-colors ${location.pathname === path ? 'bg-white/20 text-white' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}>
            <Icon size={17} />
            {label}
          </Link>
        ))}
      </nav>
      <div className="p-3 sm:p-4 border-t border-white/10">
        <p className="text-white/40 text-xs mb-2 px-3 truncate">{user?.email}</p>
        <button onClick={handleLogout}
          className="flex items-center gap-3 px-3 sm:px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-colors w-full">
          <LogOut size={17} /> Logout
        </button>
      </div>
    </div>
  )

  const currentLabel = navItems.find(n => n.path === location.pathname)?.label || 'Admin'

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-56 bg-primary flex-col shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-56 bg-primary flex flex-col shadow-2xl">
            <button onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white p-1">
              <X size={18} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              <Menu size={20} />
            </button>
            <h1 className="font-bold text-gray-900 text-sm sm:text-base">{currentLabel}</h1>
          </div>
          <Link to="/admin/products/add"
            className="flex items-center gap-1.5 bg-primary text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-opacity-90 transition-colors">
            <Plus size={14} />
            <span className="hidden xs:inline">Add Product</span>
            <span className="xs:hidden">Add</span>
          </Link>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
