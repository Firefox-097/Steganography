'use client';

import { useState, useRef } from 'react';

interface ImageUploadProps {
  onImageUpload: (imageDataUrl: string) => void;
}

export default function ImageUpload({ onImageUpload }: ImageUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    setUploading(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setTimeout(() => {
        onImageUpload(result);
        setUploading(false);
      }, 1000);
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer
          ${dragOver 
            ? 'border-blue-500 bg-blue-50 scale-105' 
            : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50/50'
          }
          ${uploading ? 'pointer-events-none' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        {uploading ? (
          <div className="animate-pulse">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-lg font-medium text-blue-600">Processing Image...</p>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform">
              <i className="ri-upload-cloud-line text-white text-2xl"></i>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Drop your image here or click to browse
            </h3>
            
            <p className="text-gray-500 mb-6">
              Supports PNG, JPG, GIF, and other image formats
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <i className="ri-image-line"></i>
                <span>PNG</span>
              </div>
              <div className="flex items-center space-x-1">
                <i className="ri-image-line"></i>
                <span>JPG</span>
              </div>
              <div className="flex items-center space-x-1">
                <i className="ri-image-line"></i>
                <span>GIF</span>
              </div>
              <div className="flex items-center space-x-1">
                <i className="ri-image-line"></i>
                <span>WEBP</span>
              </div>
            </div>
          </div>
        )}
        
        {dragOver && (
          <div className="absolute inset-0 bg-blue-500/10 rounded-2xl flex items-center justify-center">
            <div className="text-blue-600 font-medium">Drop to upload</div>
          </div>
        )}
      </div>
    </div>
  );
}