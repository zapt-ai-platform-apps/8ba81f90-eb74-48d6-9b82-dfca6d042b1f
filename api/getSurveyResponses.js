import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { surveyResponses } from '../drizzle/schema.js';
import { authenticateUser } from './_apiUtils.js';
import Sentry from './_sentry.js';

export default async function handler(req, res) {
  console.log('Received request for survey responses');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  try {
    // Authenticate the user
    const user = await authenticateUser(req);
    console.log('User authenticated:', user.email);
    
    // Connect to database
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    
    // Get survey responses
    const results = await db.select().from(surveyResponses).orderBy(surveyResponses.createdAt, { order: 'desc' });
    
    console.log(`Retrieved ${results.length} survey responses`);
    
    // Close the database connection
    await client.end();
    
    return res.status(200).json(results);
  } catch (error) {
    console.error('Error retrieving survey responses:', error);
    Sentry.captureException(error);
    
    if (error.message === 'Missing Authorization header' || error.message === 'Invalid token') {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}