import React, { useState } from 'react'
import { Shield, Lock, Eye, Binary, Hash, Globe, Image, MessageSquare } from 'lucide-react'
import Header from './components/Header'
import TabNavigation from './components/TabNavigation'
import MorseCodeTool from './components/tools/MorseCodeTool'
import CaesarCipherTool from './components/tools/CaesarCipherTool'
import VigenereCipherTool from './components/tools/VigenereCipherTool'
import BinaryTool from './components/tools/BinaryTool'
import Base64Tool from './components/tools/Base64Tool'
import UnicodeTool from './components/tools/UnicodeTool'
import SteganographyTool from './components/tools/SteganographyTool'
import ConversationTool from './components/tools/ConversationTool'
import Footer from './components/Footer'

export type ToolType = 'morse' | 'caesar' | 'vigenere' | 'binary' | 'base64' | 'unicode' | 'steganography' | 'conversation'

const tools = [
  { id: 'morse' as ToolType, name: 'Morse Code', icon: MessageSquare, description: 'Convert text to/from Morse code' },
  { id: 'caesar' as ToolType, name: 'Caesar Cipher', icon: Shield, description: 'Classical substitution cipher' },
  { id: 'vigenere' as ToolType, name: 'Vigenère Cipher', icon: Lock, description: 'Polyalphabetic substitution cipher' },
  { id: 'binary' as ToolType, name: 'Binary', icon: Binary, description: 'Convert text to/from binary' },
  { id: 'base64' as ToolType, name: 'Base64', icon: Hash, description: 'Encode/decode Base64' },
  { id: 'unicode' as ToolType, name: 'Unicode Cipher', icon: Globe, description: 'Advanced Unicode encryption' },
  { id: 'steganography' as ToolType, name: 'Steganography', icon: Image, description: 'Hide text in images' },
  { id: 'conversation' as ToolType, name: 'Daily Chat', icon: Eye, description: 'Disguise messages as conversation' },
]

function App() {
  const [activeTool, setActiveTool] = useState<ToolType>('morse')

  const renderTool = () => {
    switch (activeTool) {
      case 'morse':
        return <MorseCodeTool />
      case 'caesar':
        return <CaesarCipherTool />
      case 'vigenere':
        return <VigenereCipherTool />
      case 'binary':
        return <BinaryTool />
      case 'base64':
        return <Base64Tool />
      case 'unicode':
        return <UnicodeTool />
      case 'steganography':
        return <SteganographyTool />
      case 'conversation':
        return <ConversationTool />
      default:
        return <MorseCodeTool />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header />
        
        <div className="mt-12">
          <TabNavigation 
            tools={tools}
            activeTool={activeTool}
            onToolChange={setActiveTool}
          />
          
          <div className="mt-8 animate-fade-in">
            {renderTool()}
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  )
}

export default App