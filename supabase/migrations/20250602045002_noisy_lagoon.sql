-- Drop all existing policies
DO $$ 
BEGIN
  -- Users
  DROP POLICY IF EXISTS "public_users_viewable" ON users;
  DROP POLICY IF EXISTS "users_insert_own" ON users;
  DROP POLICY IF EXISTS "users_update_own" ON users;
  DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON users;
  DROP POLICY IF EXISTS "Users can insert their own profile" ON users;
  DROP POLICY IF EXISTS "Users can update own profile" ON users;
  DROP POLICY IF EXISTS "Users can read own profile" ON users;
  DROP POLICY IF EXISTS "Users can insert own profile" ON users;

  -- Lessons
  DROP POLICY IF EXISTS "lessons_viewable" ON lessons;
  DROP POLICY IF EXISTS "lessons_service_manage" ON lessons;
  DROP POLICY IF EXISTS "Lessons are viewable by everyone" ON lessons;
  DROP POLICY IF EXISTS "System can insert lessons" ON lessons;
  DROP POLICY IF EXISTS "Anyone can read lessons" ON lessons;

  -- Study Plans
  DROP POLICY IF EXISTS "study_plans_select_own" ON study_plans;
  DROP POLICY IF EXISTS "study_plans_insert_own" ON study_plans;
  DROP POLICY IF EXISTS "study_plans_update_own" ON study_plans;
  DROP POLICY IF EXISTS "Users can view own study plans" ON study_plans;
  DROP POLICY IF EXISTS "Users can insert own study plans" ON study_plans;
  DROP POLICY IF EXISTS "Users can update own study plans" ON study_plans;

  -- Badges
  DROP POLICY IF EXISTS "badges_viewable" ON badges;
  DROP POLICY IF EXISTS "badges_service_manage" ON badges;
  DROP POLICY IF EXISTS "Badges are viewable by everyone" ON badges;
  DROP POLICY IF EXISTS "System can insert badges" ON badges;
  DROP POLICY IF EXISTS "Anyone can read badges" ON badges;

  -- Challenges
  DROP POLICY IF EXISTS "challenges_viewable" ON challenges;
  DROP POLICY IF EXISTS "challenges_service_manage" ON challenges;
  DROP POLICY IF EXISTS "Challenges are viewable by everyone" ON challenges;
  DROP POLICY IF EXISTS "Anyone can read challenges" ON challenges;

  -- Challenge Progress
  DROP POLICY IF EXISTS "challenge_progress_select_own" ON challenge_progress;
  DROP POLICY IF EXISTS "challenge_progress_insert_own" ON challenge_progress;
  DROP POLICY IF EXISTS "challenge_progress_update_own" ON challenge_progress;
  DROP POLICY IF EXISTS "Users can view own challenge progress" ON challenge_progress;
  DROP POLICY IF EXISTS "Users can insert own challenge progress" ON challenge_progress;
  DROP POLICY IF EXISTS "Users can update own challenge progress" ON challenge_progress;

  -- Notifications
  DROP POLICY IF EXISTS "notifications_select_own" ON notifications;
  DROP POLICY IF EXISTS "notifications_insert_own" ON notifications;
  DROP POLICY IF EXISTS "notifications_service_manage" ON notifications;
  DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
  DROP POLICY IF EXISTS "System can insert notifications" ON notifications;

  -- User Badges
  DROP POLICY IF EXISTS "user_badges_select_own" ON user_badges;
  DROP POLICY IF EXISTS "user_badges_insert_own" ON user_badges;
  DROP POLICY IF EXISTS "Users can read own badges" ON user_badges;
  DROP POLICY IF EXISTS "Users can insert own badges" ON user_badges;

  -- Questions
  DROP POLICY IF EXISTS "questions_viewable" ON questions;
  DROP POLICY IF EXISTS "questions_service_manage" ON questions;
  DROP POLICY IF EXISTS "Anyone can read questions" ON questions;
  DROP POLICY IF EXISTS "System can insert questions" ON questions;

  -- Evaluations
  DROP POLICY IF EXISTS "evaluations_select_own" ON evaluations;
  DROP POLICY IF EXISTS "evaluations_insert_own" ON evaluations;
  DROP POLICY IF EXISTS "Users can view own evaluations" ON evaluations;
  DROP POLICY IF EXISTS "Users can insert own evaluations" ON evaluations;
END $$;

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;

-- Create new policies

-- Users
CREATE POLICY "public_users_viewable" ON users FOR SELECT USING (true);
CREATE POLICY "users_insert_own" ON users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "users_update_own" ON users FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Lessons
CREATE POLICY "lessons_viewable" ON lessons FOR SELECT USING (true);
CREATE POLICY "lessons_service_manage" ON lessons FOR ALL USING (auth.role() = 'service_role');

-- Study Plans
CREATE POLICY "study_plans_select_own" ON study_plans FOR SELECT USING (auth.uid() = "userId");
CREATE POLICY "study_plans_insert_own" ON study_plans FOR INSERT WITH CHECK (auth.uid() = "userId");
CREATE POLICY "study_plans_update_own" ON study_plans FOR UPDATE USING (auth.uid() = "userId") WITH CHECK (auth.uid() = "userId");

-- Badges
CREATE POLICY "badges_viewable" ON badges FOR SELECT USING (true);
CREATE POLICY "badges_service_manage" ON badges FOR ALL USING (auth.role() = 'service_role');

-- Challenges
CREATE POLICY "challenges_viewable" ON challenges FOR SELECT USING (true);
CREATE POLICY "challenges_service_manage" ON challenges FOR ALL USING (auth.role() = 'service_role');

-- Challenge Progress
CREATE POLICY "challenge_progress_select_own" ON challenge_progress FOR SELECT USING (auth.uid() = "userId");
CREATE POLICY "challenge_progress_insert_own" ON challenge_progress FOR INSERT WITH CHECK (auth.uid() = "userId");
CREATE POLICY "challenge_progress_update_own" ON challenge_progress FOR UPDATE USING (auth.uid() = "userId") WITH CHECK (auth.uid() = "userId");

-- Notifications
CREATE POLICY "notifications_select_own" ON notifications FOR SELECT USING (auth.uid() = "userId");
CREATE POLICY "notifications_insert_own" ON notifications FOR INSERT WITH CHECK (auth.uid() = "userId");
CREATE POLICY "notifications_service_manage" ON notifications FOR ALL USING (auth.role() = 'service_role');

-- User Badges
CREATE POLICY "user_badges_select_own" ON user_badges FOR SELECT USING (auth.uid() = "userId");
CREATE POLICY "user_badges_insert_own" ON user_badges FOR INSERT WITH CHECK (auth.uid() = "userId");

-- Questions
CREATE POLICY "questions_viewable" ON questions FOR SELECT USING (true);
CREATE POLICY "questions_service_manage" ON questions FOR ALL USING (auth.role() = 'service_role');

-- Evaluations
CREATE POLICY "evaluations_select_own" ON evaluations FOR SELECT USING (auth.uid() = "userId");
CREATE POLICY "evaluations_insert_own" ON evaluations FOR INSERT WITH CHECK (auth.uid() = "userId");