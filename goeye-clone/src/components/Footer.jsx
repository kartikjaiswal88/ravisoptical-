import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-12 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-12 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="bg-white text-primary font-black text-lg sm:text-xl px-3 py-1 rounded-lg tracking-wider inline-block mb-3 sm:mb-4">
            Ravis<span className="text-accent">Optical</span>
          </div>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
            India's premium destination for stylish eyewear. Quality frames, prescription lenses, and sunglasses delivered to your door.
          </p>
          <div className="flex gap-2 sm:gap-3">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#"
                className="w-7 h-7 sm:w-8 sm:h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-3 sm:mb-4 text-white text-sm sm:text-base">Quick Links</h4>
          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-300">
            {[['Home', '/'], ['Eyeglasses', '/shop/eyeglasses'], ['Sunglasses', '/shop/sunglasses'], ['Kids', '/shop/kids'], ['Offers', '/shop?offer=true'], ['About Us', '/about']].map(([label, path]) => (
              <li key={label}>
                <Link to={path} className="hover:text-accent transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="font-semibold mb-3 sm:mb-4 text-white text-sm sm:text-base">Help & Support</h4>
          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-300">
            {[['Frame Guide', '#'], ['Lens Guide', '#'], ['How to Order', '#'], ['Return Policy', '#'], ['Track Order', '#'], ['FAQ', '#']].map(([label, path]) => (
              <li key={label}>
                <a href={path} className="hover:text-accent transition-colors">{label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-2 md:col-span-1">
          <h4 className="font-semibold mb-3 sm:mb-4 text-white text-sm sm:text-base">Contact Us</h4>
          <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 shrink-0 text-accent" />
              <span>123 Optical Street, Mumbai, Maharashtra 400001</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-accent shrink-0" />
              <a href="tel:+919999999999" className="hover:text-accent">+91 99999 99999</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-accent shrink-0" />
              <a href="mailto:support@ravisoptical.in" className="hover:text-accent break-all">support@ravisoptical.in</a>
            </li>
          </ul>
          <div className="mt-3 sm:mt-4">
            <p className="text-xs text-gray-400 mb-1.5">Subscribe for offers</p>
            <form className="flex">
              <input type="email" placeholder="Your email"
                className="flex-1 px-3 py-2 text-xs sm:text-sm bg-white/10 border border-white/20 rounded-l-full outline-none text-white placeholder-gray-400 min-w-0" />
              <button className="px-3 sm:px-4 py-2 bg-accent text-white text-xs sm:text-sm rounded-r-full hover:bg-orange-600 transition-colors">Go</button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-3 sm:py-4 text-center text-[10px] sm:text-xs text-gray-400 px-4">
        <p>© 2024 RavisOptical. All rights reserved. |{' '}
          <a href="#" className="hover:text-accent">Privacy Policy</a> |{' '}
          <a href="#" className="hover:text-accent">Terms of Service</a>
        </p>
      </div>
    </footer>
  )
}
