import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Header Component - Sticky Navigation Bar
 * Contains: Logo, Search Bar, Navigation Menu with Dropdowns
 */
const Header = () => {
  const [isClassesOpen, setIsClassesOpen] = useState(false);
  const [isExamsOpen, setIsExamsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">
              📚 Study With Maryam
            </h1>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <input
              type="text"
              placeholder="Search notes, past papers, or syllabus…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="px-6 py-2 bg-primary text-white rounded-r-lg hover:bg-blue-700 transition">
              🔍
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary font-medium transition">
              Home
            </Link>

            {/* Classes Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsClassesOpen(true)}
                onMouseLeave={() => setIsClassesOpen(false)}
                className="text-gray-700 hover:text-primary font-medium transition flex items-center"
              >
                Classes ▼
              </button>
              {isClassesOpen && (
                <div
                  onMouseEnter={() => setIsClassesOpen(true)}
                  onMouseLeave={() => setIsClassesOpen(false)}
                  className="absolute top-full left-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2"
                >
                  <Link to="/classes/9th" className="block px-4 py-2 hover:bg-gray-100">9th Class</Link>
                  <Link to="/classes/10th" className="block px-4 py-2 hover:bg-gray-100">10th Class</Link>
                  <Link to="/classes/11th" className="block px-4 py-2 hover:bg-gray-100">11th Class</Link>
                  <Link to="/classes/12th" className="block px-4 py-2 hover:bg-gray-100">12th Class</Link>
                </div>
              )}
            </div>

            <Link to="/notes" className="text-gray-700 hover:text-primary font-medium transition">
              Notes
            </Link>

            <Link to="/past-papers" className="text-gray-700 hover:text-primary font-medium transition">
              Past Papers
            </Link>

            {/* Entrance Exams Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsExamsOpen(true)}
                onMouseLeave={() => setIsExamsOpen(false)}
                className="text-gray-700 hover:text-primary font-medium transition flex items-center"
              >
                Entrance Exams ▼
              </button>
              {isExamsOpen && (
                <div
                  onMouseEnter={() => setIsExamsOpen(true)}
                  onMouseLeave={() => setIsExamsOpen(false)}
                  className="absolute top-full left-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2"
                >
                  <Link to="/entrance-exams" className="block px-4 py-2 hover:bg-gray-100">All Exams</Link>
                  <Link to="/entrance-exams/mdcat" className="block px-4 py-2 hover:bg-gray-100">MDCAT</Link>
                  <Link to="/entrance-exams/nums" className="block px-4 py-2 hover:bg-gray-100">NUMS</Link>
                  <Link to="/entrance-exams/nust" className="block px-4 py-2 hover:bg-gray-100">NUST</Link>
                  <Link to="/entrance-exams/fmdc" className="block px-4 py-2 hover:bg-gray-100">FMDC</Link>
                  <Link to="/entrance-exams/aku" className="block px-4 py-2 hover:bg-gray-100">AKU</Link>
                  <Link to="/entrance-exams/amc" className="block px-4 py-2 hover:bg-gray-100">AMC</Link>
                </div>
              )}
            </div>

            <Link to="/study-tips" className="text-gray-700 hover:text-primary font-medium transition">
              Study Tips
            </Link>

            <Link to="/contact" className="text-gray-700 hover:text-primary font-medium transition">
              Contact
            </Link>

            <Link to="/admin" className="text-gray-700 hover:text-primary font-medium transition">
              Admin
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-gray-700">
            ☰
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden mt-4 flex">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="px-4 py-2 bg-primary text-white rounded-r-lg hover:bg-blue-700 transition">
            🔍
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
