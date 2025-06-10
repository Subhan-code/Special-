import React, { useState } from 'react'
import { Radio } from 'lucide-react'
import CopyButton from '../ui/CopyButton'

const MorseCodeTool: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const morseCode: Record<string, string> = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
    "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
    '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.',
    '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
    ' ': '/'
  }

  const translateMorse = () => {
    const inputText = input.trim().toUpperCase()
    
    if (inputText.includes('.') || inputText.includes('-')) {
      // Morse to Text
      const words = inputText.split('/')
      const translated = words.map(word => {
        return word.trim().split(' ').map(char => {
          return Object.keys(morseCode).find(key => morseCode[key] === char) || char
        }).join('')
      }).join(' ')
      setOutput(translated)
    } else {
      // Text to Morse
      const translated = inputText.split('').map(char => {
        return morseCode[char] || char
      }).join(' ')
      setOutput(translated)
    }
  }

  return (
    <div className="glass-card rounded-2xl p-8 animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-slate-100 rounded-lg">
          <Radio className="w-5 h-5 text-slate-700" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Morse Code Translator</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Input Text or Morse Code
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text or Morse code here... (use / for spaces in Morse)"
            className="textarea-field h-32"
          />
        </div>
        
        <button
          onClick={translateMorse}
          className="btn-primary w-full"
        >
          Convert Morse Code
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
        <h3 className="font-medium text-slate-900 mb-2">How to use:</h3>
        <ul className="text-sm text-slate-600 space-y-1">
          <li>• Enter regular text to convert to Morse code</li>
          <li>• Enter Morse code (dots and dashes) to convert to text</li>
          <li>• Use "/" to separate words in Morse code</li>
          <li>• Spaces between letters are automatically handled</li>
        </ul>
      </div>
    </div>
  )
}

export default MorseCodeTool