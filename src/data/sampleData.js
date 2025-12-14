/**
 * Sample Data for Study With Maryam
 * This file contains sample/dummy data for development
 */

// Classes Data
export const classesData = {
  '9th': {
    id: '9th',
    title: '9th Class',
    fullName: 'Class 9 - Matric Part 1',
    description: 'Complete study material for 9th class all subjects',
  },
  '10th': {
    id: '10th',
    title: '10th Class',
    fullName: 'Class 10 - Matric Part 2',
    description: 'Matric board exam preparation material',
  },
  '11th': {
    id: '11th',
    title: '11th Class',
    fullName: '1st Year - FSc Part 1',
    description: 'FSc Part 1 comprehensive notes and material',
  },
  '12th': {
    id: '12th',
    title: '12th Class',
    fullName: '2nd Year - FSc Part 2',
    description: 'FSc Part 2 complete study resources',
  },
};

// Subjects Data
export const subjectsData = {
  english: { name: 'English', icon: '📖', color: 'blue' },
  biology: { name: 'Biology', icon: '🧬', color: 'green' },
  physics: { name: 'Physics', icon: '⚛️', color: 'purple' },
  chemistry: { name: 'Chemistry', icon: '🧪', color: 'red' },
  mathematics: { name: 'Mathematics', icon: '📐', color: 'indigo' },
  urdu: { name: 'Urdu', icon: '📚', color: 'orange' },
  'pakistan-studies': { name: 'Pakistan Studies', icon: '🇵🇰', color: 'green' },
  islamiyat: { name: 'Islamiyat', icon: '🕌', color: 'teal' },
};

// Sample Chapters (for any subject)
export const sampleChapters = [
  {
    number: 1,
    title: 'Introduction to Subject',
    hasNotes: true,
    hasMCQs: true,
    hasPastPapers: true,
  },
  {
    number: 2,
    title: 'Fundamental Concepts',
    hasNotes: true,
    hasMCQs: true,
    hasPastPapers: true,
  },
  {
    number: 3,
    title: 'Advanced Topics',
    hasNotes: true,
    hasMCQs: true,
    hasPastPapers: false,
  },
  {
    number: 4,
    title: 'Practical Applications',
    hasNotes: true,
    hasMCQs: true,
    hasPastPapers: true,
  },
  {
    number: 5,
    title: 'Problem Solving Techniques',
    hasNotes: true,
    hasMCQs: true,
    hasPastPapers: false,
  },
  {
    number: 6,
    title: 'Review and Practice',
    hasNotes: true,
    hasMCQs: true,
    hasPastPapers: true,
  },
];

// Sample MCQs
export const sampleMCQs = [
  {
    id: 1,
    question: "What is the powerhouse of the cell?",
    options: {
      A: "Nucleus",
      B: "Mitochondria",
      C: "Ribosome",
      D: "Golgi apparatus"
    },
    correctAnswer: "B",
    explanation: "Mitochondria are called the powerhouse of the cell because they produce ATP through cellular respiration."
  },
  {
    id: 2,
    question: "Which of the following is NOT a renewable energy source?",
    options: {
      A: "Solar power",
      B: "Wind energy",
      C: "Coal",
      D: "Hydroelectric power"
    },
    correctAnswer: "C",
    explanation: "Coal is a fossil fuel and is non-renewable. It takes millions of years to form."
  },
  {
    id: 3,
    question: "What is the chemical formula for water?",
    options: {
      A: "H2O2",
      B: "H2O",
      C: "HO2",
      D: "H3O"
    },
    correctAnswer: "B",
    explanation: "Water consists of two hydrogen atoms bonded to one oxygen atom (H2O)."
  },
];

// Entrance Exams Data
export const entranceExamsData = {
  mdcat: {
    id: 'mdcat',
    name: 'MDCAT',
    fullName: 'Medical and Dental College Admission Test',
    icon: '🎓',
    description: 'Complete MDCAT preparation with notes, MCQs, and past papers',
    subjects: ['biology', 'chemistry', 'physics', 'english'],
    totalQuestions: 200,
    duration: 210, // minutes
  },
  nums: {
    id: 'nums',
    name: 'NUMS',
    fullName: 'National University of Medical Sciences',
    icon: '⚕️',
    description: 'NUMS entrance test preparation material',
    subjects: ['biology', 'chemistry', 'physics', 'english', 'intelligence'],
    totalQuestions: 200,
    duration: 180, // minutes
  },
  nust: {
    id: 'nust',
    name: 'NUST',
    fullName: 'National University of Sciences and Technology',
    icon: '🏛️',
    description: 'NUST NET test preparation',
  },
  fmdc: {
    id: 'fmdc',
    name: 'FMDC',
    fullName: 'Federal Medical and Dental College',
    icon: '🏥',
    description: 'FMDC entrance test material',
  },
};

// Study Tips Categories
export const studyTipsCategories = [
  {
    id: 'mdcat-preparation',
    title: 'How to Prepare for MDCAT',
    icon: '🎓',
    category: 'entrance-exams',
  },
  {
    id: 'score-90-percent',
    title: 'Tips to Score 90% in Board Exams',
    icon: '📈',
    category: 'exam-tips',
  },
  {
    id: 'memory-hacks',
    title: 'Memory and Memorizing Hacks',
    icon: '🧠',
    category: 'study-techniques',
  },
  {
    id: 'study-faster',
    title: 'How to Study Faster and Smarter',
    icon: '⚡',
    category: 'study-techniques',
  },
];

// Past Papers Years
export const pastPapersYears = [
  '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017'
];

// Sample Chapter Content
export const sampleChapterContent = {
  title: "Introduction to the Subject",
  introduction: "This chapter provides a comprehensive introduction to the fundamental concepts that will be explored throughout the course.",
  sections: [
    {
      heading: "Overview",
      content: "Understanding the basic principles is essential for mastering advanced topics. This section introduces key concepts and their real-world applications."
    },
    {
      heading: "Key Definitions",
      content: "Important terminology and definitions that form the foundation of this subject."
    },
    {
      heading: "Practical Examples",
      content: "Real-world examples demonstrating the application of theoretical concepts."
    },
  ],
  keyPoints: [
    "Master fundamental concepts before moving to advanced topics",
    "Practice regularly with examples and exercises",
    "Review definitions and terminology frequently",
    "Connect theoretical knowledge with practical applications",
  ],
};

export default {
  classesData,
  subjectsData,
  sampleChapters,
  sampleMCQs,
  entranceExamsData,
  studyTipsCategories,
  pastPapersYears,
  sampleChapterContent,
};
