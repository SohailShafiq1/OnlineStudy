import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getChapters, getNotes } from '../api';

/**
 * SubjectPage Component - Shows chapters for a specific subject
 * Example: /classes/9th/biology
 */
const SubjectPage = () => {
  const { classId, subjectId } = useParams();
  const [chapters, setChapters] = useState([]);
  const [notes, setNotes] = useState([]);
  const [subjectName, setSubjectName] = useState('Subject');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch chapters
        const chaptersResponse = await getChapters();
        const filteredChapters = chaptersResponse.data.filter(chapter =>
          chapter.subjectId._id === subjectId || chapter.subjectId === subjectId
        );
        setChapters(filteredChapters);

        // Fetch notes
        const notesResponse = await getNotes();
        const filteredNotes = notesResponse.data.filter(note =>
          note.subjectId._id === subjectId || note.subjectId === subjectId
        );
        setNotes(filteredNotes);

        // Set subject name from the first note or chapter
        if (filteredChapters.length > 0) {
          setSubjectName(filteredChapters[0].subjectId.name);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
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
          <span className="text-gray-900 font-semibold">{subjectName}</span>
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
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            📑 Chapters
          </h2>
          <div className="space-y-4">
            {chapters.map((chapter) => {
              const chapterNotes = notes.filter(n => n.chapterId === chapter.id);
              return (
                <div
                  key={chapter.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition border-l-4 border-primary"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {chapter.name}
                    </h3>
                    {chapterNotes.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {chapterNotes.map((note) => (
                          <div key={note.id} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                            <span className="font-medium">{note.title}</span>
                            <a
                              href={note.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition font-semibold text-sm"
                            >
                              View PDF
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
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
