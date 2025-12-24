import React, { useState, useEffect } from 'react';
import {
  getClasses, createClass, deleteClass,
  getSubjects, createSubject, deleteSubject,
  getChapters, createChapter, deleteChapter,
  getNotes, uploadNote, deleteNote,
  getEntranceExams, uploadEntranceExam, deleteEntranceExam
} from '../api';

const Admin = () => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [notes, setNotes] = useState([]);
  const [entranceExams, setEntranceExams] = useState([]);

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
  const [newExamName, setNewExamName] = useState('');
  const [examPdfFile, setExamPdfFile] = useState(null);

  useEffect(() => {
    fetchClasses();
    fetchSubjects();
    fetchNotes();
    fetchChapters();
    fetchEntranceExams();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await getClasses();
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await getSubjects();
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const fetchNotes = async () => {
    try {
      const response = await getNotes();
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const fetchChapters = async () => {
    try {
      const response = await getChapters();
      setChapters(response.data);
    } catch (error) {
      console.error('Error fetching chapters:', error);
    }
  };

  const fetchEntranceExams = async () => {
    try {
      const response = await getEntranceExams();
      setEntranceExams(response.data);
    } catch (error) {
      console.error('Error fetching entrance exams:', error);
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
    if (!selectedChapter) {
      alert('Please select a chapter first');
      return;
    }
    if (!pdfFile) {
      alert('Please select a PDF file to upload');
      return;
    }
    try {
      // Find the chapter to get subjectId
      const chapter = chapters.find(c => c._id === selectedChapter);
      if (!chapter) {
        alert('Selected chapter not found. Please try again.');
        return;
      }

      const formData = new FormData();
      formData.append('pdf', pdfFile);
      formData.append('title', noteTitle || pdfFile.name);
      formData.append('chapterId', selectedChapter);
      formData.append('subjectId', chapter.subjectId._id);

      const response = await uploadNote(formData);
      alert('Note uploaded successfully!');
      setNoteTitle('');
      setPdfFile(null);
      // Clear the file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
      fetchNotes();
    } catch (error) {
      console.error('Error uploading note:', error);
      alert('Error uploading note: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDeleteClass = async (id) => {
    try {
      await deleteClass(id);
      fetchClasses();
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  const handleDeleteSubject = async (id) => {
    try {
      await deleteSubject(id);
      fetchSubjects();
    } catch (error) {
      console.error('Error deleting subject:', error);
    }
  };

  const handleDeleteChapter = async (id) => {
    try {
      await deleteChapter(id);
      fetchChapters();
    } catch (error) {
      console.error('Error deleting chapter:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
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
        fetchEntranceExams();
      } catch (error) {
        console.error('Error uploading entrance exam:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>

      {/* Add Class */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add Class</h2>
        <input
          type="text"
          value={newClass}
          onChange={(e) => setNewClass(e.target.value)}
          placeholder="Class Name"
          className="border p-2 mr-2"
        />
        <button onClick={addClass} className="bg-blue-500 text-white px-4 py-2">Add Class</button>
      </div>

      {/* List Classes */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Classes</h2>
        <ul>
          {classes.map(cls => (
            <li key={cls._id} className="mb-2 flex justify-between items-center">
              <span>{cls.name}</span>
              <button onClick={() => handleDeleteClass(cls._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Add Subject */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add Subject</h2>
        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="border p-2 mr-2">
          <option value="">Select Class</option>
          {classes.map(cls => (
            <option key={cls._id} value={cls._id}>{cls.name}</option>
          ))}
        </select>
        <input
          type="text"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          placeholder="Subject Name"
          className="border p-2 mr-2"
        />
        <button onClick={addSubject} className="bg-blue-500 text-white px-4 py-2">Add Subject</button>
      </div>

      {/* Add Chapter */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add Chapter</h2>
        <select value={selectedClassForChapter} onChange={(e) => { setSelectedClassForChapter(e.target.value); setSelectedSubjectForChapter(''); }} className="border p-2 mr-2">
          <option value="">Select Class</option>
          {classes.map(cls => (
            <option key={cls._id} value={cls._id}>{cls.name}</option>
          ))}
        </select>
        <select value={selectedSubjectForChapter} onChange={(e) => setSelectedSubjectForChapter(e.target.value)} className="border p-2 mr-2" disabled={!selectedClassForChapter}>
          <option value="">Select Subject</option>
          {subjects.filter(sub => sub.classId._id === selectedClassForChapter).map(sub => (
            <option key={sub._id} value={sub._id}>{sub.name}</option>
          ))}
        </select>
        <input
          type="text"
          value={newChapter}
          onChange={(e) => setNewChapter(e.target.value)}
          placeholder="Chapter Name"
          className="border p-2 mr-2"
        />
        <button onClick={addChapter} className="bg-blue-500 text-white px-4 py-2">Add Chapter</button>
      </div>

      {/* List Subjects */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Subjects</h2>
        {classes.map(cls => (
          <div key={cls._id} className="mb-4">
            <h3 className="text-xl font-medium">{cls.name}</h3>
            <ul>
              {subjects.filter(sub => sub.classId._id === cls._id).map(sub => (
                <li key={sub._id} className="ml-4 mb-2 flex justify-between items-center">
                  <span>{sub.name}</span>
                  <button onClick={() => handleDeleteSubject(sub._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* List Chapters */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Chapters</h2>
        {subjects.map(sub => (
          <div key={sub._id} className="mb-4">
            <h3 className="text-xl font-medium">{sub.name}</h3>
            <ul>
              {chapters.filter(ch => ch.subjectId._id === sub._id).map(ch => (
                <li key={ch._id} className="ml-4 mb-2 flex justify-between items-center">
                  <span>{ch.name}</span>
                  <button onClick={() => handleDeleteChapter(ch._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add Notes</h2>
        <select value={selectedSubject} onChange={(e) => { setSelectedSubject(e.target.value); setSelectedChapter(''); }} className="border p-2 mr-2">
          <option value="">Select Subject</option>
          {subjects.map(sub => (
            <option key={sub._id} value={sub._id}>{sub.name}</option>
          ))}
        </select>
        <select value={selectedChapter} onChange={(e) => setSelectedChapter(e.target.value)} className="border p-2 mr-2" disabled={!selectedSubject}>
          <option value="">Select Chapter</option>
          {chapters.filter(ch => ch.subjectId._id === selectedSubject).map(ch => (
            <option key={ch._id} value={ch._id}>{ch.name}</option>
          ))}
        </select>
        <input
          type="text"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          placeholder="Title (optional)"
          className="border p-2 mr-2"
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            console.log('File input changed:', e.target.files);
            setPdfFile(e.target.files[0]);
            console.log('pdfFile set to:', e.target.files[0]);
          }}
          className="border p-2 mr-2"
        />
        {pdfFile && <span className="text-sm text-gray-600 mr-2">Selected: {pdfFile.name}</span>}
        <button onClick={addNote} className="bg-blue-500 text-white px-4 py-2">Add Note</button>
      </div>

      {/* List Notes */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Notes</h2>
        {chapters.map(ch => {
          const subject = subjects.find(s => s._id === ch.subjectId._id);
          return (
            <div key={ch._id} className="mb-4">
              <h3 className="text-xl font-medium">{subject ? `${subject.name} - ${ch.name}` : ch.name}</h3>
              <div className="ml-4">
                {notes.filter(n => n.chapterId === ch._id.toString()).map(note => (
                  <div key={note._id} className="mb-2 flex justify-between items-center">
                    <span>{note.title}</span>
                    <button onClick={() => handleDeleteNote(note._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Entrance Exam */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add Entrance Exam</h2>
        <input
          type="text"
          value={newExamName}
          onChange={(e) => setNewExamName(e.target.value)}
          placeholder="Exam Name"
          className="border p-2 mr-2"
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setExamPdfFile(e.target.files[0])}
          className="border p-2 mr-2"
        />
        <button onClick={addEntranceExam} className="bg-blue-500 text-white px-4 py-2">Add Exam</button>
      </div>
    </div>
  );
};

export default Admin;