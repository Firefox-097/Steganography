'use client';

import { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import SteganographyProcessor from './components/SteganographyProcessor';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showProcessor, setShowProcessor] = useState(false);

  const handleImageUpload = (imageDataUrl: string) => {
    setUploadedImage(imageDataUrl);
    setShowProcessor(true);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setShowProcessor(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      {!showProcessor ? (
        <div className="animate-fade-in">
          <Hero />
          <div className="max-w-4xl mx-auto px-4 py-8">
            <ImageUpload onImageUpload={handleImageUpload} />
          </div>
          <Features />
        </div>
      ) : (
        <div className="animate-slide-up">
          <SteganographyProcessor 
            imageDataUrl={uploadedImage!} 
            onReset={handleReset}
          />
        </div>
      )}
    </div>
  );
}