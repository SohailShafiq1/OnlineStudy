import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Classes
export const getClasses = () => api.get('/classes');
export const createClass = (data) => api.post('/classes', data);
export const deleteClass = (id) => api.delete(`/classes/${id}`);

// Subjects
export const getSubjects = () => api.get('/subjects');
export const createSubject = (data) => api.post('/subjects', data);
export const deleteSubject = (id) => api.delete(`/subjects/${id}`);

// Chapters
export const getChapters = () => api.get('/chapters');
export const createChapter = (data) => api.post('/chapters', data);
export const deleteChapter = (id) => api.delete(`/chapters/${id}`);

// Notes
export const getNotes = () => api.get('/notes');
export const uploadNote = (formData) => {
  return api.post('/notes', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const deleteNote = (id) => api.delete(`/notes/${id}`);

// Entrance Exams
export const getEntranceExams = () => api.get('/entrance-exams');
export const uploadEntranceExam = (formData) => {
  return api.post('/entrance-exams', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const deleteEntranceExam = (id) => api.delete(`/entrance-exams/${id}`);

// Document Types
export const getDocumentTypes = () => api.get('/document-types');
export const createDocumentType = (data) => api.post('/document-types', data);
export const deleteDocumentType = (id) => api.delete(`/document-types/${id}`);

export default api;