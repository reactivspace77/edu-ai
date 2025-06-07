/*
  # Create chat messages table and policies

  1. New Tables
    - chat_messages: Stores chat messages between users and AI assistant
      - id (text, primary key)
      - userId (uuid, references users)
      - content (text)
      - isUser (boolean)
      - timestamp (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for authenticated users and service role
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Service role can manage chat messages" ON chat_messages;
DROP POLICY IF EXISTS "Users can insert their own messages" ON chat_messages;
DROP POLICY IF EXISTS "Users can view their own messages" ON chat_messages;

-- Create the chat_messages table if it doesn't exist
CREATE TABLE IF NOT EXISTS chat_messages (
  id text PRIMARY KEY,
  "userId" uuid REFERENCES users(id) ON DELETE CASCADE,
  content text NOT NULL,
  "isUser" boolean NOT NULL DEFAULT false,
  timestamp timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Service role can manage chat messages"
  ON chat_messages FOR ALL
  TO public
  USING (auth.role() = 'service_role'::text)
  WITH CHECK (auth.role() = 'service_role'::text);

CREATE POLICY "Users can insert their own messages"
  ON chat_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = "userId");

CREATE POLICY "Users can view their own messages"
  ON chat_messages
  FOR SELECT
  TO authenticated
  USING (auth.uid() = "userId");