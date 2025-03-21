import { pgTable, serial, text, boolean, timestamp } from 'drizzle-orm/pg-core';

export const surveyResponses = pgTable('survey_responses', {
  id: serial('id').primaryKey(),
  role: text('role').notNull(),
  roleOther: text('role_other'),
  industry: text('industry').notNull(),
  industryOther: text('industry_other'),
  companySize: text('company_size').notNull(),
  needsApp: boolean('needs_app').notNull(),
  challenges: text('challenges').array(),
  challengesOther: text('challenges_other'),
  solutionsUsed: text('solutions_used').array(),
  interestedInNoCode: text('interested_in_no_code').notNull(),
  appType: text('app_type'),
  appTypeOther: text('app_type_other'),
  budget: text('budget'),
  wantsConsultation: boolean('wants_consultation'),
  comments: text('comments'),
  email: text('email'),
  createdAt: timestamp('created_at').defaultNow(),
});