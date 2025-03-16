import React from 'react';

const ZaptBadge = () => {
  return (
    <a 
      href="https://www.zapt.ai" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
    >
      Made on <span className="text-indigo-600 font-bold mx-1">ZAPT</span>
    </a>
  );
};

export default ZaptBadge;