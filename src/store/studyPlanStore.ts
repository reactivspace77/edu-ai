import { create } from 'zustand';
import { StudyPlan, DailyLesson, Lesson } from '../types';
import supabase from '../config/supabase';

interface StudyPlanState {
  studyPlan: StudyPlan | null;
  lessons: Lesson[];
  currentLesson: Lesson | null;
  subjectProgress: { subject: string; progress: number }[];
  loading: boolean;
  error: string | null;
  fetchStudyPlan: (userId: string) => Promise<void>;
  fetchLessons: () => Promise<void>;
  fetchLesson: (lessonId: string) => Promise<void>;
  fetchSubjectProgress: (userId: string) => Promise<void>;
  generateStudyPlan: (userId: string, subjects: string[], evaluationResults: any) => Promise<void>;
}

const useStudyPlanStore = create<StudyPlanState>((set, get) => ({
  studyPlan: null,
  lessons: [],
  currentLesson: null,
  subjectProgress: [],
  loading: false,
  error: null,

  fetchStudyPlan: async (userId: string) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('study_plans')
        .select('*')
        .eq('userId', userId)
        .order('createdAt', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (error) {
        throw error;
      }

      // If no study plan exists, create one with lessons from all subjects
      if (!data) {
        const { data: userData } = await supabase
          .from('users')
          .select('subjects')
          .eq('id', userId)
          .single();

        if (userData?.subjects) {
          // Fetch lessons for all subjects
          const { data: lessonsData } = await supabase
            .from('lessons')
            .select('id, subject')
            .in('subject', userData.subjects)
            .order('id', { ascending: true });

          if (lessonsData) {
            // Create a balanced schedule with lessons from all subjects
            const schedule = lessonsData
              .sort(() => Math.random() - 0.5) // Shuffle lessons
              .slice(0, 7) // Take first 7 lessons
              .map((lesson, index) => ({
                day: index + 1,
                lessonId: lesson.id
              }));

            const newStudyPlan = {
              userId,
              recommendations: [
                'Începe cu lecțiile de bază pentru a-ți construi o fundație solidă.',
                'Rezolvă exercițiile practice pentru a-ți consolida cunoștințele.',
                'Recapitulează conceptele cheie înainte de a trece mai departe.'
              ],
              schedule,
              createdAt: new Date().toISOString(),
            };

            const { data: createdPlan, error: createError } = await supabase
              .from('study_plans')
              .insert([newStudyPlan])
              .select()
              .single();

            if (createError) {
              throw createError;
            }

            set({ studyPlan: createdPlan as StudyPlan, loading: false });
            return;
          }
        }
      }

      set({ studyPlan: data as StudyPlan | null, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchLessons: async () => {
    try {
      set({ loading: true, error: null });
      
      // Get user's subjects
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('No user found');

      const { data: userSubjects } = await supabase
        .from('users')
        .select('subjects')
        .eq('id', userData.user.id)
        .single();

      // Fetch lessons for all subjects
      const { data: allLessons, error: lessonsError } = await supabase
        .from('lessons')
        .select('*')
        .in('subject', userSubjects?.subjects || [])
        .order('id', { ascending: true });
      
      if (lessonsError) {
        throw lessonsError;
      }

      if (!allLessons || allLessons.length === 0) {
        console.log('No lessons found in database');
        set({ lessons: [], loading: false });
        return;
      }

      // Get current study plan
      const { studyPlan } = get();
      
      if (studyPlan?.schedule) {
        // Sort lessons according to schedule
        const scheduledLessons = studyPlan.schedule
          .map(day => allLessons.find(lesson => lesson.id === day.lessonId))
          .filter(Boolean);
        
        // Add remaining lessons
        const unscheduledLessons = allLessons.filter(
          lesson => !studyPlan.schedule.find(day => day.lessonId === lesson.id)
        );
        
        set({ 
          lessons: [...scheduledLessons, ...unscheduledLessons] as Lesson[],
          loading: false 
        });
      } else {
        set({ lessons: allLessons as Lesson[], loading: false });
      }
    } catch (error: any) {
      console.error('Error fetching lessons:', error);
      set({ error: error.message, loading: false });
    }
  },

  fetchLesson: async (lessonId: string) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', lessonId)
        .single();
      
      if (error) {
        throw error;
      }

      set({ currentLesson: data as Lesson, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchSubjectProgress: async (userId: string) => {
    try {
      set({ loading: true, error: null });

      // Get user's subjects
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('subjects')
        .eq('id', userId)
        .single();

      if (userError) {
        throw userError;
      }

      if (!userData?.subjects) {
        set({ subjectProgress: [], loading: false });
        return;
      }

      // Get total lessons per subject
      const { data: totalLessons, error: lessonsError } = await supabase
        .from('lessons')
        .select('subject')
        .in('subject', userData.subjects);

      if (lessonsError) {
        throw lessonsError;
      }

      // Get completed lessons
      const { data: evaluations, error: evalError } = await supabase
        .from('evaluations')
        .select('subject, lessonId')
        .eq('userId', userId)
        .gt('score', 0);

      if (evalError) {
        throw evalError;
      }

      // Calculate progress for each subject
      const progress = userData.subjects.map(subject => {
        const total = totalLessons.filter(l => l.subject === subject).length;
        const completed = evaluations?.filter(e => e.subject === subject).length || 0;
        return {
          subject,
          progress: total > 0 ? Math.round((completed / total) * 100) : 0
        };
      });

      set({ subjectProgress: progress, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  generateStudyPlan: async (userId: string, subjects: string[], evaluationResults: any) => {
    try {
      set({ loading: true, error: null });
      
      // Fetch available lessons for selected subjects
      const { data: lessonData, error: lessonError } = await supabase
        .from('lessons')
        .select('id, subject')
        .in('subject', subjects)
        .order('id', { ascending: true });
      
      if (lessonError) {
        throw lessonError;
      }

      // Create a balanced weekly schedule
      const schedule: DailyLesson[] = lessonData
        .slice(0, 7)
        .map((lesson, index) => ({
          day: index + 1,
          lessonId: lesson.id
        }));

      const newStudyPlan = {
        userId,
        recommendations: [
          'Concentrează-te pe exercițiile de bază pentru a-ți construi o fundație solidă.',
          'Rezolvă probleme practice pentru a-ți consolida cunoștințele.',
          'Recapitulează conceptele cheie înainte de a trece mai departe.'
        ],
        schedule,
        createdAt: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('study_plans')
        .insert([newStudyPlan])
        .select()
        .single();
      
      if (error) {
        throw error;
      }

      set({ studyPlan: data as StudyPlan, loading: false });
      
      // Fetch lessons after creating study plan
      await get().fetchLessons();
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useStudyPlanStore;