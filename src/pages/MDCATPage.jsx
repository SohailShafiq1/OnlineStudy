import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import PDFViewer from '../components/PDFViewer';

/**
 * MDCAT Page - Medical and Dental College Admission Test preparation
 */
const MDCATPage = () => {
  const sections = [
    { title: 'Biology', icon: '🧬', description: 'Complete biology preparation', link: '/entrance-exams/mdcat/biology' },
    { title: 'Physics', icon: '⚛️', description: 'Physics concepts and numericals', link: '/entrance-exams/mdcat/physics' },
    { title: 'Chemistry', icon: '🧪', description: 'Organic and inorganic chemistry', link: '/entrance-exams/mdcat/chemistry' },
    { title: 'English', icon: '📖', description: 'Vocabulary and comprehension', link: '/entrance-exams/mdcat/english' },
  ];

  const resources = [
    { title: 'MDCAT Syllabus', icon: '📋', link: '/entrance-exams/mdcat/syllabus' },
    { title: 'Past Papers', icon: '📝', link: '/past-papers/mdcat' },
    { title: 'MCQs Bank', icon: '✍️', link: '/mcqs/mdcat' },
    { title: 'Study Timetable', icon: '📅', link: '/entrance-exams/mdcat/timetable' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🎓 MDCAT Preparation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete preparation material for Medical and Dental College Admission Test. 
            Notes, MCQs, past papers, and study plans to help you succeed.
          </p>
        </div>

        {/* Subjects Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            📚 Subjects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {sections.map((section, index) => (
              <Card
                key={index}
                title={section.title}
                description={section.description}
                icon={section.icon}
                link={section.link}
              />
            ))}
          </div>
        </div>

        {/* Resources Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            📖 Study Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {resources.map((resource, index) => (
              <Card
                key={index}
                title={resource.title}
                icon={resource.icon}
                link={resource.link}
              />
            ))}
          </div>
        </div>

        {/* Syllabus PDF */}
        <div className="max-w-5xl mx-auto mb-12">
          <PDFViewer 
            pdfUrl="/mdcat-syllabus.pdf"
            title="MDCAT Complete Syllabus 2024"
          />
        </div>

        {/* Preparation Tips */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              💡 MDCAT Preparation Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-lg mb-3 text-primary">🎯 Study Strategy</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Start preparation 6-8 months before exam</li>
                  <li>• Focus on FSc syllabus thoroughly</li>
                  <li>• Practice MCQs daily (50-100 questions)</li>
                  <li>• Solve at least 10 past papers</li>
                  <li>• Time management is crucial</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-3 text-secondary">📊 Subject Weightage</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Biology: 88 MCQs (most important)</li>
                  <li>• Chemistry: 56 MCQs</li>
                  <li>• Physics: 56 MCQs</li>
                  <li>• English: 30 MCQs</li>
                  <li>• Total: 200 MCQs in 210 minutes</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Recommended Books */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg shadow-md p-8 mt-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              📚 Recommended Books
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-bold mb-2">Biology</h4>
                <p className="text-sm text-gray-600">FSc Biology (Punjab Board) + Kips MDCAT</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-bold mb-2">Chemistry</h4>
                <p className="text-sm text-gray-600">FSc Chemistry + Advanced Publishers</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-bold mb-2">Physics</h4>
                <p className="text-sm text-gray-600">FSc Physics + Conceptual Physics</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-bold mb-2">English</h4>
                <p className="text-sm text-gray-600">Vocabulary Builder + Grammar Guide</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MDCATPage;
