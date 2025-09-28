import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, X } from 'lucide-react';
import logo from '../assets/images/logo.png';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [contactValue, setContactValue] = useState('');

  const openModal = (type, value) => {
    setModalType(type);
    setContactValue(value);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType('');
    setContactValue('');
  };

  const handlePhoneCall = () => {
    window.location.href = `tel:${contactValue}`;
    closeModal();
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${contactValue}?text=Hello! I would like to inquire about your electronics products.`, '_blank');
    closeModal();
  };

  const handleEmail = () => {
    window.location.href = `mailto:${contactValue}`;
    closeModal();
  };

  return (
    <>
      <footer className="bg-gradient-to-br from-gray-900 to-slate-900 text-white py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Main Content - Compact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            
            {/* Brand Section - Compact */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={logo} 
                  alt="Rasika Electroworld Logo" 
                  className="w-16 h-16 object-contain brightness-0 invert"
                />
                <div>
                  <h3 className="text-lg font-bold text-white">Rasika Electroworld</h3>
                  <p className="text-gray-400 text-xs">Premium Electronics</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Your trusted technology partner for quality electronics and appliances.
              </p>
            </div>

            {/* Contact Information - Compact */}
            <div>
              <h4 className="text-base font-semibold text-white mb-3">Contact Info</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-blue-400 flex-shrink-0" />
                  <p className="text-xs text-gray-300">SCO 36, B-Block, VIP Road, Zirakpur-140 603</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3 text-green-400 flex-shrink-0" />
                  <div className="text-xs text-gray-300">
                    <button 
                      onClick={() => openModal('phone', '9569797120')}
                      className="hover:text-green-400 transition-colors cursor-pointer"
                    >
                      +91 9569797120
                    </button>
                    {', '}
                    <button 
                      onClick={() => openModal('phone', '9592950333')}
                      className="hover:text-green-400 transition-colors cursor-pointer"
                    >
                      9592950333
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3 text-purple-400 flex-shrink-0" />
                  <button
                    onClick={() => openModal('email', 'singlapriyanK670@gmail.com')}
                    className="text-xs text-gray-300 hover:text-purple-400 transition-colors cursor-pointer"
                  >
                    singlapriyanK670@gmail.com
                  </button>
                </div>
              </div>
            </div>

            {/* Business Hours - Compact */}
            <div>
              <h4 className="text-base font-semibold text-white mb-3">Business Hours</h4>
              <div className="flex items-start gap-2">
                <Clock className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-gray-300 space-y-1">
                  <p>Mon-Sat: 10AM-8PM</p>
                  <p>Sun: 11AM-6PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Compact */}
          <div className="pt-4 border-t border-gray-700">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="text-center sm:text-left">
                <p className="text-gray-400 mb-1">© 2024 Rasika Electroworld. All rights reserved.</p>
                <p className="text-gray-500">Owned by Priyank Singla</p>
              </div>
              
              {/* Highlighted BuildingindiaDigital Credit */}
              <div className="text-center sm:text-right">
                <p className="text-gray-400 flex items-center justify-center sm:justify-end gap-2">
                  Website designed by{' '}
                  <span className="flex items-center gap-1 group cursor-pointer">
                    {/* BID Logo */}
                    <div className="flex items-center">
                      <span className="bg-orange-500 text-white font-bold text-sm px-1.5 py-0.5 rounded-l group-hover:bg-orange-600 transition-colors">
                        B
                      </span>
                      <span className="bg-blue-600 text-white font-bold text-sm px-1.5 py-0.5 group-hover:bg-blue-700 transition-colors">
                        I
                      </span>
                      <span className="bg-green-600 text-white font-bold text-sm px-1.5 py-0.5 rounded-r group-hover:bg-green-700 transition-colors">
                        D
                      </span>
                    </div>
                    {/* Company Name */}
                    <span className="ml-1">
                      <span className="text-orange-500 font-semibold group-hover:text-orange-400 transition-colors">
                        Building
                      </span>
                      <span className="text-blue-600 font-semibold group-hover:text-blue-500 transition-colors">
                        india
                      </span>
                      <span className="text-green-600 font-semibold group-hover:text-green-500 transition-colors">
                        Digital
                      </span>
                    </span>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 shadow-2xl relative max-w-sm w-full animate-in fade-in-0 zoom-in-95 duration-300">
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <div className="text-center">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                  {modalType === 'phone' ? (
                    <Phone className="w-8 h-8 text-white" />
                  ) : (
                    <Mail className="w-8 h-8 text-white" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {modalType === 'phone' ? 'Contact by Phone' : 'Contact by Email'}
                </h3>
                <p className="text-gray-600 bg-gray-50 px-4 py-2 rounded-lg font-mono text-sm">
                  {contactValue}
                </p>
              </div>

              <div className="space-y-3">
                {modalType === 'phone' ? (
                  <>
                    <button
                      onClick={handlePhoneCall}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-3"
                    >
                      <Phone className="w-5 h-5" />
                      Call Now
                    </button>
                    <button
                      onClick={handleWhatsApp}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-3"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                      WhatsApp
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEmail}
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-3"
                  >
                    <Mail className="w-5 h-5" />
                    Send Email
                  </button>
                )}
                
                <button
                  onClick={closeModal}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;