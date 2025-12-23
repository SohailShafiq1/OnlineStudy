import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Admin = () => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [notes, setNotes] = useState([]);
  const [entranceExams, setEntranceExams] = useState([]);

  const [newClass, setNewClass] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [noteType, setNoteType] = useState('chapter');
  const [noteTitle, setNoteTitle] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [newExamName, setNewExamName] = useState('');
  const [examPdfFile, setExamPdfFile] = useState(null);

  useEffect(() => {
    fetchClasses();
    fetchSubjects();
    fetchNotes();
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

  const uploadPdf = async (file) => {
    const storageRef = ref(storage, `pdfs/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const addNote = async () => {
    if (selectedSubject && pdfFile) {
      const pdfUrl = await uploadPdf(pdfFile);
      await addDoc(collection(db, 'notes'), {
        subjectId: selectedSubject,
        type: noteType,
        title: noteTitle || file.name,
        pdfUrl
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

  const deleteNote = async (id) => {
    await deleteDoc(doc(db, 'notes', id));
    fetchNotes();
  };

  const deleteEntranceExam = async (id) => {
    await deleteDoc(doc(db, 'entranceExams', id));
    fetchEntranceExams();
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

      {/* List Notes */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Notes</h2>
        {subjects.map(sub => (
          <div key={sub.id} className="mb-4">
            <h3 className="text-xl font-medium">{sub.name}</h3>
            <div className="ml-4">
              {notes.filter(n => n.subjectId === sub.id).map(note => (
                <div key={note.id} className="mb-2 flex justify-between items-center">
                  <span>{note.title} ({note.type})</span>
                  <button onClick={() => deleteNote(note.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </div>
              ))}
            </div>
          </div>
        ))}
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

      {/* List Entrance Exams */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Entrance Exams</h2>
        <ul>
          {entranceExams.map(exam => (
            <li key={exam.id} className="mb-2 flex justify-between items-center">
              <span>{exam.name}</span>
              <button onClick={() => deleteEntranceExam(exam.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;