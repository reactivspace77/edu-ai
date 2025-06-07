import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
import useAuthStore from '../store/authStore';
import { Lightbulb } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/onboarding');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col justify-center items-center p-4">
      <div className="mb-8 text-center">
        <div className="inline-block p-3 bg-indigo-100 rounded-full mb-4">
          <Lightbulb className="h-10 w-10 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          EduAI
        </h1>
        <p className="mt-2 text-gray-600">
          Creează-ți contul și începe să înveți inteligent
        </p>
      </div>
      
      <RegisterForm />

      <p className="mt-8 text-center text-sm text-gray-500">
        Platformă educațională AI pentru elevi. <br />
        Învață în ritmul tău, cu ajutorul inteligenței artificiale.
      </p>
    </div>
  );
};

export default RegisterPage;