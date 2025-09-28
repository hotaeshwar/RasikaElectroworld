import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [heroData, setHeroData] = useState({ title: '', subtitle: '', imageUrl: '', price: '' });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate API call with timeout
    const fetchData = async () => {
      try {
        // Replace with your actual API endpoint
        // const response = await fetch('http://localhost:8000/hero');
        // const data = await response.json();
        
        // Mock data for demo
        const mockData = {
          title: 'Discover Amazing Products',
          subtitle: 'Premium quality electronics at unbeatable prices. Experience the future of shopping with our curated collection.',
          imageUrl: 'https://www.lg.com/content/dam/channel/wcms/in/images/tv-images/gallery/50UA82006LA_2010x1334_1.jpg/jcr:content/renditions/thum-1600x1062.jpeg',
          price: '₹49,999'
        };
        
        // Simulate network delay
        setTimeout(() => {
          setHeroData(mockData);
          setIsVisible(true);
        }, 300);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setHeroData({
          title: 'Discover Amazing Products',
          subtitle: 'Premium quality electronics at unbeatable prices. Experience the future of shopping with our curated collection.',
          imageUrl: '',
          price: '₹49,999'
        });
        setIsVisible(true);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`
      relative w-full
      bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 
      text-gray-800 
      px-4 py-8 
      sm:px-6 sm:py-10 
      md:px-8 md:py-12 
      lg:px-12 lg:py-16
      xl:px-16 xl:py-20
      rounded-2xl shadow-2xl 
      transition-all duration-1000 
      ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} 
      overflow-hidden
    `}>
      
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 rounded-2xl"></div>
      
      {/* Top right decoration */}
      <div className="absolute top-0 right-0 
        w-20 h-20 
        sm:w-32 sm:h-32 
        md:w-40 md:h-40 
        lg:w-48 lg:h-48 
        xl:w-64 xl:h-64
        bg-gradient-to-bl from-blue-400/20 to-transparent 
        rounded-full transform translate-x-8 -translate-y-8
        sm:translate-x-16 sm:-translate-y-16
      "></div>
      
      {/* Bottom left decoration */}
      <div className="absolute bottom-0 left-0 
        w-16 h-16 
        sm:w-24 sm:h-24 
        md:w-32 md:h-32 
        lg:w-40 lg:h-40 
        xl:w-48 xl:h-48
        bg-gradient-to-tr from-purple-400/20 to-transparent 
        rounded-full transform -translate-x-8 translate-y-8
        sm:-translate-x-12 sm:translate-y-12
      "></div>
      
      <div className="flex flex-col lg:flex-row items-center justify-between relative z-10 gap-8 lg:gap-12">
        
        {/* Text Section */}
        <div className={`
          w-full lg:w-1/2 
          text-center lg:text-left 
          transform transition-all duration-1000 
          ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
          order-2 lg:order-1
        `}>
          
          {/* Main Title */}
          <h1 className="
            text-2xl leading-tight
            sm:text-3xl sm:leading-tight
            md:text-4xl md:leading-tight
            lg:text-5xl lg:leading-tight
            xl:text-6xl xl:leading-tight
            font-bold mb-4 sm:mb-6
          ">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent">
              {heroData.title}
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="
            text-sm leading-relaxed
            sm:text-base sm:leading-relaxed
            md:text-lg md:leading-relaxed
            lg:text-xl lg:leading-relaxed
            xl:text-2xl xl:leading-relaxed
            mb-6 sm:mb-8 
            text-gray-700 font-medium
            max-w-none lg:max-w-lg xl:max-w-xl
          ">
            {heroData.subtitle}
          </p>
          
          {/* Price Display */}
          {heroData.price && (
            <div className="mb-6 sm:mb-8">
              <div className="inline-block p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50">
                <span className="block text-xs sm:text-sm text-gray-600 font-medium mb-1">Starting from</span>
                <div className="
                  text-xl font-bold
                  sm:text-2xl 
                  md:text-3xl 
                  lg:text-3xl 
                  xl:text-4xl
                ">
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {heroData.price}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
            {/* Shop Products Button - Updated with shop link */}
            <a 
              href="#shop"
              className="
                group w-full sm:w-auto
                bg-gradient-to-r from-blue-500 to-purple-600 
                hover:from-blue-600 hover:to-purple-700 
                text-white font-bold 
                py-3 px-6
                sm:py-4 sm:px-8
                md:py-4 md:px-8
                rounded-xl shadow-lg hover:shadow-2xl 
                transform transition-all duration-300 
                hover:scale-105 hover:-translate-y-1 
                relative overflow-hidden
                text-center inline-block
                no-underline
              "
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative text-white text-sm sm:text-base md:text-lg font-semibold">
                Shop Products
              </span>
            </a>
            
            {/* Learn More Button - You can also add a link here if needed */}
            <button className="
              w-full sm:w-auto
              bg-white/80 backdrop-blur-sm hover:bg-white 
              border-2 border-gray-300 hover:border-blue-400 
              text-gray-800 hover:text-blue-600 
              font-bold 
              py-3 px-6
              sm:py-4 sm:px-8
              md:py-4 md:px-8
              rounded-xl shadow-lg hover:shadow-xl 
              transform transition-all duration-300 hover:scale-105
            ">
              <span className="text-sm sm:text-base md:text-lg font-semibold">
                Learn More
              </span>
            </button>
          </div>
        </div>
        
        {/* Image Section */}
        {heroData.imageUrl && (
          <div className={`
            w-full lg:w-1/2 
            max-w-sm sm:max-w-md md:max-w-lg lg:max-w-none
            mx-auto lg:mx-0
            transform transition-all duration-1000 
            ${isVisible ? 'translate-x-0 opacity-100 rotate-0' : 'translate-x-full opacity-0 rotate-12'}
            order-1 lg:order-2
          `}>
            <div className="relative group">
              
              {/* Floating background elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-3xl transform rotate-6 scale-105 group-hover:rotate-12 transition-transform duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-purple-400/20 to-pink-400/20 rounded-3xl transform -rotate-6 scale-95 group-hover:-rotate-12 transition-transform duration-500"></div>
              
              {/* Main Product Image */}
              <div className="relative">
                <img
                  src={heroData.imageUrl}
                  alt="Product showcase"
                  className="
                    relative w-full h-auto
                    max-w-[280px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[500px]
                    mx-auto
                    aspect-square object-cover
                    bg-white rounded-2xl shadow-2xl 
                    transform rotate-3 hover:rotate-6 
                    transition-all duration-500 hover:scale-105
                  "
                  style={{ 
                    filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.25))'
                  }}
                />
                
                {/* Floating badges */}
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-gradient-to-r from-orange-400 to-red-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg animate-bounce">
                  <span className="text-white">Hot Deal!</span>
                </div>
                
                <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                  <span className="text-gray-800">Premium Quality</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-b-2xl"></div>
    </div>
  );
};

export default Hero;