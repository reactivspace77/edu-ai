import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import supabase from './config/supabase';
import { initMockData } from './data/mockData';

// Initialize mock data and render the app
const init = async () => {
  try {
    // Initialize mock data
    await initMockData(supabase);
    
    // Then render the app
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (error) {
    console.error('Failed to initialize mock data:', error);
    // Still render the app even if mock data initialization fails
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
};

init();