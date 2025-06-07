/*
  # Update Challenges - Remove old and add new ones

  1. Changes
    - Remove existing challenges
    - Add 3 new challenges: 2 for Romanian, 1 for Math
    - Each challenge has 5 questions and proper scoring

  2. New Challenges
    - Romanian: Analiza textului epic
    - Math: Geometrie - Arii și Perimetri  
    - Romanian: Morfologie - Părțile de vorbire
*/

-- Remove existing challenges
DELETE FROM challenge_progress;
DELETE FROM challenges;

-- Insert new challenges
INSERT INTO challenges (id, title, description, target, type, reward) VALUES
  (
    'romana-analiza-epic',
    'Analiza textului epic',
    'Identifică elementele specifice textului epic',
    5,
    'daily',
    '{"type": "experience", "amount": 100}'::jsonb
  ),
  (
    'mate-geometrie-arii',
    'Geometrie - Arii și Perimetri',
    'Calculează arii și perimetri pentru diferite forme geometrice',
    5,
    'daily',
    '{"type": "experience", "amount": 100}'::jsonb
  ),
  (
    'romana-morfologie',
    'Morfologie - Părțile de vorbire',
    'Identifică și clasifică părțile de vorbire',
    5,
    'daily',
    '{"type": "experience", "amount": 100}'::jsonb
  );