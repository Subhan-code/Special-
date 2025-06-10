import React, { useState } from 'react'
import { MessageSquare } from 'lucide-react'
import CopyButton from '../ui/CopyButton'

const ConversationTool: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [debugInfo, setDebugInfo] = useState('')

  const words = [
    "Did", "you", "eat", "yet?", 
    "Let's", "go", "to", "a", "movie.", 
    "Not", "everything", "that", "shines", "is", "great.", 
    "Actions", "speak", "louder", "than", "words.", 
    "Time", "flies", "Hangout", "fast!"
  ]

  const debug = (message: string) => {
    setDebugInfo(prev => prev + message + '\n')
  }

  const encrypt = () => {
    setDebugInfo('')
    debug('Encrypting: ' + input)
    let encrypted = ''
    
    for (let i = 0; i < input.length; i++) {
      const charCode = input.charCodeAt(i)
      const shift = Math.floor(Math.random() * words.length)
      const shiftedCode = (charCode + shift) % 256
      const firstIndex = Math.floor(shiftedCode / words.length)
      const secondIndex = shiftedCode % words.length
      const thirdIndex = shift
      encrypted += words[firstIndex] + ' ' + words[secondIndex] + ' ' + words[thirdIndex] + ' '
      debug(`Char: ${input[i]}, CharCode: ${charCode}, Shift: ${shift}, ShiftedCode: ${shiftedCode}, Words: ${words[firstIndex]} ${words[secondIndex]} ${words[thirdIndex]}`)
    }
    
    setOutput(encrypted.trim())
    debug('Encrypted result: ' + encrypted.trim())
  }

  const decrypt = () => {
    setDebugInfo('')
    debug('Decrypting: ' + input)
    const encryptedWords = input.split(' ')
    let decrypted = ''
    
    for (let i = 0; i < encryptedWords.length; i += 3) {
      const firstIndex = words.indexOf(encryptedWords[i])
      const secondIndex = words.indexOf(encryptedWords[i + 1])
      const shift = words.indexOf(encryptedWords[i + 2])
      
      if (firstIndex === -1 || secondIndex === -1 || shift === -1) {
        debug(`Error: Word not found in list: ${encryptedWords[i]} or ${encryptedWords[i + 1]} or ${encryptedWords[i + 2]}`)
        setOutput('Error: Invalid encrypted text')
        return
      }
      
      let charCode = (firstIndex * words.length + secondIndex - shift + 256) % 256
      decrypted += String.fromCharCode(charCode)
      debug(`Words: ${encryptedWords[i]} ${encryptedWords[i + 1]} ${encryptedWords[i + 2]}, Shift: ${shift}, CharCode: ${charCode}, Char: ${String.fromCharCode(charCode)}`)
    }
    
    setOutput(decrypted)
    debug('Decrypted result: ' + decrypted)
  }

  return (
    <div className="glass-card rounded-2xl p-8 animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-slate-100 rounded-lg">
          <MessageSquare className="w-5 h-5 text-slate-700" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Daily Conversation Cipher</h2>
      </div>
      
      <div className="space-y-6">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={encrypt}
            className="btn-primary"
          >
            Encrypt
          </button>
          <button
            onClick={decrypt}
            className="btn-secondary"
          >
            Decrypt
          </button>
        </div>
        
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
        
        {debugInfo && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Debug Information
            </label>
            <pre className="p-4 bg-slate-900 text-green-400 rounded-xl text-xs overflow-auto max-h-40 font-mono">
              {debugInfo}
            </pre>
          </div>
        )}
      </div>
      
      <div className="mt-8 p-4 bg-slate-50 rounded-xl">
        <h3 className="font-medium text-slate-900 mb-2">About Daily Conversation Cipher:</h3>
        <p className="text-sm text-slate-600 mb-2">
          This cipher disguises secret messages as everyday conversation words, making encrypted 
          text appear like normal chat messages to avoid suspicion.
        </p>
        <div className="text-xs text-slate-500">
          <p><strong>Word Bank:</strong> {words.join(', ')}</p>
        </div>
      </div>
    </div>
  )
}

export default ConversationTool