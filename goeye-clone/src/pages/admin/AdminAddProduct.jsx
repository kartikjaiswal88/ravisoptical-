import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Upload, Check, ArrowLeft } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import AdminLayout from './AdminLayout'

const defaultForm = {
  name: '', category: 'eyeglasses', gender: 'unisex', price: '', originalPrice: '',
  image: '', shape: 'round', color: '', stock: '', featured: false, bestseller: false,
}

export default function AdminAddProduct() {
  const { id } = useParams()
  const { products, addProduct, updateProduct } = useApp()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [form, setForm] = useState(defaultForm)
  const [saved, setSaved] = useState(false)
  const [preview, setPreview] = useState('')

  useEffect(() => {
    if (isEdit) {
      const p = products.find(p => p.id === Number(id))
      if (p) { setForm(p); setPreview(p.image) }
    }
  }, [id, products, isEdit])

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
      set('image', url)
    }
  }

  const handleImageUrl = (url) => {
    set('image', url)
    setPreview(url)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = { ...form, price: Number(form.price), originalPrice: Number(form.originalPrice), stock: Number(form.stock) }
    if (isEdit) updateProduct(Number(id), data)
    else addProduct(data)
    setSaved(true)
    setTimeout(() => navigate('/admin/products'), 1500)
  }

  const textFields = [
    { key: 'name', label: 'Product Name', type: 'text', span: 2 },
    { key: 'price', label: 'Sale Price (₹)', type: 'number' },
    { key: 'originalPrice', label: 'Original Price (₹)', type: 'number' },
    { key: 'color', label: 'Color', type: 'text' },
    { key: 'stock', label: 'Stock Quantity', type: 'number' },
  ]

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-5 sm:mb-6">
          <button onClick={() => navigate('/admin/products')}
            className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors shrink-0">
            <ArrowLeft size={16} />
          </button>
          <div>
            <h2 className="font-bold text-gray-900 text-sm sm:text-base">{isEdit ? 'Edit Product' : 'Add New Product'}</h2>
            <p className="text-xs sm:text-sm text-gray-400">{isEdit ? 'Update product details' : 'Fill in the product information'}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Image Upload */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-6">
            <h3 className="font-semibold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">Product Image</h3>
            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-xl overflow-hidden border-2 border-dashed border-gray-200 flex items-center justify-center shrink-0">
                {preview
                  ? <img src={preview} alt="preview" className="w-full h-full object-cover" />
                  : <Upload size={20} className="text-gray-300" />
                }
              </div>
              <div className="flex-1 space-y-2 sm:space-y-3 min-w-0">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Upload from device</label>
                  <input type="file" accept="image/*" onChange={handleImageChange}
                    className="block w-full text-xs sm:text-sm text-gray-500 file:mr-2 sm:file:mr-3 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-full file:border-0 file:text-xs sm:file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-opacity-90 cursor-pointer" />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Or paste image URL</label>
                  <input type="url" value={form.image} onChange={e => handleImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm outline-none focus:border-primary transition-colors" />
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-6">
            <h3 className="font-semibold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">Product Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {textFields.map(({ key, label, type, span }) => (
                <div key={key} className={span === 2 ? 'sm:col-span-2' : ''}>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input type={type} value={form[key]} onChange={e => set(key, e.target.value)} required
                    className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm outline-none focus:border-primary transition-colors" />
                </div>
              ))}

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Category</label>
                <select value={form.category} onChange={e => set('category', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm outline-none focus:border-primary bg-white">
                  <option value="eyeglasses">Eyeglasses</option>
                  <option value="sunglasses">Sunglasses</option>
                  <option value="kids">Kids</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select value={form.gender} onChange={e => set('gender', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm outline-none focus:border-primary bg-white">
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="unisex">Unisex</option>
                  <option value="kids">Kids</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Frame Shape</label>
                <select value={form.shape} onChange={e => set('shape', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm outline-none focus:border-primary bg-white">
                  {['round', 'rectangle', 'square', 'aviator', 'cat-eye', 'wayfarer', 'oversized', 'sport', 'butterfly', 'hexagon'].map(s => (
                    <option key={s} value={s} className="capitalize">{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Toggles */}
            <div className="flex flex-wrap gap-4 sm:gap-6 mt-4 sm:mt-5">
              {[['featured', 'Featured Product'], ['bestseller', 'Mark as Bestseller']].map(([key, label]) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <div onClick={() => set(key, !form[key])}
                    className={`w-9 h-5 sm:w-10 sm:h-6 rounded-full transition-colors relative cursor-pointer ${form[key] ? 'bg-primary' : 'bg-gray-200'}`}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form[key] ? 'translate-x-4 sm:translate-x-5' : 'translate-x-0.5'}`} />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-2 sm:gap-3">
            <button type="button" onClick={() => navigate('/admin/products')}
              className="px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-200 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit"
              className={`flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition-all text-xs sm:text-sm ${saved ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-opacity-90'}`}>
              {saved ? <><Check size={14} /> Saved!</> : isEdit ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
