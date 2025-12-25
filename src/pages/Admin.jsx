import React, { useState, useEffect, useRef } from 'react';
import {
  getClasses, createClass, deleteClass,
  getSubjects, createSubject, deleteSubject,
  getChapters, createChapter, deleteChapter,
  getNotes, uploadNote, deleteNote,
  getEntranceExams, uploadEntranceExam, deleteEntranceExam,
  getDocumentTypes, createDocumentType
} from '../api';

const Admin = () => {
  // Data States
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [notes, setNotes] = useState([]);
  const [entranceExams, setEntranceExams] = useState([]);

  // Input States
  const [newClass, setNewClass] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [newChapter, setNewChapter] = useState('');
  const [selectedClassForChapter, setSelectedClassForChapter] = useState('');
  const [selectedSubjectForChapter, setSelectedSubjectForChapter] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [pastTitle, setPastTitle] = useState('');
  const [pastPdfFile, setPastPdfFile] = useState(null);
  const [pastYear, setPastYear] = useState('');
  const pastFileInputRef = useRef(null);
  const [newExamName, setNewExamName] = useState('');
  const [examPdfFile, setExamPdfFile] = useState(null);

  // Refs for file inputs
  const noteFileInputRef = useRef(null);
  const examFileInputRef = useRef(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = () => {
    fetchClasses();
    fetchSubjects();
    fetchChapters();
    fetchNotes();
    fetchEntranceExams();
    fetchDocumentTypes();
  };

  const fetchClasses = async () => {
    try {
      const response = await getClasses();
      setClasses(response.data || []);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await getSubjects();
      setSubjects(response.data || []);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const fetchChapters = async () => {
    try {
      const response = await getChapters();
      setChapters(response.data || []);
    } catch (error) {
      console.error('Error fetching chapters:', error);
    }
  };

  const fetchNotes = async () => {
    try {
      const response = await getNotes();
      setNotes(response.data || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const fetchEntranceExams = async () => {
    try {
      const response = await getEntranceExams();
      setEntranceExams(response.data || []);
    } catch (error) {
      console.error('Error fetching entrance exams:', error);
    }
  };

  const fetchDocumentTypes = async () => {
    try {
      const res = await getDocumentTypes();
      setDocumentTypes(res.data || []);
    } catch (error) {
      console.error('Error fetching document types:', error);
    }
  };

  const addClass = async () => {
    if (newClass) {
      try {
        await createClass({ name: newClass });
        setNewClass('');
        fetchClasses();
      } catch (error) {
        console.error('Error adding class:', error);
      }
    }
  };

  const addSubject = async () => {
    if (newSubject && selectedClass) {
      try {
        await createSubject({ name: newSubject, classId: selectedClass });
        setNewSubject('');
        fetchSubjects();
      } catch (error) {
        console.error('Error adding subject:', error);
      }
    }
  };

  const addChapter = async () => {
    if (newChapter && selectedSubjectForChapter) {
      try {
        await createChapter({ name: newChapter, subjectId: selectedSubjectForChapter });
        setNewChapter('');
        fetchChapters();
      } catch (error) {
        console.error('Error adding chapter:', error);
      }
    }
  };

  const addNote = async () => {
    if (!selectedChapter || !pdfFile) {
      alert('Please select a chapter and a PDF file');
      return;
    }
    try {
      const chapter = chapters.find(c => c._id.toString() === selectedChapter.toString());
      if (!chapter) return;

      const formData = new FormData();
      formData.append('pdf', pdfFile);
      formData.append('title', noteTitle || pdfFile.name);
      formData.append('chapterId', selectedChapter);
      
      // Handle both populated and unpopulated subjectId
      const subId = typeof chapter.subjectId === 'object' ? chapter.subjectId._id : chapter.subjectId;
      formData.append('subjectId', subId);

      await uploadNote(formData);
      alert('Note uploaded successfully!');
      setNoteTitle('');
      setPdfFile(null);
      if (noteFileInputRef.current) noteFileInputRef.current.value = '';
      fetchNotes();
    } catch (error) {
      console.error('Error uploading note:', error);
    }
  };

  const addEntranceExam = async () => {
    if (newExamName && examPdfFile) {
      try {
        const formData = new FormData();
        formData.append('pdf', examPdfFile);
        formData.append('name', newExamName);

        await uploadEntranceExam(formData);
        setNewExamName('');
        setExamPdfFile(null);
        if (examFileInputRef.current) examFileInputRef.current.value = '';
        fetchEntranceExams();
      } catch (error) {
        console.error('Error uploading entrance exam:', error);
      }
    }
  };

  const ensurePastDocType = async (chapterId) => {
    // look for existing document type named 'Past Paper' for this chapter
    try {
      const existing = documentTypes.find(dt => dt.name.toLowerCase() === 'past paper' && ((dt.chapterId?._id || dt.chapterId) === chapterId));
      if (existing) return existing._id;
      const res = await createDocumentType({ name: 'Past Paper', chapterId });
      // refresh document types
      fetchDocumentTypes();
      return res.data._id;
    } catch (error) {
      console.error('Error ensuring Past Paper document type:', error);
      throw error;
    }
  };

  const addPastPaper = async () => {
    if (!selectedChapter || !pastPdfFile) {
      alert('Select a chapter and choose a PDF for the past paper');
      return;
    }
    try {
      const chapter = chapters.find(c => c._id.toString() === selectedChapter.toString());
      if (!chapter) return;
      const subId = typeof chapter.subjectId === 'object' ? chapter.subjectId._id : chapter.subjectId;
      const docTypeId = await ensurePastDocType(selectedChapter);

      const formData = new FormData();
      formData.append('pdf', pastPdfFile);
      formData.append('title', pastTitle || pastPdfFile.name);
      formData.append('chapterId', selectedChapter);
      formData.append('subjectId', subId);
      formData.append('documentTypeId', docTypeId);
      if (pastYear) formData.append('year', pastYear);

      await uploadNote(formData);
      alert('Past paper uploaded successfully');
      setPastTitle('');
      setPastPdfFile(null);
      setPastYear('');
      if (pastFileInputRef.current) pastFileInputRef.current.value = '';
      fetchNotes();
    } catch (error) {
      console.error('Error adding past paper:', error);
      alert('Failed to upload past paper');
    }
  };

  const handleDeleteClass = async (id) => {
    if (!window.confirm('Delete this class?')) return;
    try {
      await deleteClass(id);
      setClasses(prev => prev.filter(c => c._id !== id));
      // also remove related subjects/chapters/notes locally
      setSubjects(prev => prev.filter(s => (s.classId?._id || s.classId) !== id));
      setChapters(prev => prev.filter(ch => {
        const sid = typeof ch.subjectId === 'object' ? ch.subjectId._id : ch.subjectId;
        return subjects.findIndex(s => (s._id === sid && (s.classId?._id || s.classId) === id)) === -1;
      }));
      fetchAllData();
    } catch (error) {
      console.error('Error deleting class:', error);
      alert('Failed to delete class: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDeleteSubject = async (id) => {
    if (!window.confirm('Delete this subject?')) return;
    try {
      await deleteSubject(id);
      setSubjects(prev => prev.filter(s => s._id !== id));
      setChapters(prev => prev.filter(ch => (ch.subjectId?._id || ch.subjectId) !== id));
      fetchChapters();
    } catch (error) {
      console.error('Error deleting subject:', error);
      alert('Failed to delete subject: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDeleteChapter = async (id) => {
    if (!window.confirm('Delete this chapter?')) return;
    try {
      await deleteChapter(id);
      setChapters(prev => prev.filter(ch => ch._id !== id));
      setNotes(prev => prev.filter(n => n.chapterId !== id));
      fetchNotes();
    } catch (error) {
      console.error('Error deleting chapter:', error);
      alert('Failed to delete chapter: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDeleteNote = async (id) => {
    if (!window.confirm('Delete this note?')) return;
    try {
      await deleteNote(id);
      setNotes(prev => prev.filter(n => n._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Failed to delete note: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDeleteEntranceExam = async (id) => {
    if (!window.confirm('Delete this exam?')) return;
    try {
      await deleteEntranceExam(id);
      setEntranceExams(prev => prev.filter(e => e._id !== id));
    } catch (error) {
      console.error('Error deleting entrance exam:', error);
      alert('Failed to delete exam: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage academic structure and content</p>
            </div>
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <span className="text-sm font-medium text-blue-700">Study with Maryam</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Structure Management */}
          <div className="space-y-8">
            {/* Add Class Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="bg-blue-100 p-2 rounded-lg mr-3 text-blue-600">🏫</span>
                Add New Class
              </h2>
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={newClass}
                  onChange={(e) => setNewClass(e.target.value)}
                  placeholder="e.g. Class 10"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button onClick={addClass} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                  Add Class
                </button>
              </div>
            </div>

            {/* List Classes Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Existing Classes</h2>
              <div className="space-y-2">
                {classes.map(cls => (
                  <div key={cls._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="font-medium">{cls.name}</span>
                    <button onClick={() => handleDeleteClass(cls._id)} className="text-red-500 hover:bg-red-50 p-1 rounded">
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Subject Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Subject</h2>
              <div className="space-y-3">
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="">Select Class</option>
                  {classes.map(cls => <option key={cls._id} value={cls._id}>{cls.name}</option>)}
                </select>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    placeholder="Subject Name"
                    className="flex-1 px-4 py-2 border rounded-lg"
                  />
                  <button onClick={addSubject} disabled={!selectedClass} className="bg-purple-600 text-white px-6 py-2 rounded-lg disabled:opacity-50">
                    Add Subject
                  </button>
                </div>
              </div>
            </div>

            {/* Subject Management View */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Subject Library</h2>
              {classes.map(cls => (
                <div key={cls._id} className="mb-4">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">{cls.name}</h3>
                  <div className="space-y-2">
                    {subjects.filter(s => (s.classId?._id || s.classId) === cls._id).map(sub => (
                      <div key={sub._id} className="flex justify-between p-2 bg-purple-50 rounded border border-purple-100">
                        <span>{sub.name}</span>
                        <button onClick={() => handleDeleteSubject(sub._id)} className="text-red-400 text-xs">Delete</button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Content Management */}
          <div className="space-y-8">
            {/* Add Chapter Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Chapter</h2>
              <div className="space-y-3">
                <select
                  value={selectedClassForChapter}
                  onChange={(e) => setSelectedClassForChapter(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="">Select Class</option>
                  {classes.map(cls => <option key={cls._id} value={cls._id}>{cls.name}</option>)}
                </select>
                <select
                  value={selectedSubjectForChapter}
                  onChange={(e) => setSelectedSubjectForChapter(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled={!selectedClassForChapter}
                >
                  <option value="">Select Subject</option>
                  {subjects.filter(s => (s.classId?._id || s.classId) === selectedClassForChapter).map(sub => (
                    <option key={sub._id} value={sub._id}>{sub.name}</option>
                  ))}
                </select>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={newChapter}
                    onChange={(e) => setNewChapter(e.target.value)}
                    placeholder="Chapter Name"
                    className="flex-1 px-4 py-2 border rounded-lg"
                  />
                  <button onClick={addChapter} disabled={!selectedSubjectForChapter} className="bg-indigo-600 text-white px-6 py-2 rounded-lg">
                    Add Chapter
                  </button>
                </div>
              </div>
            </div>

            {/* Upload Notes Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Study Note (PDF)</h2>
              <div className="space-y-4">
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="">Select Subject</option>
                  {subjects.map(sub => <option key={sub._id} value={sub._id}>{sub.name}</option>)}
                </select>
                <select
                  value={selectedChapter}
                  onChange={(e) => setSelectedChapter(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled={!selectedSubject}
                >
                  <option value="">Select Chapter</option>
                  {chapters.filter(ch => (ch.subjectId?._id || ch.subjectId) === selectedSubject).map(ch => (
                    <option key={ch._id} value={ch._id}>{ch.name}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder="Note Title (Optional)"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="file"
                  ref={noteFileInputRef}
                  accept="application/pdf"
                  onChange={(e) => setPdfFile(e.target.files[0])}
                  className="w-full text-sm"
                />
                <button onClick={addNote} className="w-full bg-red-600 text-white py-3 rounded-lg font-bold">
                  🚀 Upload Note
                </button>
              </div>
            </div>

            {/* Notes Library List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Notes</h2>
              <div className="space-y-3">
                {notes.map(note => {
                  const chapter = chapters.find(ch => ch._id.toString() === note.chapterId?.toString());
                  return (
                    <div key={note._id} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                      <div>
                        <p className="font-bold text-gray-800">{note.title}</p>
                        <p className="text-xs text-gray-500 uppercase">{chapter?.name || 'Chapter Unknown'}</p>
                      </div>
                      <button onClick={() => handleDeleteNote(note._id)} className="text-red-600">Delete</button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Entrance Exams Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Entrance Exams</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  value={newExamName}
                  onChange={(e) => setNewExamName(e.target.value)}
                  placeholder="Exam Name (e.g. MDCAT 2024)"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="file"
                  ref={examFileInputRef}
                  accept="application/pdf"
                  onChange={(e) => setExamPdfFile(e.target.files[0])}
                  className="w-full text-sm"
                />
                <button onClick={addEntranceExam} className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold">
                  Upload Entrance Exam
                </button>
              </div>
            </div>

            {/* Past Papers Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Past Paper</h2>
              <div className="space-y-4">
                <select
                  value={selectedSubject}
                  onChange={(e) => { setSelectedSubject(e.target.value); setSelectedChapter(''); }}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="">Select Subject</option>
                  {subjects.map(sub => <option key={sub._id} value={sub._id}>{sub.name}</option>)}
                </select>
                <select
                  value={selectedChapter}
                  onChange={(e) => setSelectedChapter(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled={!selectedSubject}
                >
                  <option value="">Select Chapter</option>
                  {chapters.filter(ch => (ch.subjectId?._id || ch.subjectId) === selectedSubject).map(ch => (
                    <option key={ch._id} value={ch._id}>{ch.name}</option>
                  ))}
                </select>

                <input
                  type="text"
                  value={pastTitle}
                  onChange={(e) => setPastTitle(e.target.value)}
                  placeholder="Past Paper Title (e.g. MDCAT 2023 - Biology)"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  value={pastYear}
                  onChange={(e) => setPastYear(e.target.value)}
                  placeholder="Year (e.g. 2023)"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="file"
                  ref={pastFileInputRef}
                  accept="application/pdf"
                  onChange={(e) => setPastPdfFile(e.target.files[0])}
                  className="w-full text-sm"
                />
                <button onClick={addPastPaper} className="w-full bg-yellow-600 text-white py-3 rounded-lg font-bold">
                  Upload Past Paper
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;