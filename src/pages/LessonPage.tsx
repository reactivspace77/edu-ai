import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import VideoPlayer from '../components/lesson/VideoPlayer';
import QuizWidget from '../components/lesson/QuizWidget';
import AiChatWidget from '../components/lesson/AiChatWidget';
import useStudyPlanStore from '../store/studyPlanStore';
import useGamificationStore from '../store/gamificationStore';
import useAuthStore from '../store/authStore';
import { ArrowLeft, Trophy, AlertCircle, CheckCircle } from 'lucide-react';
import supabase from '../config/supabase';

const LessonPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { currentLesson, fetchLesson, loading } = useStudyPlanStore();
  const { addExperience } = useGamificationStore();
  const { user } = useAuthStore();
  const [showCompletedMessage, setShowCompletedMessage] = useState(false);
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);

  useEffect(() => {
    if (lessonId && user) {
      fetchLesson(lessonId);
      checkLessonCompletion();
    }
  }, [lessonId, user, fetchLesson]);

  const checkLessonCompletion = async () => {
    if (!user || !lessonId) return;

    try {
      const { data } = await supabase
        .from('evaluations')
        .select('id')
        .eq('userId', user.id)
        .eq('subject', currentLesson?.subject)
        .eq('lessonId', lessonId)
        .maybeSingle();

      setIsLessonCompleted(!!data);
    } catch (error) {
      console.error('Error checking lesson completion:', error);
    }
  };

  const handleQuizComplete = async (score: number) => {
    if (!user) return;
    
    const expPerQuestion = 10;
    const totalExp = score * expPerQuestion;
    
    await addExperience(totalExp);
    setShowCompletedMessage(true);
    
    setTimeout(() => {
      setShowCompletedMessage(false);
    }, 3000);
  };

  const handleMarkAsComplete = async () => {
    if (!user || !currentLesson || isLessonCompleted) return;

    try {
      // Add evaluation record
      const { error: evalError } = await supabase
        .from('evaluations')
        .insert([{
          userId: user.id,
          subject: currentLesson.subject,
          lessonId: lessonId,
          score: 1,
          totalQuestions: 1
        }]);

      if (evalError) throw evalError;

      // Award XP
      await addExperience(50);

      setIsLessonCompleted(true);
      setShowCompletedMessage(true);

      setTimeout(() => {
        setShowCompletedMessage(false);
      }, 3000);
    } catch (error) {
      console.error('Error marking lesson as complete:', error);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="bg-gray-100 min-h-screen py-8 pt-16"> {/* Added pt-16 to account for fixed navbar */}
          <div className="max-w-4xl mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
              <div className="h-96 bg-gray-300 rounded-lg mb-8"></div>
              <div className="h-64 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!currentLesson) {
    return (
      <>
        <Navbar />
        <main className="bg-gray-100 min-h-screen py-8 pt-16"> {/* Added pt-16 to account for fixed navbar */}
          <div className="max-w-4xl mx-auto px-4">
            <div className="mb-6 flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-4 p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                aria-label="Înapoi"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Lecția nu a fost găsită</h2>
              <p className="text-gray-600 mb-4">
                Ne pare rău, dar lecția pe care o cauți nu există sau a fost ștearsă.
              </p>
              <button
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Înapoi la tabloul de bord
              </button>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-gray-100 min-h-screen pb-8 pt-16"> {/* Added pt-16 to account for fixed navbar */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-4 p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                aria-label="Înapoi"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                {currentLesson.title}
              </h1>
            </div>

            <button
              onClick={handleMarkAsComplete}
              disabled={isLessonCompleted}
              className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isLessonCompleted
                  ? 'bg-green-100 text-green-800 cursor-default'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isLessonCompleted ? (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Lecție parcursă
                </>
              ) : (
                'Marchează parcursă'
              )}
            </button>
          </div>

          {showCompletedMessage && (
            <div className="mb-6 p-4 bg-green-100 rounded-lg flex items-center">
              <Trophy className="h-6 w-6 text-green-600 mr-2" />
              <span className="text-green-800 font-medium">
                Felicitări! Ai completat lecția și ai câștigat experiență!
              </span>
            </div>
          )}

          <VideoPlayer 
            videoUrl={currentLesson.videoUrl || 'placeholder'}
            instructorName="Prof. Virtual"
            transcript={currentLesson.content || ''}
          />

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              Conținutul lecției
            </h2>
            <div className="prose prose-indigo max-w-none">
              <div dangerouslySetInnerHTML={{ 
                __html: currentLesson.content || '<p>Conținutul lecției va fi afișat aici.</p>' 
              }} />
            </div>
          </div>

          <QuizWidget 
            quizData={currentLesson.quiz || [
              {
                question: 'Care este răspunsul corect?',
                options: ['Opțiunea 1', 'Opțiunea 2', 'Opțiunea 3'],
                correctAnswer: 1
              }
            ]}
            onComplete={handleQuizComplete}
          />

          <AiChatWidget 
            lessonTitle={currentLesson.title}
            subject={currentLesson.subject}
          />
        </div>
      </main>
    </>
  );
};

export default LessonPage;