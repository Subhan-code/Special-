import React, { useState } from 'react'
import { Globe } from 'lucide-react'
import CopyButton from '../ui/CopyButton'

const UnicodeTool: React.FC = () => {
  const [originalText, setOriginalText] = useState('')
  const [resultText, setResultText] = useState('')

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/ '
  
  const unicodeRanges = [
    [0x0370, 0x03FF], [0x0400, 0x04FF], [0x0500, 0x052F], [0x0530, 0x058F],
    [0x0590, 0x05FF], [0x0600, 0x06FF], [0x0700, 0x074F], [0x0750, 0x077F],
    [0x0780, 0x07BF], [0x0900, 0x097F], [0x0980, 0x09FF], [0x0A00, 0x0A7F],
    [0x0A80, 0x0AFF], [0x0B00, 0x0B7F], [0x0B80, 0x0BFF], [0x0C00, 0x0C7F],
    [0x0C80, 0x0CFF], [0x0D00, 0x0D7F], [0x0D80, 0x0DFF], [0x0E00, 0x0E7F],
    [0x0E80, 0x0EFF], [0x0F00, 0x0FFF], [0x1000, 0x109F], [0x10A0, 0x10FF],
    [0x1100, 0x11FF], [0x1200, 0x137F], [0x13A0, 0x13FF], [0x1400, 0x167F]
  ]

  const getRandomUnicodeChar = () => {
    const rangeIndex = Math.floor(Math.random() * unicodeRanges.length)
    const [start, end] = unicodeRanges[rangeIndex]
    return String.fromCharCode(Math.floor(Math.random() * (end - start + 1) + start))
  }

  const generateKey = () => {
    let key = ''
    for (let i = 0; i < characters.length; i++) {
      key += getRandomUnicodeChar()
    }
    return key
  }

  const encrypt = () => {
    const key = generateKey()
    let encrypted = key + '\n'
    for (let char of originalText) {
      const index = characters.indexOf(char)
      if (index !== -1) {
        encrypted += key[index]
      } else {
        encrypted += char
      }
    }
    setResultText(encrypted)
  }

  const decrypt = () => {
    const lines = originalText.split('\n')
    if (lines.length < 2) {
      setResultText('Invalid encrypted text format')
      return
    }
    
    const key = lines[0]
    const text = lines.slice(1).join('\n')
    let decrypted = ''
    
    for (let char of text) {
      const index = key.indexOf(char)
      if (index !== -1) {
        decrypted += characters[index]
      } else {
        decrypted += char
      }
    }
    setResultText(decrypted)
  }

  return (
    <div className="glass-card rounded-2xl p-8 animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-slate-100 rounded-lg">
          <Globe className="w-5 h-5 text-slate-700" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Unicode Cipher</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Original Text
          </label>
          <textarea
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            placeholder="Enter your text here..."
            className="textarea-field h-32"
          />
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={encrypt}
            className="btn-primary flex-1"
          >
            Encrypt
          </button>
          <button
            onClick={decrypt}
            className="btn-secondary flex-1"
          >
            Decrypt
          </button>
        </div>
        
        {resultText && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Result
            </label>
            <div className="relative">
              <textarea
                value={resultText}
                readOnly
                className="textarea-field h-32 bg-slate-50"
              />
              <div className="absolute top-3 right-3">
                <CopyButton text={resultText} />
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-8 p-4 bg-slate-50 rounded-xl">
        <h3 className="font-medium text-slate-900 mb-2">About Unicode Cipher:</h3>
        <p className="text-sm text-slate-600 mb-2">
          This advanced cipher uses Unicode characters from various language scripts to create 
          a substitution key, making the encrypted text appear as foreign language text.
        </p>
        <div className="text-xs text-slate-500">
          <p><strong>Encryption:</strong> Generates a random Unicode key and maps each character</p>
          <p><strong>Decryption:</strong> Requires the encrypted text with the key on the first line</p>
        </div>
      </div>
    </div>
  )
}

export default UnicodeTool