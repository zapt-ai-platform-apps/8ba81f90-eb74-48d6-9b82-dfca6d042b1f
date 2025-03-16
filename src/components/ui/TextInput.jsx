import React from 'react';

export const TextInput = ({ label, value, onChange, className = '', placeholder = '', type = 'text' }) => {
  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 box-border"
        placeholder={placeholder}
      />
    </div>
  );
};