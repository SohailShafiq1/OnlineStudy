import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getClasses, getEntranceExams } from '../api';

/**
 * Header Component - Sticky Navigation Bar
 * Contains: Logo, Search Bar, Navigation Menu with Dropdowns
 */
const Header = () => {
  const [isClassesOpen, setIsClassesOpen] = useState(false);
  const [isExamsOpen, setIsExamsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [classes, setClasses] = useState([]);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cls = await getClasses();
        setClasses(cls.data || []);
      } catch (e) {
        console.error('Failed to load classes for header:', e);
      }
      try {
        const res = await getEntranceExams();
        setExams(res.data || []);
      } catch (e) {
        console.error('Failed to load entrance exams for header:', e);
      }
    };
    fetchData();
  }, []);

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
                  {classes.length === 0 ? (
                    <div className="px-4 py-2 text-sm text-gray-500">No classes</div>
                  ) : (
                    classes.map((c) => (
                      <Link key={c._id} to={`/classes/${c._id}`} className="block px-4 py-2 hover:bg-gray-100">{c.name}</Link>
                    ))
                  )}
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
                  {exams.length === 0 ? (
                    <div className="px-4 py-2 text-sm text-gray-500">No exams</div>
                  ) : (
                    exams.map((e) => (
                      <Link key={e._id} to={`/entrance-exams?examId=${e._id}`} className="block px-4 py-2 hover:bg-gray-100">{e.name}</Link>
                    ))
                  )}
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
