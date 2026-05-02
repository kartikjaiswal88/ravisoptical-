import React from 'react'
import { Shield, Eye, Heart, Award } from 'lucide-react'

export default function About() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary to-blue-900 text-white py-20 px-4 text-center">
        <h1 className="text-4xl font-black mb-4">About RavisOptical</h1>
        <p className="text-white/70 max-w-xl mx-auto text-lg">India's trusted destination for premium eyewear since 2018</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At RavisOptical, we believe everyone deserves to see clearly and look great doing it. We bring you the finest eyewear at prices that don't break the bank.
            </p>
            <p className="text-gray-600 leading-relaxed">
              From prescription glasses to stylish sunglasses, every frame in our collection is carefully curated for quality, comfort, and style.
            </p>
          </div>
          <img src="https://picsum.photos/seed/about1/600/400" alt="About" className="rounded-2xl shadow-lg" />
        </div>

        {/* Values */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Shield, title: 'Quality First', desc: 'Every frame passes strict quality checks' },
            { icon: Eye, title: 'Expert Advice', desc: 'Optometrists available for guidance' },
            { icon: Heart, title: 'Customer Love', desc: '50,000+ happy customers' },
            { icon: Award, title: 'Best Prices', desc: 'Guaranteed lowest prices' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon size={22} className="text-primary" />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-primary rounded-3xl p-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {[['50K+', 'Happy Customers'], ['500+', 'Frame Styles'], ['6+', 'Years Experience'], ['4.8★', 'Average Rating']].map(([num, label]) => (
            <div key={label}>
              <p className="text-3xl font-black text-accent">{num}</p>
              <p className="text-white/70 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
