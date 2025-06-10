import React from 'react'
import { Shield, Github, Star } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <header className="text-center animate-fade-in">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl shadow-lg">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
          Cipher Toolkit
        </h1>
      </div>
      
      <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
        A comprehensive cryptography and steganography suite for secure communication and educational purposes
      </p>
      
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/20">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm font-medium text-slate-700">Professional Grade</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/20">
          <Github className="w-4 h-4 text-slate-600" />
          <span className="text-sm font-medium text-slate-700">Open Source</span>
        </div>
      </div>
    </header>
  )
}

export default Header