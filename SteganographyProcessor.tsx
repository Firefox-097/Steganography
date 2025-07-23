'use client';

import { useState } from 'react';
import { encodeMessage, decodeMessage } from '../lib/steganography';

interface SteganographyProcessorProps {
  imageDataUrl: string;
  onReset: () => void;
}

export default function SteganographyProcessor({ imageDataUrl, onReset }: SteganographyProcessorProps) {
  const [mode, setMode] = useState<'encode' | 'decode'>('decode');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [encodedImageUrl, setEncodedImageUrl] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleProcess = async () => {
    setProcessing(true);
    setShowResult(false);
    
    try {
      if (mode === 'encode') {
        if (!message.trim()) {
          alert('Please enter a message to encode');
          setProcessing(false);
          return;
        }
        
        const encodedImage = await encodeMessage(imageDataUrl, message);
        setEncodedImageUrl(encodedImage);
        setResult(`Message "${message}" has been successfully encoded into the image!`);
      } else {
        const decodedMessage = await decodeMessage(imageDataUrl);
        setResult(decodedMessage);
      }
      
      setTimeout(() => {
        setShowResult(true);
        setProcessing(false);
      }, 2000);
    } catch (error) {
      console.error('Processing error:', error);
      setResult('Error processing image. Please try again.');
      setProcessing(false);
    }
  };

  const downloadEncodedImage = () => {
    if (encodedImageUrl) {
      const link = document.createElement('a');
      link.download = 'encoded-image.png';
      link.href = encodedImageUrl;
      link.click();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Steganography Analysis</h2>
          <button
            onClick={onReset}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-arrow-left-line"></i>
            <span>Upload New Image</span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6 animate-fade-in">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Uploaded Image</h3>
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={imageDataUrl}
                  alt="Uploaded"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                  <i className="ri-image-line mr-1"></i>
                  Original
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 animate-fade-in animation-delay-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Mode</h3>
              <div className="flex space-x-4">
                <button
                  onClick={() => setMode('decode')}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap
                    ${mode === 'decode' 
                      ? 'bg-blue-500 text-white shadow-lg' 
                      : 'bg-white text-gray-600 hover:bg-blue-50'
                    }`}
                >
                  <i className="ri-search-eye-line mr-2"></i>
                  Decode Message
                </button>
                <button
                  onClick={() => setMode('encode')}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap
                    ${mode === 'encode' 
                      ? 'bg-purple-500 text-white shadow-lg' 
                      : 'bg-white text-gray-600 hover:bg-purple-50'
                    }`}
                >
                  <i className="ri-lock-line mr-2"></i>
                  Encode Message
                </button>
              </div>
            </div>

            {mode === 'encode' && (
              <div className="bg-purple-50 rounded-2xl p-6 animate-slide-down">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Message to Encode</h3>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter the message you want to hide in the image..."
                  className="w-full h-32 p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  maxLength={500}
                />
                <div className="text-sm text-gray-500 mt-2">
                  {message.length}/500 characters
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6 animate-fade-in animation-delay-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Analysis Results</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">AI Analysis</span>
                </div>
              </div>

              <button
                onClick={handleProcess}
                disabled={processing}
                className={`w-full py-4 px-6 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap
                  ${processing 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : mode === 'encode'
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                      : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl'
                  }`}
              >
                {processing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <span>
                    <i className={`${mode === 'encode' ? 'ri-lock-line' : 'ri-search-eye-line'} mr-2`}></i>
                    {mode === 'encode' ? 'Encode Message' : 'Decode & Analyze'}
                  </span>
                )}
              </button>

              {showResult && result && (
                <div className="mt-6 animate-fade-in-up">
                  <div className={`p-4 rounded-xl border-l-4 ${
                    mode === 'encode' 
                      ? 'bg-purple-50 border-purple-500' 
                      : result.includes('No hidden message') 
                        ? 'bg-yellow-50 border-yellow-500'
                        : 'bg-green-50 border-green-500'
                  }`}>
                    <div className="flex items-start space-x-3">
                      <i className={`${
                        mode === 'encode' 
                          ? 'ri-lock-line text-purple-500' 
                          : result.includes('No hidden message')
                            ? 'ri-information-line text-yellow-500'
                            : 'ri-eye-line text-green-500'
                      } text-xl mt-1`}></i>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">
                          {mode === 'encode' ? 'Encoding Complete!' : 'Hidden Message Detected!'}
                        </h4>
                        <p className="text-gray-700 leading-relaxed">{result}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {mode === 'encode' && encodedImageUrl && showResult && (
                <div className="mt-6 animate-fade-in-up animation-delay-200">
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-3">Encoded Image</h4>
                    <img
                      src={encodedImageUrl}
                      alt="Encoded"
                      className="w-full h-48 object-cover rounded-lg mb-3"
                    />
                    <button
                      onClick={downloadEncodedImage}
                      className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-download-line mr-2"></i>
                      Download Encoded Image
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}