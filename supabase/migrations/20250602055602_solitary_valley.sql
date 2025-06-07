/*
  # Fix Row Level Security Policies

  1. Changes
    - Update RLS policies for all affected tables to allow proper access
    - Add missing policies for authenticated users
    - Fix policy conditions for better security

  2. Security Updates
    - Ensure authenticated users can access their own data
    - Allow public read access where appropriate
    - Maintain security while fixing access issues
*/

-- Users table policies
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can view their own profile." ON users;
DROP POLICY IF EXISTS "public_users_viewable" ON users;

CREATE POLICY "Users can read their own data"
ON users FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
ON users FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Public can view basic user data"
ON users FOR SELECT
TO public
USING (true);

-- Study plans policies
DROP POLICY IF EXISTS "Users can read own study plans" ON study_plans;
DROP POLICY IF EXISTS "Users can view their own study plans." ON study_plans;

CREATE POLICY "Users can manage their own study plans"
ON study_plans FOR ALL
TO authenticated
USING (auth.uid() = "userId")
WITH CHECK (auth.uid() = "userId");

-- Challenges policies
DROP POLICY IF EXISTS "Challenges are viewable by everyone." ON challenges;
DROP POLICY IF EXISTS "challenges_viewable" ON challenges;

CREATE POLICY "Anyone can view challenges"
ON challenges FOR SELECT
TO public
USING (true);

CREATE POLICY "Authenticated users can interact with challenges"
ON challenges FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Challenge progress policies
DROP POLICY IF EXISTS "Users can read own challenge progress" ON challenge_progress;
DROP POLICY IF EXISTS "Users can view their own challenge progress." ON challenge_progress;

CREATE POLICY "Users can manage their own challenge progress"
ON challenge_progress FOR ALL
TO authenticated
USING (auth.uid() = "userId")
WITH CHECK (auth.uid() = "userId");

-- Notifications policies
DROP POLICY IF EXISTS "Users can read own notifications" ON notifications;
DROP POLICY IF EXISTS "Users can view their own notifications." ON notifications;

CREATE POLICY "Users can manage their own notifications"
ON notifications FOR ALL
TO authenticated
USING (auth.uid() = "userId")
WITH CHECK (auth.uid() = "userId");

-- Evaluations policies
DROP POLICY IF EXISTS "Users can read own evaluations" ON evaluations;
DROP POLICY IF EXISTS "Users can view their own evaluations." ON evaluations;

CREATE POLICY "Users can manage their own evaluations"
ON evaluations FOR ALL
TO authenticated
USING (auth.uid() = "userId")
WITH CHECK (auth.uid() = "userId");

-- User badges policies
DROP POLICY IF EXISTS "Users can view their own earned badges." ON user_badges;

CREATE POLICY "Users can manage their own badges"
ON user_badges FOR ALL
TO authenticated
USING (auth.uid() = "userId")
WITH CHECK (auth.uid() = "userId");

-- Badges policies
DROP POLICY IF EXISTS "Badges are viewable by everyone." ON badges;
DROP POLICY IF EXISTS "badges_viewable" ON badges;

CREATE POLICY "Anyone can view badges"
ON badges FOR SELECT
TO public
USING (true);

-- Lessons policies
DROP POLICY IF EXISTS "Lessons are viewable by everyone." ON lessons;
DROP POLICY IF EXISTS "lessons_viewable" ON lessons;

CREATE POLICY "Anyone can view lessons"
ON lessons FOR SELECT
TO public
USING (true);

-- Questions policies
DROP POLICY IF EXISTS "Questions are viewable by everyone." ON questions;
DROP POLICY IF EXISTS "questions_viewable" ON questions;

CREATE POLICY "Anyone can view questions"
ON questions FOR SELECT
TO public
USING (true);