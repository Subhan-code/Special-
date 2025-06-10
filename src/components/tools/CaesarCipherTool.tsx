import React, { useState } from 'react'
import { Shield } from 'lucide-react'
import ToggleSwitch from '../ui/ToggleSwitch'
import CopyButton from '../ui/CopyButton'

const CaesarCipherTool: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [shift, setShift] = useState(3)
  const [isDecrypt, setIsDecrypt] = useState(false)

  const caesarCipher = (text: string, shiftAmount: number, decrypt: boolean = false) => {
    return text.split('').map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0)
        let shiftValue = (decrypt ? -shiftAmount : shiftAmount) % 26
        let shiftedCode = code + shiftValue
        
        if (shiftedCode > (char === char.toUpperCase() ? 90 : 122)) {
          shiftedCode -= 26
        } else if (shiftedCode < (char === char.toUpperCase() ? 65 : 97)) {
          shiftedCode += 26
        }
        
        return String.fromCharCode(shiftedCode)
      }
      return char
    }).join('')
  }

  const processCaesar = () => {
    const result = caesarCipher(input, shift, isDecrypt)
    setOutput(result)
  }

  return (
    <div className="glass-card rounded-2xl p-8 animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-slate-100 rounded-lg">
          <Shield className="w-5 h-5 text-slate-700" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Caesar Cipher</h2>
      </div>
      
      <div className="space-y-6">
        <ToggleSwitch
          checked={isDecrypt}
          onChange={setIsDecrypt}
          label={isDecrypt ? 'Decrypt Mode' : 'Encrypt Mode'}
        />
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Shift Value (0-25)
          </label>
          <input
            type="number"
            value={shift}
            onChange={(e) => setShift(Math.max(0, Math.min(25, parseInt(e.target.value) || 0)))}
            min="0"
            max="25"
            className="input-field"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Input Text
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to encrypt or decrypt..."
            className="textarea-field h-32"
          />
        </div>
        
        <button
          onClick={processCaesar}
          className="btn-primary w-full"
        >
          {isDecrypt ? 'Decrypt' : 'Encrypt'} Text
        </button>
        
        {output && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Result (Shift: {shift})
            </label>
            <div className="relative">
              <textarea
                value={output}
                readOnly
                className="textarea-field h-32 bg-slate-50"
              />
              <div className="absolute top-3 right-3">
                <CopyButton text={output} />
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-8 p-4 bg-slate-50 rounded-xl">
        <h3 className="font-medium text-slate-900 mb-2">About Caesar Cipher:</h3>
        <p className="text-sm text-slate-600">
          A substitution cipher where each letter is shifted by a fixed number of positions in the alphabet. 
          Named after Julius Caesar, who used it for military communications.
        </p>
      </div>
    </div>
  )
}

export default CaesarCipherTool