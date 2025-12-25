import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { getNotes } from '../api';

/**
 * Past Papers Page - Archive of past examination papers
 */
const PastPapers = () => {
  const [pastNotes, setPastNotes] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getNotes();
        const notes = res.data || [];
        const past = notes.filter(n => {
          const typeName = n.documentTypeId?.name || '';
          return typeName.toLowerCase().includes('past') || (n.title || '').toLowerCase().includes('past');
        });
        setPastNotes(past);
        const yrs = Array.from(new Set(past.map(n => n.year).filter(Boolean))).sort((a,b)=>b-a);
        setYears(yrs);
      } catch (e) {
        console.error('Failed to load past papers from backend:', e);
      }
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            📄 Past Papers Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Download and practice with past examination papers from previous years. 
            All papers include solutions and marking schemes.
          </p>
        </div>

        {/* Papers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pastNotes.length === 0 ? (
            <div className="col-span-4 text-center text-gray-500">No past papers found</div>
          ) : (
            pastNotes.map(note => (
              <Card key={note._id} title={note.title} description={note.chapterId?.name || ''} icon={'📝'} link={note.pdfUrl} />
            ))
          )}
        </div>

        {/* Sample Papers Section */}
        <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Available Years
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {years.length === 0 ? (
              <div className="col-span-6 text-center text-gray-500">No years available</div>
            ) : (
              years.map((year) => (
                <div
                  key={year}
                  className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-4 text-center border-2 border-blue-200 hover:border-primary transition cursor-pointer"
                >
                  <div className="text-2xl font-bold text-primary">{year}</div>
                  <div className="text-xs text-gray-600 mt-1">Available</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="font-bold text-lg mb-2">Solved Papers</h3>
            <p className="text-gray-600 text-sm">Complete solutions with explanations</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-3">📥</div>
            <h3 className="font-bold text-lg mb-2">Downloadable PDFs</h3>
            <p className="text-gray-600 text-sm">Download and study offline</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-bold text-lg mb-2">Board Specific</h3>
            <p className="text-gray-600 text-sm">Papers from all major boards</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastPapers;
