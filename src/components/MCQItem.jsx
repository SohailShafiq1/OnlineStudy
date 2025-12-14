import React, { useState } from 'react';

/**
 * MCQItem Component - Single MCQ with answer reveal
 * @param {object} mcq - MCQ data object
 */
const MCQItem = ({ mcq, index }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowAnswer(true);
  };

  const getOptionClass = (option) => {
    if (!showAnswer) {
      return 'border-gray-300 hover:border-primary hover:bg-blue-50';
    }
    if (option === mcq.correctAnswer) {
      return 'border-green-500 bg-green-50';
    }
    if (option === selectedOption && option !== mcq.correctAnswer) {
      return 'border-red-500 bg-red-50';
    }
    return 'border-gray-300';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
      {/* Question */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-gray-800">
          Q{index + 1}. {mcq.question}
        </h4>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {['A', 'B', 'C', 'D'].map((option) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            disabled={showAnswer}
            className={`w-full text-left p-4 border-2 rounded-lg transition-all ${getOptionClass(option)} ${
              showAnswer ? 'cursor-default' : 'cursor-pointer'
            }`}
          >
            <span className="font-semibold">{option}.</span> {mcq.options[option]}
          </button>
        ))}
      </div>

      {/* Show Answer Button */}
      {!showAnswer && (
        <button
          onClick={() => setShowAnswer(true)}
          className="mt-4 text-primary font-semibold hover:underline"
        >
          Show Answer
        </button>
      )}

      {/* Answer Explanation */}
      {showAnswer && (
        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-primary rounded">
          <div className="flex items-start">
            <span className="text-2xl mr-3">✅</span>
            <div>
              <p className="font-semibold text-gray-800 mb-2">
                Correct Answer: {mcq.correctAnswer}
              </p>
              <p className="text-gray-700 text-sm">{mcq.explanation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MCQItem;
