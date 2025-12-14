import React from 'react';

/**
 * Button Component - Reusable styled button
 * @param {string} text - Button text
 * @param {function} onClick - Click handler
 * @param {string} variant - Button style variant (primary, secondary, accent)
 * @param {string} size - Button size (sm, md, lg)
 */
const Button = ({ 
  text, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  type = 'button',
  className = '',
  children
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-300 transform hover:scale-105';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-blue-700',
    secondary: 'bg-secondary text-white hover:bg-green-700',
    accent: 'bg-accent text-white hover:bg-orange-600',
    outline: 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children || text}
    </button>
  );
};

export default Button;
