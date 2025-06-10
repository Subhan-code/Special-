import React, { useState, useRef } from 'react'
import { Image, Upload, Download, Eye } from 'lucide-react'

const SteganographyTool: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [secretText, setSecretText] = useState('')
  const [extractedText, setExtractedText] = useState('')
  const [processedImageUrl, setProcessedImageUrl] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      setExtractedText('')
      setProcessedImageUrl('')
    }
  }

  const hideTextInImage = async () => {
    if (!selectedFile || !secretText.trim()) {
      alert('Please select an image and enter secret text.')
      return
    }

    setIsProcessing(true)
    
    try {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = img.width
          canvas.height = img.height
          const ctx = canvas.getContext('2d')!
          ctx.drawImage(img, 0, 0)

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const encodedText = btoa(secretText)
          
          // Store the length of the encoded text in the first 4 pixels
          const textLength = encodedText.length
          for (let i = 0; i < 4; i++) {
            imageData.data[i * 4] = (textLength >> (i * 8)) & 255
          }
          
          // Hide the text in the image
          for (let i = 0; i < encodedText.length; i++) {
            const code = encodedText.charCodeAt(i)
            const pixelIndex = (i + 4) * 4
            imageData.data[pixelIndex] = (imageData.data[pixelIndex] & 0xFC) | ((code >> 6) & 0x3)
            imageData.data[pixelIndex + 1] = (imageData.data[pixelIndex + 1] & 0xFC) | ((code >> 4) & 0x3)
            imageData.data[pixelIndex + 2] = (imageData.data[pixelIndex + 2] & 0xFC) | ((code >> 2) & 0x3)
            imageData.data[pixelIndex + 3] = (imageData.data[pixelIndex + 3] & 0xFC) | (code & 0x3)
          }

          ctx.putImageData(imageData, 0, 0)
          setProcessedImageUrl(canvas.toDataURL())
          setIsProcessing(false)
        }
        img.src = event.target?.result as string
      }
      reader.readAsDataURL(selectedFile)
    } catch (error) {
      setIsProcessing(false)
      alert('Error processing image')
    }
  }

  const extractTextFromImage = async () => {
    if (!selectedFile) {
      alert('Please select an image.')
      return
    }

    setIsProcessing(true)
    
    try {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = img.width
          canvas.height = img.height
          const ctx = canvas.getContext('2d')!
          ctx.drawImage(img, 0, 0)

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          
          // Extract the length of the encoded text from the first 4 pixels
          let textLength = 0
          for (let i = 0; i < 4; i++) {
            textLength |= (imageData.data[i * 4] << (i * 8))
          }
          
          let extractedEncodedText = ''
          for (let i = 0; i < textLength; i++) {
            const pixelIndex = (i + 4) * 4
            const byte = ((imageData.data[pixelIndex] & 0x3) << 6) | 
                        ((imageData.data[pixelIndex + 1] & 0x3) << 4) | 
                        ((imageData.data[pixelIndex + 2] & 0x3) << 2) | 
                        (imageData.data[pixelIndex + 3] & 0x3)
            extractedEncodedText += String.fromCharCode(byte)
          }

          try {
            const decodedText = atob(extractedEncodedText)
            setExtractedText(decodedText)
          } catch (e) {
            setExtractedText('No hidden text found or invalid encoding.')
          }
          setIsProcessing(false)
        }
        img.src = event.target?.result as string
      }
      reader.readAsDataURL(selectedFile)
    } catch (error) {
      setIsProcessing(false)
      alert('Error processing image')
    }
  }

  const downloadImage = () => {
    if (!processedImageUrl) return
    
    const link = document.createElement('a')
    link.href = processedImageUrl
    link.download = 'steganography_image.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="glass-card rounded-2xl p-8 animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-slate-100 rounded-lg">
          <Image className="w-5 h-5 text-slate-700" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Steganography Tool</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Select Image
          </label>
          <div className="relative">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-secondary w-full flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" />
              {selectedFile ? selectedFile.name : 'Choose Image File'}
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Secret Text
          </label>
          <textarea
            value={secretText}
            onChange={(e) => setSecretText(e.target.value)}
            placeholder="Enter secret text to hide in the image..."
            className="textarea-field h-24"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={hideTextInImage}
            disabled={!selectedFile || !secretText.trim() || isProcessing}
            className="btn-primary flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            {isProcessing ? 'Processing...' : 'Hide Text'}
          </button>
          
          <button
            onClick={extractTextFromImage}
            disabled={!selectedFile || isProcessing}
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            {isProcessing ? 'Processing...' : 'Extract Text'}
          </button>
        </div>
        
        {processedImageUrl && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Processed Image
            </label>
            <div className="relative">
              <img
                src={processedImageUrl}
                alt="Processed"
                className="max-w-full h-auto rounded-lg border border-slate-200"
              />
              <button
                onClick={downloadImage}
                className="absolute top-3 right-3 btn-primary flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        )}
        
        {extractedText && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Extracted Secret Text
            </label>
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-slate-900">{extractedText}</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-8 p-4 bg-slate-50 rounded-xl">
        <h3 className="font-medium text-slate-900 mb-2">About Steganography:</h3>
        <p className="text-sm text-slate-600">
          Steganography hides secret information within ordinary files. This tool embeds text 
          into image pixels using LSB (Least Significant Bit) technique, making changes invisible to the naked eye.
        </p>
      </div>
    </div>
  )
}

export default SteganographyTool