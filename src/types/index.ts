export interface User {
  id: string;
  email: string;
  name: string;
  class?: string;
  school?: string;
  avatar?: string;
  level: number;
  experience: number;
  subjects: string[];
  personalGoals?: string;
  badges: string[];
  createdAt: string;
  examType?: 'evaluareNationala' | 'bacalaureat';
  grade?: number;
}

export interface Evaluation {
  id: string;
  userId: string;
  subject: string;
  score: number;
  totalQuestions: number;
  date: string;
}

export interface Question {
  id: string;
  subject: string;
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface StudyPlan {
  id: string;
  userId: string;
  recommendations: string[];
  schedule: DailyLesson[];
  createdAt: string;
}

export interface DailyLesson {
  day: number;
  lessonId: string;
}

export interface Lesson {
  id: string;
  title: string;
  subject: string;
  description: string;
  videoUrl: string;
  content: string;
  quiz: LessonQuiz[];
  duration: number;
}

export interface LessonQuiz {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  criteria: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  type: 'daily' | 'weekly';
  reward: {
    type: 'badge' | 'experience';
    amount: number;
    badgeId?: string;
  };
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  read: boolean;
  createdAt: string;
}