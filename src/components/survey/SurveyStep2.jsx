import React from 'react';
import { RadioGroup } from '../ui/RadioGroup';
import { CheckboxGroup } from '../ui/CheckboxGroup';
import { TextInput } from '../ui/TextInput';

const SurveyStep2 = ({ surveyData, updateSurveyData, nextStep, prevStep }) => {
  const needsAppOptions = [
    { id: 'needs-app-yes', label: 'Yes', value: true },
    { id: 'needs-app-no', label: 'No', value: false }
  ];

  const challengesOptions = [
    { id: 'challenge-cost', label: 'Too expensive to hire developers', value: 'Too expensive to hire developers' },
    { id: 'challenge-time', label: 'Takes too long to develop', value: 'Takes too long to develop' },
    { id: 'challenge-skills', label: 'Lack of technical skills', value: 'Lack of technical skills' },
    { id: 'challenge-requirements', label: 'Unclear requirements / idea validation', value: 'Unclear requirements / idea validation' },
    { id: 'challenge-other', label: 'Other', value: 'Other' }
  ];

  const solutionsOptions = [
    { id: 'solution-developers', label: 'Hired developers / agency', value: 'Hired developers / agency' },
    { id: 'solution-nocode', label: 'Used no-code tools (e.g., Bubble.io, Builder.ai, Cursor, Loveable, Webflow, etc.)', value: 'Used no-code tools' },
    { id: 'solution-self', label: 'Built it myself (coding)', value: 'Built it myself (coding)' },
    { id: 'solution-none', label: 'Haven\'t built anything yet', value: 'Haven\'t built anything yet' }
  ];

  const handleNeedsAppChange = (value) => {
    // Fix: Handle both boolean and string values correctly
    const boolValue = typeof value === 'boolean' ? value : value === 'true';
    updateSurveyData({ needsApp: boolValue });
  };

  const handleChallengesChange = (values) => {
    updateSurveyData({ challenges: values });
  };

  const handleChallengesOtherChange = (e) => {
    updateSurveyData({ challengesOther: e.target.value });
  };

  const handleSolutionsChange = (values) => {
    updateSurveyData({ solutionsUsed: values });
  };

  const isNextDisabled = () => {
    // Basic validation
    if (surveyData.needsApp === null) return true;
    if (surveyData.needsApp && surveyData.challenges.length === 0) return true;
    if (surveyData.challenges?.includes('Other') && !surveyData.challengesOther) return true;
    return false;
  };

  return (
    <div>
      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Do you need (or have you ever needed) to build an app or software for your business?</h2>
          <RadioGroup 
            options={needsAppOptions}
            value={surveyData.needsApp}
            onChange={handleNeedsAppChange}
            name="needsApp"
          />
        </div>

        {surveyData.needsApp && (
          <>
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">If yes, what challenges are you facing or did you face? (Select all that apply)</h2>
              <CheckboxGroup 
                options={challengesOptions}
                values={surveyData.challenges}
                onChange={handleChallengesChange}
                name="challenges"
              />
              {surveyData.challenges?.includes('Other') && (
                <TextInput
                  label="Please specify"
                  value={surveyData.challengesOther}
                  onChange={handleChallengesOtherChange}
                  className="mt-2"
                  placeholder="Your challenge"
                />
              )}
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">What solutions have you used so far to build your tech? (Select all that apply)</h2>
              <CheckboxGroup 
                options={solutionsOptions}
                values={surveyData.solutionsUsed}
                onChange={handleSolutionsChange}
                name="solutions"
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

export default SurveyStep2;