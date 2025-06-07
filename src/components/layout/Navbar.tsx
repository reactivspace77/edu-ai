import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Calendar, Book, User, LogOut } from 'lucide-react';
import useAuthStore from '../../store/authStore';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) return null;

  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Plan de studiu', path: '/study-plan', icon: Calendar },
    { name: 'Profil', path: '/profile', icon: User },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center flex-shrink-0">
              <span className="text-xl font-bold text-white">EduAI</span>
            </Link>
          </div>

          <nav className="flex items-center space-x-4">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors ${
                  location.pathname === item.path
                    ? 'text-white bg-white/20'
                    : 'text-gray-100 hover:text-white hover:bg-white/10'
                }`}
              >
                <item.icon className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">{item.name}</span>
              </Link>
            ))}
            
            <button
              onClick={handleSignOut}
              className="ml-2 p-2 rounded-md text-gray-100 hover:text-red-200 hover:bg-white/10 transition-colors"
              title="Deconectare"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;