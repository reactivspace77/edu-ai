import React, { useEffect, useState } from 'react';
import { Trophy, CheckCircle, X, Calculator, BookOpen, FileText, Shapes } from 'lucide-react';
import useChallengeStore from '../../store/challengeStore';
import useAuthStore from '../../store/authStore';
import ChallengeModal from './ChallengeModal';

const ChallengesList: React.FC = () => {
  const { user } = useAuthStore();
  const { dailyChallenges, fetchChallenges, updateChallenge, loading } = useChallengeStore();
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchChallenges(user.id);
    }
  }, [user, fetchChallenges]);

  const handleChallengeClick = (challengeId: string) => {
    setSelectedChallenge(challengeId);
  };

  const handleChallengeComplete = async (challengeId: string, score: number) => {
    if (!user) return;
    
    // Update challenge progress with the actual score achieved
    await updateChallenge(challengeId, score, user.id);
    setSelectedChallenge(null);
  };

  const getChallengeIcon = (challengeId: string) => {
    switch(challengeId) {
      case 'romana-analiza-epic':
        return <BookOpen className="h-5 w-5 text-amber-600" />;
      case 'mate-geometrie-arii':
        return <Shapes className="h-5 w-5 text-amber-600" />;
      case 'romana-morfologie':
        return <FileText className="h-5 w-5 text-amber-600" />;
      default:
        return <Calculator className="h-5 w-5 text-amber-600" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-4">
          <div className="h-16 bg-gray-200 rounded"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Provocări</h3>
          
          {dailyChallenges.length > 0 ? (
            <div className="space-y-4">
              {dailyChallenges.map((challenge) => (
                <div 
                  key={challenge.id} 
                  className="border border-gray-200 rounded-lg p-4 cursor-pointer transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg hover:border-gray-300"
                  onClick={() => handleChallengeClick(challenge.id)}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className={`p-1.5 rounded-full transition-all duration-200 ${
                        challenge.current >= challenge.target 
                          ? 'bg-green-100' 
                          : 'bg-amber-100'
                      }`}>
                        {challenge.current >= challenge.target ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          getChallengeIcon(challenge.id)
                        )}
                      </div>
                    </div>
                    <div className="ml-3 flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{challenge.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{challenge.description}</p>
                      
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progres</span>
                          <span>{challenge.current}/{challenge.target}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              challenge.current >= challenge.target 
                                ? 'bg-green-600' 
                                : 'bg-amber-500'
                            }`}
                            style={{ width: `${Math.min(100, (challenge.current / challenge.target) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500 text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
              Nu ai nicio provocare activă.
              <div className="mt-1 text-xs">Revino mâine pentru noi provocări!</div>
            </div>
          )}
        </div>
      </div>

      {selectedChallenge && (
        <ChallengeModal
          challengeId={selectedChallenge}
          onComplete={handleChallengeComplete}
          onClose={() => setSelectedChallenge(null)}
        />
      )}
    </>
  );
};

export default ChallengesList;