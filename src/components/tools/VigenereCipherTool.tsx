import React, { useState } from 'react'
import { Lock } from 'lucide-react'
import ToggleSwitch from '../ui/ToggleSwitch'
import CopyButton from '../ui/CopyButton'

const VigenereCipherTool: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [key, setKey] = useState('')
  const [isDecrypt, setIsDecrypt] = useState(false)

  const vigenere = (text: string, keyText: string, decrypt: boolean = false) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = ''
    let keyIndex = 0

    for (let i = 0; i < text.length; i++) {
      const char = text[i].toUpperCase()
      if (alphabet.includes(char)) {
        const charIndex = alphabet.indexOf(char)
        const keyChar = keyText[keyIndex % keyText.length].toUpperCase()
        const keyCharIndex = alphabet.indexOf(keyChar)
        let newIndex

        if (decrypt) {
          newIndex = (charIndex - keyCharIndex + 26) % 26
        } else {
          newIndex = (charIndex + keyCharIndex) % 26
        }

        result += text[i] === text[i].toUpperCase() ? alphabet[newIndex] : alphabet[newIndex].toLowerCase()
        keyIndex++
      } else {
        result += text[i]
      }
    }

    return result
  }

  const processVigenere = () => {
    if (!key.trim()) {
      setOutput('Please enter a key.')
      return
    }

    const result = vigenere(input, key, isDecrypt)
    setOutput(result)
  }

  return (
    <div className="glass-card rounded-2xl p-8 animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-slate-100 rounded-lg">
          <Lock className="w-5 h-5 text-slate-700" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Vigenère Cipher</h2>
      </div>
      
      <div className="space-y-6">
        <ToggleSwitch
          checked={isDecrypt}
          onChange={setIsDecrypt}
          label={isDecrypt ? 'Decrypt Mode' : 'Encrypt Mode'}
        />
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Encryption Key
          </label>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter your secret key..."
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
          onClick={processVigenere}
          className="btn-primary w-full"
          disabled={!key.trim()}
        >
          {isDecrypt ? 'Decrypt' : 'Encrypt'} Text
        </button>
        
        {output && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Result {key && `(Key: ${key})`}
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
        <h3 className="font-medium text-slate-900 mb-2">About Vigenère Cipher:</h3>
        <p className="text-sm text-slate-600">
          A polyalphabetic substitution cipher that uses a keyword to shift letters by different amounts. 
          Much stronger than Caesar cipher as it resists frequency analysis.
        </p>
      </div>
    </div>
  )
}

export default VigenereCipherTool