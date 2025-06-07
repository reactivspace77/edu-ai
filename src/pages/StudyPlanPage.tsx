import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import CalendarView from '../components/study-plan/CalendarView';
import SubjectProgress from '../components/study-plan/SubjectProgress';
import SubjectTabs from '../components/study-plan/SubjectTabs';
import { LightbulbIcon, BookOpen, CheckCircle } from 'lucide-react';
import useAuthStore from '../store/authStore';
import useStudyPlanStore from '../store/studyPlanStore';
import supabase from '../config/supabase';

const StudyPlanPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { 
    studyPlan, 
    lessons, 
    subjectProgress,
    fetchStudyPlan, 
    fetchLessons,
    fetchSubjectProgress 
  } = useStudyPlanStore();
  const [activeSubject, setActiveSubject] = useState('');
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  // Load active subject from localStorage or default to first subject
  useEffect(() => {
    if (user?.subjects?.length > 0) {
      const savedSubject = localStorage.getItem('activeSubject');
      if (savedSubject && user.subjects.includes(savedSubject)) {
        setActiveSubject(savedSubject);
      } else {
        setActiveSubject(user.subjects[0]);
      }
    }
  }, [user]);

  // Save active subject to localStorage when it changes
  const handleSubjectChange = (subject: string) => {
    setActiveSubject(subject);
    localStorage.setItem('activeSubject', subject);
  };

  useEffect(() => {
    if (user) {
      fetchStudyPlan(user.id);
      fetchSubjectProgress(user.id);
      fetchCompletedLessons();
    }
  }, [user, fetchStudyPlan, fetchSubjectProgress]);

  useEffect(() => {
    if (studyPlan) {
      fetchLessons();
    }
  }, [studyPlan, fetchLessons]);

  const fetchCompletedLessons = async () => {
    if (!user) return;

    try {
      const { data } = await supabase
        .from('evaluations')
        .select('lessonId')
        .eq('userId', user.id);

      if (data) {
        setCompletedLessons(data.map(evaluation => evaluation.lessonId));
      }
    } catch (error) {
      console.error('Error fetching completed lessons:', error);
    }
  };

  const currentDay = new Date().getDay() || 7; // Convert Sunday (0) to 7

  const filteredLessons = lessons.filter(lesson => lesson.subject === activeSubject);

  // Create lesson map with subject information
  const lessonMap = lessons.reduce((acc, lesson) => ({
    ...acc,
    [lesson.id]: { id: lesson.id, title: lesson.title, subject: lesson.subject }
  }), {});
  
  return (
    <>
      <Navbar />
      <main className="bg-gray-100 min-h-screen pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Plan de studiu
          </h1>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-start">
              <div className="p-2 rounded-full bg-indigo-100">
                <LightbulbIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900 mb-2">
                  Recomandare AI
                </h2>
                <p className="text-gray-700">
                  {studyPlan?.recommendations?.[0] || 'Începe lecția la Matematică pentru progres rapid!'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <SubjectTabs 
                  subjects={user?.subjects || []}
                  activeSubject={activeSubject}
                  onSubjectChange={handleSubjectChange}
                />
                
                <CalendarView 
                  schedule={studyPlan?.schedule || []}
                  lessonMap={lessonMap}
                  currentDay={currentDay}
                  activeSubject={activeSubject}
                  lessons={lessons}
                />
                
                <hr className="my-6" />
                
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-4">
                    Acces rapid la lecții
                  </h3>
                  
                  <div className="space-y-4">
                    {filteredLessons.slice(0, 8).map(lesson => {
                      const isCompleted = completedLessons.includes(lesson.id);
                      return (
                        <div 
                          key={lesson.id} 
                          className={`flex items-center justify-between p-3 border rounded-lg transition-colors ${
                            isCompleted 
                              ? 'bg-green-50 border-green-200 hover:bg-green-100' 
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center">
                            <div className={`p-1.5 rounded-full ${
                              isCompleted ? 'bg-green-100' : 'bg-indigo-100'
                            }`}>
                              {isCompleted ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <BookOpen className={`h-4 w-4 ${
                                  isCompleted ? 'text-green-500' : 'text-indigo-600'
                                }`} />
                              )}
                            </div>
                            <span className={`ml-2 text-sm font-medium ${
                              isCompleted ? 'text-green-700' : 'text-gray-800'
                            }`}>
                              {lesson.title}
                            </span>
                          </div>
                          <button
                            onClick={() => navigate(`/lessons/${lesson.id}`)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                              isCompleted
                                ? 'text-green-700 bg-green-100 hover:bg-green-200'
                                : 'text-white bg-indigo-600 hover:bg-indigo-700'
                            }`}
                          >
                            {isCompleted ? 'Recapitulare' : 'Deschide'}
                          </button>
                        </div>
                      );
                    })}
                    
                    {filteredLessons.length === 0 && (
                      <div className="text-sm text-gray-500 text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                        Nicio lecție disponibilă pentru această materie.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <SubjectProgress progressData={subjectProgress} />
                
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-4">
                    Recomandări detaliate AI
                  </h3>
                  
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {studyPlan?.recommendations?.slice(1).map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default StudyPlanPage;