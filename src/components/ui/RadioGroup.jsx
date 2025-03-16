import React from 'react';

export const RadioGroup = ({ options, value, onChange, name }) => {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label 
          key={option.id} 
          className="flex items-center space-x-3 cursor-pointer"
        >
          <input
            type="radio"
            name={name}
            value={typeof option.value === 'boolean' ? String(option.value) : option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 box-border"
          />
          <span className="text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );
};