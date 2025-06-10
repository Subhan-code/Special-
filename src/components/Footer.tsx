import React from 'react'
import { Heart, Code, Shield } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 text-center">
      <div className="glass-card rounded-2xl p-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-slate-600">Made with</span>
          <Heart className="w-4 h-4 text-red-500 fill-current" />
          <span className="text-slate-600">for secure communication</span>
        </div>
        
        <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            <span>Open Source</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>Privacy First</span>
          </div>
        </div>
        
        <p className="mt-4 text-xs text-slate-400">
          Educational purposes only. Use responsibly and in accordance with local laws.
        </p>
      </div>
    </footer>
  )
}

export default Footer