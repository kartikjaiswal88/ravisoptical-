import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import AdminLayout from './AdminLayout'

export default function AdminProducts() {
  const { products, deleteProduct } = useApp()
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('all')
  const [confirmDelete, setConfirmDelete] = useState(null)

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchCat = filterCat === 'all' || p.category === filterCat
    return matchSearch && matchCat
  })

  const handleDelete = (id) => {
    deleteProduct(id)
    setConfirmDelete(null)
  }

  return (
    <AdminLayout>
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-gray-900 text-sm sm:text-base">Products</h2>
            <p className="text-xs sm:text-sm text-gray-400">{products.length} total</p>
          </div>
          <Link to="/admin/products/add"
            className="flex items-center gap-1.5 bg-primary text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-opacity-90 transition-colors">
            <Plus size={14} /> Add Product
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-3 sm:p-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="flex items-center gap-2 flex-1 border border-gray-200 rounded-xl px-3 py-2">
            <Search size={14} className="text-gray-400 shrink-0" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
              className="flex-1 text-xs sm:text-sm outline-none min-w-0" />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-gray-400 shrink-0" />
            <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-xs sm:text-sm outline-none bg-white flex-1 sm:flex-none">
              <option value="all">All Categories</option>
              <option value="eyeglasses">Eyeglasses</option>
              <option value="sunglasses">Sunglasses</option>
              <option value="kids">Kids</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm min-w-[560px]">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Product', 'Category', 'Price', 'Stock', 'Featured', 'Actions'].map(h => (
                    <th key={h} className="text-left px-3 sm:px-5 py-3 sm:py-4 text-gray-500 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-3 sm:px-5 py-3 sm:py-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <img src={p.image} alt={p.name} className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl object-cover bg-gray-100 shrink-0" />
                        <div className="min-w-0">
                          <p className="font-medium text-gray-800 truncate max-w-[100px] sm:max-w-[160px]">{p.name}</p>
                          <p className="text-[10px] sm:text-xs text-gray-400 capitalize hidden sm:block">{p.shape} • {p.color}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-5 py-3 sm:py-4 capitalize text-gray-500">{p.category}</td>
                    <td className="px-3 sm:px-5 py-3 sm:py-4">
                      <p className="font-semibold text-gray-800">₹{p.price.toLocaleString()}</p>
                      <p className="text-[10px] sm:text-xs text-gray-400 line-through hidden sm:block">₹{p.originalPrice.toLocaleString()}</p>
                    </td>
                    <td className="px-3 sm:px-5 py-3 sm:py-4">
                      <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${p.stock > 10 ? 'bg-green-100 text-green-700' : p.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {p.stock > 0 ? `${p.stock}` : 'Out'}
                      </span>
                    </td>
                    <td className="px-3 sm:px-5 py-3 sm:py-4">
                      <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${p.featured ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                        {p.featured ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-3 sm:px-5 py-3 sm:py-4">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Link to={`/admin/products/edit/${p.id}`}
                          className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors">
                          <Edit2 size={12} />
                        </Link>
                        <button onClick={() => setConfirmDelete(p.id)}
                          className="w-7 h-7 sm:w-8 sm:h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100 transition-colors">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-10 sm:py-12 text-gray-400 text-sm">No products found</div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirm Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Delete Product?</h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-5">This action cannot be undone.</p>
            <div className="flex gap-2 sm:gap-3">
              <button onClick={() => setConfirmDelete(null)}
                className="flex-1 border border-gray-200 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={() => handleDelete(confirmDelete)}
                className="flex-1 bg-red-500 text-white py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium hover:bg-red-600 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
