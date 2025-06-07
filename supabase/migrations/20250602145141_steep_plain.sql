/*
  # Add Mathematics Lessons

  1. Changes
    - Add 10 mathematics lessons for study plan
    - Each lesson includes title, content, quiz questions
    - Lessons follow a logical progression

  2. Content
    - Basic algebra
    - Equations and inequalities
    - Functions and graphs
    - Geometry
*/

INSERT INTO public.lessons (id, title, subject, description, content, quiz, duration) 
VALUES 
  (
    'mate-1',
    'Numere Reale și Operații',
    'matematica',
    'Introducere în numerele reale și operațiile de bază',
    '# Numere Reale și Operații

    ## Mulțimea numerelor reale
    - Numere naturale (N)
    - Numere întregi (Z)
    - Numere raționale (Q)
    - Numere iraționale (R\Q)
    
    ## Operații cu numere reale
    - Adunarea și scăderea
    - Înmulțirea și împărțirea
    - Ridicarea la putere
    - Radicali',
    '[{
      "question": "Care dintre următoarele numere este irațional?",
      "options": ["0.25", "√2", "3/4", "-5"],
      "correctAnswer": 1
    }]'::jsonb,
    45
  ),
  (
    'mate-2',
    'Ecuații de Gradul I',
    'matematica',
    'Rezolvarea ecuațiilor de gradul I și aplicații',
    '# Ecuații de Gradul I

    ## Forma standard
    - ax + b = 0, unde a ≠ 0
    
    ## Metoda de rezolvare
    1. Transpunerea termenilor
    2. Reducerea termenilor asemenea
    3. Izolarea necunoscutei
    
    ## Verificarea soluției',
    '[{
      "question": "Care este soluția ecuației 2x + 6 = 0?",
      "options": ["-3", "3", "-2", "2"],
      "correctAnswer": 0
    }]'::jsonb,
    45
  ),
  (
    'mate-3',
    'Inecuații de Gradul I',
    'matematica',
    'Rezolvarea inecuațiilor de gradul I',
    '# Inecuații de Gradul I

    ## Forme standard
    - ax + b > 0
    - ax + b < 0
    - ax + b ≥ 0
    - ax + b ≤ 0
    
    ## Reguli de rezolvare
    - Păstrarea sensului inegalității
    - Schimbarea sensului la înmulțire cu număr negativ',
    '[{
      "question": "Care este soluția inecuației 2x + 4 > 0?",
      "options": ["x > -2", "x < -2", "x > 2", "x < 2"],
      "correctAnswer": 0
    }]'::jsonb,
    45
  ),
  (
    'mate-4',
    'Funcții și Grafice',
    'matematica',
    'Reprezentarea grafică a funcțiilor',
    '# Funcții și Grafice

    ## Funcția liniară
    - f(x) = ax + b
    - Reprezentare grafică
    - Proprietăți
    
    ## Sisteme de coordonate
    - Axa Ox și Oy
    - Puncte în plan
    - Distanța între puncte',
    '[{
      "question": "Ce reprezintă graficul funcției f(x) = 2x?",
      "options": ["O parabolă", "O dreaptă", "O hiperbolă", "Un cerc"],
      "correctAnswer": 1
    }]'::jsonb,
    45
  ),
  (
    'mate-5',
    'Sisteme de Ecuații',
    'matematica',
    'Rezolvarea sistemelor de ecuații liniare',
    '# Sisteme de Ecuații

    ## Metode de rezolvare
    - Metoda substituției
    - Metoda reducerii
    - Metoda grafică
    
    ## Aplicații practice
    - Probleme cu două necunoscute
    - Interpretare geometrică',
    '[{
      "question": "Care metodă este recomandată când un coeficient este 1?",
      "options": ["Reducere", "Substituție", "Cramer", "Grafică"],
      "correctAnswer": 1
    }]'::jsonb,
    45
  ),
  (
    'mate-6',
    'Geometrie - Triunghiuri',
    'matematica',
    'Proprietăți ale triunghiurilor',
    '# Triunghiuri

    ## Clasificare
    - După laturi
    - După unghiuri
    
    ## Linii importante
    - Mediane
    - Înălțimi
    - Bisectoare
    - Mediatoare',
    '[{
      "question": "Ce fel de triunghi are toate unghiurile egale?",
      "options": ["Dreptunghic", "Isoscel", "Echilateral", "Obtuzunghic"],
      "correctAnswer": 2
    }]'::jsonb,
    45
  ),
  (
    'mate-7',
    'Geometrie - Patrulatere',
    'matematica',
    'Proprietăți ale patrulaterelor',
    '# Patrulatere

    ## Tipuri de patrulatere
    - Pătrat
    - Dreptunghi
    - Romb
    - Paralelogram
    - Trapez',
    '[{
      "question": "Care patrulater are toate laturile egale și toate unghiurile drepte?",
      "options": ["Romb", "Dreptunghi", "Pătrat", "Paralelogram"],
      "correctAnswer": 2
    }]'::jsonb,
    45
  ),
  (
    'mate-8',
    'Geometrie - Cercul',
    'matematica',
    'Proprietăți ale cercului',
    '# Cercul

    ## Elemente
    - Rază
    - Diametru
    - Coardă
    - Arc
    - Sector circular
    
    ## Formule
    - Lungimea cercului
    - Aria cercului',
    '[{
      "question": "Care este relația dintre rază (R) și diametru (D)?",
      "options": ["R = 2D", "D = 2R", "R = D", "D = R²"],
      "correctAnswer": 1
    }]'::jsonb,
    45
  ),
  (
    'mate-9',
    'Calcul Algebric',
    'matematica',
    'Operații cu expresii algebrice',
    '# Calcul Algebric

    ## Formule de calcul prescurtat
    - (a + b)² = a² + 2ab + b²
    - (a - b)² = a² - 2ab + b²
    - (a + b)(a - b) = a² - b²
    
    ## Descompuneri în factori',
    '[{
      "question": "Care este rezultatul (x + 2)²?",
      "options": ["x² + 2", "x² + 4x + 4", "x² + 4", "2x² + 4"],
      "correctAnswer": 1
    }]'::jsonb,
    45
  ),
  (
    'mate-10',
    'Probleme de Sinteză',
    'matematica',
    'Rezolvarea problemelor complexe',
    '# Probleme de Sinteză

    ## Strategii de rezolvare
    - Citirea atentă a enunțului
    - Identificarea datelor
    - Alegerea metodei
    - Verificarea rezultatului
    
    ## Tipuri de probleme
    - Probleme de mișcare
    - Probleme cu procente
    - Probleme de geometrie',
    '[{
      "question": "Care este primul pas în rezolvarea unei probleme?",
      "options": ["Calculul", "Citirea enunțului", "Scrierea rezultatului", "Verificarea"],
      "correctAnswer": 1
    }]'::jsonb,
    45
  );