/*
  # Add Romanian Language Lessons

  1. Changes
    - Add 10 Romanian language lessons
    - Each lesson includes title, description, content and quiz
    - Lessons follow the curriculum for Evaluarea Națională
*/

INSERT INTO public.lessons (id, title, subject, description, content, quiz, duration) 
VALUES 
  (
    'romana-1',
    'Genuri și Specii Literare',
    'romana',
    'Introducere în genurile și speciile literare',
    '# Genuri și Specii Literare

    ## Genuri literare
    - Epic: narațiune, personaje, acțiune
    - Liric: exprimarea sentimentelor
    - Dramatic: dialog, conflict dramatic
    
    ## Specii literare
    - Epice: roman, nuvelă, schiță, basm
    - Lirice: doină, pastel, elegie, odă
    - Dramatice: comedie, tragedie, dramă',
    '[{
      "question": "Care gen literar folosește dialogul ca mod principal de expunere?",
      "options": ["Epic", "Liric", "Dramatic", "Toate"],
      "correctAnswer": 2
    }]'::jsonb,
    45
  ),
  (
    'romana-2',
    'Figuri de Stil',
    'romana',
    'Identificarea și analiza figurilor de stil',
    '# Figuri de Stil

    ## Figuri de stil principale
    - Personificarea
    - Metafora
    - Comparația
    - Epitetul
    - Hiperbola
    
    ## Exemple și analiză
    - Identificare în text
    - Rolul în crearea expresivității',
    '[{
      "question": "Ce figură de stil este în expresia \"ochii mării\"?",
      "options": ["Personificare", "Metaforă", "Comparație", "Epitet"],
      "correctAnswer": 1
    }]'::jsonb,
    45
  ),
  (
    'romana-3',
    'Textul Narativ',
    'romana',
    'Analiza textului narativ literar',
    '# Textul Narativ

    ## Elementele textului narativ
    - Acțiune
    - Personaje
    - Timp și spațiu
    - Narator și perspectivă narativă
    
    ## Momentele subiectului
    - Expozițiune
    - Intrigă
    - Desfășurarea acțiunii
    - Punctul culminant
    - Deznodământ',
    '[{
      "question": "Care element nu aparține textului narativ?",
      "options": ["Acțiunea", "Personajele", "Rima", "Timpul"],
      "correctAnswer": 2
    }]'::jsonb,
    45
  ),
  (
    'romana-4',
    'Caracterizarea Personajelor',
    'romana',
    'Tehnici de caracterizare a personajelor literare',
    '# Caracterizarea Personajelor

    ## Tipuri de caracterizare
    - Directă: prin autor sau alte personaje
    - Indirectă: prin fapte, gesturi, vorbire
    
    ## Portretul fizic și moral
    - Trăsături fizice
    - Trăsături morale
    - Evoluția personajului',
    '[{
      "question": "Ce tip de caracterizare este prezentă în descrierea acțiunilor unui personaj?",
      "options": ["Directă", "Indirectă", "Fizică", "Mixtă"],
      "correctAnswer": 1
    }]'::jsonb,
    45
  ),
  (
    'romana-5',
    'Textul Descriptiv',
    'romana',
    'Analiza textului descriptiv literar și nonliterar',
    '# Textul Descriptiv

    ## Tipuri de descriere
    - Portretul
    - Tabloul
    - Descrierea științifică
    
    ## Mijloace artistice
    - Figuri de stil
    - Imagini artistice
    - Limbaj expresiv',
    '[{
      "question": "Ce tip de descriere este prezentă în descrierea unui apus de soare?",
      "options": ["Portret", "Tablou", "Științifică", "Tehnică"],
      "correctAnswer": 1
    }]'::jsonb,
    45
  ),
  (
    'romana-6',
    'Textul Argumentativ',
    'romana',
    'Structura și redactarea textului argumentativ',
    '# Textul Argumentativ

    ## Structura
    - Ipoteza/Teza
    - Argumentele
    - Exemplele
    - Concluzia
    
    ## Conectori logici
    - De enumerare
    - De argumentare
    - De concluzie',
    '[{
      "question": "Care este primul element al unui text argumentativ?",
      "options": ["Concluzia", "Argumentele", "Ipoteza/Teza", "Exemplele"],
      "correctAnswer": 2
    }]'::jsonb,
    45
  ),
  (
    'romana-7',
    'Morfologie',
    'romana',
    'Părțile de vorbire flexibile și neflexibile',
    '# Morfologie

    ## Părți de vorbire flexibile
    - Substantivul
    - Articolul
    - Adjectivul
    - Pronumele
    - Numeralul
    - Verbul
    
    ## Părți de vorbire neflexibile
    - Adverbul
    - Prepoziția
    - Conjuncția
    - Interjecția',
    '[{
      "question": "Care parte de vorbire este flexibilă?",
      "options": ["Adverb", "Prepoziție", "Pronume", "Conjuncție"],
      "correctAnswer": 2
    }]'::jsonb,
    45
  ),
  (
    'romana-8',
    'Sintaxă',
    'romana',
    'Analiza sintactică a propoziției și frazei',
    '# Sintaxă

    ## Propoziția
    - Părți principale de propoziție
    - Părți secundare de propoziție
    
    ## Fraza
    - Propoziții principale
    - Propoziții subordonate
    - Relații sintactice',
    '[{
      "question": "Care este partea principală de propoziție?",
      "options": ["Atributul", "Complementul", "Predicatul", "Apoziția"],
      "correctAnswer": 2
    }]'::jsonb,
    45
  ),
  (
    'romana-9',
    'Ortografie și Punctuație',
    'romana',
    'Reguli de ortografie și punctuație',
    '# Ortografie și Punctuație

    ## Ortografie
    - Scrierea cu â și î
    - Scrierea cu s și z
    - Scrierea cu x
    
    ## Punctuație
    - Virgula
    - Punctul
    - Semnul exclamării
    - Semnul întrebării',
    '[{
      "question": "Când se folosește â în interiorul cuvântului?",
      "options": ["Întotdeauna", "Niciodată", "În familia lexicală a lui român", "La început de cuvânt"],
      "correctAnswer": 2
    }]'::jsonb,
    45
  ),
  (
    'romana-10',
    'Evaluare Finală',
    'romana',
    'Recapitulare și exerciții model pentru Evaluarea Națională',
    '# Evaluare Finală

    ## Structura subiectelor
    - Subiectul I: Înțelegerea textului
    - Subiectul II: Practica rațională și funcțională a limbii
    - Subiectul III: Redactare de text
    
    ## Strategii de rezolvare
    - Citirea atentă a cerințelor
    - Gestionarea timpului
    - Verificarea răspunsurilor',
    '[{
      "question": "Ce se cere la Subiectul III?",
      "options": ["Analiză gramaticală", "Redactare de text", "Exerciții de vocabular", "Teste grilă"],
      "correctAnswer": 1
    }]'::jsonb,
    45
  );