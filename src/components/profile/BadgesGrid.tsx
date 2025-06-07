import React, { useEffect } from 'react';
import { Trophy } from 'lucide-react';
import useGamificationStore from '../../store/gamificationStore';
import useAuthStore from '../../store/authStore';

const BadgesGrid: React.FC = () => {
  const { user } = useAuthStore();
  const { badges, earnedBadges, fetchBadges, fetchEarnedBadges, loading } = useGamificationStore();

  useEffect(() => {
    if (user) {
      fetchBadges();
      fetchEarnedBadges(user.id);
    }
  }, [user, fetchBadges, fetchEarnedBadges]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Insigne câștigate</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge) => {
            const isEarned = earnedBadges.includes(badge.id);
            
            return (
              <div 
                key={badge.id}
                className={`flex flex-col items-center p-4 rounded-lg border ${
                  isEarned ? 'border-indigo-200 bg-indigo-50' : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                  isEarned ? 'bg-indigo-100' : 'bg-gray-100'
                }`}>
                  <Trophy className={`h-8 w-8 ${
                    isEarned ? 'text-indigo-600' : 'text-gray-400'
                  }`} />
                </div>
                <h4 className={`text-sm font-medium mb-1 ${
                  isEarned ? 'text-gray-800' : 'text-gray-500'
                }`}>
                  {badge.name}
                </h4>
                <p className="text-xs text-center text-gray-500">
                  {badge.description}
                </p>
              </div>
            );
          })}
          
          {badges.length === 0 && (
            <div className="col-span-4 text-sm text-gray-500 text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
              Nu există insigne disponibile momentan.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BadgesGrid;