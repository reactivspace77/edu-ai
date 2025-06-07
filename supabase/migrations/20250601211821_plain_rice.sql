/*
  # Initial Database Schema Setup

  1. New Tables
    - users: Stores user profiles and progress
    - notifications: User notifications
    - lessons: Educational content
    - study_plans: Personalized study plans
    - badges: Achievement badges
    - challenges: Daily/weekly challenges
    - evaluations: User assessment results
    - questions: Quiz questions
    - challenge_progress: Track challenge completion
    - user_badges: Track earned badges

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Set up appropriate foreign key constraints

  3. Features
    - UUID generation for IDs
    - Timestamp tracking
    - JSON support for complex data
*/

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: users
CREATE TABLE public.users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  name text,
  class text,
  school text,
  avatar text,
  level integer DEFAULT 1,
  experience integer DEFAULT 0,
  subjects text[],
  "personalGoals" text,
  badges text[],
  "createdAt" timestamp with time zone DEFAULT now()
);
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile." ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile." ON public.users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile." ON public.users FOR UPDATE USING (auth.uid() = id);

-- Table: notifications
CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "userId" uuid REFERENCES public.users(id) ON DELETE CASCADE,
  message text NOT NULL,
  read boolean DEFAULT FALSE,
  "createdAt" timestamp with time zone DEFAULT now()
);
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own notifications." ON public.notifications FOR SELECT USING (auth.uid() = "userId");
CREATE POLICY "Authenticated users can insert notifications." ON public.notifications FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Table: lessons
CREATE TABLE public.lessons (
  id text PRIMARY KEY,
  title text NOT NULL,
  subject text NOT NULL,
  description text,
  "videoUrl" text,
  content text,
  quiz jsonb,
  duration integer
);
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lessons are viewable by everyone." ON public.lessons FOR SELECT USING (TRUE);
CREATE POLICY "Authenticated users can insert lessons." ON public.lessons FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Table: study_plans
CREATE TABLE public.study_plans (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "userId" uuid REFERENCES public.users(id) ON DELETE CASCADE,
  recommendations text[],
  schedule jsonb,
  "createdAt" timestamp with time zone DEFAULT now()
);
ALTER TABLE public.study_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own study plans." ON public.study_plans FOR SELECT USING (auth.uid() = "userId");
CREATE POLICY "Authenticated users can insert study plans." ON public.study_plans FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Table: badges
CREATE TABLE public.badges (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text,
  "iconUrl" text,
  criteria text
);
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Badges are viewable by everyone." ON public.badges FOR SELECT USING (TRUE);
CREATE POLICY "Authenticated users can insert badges." ON public.badges FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Table: challenges
CREATE TABLE public.challenges (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text,
  target integer,
  type text,
  reward jsonb
);
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Challenges are viewable by everyone." ON public.challenges FOR SELECT USING (TRUE);
CREATE POLICY "Authenticated users can insert challenges." ON public.challenges FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Table: evaluations
CREATE TABLE public.evaluations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "userId" uuid REFERENCES public.users(id) ON DELETE CASCADE,
  subject text NOT NULL,
  score integer,
  "totalQuestions" integer,
  date timestamp with time zone DEFAULT now()
);
ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own evaluations." ON public.evaluations FOR SELECT USING (auth.uid() = "userId");
CREATE POLICY "Authenticated users can insert evaluations." ON public.evaluations FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Table: questions
CREATE TABLE public.questions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject text NOT NULL,
  text text NOT NULL,
  options text[],
  "correctAnswer" integer,
  difficulty text
);
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Questions are viewable by everyone." ON public.questions FOR SELECT USING (TRUE);
CREATE POLICY "Authenticated users can insert questions." ON public.questions FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Table: challenge_progress
CREATE TABLE public.challenge_progress (
  "userId" uuid REFERENCES public.users(id) ON DELETE CASCADE,
  "challengeId" text REFERENCES public.challenges(id) ON DELETE CASCADE,
  current integer DEFAULT 0,
  PRIMARY KEY ("userId", "challengeId")
);
ALTER TABLE public.challenge_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own challenge progress." ON public.challenge_progress FOR SELECT USING (auth.uid() = "userId");
CREATE POLICY "Users can update their own challenge progress." ON public.challenge_progress FOR UPDATE USING (auth.uid() = "userId");
CREATE POLICY "Authenticated users can insert challenge progress." ON public.challenge_progress FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Table: user_badges
CREATE TABLE public.user_badges (
  "userId" uuid REFERENCES public.users(id) ON DELETE CASCADE,
  "badgeId" text REFERENCES public.badges(id) ON DELETE CASCADE,
  "earnedAt" timestamp with time zone DEFAULT now(),
  PRIMARY KEY ("userId", "badgeId")
);
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own earned badges." ON public.user_badges FOR SELECT USING (auth.uid() = "userId");
CREATE POLICY "Authenticated users can insert user badges." ON public.user_badges FOR INSERT WITH CHECK (auth.role() = 'authenticated');