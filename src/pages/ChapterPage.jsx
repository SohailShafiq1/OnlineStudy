import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PDFViewer from '../components/PDFViewer';
import MCQItem from '../components/MCQItem';
import Button from '../components/Button';

/**
 * ChapterPage Component - Individual chapter notes page
 * Shows: PDF viewer, written notes, MCQs, navigation
 */
const ChapterPage = () => {
  const { classId, subjectId, chapterId } = useParams();

  // Extract chapter number from chapterId (e.g., "chapter-1" -> "1")
  const chapterNumber = chapterId.split('-')[1];

  // Sample chapter data (would come from API/database in real app)
  const chapterData = {
    title: `Chapter ${chapterNumber}: Introduction to Subject`,
    introduction: "This chapter covers the fundamental concepts and introduces key topics that will be explored in detail throughout the course.",
    content: `
      <h2>1. Overview</h2>
      <p>In this chapter, we will explore the basic concepts that form the foundation of this subject. Understanding these fundamentals is crucial for mastering advanced topics.</p>
      
      <h2>2. Key Concepts</h2>
      <ul>
        <li><strong>Concept 1:</strong> Detailed explanation of the first major concept</li>
        <li><strong>Concept 2:</strong> Understanding the second important principle</li>
        <li><strong>Concept 3:</strong> Application of theoretical knowledge</li>
      </ul>
      
      <h2>3. Important Definitions</h2>
      <p><strong>Definition 1:</strong> A precise explanation of key terminology</p>
      <p><strong>Definition 2:</strong> Another crucial definition to remember</p>
      
      <h2>4. Examples</h2>
      <p>Let's look at some practical examples to better understand these concepts:</p>
      <p><em>Example 1:</em> Detailed walkthrough of a practical application</p>
      
      <h2>5. Summary</h2>
      <p>This chapter introduced the fundamental concepts necessary for understanding advanced topics. Make sure to review all definitions and practice the examples provided.</p>
      
      <h2>6. Key Points to Remember</h2>
      <ul>
        <li>Point 1: Important fact to memorize</li>
        <li>Point 2: Critical concept for exams</li>
        <li>Point 3: Practical application tip</li>
      </ul>
    `,
    pdfUrl: '/sample-notes.pdf', // Sample PDF URL
  };

  // Sample MCQs for this chapter
  const chapterMCQs = [
    {
      question: "What is the main focus of this chapter?",
      options: {
        A: "Advanced applications",
        B: "Fundamental concepts",
        C: "Historical background",
        D: "Future predictions"
      },
      correctAnswer: "B",
      explanation: "This chapter focuses on fundamental concepts that form the foundation for understanding more complex topics."
    },
    {
      question: "Which concept is most important for understanding the basics?",
      options: {
        A: "Concept 1",
        B: "Concept 2",
        C: "All concepts are equally important",
        D: "None of the above"
      },
      correctAnswer: "C",
      explanation: "All fundamental concepts work together to provide a comprehensive understanding of the subject."
    },
  ];

  // Navigation functions
  const prevChapter = parseInt(chapterNumber) > 1 ? parseInt(chapterNumber) - 1 : null;
  const nextChapter = parseInt(chapterNumber) < 6 ? parseInt(chapterNumber) + 1 : null;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600 max-w-5xl mx-auto">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to={`/classes/${classId}`} className="hover:text-primary">
            {classId.toUpperCase()} Class
          </Link>
          <span className="mx-2">/</span>
          <Link to={`/classes/${classId}/${subjectId}`} className="hover:text-primary capitalize">
            {subjectId.replace('-', ' ')}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-semibold">Chapter {chapterNumber}</span>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto">
          {/* Chapter Title */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {chapterData.title}
            </h1>
            <p className="text-lg text-gray-700">
              {chapterData.introduction}
            </p>
          </div>

          {/* PDF Viewer */}
          <PDFViewer 
            pdfUrl={chapterData.pdfUrl}
            title={`${classId.toUpperCase()}-${subjectId}-Chapter-${chapterNumber}`}
          />

          {/* Written Notes Content */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              📝 Complete Notes
            </h2>
            <div 
              className="prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: chapterData.content }}
            />
          </div>

          {/* MCQs Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              ✍️ Practice MCQs
            </h2>
            {chapterMCQs.map((mcq, index) => (
              <MCQItem key={index} mcq={mcq} index={index} />
            ))}
          </div>

          {/* Related Notes */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg shadow-md p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🔗 Related Notes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to={`/classes/${classId}/${subjectId}`} className="bg-white rounded-lg p-4 hover:shadow-md transition">
                <div className="font-semibold text-gray-900">All Chapters</div>
                <div className="text-sm text-gray-600">View all chapters for this subject</div>
              </Link>
              <Link to={`/past-papers/${classId}`} className="bg-white rounded-lg p-4 hover:shadow-md transition">
                <div className="font-semibold text-gray-900">Past Papers</div>
                <div className="text-sm text-gray-600">Practice with previous exams</div>
              </Link>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            {prevChapter ? (
              <Link to={`/classes/${classId}/${subjectId}/chapter-${prevChapter}`}>
                <Button text={`← Previous Chapter`} variant="outline" />
              </Link>
            ) : (
              <div></div>
            )}

            {nextChapter ? (
              <Link to={`/classes/${classId}/${subjectId}/chapter-${nextChapter}`}>
                <Button text={`Next Chapter →`} variant="primary" />
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterPage;
