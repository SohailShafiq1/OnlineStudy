import React from 'react';
import HeroSection from '../components/HeroSection';
import Card from '../components/Card';

/**
 * Home Page - Main landing page
 * Contains: Hero Section, Popular Study Sections, Classes Section
 */
const Home = () => {
  // Popular Study Sections Cards
  const popularSections = [
    { title: '9th Class Notes', icon: '📘', description: 'Complete notes for all subjects', link: '/classes/9th' },
    { title: '10th Class Notes', icon: '📗', description: 'Matric board exam notes', link: '/classes/10th' },
    { title: '11th Class Notes', icon: '📙', description: 'FSc Part 1 comprehensive notes', link: '/classes/11th' },
    { title: '12th Class Notes', icon: '📕', description: 'FSc Part 2 complete material', link: '/classes/12th' },
    { title: 'MDCAT Prep', icon: '🎓', description: 'Medical entrance test preparation', link: '/entrance-exams/mdcat' },
    { title: 'NUMS Prep', icon: '⚕️', description: 'NUMS test complete guide', link: '/entrance-exams/nums' },
    { title: 'Past Papers', icon: '📄', description: '5+ years solved papers', link: '/past-papers' },
    { title: 'MCQs Bank', icon: '✍️', description: '5000+ practice questions', link: '/mcqs' },
  ];

  // Classes Section
  const classes = [
    { title: '9th Class', icon: '🎒', link: '/classes/9th' },
    { title: '10th Class', icon: '📚', link: '/classes/10th' },
    { title: '11th Class', icon: '🎓', link: '/classes/11th' },
    { title: '12th Class', icon: '👨‍🎓', link: '/classes/12th' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Popular Study Sections */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Popular Study Sections
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Access comprehensive study material for all classes and entrance exams
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularSections.map((section, index) => (
              <Card
                key={index}
                title={section.title}
                description={section.description}
                icon={section.icon}
                link={section.link}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Classes Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Select Your Class
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Choose your class to access complete study material
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {classes.map((cls, index) => (
              <Card
                key={index}
                title={cls.title}
                icon={cls.icon}
                link={cls.link}
                bgColor="bg-gradient-to-br from-blue-50 to-indigo-100"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose Study With Maryam?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-xl font-bold mb-2">High Quality Content</h3>
              <p className="text-gray-600">Expert-verified notes and study material</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🆓</div>
              <h3 className="text-xl font-bold mb-2">100% Free</h3>
              <p className="text-gray-600">All resources available at no cost</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-2">Mobile Friendly</h3>
              <p className="text-gray-600">Study anywhere, anytime on any device</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
