import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { getClasses, getEntranceExams } from '../api';

/**
 * HeroSection Component - Main banner section
 * Displays title, subtitle, and quick action buttons
 */
const HeroSection = () => {
  const [quickLinks, setQuickLinks] = useState([
    { text: '9th Class', link: '/classes/9th' },
    { text: '10th Class', link: '/classes/10th' },
    { text: '1st Year', link: '/classes/11th' },
    { text: '2nd Year', link: '/classes/12th' },
    { text: 'MDCAT', link: '/entrance-exams?examId=mdcat' },
    { text: 'NUMS', link: '/entrance-exams?examId=nums' },
  ]);

  useEffect(() => {
    const fetchQuickLinks = async () => {
      try {
        const [classesRes, examsRes] = await Promise.all([getClasses(), getEntranceExams()]);
        const classes = (classesRes.data || []).slice(0, 4).map(c => ({ text: c.name, link: `/classes/${c._id}` }));
        const exams = (examsRes.data || []).slice(0, 2).map(e => ({ text: e.name, link: `/entrance-exams?examId=${e._id}` }));
        const merged = [...classes, ...exams];
        if (merged.length) setQuickLinks(merged);
      } catch (err) {
        // keep defaults on error
        console.error('Failed to fetch quick links:', err);
      }
    };
    fetchQuickLinks();
  }, []);

  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
      <div className="container mx-auto px-4 text-center">
        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
          Pakistan's Smart Education Platform
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-6">
          Classes 9 to MDCAT
        </h2>

        {/* Subtitle */}
        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
          Notes • Past Papers • MCQs • Syllabus • Entrance Exam Preparation
        </p>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {quickLinks.map((item, index) => (
            <Link key={index} to={item.link}>
              <Button 
                text={item.text} 
                variant={index < 4 ? 'primary' : 'accent'}
                size="lg"
              />
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-bold text-primary">1000+</div>
            <div className="text-gray-600">Notes Available</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-bold text-secondary">500+</div>
            <div className="text-gray-600">Past Papers</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-bold text-accent">5000+</div>
            <div className="text-gray-600">MCQs Bank</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-bold text-purple-600">10K+</div>
            <div className="text-gray-600">Happy Students</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
