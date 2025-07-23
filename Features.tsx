'use client';

export default function Features() {
  const features = [
    {
      icon: 'ri-brain-line',
      title: 'AI-Powered Detection',
      description: 'Advanced machine learning algorithms analyze images for hidden steganographic content with high accuracy.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Secure Processing',
      description: 'All image processing happens locally in your browser. Your images never leave your device.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: 'ri-image-line',
      title: 'Multiple Formats',
      description: 'Support for PNG, JPG, GIF, WebP and other popular image formats for comprehensive analysis.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: 'ri-eye-line',
      title: 'Real-time Analysis',
      description: 'Instant detection and visualization of hidden messages using advanced LSB steganography techniques.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: 'ri-lock-line',
      title: 'Message Encoding',
      description: 'Not just detection - encode your own secret messages into images with professional-grade encryption.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: 'ri-download-line',
      title: 'Export Results',
      description: 'Download processed images and detailed analysis reports for further investigation or documentation.',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our advanced steganography platform combines cutting-edge AI with intuitive design 
            to provide comprehensive image analysis and message hiding capabilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                <i className={`${feature.icon} text-white text-2xl`}></i>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}