import React from 'react';

const SurveyProgress = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2 text-sm text-gray-500">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full">
        <div 
          className="h-full bg-indigo-600 rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SurveyProgress;