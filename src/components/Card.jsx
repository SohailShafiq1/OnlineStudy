import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Card Component - Reusable Card for various content types
 * @param {string} title - Card title
 * @param {string} description - Card description
 * @param {string} icon - Emoji or icon
 * @param {string} link - Link URL
 * @param {string} bgColor - Background color class
 */
const Card = ({ title, description, icon, link, bgColor = 'bg-white' }) => {
  return (
    <Link to={link} className="block">
      <div className={`${bgColor} rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 h-full border border-gray-200 hover:border-primary transform hover:-translate-y-1`}>
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        {description && (
          <p className="text-gray-600 text-sm">{description}</p>
        )}
      </div>
    </Link>
  );
};

export default Card;
