import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Notes from './pages/Notes';
import PastPapers from './pages/PastPapers';
import MCQs from './pages/MCQs';
import StudyTips from './pages/StudyTips';
import Contact from './pages/Contact';

// Class and Subject Pages
import ClassPage from './pages/ClassPage';
import SubjectPage from './pages/SubjectPage';
import ChapterPage from './pages/ChapterPage';

// Entrance Exam Pages
import MDCATPage from './pages/MDCATPage';
import NUMSPage from './pages/NUMSPage';
import EntranceExams from './pages/EntranceExams';

// Admin Page
import Admin from './pages/Admin';

/**
 * Main App Component
 * Sets up routing for the entire application
 */
function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/past-papers" element={<PastPapers />} />
            <Route path="/mcqs" element={<MCQs />} />
            <Route path="/study-tips" element={<StudyTips />} />
            <Route path="/contact" element={<Contact />} />

            {/* Class Pages - Dynamic routing for 9th, 10th, 11th, 12th */}
            <Route path="/classes/:classId" element={<ClassPage />} />
            
            {/* Subject Pages - Dynamic routing for subjects within each class */}
            <Route path="/classes/:classId/:subjectId" element={<SubjectPage />} />
            
            {/* Chapter Pages - Individual chapter notes */}
            <Route path="/classes/:classId/:subjectId/:chapterId" element={<ChapterPage />} />

            {/* Entrance Exam Pages */}
            <Route path="/entrance-exams" element={<EntranceExams />} />
            <Route path="/entrance-exams/mdcat" element={<MDCATPage />} />
            <Route path="/entrance-exams/nums" element={<NUMSPage />} />
            
            {/* Admin Panel */}
            <Route path="/admin" element={<Admin />} />
            
            {/* Entrance Exam Subject Pages (can be expanded) */}
            <Route path="/entrance-exams/:examId/:subjectId" element={<SubjectPage />} />

            {/* Past Papers by Category */}
            <Route path="/past-papers/:categoryId" element={<PastPapers />} />
            
            {/* MCQs by Category */}
            <Route path="/mcqs/:categoryId" element={<MCQs />} />

            {/* Study Tips Individual Posts */}
            <Route path="/study-tips/:postId" element={<StudyTips />} />

            {/* Legal Pages (can be created later) */}
            <Route path="/privacy-policy" element={<Contact />} />
            <Route path="/disclaimer" element={<Contact />} />
            <Route path="/terms-of-service" element={<Contact />} />

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

/**
 * 404 Not Found Page Component
 */
const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-block px-8 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default App;
