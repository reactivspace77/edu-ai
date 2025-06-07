/*
  # Add Educational Achievement Badges

  1. New Badges
    - Add predefined badges for various achievements
    - Define clear criteria for each badge
    - Include different categories of badges

  2. Categories
    - Progress badges (completing lessons)
    - Subject mastery badges
    - Engagement badges (daily streaks)
    - Special achievement badges
*/

-- First, clear any existing badges
TRUNCATE TABLE badges CASCADE;

-- Insert predefined badges
INSERT INTO badges (id, name, description, criteria) VALUES
  -- Progress Badges
  ('first-lesson', 'Prima Lecție', 'Ai completat prima ta lecție', 'complete_first_lesson'),
  ('quick-learner', 'Învățăcel Rapid', 'Ai completat 5 lecții', 'complete_5_lessons'),
  ('knowledge-seeker', 'În Căutarea Cunoașterii', 'Ai completat 10 lecții', 'complete_10_lessons'),
  ('master-student', 'Master al Studiului', 'Ai completat 25 de lecții', 'complete_25_lessons'),
  
  -- Subject Mastery Badges
  ('math-novice', 'Matematician Începător', 'Ai completat primele 3 lecții de matematică', 'complete_3_math_lessons'),
  ('math-enthusiast', 'Entuziast Matematică', 'Ai completat 5 lecții de matematică', 'complete_5_math_lessons'),
  ('math-expert', 'Expert Matematică', 'Ai completat 10 lecții de matematică', 'complete_10_math_lessons'),
  
  -- Quiz Performance Badges
  ('perfect-score', 'Scor Perfect', 'Ai obținut punctaj maxim la un quiz', 'perfect_quiz_score'),
  ('quiz-master', 'Maestru al Testelor', 'Ai obținut 3 scoruri perfecte consecutive', 'three_perfect_scores'),
  
  -- Experience Level Badges
  ('level-5', 'Nivel 5', 'Ai atins nivelul 5', 'reach_level_5'),
  ('level-10', 'Nivel 10', 'Ai atins nivelul 10', 'reach_level_10'),
  ('level-20', 'Nivel 20', 'Ai atins nivelul 20', 'reach_level_20'),
  
  -- Engagement Badges
  ('daily-streak-3', 'Consecvent', '3 zile consecutive de învățare', 'daily_streak_3'),
  ('daily-streak-7', 'Dedicat', '7 zile consecutive de învățare', 'daily_streak_7'),
  ('daily-streak-30', 'Perseverent', '30 de zile consecutive de învățare', 'daily_streak_30'),
  
  -- Special Achievement Badges
  ('early-bird', 'Matinal', 'Ai învățat dimineața devreme', 'study_early_morning'),
  ('night-owl', 'Nocturnă', 'Ai învățat noaptea târziu', 'study_late_night'),
  ('weekend-warrior', 'Weekend Warrior', 'Ai învățat în weekend', 'study_weekend'),
  ('full-attendance', 'Prezență Completă', 'Ai completat toate lecțiile dintr-o săptămână', 'complete_week_lessons');

-- Create a function to check and award badges
CREATE OR REPLACE FUNCTION check_and_award_badges()
RETURNS TRIGGER AS $$
DECLARE
  lesson_count INTEGER;
  math_lesson_count INTEGER;
  consecutive_perfect_scores INTEGER;
BEGIN
  -- Count total completed lessons
  SELECT COUNT(*) INTO lesson_count
  FROM evaluations
  WHERE "userId" = NEW."userId";

  -- Count completed math lessons
  SELECT COUNT(*) INTO math_lesson_count
  FROM evaluations
  WHERE "userId" = NEW."userId"
  AND subject = 'matematica';

  -- Award progress badges
  IF lesson_count = 1 THEN
    INSERT INTO user_badges ("userId", "badgeId")
    VALUES (NEW."userId", 'first-lesson')
    ON CONFLICT DO NOTHING;
  END IF;

  IF lesson_count = 5 THEN
    INSERT INTO user_badges ("userId", "badgeId")
    VALUES (NEW."userId", 'quick-learner')
    ON CONFLICT DO NOTHING;
  END IF;

  IF lesson_count = 10 THEN
    INSERT INTO user_badges ("userId", "badgeId")
    VALUES (NEW."userId", 'knowledge-seeker')
    ON CONFLICT DO NOTHING;
  END IF;

  -- Award math mastery badges
  IF math_lesson_count = 3 THEN
    INSERT INTO user_badges ("userId", "badgeId")
    VALUES (NEW."userId", 'math-novice')
    ON CONFLICT DO NOTHING;
  END IF;

  IF math_lesson_count = 5 THEN
    INSERT INTO user_badges ("userId", "badgeId")
    VALUES (NEW."userId", 'math-enthusiast')
    ON CONFLICT DO NOTHING;
  END IF;

  IF math_lesson_count = 10 THEN
    INSERT INTO user_badges ("userId", "badgeId")
    VALUES (NEW."userId", 'math-expert')
    ON CONFLICT DO NOTHING;
  END IF;

  -- Award perfect score badge
  IF NEW.score = NEW."totalQuestions" THEN
    INSERT INTO user_badges ("userId", "badgeId")
    VALUES (NEW."userId", 'perfect-score')
    ON CONFLICT DO NOTHING;

    -- Check for consecutive perfect scores
    SELECT COUNT(*) INTO consecutive_perfect_scores
    FROM (
      SELECT score = "totalQuestions" as perfect
      FROM evaluations
      WHERE "userId" = NEW."userId"
      ORDER BY date DESC
      LIMIT 3
    ) scores
    WHERE perfect = true;

    IF consecutive_perfect_scores = 3 THEN
      INSERT INTO user_badges ("userId", "badgeId")
      VALUES (NEW."userId", 'quiz-master')
      ON CONFLICT DO NOTHING;
    END IF;
  END IF;

  -- Create notification for new badge
  INSERT INTO notifications ("userId", message)
  SELECT NEW."userId", 'Felicitări! Ai primit insigna ' || badges.name || '!'
  FROM user_badges
  JOIN badges ON badges.id = user_badges."badgeId"
  WHERE user_badges."userId" = NEW."userId"
  AND user_badges."earnedAt" >= NOW() - INTERVAL '1 minute';

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for badge checks
DROP TRIGGER IF EXISTS check_badges_trigger ON evaluations;
CREATE TRIGGER check_badges_trigger
AFTER INSERT ON evaluations
FOR EACH ROW
EXECUTE FUNCTION check_and_award_badges();