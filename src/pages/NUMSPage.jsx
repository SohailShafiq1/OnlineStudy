import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import PDFViewer from '../components/PDFViewer';

/**
 * NUMS Page - National University of Medical Sciences test preparation
 */
const NUMSPage = () => {
  const sections = [
    { title: 'Biology', icon: '🧬', description: 'Biology for NUMS test', link: '/entrance-exams/nums/biology' },
    { title: 'Physics', icon: '⚛️', description: 'Physics preparation', link: '/entrance-exams/nums/physics' },
    { title: 'Chemistry', icon: '🧪', description: 'Chemistry concepts', link: '/entrance-exams/nums/chemistry' },
    { title: 'English', icon: '📖', description: 'English comprehension', link: '/entrance-exams/nums/english' },
    { title: 'Intelligence', icon: '🧠', description: 'Logical reasoning', link: '/entrance-exams/nums/intelligence' },
  ];

  const resources = [
    { title: 'NUMS Syllabus', icon: '📋', link: '/entrance-exams/nums/syllabus' },
    { title: 'Past Papers', icon: '📝', link: '/past-papers/nums' },
    { title: 'MCQs Practice', icon: '✍️', link: '/mcqs/nums' },
    { title: 'Study Plan', icon: '📅', link: '/entrance-exams/nums/study-plan' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ⚕️ NUMS Test Preparation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete preparation guide for National University of Medical Sciences entrance test. 
            Comprehensive notes, practice tests, and study strategies.
          </p>
        </div>

        {/* Subjects Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            📚 Test Sections
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
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
            pdfUrl="/nums-syllabus.pdf"
            title="NUMS Complete Syllabus and Test Pattern"
          />
        </div>

        {/* Test Pattern */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              📊 NUMS Test Pattern
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="border p-3 text-left">Section</th>
                    <th className="border p-3 text-left">Questions</th>
                    <th className="border p-3 text-left">Marks</th>
                    <th className="border p-3 text-left">Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-3">Biology</td>
                    <td className="border p-3">60</td>
                    <td className="border p-3">60</td>
                    <td className="border p-3" rowSpan="5">180 min</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border p-3">Chemistry</td>
                    <td className="border p-3">50</td>
                    <td className="border p-3">50</td>
                  </tr>
                  <tr>
                    <td className="border p-3">Physics</td>
                    <td className="border p-3">40</td>
                    <td className="border p-3">40</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border p-3">English</td>
                    <td className="border p-3">30</td>
                    <td className="border p-3">30</td>
                  </tr>
                  <tr>
                    <td className="border p-3">Intelligence</td>
                    <td className="border p-3">20</td>
                    <td className="border p-3">20</td>
                  </tr>
                  <tr className="bg-primary text-white font-bold">
                    <td className="border p-3">Total</td>
                    <td className="border p-3">200</td>
                    <td className="border p-3">200</td>
                    <td className="border p-3">3 Hours</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Preparation Tips */}
          <div className="bg-gradient-to-br from-green-50 to-teal-100 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              💡 NUMS Preparation Strategy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3 text-primary">📖 Study Tips</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>✓ Complete FSc syllabus is the foundation</li>
                  <li>✓ Focus more on Biology (highest weightage)</li>
                  <li>✓ Practice intelligence/IQ questions daily</li>
                  <li>✓ Improve English vocabulary and grammar</li>
                  <li>✓ Solve numerical problems in Physics</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3 text-secondary">⏱️ Time Management</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>✓ Biology: 55-60 minutes</li>
                  <li>✓ Chemistry: 45-50 minutes</li>
                  <li>✓ Physics: 35-40 minutes</li>
                  <li>✓ English: 20-25 minutes</li>
                  <li>✓ Intelligence: 15-20 minutes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NUMSPage;
