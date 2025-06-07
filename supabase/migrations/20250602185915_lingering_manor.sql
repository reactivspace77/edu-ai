-- Add mock lessons for Bacalaureat subjects

-- Physics Lessons
INSERT INTO public.lessons (id, title, subject, description, content, quiz, duration) 
VALUES 
  -- Mechanics
  ('fizica-1', 'Cinematica Punctului Material', 'fizica', 'Studiul mișcării corpurilor', 
   '# Cinematica Punctului Material\n\n## Mărimi fizice\n- Poziție\n- Viteză\n- Accelerație\n\n## Tipuri de mișcare\n- Mișcare rectilinie uniformă\n- Mișcare uniform accelerată\n- Mișcare circulară',
   '[{"question": "Care este unitatea de măsură pentru viteză în SI?", "options": ["m/s", "km/h", "m/s²", "N"], "correctAnswer": 0}]'::jsonb, 45),
  
  ('fizica-2', 'Principiile Mecanicii Newtoniene', 'fizica', 'Legile fundamentale ale mecanicii',
   '# Principiile Mecanicii\n\n## Principiile lui Newton\n- Principiul inerției\n- Principiul fundamental\n- Principiul acțiunii și reacțiunii',
   '[{"question": "Care este enunțul principiului inerției?", "options": ["Un corp își păstrează starea de repaus sau de mișcare rectilinie uniformă", "Forța este egală cu masa înmulțită cu accelerația", "La orice acțiune există o reacțiune egală și de sens opus", "Niciuna"], "correctAnswer": 0}]'::jsonb, 45),

  -- Thermodynamics
  ('fizica-3', 'Termodinamica Gazelor', 'fizica', 'Studiul comportamentului gazelor',
   '# Termodinamica\n\n## Concepte fundamentale\n- Temperatură\n- Presiune\n- Volum\n\n## Legi\n- Legea gazelor perfecte\n- Transformări termodinamice',
   '[{"question": "Care este relația dintre presiune și volum la temperatură constantă?", "options": ["Directă", "Inversă", "Nu există relație", "Constantă"], "correctAnswer": 1}]'::jsonb, 45),

  -- Electricity
  ('fizica-4', 'Electrostatică', 'fizica', 'Studiul sarcinilor electrice în repaus',
   '# Electrostatică\n\n## Concepte\n- Sarcină electrică\n- Câmp electric\n- Potențial electric',
   '[{"question": "Care este unitatea de măsură pentru sarcina electrică?", "options": ["Coulomb", "Volt", "Amper", "Ohm"], "correctAnswer": 0}]'::jsonb, 45),

  -- Magnetism
  ('fizica-5', 'Magnetism', 'fizica', 'Studiul câmpurilor magnetice',
   '# Magnetism\n\n## Concepte\n- Câmp magnetic\n- Forța Lorentz\n- Inducție electromagnetică',
   '[{"question": "Ce este inducția electromagnetică?", "options": ["Producerea unui curent electric", "Producerea unui câmp magnetic", "Producerea unei tensiuni electrice prin variația fluxului magnetic", "Niciuna"], "correctAnswer": 2}]'::jsonb, 45),

  -- Optics
  ('fizica-6', 'Optică Geometrică', 'fizica', 'Studiul propagării luminii',
   '# Optică Geometrică\n\n## Concepte\n- Reflexia luminii\n- Refracția luminii\n- Lentile',
   '[{"question": "Care este legea reflexiei?", "options": ["Unghiul de incidență este egal cu unghiul de reflexie", "Lumina se propagă în linie dreaptă", "Lumina se refractă la trecerea în alt mediu", "Niciuna"], "correctAnswer": 0}]'::jsonb, 45),

  -- Quantum Physics
  ('fizica-7', 'Fizică Cuantică', 'fizica', 'Introducere în fizica cuantică',
   '# Fizică Cuantică\n\n## Concepte\n- Efectul fotoelectric\n- Dualismul undă-particulă\n- Modelul atomic',
   '[{"question": "Ce este efectul fotoelectric?", "options": ["Emisia de electroni sub acțiunea luminii", "Reflexia luminii", "Refracția luminii", "Interferența luminii"], "correctAnswer": 0}]'::jsonb, 45),

  -- Nuclear Physics
  ('fizica-8', 'Fizică Nucleară', 'fizica', 'Studiul nucleului atomic',
   '# Fizică Nucleară\n\n## Concepte\n- Structura nucleului\n- Radioactivitate\n- Fisiune și fuziune nucleară',
   '[{"question": "Ce este radioactivitatea?", "options": ["Emisia spontană de radiații", "Absorbția de radiații", "Reflexia radiațiilor", "Refracția radiațiilor"], "correctAnswer": 0}]'::jsonb, 45),

  -- Waves
  ('fizica-9', 'Oscilații și Unde', 'fizica', 'Studiul mișcărilor oscilatorii și al undelor',
   '# Oscilații și Unde\n\n## Concepte\n- Mișcarea oscilatorie\n- Unde mecanice\n- Unde electromagnetice',
   '[{"question": "Ce este o undă?", "options": ["O perturbație care se propagă", "O mișcare rectilinie", "O mișcare circulară", "O mișcare browniană"], "correctAnswer": 0}]'::jsonb, 45),

  -- Relativity
  ('fizica-10', 'Relativitate', 'fizica', 'Introducere în teoria relativității',
   '# Relativitate\n\n## Concepte\n- Relativitatea galileiană\n- Relativitatea einsteiniană\n- Spațiu și timp',
   '[{"question": "Ce postulează teoria relativității?", "options": ["Viteza luminii este constantă", "Timpul este absolut", "Spațiul este absolut", "Masa este constantă"], "correctAnswer": 0}]'::jsonb, 45);

-- Chemistry Lessons
INSERT INTO public.lessons (id, title, subject, description, content, quiz, duration) 
VALUES 
  -- General Chemistry
  ('chimie-1', 'Structura Atomului', 'chimie', 'Studiul structurii atomice',
   '# Structura Atomului\n\n## Concepte\n- Particule subatomice\n- Configurație electronică\n- Proprietăți periodice',
   '[{"question": "Care sunt particulele subatomice principale?", "options": ["Protoni, neutroni, electroni", "Protoni și electroni", "Neutroni și electroni", "Doar protoni"], "correctAnswer": 0}]'::jsonb, 45),

  -- Chemical Bonding
  ('chimie-2', 'Legături Chimice', 'chimie', 'Studiul legăturilor dintre atomi',
   '# Legături Chimice\n\n## Tipuri\n- Legătura ionică\n- Legătura covalentă\n- Legătura metalică',
   '[{"question": "Ce este o legătură ionică?", "options": ["Transfer de electroni", "Punere în comun de electroni", "Electroni liberi", "Niciuna"], "correctAnswer": 0}]'::jsonb, 45),

  -- Solutions
  ('chimie-3', 'Soluții', 'chimie', 'Studiul soluțiilor chimice',
   '# Soluții\n\n## Concepte\n- Concentrație\n- Solubilitate\n- Proprietăți coligative',
   '[{"question": "Ce este concentrația molară?", "options": ["Număr de moli de substanță dizolvată per litru de soluție", "Masa de substanță dizolvată", "Volumul de soluție", "Masa de solvent"], "correctAnswer": 0}]'::jsonb, 45),

  -- Acids and Bases
  ('chimie-4', 'Acizi și Baze', 'chimie', 'Studiul acizilor și bazelor',
   '# Acizi și Baze\n\n## Concepte\n- Teoria Brønsted-Lowry\n- pH și pOH\n- Neutralizare',
   '[{"question": "Ce este pH-ul?", "options": ["Concentrația ionilor de hidrogen", "Concentrația ionilor de hidroxil", "Concentrația acizilor", "Concentrația bazelor"], "correctAnswer": 0}]'::jsonb, 45),

  -- Redox Reactions
  ('chimie-5', 'Reacții Redox', 'chimie', 'Studiul reacțiilor de oxido-reducere',
   '# Reacții Redox\n\n## Concepte\n- Oxidare și reducere\n- Număr de oxidare\n- Pile electrochimice',
   '[{"question": "Ce este oxidarea?", "options": ["Pierdere de electroni", "Câștig de electroni", "Pierdere de protoni", "Câștig de protoni"], "correctAnswer": 0}]'::jsonb, 45),

  -- Organic Chemistry
  ('chimie-6', 'Chimie Organică', 'chimie', 'Introducere în chimia organică',
   '# Chimie Organică\n\n## Concepte\n- Hidrocarburi\n- Grupe funcționale\n- Izomerie',
   '[{"question": "Ce sunt hidrocarburile?", "options": ["Compuși formați doar din carbon și hidrogen", "Compuși cu oxigen", "Compuși cu azot", "Compuși cu sulf"], "correctAnswer": 0}]'::jsonb, 45),

  -- Thermochemistry
  ('chimie-7', 'Termochimie', 'chimie', 'Studiul energiei în reacțiile chimice',
   '# Termochimie\n\n## Concepte\n- Entalpie\n- Entropie\n- Energie liberă',
   '[{"question": "Ce este entalpia?", "options": ["Conținutul de energie al unui sistem", "Temperatura sistemului", "Presiunea sistemului", "Volumul sistemului"], "correctAnswer": 0}]'::jsonb, 45),

  -- Chemical Kinetics
  ('chimie-8', 'Cinetică Chimică', 'chimie', 'Studiul vitezei reacțiilor chimice',
   '# Cinetică Chimică\n\n## Concepte\n- Viteza de reacție\n- Factori care influențează viteza\n- Catalizatori',
   '[{"question": "Ce este un catalizator?", "options": ["O substanță care mărește viteza reacției", "Un reactant", "Un produs", "Un inhibitor"], "correctAnswer": 0}]'::jsonb, 45),

  -- Chemical Equilibrium
  ('chimie-9', 'Echilibru Chimic', 'chimie', 'Studiul echilibrului chimic',
   '# Echilibru Chimic\n\n## Concepte\n- Constanta de echilibru\n- Principiul Le Chatelier\n- Factori care influențează echilibrul',
   '[{"question": "Ce este constanta de echilibru?", "options": ["Raportul concentrațiilor la echilibru", "Viteza reacției directe", "Viteza reacției inverse", "Temperatura sistemului"], "correctAnswer": 0}]'::jsonb, 45),

  -- Electrochemistry
  ('chimie-10', 'Electrochimie', 'chimie', 'Studiul proceselor electrochimice',
   '# Electrochimie\n\n## Concepte\n- Electroliza\n- Pile galvanice\n- Coroziune',
   '[{"question": "Ce este electroliza?", "options": ["Descompunerea unei substanțe prin curent electric", "Formarea unei substanțe", "Oxidarea unei substanțe", "Reducerea unei substanțe"], "correctAnswer": 0}]'::jsonb, 45);

-- Biology Lessons
INSERT INTO public.lessons (id, title, subject, description, content, quiz, duration) 
VALUES 
  -- Cell Biology
  ('biologie-1', 'Celula', 'biologie', 'Studiul structurii și funcțiilor celulei',
   '# Celula\n\n## Structură\n- Membrană celulară\n- Citoplasmă\n- Nucleu\n\n## Organite celulare\n- Mitocondrii\n- Reticul endoplasmatic\n- Aparatul Golgi',
   '[{"question": "Care este rolul mitocondriilor?", "options": ["Producerea de energie", "Sinteza proteinelor", "Digestia celulară", "Depozitarea apei"], "correctAnswer": 0}]'::jsonb, 45),

  -- Genetics
  ('biologie-2', 'Genetică', 'biologie', 'Studiul eredității și variabilității',
   '# Genetică\n\n## Concepte\n- ADN și ARN\n- Gene și cromozomi\n- Legile lui Mendel',
   '[{"question": "Ce este o genă?", "options": ["O secvență de ADN care codifică o proteină", "O proteină", "Un cromozom", "O celulă"], "correctAnswer": 0}]'::jsonb, 45),

  -- Human Anatomy
  ('biologie-3', 'Anatomie Umană', 'biologie', 'Studiul structurii corpului uman',
   '# Anatomie Umană\n\n## Sisteme\n- Sistem nervos\n- Sistem circulator\n- Sistem respirator',
   '[{"question": "Care este rolul sistemului circulator?", "options": ["Transportul substanțelor în organism", "Digestia alimentelor", "Respirația", "Excreția"], "correctAnswer": 0}]'::jsonb, 45),

  -- Physiology
  ('biologie-4', 'Fiziologie', 'biologie', 'Studiul funcțiilor organismului',
   '# Fiziologie\n\n## Procese\n- Respirație\n- Digestie\n- Circulație',
   '[{"question": "Ce este respirația celulară?", "options": ["Producerea de energie din glucoză", "Schimbul de gaze", "Transportul oxigenului", "Ventilația pulmonară"], "correctAnswer": 0}]'::jsonb, 45),

  -- Ecology
  ('biologie-5', 'Ecologie', 'biologie', 'Studiul relațiilor dintre organisme și mediu',
   '# Ecologie\n\n## Concepte\n- Ecosisteme\n- Lanțuri trofice\n- Cicluri biogeochimice',
   '[{"question": "Ce este un ecosistem?", "options": ["Comunitatea de organisme și mediul lor", "O specie", "O populație", "Un habitat"], "correctAnswer": 0}]'::jsonb, 45),

  -- Evolution
  ('biologie-6', 'Evoluție', 'biologie', 'Studiul modificărilor speciilor în timp',
   '# Evoluție\n\n## Concepte\n- Selecție naturală\n- Adaptare\n- Speciere',
   '[{"question": "Ce este selecția naturală?", "options": ["Supraviețuirea celor mai adaptați", "Modificări genetice intenționate", "Reproducerea asexuată", "Mutații"], "correctAnswer": 0}]'::jsonb, 45),

  -- Microbiology
  ('biologie-7', 'Microbiologie', 'biologie', 'Studiul microorganismelor',
   '# Microbiologie\n\n## Organisme\n- Bacterii\n- Virusuri\n- Fungi',
   '[{"question": "Ce sunt bacteriile?", "options": ["Organisme unicelulare procariote", "Organisme multicelulare", "Virusuri", "Fungi"], "correctAnswer": 0}]'::jsonb, 45),

  -- Plant Biology
  ('biologie-8', 'Biologia Plantelor', 'biologie', 'Studiul structurii și funcțiilor plantelor',
   '# Biologia Plantelor\n\n## Procese\n- Fotosinteză\n- Respirație\n- Transpirație',
   '[{"question": "Ce este fotosinteza?", "options": ["Producerea de glucoză folosind energia solară", "Respirația celulară", "Transpirația", "Nutriția minerală"], "correctAnswer": 0}]'::jsonb, 45),

  -- Animal Biology
  ('biologie-9', 'Biologia Animalelor', 'biologie', 'Studiul structurii și funcțiilor animalelor',
   '# Biologia Animalelor\n\n## Sisteme\n- Sistem digestiv\n- Sistem excretor\n- Sistem reproducător',
   '[{"question": "Care este rolul sistemului digestiv?", "options": ["Transformarea alimentelor în nutrienți", "Transportul substanțelor", "Eliminarea deșeurilor", "Respirația"], "correctAnswer": 0}]'::jsonb, 45),

  -- Biotechnology
  ('biologie-10', 'Biotehnologie', 'biologie', 'Studiul aplicațiilor biologiei în tehnologie',
   '# Biotehnologie\n\n## Aplicații\n- Inginerie genetică\n- Clonare\n- Terapie genică',
   '[{"question": "Ce este ingineria genetică?", "options": ["Modificarea ADN-ului", "Clonarea organismelor", "Producerea de anticorpi", "Cultivarea țesuturilor"], "correctAnswer": 0}]'::jsonb, 45);

-- History Lessons
INSERT INTO public.lessons (id, title, subject, description, content, quiz, duration) 
VALUES 
  -- Ancient History
  ('istorie-1', 'Civilizații Antice', 'istorie', 'Studiul civilizațiilor antice',
   '# Civilizații Antice\n\n## Civilizații\n- Mesopotamia\n- Egipt antic\n- Grecia antică\n- Roma antică',
   '[{"question": "Care a fost prima civilizație din Mesopotamia?", "options": ["Sumerienii", "Babilonienii", "Asirienii", "Akkadienii"], "correctAnswer": 0}]'::jsonb, 45),

  -- Medieval History
  ('istorie-2', 'Evul Mediu', 'istorie', 'Studiul perioadei medievale',
   '# Evul Mediu\n\n## Aspecte\n- Feudalism\n- Cruciade\n- Renaștere',
   '[{"question": "Ce a fost feudalismul?", "options": ["Un sistem social și politic bazat pe relații de vasalitate", "O religie", "Un stil artistic", "O formă de guvernare democratică"], "correctAnswer": 0}]'::jsonb, 45),

  -- Modern History
  ('istorie-3', 'Epoca Modernă', 'istorie', 'Studiul perioadei moderne',
   '# Epoca Modernă\n\n## Evenimente\n- Revoluția Franceză\n- Revoluția Industrială\n- Unificarea statelor',
   '[{"question": "Când a avut loc Revoluția Franceză?", "options": ["1789", "1750", "1800", "1850"], "correctAnswer": 0}]'::jsonb, 45),

  -- Contemporary History
  ('istorie-4', 'Istorie Contemporană', 'istorie', 'Studiul perioadei contemporane',
   '# Istorie Contemporană\n\n## Evenimente\n- Primul Război Mondial\n- Al Doilea Război Mondial\n- Războiul Rece',
   '[{"question": "Când a început Primul Război Mondial?", "options": ["1914", "1918", "1939", "1945"], "correctAnswer": 0}]'::jsonb, 45),

  -- Romanian History
  ('istorie-5', 'Istoria României', 'istorie', 'Studiul istoriei naționale',
   '# Istoria României\n\n## Perioade\n- Dacia antică\n- Evul Mediu românesc\n- România modernă',
   '[{"question": "Cine a fost primul rege al României?", "options": ["Carol I", "Ferdinand I", "Carol II", "Mihai I"], "correctAnswer": 0}]'::jsonb, 45),

  -- Cultural History
  ('istorie-6', 'Istorie Culturală', 'istorie', 'Studiul evoluției culturale',
   '# Istorie Culturală\n\n## Aspecte\n- Arte\n- Literatură\n- Științe',
   '[{"question": "Ce a fost Renașterea?", "options": ["O mișcare culturală și artistică", "Un război", "O revoluție politică", "O religie"], "correctAnswer": 0}]'::jsonb, 45),

  -- Economic History
  ('istorie-7', 'Istorie Economică', 'istorie', 'Studiul evoluției economice',
   '# Istorie Economică\n\n## Aspecte\n- Sisteme economice\n- Comerț\n- Industrializare',
   '[{"question": "Ce a fost Revoluția Industrială?", "options": ["Transformarea producției de la manual la mecanic", "O revoluție politică", "O mișcare culturală", "O reformă religioasă"], "correctAnswer": 0}]'::jsonb, 45),

  -- Political History
  ('istorie-8', 'Istorie Politică', 'istorie', 'Studiul evoluției politice',
   '# Istorie Politică\n\n## Aspecte\n- Forme de guvernare\n- Revoluții\n- Războaie',
   '[{"question": "Ce este democrația?", "options": ["Guvernare de către popor", "Guvernare de către un singur om", "Guvernare de către elite", "Guvernare de către armată"], "correctAnswer": 0}]'::jsonb, 45),

  -- Social History
  ('istorie-9', 'Istorie Socială', 'istorie', 'Studiul evoluției sociale',
   '# Istorie Socială\n\n## Aspecte\n- Clase sociale\n- Mișcări sociale\n- Reforme',
   '[{"question": "Ce au fost mișcările pentru drepturi civile?", "options": ["Lupte pentru egalitate și dreptate socială", "Războaie", "Revoluții economice", "Reforme religioase"], "correctAnswer": 0}]'::jsonb, 45),

  -- Military History
  ('istorie-10', 'Istorie Militară', 'istorie', 'Studiul conflictelor militare',
   '# Istorie Militară\n\n## Aspecte\n- Strategii militare\n- Tehnologie militară\n- Mari bătălii',
   '[{"question": "Care a fost cea mai mare bătălie din Al Doilea Război Mondial?", "options": ["Stalingrad", "Normandia", "Midway", "El Alamein"], "correctAnswer": 0}]'::jsonb, 45);

-- Geography Lessons
INSERT INTO public.lessons (id, title, subject, description, content, quiz, duration) 
VALUES 
  -- Physical Geography
  ('geografie-1', 'Geografia Fizică', 'geografie', 'Studiul formelor de relief',
   '# Geografia Fizică\n\n## Aspecte\n- Relief\n- Climă\n- Hidrografie',
   '[{"question": "Ce este relieful?", "options": ["Forma suprafeței Pământului", "Clima unei regiuni", "Rețeaua hidrografică", "Vegetația"], "correctAnswer": 0}]'::jsonb, 45),

  -- Human Geography
  ('geografie-2', 'Geografia Umană', 'geografie', 'Studiul populației și așezărilor',
   '# Geografia Umană\n\n## Aspecte\n- Populație\n- Așezări\n- Activități economice',
   '[{"question": "Ce studiază demografia?", "options": ["Populația", "Relieful", "Clima", "Vegetația"], "correctAnswer": 0}]'::jsonb, 45),

  -- Economic Geography
  ('geografie-3', 'Geografia Economică', 'geografie', 'Studiul activităților economice',
   '# Geografia Economică\n\n## Sectoare\n- Agricultura\n- Industria\n- Serviciile',
   '[{"question": "Care sunt sectoarele economiei?", "options": ["Primar, secundar, terțiar", "Agricol, industrial", "Public, privat", "Local, național, global"], "correctAnswer": 0}]'::jsonb, 45),

  -- Environmental Geography
  ('geografie-4', 'Geografia Mediului', 'geografie', 'Studiul relației om-mediu',
   '# Geografia Mediului\n\n## Aspecte\n- Probleme de mediu\n- Conservare\n- Dezvoltare durabilă',
   '[{"question": "Ce este dezvoltarea durabilă?", "options": ["Dezvoltare care satisface nevoile prezente fără a compromite viitorul", "Creștere economică rapidă", "Exploatarea resurselor", "Urbanizare"], "correctAnswer": 0}]'::jsonb, 45),

  -- Climate Geography
  ('geografie-5', 'Climatologie', 'geografie', 'Studiul climei',
   '# Climatologie\n\n## Aspecte\n- Factori climatici\n- Tipuri de climă\n- Schimbări climatice',
   '[{"question": "Ce sunt schimbările climatice?", "options": ["Modificări pe termen lung ale climei", "Vremea zilnică", "Anotimpurile", "Temperatura zilnică"], "correctAnswer": 0}]'::jsonb, 45),

  -- Urban Geography
  ('geografie-6', 'Geografia Urbană', 'geografie', 'Studiul orașelor',
   '# Geografia Urbană\n\n## Aspecte\n- Dezvoltare urbană\n- Funcții urbane\n- Probleme urbane',
   '[{"question": "Ce este urbanizarea?", "options": ["Procesul de creștere a orașelor", "Dezvoltarea rurală", "Migrația", "Industrializarea"], "correctAnswer": 0}]'::jsonb, 45),

  -- Rural Geography
  ('geografie-7', 'Geografia Rurală', 'geografie', 'Studiul zonelor rurale',
   '# Geografia Rurală\n\n## Aspecte\n- Așezări rurale\n- Agricultură\n- Dezvoltare rurală',
   '[{"question": "Ce caracterizează zonele rurale?", "options": ["Predominanța activităților agricole", "Densitate mare a populației", "Industrie dezvoltată", "Transport intens"], "correctAnswer": 0}]'::jsonb, 45),

  -- Population Geography
  ('geografie-8', 'Geografia Populației', 'geografie', 'Studiul populației',
   '# Geografia Populației\n\n## Aspecte\n- Distribuția populației\n- Migrație\n- Structura populației',
   '[{"question": "Ce este densitatea populației?", "options": ["Numărul de locuitori pe km²", "Numărul total de locuitori", "Rata natalității", "Rata mortalității"], "correctAnswer": 0}]'::jsonb, 45),

  -- Political Geography
  ('geografie-9', 'Geografia Politică', 'geografie', 'Studiul organizării politice',
   '# Geografia Politică\n\n## Aspecte\n- State\n- Frontiere\n- Organizații internaționale',
   '[{"question": "Ce este un stat?", "options": ["Teritoriu cu suveranitate", "O regiune geografică", "O zonă climatică", "O așezare urbană"], "correctAnswer": 0}]'::jsonb, 45),

  -- Tourism Geography
  ('geografie-10', 'Geografia Turismului', 'geografie', 'Studiul activităților turistice',
   '# Geografia Turismului\n\n## Aspecte\n- Resurse turistice\n- Forme de turism\n- Impact turistic',
   '[{"question": "Ce sunt resursele turistice?", "options": ["Atracții naturale și antropice", "Doar atracții naturale", "Doar atracții antropice", "Infrastructura"], "correctAnswer": 0}]'::jsonb, 45);