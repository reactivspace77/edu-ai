/*
  # Fix Challenge Progress RLS Policies

  1. Security Updates
    - Update RLS policies for `challenge_progress` table to use correct `auth.uid()` function
    - Ensure authenticated users can manage their own challenge progress
    - Remove duplicate and conflicting policies
    - Add proper policies for INSERT, UPDATE, and SELECT operations

  2. Changes
    - Drop existing problematic policies
    - Create new policies with correct auth function references
    - Ensure consistency with Supabase authentication system
*/

-- Drop existing policies that may be conflicting
DROP POLICY IF EXISTS "Allow anon insert during development" ON challenge_progress;
DROP POLICY IF EXISTS "Allow anon update during development" ON challenge_progress;
DROP POLICY IF EXISTS "Users can manage their challenge progress" ON challenge_progress;
DROP POLICY IF EXISTS "Users can manage their own challenge progress" ON challenge_progress;
DROP POLICY IF EXISTS "Users can update their own challenge progress." ON challenge_progress;
DROP POLICY IF EXISTS "challenge_progress_insert_own" ON challenge_progress;
DROP POLICY IF EXISTS "challenge_progress_update_own" ON challenge_progress;

-- Create new, correct policies for challenge_progress
CREATE POLICY "Users can insert their own challenge progress"
  ON challenge_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = "userId");

CREATE POLICY "Users can update their own challenge progress"
  ON challenge_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = "userId")
  WITH CHECK (auth.uid() = "userId");

CREATE POLICY "Users can select their own challenge progress"
  ON challenge_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = "userId");

-- Keep service role policies for administrative access
CREATE POLICY "Service role can manage all challenge progress"
  ON challenge_progress
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);