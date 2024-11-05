import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-gray-800 rounded-lg shadow-lg overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

Card.Header = ({ children, className = '' }) => (
  <div className={`p-4 border-b border-gray-700 ${className}`}>
    {children}
  </div>
);

Card.Body = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);

Card.Footer = ({ children, className = '' }) => (
  <div className={`p-4 border-t border-gray-700 ${className}`}>
    {children}
  </div>
);

export default Card;
