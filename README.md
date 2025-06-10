# Cipher Toolkit

A comprehensive, professional-grade cryptography and steganography suite built with React, TypeScript, and Tailwind CSS.

## Features

### 🔐 Encryption Tools
- **Morse Code** - Classic dot-dash encoding system
- **Caesar Cipher** - Simple substitution cipher with customizable shift
- **Vigenère Cipher** - Polyalphabetic substitution using keyword
- **Binary Converter** - Text to binary and vice versa
- **Base64 Encoder/Decoder** - Standard Base64 encoding
- **Unicode Cipher** - Advanced encryption using Unicode character sets
- **Daily Conversation Cipher** - Disguise messages as everyday conversation

### 🖼️ Steganography
- **Image Steganography** - Hide secret text within image files
- **LSB Technique** - Uses Least Significant Bit manipulation
- **Download Support** - Save processed images with hidden messages

### ✨ Professional Features
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Modern UI/UX** - Clean, intuitive interface with smooth animations
- **Copy to Clipboard** - One-click copying of results
- **Real-time Processing** - Instant encryption/decryption
- **Debug Information** - Detailed processing logs for learning
- **Educational Content** - Learn about each cipher technique



## Usage

### Basic Operations
1. Select a cipher tool from the navigation tabs
2. Enter your text in the input field
3. Configure any required parameters (keys, shifts, etc.)
4. Click the process button to encrypt/decrypt
5. Copy the result using the copy button

### Steganography
1. Select the Steganography tool
2. Upload an image file (PNG, JPG, etc.)
3. Enter your secret text
4. Click "Hide Text" to embed the message
5. Download the processed image
6. To extract: upload the processed image and click "Extract Text"

## Security Notes

⚠️ **Important**: This tool is designed for educational purposes and hobby projects. While the implementations are mathematically correct, they should not be used for securing sensitive data in production environments.

### Recommendations for Secure Communication:
- Use established cryptographic libraries (OpenSSL, libsodium)
- Implement proper key management
- Use authenticated encryption (AES-GCM, ChaCha20-Poly1305)
- Consider forward secrecy and key rotation

## Educational Value

Each tool includes:
- **Algorithm explanations** - Learn how each cipher works
- **Historical context** - Understand the origins and use cases
- **Debug information** - See step-by-step processing
- **Best practices** - Security considerations and limitations

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for:
- Bug fixes
- New cipher implementations
- UI/UX improvements
- Documentation updates
- Performance optimizations

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Classical cryptography techniques and their inventors
- Modern web development community
- Educational cryptography resources
- Open source contributors

---

**Disclaimer**: This software is provided for educational and research purposes only. Users are responsible for complying with applicable laws and regulations regarding cryptography and data protection in their jurisdiction.
