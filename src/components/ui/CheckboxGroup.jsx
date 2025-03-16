import React from 'react';

export const CheckboxGroup = ({ options, values = [], onChange, name }) => {
  const handleChange = (option) => {
    const newValues = [...values];
    const index = newValues.indexOf(option.value);
    
    if (index > -1) {
      // If the option is already selected, remove it
      newValues.splice(index, 1);
    } else {
      // Otherwise, add it
      newValues.push(option.value);
    }
    
    onChange(newValues);
  };

  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label 
          key={option.id} 
          className="flex items-center space-x-3 cursor-pointer"
        >
          <input
            type="checkbox"
            name={`${name}[]`}
            value={option.value}
            checked={values.includes(option.value)}
            onChange={() => handleChange(option)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded border-gray-300 box-border"
          />
          <span className="text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );
};