import React, { useState } from 'react'
import { Binary } from 'lucide-react'
import ToggleSwitch from '../ui/ToggleSwitch'
import CopyButton from '../ui/CopyButton'

const BinaryTool: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [isBinaryToText, setIsBinaryToText] = useState(false)

  const processBinary = () => {
    try {
      if (isBinaryToText) {
        // Binary to Text
        const result = input.split(' ').map(bin => {
          const num = parseInt(bin, 2)
          return isNaN(num) ? '' : String.fromCharCode(num)
        }).join('')
        setOutput(result)
      } else {
        // Text to Binary
        const result = input.split('').map(char => 
          char.charCodeAt(0).toString(2).padStart(8, '0')
        ).join(' ')
        setOutput(result)
      }
    } catch (error) {
      setOutput('Error: Invalid input format')
    }
  }

  return (
    <div className="glass-card rounded-2xl p-8 animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-slate-100 rounded-lg">
          <Binary className="w-5 h-5 text-slate-700" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Binary Converter</h2>
      </div>
      
      <div className="space-y-6">
        <ToggleSwitch
          checked={isBinaryToText}
          onChange={setIsBinaryToText}
          label={isBinaryToText ? 'Binary to Text' : 'Text to Binary'}
        />
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {isBinaryToText ? 'Binary Input' : 'Text Input'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isBinaryToText ? 'Enter binary code (space-separated)...' : 'Enter text to convert...'}
            className="textarea-field h-32"
          />
        </div>
        
        <button
          onClick={processBinary}
          className="btn-primary w-full"
        >
          Convert to {isBinaryToText ? 'Text' : 'Binary'}
        </button>
        
        {output && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Result
            </label>
            <div className="relative">
              <textarea
                value={output}
                readOnly
                className="textarea-field h-32 bg-slate-50 font-mono"
              />
              <div className="absolute top-3 right-3">
                <CopyButton text={output} />
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-8 p-4 bg-slate-50 rounded-xl">
        <h3 className="font-medium text-slate-900 mb-2">About Binary:</h3>
        <p className="text-sm text-slate-600">
          Binary is a base-2 number system using only 0s and 1s. Each character is represented 
          by an 8-bit binary number corresponding to its ASCII value.
        </p>
      </div>
    </div>
  )
}

export default BinaryTool