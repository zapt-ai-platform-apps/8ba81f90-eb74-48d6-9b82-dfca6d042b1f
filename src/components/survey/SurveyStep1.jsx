import React from 'react';
import { RadioGroup } from '../ui/RadioGroup';
import { TextInput } from '../ui/TextInput';

const SurveyStep1 = ({ surveyData, updateSurveyData, nextStep }) => {
  const roleOptions = [
    { id: 'startup-founder', label: 'Startup Founder', value: 'Startup Founder' },
    { id: 'business-owner', label: 'Small Business Owner', value: 'Small Business Owner' },
    { id: 'consultant', label: 'Consultant / Freelancer', value: 'Consultant / Freelancer' },
    { id: 'innovation-manager', label: 'Corporate Innovation Manager', value: 'Corporate Innovation Manager' },
    { id: 'function-manager', label: 'Corporate Function Manager', value: 'Corporate Function Manager' },
    { id: 'other-role', label: 'Other', value: 'Other' }
  ];

  const industryOptions = [
    { id: 'saas-tech', label: 'SaaS / Tech', value: 'SaaS / Tech' },
    { id: 'ecommerce', label: 'E-commerce', value: 'E-commerce' },
    { id: 'healthcare', label: 'Healthcare', value: 'Healthcare' },
    { id: 'finance', label: 'Finance / Fintech', value: 'Finance / Fintech' },
    { id: 'public-sector', label: 'Public Sector', value: 'Public Sector' },
    { id: 'other-industry', label: 'Other', value: 'Other' }
  ];

  const companySizeOptions = [
    { id: 'just-me', label: 'Just me', value: 'Just me' },
    { id: '2-10', label: '2-10', value: '2-10' },
    { id: '11-50', label: '11-50', value: '11-50' },
    { id: '51+', label: '51+', value: '51+' }
  ];

  const handleRoleChange = (value) => {
    updateSurveyData({ role: value });
  };

  const handleRoleOtherChange = (e) => {
    updateSurveyData({ roleOther: e.target.value });
  };

  const handleIndustryChange = (value) => {
    updateSurveyData({ industry: value });
  };

  const handleIndustryOtherChange = (e) => {
    updateSurveyData({ industryOther: e.target.value });
  };

  const handleCompanySizeChange = (value) => {
    updateSurveyData({ companySize: value });
  };

  const isNextDisabled = () => {
    // Basic validation - required fields must be filled
    if (!surveyData.role) return true;
    if (surveyData.role === 'Other' && !surveyData.roleOther) return true;
    if (!surveyData.industry) return true;
    if (surveyData.industry === 'Other' && !surveyData.industryOther) return true;
    if (!surveyData.companySize) return true;
    return false;
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">🚀 Help Us Improve No-Code App Development!</h1>
        <p className="text-gray-600">
          ZAPT.ai is conducting research to better understand how founders, business owners and managers approach tech / software development. 
          Your insights will help us refine our solution to make app development faster, cheaper, and more accessible for all.
        </p>
        <p className="text-gray-600 mt-2">
          This survey should only take 2 minutes, and as a token of our gratitude you'll get free credits to the ZAPT platform 
          plus personal guidance from our co-founders David and Phil as you develop your app.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">What best describes your role?</h2>
          <RadioGroup 
            options={roleOptions}
            value={surveyData.role}
            onChange={handleRoleChange}
            name="role"
          />
          {surveyData.role === 'Other' && (
            <TextInput
              label="Please specify"
              value={surveyData.roleOther}
              onChange={handleRoleOtherChange}
              className="mt-2"
              placeholder="Your role"
            />
          )}
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">What industry is your business in?</h2>
          <RadioGroup 
            options={industryOptions}
            value={surveyData.industry}
            onChange={handleIndustryChange}
            name="industry"
          />
          {surveyData.industry === 'Other' && (
            <TextInput
              label="Please specify"
              value={surveyData.industryOther}
              onChange={handleIndustryOtherChange}
              className="mt-2"
              placeholder="Your industry"
            />
          )}
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">How many employees does your company have?</h2>
          <RadioGroup 
            options={companySizeOptions}
            value={surveyData.companySize}
            onChange={handleCompanySizeChange}
            name="companySize"
          />
        </div>

        <div className="pt-4">
          <button
            type="button"
            onClick={nextStep}
            disabled={isNextDisabled()}
            className={`w-full py-2.5 px-4 rounded-md text-white font-medium 
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

export default SurveyStep1;