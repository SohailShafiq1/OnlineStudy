import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
    const querySnapshot = await getDocs(collection(db, 'classes'));
    setClasses(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const fetchSubjects = async () => {
    const querySnapshot = await getDocs(collection(db, 'subjects'));
    setSubjects(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const fetchNotes = async () => {
    const querySnapshot = await getDocs(collection(db, 'notes'));
    setNotes(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const fetchChapters = async () => {
    const querySnapshot = await getDocs(collection(db, 'chapters'));
    setChapters(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const fetchEntranceExams = async () => {
    const querySnapshot = await getDocs(collection(db, 'entranceExams'));
    setEntranceExams(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const addClass = async () => {
    if (newClass) {
      await addDoc(collection(db, 'classes'), { name: newClass });
      setNewClass('');
      fetchClasses();
    }
  };

  const addSubject = async () => {
    if (newSubject && selectedClass) {
      await addDoc(collection(db, 'subjects'), { name: newSubject, classId: selectedClass });
      setNewSubject('');
      fetchSubjects();
    }
  };

  const addChapter = async () => {
    if (newChapter && selectedSubjectForChapter) {
      await addDoc(collection(db, 'chapters'), { name: newChapter, subjectId: selectedSubjectForChapter });
      setNewChapter('');
      fetchChapters();
    }
  };

  const uploadPdf = async (file, classId = null, subjectId = null) => {
    let folder = 'pdfs/';
    if (classId && subjectId) {
      folder = `classes/${classId}/subjects/${subjectId}/`;
    } else if (classId) {
      folder = `classes/${classId}/`;
    }
    const storageRef = ref(storage, `${folder}${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const addNote = async () => {
    if (selectedChapter && pdfFile) {
      // Find the chapter to get subjectId and classId
      const chapter = chapters.find(c => c.id === selectedChapter);
      if (!chapter) return;
      const subject = subjects.find(s => s.id === chapter.subjectId);
      if (!subject) return;

      const pdfUrl = await uploadPdf(pdfFile, subject.classId, chapter.subjectId);
      await addDoc(collection(db, 'notes'), {
        chapterId: selectedChapter,
        subjectId: chapter.subjectId,
        title: noteTitle || pdfFile.name,
        pdfUrl,
        filename: pdfFile.name,
        path: `classes/${subject.classId}/subjects/${chapter.subjectId}/${pdfFile.name}`
      });
      setNoteTitle('');
      setPdfFile(null);
      fetchNotes();
    }
  };

  const deleteClass = async (id) => {
    await deleteDoc(doc(db, 'classes', id));
    fetchClasses();
  };

  const deleteSubject = async (id) => {
    await deleteDoc(doc(db, 'subjects', id));
    fetchSubjects();
  };

  const deleteChapter = async (id) => {
    await deleteDoc(doc(db, 'chapters', id));
    fetchChapters();
  };

  const deleteNote = async (id) => {
    await deleteDoc(doc(db, 'notes', id));
    fetchNotes();
  };

  const addEntranceExam = async () => {
    if (newExamName && examPdfFile) {
      const pdfUrl = await uploadPdf(examPdfFile);
      await addDoc(collection(db, 'entranceExams'), {
        name: newExamName,
        pdfUrl
      });
      setNewExamName('');
      setExamPdfFile(null);
      fetchEntranceExams();
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
            <li key={cls.id} className="mb-2 flex justify-between items-center">
              <span>{cls.name}</span>
              <button onClick={() => deleteClass(cls.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
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
            <option key={cls.id} value={cls.id}>{cls.name}</option>
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
            <option key={cls.id} value={cls.id}>{cls.name}</option>
          ))}
        </select>
        <select value={selectedSubjectForChapter} onChange={(e) => setSelectedSubjectForChapter(e.target.value)} className="border p-2 mr-2" disabled={!selectedClassForChapter}>
          <option value="">Select Subject</option>
          {subjects.filter(sub => sub.classId === selectedClassForChapter).map(sub => (
            <option key={sub.id} value={sub.id}>{sub.name}</option>
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
          <div key={cls.id} className="mb-4">
            <h3 className="text-xl font-medium">{cls.name}</h3>
            <ul>
              {subjects.filter(sub => sub.classId === cls.id).map(sub => (
                <li key={sub.id} className="ml-4 mb-2 flex justify-between items-center">
                  <span>{sub.name}</span>
                  <button onClick={() => deleteSubject(sub.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
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
          <div key={sub.id} className="mb-4">
            <h3 className="text-xl font-medium">{sub.name}</h3>
            <ul>
              {chapters.filter(ch => ch.subjectId === sub.id).map(ch => (
                <li key={ch.id} className="ml-4 mb-2 flex justify-between items-center">
                  <span>{ch.name}</span>
                  <button onClick={() => deleteChapter(ch.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
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
            <option key={sub.id} value={sub.id}>{sub.name}</option>
          ))}
        </select>
        <select value={selectedChapter} onChange={(e) => setSelectedChapter(e.target.value)} className="border p-2 mr-2" disabled={!selectedSubject}>
          <option value="">Select Chapter</option>
          {chapters.filter(ch => ch.subjectId === selectedSubject).map(ch => (
            <option key={ch.id} value={ch.id}>{ch.name}</option>
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
          onChange={(e) => setPdfFile(e.target.files[0])}
          className="border p-2 mr-2"
        />
        <button onClick={addNote} className="bg-blue-500 text-white px-4 py-2">Add Note</button>
      </div>

      {/* List Notes */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Notes</h2>
        {chapters.map(ch => {
          const subject = subjects.find(s => s.id === ch.subjectId);
          return (
            <div key={ch.id} className="mb-4">
              <h3 className="text-xl font-medium">{subject ? `${subject.name} - ${ch.name}` : ch.name}</h3>
              <div className="ml-4">
                {notes.filter(n => n.chapterId === ch.id).map(note => (
                  <div key={note.id} className="mb-2 flex justify-between items-center">
                    <span>{note.title}</span>
                    <button onClick={() => deleteNote(note.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
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