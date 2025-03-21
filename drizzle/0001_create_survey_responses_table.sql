CREATE TABLE IF NOT EXISTS "survey_responses" (
  "id" SERIAL PRIMARY KEY,
  "role" TEXT NOT NULL,
  "role_other" TEXT,
  "industry" TEXT NOT NULL,
  "industry_other" TEXT,
  "company_size" TEXT NOT NULL,
  "needs_app" BOOLEAN NOT NULL,
  "challenges" TEXT[],
  "challenges_other" TEXT,
  "solutions_used" TEXT[],
  "interested_in_no_code" TEXT NOT NULL,
  "app_type" TEXT,
  "app_type_other" TEXT,
  "budget" TEXT,
  "wants_consultation" BOOLEAN,
  "comments" TEXT,
  "email" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW()
);