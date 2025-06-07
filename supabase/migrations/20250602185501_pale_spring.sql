-- Create chat_messages table
CREATE TABLE chat_messages (
  id text PRIMARY KEY,
  "userId" uuid REFERENCES users(id) ON DELETE CASCADE,
  content text NOT NULL,
  "isUser" boolean NOT NULL DEFAULT false,
  timestamp timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Users can view their own messages"
  ON chat_messages
  FOR SELECT
  TO authenticated
  USING (auth.uid() = "userId");

CREATE POLICY "Users can insert their own messages"
  ON chat_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = "userId");

-- Add service role policy
CREATE POLICY "Service role can manage chat messages"
  ON chat_messages
  FOR ALL
  TO public
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');