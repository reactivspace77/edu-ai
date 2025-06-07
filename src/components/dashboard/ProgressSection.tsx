import React, { useEffect, useState } from 'react';
import { 
  Trophy, 
  ChevronRight, 
  BookOpen, 
  Zap, 
  Search, 
  GraduationCap, 
  Calculator, 
  Star, 
  Crown, 
  Award,
  Flame,
  Sunrise,
  Moon,
  Calendar,
  CheckCircle
} from 'lucide-react';
import useAuthStore from '../../store/authStore';
import useGamificationStore from '../../store/gamificationStore';
import { Badge } from '../../types';

const ProgressSection: React.FC = () => {
  const { user } = useAuthStore();
  const { badges, earnedBadges, fetchBadges, fetchEarnedBadges } = useGamificationStore();
  const [recentBadges, setRecentBadges] = useState<Badge[]>([]);
  
  useEffect(() => {
    if (user) {
      fetchBadges();
      fetchEarnedBadges(user.id);
    }
  }, [user, fetchBadges, fetchEarnedBadges]);

  useEffect(() => {
    if (badges.length && earnedBadges.length) {
      const earned = badges.filter(badge => earnedBadges.includes(badge.id)).slice(0, 4);
      setRecentBadges(earned);
    }
  }, [badges, earnedBadges]);

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

  const calculateNextLevelExp = () => {
    if (!user) return 100;
    const currentLevel = user.level;
    const nextLevelExp = Math.pow((currentLevel), 2) * 100;
    const currentLevelExp = Math.pow((currentLevel - 1), 2) * 100;
    const totalExpNeeded = nextLevelExp - currentLevelExp;
    const expSoFar = user.experience - currentLevelExp;
    
    return {
      progress: Math.round((expSoFar / totalExpNeeded) * 100),
      current: expSoFar,
      total: totalExpNeeded
    };
  };

  const expData = calculateNextLevelExp();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Progresul tău</h3>
        
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progres general</span>
            <span>Nivel {user?.level}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${expData.progress}%` }}
            ></div>
          </div>
          <div className="mt-1 text-xs text-gray-500 text-right">
            {expData.current} / {expData.total} XP până la nivelul {(user?.level || 1) + 1}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-medium text-gray-700">Insigne câștigate</h4>
            <a href="/profile" className="flex items-center text-xs text-indigo-600 hover:text-indigo-800">
              Vezi toate <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>

          {recentBadges.length > 0 ? (
            <div className="grid grid-cols-4 gap-4">
              {recentBadges.map((badge) => {
                const config = getBadgeConfig(badge.id);
                const IconComponent = config.icon;
                
                return (
                  <div key={badge.id} className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-1 ${config.bgColor}`}>
                      <IconComponent className={`h-6 w-6 ${config.color}`} />
                    </div>
                    <span className="text-xs text-center text-gray-600">{badge.name}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-sm text-gray-500 text-center py-4 border-2 border-dashed border-gray-200 rounded-lg">
              Nu ai câștigat încă nicio insignă.
              <div className="mt-1 text-xs">Completează lecțiile și provocările pentru a obține insigne!</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressSection;