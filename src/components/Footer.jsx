import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer Component - 4 Column Layout
 * Sections: About, Quick Links, Legal, Contact
 */
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-bold mb-4">About</h3>
            <p className="text-gray-400 text-sm">
              Study With Maryam is Pakistan's leading free education platform providing 
              comprehensive study material for classes 9-12 and entrance exam preparation 
              including MDCAT, NUMS, NUST, and more.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
              <li><Link to="/notes" className="text-gray-400 hover:text-white transition">Notes</Link></li>
              <li><Link to="/past-papers" className="text-gray-400 hover:text-white transition">Past Papers</Link></li>
              <li><Link to="/mcqs" className="text-gray-400 hover:text-white transition">MCQs Bank</Link></li>
              <li><Link to="/study-tips" className="text-gray-400 hover:text-white transition">Study Tips</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-xl font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/disclaimer" className="text-gray-400 hover:text-white transition">Disclaimer</Link></li>
              <li><Link to="/terms-of-service" className="text-gray-400 hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center text-gray-400">
                <span className="mr-2">📱</span>
                <a href="https://wa.me/923001234567" className="hover:text-white transition">
                  WhatsApp: +92 300 1234567
                </a>
              </li>
              <li className="flex items-center text-gray-400">
                <span className="mr-2">✉️</span>
                <a href="mailto:contact@studywithmaryam.com" className="hover:text-white transition">
                  contact@studywithmaryam.com
                </a>
              </li>
              <li className="flex items-center space-x-3 mt-4">
                <a href="#" className="text-gray-400 hover:text-white transition text-xl">📘</a>
                <a href="#" className="text-gray-400 hover:text-white transition text-xl">📷</a>
                <a href="#" className="text-gray-400 hover:text-white transition text-xl">🐦</a>
                <a href="#" className="text-gray-400 hover:text-white transition text-xl">▶️</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Study With Maryam - All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
