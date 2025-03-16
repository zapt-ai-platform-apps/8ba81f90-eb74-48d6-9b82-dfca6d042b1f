import React from 'react';
import { RadioGroup } from '../ui/RadioGroup';
import { TextInput } from '../ui/TextInput';
import { TextArea } from '../ui/TextArea';

const SurveyStep4 = ({ surveyData, updateSurveyData, submitSurvey, prevStep, submitting }) => {
  const consultationOptions = [
    { id: 'consultation-yes', label: 'Yes', value: true },
    { id: 'consultation-no', label: 'No', value: false }
  ];

  const handleConsultationChange = (value) => {
    // Convert string to boolean
    const boolValue = value === 'true';
    updateSurveyData({ wantsConsultation: boolValue });
  };

  const handleCommentsChange = (e) => {
    updateSurveyData({ comments: e.target.value });
  };

  const handleEmailChange = (e) => {
    updateSurveyData({ email: e.target.value });
  };

  const isSubmitDisabled = () => {
    // Basic validation for required fields on this step
    if (surveyData.wantsConsultation && !surveyData.email) return true;
    
    // Email validation if provided
    if (surveyData.email && !isValidEmail(surveyData.email)) return true;
    
    return false;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div>
      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Would you be interested in a free consultation to discuss the viability of your idea with us?
          </h2>
          <RadioGroup 
            options={consultationOptions}
            value={surveyData.wantsConsultation}
            onChange={handleConsultationChange}
            name="wantsConsultation"
          />
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Please feel free to note down any other comments, suggestions or queries you'd like to share with us here...
          </h2>
          <TextArea
            value={surveyData.comments}
            onChange={handleCommentsChange}
            placeholder="Your comments"
            rows={4}
          />
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {surveyData.wantsConsultation 
              ? "Please enter your email to schedule your free consultation:" 
              : "If you'd like to take us up on the free consultation offer or early access to our no-code platform latest features, just enter your email below:"}
          </h2>
          <TextInput
            value={surveyData.email}
            onChange={handleEmailChange}
            placeholder="Your email"
            type="email"
          />
          {surveyData.email && !isValidEmail(surveyData.email) && (
            <p className="mt-1 text-red-500 text-sm">Please enter a valid email address</p>
          )}
        </div>

        <div className="pt-4 flex gap-4">
          <button
            type="button"
            onClick={prevStep}
            disabled={submitting}
            className={`w-1/2 py-2.5 px-4 border border-gray-300 rounded-md text-gray-700 font-medium bg-white 
              ${submitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'}`}
          >
            Back
          </button>
          <button
            type="button"
            onClick={submitSurvey}
            disabled={isSubmitDisabled() || submitting}
            className={`w-1/2 py-2.5 px-4 rounded-md text-white font-medium 
              ${isSubmitDisabled() || submitting
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'}`}
          >
            {submitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Survey'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyStep4;