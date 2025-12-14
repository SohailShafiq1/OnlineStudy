import React from 'react';
import Card from '../components/Card';

/**
 * Study Tips Page - Blog-style study advice and tips
 */
const StudyTips = () => {
  const studyTipsPosts = [
    {
      title: "How to Prepare for MDCAT",
      icon: "🎓",
      description: "Complete guide to MDCAT preparation including study plan, best books, and time management strategies.",
      link: "/study-tips/mdcat-preparation"
    },
    {
      title: "Tips to Score 90% in Board Exams",
      icon: "📈",
      description: "Proven strategies to achieve excellent marks in matric and intermediate board examinations.",
      link: "/study-tips/score-90-percent"
    },
    {
      title: "Memory and Memorizing Hacks",
      icon: "🧠",
      description: "Scientific techniques to improve memory retention and recall information quickly during exams.",
      link: "/study-tips/memory-hacks"
    },
    {
      title: "How to Study Faster and Smarter",
      icon: "⚡",
      description: "Effective study techniques including active learning, spaced repetition, and the Pomodoro technique.",
      link: "/study-tips/study-faster"
    },
    {
      title: "Time Management for Students",
      icon: "⏰",
      description: "Learn how to balance studies, activities, and rest with effective time management strategies.",
      link: "/study-tips/time-management"
    },
    {
      title: "Exam Anxiety: How to Stay Calm",
      icon: "😌",
      description: "Practical tips to reduce exam stress and anxiety, and perform your best under pressure.",
      link: "/study-tips/exam-anxiety"
    },
    {
      title: "Best Note-Taking Methods",
      icon: "📝",
      description: "Discover effective note-taking techniques like Cornell method, mind mapping, and digital notes.",
      link: "/study-tips/note-taking"
    },
    {
      title: "Physics Problem-Solving Tricks",
      icon: "🔬",
      description: "Master physics with these problem-solving strategies and formula memorization techniques.",
      link: "/study-tips/physics-tricks"
    },
    {
      title: "Biology Learning Strategies",
      icon: "🧬",
      description: "Tips for understanding and memorizing biological concepts, diagrams, and terminology.",
      link: "/study-tips/biology-strategies"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            💡 Study Tips & Strategies
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert advice and proven strategies to help you study effectively, 
            manage time better, and achieve academic excellence.
          </p>
        </div>

        {/* Study Tips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {studyTipsPosts.map((post, index) => (
            <Card
              key={index}
              title={post.title}
              description={post.description}
              icon={post.icon}
              link={post.link}
            />
          ))}
        </div>

        {/* Featured Tip Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-xl p-8 max-w-4xl mx-auto text-white">
          <h2 className="text-3xl font-bold mb-4">
            🌟 Featured Tip: The 50-10 Rule
          </h2>
          <p className="text-lg mb-4">
            Study for 50 minutes with full concentration, then take a 10-minute break. 
            This technique helps maintain focus and prevents burnout.
          </p>
          <ul className="space-y-2 text-sm">
            <li>✓ Set a timer for 50 minutes of focused study</li>
            <li>✓ Remove all distractions during study time</li>
            <li>✓ Take a 10-minute break to stretch and relax</li>
            <li>✓ Repeat the cycle for maximum productivity</li>
          </ul>
        </div>

        {/* Success Stories */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            📣 Success Stories
          </h2>
          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-gray-700 italic mb-2">
                "Using these study tips, I improved my marks from 70% to 92% in just one year!"
              </p>
              <p className="text-sm text-gray-600">- Ayesha K., 10th Class Student</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-gray-700 italic mb-2">
                "The MDCAT preparation guide helped me score 186/200. Thank you Study With Maryam!"
              </p>
              <p className="text-sm text-gray-600">- Ahmed R., MDCAT Student</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyTips;
