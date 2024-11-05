import React from 'react';

const Alert = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-gray-800 border-gray-700',
    success: 'bg-green-900 border-green-800',
    error: 'bg-red-900 border-red-800',
    warning: 'bg-yellow-900 border-yellow-800',
  };

  return (
    <div className={`p-4 border rounded-lg ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default Alert;