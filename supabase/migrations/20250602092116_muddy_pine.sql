-- Drop all existing policies for lessons
DROP POLICY IF EXISTS "Anyone can view lessons" ON lessons;
DROP POLICY IF EXISTS "Service role can manage lessons" ON lessons;
DROP POLICY IF EXISTS "Allow anon insert during development" ON lessons;
DROP POLICY IF EXISTS "Allow anon update during development" ON lessons;
DROP POLICY IF EXISTS "Allow public read access to lessons" ON lessons;

-- Create comprehensive policies for lessons
CREATE POLICY "Allow public read access to lessons"
  ON lessons FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Service role full access"
  ON lessons FOR ALL
  TO public
  USING (auth.role() = 'service_role'::text)
  WITH CHECK (auth.role() = 'service_role'::text);

CREATE POLICY "Allow anon access during development"
  ON lessons FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;