import { User, Evaluation, Lesson, StudyPlan, Badge, Challenge, Notification } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    email: 'elev@example.com',
    name: 'Andrei Popescu',
    class: 'a VIII-a B',
    school: 'Școala Gimnazială Nr. 1',
    avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=150',
    level: 5,
    experience: 250,
    subjects: ['matematica', 'romana'],
    personalGoals: 'Vreau să iau nota maximă la Evaluarea Națională.',
    badges: [
      '123e4567-e89b-12d3-a456-426614174011',
      '123e4567-e89b-12d3-a456-426614174012',
      '123e4567-e89b-12d3-a456-426614174013'
    ],
    createdAt: '2023-09-01T10:00:00.000Z',
    examType: 'evaluareNationala',
    grade: 8
  },
];

// Mock Evaluations
export const mockEvaluations: Evaluation[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    userId: '123e4567-e89b-12d3-a456-426614174000',
    subject: 'matematica',
    score: 7,
    totalQuestions: 10,
    date: '2023-09-02T10:30:00.000Z',
  },
];

// Mock Lessons
export const mockLessons: Lesson[] = [
  // Matematică
  {
    id: 'mate-en-8-1',
    title: 'Numere Reale - Operații și Proprietăți',
    subject: 'matematica',
    description: 'Recapitulare numere reale, operații și proprietăți pentru Evaluarea Națională',
    videoUrl: 'placeholder',
    content: `
      <h3>Numere Reale</h3>
      <p>Mulțimea numerelor reale cuprinde:</p>
      <ul>
        <li>Numere naturale (N): 0, 1, 2, 3, ...</li>
        <li>Numere întregi (Z): ..., -2, -1, 0, 1, 2, ...</li>
        <li>Numere raționale (Q): numere care pot fi scrise ca fracții</li>
        <li>Numere iraționale (I): numere cu zecimale infinite și neperiodice (√2, π)</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Care dintre următoarele numere este irațional?',
        options: ['0.75', '√2', '3.14159...', '22/7'],
        correctAnswer: 1,
      },
    ],
    duration: 45,
  },
  {
    id: 'mate-en-8-2',
    title: 'Ecuații și Inecuații de Gradul I',
    subject: 'matematica',
    description: 'Rezolvarea ecuațiilor și inecuațiilor de gradul I',
    videoUrl: 'placeholder',
    content: `
      <h3>Ecuații de gradul I</h3>
      <p>O ecuație de gradul I are forma: ax + b = 0, unde a ≠ 0</p>
      <h4>Inecuații de gradul I</h4>
      <p>O inecuație de gradul I are una din formele: ax + b < 0, ax + b > 0, ax + b ≤ 0, ax + b ≥ 0</p>
    `,
    quiz: [
      {
        question: 'Care este soluția inecuației 2x + 3 > 7?',
        options: ['x > 2', 'x < 2', 'x > -2', 'x < -2'],
        correctAnswer: 0,
      },
    ],
    duration: 50,
  },
  {
    id: 'mate-en-8-3',
    title: 'Sisteme de Ecuații Liniare',
    subject: 'matematica',
    description: 'Metode de rezolvare a sistemelor de ecuații liniare',
    videoUrl: 'placeholder',
    content: `
      <h3>Sisteme de ecuații liniare</h3>
      <p>Un sistem de două ecuații cu două necunoscute:</p>
      <pre>{
        ax + by = c
        dx + ey = f
      }</pre>
      <h4>Metode de rezolvare:</h4>
      <ul>
        <li>Metoda substituției</li>
        <li>Metoda reducerii</li>
        <li>Metoda Cramer</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Care metodă este recomandată când un coeficient este 1?',
        options: ['Reducere', 'Substituție', 'Cramer', 'Niciuna'],
        correctAnswer: 1,
      },
    ],
    duration: 55,
  },
  {
    id: 'mate-en-8-4',
    title: 'Funcții și Grafice',
    subject: 'matematica',
    description: 'Reprezentarea grafică a funcțiilor',
    videoUrl: 'placeholder',
    content: `
      <h3>Funcția liniară</h3>
      <p>f(x) = ax + b, unde a și b sunt numere reale</p>
      <h4>Reprezentare grafică</h4>
      <ul>
        <li>Graficul este o dreaptă</li>
        <li>a reprezintă panta dreptei</li>
        <li>b reprezintă ordonata la origine</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Ce reprezintă graficul funcției f(x) = 2x?',
        options: ['O parabolă', 'O dreaptă', 'O hiperbolă', 'Un cerc'],
        correctAnswer: 1,
      },
    ],
    duration: 45,
  },
  {
    id: 'mate-en-8-5',
    title: 'Calcul Algebric',
    subject: 'matematica',
    description: 'Operații cu expresii algebrice',
    videoUrl: 'placeholder',
    content: `
      <h3>Expresii algebrice</h3>
      <p>Formule de calcul prescurtat:</p>
      <ul>
        <li>(a + b)² = a² + 2ab + b²</li>
        <li>(a - b)² = a² - 2ab + b²</li>
        <li>(a + b)(a - b) = a² - b²</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Care este rezultatul (x + 2)²?',
        options: ['x² + 2', 'x² + 4x + 4', 'x² + 4', '2x² + 4'],
        correctAnswer: 1,
      },
    ],
    duration: 50,
  },
  {
    id: 'mate-en-8-6',
    title: 'Geometrie - Triunghiuri',
    subject: 'matematica',
    description: 'Proprietăți ale triunghiurilor',
    videoUrl: 'placeholder',
    content: `
      <h3>Triunghiuri</h3>
      <p>Clasificare după unghiuri:</p>
      <ul>
        <li>Ascuțitunghic: toate unghiurile sunt ascuțite</li>
        <li>Dreptunghic: un unghi drept</li>
        <li>Obtuzunghic: un unghi obtuz</li>
      </ul>
    `,
    quiz: [
      {
        question: 'În ce tip de triunghi toate unghiurile sunt egale?',
        options: ['Dreptunghic', 'Isoscel', 'Echilateral', 'Obtuzunghic'],
        correctAnswer: 2,
      },
    ],
    duration: 45,
  },
  {
    id: 'mate-en-8-7',
    title: 'Geometrie - Patrulatere',
    subject: 'matematica',
    description: 'Proprietăți ale patrulaterelor',
    videoUrl: 'placeholder',
    content: `
      <h3>Patrulatere</h3>
      <p>Tipuri de patrulatere:</p>
      <ul>
        <li>Pătrat: toate laturile și unghiurile egale</li>
        <li>Dreptunghi: unghiuri drepte, laturile opuse egale</li>
        <li>Romb: toate laturile egale</li>
        <li>Paralelogram: laturile opuse paralele și egale</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Care patrulater are toate laturile egale și toate unghiurile drepte?',
        options: ['Romb', 'Dreptunghi', 'Pătrat', 'Paralelogram'],
        correctAnswer: 2,
      },
    ],
    duration: 50,
  },
  {
    id: 'mate-en-8-8',
    title: 'Geometrie - Cercul',
    subject: 'matematica',
    description: 'Proprietăți ale cercului',
    videoUrl: 'placeholder',
    content: `
      <h3>Cercul</h3>
      <p>Elemente în cerc:</p>
      <ul>
        <li>Rază (R): distanța de la centru la orice punct de pe cerc</li>
        <li>Diametru (D): segment care unește două puncte de pe cerc trecând prin centru</li>
        <li>Coarda: segment care unește două puncte de pe cerc</li>
        <li>Arc: porțiune din cerc cuprinsă între două puncte</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Care este relația dintre rază și diametru?',
        options: ['R = 2D', 'D = 2R', 'R = D', 'D = R²'],
        correctAnswer: 1,
      },
    ],
    duration: 45,
  },
  {
    id: 'mate-en-8-9',
    title: 'Rapoarte și Proporții',
    subject: 'matematica',
    description: 'Aplicații ale rapoartelor și proporțiilor',
    videoUrl: 'placeholder',
    content: `
      <h3>Rapoarte și proporții</h3>
      <p>Proprietăți ale proporțiilor:</p>
      <ul>
        <li>Proprietatea fundamentală: a/b = c/d ⇔ ad = bc</li>
        <li>Proprietatea de compunere: a/b = c/d ⇒ (a+b)/b = (c+d)/d</li>
        <li>Șir de rapoarte egale</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Dacă 3/x = 6/10, care este valoarea lui x?',
        options: ['3', '5', '6', '15'],
        correctAnswer: 1,
      },
    ],
    duration: 50,
  },
  {
    id: 'mate-en-8-10',
    title: 'Probleme de Sinteză',
    subject: 'matematica',
    description: 'Rezolvarea problemelor complexe pentru Evaluarea Națională',
    videoUrl: 'placeholder',
    content: `
      <h3>Strategii de rezolvare</h3>
      <p>Pași în rezolvarea problemelor:</p>
      <ul>
        <li>Citirea atentă a enunțului</li>
        <li>Identificarea datelor și necunoscutelor</li>
        <li>Alegerea metodei de rezolvare</li>
        <li>Verificarea rezultatului</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Care este primul pas în rezolvarea unei probleme?',
        options: ['Calculul', 'Citirea enunțului', 'Scrierea rezultatului', 'Verificarea'],
        correctAnswer: 1,
      },
    ],
    duration: 60,
  },

  // Limba Română
  {
    id: 'romana-en-8-1',
    title: 'Genuri și Specii Literare',
    subject: 'romana',
    description: 'Recapitulare genuri și specii literare',
    videoUrl: 'placeholder',
    content: `
      <h3>Genuri literare</h3>
      <ul>
        <li>Epic: narațiune, personaje, acțiune</li>
        <li>Liric: exprimarea sentimentelor</li>
        <li>Dramatic: conflicte, dialog</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Care gen literar folosește dialogul ca mod de expunere principal?',
        options: ['Epic', 'Liric', 'Dramatic', 'Niciuna'],
        correctAnswer: 2,
      },
    ],
    duration: 45,
  },
  {
    id: 'romana-en-8-2',
    title: 'Figuri de Stil',
    subject: 'romana',
    description: 'Identificarea și analiza figurilor de stil',
    videoUrl: 'placeholder',
    content: `
      <h3>Figuri de stil principale</h3>
      <ul>
        <li>Personificarea: atribuirea de însușiri omenești</li>
        <li>Metafora: comparație subînțeleasă</li>
        <li>Epitetul: atribut expresiv</li>
        <li>Comparația: alăturarea a două elemente</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Ce figură de stil este în "ochii mării"?',
        options: ['Comparație', 'Personificare', 'Metaforă', 'Epitet'],
        correctAnswer: 2,
      },
    ],
    duration: 50,
  },
  {
    id: 'romana-en-8-3',
    title: 'Moduri de Expunere',
    subject: 'romana',
    description: 'Analiza modurilor de expunere în textele literare',
    videoUrl: 'placeholder',
    content: `
      <h3>Moduri de expunere</h3>
      <ul>
        <li>Narațiunea: relatarea întâmplărilor</li>
        <li>Descrierea: prezentarea caracteristicilor</li>
        <li>Dialogul: conversația dintre personaje</li>
        <li>Monologul: vorbirea unui singur personaj</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Ce mod de expunere predomină în portretul unui personaj?',
        options: ['Narațiunea', 'Descrierea', 'Dialogul', 'Monologul'],
        correctAnswer: 1,
      },
    ],
    duration: 45,
  },
  {
    id: 'romana-en-8-4',
    title: 'Caracterizarea Personajelor',
    subject: 'romana',
    description: 'Tehnici de caracterizare a personajelor literare',
    videoUrl: 'placeholder',
    content: `
      <h3>Tipuri de caracterizare</h3>
      <ul>
        <li>Directă: prin autor sau alte personaje</li>
        <li>Indirectă: prin fapte, gesturi, vorbire</li>
        <li>Fizică: trăsături exterioare</li>
        <li>Morală: trăsături sufletești</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Ce tip de caracterizare este prezentă în descrierea acțiunilor unui personaj?',
        options: ['Directă', 'Indirectă', 'Fizică', 'Mixtă'],
        correctAnswer: 1,
      },
    ],
    duration: 50,
  },
  {
    id: 'romana-en-8-5',
    title: 'Textul Narativ',
    subject: 'romana',
    description: 'Analiza textului narativ',
    videoUrl: 'placeholder',
    content: `
      <h3>Elementele textului narativ</h3>
      <ul>
        <li>Acțiune: șirul de întâmplări</li>
        <li>Personaje: participanții la acțiune</li>
        <li>Timp: când se petrec evenimentele</li>
        <li>Spațiu: unde se petrec evenimentele</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Care element nu aparține textului narativ?',
        options: ['Acțiunea', 'Personajele', 'Rima', 'Timpul'],
        correctAnswer: 2,
      },
    ],
    duration: 45,
  },
  {
    id: 'romana-en-8-6',
    title: 'Textul Descriptiv',
    subject: 'romana',
    description: 'Analiza textului descriptiv',
    videoUrl: 'placeholder',
    content: `
      <h3>Tipuri de descriere</h3>
      <ul>
        <li>Portret: descrierea unei persoane</li>
        <li>Tablou: descrierea unui peisaj</li>
        <li>Descriere științifică: obiectivă</li>
        <li>Descriere artistică: subiectivă</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Ce tip de descriere este prezentă în descrierea unui apus de soare?',
        options: ['Portret', 'Tablou', 'Științifică', 'Tehnică'],
        correctAnswer: 1,
      },
    ],
    duration: 50,
  },
  {
    id: 'romana-en-8-7',
    title: 'Textul Argumentativ',
    subject: 'romana',
    description: 'Structura și redactarea textului argumentativ',
    videoUrl: 'placeholder',
    content: `
      <h3>Structura textului argumentativ</h3>
      <ul>
        <li>Ipoteza/Teza: ideea de demonstrat</li>
        <li>Argumentele: dovezile</li>
        <li>Exemplele: ilustrarea argumentelor</li>
        <li>Concluzia: reluarea tezei</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Care este primul element al unui text argumentativ?',
        options: ['Concluzia', 'Argumentele', 'Ipoteza', 'Exemplele'],
        correctAnswer: 2,
      },
    ],
    duration: 45,
  },
  {
    id: 'romana-en-8-8',
    title: 'Morfologie',
    subject: 'romana',
    description: 'Părțile de vorbire flexibile și neflexibile',
    videoUrl: 'placeholder',
    content: `
      <h3>Părți de vorbire</h3>
      <ul>
        <li>Flexibile: substantiv, adjectiv, pronume, numeral, verb</li>
        <li>Neflexibile: adverb, prepoziție, conjuncție, interjecție</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Care parte de vorbire este flexibilă?',
        options: ['Adverb', 'Prepoziție', 'Pronume', 'Conjuncție'],
        correctAnswer: 2,
      },
    ],
    duration: 50,
  },
  {
    id: 'romana-en-8-9',
    title: 'Sintaxă',
    subject: 'romana',
    description: 'Analiza sintactică a propoziției și frazei',
    videoUrl: 'placeholder',
    content: `
      <h3>Sintaxa propoziției și frazei</h3>
      <ul>
        <li>Părți de propoziție: subiect, predicat, atribut, complement</li>
        <li>Tipuri de propoziții: principale, subordonate</li>
        <li>Relații sintactice: coordonare, subordonare</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Care este partea principală de propoziție?',
        options: ['Atributul', 'Complementul', 'Predicatul', 'Apoziția'],
        correctAnswer: 2,
      },
    ],
    duration: 45,
  },
  {
    id: 'romana-en-8-10',
    title: 'Evaluare Finală',
    subject: 'romana',
    description: 'Recapitulare și exerciții model pentru Evaluarea Națională',
    videoUrl: 'placeholder',
    content: `
      <h3>Structura subiectelor</h3>
      <ul>
        <li>Subiectul I: Înțelegerea textului</li>
        <li>Subiectul II: Practica rațională și funcțională a limbii</li>
        <li>Subiectul III: Redactare de text</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Ce se cere la Subiectul III?',
        options: ['Analiză gramaticală', 'Redactare de text', 'Exerciții de vocabular', 'Teste grilă'],
        correctAnswer: 1,
      },
    ],
    duration: 60,
  },
];

// Mock Study Plan
export const mockStudyPlan: StudyPlan = {
  id: '123e4567-e89b-12d3-a456-426614174005',
  userId: '123e4567-e89b-12d3-a456-426614174000',
  recommendations: [
    'Concentrează-te pe exerciții de algebră pentru Evaluarea Națională.',
    'Exersează rezolvarea subiectelor din anii anteriori la matematică.',
    'Recapitulează figurile de stil și elementele de versificație la română.'
  ],
  schedule: [
    { day: 1, lessonId: 'mate-en-8-1' },
    { day: 2, lessonId: 'romana-en-8-1' },
    { day: 3, lessonId: 'mate-en-8-2' },
    { day: 4, lessonId: 'romana-en-8-2' },
    { day: 5, lessonId: 'mate-en-8-3' },
    { day: 6, lessonId: 'romana-en-8-3' },
    { day: 7, lessonId: 'mate-en-8-4' },
  ],
  createdAt: '2023-09-03T08:00:00.000Z',
};

// Mock Badges
export const mockBadges: Badge[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174011',
    name: 'Matematician Junior',
    description: 'Ai completat prima lecție de matematică',
    iconUrl: 'mathematician-jr-icon.svg',
    criteria: 'complete_first_math',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174012',
    name: 'Literat în Devenire',
    description: 'Ai identificat corect toate figurile de stil',
    iconUrl: 'writer-icon.svg',
    criteria: 'identify_all_figures',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174013',
    name: 'Algebră Master',
    description: 'Ai rezolvat corect 10 ecuații consecutive',
    iconUrl: 'algebra-master-icon.svg',
    criteria: 'solve_10_equations',
  },
];

// Mock Challenges
export const mockChallenges: Omit<Challenge, 'current'>[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174006',
    title: 'Rezolvă 5 ecuații azi',
    description: 'Exersează rezolvarea ecuațiilor pentru Evaluarea Națională',
    target: 5,
    type: 'daily',
    reward: {
      type: 'experience',
      amount: 50,
    },
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174007',
    title: 'Identifică figurile de stil',
    description: 'Găsește toate figurile de stil dintr-un text dat',
    target: 1,
    type: 'daily',
    reward: {
      type: 'experience',
      amount: 100,
    },
  },
];

// Mock Challenge Progress
export const mockChallengeProgress = [
  {
    userId: '123e4567-e89b-12d3-a456-426614174000',
    challengeId: '123e4567-e89b-12d3-a456-426614174006',
    current: 0,
  },
  {
    userId: '123e4567-e89b-12d3-a456-426614174000',
    challengeId: '123e4567-e89b-12d3-a456-426614174007',
    current: 0,
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174008',
    userId: '123e4567-e89b-12d3-a456-426614174000',
    message: 'Ai deblocat insigna "Matematician Junior"!',
    read: false,
    createdAt: '2023-09-03T09:30:00.000Z',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174009',
    userId: '123e4567-e89b-12d3-a456-426614174000',
    message: 'Noi lecții de pregătire pentru Evaluarea Națională sunt disponibile!',
    read: true,
    createdAt: '2023-09-02T14:15:00.000Z',
  },
];

// Initialize mock data
export const initMockData = async (supabase: any) => {
  try {
    // First check if data already exists in the lessons table
    const { data: existingLessons } = await supabase
      .from('lessons')
      .select('id')
      .limit(1);

    // If we already have data, skip initialization
    if (existingLessons && existingLessons.length > 0) {
      console.log('Mock data already exists, skipping initialization');
      return;
    }

    console.log('Initializing mock data...');

    // Insert lessons first since they're critical
    const { error: lessonsError } = await supabase
      .from('lessons')
      .upsert(mockLessons);
    
    if (lessonsError) {
      throw lessonsError;
    }

    // Insert other public data
    const { error: badgesError } = await supabase
      .from('badges')
      .upsert(mockBadges);
    
    if (badgesError) {
      console.error('Error inserting badges:', badgesError);
    }

    const { error: challengesError } = await supabase
      .from('challenges')
      .upsert(mockChallenges);
    
    if (challengesError) {
      console.error('Error inserting challenges:', challengesError);
    }

    console.log('Mock data initialized successfully!');
  } catch (error) {
    console.error('Error initializing mock data:', error);
    throw error; // Re-throw to handle in the app initialization
  }
};