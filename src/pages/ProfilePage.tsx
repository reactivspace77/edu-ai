import React from 'react';
import Navbar from '../components/layout/Navbar';
import UserProfileCard from '../components/profile/UserProfileCard';
import BadgesGrid from '../components/profile/BadgesGrid';
import useAuthStore from '../store/authStore';
import { Award } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();
  
  if (!user) return null;

  return (
    <>
      <Navbar />
      <main className="bg-gray-100 min-h-screen pb-8 pt-16"> {/* Added pt-16 to account for fixed navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Profilul meu</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4">
              <UserProfileCard />
            </div>

            <div className="lg:col-span-8">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-center mb-6">
                  <div className="p-2 rounded-full bg-indigo-100 mr-3">
                    <Award className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">Nivel curent</h2>
                    <div className="mt-1 flex items-center">
                      <div className="text-3xl font-bold text-indigo-600 mr-2">Nivel {user.level}</div>
                      <div className="text-sm text-gray-500">
                        {user.level < 5 ? 'Începător' :
                         user.level < 10 ? 'Avansat' :
                         user.level < 15 ? 'Expert' : 'Maestru'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                  <div 
                    className="bg-indigo-600 h-2.5 rounded-full"
                    style={{ width: `${(user.experience % 100) || 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 text-right">
                  {user.experience} XP total
                </div>
              </div>

              <BadgesGrid />
            </div>
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Obiective personale</h2>
            {user.personalGoals ? (
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="text-gray-700">{user.personalGoals}</p>
              </div>
            ) : (
              <div className="text-gray-500 text-center py-6 border-2 border-dashed border-gray-200 rounded-lg">
                Nu ai definit încă obiective personale.
                <div className="mt-2">
                  <button
                    className="px-4 py-2 text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                  >
                    Adaugă obiective
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;