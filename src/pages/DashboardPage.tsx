import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import ProgressSection from '../components/dashboard/ProgressSection';
import RecommendationCard from '../components/dashboard/RecommendationCard';
import ChallengesList from '../components/dashboard/ChallengesList';
import NotificationsList from '../components/dashboard/NotificationsList';
import LearningAssistant from '../components/dashboard/LearningAssistant';
import useAuthStore from '../store/authStore';
import useStudyPlanStore from '../store/studyPlanStore';

const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const { studyPlan, lessons, fetchStudyPlan, fetchLessons } = useStudyPlanStore();
  const [nextLesson, setNextLesson] = useState<{ id: string; title: string } | null>(null);
  const [recommendation, setRecommendation] = useState<string>('');

  useEffect(() => {
    if (user) {
      fetchStudyPlan(user.id);
    }
  }, [user, fetchStudyPlan]);

  useEffect(() => {
    if (studyPlan) {
      fetchLessons();
      
      if (studyPlan.recommendations.length > 0) {
        setRecommendation(studyPlan.recommendations[0]);
      }
    }
  }, [studyPlan, fetchLessons]);

  useEffect(() => {
    if (lessons.length > 0 && studyPlan) {
      const today = new Date().getDay() || 7;
      const todayLesson = studyPlan.schedule.find(day => day.day === today);
      
      if (todayLesson) {
        const lesson = lessons.find(l => l.id === todayLesson.lessonId);
        if (lesson) {
          setNextLesson({ id: lesson.id, title: lesson.title });
          return;
        }
      }
      
      if (lessons[0]) {
        setNextLesson({ id: lessons[0].id, title: lessons[0].title });
      }
    }
  }, [lessons, studyPlan]);

  const defaultRecommendation = "Îți recomandăm să continui cu lecțiile de matematică pentru a-ți îmbunătăți cunoștințele.";
  const defaultLessonTitle = "Introducere în algebră";

  return (
    <>
      <Navbar />
      <main className="bg-gray-100 min-h-screen pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Salut, {user?.name || 'Elev'}!
            </h1>
            <p className="text-gray-600">
              Nivel: {user?.level || 1} - Continuă să înveți pentru a avansa!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
              <ProgressSection />
              
              <RecommendationCard 
                recommendation={recommendation || defaultRecommendation}
                nextLessonId={nextLesson?.id || "1"}
                nextLessonTitle={nextLesson?.title || defaultLessonTitle}
              />
              
              <ChallengesList />
            </div>
            
            <div className="lg:col-span-4 space-y-6">
              <LearningAssistant />
              <NotificationsList />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default DashboardPage;