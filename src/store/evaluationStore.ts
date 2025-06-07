import { create } from 'zustand';
import { Question, Evaluation } from '../types';
import supabase from '../config/supabase';

interface EvaluationState {
  currentQuestion: number;
  questions: Question[];
  answers: number[];
  isCompleted: boolean;
  loading: boolean;
  error: string | null;
  fetchQuestions: (subject: string) => Promise<void>;
  answerQuestion: (questionIndex: number, answerIndex: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  submitEvaluation: (userId: string, subject: string) => Promise<Evaluation>;
  reset: () => void;
}

const useEvaluationStore = create<EvaluationState>((set, get) => ({
  currentQuestion: 0,
  questions: [],
  answers: [],
  isCompleted: false,
  loading: false,
  error: null,

  fetchQuestions: async (subject: string) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('subject', subject)
        .limit(10);
      
      if (error) {
        throw error;
      }

      set({
        questions: data as Question[],
        answers: new Array((data as Question[]).length).fill(-1),
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  answerQuestion: (questionIndex: number, answerIndex: number) => {
    const { answers } = get();
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    set({ answers: newAnswers });
  },

  nextQuestion: () => {
    const { currentQuestion, questions } = get();
    if (currentQuestion < questions.length - 1) {
      set({ currentQuestion: currentQuestion + 1 });
    }
  },

  previousQuestion: () => {
    const { currentQuestion } = get();
    if (currentQuestion > 0) {
      set({ currentQuestion: currentQuestion - 1 });
    }
  },

  submitEvaluation: async (userId: string, subject: string) => {
    const { questions, answers } = get();
    
    // Calculate score
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (answers[i] === questions[i].correctAnswer) {
        score++;
      }
    }

    const evaluation: Omit<Evaluation, 'id'> = {
      userId,
      subject,
      score,
      totalQuestions: questions.length,
      date: new Date().toISOString(),
    };

    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('evaluations')
        .insert([evaluation])
        .select()
        .single();
      
      if (error) {
        throw error;
      }

      set({ isCompleted: true, loading: false });
      return data as Evaluation;
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  reset: () => {
    set({
      currentQuestion: 0,
      questions: [],
      answers: [],
      isCompleted: false,
      error: null,
    });
  },
}));

export default useEvaluationStore;