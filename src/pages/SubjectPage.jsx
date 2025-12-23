import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

/**
 * SubjectPage Component - Shows chapters for a specific subject
 * Example: /classes/9th/biology
 */
const SubjectPage = () => {
  const { classId, subjectId } = useParams();
  const [notes, setNotes] = useState([]);
  const [subjectName, setSubjectName] = useState('Subject');

  useEffect(() => {
    const fetchNotes = async () => {
      const q = query(collection(db, 'notes'), where('subjectId', '==', subjectId));
      const querySnapshot = await getDocs(q);
      const nts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotes(nts);
    };
    fetchNotes();

    // Fetch subject name
    const fetchSubject = async () => {
      const q = query(collection(db, 'subjects'), where('__name__', '==', subjectId));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setSubjectName(querySnapshot.docs[0].data().name);
      }
    };
    fetchSubject();
  }, [subjectId]);

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
          <div className="text-6xl mb-4">📖</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {classId.toUpperCase()} Class {subjectName}
          </h1>
          <p className="text-xl text-gray-600">
            Complete chapter-wise notes, MCQs, and study material
          </p>
        </div>

        {/* Chapters List */}
        {notes.filter(n => n.type === 'chapter').length > 0 && (
          <div className="max-w-4xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              📑 Chapters
            </h2>
            <div className="space-y-4">
              {notes.filter(n => n.type === 'chapter').map((note) => (
                <div
                  key={note.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition border-l-4 border-primary"
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {note.title}
                      </h3>
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={note.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                      >
                        View PDF
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Past Papers */}
        {notes.filter(n => n.type === 'pastpaper').length > 0 && (
          <div className="max-w-4xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              📝 Past Papers
            </h2>
            <div className="space-y-4">
              {notes.filter(n => n.type === 'pastpaper').map((note) => (
                <div
                  key={note.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition border-l-4 border-green-500"
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {note.title}
                      </h3>
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={note.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                      >
                        View PDF
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Notes */}
        {notes.filter(n => n.type === 'other').length > 0 && (
          <div className="max-w-4xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              📚 Other Materials
            </h2>
            <div className="space-y-4">
              {notes.filter(n => n.type === 'other').map((note) => (
                <div
                  key={note.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition border-l-4 border-purple-500"
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {note.title}
                      </h3>
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={note.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
                      >
                        View PDF
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
