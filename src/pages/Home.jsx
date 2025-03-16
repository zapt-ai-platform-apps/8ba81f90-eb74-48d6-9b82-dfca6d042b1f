import React from 'react';
import Layout from '@/components/Layout';
import SurveyForm from '@/components/survey/SurveyForm';

const Home = () => {
  return (
    <Layout>
      <div className="mb-8 text-center">
        <img 
          src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=128&height=128" 
          alt="ZAPT.ai Logo" 
          className="mx-auto h-16 w-16 mb-4"
        />
        <h1 className="text-3xl font-bold text-gray-900">ZAPT.ai Research Survey</h1>
      </div>
      <SurveyForm />
    </Layout>
  );
};

export default Home;