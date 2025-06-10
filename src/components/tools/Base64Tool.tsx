import React, { useState } from 'react'
import { Hash } from 'lucide-react'
import ToggleSwitch from '../ui/ToggleSwitch'
import CopyButton from '../ui/CopyButton'

const Base64Tool: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [isDecode, setIsDecode] = useState(false)

  const processBase64 = () => {
    try {
      if (isDecode) {
        const result = atob(input)
        setOutput(result)
      } else {
        const result = btoa(input)
        setOutput(result)
      }
    } catch (error) {
      setOutput('Error: Invalid Base64 input')
    }
  }

  return (
    <div className="glass-card rounded-2xl p-8 animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-slate-100 rounded-lg">
          <Hash className="w-5 h-5 text-slate-700" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Base64 Encoder/Decoder</h2>
      </div>
      
      <div className="space-y-6">
        <ToggleSwitch
          checked={isDecode}
          onChange={setIsDecode}
          label={isDecode ? 'Decode Mode' : 'Encode Mode'}
        />
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {isDecode ? 'Base64 Input' : 'Text Input'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isDecode ? 'Enter Base64 encoded text...' : 'Enter text to encode...'}
            className="textarea-field h-32"
          />
        </div>
        
        <button
          onClick={processBase64}
          className="btn-primary w-full"
        >
          {isDecode ? 'Decode' : 'Encode'} Base64
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
        <h3 className="font-medium text-slate-900 mb-2">About Base64:</h3>
        <p className="text-sm text-slate-600">
          Base64 is an encoding scheme that converts binary data into ASCII text. 
          Commonly used for encoding data in emails, URLs, and web applications.
        </p>
      </div>
    </div>
  )
}

export default Base64Tool