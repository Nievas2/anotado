"use client"

import { Icon } from "@iconify/react/dist/iconify.js"
import { useState } from "react"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <nav className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-semibold text-white">
              Anotado
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Características
            </a>
            <button className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
              Comenzar Gratis
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <Icon icon="mdi:close" className="w-6 h-6 text-white" />
            ) : (
              <Icon icon="mdi:menu" className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800">
          <div className="px-4 py-4 space-y-4">
            <a href="#features" className="block text-slate-300 hover:text-white">
              Características
            </a>
            <a href="#pricing" className="block text-slate-300 hover:text-white">
              Precios
            </a>
            <a href="#testimonials" className="block text-slate-300 hover:text-white">
              Testimonios
            </a>
            <a href="#contact" className="block text-slate-300 hover:text-white">
              Contacto
            </a>
            <button className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800">
              Comenzar Gratis
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
export default Navbar
