# ZAPT.ai Survey App

A survey application for collecting insights about no-code app development. The app includes a user-friendly multi-step form for respondents and an admin dashboard for viewing submissions.

## Features

- Multi-step survey form with validation
- Secure data storage in CockroachDB
- Admin authentication with Supabase
- Protected admin dashboard to view all responses (restricted to david@zapt.ai)
- Mobile-responsive design with Tailwind CSS

## Technical Details

The application is built with:

- React with Hooks
- Tailwind CSS for styling
- Supabase for authentication
- CockroachDB for data storage
- Drizzle ORM for database operations
- Sentry for error tracking

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see .env file)
4. Run development server: `npm run dev`

## Admin Access

To access the admin dashboard:
1. Navigate to `/login`
2. Sign in with authorized credentials (david@zapt.ai)
3. View submitted survey responses at `/admin`

## Survey Access

The survey form is accessible to all users without login requirements:
1. Navigate to the home page `/`
2. Complete the multi-step survey form
3. Submit to save responses to the database