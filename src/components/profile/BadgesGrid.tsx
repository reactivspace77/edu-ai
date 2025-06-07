import React, { useEffect } from 'react';
import { 
  Trophy, 
  BookOpen, 
  Zap, 
  Search, 
  GraduationCap, 
  Calculator, 
  Heart, 
  Target, 
  Star, 
  Award,
  Flame,
  Crown,
  Sunrise,
  Moon,
  Calendar,
  CheckCircle
} from 'lucide-react';
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

  // Badge configuration with colors and icons
  const badgeConfig: Record<string, { icon: React.ComponentType<any>, color: string, bgColor: string }> = {
    'first-lesson': { 
      icon: BookOpen, 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-100' 
    },
    'quick-learner': { 
      icon: Zap, 
      color: 'text-yellow-600', 
      bgColor: 'bg-yellow-100' 
    },
    'knowledge-seeker': { 
      icon: Search, 
      color: 'text-purple-600', 
      bgColor: 'bg-purple-100' 
    },
    'master-student': { 
      icon: GraduationCap, 
      color: 'text-indigo-600', 
      bgColor: 'bg-indigo-100' 
    },
    'math-novice': { 
      icon: Calculator, 
      color: 'text-green-600', 
      bgColor: 'bg-green-100' 
    },
    'math-enthusiast': { 
      icon: Calculator, 
      color: 'text-emerald-600', 
      bgColor: 'bg-emerald-100' 
    },
    'math-expert': { 
      icon: Calculator, 
      color: 'text-teal-600', 
      bgColor: 'bg-teal-100' 
    },
    'perfect-score': { 
      icon: Star, 
      color: 'text-amber-600', 
      bgColor: 'bg-amber-100' 
    },
    'quiz-master': { 
      icon: Crown, 
      color: 'text-orange-600', 
      bgColor: 'bg-orange-100' 
    },
    'level-5': { 
      icon: Award, 
      color: 'text-cyan-600', 
      bgColor: 'bg-cyan-100' 
    },
    'level-10': { 
      icon: Award, 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-100' 
    },
    'level-20': { 
      icon: Trophy, 
      color: 'text-violet-600', 
      bgColor: 'bg-violet-100' 
    },
    'daily-streak-3': { 
      icon: Flame, 
      color: 'text-red-600', 
      bgColor: 'bg-red-100' 
    },
    'daily-streak-7': { 
      icon: Flame, 
      color: 'text-orange-600', 
      bgColor: 'bg-orange-100' 
    },
    'daily-streak-30': { 
      icon: Flame, 
      color: 'text-rose-600', 
      bgColor: 'bg-rose-100' 
    },
    'early-bird': { 
      icon: Sunrise, 
      color: 'text-yellow-600', 
      bgColor: 'bg-yellow-100' 
    },
    'night-owl': { 
      icon: Moon, 
      color: 'text-slate-600', 
      bgColor: 'bg-slate-100' 
    },
    'weekend-warrior': { 
      icon: Calendar, 
      color: 'text-pink-600', 
      bgColor: 'bg-pink-100' 
    },
    'full-attendance': { 
      icon: CheckCircle, 
      color: 'text-lime-600', 
      bgColor: 'bg-lime-100' 
    }
  };

  const getBadgeConfig = (badgeId: string) => {
    return badgeConfig[badgeId] || { 
      icon: Trophy, 
      color: 'text-gray-600', 
      bgColor: 'bg-gray-100' 
    };
  };

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
            const config = getBadgeConfig(badge.id);
            const IconComponent = config.icon;
            
            return (
              <div 
                key={badge.id}
                className={`flex flex-col items-center p-4 rounded-lg border transition-all duration-300 hover:scale-105 ${
                  isEarned 
                    ? `border-gray-200 ${config.bgColor} shadow-sm` 
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                  isEarned 
                    ? `${config.bgColor} ring-2 ring-offset-2 ring-gray-200` 
                    : 'bg-gray-100'
                }`}>
                  <IconComponent className={`h-8 w-8 ${
                    isEarned ? config.color : 'text-gray-400'
                  }`} />
                </div>
                <h4 className={`text-sm font-medium mb-1 text-center ${
                  isEarned ? 'text-gray-800' : 'text-gray-500'
                }`}>
                  {badge.name}
                </h4>
                <p className="text-xs text-center text-gray-500 leading-relaxed">
                  {badge.description}
                </p>
                {isEarned && (
                  <div className={`mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                    config.bgColor
                  } ${config.color}`}>
                    Obținută
                  </div>
                )}
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