-- Users table policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON users
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON users
  FOR INSERT
  TO public
  WITH CHECK (auth.uid() = id OR auth.role() = 'anon');

CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  TO public
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Challenges table policies
CREATE POLICY "Challenges are viewable by everyone"
  ON challenges
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert challenges"
  ON challenges
  FOR INSERT
  TO public
  WITH CHECK (auth.role() IN ('authenticated', 'anon'));

-- Study plans table policies
CREATE POLICY "Users can view own study plans"
  ON study_plans
  FOR SELECT
  TO public
  USING (auth.uid() = "userId" OR auth.role() = 'anon');

CREATE POLICY "Users can insert own study plans"
  ON study_plans
  FOR INSERT
  TO public
  WITH CHECK ((auth.uid() = "userId") OR auth.role() = 'anon');

-- Challenge progress table policies
CREATE POLICY "Users can view own challenge progress"
  ON challenge_progress
  FOR SELECT
  TO public
  USING (auth.uid() = "userId" OR auth.role() = 'anon');

CREATE POLICY "Users can insert own challenge progress"
  ON challenge_progress
  FOR INSERT
  TO public
  WITH CHECK ((auth.uid() = "userId") OR auth.role() = 'anon');

CREATE POLICY "Users can update own challenge progress"
  ON challenge_progress
  FOR UPDATE
  TO public
  USING (auth.uid() = "userId")
  WITH CHECK (auth.uid() = "userId");

-- Notifications table policies
CREATE POLICY "Users can view own notifications"
  ON notifications
  FOR SELECT
  TO public
  USING (auth.uid() = "userId" OR auth.role() = 'anon');

CREATE POLICY "System can insert notifications"
  ON notifications
  FOR INSERT
  TO public
  WITH CHECK (auth.role() IN ('authenticated', 'anon'));

-- Badges table policies
CREATE POLICY "Badges are viewable by everyone"
  ON badges
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "System can insert badges"
  ON badges
  FOR INSERT
  TO public
  WITH CHECK (auth.role() IN ('authenticated', 'anon'));

-- Lessons table policies
CREATE POLICY "Lessons are viewable by everyone"
  ON lessons
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "System can insert lessons"
  ON lessons
  FOR INSERT
  TO public
  WITH CHECK (auth.role() IN ('authenticated', 'anon'));

-- Evaluations table policies
CREATE POLICY "Users can view own evaluations"
  ON evaluations
  FOR SELECT
  TO public
  USING (auth.uid() = "userId" OR auth.role() = 'anon');

CREATE POLICY "Users can insert own evaluations"
  ON evaluations
  FOR INSERT
  TO public
  WITH CHECK ((auth.uid() = "userId") OR auth.role() = 'anon');