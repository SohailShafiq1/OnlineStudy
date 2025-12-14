import React, { useState } from 'react';
import Card from '../components/Card';
import MCQItem from '../components/MCQItem';

/**
 * MCQs Page - Multiple Choice Questions Bank
 */
const MCQs = () => {
  const mcqCategories = [
    { title: '9th Class MCQs', icon: '📝', description: 'Practice MCQs for all subjects', link: '/mcqs/9th' },
    { title: '10th Class MCQs', icon: '✍️', description: 'Matric exam MCQs', link: '/mcqs/10th' },
    { title: '11th Class MCQs', icon: '📋', description: 'FSc Part 1 MCQs', link: '/mcqs/11th' },
    { title: '12th Class MCQs', icon: '📄', description: 'FSc Part 2 MCQs', link: '/mcqs/12th' },
    { title: 'MDCAT MCQs', icon: '🎓', description: '5000+ MDCAT questions', link: '/mcqs/mdcat' },
    { title: 'NUMS MCQs', icon: '⚕️', description: 'NUMS practice questions', link: '/mcqs/nums' },
  ];

  // Sample MCQs for demonstration
  const sampleMCQs = [
    {
      question: "What is the powerhouse of the cell?",
      options: {
        A: "Nucleus",
        B: "Mitochondria",
        C: "Ribosome",
        D: "Golgi apparatus"
      },
      correctAnswer: "B",
      explanation: "Mitochondria are called the powerhouse of the cell because they produce ATP through cellular respiration, which provides energy for cellular activities."
    },
    {
      question: "Which of the following is NOT a renewable energy source?",
      options: {
        A: "Solar power",
        B: "Wind energy",
        C: "Coal",
        D: "Hydroelectric power"
      },
      correctAnswer: "C",
      explanation: "Coal is a fossil fuel and is non-renewable. It takes millions of years to form and cannot be replenished within a human lifetime."
    },
    {
      question: "What is the chemical formula for water?",
      options: {
        A: "H2O2",
        B: "H2O",
        C: "HO2",
        D: "H3O"
      },
      correctAnswer: "B",
      explanation: "Water consists of two hydrogen atoms bonded to one oxygen atom, represented by the chemical formula H2O."
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ✍️ MCQs Bank
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Practice with thousands of multiple choice questions. 
            Test your knowledge and prepare for exams with detailed explanations.
          </p>
        </div>

        {/* MCQs Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto">
          {mcqCategories.map((category, index) => (
            <Card
              key={index}
              title={category.title}
              description={category.description}
              icon={category.icon}
              link={category.link}
            />
          ))}
        </div>

        {/* Sample MCQs Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            🎯 Sample MCQs
          </h2>
          <p className="text-gray-600 mb-8">
            Try these sample questions to see how our MCQs work. Click on an option to reveal the answer.
          </p>

          {sampleMCQs.map((mcq, index) => (
            <MCQItem key={index} mcq={mcq} index={index} />
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-primary mb-2">5000+</div>
            <p className="text-gray-600">Total MCQs</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-secondary mb-2">100%</div>
            <p className="text-gray-600">Verified Answers</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-accent mb-2">50+</div>
            <p className="text-gray-600">Topics Covered</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCQs;
