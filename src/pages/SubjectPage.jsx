import React from 'react';
import { useParams, Link } from 'react-router-dom';

/**
 * SubjectPage Component - Shows chapters for a specific subject
 * Example: /classes/9th/biology
 */
const SubjectPage = () => {
  const { classId, subjectId } = useParams();

  // Subject information
  const subjectInfo = {
    english: { name: 'English', icon: '📖' },
    biology: { name: 'Biology', icon: '🧬' },
    physics: { name: 'Physics', icon: '⚛️' },
    chemistry: { name: 'Chemistry', icon: '🧪' },
    mathematics: { name: 'Mathematics', icon: '📐' },
    urdu: { name: 'Urdu', icon: '📚' },
    'pakistan-studies': { name: 'Pakistan Studies', icon: '🇵🇰' },
    islamiyat: { name: 'Islamiyat', icon: '🕌' },
  };

  // Sample chapters (in real app, this would come from data/API)
  const chapters = [
    { number: 1, title: 'Introduction to Subject', hasNotes: true, hasMCQs: true },
    { number: 2, title: 'Fundamental Concepts', hasNotes: true, hasMCQs: true },
    { number: 3, title: 'Advanced Topics', hasNotes: true, hasMCQs: true },
    { number: 4, title: 'Practical Applications', hasNotes: true, hasMCQs: true },
    { number: 5, title: 'Problem Solving', hasNotes: true, hasMCQs: true },
    { number: 6, title: 'Review and Practice', hasNotes: true, hasMCQs: true },
  ];

  const subject = subjectInfo[subjectId] || { name: 'Subject', icon: '📚' };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to={`/classes/${classId}`} className="hover:text-primary">
            {classId.toUpperCase()} Class
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-semibold">{subject.name}</span>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">{subject.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {classId.toUpperCase()} Class {subject.name}
          </h1>
          <p className="text-xl text-gray-600">
            Complete chapter-wise notes, MCQs, and study material
          </p>
        </div>

        {/* Chapters List */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            📑 Chapters
          </h2>

          <div className="space-y-4">
            {chapters.map((chapter) => (
              <div
                key={chapter.number}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition border-l-4 border-primary"
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Chapter {chapter.number}: {chapter.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {chapter.hasNotes && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          📝 Notes Available
                        </span>
                      )}
                      {chapter.hasMCQs && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          ✍️ MCQs Available
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      to={`/classes/${classId}/${subjectId}/chapter-${chapter.number}`}
                      className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                    >
                      View Notes
                    </Link>
                    <Link
                      to={`/classes/${classId}/${subjectId}/chapter-${chapter.number}/mcqs`}
                      className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-green-700 transition font-semibold"
                    >
                      MCQs
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-3">📥</div>
            <h3 className="font-bold text-lg mb-2">Download All Notes</h3>
            <button className="mt-2 text-primary font-semibold hover:underline">
              Download PDF
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-3">📝</div>
            <h3 className="font-bold text-lg mb-2">Past Papers</h3>
            <Link to={`/past-papers/${classId}`} className="mt-2 text-primary font-semibold hover:underline block">
              View Papers
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-bold text-lg mb-2">Practice Tests</h3>
            <Link to={`/mcqs/${classId}`} className="mt-2 text-primary font-semibold hover:underline block">
              Start Practice
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;
