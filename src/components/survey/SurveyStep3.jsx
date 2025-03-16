import React from 'react';
import { RadioGroup } from '../ui/RadioGroup';
import { TextInput } from '../ui/TextInput';

const SurveyStep3 = ({ surveyData, updateSurveyData, nextStep, prevStep }) => {
  const interestedOptions = [
    { id: 'interested-yes', label: 'Yes, definitely', value: 'Yes, definitely' },
    { id: 'interested-maybe', label: 'Maybe, I\'d need to know more', value: 'Maybe, I\'d need to know more' },
    { id: 'interested-no', label: 'No, I prefer traditional software development', value: 'No, I prefer traditional software development' }
  ];

  const appTypeOptions = [
    { id: 'app-customer', label: 'A customer-facing app', value: 'A customer-facing app' },
    { id: 'app-internal', label: 'An internal tool (e.g. process improvement, automation, dashboards)', value: 'An internal tool' },
    { id: 'app-marketplace', label: 'A marketplace', value: 'A marketplace' },
    { id: 'app-prototype', label: 'A prototype / MVP', value: 'A prototype / MVP' },
    { id: 'app-other', label: 'Other', value: 'Other' }
  ];

  const budgetOptions = [
    { id: 'budget-5k', label: 'Less than £5k', value: 'Less than £5k' },
    { id: 'budget-10k', label: '£5k - £10k', value: '£5k - £10k' },
    { id: 'budget-20k', label: '£10k - £20k', value: '£10k - £20k' },
    { id: 'budget-50k', label: '£20k - £50k', value: '£20k - £50k' },
    { id: 'budget-50k-plus', label: '£50k+', value: '£50k+' }
  ];
  
  const handleInterestedChange = (value) => {
    updateSurveyData({ interestedInNoCode: value });
  };

  const handleAppTypeChange = (value) => {
    updateSurveyData({ appType: value });
  };

  const handleAppTypeOtherChange = (e) => {
    updateSurveyData({ appTypeOther: e.target.value });
  };

  const handleBudgetChange = (value) => {
    updateSurveyData({ budget: value });
  };

  const isNextDisabled = () => {
    // Basic validation
    if (!surveyData.interestedInNoCode) return true;
    
    if (surveyData.interestedInNoCode === 'Yes, definitely' || 
        surveyData.interestedInNoCode === 'Maybe, I\'d need to know more') {
      if (!surveyData.appType) return true;
      if (surveyData.appType === 'Other' && !surveyData.appTypeOther) return true;
      if (!surveyData.budget) return true;
    }
    
    return false;
  };

  const showAdditionalQuestions = 
    surveyData.interestedInNoCode === 'Yes, definitely' || 
    surveyData.interestedInNoCode === 'Maybe, I\'d need to know more';

  return (
    <div>
      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Would you be interested in a solution that helps you build an app/software faster 
            and cheaper without the need to code or hire developers?
          </h2>
          <RadioGroup 
            options={interestedOptions}
            value={surveyData.interestedInNoCode}
            onChange={handleInterestedChange}
            name="interestedInNoCode"
          />
        </div>

        {showAdditionalQuestions && (
          <>
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                If yes, what type of tech or app are you looking to create?
              </h2>
              <RadioGroup 
                options={appTypeOptions}
                value={surveyData.appType}
                onChange={handleAppTypeChange}
                name="appType"
              />
              {surveyData.appType === 'Other' && (
                <TextInput
                  label="Please specify"
                  value={surveyData.appTypeOther}
                  onChange={handleAppTypeOtherChange}
                  className="mt-2"
                  placeholder="Your app type"
                />
              )}
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                What is your estimated budget for developing your tech idea?
              </h2>
              <RadioGroup 
                options={budgetOptions}
                value={surveyData.budget}
                onChange={handleBudgetChange}
                name="budget"
              />
            </div>
          </>
        )}

        <div className="pt-4 flex gap-4">
          <button
            type="button"
            onClick={prevStep}
            className="w-1/2 py-2.5 px-4 border border-gray-300 rounded-md text-gray-700 font-medium bg-white hover:bg-gray-50 cursor-pointer"
          >
            Back
          </button>
          <button
            type="button"
            onClick={nextStep}
            disabled={isNextDisabled()}
            className={`w-1/2 py-2.5 px-4 rounded-md text-white font-medium 
              ${isNextDisabled() 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'}`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyStep3;