import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Sentry from '@sentry/browser';
import SurveyStep1 from './SurveyStep1';
import SurveyStep2 from './SurveyStep2';
import SurveyStep3 from './SurveyStep3';
import SurveyStep4 from './SurveyStep4';
import SurveyProgress from './SurveyProgress';

const SurveyForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [surveyData, setSurveyData] = useState({
    role: '',
    roleOther: '',
    industry: '',
    industryOther: '',
    companySize: '',
    needsApp: null,
    challenges: [],
    challengesOther: '',
    solutionsUsed: [],
    interestedInNoCode: '',
    appType: '',
    appTypeOther: '',
    budget: '',
    wantsConsultation: false,
    comments: '',
    email: ''
  });

  const updateSurveyData = (data) => {
    setSurveyData(prev => ({
      ...prev,
      ...data
    }));
  };

  const nextStep = () => {
    setCurrentStep(prevStep => prevStep + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(prevStep => prevStep - 1);
    window.scrollTo(0, 0);
  };

  const submitSurvey = async () => {
    try {
      setSubmitting(true);
      console.log('Submitting survey data:', surveyData);
      
      const response = await fetch('/api/submitSurvey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error submitting survey: ${errorData.error || response.statusText}`);
      }
      
      const result = await response.json();
      console.log('Survey submitted successfully:', result);
      
      // Navigate to thank you page
      navigate('/thank-you');
    } catch (error) {
      console.error('Error submitting survey:', error);
      Sentry.captureException(error);
      
      // Show error message to user
      alert('An error occurred while submitting the survey. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <SurveyStep1 
            surveyData={surveyData}
            updateSurveyData={updateSurveyData}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <SurveyStep2 
            surveyData={surveyData}
            updateSurveyData={updateSurveyData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <SurveyStep3 
            surveyData={surveyData}
            updateSurveyData={updateSurveyData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <SurveyStep4 
            surveyData={surveyData}
            updateSurveyData={updateSurveyData}
            submitSurvey={submitSurvey}
            prevStep={prevStep}
            submitting={submitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
      <SurveyProgress currentStep={currentStep} totalSteps={4} />
      {renderCurrentStep()}
    </div>
  );
};

export default SurveyForm;