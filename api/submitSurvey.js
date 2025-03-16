import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { surveyResponses } from '../drizzle/schema.js';
import Sentry from './_sentry.js';

export default async function handler(req, res) {
  console.log('Received survey submission request');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  try {
    // Extract survey data from the request body
    const { 
      role, roleOther, industry, industryOther, companySize, 
      needsApp, challenges, challengesOther, solutionsUsed,
      interestedInNoCode, appType, appTypeOther, budget,
      wantsConsultation, comments, email 
    } = req.body;
    
    // Validate required fields
    if (!role || !industry || !companySize || needsApp === undefined || !interestedInNoCode) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Connect to database
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    
    // Insert survey response
    const result = await db.insert(surveyResponses).values({
      role,
      roleOther,
      industry,
      industryOther,
      companySize,
      needsApp,
      challenges: challenges || [],
      challengesOther,
      solutionsUsed: solutionsUsed || [],
      interestedInNoCode,
      appType,
      appTypeOther,
      budget,
      wantsConsultation,
      comments,
      email
    }).returning();
    
    console.log('Survey submitted successfully:', result);
    
    // Close the database connection
    await client.end();
    
    return res.status(200).json({ success: true, id: result[0].id });
  } catch (error) {
    console.error('Error submitting survey:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}