import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Camera } from 'lucide-react';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        photo: null
    });

    const [isHovered, setIsHovered] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'photo' && files.length > 0) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Create a hidden form element for FormSubmit
            const formElement = document.createElement('form');
            formElement.action = 'https://formsubmit.co/singlapriyanK670@gmail.com';
            formElement.method = 'POST';
            formElement.style.display = 'none';

            // Prepare form data for submission
            const submissionData = {
                'Name': formData.name,
                'Email': formData.email,
                'Phone': formData.phone,
                'Subject': formData.subject,
                'Message': formData.message,
                '_subject': `New Contact Form Submission - Rasika Electroworld - ${formData.subject}`,
                '_replyto': formData.email,
                '_captcha': 'false',
                '_template': 'table'
            };

            // Add all form fields as hidden inputs
            Object.keys(submissionData).forEach(key => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = submissionData[key];
                formElement.appendChild(input);
            });

            // Handle file upload if photo is selected
            if (formData.photo) {
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.name = 'attachment';
                fileInput.style.display = 'none';
                
                // Create a new FileList with the selected file
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(formData.photo);
                fileInput.files = dataTransfer.files;
                
                formElement.appendChild(fileInput);
            }

            // Append form to body and submit
            document.body.appendChild(formElement);
            formElement.submit();

            // Show success message
            alert('Thank you for your message! We will get back to you within 24 hours.');
            
            // Reset form data
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
                photo: null
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Sorry, there was an error submitting your message. Please try again or contact us directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative w-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-16 overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
            <div className="container mx-auto max-w-7xl relative z-10">
                {/* Header Section */}
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        Contact Rasika Electroworld
                    </h1>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                        Get in touch with us for all your electronics needs. We're here to help you find the perfect products at the best prices.
                    </p>
                </div>

                <div className="flex flex-col xl:flex-row items-start justify-between gap-8 lg:gap-12 xl:gap-16">
                    
                    {/* Left side - Map Only */}
                    <div className="w-full xl:w-1/2 order-1 xl:order-1">
                        {/* Google Map */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-200">
                            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">
                                Visit Our Store
                            </h2>
                            <div className="w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] rounded-xl overflow-hidden shadow-lg">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3432.5612980523783!2d76.81945547575425!3d30.646319089803498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390feb1ecd7e7675%3A0xb2c41700e22f30df!2sRasika%20Electro%20World%20-%20Ac%20dealer%20%7C%20Electronics%20%7C%20Chimney!5e0!3m2!1sen!2sin!4v1758289562103!5m2!1sen!2sin" 
                                    width="100%" 
                                    height="100%" 
                                    style={{border:0}} 
                                    allowFullScreen="" 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Contact Form */}
                    <div className="w-full xl:w-1/2 order-2 xl:order-2">
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 border border-gray-200">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">
                                Send us a Message
                            </h2>
                            <p className="text-gray-600 mb-6 sm:mb-8">
                                Have a question or need assistance? Fill out the form below and we'll get back to you promptly.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                {/* Name and Email Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            required
                                            className="w-full p-3 sm:p-4 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            required
                                            className="w-full p-3 sm:p-4 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                        />
                                    </div>
                                </div>

                                {/* Phone and Subject Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Enter your phone number"
                                            required
                                            className="w-full p-3 sm:p-4 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                            Subject *
                                        </label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full p-3 sm:p-4 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="Product Inquiry">Product Inquiry</option>
                                            <option value="Price Quote">Price Quote</option>
                                            <option value="Technical Support">Technical Support</option>
                                            <option value="Warranty Claim">Warranty Claim</option>
                                            <option value="Installation Service">Installation Service</option>
                                            <option value="General Question">General Question</option>
                                            <option value="Feedback">Feedback</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us about your requirements or ask any questions..."
                                        rows="5"
                                        required
                                        className="w-full p-3 sm:p-4 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                    ></textarea>
                                </div>

                                {/* Photo Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Camera className="w-4 h-4 inline mr-2" />
                                        Attach a Photo (Optional)
                                    </label>
                                    <input
                                        type="file"
                                        name="photo"
                                        onChange={handleChange}
                                        accept="image/*"
                                        className="w-full p-3 text-sm border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-white file:bg-blue-500 file:hover:bg-blue-600 transition duration-300"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Upload product images or any relevant photos
                                    </p>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    className="w-full py-3 sm:py-4 px-6 rounded-lg font-semibold text-sm sm:text-base text-white text-center cursor-pointer transition-all duration-300 ease-in-out transform flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{
                                        backgroundColor: isSubmitting ? '#6B7280' : (isHovered ? '#2563EB' : '#3B82F6'),
                                        transform: isHovered && !isSubmitting ? 'scale(1.02)' : 'scale(1)',
                                        boxShadow: isHovered && !isSubmitting ? '0 10px 25px rgba(59, 130, 246, 0.3)' : 'none'
                                    }}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;