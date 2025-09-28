import React, { useEffect, useState, useRef } from 'react';
import { Heart, ShoppingBag, X, Star, Zap, MessageCircle, ZoomIn, ZoomOut, Move, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import logo from '../assets/images/logo.png';
import apiData from '../data/api-data.json';

const Shop = ({ id }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1.5);
  const [showZoomOptions, setShowZoomOptions] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isMouseOverImage, setIsMouseOverImage] = useState(false);
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12); // You can adjust this number
  const imageRef = useRef(null);

  const zoomOptions = [
    { value: 1.2, label: '1.2x' },
    { value: 1.5, label: '1.5x' },
    { value: 1.8, label: '1.8x' },
    { value: 2.0, label: '2.0x' },
    { value: 2.5, label: '2.5x' },
    { value: 3.0, label: '3.0x' }
  ];

  useEffect(() => {
    const fetchProducts = () => {
      try {
        const tvProducts = apiData.exampleResponses.products.tv || [];
        const acProducts = apiData.exampleResponses.products.air_conditioner || [];
        const washingMachineProducts = apiData.exampleResponses.products.washing_machine || [];
        const refrigeratorProducts = apiData.exampleResponses.products.refrigerator || [];
        const mixerProducts = apiData.exampleResponses.products.mixer || [];
        const geyserProducts = apiData.exampleResponses.products.geyser || [];
        const chimneyProducts = apiData.exampleResponses.products.chimney || [];
        const waterPurifierProducts = apiData.exampleResponses.products.water_purifier || [];

        const allProducts = [
          ...tvProducts, 
          ...acProducts, 
          ...washingMachineProducts, 
          ...refrigeratorProducts, 
          ...mixerProducts, 
          ...geyserProducts,
          ...chimneyProducts,
          ...waterPurifierProducts
        ];
        setProducts(allProducts);
      } catch (error) {
        console.error('Error loading products from JSON:', error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  // Calculate pagination values
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setVisibleCards(new Set()); // Reset visible cards for animation
      // Scroll to top of products section
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setVisibleCards(new Set()); // Reset visible cards for animation
      // Scroll to top of products section
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    setVisibleCards(new Set()); // Reset visible cards for animation
    // Scroll to top of products section
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll animation without Intersection Observer
  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll('.product-card');
      const windowHeight = window.innerHeight;
      const scrollTop = window.pageYOffset;

      cards.forEach((card, index) => {
        const cardTop = card.offsetTop;
        const cardHeight = card.offsetHeight;
        
        // Check if card is in viewport
        if (scrollTop + windowHeight > cardTop + cardHeight * 0.3) {
          setVisibleCards(prev => new Set([...prev, index]));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger initial check
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentProducts]); // Depend on currentProducts instead of products

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setIsImageZoomed(false);
    setZoomPosition({ x: 50, y: 50 });
    setIsMouseOverImage(false);
    setShowZoomOptions(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setIsImageZoomed(false);
    setZoomPosition({ x: 50, y: 50 });
    setIsMouseOverImage(false);
    setShowZoomOptions(false);
  };

  const handleMouseMove = (e) => {
    if (!imageRef.current || !isImageZoomed) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y))
    });
  };

  const handleImageClick = () => {
    setIsImageZoomed(!isImageZoomed);
    if (!isImageZoomed) {
      setZoomPosition({ x: 50, y: 50 });
    }
  };

  const handleMouseEnterImage = () => {
    setIsMouseOverImage(true);
  };

  const handleMouseLeaveImage = () => {
    setIsMouseOverImage(false);
    if (isImageZoomed) {
      setZoomPosition({ x: 50, y: 50 });
    }
  };

  const handleZoomLevelChange = (newZoomLevel) => {
    setZoomLevel(newZoomLevel);
    setShowZoomOptions(false);
    if (isImageZoomed) {
      setZoomPosition({ x: 50, y: 50 });
    }
  };

  const getTranslationFactor = (zoomLevel) => {
    // Adjust translation factor based on zoom level for smooth movement
    if (zoomLevel <= 1.5) return 0.3;
    if (zoomLevel <= 2.0) return 0.5;
    if (zoomLevel <= 2.5) return 0.7;
    return 0.8;
  };

  const handleWhatsAppContact = (product) => {
    const businessNumber = "919569797120";
    const productPrice = product.newPrice === "Price on Request" ? "Price on Request" : `₹${product.newPrice.toLocaleString()}`;
    const oldPriceText = product.oldPrice && product.oldPrice !== "Price on Request" ? `🏷️ *MRP:* ₹${product.oldPrice.toLocaleString()} *(You save ₹${(product.oldPrice - product.newPrice).toLocaleString()}!)*` : '';
    
    const message = `🛍️ *PRODUCT INQUIRY - RASIKA ELECTROWORLD* 🛍️

Hello! I'm interested in the following product:

📱 *Product:* ${product.name}
💰 *Price:* ${productPrice}
${oldPriceText}

📋 *Product Details:*
${product.description}

*I would like to know more about:*
✅ Product availability & stock status
🚛 Delivery timeline & charges  
🔧 Installation & warranty details
💳 Payment options & EMI facilities
🎁 Any special offers or discounts
📞 Best time to visit your store

Thank you for your excellent service! Looking forward to your response. 😊

*#RasikaElectroworld #QualityElectronics #BestDeals*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${businessNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
  };

  // WhatsApp Icon Component
  const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
    </svg>
  );

  const renderPrice = (product) => {
    if (product.newPrice === "Price on Request") {
      return (
        <p className="text-lg sm:text-xl font-bold text-blue-600">
          Price on Request
        </p>
      );
    }
    
    return (
      <>
        {product.oldPrice && product.oldPrice !== "Price on Request" && (
          <p className="text-xs sm:text-sm text-gray-500 line-through">
            ₹{product.oldPrice.toLocaleString()}
          </p>
        )}
        <p className="text-lg sm:text-xl font-bold text-green-600">
          ₹{product.newPrice.toLocaleString()}
        </p>
      </>
    );
  };

  const renderDiscountBadge = (product) => {
    if (product.oldPrice && product.newPrice && 
        product.oldPrice !== "Price on Request" && 
        product.newPrice !== "Price on Request") {
      return (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse">
            {Math.round(((product.oldPrice - product.newPrice) / product.oldPrice) * 100)}% OFF
          </span>
        </div>
      );
    }
    return null;
  };

  // Generate pagination numbers with ellipsis
  const generatePaginationNumbers = () => {
    const delta = 2; // Number of pages to show around current page
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      if (totalPages > 1) rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div id={id} className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 max-w-7xl">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
            <div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 flex-wrap">
              <img 
                src={logo} 
                alt="Rasika Electroworld Logo" 
                className="w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36 xl:w-40 xl:h-40 object-contain drop-shadow-lg"
              />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                RASIKA ELECTROWORLD
              </span>
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-yellow-500 animate-pulse" />
            </div>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover premium electronics with unbeatable prices and exceptional service
          </p>
          
          {/* Pagination Info */}
          {products.length > 0 && (
            <div className="mt-4 text-sm text-gray-500">
              Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, products.length)} of {products.length} products
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {currentProducts.length > 0 ? (
            currentProducts.map((product, index) => (
              <div 
                key={product.id} 
                className={`product-card group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 transform border border-gray-100 overflow-hidden ${
                  visibleCards.has(index) 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-8 scale-95'
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`
                }}
                onMouseEnter={() => {
                  if (visibleCards.has(index)) {
                    document.querySelector(`[data-card="${index}"]`).style.transform = 'scale(1.02)';
                  }
                }}
                onMouseLeave={() => {
                  if (visibleCards.has(index)) {
                    document.querySelector(`[data-card="${index}"]`).style.transform = 'scale(1)';
                  }
                }}
                data-card={index}
              >
                {/* Discount Badge */}
                {renderDiscountBadge(product)}

                {/* Wishlist Heart */}
                <button className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-110">
                  <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors duration-300" />
                </button>

                {/* Product Image */}
                <div 
                  className="aspect-square p-4 cursor-pointer overflow-hidden"
                  onClick={() => handleViewDetails(product)}
                >
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" 
                    loading="lazy"
                  />
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-sm sm:text-base text-gray-800 line-clamp-2 min-h-[2.5rem]">
                    {product.name}
                  </h3>
                  
                  {/* Price Section */}
                  <div className="space-y-1">
                    {renderPrice(product)}
                  </div>

                  {/* Rating Display */}
                  {product.rating && product.reviewCount && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({product.reviewCount.toLocaleString()})</span>
                    </div>
                  )}

                  {/* WhatsApp Contact Button */}
                  <button
                    onClick={() => handleWhatsAppContact(product)}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">Contact on WhatsApp</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16 sm:py-20 lg:py-24">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-200 max-w-md mx-auto">
                <ShoppingBag className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-gray-300 mb-4 mx-auto" />
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-600 mb-2">
                  No Products Available
                </h2>
                <p className="text-sm sm:text-base text-gray-500">
                  Check back later for new arrivals
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {products.length > productsPerPage && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Navigation Arrows and Page Numbers */}
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg border transition-all duration-200 flex items-center gap-2 ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {generatePaginationNumbers().map((pageNumber, index) => (
                  <React.Fragment key={index}>
                    {pageNumber === '...' ? (
                      <span className="px-3 py-2 text-gray-400">...</span>
                    ) : (
                      <button
                        onClick={() => handlePageClick(pageNumber)}
                        className={`px-3 py-2 rounded-lg border transition-all duration-200 min-w-[40px] ${
                          currentPage === pageNumber
                            ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg border transition-all duration-200 flex items-center gap-2 ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Page Info */}
            <div className="text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        )}

        {/* Product Details Modal with Customizable Zoom */}
        {isModalOpen && selectedProduct && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl relative max-w-6xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-300">
              
              {/* Close Button */}
              <button 
                onClick={handleCloseModal} 
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {/* Modal Content */}
              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  
                  {/* Product Image with Customizable Zoom */}
                  <div className="relative">
                    {/* Main Image Container */}
                    <div 
                      className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden border-2 border-gray-200"
                      onMouseMove={handleMouseMove}
                      onMouseEnter={handleMouseEnterImage}
                      onMouseLeave={handleMouseLeaveImage}
                    >
                      <img 
                        ref={imageRef}
                        src={selectedProduct.imageUrl} 
                        alt={selectedProduct.name} 
                        className="w-full h-full object-contain cursor-crosshair transition-transform duration-200"
                        onClick={handleImageClick}
                        style={{
                          transform: isImageZoomed 
                            ? `scale(${zoomLevel}) translate(${(50 - zoomPosition.x) * getTranslationFactor(zoomLevel)}%, ${(50 - zoomPosition.y) * getTranslationFactor(zoomLevel)}%)` 
                            : 'scale(1)',
                          transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                        }}
                      />
                      
                      {/* Zoom Overlay Instructions */}
                      {!isImageZoomed && isMouseOverImage && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px] transition-all duration-200">
                          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
                            <ZoomIn className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">Click to zoom</span>
                          </div>
                        </div>
                      )}

                      {/* Zoomed State Instructions */}
                      {isImageZoomed && (
                        <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-2 rounded-lg text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <Move className="w-4 h-4" />
                            <span>Move mouse to explore • Click to zoom out</span>
                          </div>
                        </div>
                      )}

                      {/* Zoom Level Indicator */}
                      {isImageZoomed && (
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-lg">
                          {zoomLevel}x Zoom
                        </div>
                      )}
                    </div>

                    {/* Zoom Controls */}
                    <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                      {/* Zoom Level Selector */}
                      <div className="relative">
                        <button
                          onClick={() => setShowZoomOptions(!showZoomOptions)}
                          className="p-3 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-lg hover:scale-110"
                          title="Zoom Settings"
                        >
                          <Settings className="w-5 h-5 text-gray-600" />
                        </button>
                        
                        {/* Zoom Options Dropdown */}
                        {showZoomOptions && (
                          <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[120px]">
                            <div className="px-3 py-1 text-xs font-semibold text-gray-500 border-b border-gray-100 mb-1">
                              Zoom Level
                            </div>
                            {zoomOptions.map((option) => (
                              <button
                                key={option.value}
                                onClick={() => handleZoomLevelChange(option.value)}
                                className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-50 transition-colors duration-150 ${
                                  zoomLevel === option.value ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'
                                }`}
                              >
                                {option.label}
                                {zoomLevel === option.value && (
                                  <span className="float-right text-blue-600">✓</span>
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Zoom In/Out Button */}
                      <button
                        onClick={handleImageClick}
                        className="p-3 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-lg hover:scale-110"
                        title={isImageZoomed ? "Zoom Out" : "Zoom In"}
                      >
                        {isImageZoomed ? (
                          <ZoomOut className="w-5 h-5 text-gray-600" />
                        ) : (
                          <ZoomIn className="w-5 h-5 text-gray-600" />
                        )}
                      </button>
                    </div>

                    {/* Zoom Lens Effect (like Flipkart) */}
                    {!isImageZoomed && isMouseOverImage && (
                      <div 
                        className="absolute border-2 border-blue-400 bg-blue-100/20 pointer-events-none transition-all duration-100"
                        style={{
                          width: '120px',
                          height: '120px',
                          left: `${Math.max(0, Math.min(imageRef.current?.offsetWidth - 120 || 0, (zoomPosition.x / 100) * (imageRef.current?.offsetWidth || 0) - 60))}px`,
                          top: `${Math.max(0, Math.min(imageRef.current?.offsetHeight - 120 || 0, (zoomPosition.y / 100) * (imageRef.current?.offsetHeight || 0) - 60))}px`
                        }}
                      />
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        {selectedProduct.name}
                      </h2>
                      
                      {/* Rating Display */}
                      {selectedProduct.rating && selectedProduct.reviewCount && (
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            <span className="text-lg font-medium text-gray-700">{selectedProduct.rating}</span>
                          </div>
                          <span className="text-gray-500">({selectedProduct.reviewCount.toLocaleString()} reviews)</span>
                        </div>
                      )}
                      
                      {/* Price Section */}
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200 mb-4">
                        <div className="space-y-2">
                          {selectedProduct.newPrice === "Price on Request" ? (
                            <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                              Price on Request
                            </p>
                          ) : (
                            <>
                              {selectedProduct.oldPrice && selectedProduct.oldPrice !== "Price on Request" && (
                                <p className="text-gray-500 line-through text-lg">
                                  ₹{selectedProduct.oldPrice.toLocaleString()}
                                </p>
                              )}
                              <p className="text-2xl sm:text-3xl font-bold text-green-600">
                                ₹{selectedProduct.newPrice.toLocaleString()}
                              </p>
                              
                              {selectedProduct.oldPrice && selectedProduct.oldPrice !== "Price on Request" && selectedProduct.newPrice !== "Price on Request" && (
                                <div className="flex flex-wrap gap-2">
                                  <span className="bg-red-100 text-red-800 text-sm font-semibold px-3 py-1 rounded-full">
                                    Save ₹{(selectedProduct.oldPrice - selectedProduct.newPrice).toLocaleString()}
                                  </span>
                                  <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                                    {Math.round(((selectedProduct.oldPrice - selectedProduct.newPrice) / selectedProduct.oldPrice) * 100)}% OFF
                                  </span>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Description</h3>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedProduct.description || 'Experience premium quality and cutting-edge technology with this exceptional product. Designed for modern lifestyles, it combines functionality with style to deliver outstanding performance.'}
                      </p>
                    </div>
                    
                    {/* WhatsApp Contact Button */}
                    <div className="space-y-4">
                      <button
                        onClick={() => handleWhatsAppContact(selectedProduct)}
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                      >
                        <WhatsAppIcon className="w-6 h-6" />
                        <span className="text-lg">Contact Rasika Electroworld</span>
                      </button>
                      
                      <div className="text-center text-sm text-gray-600">
                        <p>Get instant quotes • Fast delivery • Best prices guaranteed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;