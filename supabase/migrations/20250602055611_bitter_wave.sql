/*
  # Update Row Level Security Policies

  1. Changes
    - Update RLS policies for users table to allow proper access
    - Update RLS policies for challenges table to allow proper access
    - Update RLS policies for study_plans table to allow proper access
    - Update RLS policies for challenge_progress table to allow proper access
    - Update RLS policies for notifications table to allow proper access

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for public access where needed
    - Add policies for service role access
*/

-- Users table policies
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can view their own profile." ON users;
DROP POLICY IF EXISTS "public_users_viewable" ON users;

CREATE POLICY "Allow public read access to users"
  ON users FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can manage their own data"
  ON users
  FOR ALL
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Challenges table policies
DROP POLICY IF EXISTS "Challenges are viewable by everyone." ON challenges;
DROP POLICY IF EXISTS "challenges_viewable" ON challenges;

CREATE POLICY "Allow public read access to challenges"
  ON challenges FOR SELECT
  TO public
  USING (true);

-- Study plans table policies
DROP POLICY IF EXISTS "Users can read own study plans" ON study_plans;
DROP POLICY IF EXISTS "study_plans_select_own" ON study_plans;

CREATE POLICY "Users can manage their study plans"
  ON study_plans
  FOR ALL
  TO authenticated
  USING (auth.uid() = "userId")
  WITH CHECK (auth.uid() = "userId");

CREATE POLICY "Allow public read access to study plans"
  ON study_plans FOR SELECT
  TO public
  USING (true);

-- Challenge progress table policies
DROP POLICY IF EXISTS "Users can read own challenge progress" ON challenge_progress;
DROP POLICY IF EXISTS "challenge_progress_select_own" ON challenge_progress;

CREATE POLICY "Users can manage their challenge progress"
  ON challenge_progress
  FOR ALL
  TO authenticated
  USING (auth.uid() = "userId")
  WITH CHECK (auth.uid() = "userId");

-- Notifications table policies
DROP POLICY IF EXISTS "Users can read own notifications" ON notifications;
DROP POLICY IF EXISTS "notifications_select_own" ON notifications;

CREATE POLICY "Users can manage their notifications"
  ON notifications
  FOR ALL
  TO authenticated
  USING (auth.uid() = "userId")
  WITH CHECK (auth.uid() = "userId");

-- Ensure service role has full access to all tables
DO $$
BEGIN
  -- Add service role policies to each table if they don't exist
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'users' 
    AND policyname = 'Service role full access'
  ) THEN
    CREATE POLICY "Service role full access" ON users
      FOR ALL
      TO public
      USING (auth.role() = 'service_role')
      WITH CHECK (auth.role() = 'service_role');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'challenges' 
    AND policyname = 'Service role full access'
  ) THEN
    CREATE POLICY "Service role full access" ON challenges
      FOR ALL
      TO public
      USING (auth.role() = 'service_role')
      WITH CHECK (auth.role() = 'service_role');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'study_plans' 
    AND policyname = 'Service role full access'
  ) THEN
    CREATE POLICY "Service role full access" ON study_plans
      FOR ALL
      TO public
      USING (auth.role() = 'service_role')
      WITH CHECK (auth.role() = 'service_role');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'challenge_progress' 
    AND policyname = 'Service role full access'
  ) THEN
    CREATE POLICY "Service role full access" ON challenge_progress
      FOR ALL
      TO public
      USING (auth.role() = 'service_role')
      WITH CHECK (auth.role() = 'service_role');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'notifications' 
    AND policyname = 'Service role full access'
  ) THEN
    CREATE POLICY "Service role full access" ON notifications
      FOR ALL
      TO public
      USING (auth.role() = 'service_role')
      WITH CHECK (auth.role() = 'service_role');
  END IF;
END $$;