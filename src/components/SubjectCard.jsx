import React from 'react';
import { Link } from 'react-router-dom';

/**
 * SubjectCard Component - Card for displaying subject information
 * @param {string} subject - Subject name
 * @param {string} icon - Subject icon/emoji
 * @param {string} link - Link to subject page
 * @param {string} description - Brief description
 */
const SubjectCard = ({ subject, icon, link, description }) => {
  return (
    <Link to={link} className="block">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-8 border-2 border-gray-200 hover:border-primary transform hover:-translate-y-2">
        <div className="text-6xl mb-4 text-center">{icon}</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">{subject}</h3>
        {description && (
          <p className="text-gray-600 text-sm text-center mt-2">{description}</p>
        )}
      </div>
    </Link>
  );
};

export default SubjectCard;
