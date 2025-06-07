import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import StudyPlanPage from './pages/StudyPlanPage';
import LessonPage from './pages/LessonPage';
import ProfilePage from './pages/ProfilePage';
import useAuthStore from './store/authStore';
import supabase from './config/supabase';
import ElevenLabsWidget from './components/chat/ElevenLabsWidget';

const App: React.FC = () => {
  const { user, isAuthenticated, loading, loadUserProfile, clearAuth } = useAuthStore();
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          // Handle specific session errors by clearing invalid sessions
          if (error.message?.includes('session_not_found') || error.message?.includes('JWT')) {
            await supabase.auth.signOut();
            clearAuth();
          }
          throw error;
        }

        if (session?.user) {
          await loadUserProfile(session.user);
        } else {
          // Explicitly clear auth state if no session user
          clearAuth();
        }
        
        setAppReady(true);
      } catch (error) {
        console.error('Auth check error:', error);
        // Ensure auth state is cleared on any error
        clearAuth();
        setAppReady(true);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || !session?.user) {
        clearAuth();
      } else if (session?.user) {
        await loadUserProfile(session.user);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [loadUserProfile, clearAuth]);

  const isOnboardingComplete = () => {
    if (!user) return false;
    
    return Boolean(
      user.name && 
      user.avatar &&
      user.subjects && 
      user.subjects.length > 0
    );
  };

  if (!appReady || loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Se încarcă...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      {isAuthenticated && isOnboardingComplete() && <ElevenLabsWidget />}
      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route 
          path="/onboarding" 
          element={
            isAuthenticated 
              ? isOnboardingComplete() 
                ? <Navigate to="/dashboard" /> 
                : <OnboardingPage />
              : <Navigate to="/login" />
          } 
        />
        
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated 
              ? isOnboardingComplete() 
                ? <DashboardPage /> 
                : <Navigate to="/onboarding" />
              : <Navigate to="/login" />
          } 
        />
        
        <Route 
          path="/study-plan" 
          element={
            isAuthenticated 
              ? isOnboardingComplete() 
                ? <StudyPlanPage /> 
                : <Navigate to="/onboarding" />
              : <Navigate to="/login" />
          } 
        />
        
        <Route 
          path="/lessons/:lessonId" 
          element={
            isAuthenticated 
              ? isOnboardingComplete() 
                ? <LessonPage /> 
                : <Navigate to="/onboarding" />
              : <Navigate to="/login" />
          } 
        />
        
        <Route 
          path="/profile" 
          element={
            isAuthenticated 
              ? <ProfilePage /> 
              : <Navigate to="/login" />
          } 
        />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;