import React, { useState } from 'react';
import { Send, Mic, Loader2 } from 'lucide-react';
import supabase from '../../config/supabase';

interface AiChatWidgetProps {
  lessonTitle: string;
  subject: string;
}

const AiChatWidget: React.FC<AiChatWidgetProps> = () => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    try {
      setLoading(true);
      setError(null);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No session found');

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question.trim()
        })
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.error || responseData.message || 'Failed to get AI response');
      }

      setResponse(responseData.response);
      setQuestion('');
    } catch (error) {
      console.error('Error getting AI response:', error);
      setError(error instanceof Error ? error.message : 'Ne pare rău, a apărut o eroare. Te rugăm să încerci din nou.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Întreabă AI-ul</h3>
      
      {response && (
        <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{response}</p>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Scrie o întrebare..."
            className="w-full pr-20 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            disabled={loading}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button
              type="button"
              className="p-1.5 rounded-full text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 disabled:opacity-50"
              title="Întreabă vocal"
              disabled={loading}
            >
              <Mic className="h-5 w-5" />
            </button>
            <button
              type="submit"
              disabled={!question.trim() || loading}
              className="ml-2 p-1.5 rounded-full text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </form>
      
      <p className="mt-4 text-xs text-gray-500">
        Poți pune orice întrebare legată de materie.
      </p>
    </div>
  );
};

export default AiChatWidget;