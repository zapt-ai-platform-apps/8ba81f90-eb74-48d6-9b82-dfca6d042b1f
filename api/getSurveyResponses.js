import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { surveyResponses } from '../drizzle/schema.js';
import { authenticateUser } from './_apiUtils.js';
import Sentry from './_sentry.js';
import { desc } from 'drizzle-orm';

export default async function handler(req, res) {
  console.log('Received request for survey responses');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  try {
    // Authenticate the user
    console.log('Authenticating user...');
    try {
      const user = await authenticateUser(req);
      console.log('User authenticated:', user.email);
      
      // Check if the user is authorized
      const authorizedEmails = ['david@zapt.ai', 'david@mapt.events'];
      if (!authorizedEmails.includes(user.email)) {
        console.log('Unauthorized access attempt:', user.email);
        return res.status(403).json({ error: 'Forbidden: You do not have permission to access this resource' });
      }
      
      // Connect to database
      console.log('Connecting to database...');
      try {
        const client = postgres(process.env.COCKROACH_DB_URL);
        const db = drizzle(client);
        
        // Get survey responses
        console.log('Querying database for survey responses...');
        // Fixed: Using desc() imported from drizzle-orm instead of { order: 'desc' }
        const results = await db.select().from(surveyResponses).orderBy(desc(surveyResponses.createdAt));
        
        console.log(`Retrieved ${results.length} survey responses`);
        
        // Close the database connection
        await client.end();
        
        return res.status(200).json(results);
      } catch (dbError) {
        console.error('Database error:', dbError);
        Sentry.captureException(dbError);
        return res.status(500).json({ error: 'Database error: ' + dbError.message });
      }
    } catch (authError) {
      console.error('Authentication error:', authError);
      return res.status(401).json({ error: 'Unauthorized: ' + authError.message });
    }
  } catch (error) {
    console.error('Error retrieving survey responses:', error);
    Sentry.captureException(error);
    
    return res.status(500).json({ error: 'Internal Server Error: ' + error.message });
  }
}