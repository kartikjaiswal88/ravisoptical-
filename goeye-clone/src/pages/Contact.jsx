import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
        <p className="text-gray-500">We're here to help. Reach out anytime.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Info */}
        <div className="space-y-6">
          {[
            { icon: Phone, title: 'Phone', info: '+91 99999 99999', sub: 'Mon-Sat, 9am-6pm' },
            { icon: Mail, title: 'Email', info: 'support@ravisoptical.in', sub: 'We reply within 24 hours' },
            { icon: MapPin, title: 'Address', info: '123 Optical Street', sub: 'Mumbai, Maharashtra 400001' },
          ].map(({ icon: Icon, title, info, sub }) => (
            <div key={title} className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <Icon size={18} className="text-primary" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{title}</p>
                <p className="text-sm text-gray-600">{info}</p>
                <p className="text-xs text-gray-400">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="md:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[['name', 'Your Name', 'text'], ['email', 'Email Address', 'email']].map(([key, label, type]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} required
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors" />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input type="text" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} required
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors resize-none" />
          </div>
          <button type="submit"
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all ${sent ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-opacity-90'}`}>
            {sent ? <><Check size={16} /> Sent!</> : <><Send size={16} /> Send Message</>}
          </button>
        </form>
      </div>
    </div>
  )
}
