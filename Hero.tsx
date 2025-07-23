'use client';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Advanced%20digital%20security%20concept%20with%20binary%20code%20patterns%2C%20encrypted%20data%20streams%2C%20and%20cybersecurity%20elements%20in%20a%20futuristic%20technological%20environment%20with%20blue%20and%20purple%20gradients%2C%20clean%20minimalist%20design%20suitable%20for%20tech%20website%20hero%20section&width=1920&height=800&seq=hero-bg-001&orientation=landscape')`
        }}
      ></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Advanced Steganography
            </span>
            <br />
            <span className="text-gray-800">Detection System</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            Discover hidden messages in images with our AI-powered steganography detection. 
            Upload, analyze, encode, and decode with advanced LSB techniques and machine learning algorithms.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <i className="ri-shield-check-line text-green-500"></i>
              <span>Secure Processing</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <i className="ri-image-line text-blue-500"></i>
              <span>Multiple Formats</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <i className="ri-brain-line text-purple-500"></i>
              <span>AI-Powered Analysis</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}