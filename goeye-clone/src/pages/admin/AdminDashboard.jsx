import React from 'react'
import { Link } from 'react-router-dom'
import { Package, ShoppingBag, TrendingUp, DollarSign, ArrowRight } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import AdminLayout from './AdminLayout'

export default function AdminDashboard() {
  const { products } = useApp()

  const stats = [
    { label: 'Total Products', value: products.length, icon: Package, color: 'bg-blue-50 text-blue-600', change: '+3 this week' },
    { label: 'Total Orders', value: 142, icon: ShoppingBag, color: 'bg-green-50 text-green-600', change: '+12 today' },
    { label: 'Revenue', value: '₹2.8L', icon: DollarSign, color: 'bg-orange-50 text-orange-600', change: '+8% this month' },
    { label: 'Bestsellers', value: products.filter(p => p.bestseller).length, icon: TrendingUp, color: 'bg-purple-50 text-purple-600', change: 'Active' },
  ]

  const recentProducts = products.slice(-5).reverse()

  return (
    <AdminLayout>
      <div className="space-y-4 sm:space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map(({ label, value, icon: Icon, color, change }) => (
            <div key={label} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-gray-100">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 ${color}`}>
                <Icon size={17} />
              </div>
              <p className="text-xl sm:text-2xl font-black text-gray-900">{value}</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5 leading-tight">{label}</p>
              <p className="text-xs text-green-600 mt-1">{change}</p>
            </div>
          ))}
        </div>

        {/* Recent Products */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h2 className="font-bold text-gray-900 text-sm sm:text-base">Recent Products</h2>
            <Link to="/admin/products" className="text-xs sm:text-sm text-primary flex items-center gap-1">
              View All <ArrowRight size={13} />
            </Link>
          </div>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full text-xs sm:text-sm min-w-[480px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2.5 px-4 sm:px-0 text-gray-500 font-medium">Product</th>
                  <th className="text-left py-2.5 px-2 text-gray-500 font-medium">Category</th>
                  <th className="text-left py-2.5 px-2 text-gray-500 font-medium">Price</th>
                  <th className="text-left py-2.5 px-2 text-gray-500 font-medium">Stock</th>
                  <th className="text-left py-2.5 px-2 sm:px-0 text-gray-500 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentProducts.map(p => (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 sm:px-0">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <img src={p.image} alt={p.name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover bg-gray-100 shrink-0" />
                        <span className="font-medium text-gray-800 truncate max-w-[100px] sm:max-w-none">{p.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 capitalize text-gray-500">{p.category}</td>
                    <td className="py-3 px-2 font-semibold text-gray-800">₹{p.price.toLocaleString()}</td>
                    <td className="py-3 px-2 text-gray-500">{p.stock}</td>
                    <td className="py-3 px-2 sm:px-0">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${p.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {p.stock > 0 ? 'In Stock' : 'Out'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
