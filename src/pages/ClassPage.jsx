import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SubjectCard from '../components/SubjectCard';

/**
 * ClassPage Component - Template for individual class pages (9th, 10th, 11th, 12th)
 * Displays subjects available for each class
 */
const ClassPage = () => {
  const { classId } = useParams();

  // Class information
  const classInfo = {
    '9th': { title: '9th Class', fullName: 'Class 9 - Matric Part 1' },
    '10th': { title: '10th Class', fullName: 'Class 10 - Matric Part 2' },
    '11th': { title: '11th Class', fullName: '1st Year - FSc Part 1' },
    '12th': { title: '12th Class', fullName: '2nd Year - FSc Part 2' },
  };

  // Subjects for each class
  const subjects = [
    { name: 'English', icon: '📖', link: `/classes/${classId}/english`, description: 'Grammar, essays, and literature' },
    { name: 'Biology', icon: '🧬', link: `/classes/${classId}/biology`, description: 'Living organisms and life processes' },
    { name: 'Physics', icon: '⚛️', link: `/classes/${classId}/physics`, description: 'Matter, energy, and forces' },
    { name: 'Chemistry', icon: '🧪', link: `/classes/${classId}/chemistry`, description: 'Elements, compounds, and reactions' },
    { name: 'Mathematics', icon: '📐', link: `/classes/${classId}/mathematics`, description: 'Algebra, geometry, and calculus' },
    { name: 'Urdu', icon: '📚', link: `/classes/${classId}/urdu`, description: 'Urdu literature and grammar' },
    { name: 'Pakistan Studies', icon: '🇵🇰', link: `/classes/${classId}/pakistan-studies`, description: 'History and geography of Pakistan' },
    { name: 'Islamiyat', icon: '🕌', link: `/classes/${classId}/islamiyat`, description: 'Islamic studies' },
  ];

  const currentClass = classInfo[classId] || { title: 'Class', fullName: 'Class' };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            📚 {currentClass.fullName}
          </h1>
          <p className="text-xl text-gray-600">
            Complete study material for all subjects
          </p>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
          {subjects.map((subject, index) => (
            <SubjectCard
              key={index}
              subject={subject.name}
              icon={subject.icon}
              link={subject.link}
              description={subject.description}
            />
          ))}
        </div>

        {/* Quick Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Link to={`/past-papers/${classId}`} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition text-center">
            <div className="text-4xl mb-3">📝</div>
            <h3 className="text-xl font-bold mb-2">Past Papers</h3>
            <p className="text-gray-600 text-sm">Previous years exam papers</p>
          </Link>

          <Link to={`/mcqs/${classId}`} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition text-center">
            <div className="text-4xl mb-3">✍️</div>
            <h3 className="text-xl font-bold mb-2">MCQs Practice</h3>
            <p className="text-gray-600 text-sm">Multiple choice questions</p>
          </Link>

          <Link to="/study-tips" className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition text-center">
            <div className="text-4xl mb-3">💡</div>
            <h3 className="text-xl font-bold mb-2">Study Tips</h3>
            <p className="text-gray-600 text-sm">How to prepare effectively</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClassPage;
