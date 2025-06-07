-- Add lessonId column to evaluations table
ALTER TABLE evaluations
ADD COLUMN "lessonId" text REFERENCES lessons(id);

-- Update existing evaluations to have a default lesson
UPDATE evaluations
SET "lessonId" = (
  SELECT id FROM lessons 
  WHERE subject = evaluations.subject 
  ORDER BY id 
  LIMIT 1
);