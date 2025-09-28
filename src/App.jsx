// App.jsx
import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Shop from './components/Shop';
import Blog from './components/Blog';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import WhatsAppChatbot from './components/WhatsAppChatbot';

function App() {
  useEffect(() => {
    // Handle smooth scrolling when clicking on anchor links
    const handleSmoothScroll = (e) => {
      // Check if the clicked element or its parent has an href that starts with #
      const link = e.target.closest('a[href^="#"]');
      if (link) {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Get navbar height to offset the scroll position
          const navbar = document.querySelector('nav') || document.querySelector('[data-navbar]');
          const navbarHeight = navbar ? navbar.offsetHeight : 80; // fallback to 80px
          
          // Calculate the target position
          const targetPosition = targetElement.offsetTop - navbarHeight - 20; // 20px extra padding
          
          // Smooth scroll to target
          window.scrollTo({
            top: Math.max(0, targetPosition), // Ensure we don't scroll to negative position
            behavior: 'smooth'
          });
        }
      }
    };

    // Add event listener to document for event delegation
    document.addEventListener('click', handleSmoothScroll);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('click', handleSmoothScroll);
    };
  }, []);

  // Handle direct URL hash navigation (when page loads with #shop)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        setTimeout(() => {
          const targetElement = document.getElementById(hash);
          if (targetElement) {
            const navbar = document.querySelector('nav') || document.querySelector('[data-navbar]');
            const navbarHeight = navbar ? navbar.offsetHeight : 80;
            const targetPosition = targetElement.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
              top: Math.max(0, targetPosition),
              behavior: 'smooth'
            });
          }
        }, 100); // Small delay to ensure elements are rendered
      }
    };

    // Handle initial page load with hash
    handleHashChange();

    // Handle browser back/forward with hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div id="home">
        <Hero />
      </div>
      <Shop id="shop" />
      <Blog id="blog" />
      <div id="contact">
        <ContactUs />
      </div>
      <Footer />
      <WhatsAppChatbot />
    </div>
  );
}

export default App;