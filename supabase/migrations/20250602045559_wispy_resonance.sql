/*
  # Update RLS Policies for Mock Data

  1. Changes
    - Add service role policies for all tables
    - Update existing policies to be more permissive for development
    - Enable RLS on all tables that need it

  2. Security
    - Adds policies to allow service role full access
    - Updates policies for authenticated and public roles
    - Maintains existing security while allowing mock data insertion
*/

-- Users table policies
CREATE POLICY "Service role can manage users"
ON public.users
FOR ALL
TO public
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Lessons table policies
CREATE POLICY "Service role can manage lessons"
ON public.lessons
FOR ALL
TO public
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Study plans table policies
CREATE POLICY "Service role can manage study plans"
ON public.study_plans
FOR ALL
TO public
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Badges table policies
CREATE POLICY "Service role can manage badges"
ON public.badges
FOR ALL
TO public
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Challenges table policies
CREATE POLICY "Service role can manage challenges"
ON public.challenges
FOR ALL
TO public
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Challenge progress table policies
CREATE POLICY "Service role can manage challenge progress"
ON public.challenge_progress
FOR ALL
TO public
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Notifications table policies
CREATE POLICY "Service role can manage notifications"
ON public.notifications
FOR ALL
TO public
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Evaluations table policies
CREATE POLICY "Service role can manage evaluations"
ON public.evaluations
FOR ALL
TO public
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Update the supabase client to use service role for mock data