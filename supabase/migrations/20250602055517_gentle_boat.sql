-- Drop existing development policies to avoid conflicts
DO $$ 
DECLARE
    r record;
BEGIN
    FOR r IN 
        SELECT schemaname, tablename, policyname
        FROM pg_policies 
        WHERE schemaname = 'public'
        AND policyname LIKE '%development%'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS "%s" ON %I.%I;', 
            r.policyname, r.schemaname, r.tablename);
    END LOOP;
END $$;

-- Add development policies for all tables
DO $$ 
DECLARE
    table_name text;
BEGIN
    FOR table_name IN 
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
    LOOP
        -- Allow anon insert during development
        EXECUTE format('CREATE POLICY "Allow anon insert during development" ON %I FOR INSERT TO anon WITH CHECK (true);', table_name);
        
        -- Allow anon update during development
        EXECUTE format('CREATE POLICY "Allow anon update during development" ON %I FOR UPDATE TO anon USING (true) WITH CHECK (true);', table_name);
    END LOOP;
END $$;

-- Ensure RLS is enabled on all tables
DO $$ 
DECLARE
    table_name text;
BEGIN
    FOR table_name IN 
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
    LOOP
        EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY;', table_name);
    END LOOP;
END $$;

-- Add examType column to users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS "examType" text,
ADD COLUMN IF NOT EXISTS "grade" integer;