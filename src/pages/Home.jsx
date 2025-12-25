import React, { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import Card from '../components/Card';
import { getClasses, getEntranceExams, getNotes } from '../api';

/**
 * Home Page - Main landing page
 * Contains: Hero Section, Popular Study Sections, Classes Section
 */
const Home = () => {
  const [classes, setClasses] = useState([]);
  const [exams, setExams] = useState([]);
  const [hasPastPapers, setHasPastPapers] = useState(false);
  const [popularSections, setPopularSections] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const c = await getClasses();
        setClasses(c.data || []);
      } catch (e) {
        console.error('Failed to load classes:', e);
      }
      try {
        const ex = await getEntranceExams();
        setExams(ex.data || []);
      } catch (e) {
        console.error('Failed to load exams:', e);
      }
      try {
        const notesRes = await getNotes();
        const notes = notesRes.data || [];
        const found = notes.some(n => {
          const name = n.documentTypeId ? (n.documentTypeId.name || '') : '';
          return name.toLowerCase().includes('past');
        });
        setHasPastPapers(Boolean(found));
      } catch (e) {
        console.error('Failed to load notes for past-papers check:', e);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    const secs = [];
    classes.slice(0, 4).forEach(cls => secs.push({ title: `${cls.name} Notes`, icon: '📘', description: `Complete notes for ${cls.name}`, link: `/classes/${cls._id}` }));
    exams.slice(0, 2).forEach(ex => secs.push({ title: `${ex.name} Prep`, icon: '🎓', description: `Materials for ${ex.name}`, link: `/entrance-exams?examId=${ex._id}` }));
    if (hasPastPapers) {
      secs.push({ title: 'Past Papers', icon: '📄', description: 'Solved past papers', link: '/past-papers' });
    }
    setPopularSections(secs);
  }, [classes, exams, hasPastPapers]);

  

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
            {classes.map((cls) => (
              <Card
                key={cls._id}
                title={cls.name}
                icon={'🎒'}
                link={`/classes/${cls._id}`}
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
