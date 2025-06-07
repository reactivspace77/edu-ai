/*
  # Fix RLS policies and add missing columns

  1. Schema Changes
    - Add `examType` and `grade` columns to users table
  
  2. Security Changes
    - Add permissive RLS policies for mock data initialization
    - Policies are added for all tables to allow anon role during development
    - WARNING: These policies should be removed or restricted in production!

  3. Changes
    - Added examType (text) column to users table
    - Added grade (integer) column to users table
    - Added development RLS policies for mock data
*/

-- Add new columns to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS "examType" text,
ADD COLUMN IF NOT EXISTS grade integer;

-- Update RLS policies for users table
CREATE POLICY "Allow anon insert during development"
ON users FOR INSERT TO anon
WITH CHECK (true);

CREATE POLICY "Allow anon update during development"
ON users FOR UPDATE TO anon
USING (true)
WITH CHECK (true);

-- Update RLS policies for challenges table
CREATE POLICY "Allow anon insert during development"
ON challenges FOR INSERT TO anon
WITH CHECK (true);

CREATE POLICY "Allow anon update during development"
ON challenges FOR UPDATE TO anon
USING (true)
WITH CHECK (true);

-- Update RLS policies for study_plans table
CREATE POLICY "Allow anon insert during development"
ON study_plans FOR INSERT TO anon
WITH CHECK (true);

CREATE POLICY "Allow anon update during development"
ON study_plans FOR UPDATE TO anon
USING (true)
WITH CHECK (true);

-- Update RLS policies for challenge_progress table
CREATE POLICY "Allow anon insert during development"
ON challenge_progress FOR INSERT TO anon
WITH CHECK (true);

CREATE POLICY "Allow anon update during development"
ON challenge_progress FOR UPDATE TO anon
USING (true)
WITH CHECK (true);

-- Update RLS policies for notifications table
CREATE POLICY "Allow anon insert during development"
ON notifications FOR INSERT TO anon
WITH CHECK (true);

CREATE POLICY "Allow anon update during development"
ON notifications FOR UPDATE TO anon
USING (true)
WITH CHECK (true);

-- Update RLS policies for evaluations table
CREATE POLICY "Allow anon insert during development"
ON evaluations FOR INSERT TO anon
WITH CHECK (true);

CREATE POLICY "Allow anon update during development"
ON evaluations FOR UPDATE TO anon
USING (true)
WITH CHECK (true);

-- Update RLS policies for lessons table
CREATE POLICY "Allow anon insert during development"
ON lessons FOR INSERT TO anon
WITH CHECK (true);

CREATE POLICY "Allow anon update during development"
ON lessons FOR UPDATE TO anon
USING (true)
WITH CHECK (true);

-- Update RLS policies for badges table
CREATE POLICY "Allow anon insert during development"
ON badges FOR INSERT TO anon
WITH CHECK (true);

CREATE POLICY "Allow anon update during development"
ON badges FOR UPDATE TO anon
USING (true)
WITH CHECK (true);

-- Update RLS policies for user_badges table
CREATE POLICY "Allow anon insert during development"
ON user_badges FOR INSERT TO anon
WITH CHECK (true);

CREATE POLICY "Allow anon update during development"
ON user_badges FOR UPDATE TO anon
USING (true)
WITH CHECK (true);

-- Update RLS policies for questions table
CREATE POLICY "Allow anon insert during development"
ON questions FOR INSERT TO anon
WITH CHECK (true);

CREATE POLICY "Allow anon update during development"
ON questions FOR UPDATE TO anon
USING (true)
WITH CHECK (true);