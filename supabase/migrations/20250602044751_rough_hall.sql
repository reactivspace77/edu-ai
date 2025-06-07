-- First drop all existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public users are viewable by everyone" ON users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Anyone can view lessons" ON lessons;
DROP POLICY IF EXISTS "Service role can manage lessons" ON lessons;
DROP POLICY IF EXISTS "Users can view own study plans" ON study_plans;
DROP POLICY IF EXISTS "Users can insert own study plans" ON study_plans;
DROP POLICY IF EXISTS "Users can update own study plans" ON study_plans;
DROP POLICY IF EXISTS "Anyone can view badges" ON badges;
DROP POLICY IF EXISTS "Service role can manage badges" ON badges;
DROP POLICY IF EXISTS "Anyone can view challenges" ON challenges;
DROP POLICY IF EXISTS "Service role can manage challenges" ON challenges;
DROP POLICY IF EXISTS "Users can view own challenge progress" ON challenge_progress;
DROP POLICY IF EXISTS "Users can insert own challenge progress" ON challenge_progress;
DROP POLICY IF EXISTS "Users can update own challenge progress" ON challenge_progress;
DROP POLICY IF EXISTS "Anyone can view questions" ON questions;
DROP POLICY IF EXISTS "Service role can manage questions" ON questions;
DROP POLICY IF EXISTS "Users can view own badges" ON user_badges;
DROP POLICY IF EXISTS "Users can insert own badges" ON user_badges;
DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
DROP POLICY IF EXISTS "Users can insert own notifications" ON notifications;
DROP POLICY IF EXISTS "Service role can manage notifications" ON notifications;
DROP POLICY IF EXISTS "Users can view own evaluations" ON evaluations;
DROP POLICY IF EXISTS "Users can insert own evaluations" ON evaluations;
DROP POLICY IF EXISTS "Authenticated users can insert badges." ON badges;
DROP POLICY IF EXISTS "Authenticated users can insert challenges" ON challenges;
DROP POLICY IF EXISTS "Authenticated users can insert challenge progress." ON challenge_progress;
DROP POLICY IF EXISTS "Authenticated users can insert evaluations." ON evaluations;
DROP POLICY IF EXISTS "Authenticated users can insert lessons." ON lessons;
DROP POLICY IF EXISTS "Authenticated users can insert notifications." ON notifications;
DROP POLICY IF EXISTS "Authenticated users can insert questions." ON questions;
DROP POLICY IF EXISTS "Authenticated users can insert study plans." ON study_plans;
DROP POLICY IF EXISTS "Authenticated users can insert user badges." ON user_badges;
DROP POLICY IF EXISTS "Users can insert their own profile." ON users;
DROP POLICY IF EXISTS "Users can insert own profile" ON users;
DROP POLICY IF EXISTS "Users can insert their own profile." ON users;

-- Now create new policies

-- Users table policies
CREATE POLICY "public_users_viewable" ON users
FOR SELECT USING (true);

CREATE POLICY "users_insert_own" ON users
FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "users_update_own" ON users
FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Lessons table policies
CREATE POLICY "lessons_viewable" ON lessons
FOR SELECT USING (true);

CREATE POLICY "lessons_service_manage" ON lessons
FOR ALL USING (auth.role() = 'service_role');

-- Study plans table policies
CREATE POLICY "study_plans_select_own" ON study_plans
FOR SELECT USING (auth.uid() = "userId");

CREATE POLICY "study_plans_insert_own" ON study_plans
FOR INSERT WITH CHECK (auth.uid() = "userId");

CREATE POLICY "study_plans_update_own" ON study_plans
FOR UPDATE USING (auth.uid() = "userId") WITH CHECK (auth.uid() = "userId");

-- Badges table policies
CREATE POLICY "badges_viewable" ON badges
FOR SELECT USING (true);

CREATE POLICY "badges_service_manage" ON badges
FOR ALL USING (auth.role() = 'service_role');

-- Challenges table policies
CREATE POLICY "challenges_viewable" ON challenges
FOR SELECT USING (true);

CREATE POLICY "challenges_service_manage" ON challenges
FOR ALL USING (auth.role() = 'service_role');

-- Challenge progress table policies
CREATE POLICY "challenge_progress_select_own" ON challenge_progress
FOR SELECT USING (auth.uid() = "userId");

CREATE POLICY "challenge_progress_insert_own" ON challenge_progress
FOR INSERT WITH CHECK (auth.uid() = "userId");

CREATE POLICY "challenge_progress_update_own" ON challenge_progress
FOR UPDATE USING (auth.uid() = "userId") WITH CHECK (auth.uid() = "userId");

-- Questions table policies
CREATE POLICY "questions_viewable" ON questions
FOR SELECT USING (true);

CREATE POLICY "questions_service_manage" ON questions
FOR ALL USING (auth.role() = 'service_role');

-- User badges table policies
CREATE POLICY "user_badges_select_own" ON user_badges
FOR SELECT USING (auth.uid() = "userId");

CREATE POLICY "user_badges_insert_own" ON user_badges
FOR INSERT WITH CHECK (auth.uid() = "userId");

-- Notifications table policies
CREATE POLICY "notifications_select_own" ON notifications
FOR SELECT USING (auth.uid() = "userId");

CREATE POLICY "notifications_insert_own" ON notifications
FOR INSERT WITH CHECK (auth.uid() = "userId");

CREATE POLICY "notifications_service_manage" ON notifications
FOR ALL USING (auth.role() = 'service_role');

-- Evaluations table policies
CREATE POLICY "evaluations_select_own" ON evaluations
FOR SELECT USING (auth.uid() = "userId");

CREATE POLICY "evaluations_insert_own" ON evaluations
FOR INSERT WITH CHECK (auth.uid() = "userId");