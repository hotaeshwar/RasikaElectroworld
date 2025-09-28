import React, { useState, useEffect, useRef } from 'react';
import { X, Send, MessageCircle, Bot, User } from 'lucide-react';

const WhatsAppChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState('initial');
  const chatEndRef = useRef(null);

  const phoneNumber = '919569797120';

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  // Initial welcome messages
  useEffect(() => {
    if (isOpen && chatHistory.length === 0) {
      const welcomeMessages = [
        { type: 'bot', text: "Hi! Welcome to Rasika Electroworld! 👋", delay: 500 },
        { type: 'bot', text: "I'm here to help you find the perfect electronics for your home!", delay: 1500 },
        { type: 'bot', text: "What can I help you with today?", delay: 2500 }
      ];

      welcomeMessages.forEach((msg, index) => {
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setChatHistory(prev => [...prev, msg]);
            setIsTyping(false);
          }, 1000);
        }, msg.delay);
      });
    }
  }, [isOpen]);

  const quickMessages = [
    {
      id: 'product_inquiry',
      title: '📱 Product Inquiry',
      message: 'Hi! I would like to know more about your products and pricing.',
      responses: [
        "Great choice! We have amazing deals on the latest electronics! 🔥",
        "What type of product interests you the most?",
        "• Smartphones & Tablets\n• TVs & Entertainment\n• Home Appliances\n• Air Conditioners"
      ]
    },
    {
      id: 'tv_ac',
      title: '📺 TVs & Air Conditioners',
      message: 'Hello! I\'m interested in your TVs and Air Conditioners. Could you share the latest models and prices?',
      responses: [
        "Excellent! TVs and ACs are our specialties! ❄️📺",
        "We have the latest models from top brands like Samsung, LG, Daikin, and Voltas!",
        "What's your budget range and room size? This will help me recommend the perfect options for you!"
      ]
    },
    {
      id: 'appliances',
      title: '🏠 Home Appliances',
      message: 'Hi! I need information about washing machines, refrigerators, and other home appliances.',
      responses: [
        "Perfect timing! We have incredible offers on home appliances! 🎉",
        "Our range includes:",
        "• Washing Machines (Front & Top Load)\n• Refrigerators (Single & Double Door)\n• Microwave Ovens\n• Water Purifiers\n• And much more!"
      ]
    },
    {
      id: 'store_visit',
      title: '🏪 Store Visit',
      message: 'Hello! I would like to visit your store. What are your operating hours and exact location?',
      responses: [
        "We'd love to see you at our store! 🏪",
        "📍 Address: [Your Store Address Here]",
        "🕒 Timings: Mon-Sun 10:00 AM - 9:00 PM",
        "Free parking available! See you soon! 🚗"
      ]
    },
    {
      id: 'service_support',
      title: '🔧 Service & Support',
      message: 'Hi! I need technical support or service for my purchased product.',
      responses: [
        "I'm here to help with your service needs! 🛠️",
        "Our expert technicians are ready to assist you!",
        "Could you please share:\n• Product type\n• Model number\n• Issue you're facing"
      ]
    },
    {
      id: 'offers',
      title: '🎉 Current Offers',
      message: 'What are your current offers and discounts?',
      responses: [
        "Amazing deals are waiting for you! 🔥🎊",
        "Current Hot Offers:",
        "• Up to 40% OFF on TVs\n• Special AC installation packages\n• Exchange offers on old appliances\n• EMI starting at ₹999/month"
      ]
    }
  ];

  const simulateTyping = (responses, callback) => {
    setIsTyping(true);
    
    responses.forEach((response, index) => {
      setTimeout(() => {
        if (index === responses.length - 1) {
          setIsTyping(false);
        }
        setChatHistory(prev => [...prev, { type: 'bot', text: response }]);
      }, (index + 1) * 1200);
    });

    setTimeout(() => {
      callback && callback();
    }, responses.length * 1200 + 500);
  };

  const handleSendMessage = (messageText = message, option = null) => {
    if (!messageText.trim() && selectedOption !== 'custom') return;
    
    const finalMessage = messageText.trim() || message.trim();
    if (!finalMessage) return;

    // Add user message to chat
    setChatHistory(prev => [...prev, { type: 'user', text: finalMessage }]);

    // Simulate bot response
    if (option && option.responses) {
      simulateTyping(option.responses, () => {
        // Add follow-up questions or actions
        setTimeout(() => {
          setChatHistory(prev => [...prev, { 
            type: 'bot', 
            text: "Would you like me to connect you directly with our sales team on WhatsApp for personalized assistance? 💬" 
          }]);
          setCurrentStep('whatsapp_connect');
        }, 1000);
      });
    } else {
      // Generic response for custom messages
      simulateTyping([
        "Thank you for your message! 😊",
        "Let me connect you with our team right away for the best assistance!"
      ], () => {
        setCurrentStep('whatsapp_connect');
      });
    }
    
    setMessage('');
    setSelectedOption('');
  };

  const connectToWhatsApp = (messageText) => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageText)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleQuickMessage = (option) => {
    if (option.id === 'custom') {
      setSelectedOption('custom');
      setMessage('');
    } else {
      handleSendMessage(option.message, option);
    }
  };

  const handleWhatsAppConnect = () => {
    // Get the conversation summary
    const conversationSummary = chatHistory
      .filter(msg => msg.type === 'user')
      .map(msg => msg.text)
      .join('\n\n');
    
    const finalMessage = conversationSummary || "Hi! I'd like to know more about your products.";
    connectToWhatsApp(`Conversation Summary:\n\n${finalMessage}\n\nPlease assist me further.`);
    
    // Add confirmation message
    setChatHistory(prev => [...prev, { 
      type: 'bot', 
      text: "Perfect! Opening WhatsApp now... Our team will assist you right away! 🚀" 
    }]);
    
    // Close after a short delay
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMessage('');
      setSelectedOption('');
      setChatHistory([]);
      setCurrentStep('initial');
    }
  };

  const resetChat = () => {
    setChatHistory([]);
    setSelectedOption('');
    setMessage('');
    setCurrentStep('initial');
    
    // Re-trigger welcome messages
    setTimeout(() => {
      const welcomeMessages = [
        { type: 'bot', text: "Hi again! How can I help you today? 👋", delay: 500 }
      ];

      welcomeMessages.forEach((msg, index) => {
        setTimeout(() => {
          setChatHistory(prev => [...prev, msg]);
        }, msg.delay);
      });
    }, 100);
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChat}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 transform hover:scale-110 relative"
        >
          {/* Notification pulse */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse flex items-center justify-center">
            <span className="text-xs text-white font-bold">!</span>
          </div>
          
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 max-w-[calc(100vw-2rem)] animate-in fade-in-0 zoom-in-95 duration-300">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Rasika AI Assistant</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                  <p className="text-sm text-green-100">Online now</p>
                </div>
              </div>
              <button
                onClick={resetChat}
                className="p-2 hover:bg-green-600 rounded-full transition-colors text-xs"
                title="New Chat"
              >
                🔄
              </button>
              <button
                onClick={toggleChat}
                className="p-1 hover:bg-green-600 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 h-96 overflow-y-auto bg-gray-50">
              {/* Chat Messages */}
              <div className="space-y-3">
                {chatHistory.map((msg, index) => (
                  <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      msg.type === 'user' 
                        ? 'bg-green-500 text-white rounded-br-sm' 
                        : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border'
                    }`}>
                      <div className="flex items-start gap-2">
                        {msg.type === 'bot' && (
                          <svg className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                          </svg>
                        )}
                        <p className="text-sm whitespace-pre-line">{msg.text}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-800 rounded-2xl rounded-bl-sm shadow-sm border px-4 py-2">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Quick Action Buttons */}
              {selectedOption !== 'custom' && chatHistory.length >= 3 && currentStep === 'initial' && (
                <div className="space-y-2 mt-4">
                  <div className="text-center">
                    <span className="bg-white px-3 py-1 rounded-full text-xs text-gray-600 border">
                      Quick Actions
                    </span>
                  </div>
                  {quickMessages.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleQuickMessage(option)}
                      className="w-full text-left p-3 bg-white hover:bg-green-50 rounded-xl transition-all duration-200 text-sm border border-gray-200 hover:border-green-300 hover:shadow-sm"
                    >
                      <span className="font-medium">{option.title}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => setSelectedOption('custom')}
                    className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-200 text-sm border border-blue-200 hover:border-blue-300"
                  >
                    <span className="font-medium">✍️ Type Custom Message</span>
                  </button>
                </div>
              )}

              {/* WhatsApp Connection Button */}
              {currentStep === 'whatsapp_connect' && (
                <div className="mt-4 text-center">
                  <button
                    onClick={handleWhatsAppConnect}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-2 w-full"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    Continue on WhatsApp
                  </button>
                </div>
              )}
            </div>

            {/* Custom Message Input */}
            {selectedOption === 'custom' && (
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="space-y-3">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm resize-none"
                    autoFocus
                  />
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedOption('');
                        setMessage('');
                      }}
                      className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors duration-200 text-sm"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => handleSendMessage()}
                      disabled={!message.trim()}
                      className="flex-1 py-2 px-4 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl transition-colors duration-200 text-sm flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="bg-white px-4 py-3 border-t border-gray-200">
              <div className="text-center">
                <span className="text-xs text-gray-500">
                  Powered by AI • Connected via WhatsApp
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppChatbot;