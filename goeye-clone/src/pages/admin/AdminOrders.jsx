import React, { useState } from 'react'
import { Search, Eye, X } from 'lucide-react'
import AdminLayout from './AdminLayout'

const mockOrders = [
  { id: 'ORD-001', customer: 'Priya Sharma', email: 'priya@example.com', items: 2, total: 2998, status: 'delivered', date: '2024-03-10', products: ['Classic Aviator', 'Round Retro'] },
  { id: 'ORD-002', customer: 'Rahul Mehta', email: 'rahul@example.com', items: 1, total: 1999, status: 'shipped', date: '2024-03-11', products: ['Wayfarer Classic'] },
  { id: 'ORD-003', customer: 'Anita Kumar', email: 'anita@example.com', items: 3, total: 4297, status: 'processing', date: '2024-03-12', products: ['Cat Eye Glam', 'Pilot Sunglasses', 'Kids Fun Frame'] },
  { id: 'ORD-004', customer: 'Vikram Singh', email: 'vikram@example.com', items: 1, total: 1299, status: 'pending', date: '2024-03-13', products: ['Round Retro'] },
  { id: 'ORD-005', customer: 'Sneha Patel', email: 'sneha@example.com', items: 2, total: 3498, status: 'delivered', date: '2024-03-14', products: ['Butterfly Frame', 'Oversized Chic'] },
  { id: 'ORD-006', customer: 'Arjun Nair', email: 'arjun@example.com', items: 1, total: 2499, status: 'cancelled', date: '2024-03-15', products: ['Pilot Sunglasses'] },
]

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function AdminOrders() {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState(null)

  const filtered = mockOrders.filter(o => {
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || o.status === filterStatus
    return matchSearch && matchStatus
  })

  return (
    <AdminLayout>
      <div className="space-y-4 sm:space-y-5">
        <div>
          <h2 className="font-bold text-gray-900 text-sm sm:text-base">Orders</h2>
          <p className="text-xs sm:text-sm text-gray-400">{mockOrders.length} total orders</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-3 sm:p-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="flex items-center gap-2 flex-1 border border-gray-200 rounded-xl px-3 py-2">
            <Search size={14} className="text-gray-400 shrink-0" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search orders..."
              className="flex-1 text-xs sm:text-sm outline-none min-w-0" />
          </div>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-2 text-xs sm:text-sm outline-none bg-white">
            <option value="all">All Status</option>
            {Object.keys(statusColors).map(s => (
              <option key={s} value={s} className="capitalize">{s}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm min-w-[520px]">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Order ID', 'Customer', 'Items', 'Total', 'Status', 'Date', ''].map((h, i) => (
                    <th key={i} className="text-left px-3 sm:px-5 py-3 sm:py-4 text-gray-500 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(o => (
                  <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-3 sm:px-5 py-3 sm:py-4 font-mono text-[10px] sm:text-xs text-gray-600">{o.id}</td>
                    <td className="px-3 sm:px-5 py-3 sm:py-4">
                      <p className="font-medium text-gray-800 truncate max-w-[100px] sm:max-w-none">{o.customer}</p>
                      <p className="text-[10px] sm:text-xs text-gray-400 hidden sm:block">{o.email}</p>
                    </td>
                    <td className="px-3 sm:px-5 py-3 sm:py-4 text-gray-500">{o.items}</td>
                    <td className="px-3 sm:px-5 py-3 sm:py-4 font-semibold text-gray-800">₹{o.total.toLocaleString()}</td>
                    <td className="px-3 sm:px-5 py-3 sm:py-4">
                      <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium capitalize ${statusColors[o.status]}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="px-3 sm:px-5 py-3 sm:py-4 text-gray-500 whitespace-nowrap">{o.date}</td>
                    <td className="px-3 sm:px-5 py-3 sm:py-4">
                      <button onClick={() => setSelectedOrder(o)}
                        className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
                        <Eye size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-sm w-full shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 text-sm sm:text-base">{selectedOrder.id}</h3>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[selectedOrder.status]}`}>
                  {selectedOrder.status}
                </span>
                <button onClick={() => setSelectedOrder(null)} className="p-1 hover:bg-gray-100 rounded-full">
                  <X size={16} />
                </button>
              </div>
            </div>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Customer</span>
                <span className="font-medium text-gray-800">{selectedOrder.customer}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Email</span>
                <span className="truncate ml-4">{selectedOrder.email}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Date</span>
                <span>{selectedOrder.date}</span>
              </div>
              <div className="border-t border-gray-100 pt-2.5">
                <p className="font-medium text-gray-700 mb-1.5">Products</p>
                {selectedOrder.products.map(p => (
                  <p key={p} className="text-gray-500 text-xs py-0.5">• {p}</p>
                ))}
              </div>
              <div className="flex justify-between font-bold text-gray-900 text-sm sm:text-base border-t border-gray-100 pt-2.5">
                <span>Total</span>
                <span>₹{selectedOrder.total.toLocaleString()}</span>
              </div>
            </div>
            <button onClick={() => setSelectedOrder(null)}
              className="w-full mt-4 border border-gray-200 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors">
              Close
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
