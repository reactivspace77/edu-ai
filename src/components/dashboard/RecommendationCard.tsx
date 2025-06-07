import React from 'react';
import { Lightbulb, BookOpen, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RecommendationCardProps {
  recommendation: string;
  nextLessonId: string;
  nextLessonTitle: string;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ 
  recommendation, 
  nextLessonId, 
  nextLessonTitle 
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="p-2 bg-white bg-opacity-20 rounded-full">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-white">Recomandări AI</h3>
            <p className="mt-1 text-sm text-white text-opacity-90">
              {recommendation}
            </p>
            
            <div className="mt-4 flex items-center text-sm text-white text-opacity-90">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>Următoarea lecție: {nextLessonTitle}</span>
            </div>

            <div className="mt-4 flex space-x-3">
              <button
                onClick={() => navigate(`/lessons/${nextLessonId}`)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-indigo-700"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Vezi lecția
              </button>
              <button
                onClick={() => navigate('/study-plan')}
                className="inline-flex items-center px-4 py-2 border border-white border-opacity-30 text-sm font-medium rounded-md text-white bg-transparent hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-indigo-700"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Plan de studiu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;