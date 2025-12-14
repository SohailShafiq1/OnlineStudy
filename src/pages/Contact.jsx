import React, { useState } from 'react';
import Button from '../components/Button';

/**
 * Contact Page - Contact form and information
 */
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            📞 Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions or suggestions? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h2>

            {submitted && (
              <div className="bg-green-50 border border-green-300 text-green-800 px-4 py-3 rounded-lg mb-6">
                ✅ Message sent successfully! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <Button 
                text="Send Message" 
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
              />
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-3xl mr-4">📱</div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">WhatsApp</h3>
                    <p className="text-gray-600">+92 300 1234567</p>
                    <a 
                      href="https://wa.me/923001234567" 
                      className="text-primary hover:underline"
                    >
                      Chat with us
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-3xl mr-4">✉️</div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <p className="text-gray-600">contact@studywithmaryam.com</p>
                    <a 
                      href="mailto:contact@studywithmaryam.com" 
                      className="text-primary hover:underline"
                    >
                      Send email
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-3xl mr-4">🕐</div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Response Time</h3>
                    <p className="text-gray-600">We typically respond within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">
                Follow Us
              </h2>
              <p className="mb-6">
                Stay updated with latest notes, tips, and announcements
              </p>
              <div className="flex space-x-4">
                <a href="#" className="bg-white text-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-2xl hover:scale-110 transition">
                  📘
                </a>
                <a href="#" className="bg-white text-pink-600 w-12 h-12 rounded-full flex items-center justify-center text-2xl hover:scale-110 transition">
                  📷
                </a>
                <a href="#" className="bg-white text-blue-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl hover:scale-110 transition">
                  🐦
                </a>
                <a href="#" className="bg-white text-red-600 w-12 h-12 rounded-full flex items-center justify-center text-2xl hover:scale-110 transition">
                  ▶️
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
