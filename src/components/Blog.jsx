import React, { useState, useEffect } from 'react';
import { Zap, ArrowRight, Clock, User, Calendar, Eye, X, Share2, Heart } from 'lucide-react';
import logo from '../assets/images/logo.png';
import apiData from '../data/api-data.json';

// Modern BlogCard Component
const BlogCard = ({ title, imageUrl, bio, index, onReadMore }) => {
  return (
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 overflow-hidden hover:-translate-y-2">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Blog Image with Overlay */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={imageUrl || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=450&fit=crop'} 
          alt={title || 'Blog post image'}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Floating number badge */}
        {/* <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
          {index + 1}
        </div> */}
        
        {/* Category tag */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
          Electronics
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6 space-y-4 flex flex-col h-full">
        <h3 className="font-bold text-lg sm:text-xl text-gray-800 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300 line-clamp-2 min-h-[3.5rem]">
          {title || 'Untitled Blog Post'}
        </h3>
        
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1 min-h-[4.5rem]">
          {bio || 'Discover the latest insights and trends in electronics technology.'}
        </p>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>Sep 2025</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>5 min read</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>1.2k</span>
          </div>
        </div>

        {/* Modern button */}
        <button 
          onClick={onReadMore}
          className="group/btn relative w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-purple-500/25 mt-auto"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span>Read Article</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
    </div>
  );
};

const Blog = ({ id }) => {
  const [posts, setPosts] = useState([]);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBlogPosts = () => {
      try {
        const blogPosts = apiData.exampleResponses?.blog_posts || apiData.blog_posts || [];
        console.log('Fetched blog posts:', blogPosts);
        setPosts(blogPosts);
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setPosts([]);
      }
    };

    fetchBlogPosts();
  }, []);

  // Scroll animation effect
  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll('.blog-card');
      const windowHeight = window.innerHeight;
      const scrollTop = window.pageYOffset;

      cards.forEach((card, index) => {
        const cardTop = card.offsetTop;
        const cardHeight = card.offsetHeight;
        
        if (scrollTop + windowHeight > cardTop + cardHeight * 0.3) {
          setVisibleCards(prev => new Set([...prev, index]));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [posts]);

  // Modal handlers
  const handleReadMore = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handleShare = (post) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.bio,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div id={id} className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 max-w-7xl">
        
        {/* Enhanced Header Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-6 mb-6">
            <div className="relative">
              <img 
                src={logo} 
                alt="Rasika Electroworld Logo" 
                className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain drop-shadow-2xl relative z-10"
              />
              <div className="absolute inset-0 bg-blue-400/30 rounded-full blur-xl scale-150"></div>
            </div>
            
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  RASIKA
                </span>
                <span className="text-gray-800 ml-2">INSIGHTS</span>
              </h1>
              <div className="flex items-center justify-center gap-2">
                <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />
                <div className="h-1 w-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover cutting-edge insights, expert reviews, and trending topics in the world of electronics and technology
          </p>
        </div>

        {/* Stats Section */}
        <div className="flex justify-center mb-12 sm:mb-16">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center gap-8 text-center">
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {posts.length}+
                </div>
                <div className="text-sm text-gray-600">Articles</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  10k+
                </div>
                <div className="text-sm text-gray-600">Readers</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                  Expert
                </div>
                <div className="text-sm text-gray-600">Reviews</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Blog Posts Grid - Centered */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-6xl auto-rows-fr">
            {posts.map((post, index) => (
              <div 
                key={post.id} 
                className={`blog-card transition-all duration-700 h-full ${
                  visibleCards.has(index) 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-12 scale-95'
                }`}
                style={{
                  transitionDelay: `${index * 200}ms`
                }}
              >
                <BlogCard 
                  title={post.title} 
                  imageUrl={post.imageUrl} 
                  bio={post.bio}
                  index={index}
                  onReadMore={() => handleReadMore(post)}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Loading State */}
        {posts.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/20 max-w-md mx-auto">
              <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"></div>
              <h2 className="text-xl font-semibold text-gray-700 mb-3">
                Loading Amazing Content
              </h2>
              <p className="text-gray-600">
                Preparing the latest tech insights for you...
              </p>
            </div>
          </div>
        )}

        {/* Call to Action */}
        {posts.length > 0 && (
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-0.5 rounded-2xl inline-block">
              <button className="bg-white hover:bg-transparent hover:text-white text-gray-800 font-semibold py-4 px-8 rounded-2xl transition-all duration-300">
                View All Articles
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Compact Blog Post Modal */}
      {isModalOpen && selectedPost && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl relative w-full max-w-2xl max-h-[80vh] overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-300">
            
            {/* Close Button */}
            <button 
              onClick={handleCloseModal} 
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 shadow-lg"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            {/* Modal Content */}
            <div className="p-6">
              {/* Blog Image */}
              <div className="relative aspect-[16/10] bg-gray-50 rounded-xl overflow-hidden mb-6">
                <img 
                  src={selectedPost.imageUrl || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=375&fit=crop'} 
                  alt={selectedPost.title} 
                  className="w-full h-full object-cover"
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                    Electronics
                  </span>
                </div>
              </div>

              {/* Blog Details */}
              <div className="space-y-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  {selectedPost.title}
                </h1>
                
                {/* Meta Information */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>Rasika Team</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>September 19, 2025</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>5 min read</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>1.2k views</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedPost.bio}
                  </p>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Insights</h3>
                    <p className="text-gray-700 text-sm">
                      Dive deeper into the world of electronics with expert analysis, practical tips, and the latest industry trends. Our comprehensive guides help you make informed decisions for your tech needs.
                    </p>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed text-sm">
                    Stay ahead of the curve with Rasika Electroworld's expert insights. From cutting-edge gadgets to essential home appliances, we bring you detailed reviews and buying guides to enhance your lifestyle.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;