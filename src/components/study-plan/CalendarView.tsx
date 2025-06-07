import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DailyLesson } from '../../types';
import supabase from '../../config/supabase';
import useAuthStore from '../../store/authStore';
import { CheckCircle } from 'lucide-react';

interface CalendarViewProps {
  schedule: DailyLesson[];
  lessonMap: Record<string, { id: string; title: string; subject: string }>;
  currentDay: number;
  activeSubject: string;
  lessons: Array<{ id: string; title: string; subject: string }>;
}

const CalendarView: React.FC<CalendarViewProps> = ({ 
  schedule, 
  lessonMap, 
  currentDay, 
  activeSubject,
  lessons 
}) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
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

    fetchCompletedLessons();
  }, [user]);

  // Get lessons for the active subject
  const subjectLessons = lessons.filter(lesson => lesson.subject === activeSubject);
  
  // Create a weekly schedule for the active subject
  const createSubjectSchedule = () => {
    const weeklySchedule: Array<{ day: number; lesson: { id: string; title: string; subject: string } | null }> = [];
    
    for (let day = 1; day <= 7; day++) {
      // Try to find a lesson from the schedule first
      const scheduledLesson = schedule.find(s => s.day === day);
      let lesson = null;
      
      if (scheduledLesson && lessonMap[scheduledLesson.lessonId]) {
        const mappedLesson = lessonMap[scheduledLesson.lessonId];
        if (mappedLesson.subject === activeSubject) {
          lesson = mappedLesson;
        }
      }
      
      // If no scheduled lesson for this subject, assign from available subject lessons
      if (!lesson && subjectLessons.length > 0) {
        const lessonIndex = (day - 1) % subjectLessons.length;
        lesson = subjectLessons[lessonIndex];
      }
      
      weeklySchedule.push({ day, lesson });
    }
    
    return weeklySchedule;
  };

  const weeklySchedule = createSubjectSchedule();

  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-gray-700 mb-4">Calendar sesiuni</h3>
      
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <div key={`day-${index}`} className="text-center text-sm font-medium text-gray-600">
            {day}
          </div>
        ))}
        
        {weeklySchedule.map(({ day, lesson }) => {
          const isCurrentDay = day === currentDay;
          const isCompleted = lesson && completedLessons.includes(lesson.id);
          
          return (
            <div 
              key={`date-${day}`}
              className={`relative text-center p-2 rounded-md border cursor-pointer transition-colors ${
                isCompleted 
                  ? 'bg-green-50 border-green-200 hover:bg-green-100'
                  : isCurrentDay 
                    ? 'border-indigo-600 bg-indigo-50 hover:bg-indigo-100'
                    : lesson
                      ? 'border-gray-300 hover:bg-gray-50'
                      : 'border-gray-200 bg-gray-50 cursor-default'
              }`}
              onClick={() => {
                if (lesson) {
                  navigate(`/lessons/${lesson.id}`);
                }
              }}
            >
              {isCompleted && (
                <div className="absolute top-1 right-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
              )}
              <div className={`font-medium mb-1 ${
                isCompleted ? 'text-green-700' : 'text-gray-900'
              }`}>
                {day}
              </div>
              {lesson && (
                <div className={`text-xs truncate ${
                  isCompleted ? 'text-green-600' : 'text-indigo-600'
                }`}>
                  {lesson.title}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;