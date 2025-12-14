import React from 'react';
import Card from '../components/Card';

/**
 * Notes Page - Main notes landing page
 * Shows cards for all classes and entrance exams
 */
const Notes = () => {
  const notesCategories = [
    { title: '9th Class Notes', icon: '📘', description: 'All subjects complete notes', link: '/classes/9th' },
    { title: '10th Class Notes', icon: '📗', description: 'Matric exam preparation', link: '/classes/10th' },
    { title: '11th Class Notes', icon: '📙', description: 'FSc Part 1 all subjects', link: '/classes/11th' },
    { title: '12th Class Notes', icon: '📕', description: 'FSc Part 2 complete notes', link: '/classes/12th' },
    { title: 'MDCAT Notes', icon: '🎓', description: 'Medical entrance preparation', link: '/entrance-exams/mdcat' },
    { title: 'NUMS Notes', icon: '⚕️', description: 'NUMS test preparation', link: '/entrance-exams/nums' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            📚 Study Notes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access comprehensive notes for all classes and entrance exams. 
            High-quality, exam-focused content to help you excel.
          </p>
        </div>

        {/* Notes Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {notesCategories.map((category, index) => (
            <Card
              key={index}
              title={category.title}
              description={category.description}
              icon={category.icon}
              link={category.link}
            />
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            📖 About Our Notes
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Complete chapter-wise notes for all subjects
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Written in simple and easy-to-understand language
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Includes important questions and key points
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Available in PDF format for download and printing
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Regular updates with latest syllabus changes
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notes;
