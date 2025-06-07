import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Sparkles, Trash2 } from 'lucide-react';
import supabase from '../../config/supabase';
import useAuthStore from '../../store/authStore';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  userId?: string;
}

const LearningAssistant: React.FC = () => {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!user) return;

      try {
        setInitialLoading(true);
        const { data, error } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('userId', user.id)
          .order('timestamp', { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          const formattedMessages = data.map(msg => ({
            id: msg.id,
            content: msg.content,
            isUser: msg.isUser,
            timestamp: new Date(msg.timestamp),
            userId: msg.userId
          }));
          setMessages(formattedMessages);
        } else {
          // Add welcome message if no previous messages
          const welcomeMessage: Message = {
            id: '0',
            content: 'Salut! Sunt asistentul tău AI pentru învățare. Ce cunoștințe vrei să-ți îmbunătățești azi? Pot să te ajut cu orice întrebare legată de materiile tale.',
            isUser: false,
            timestamp: new Date()
          };
          setMessages([welcomeMessage]);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        // Fallback to welcome message
        const welcomeMessage: Message = {
          id: '0',
          content: 'Salut! Sunt asistentul tău AI pentru învățare. Ce cunoștințe vrei să-ți îmbunătățești azi?',
          isUser: false,
          timestamp: new Date()
        };
        setMessages([welcomeMessage]);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchMessages();
  }, [user]);

  const saveMessage = async (message: Message) => {
    if (!user || message.id === '0') return; // Don't save welcome message

    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert([{
          id: message.id,
          content: message.content,
          isUser: message.isUser,
          timestamp: message.timestamp.toISOString(),
          userId: user.id
        }]);

      if (error) throw error;
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  const clearChat = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Delete all messages from database
      const { error } = await supabase
        .from('chat_messages')
        .delete()
        .eq('userId', user.id);

      if (error) throw error;

      // Reset to welcome message
      const welcomeMessage: Message = {
        id: '0',
        content: 'Salut! Sunt asistentul tău AI pentru învățare. Ce cunoștințe vrei să-ți îmbunătățești azi?',
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    } catch (error) {
      console.error('Error clearing chat:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading || !user) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      isUser: true,
      timestamp: new Date(),
      userId: user.id
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    await saveMessage(userMessage);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No session found');

      // Prepare conversation context (last 10 messages for context)
      const recentMessages = messages.slice(-10);
      const conversationContext = recentMessages.map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.content
      }));

      // Add current user message to context
      conversationContext.push({
        role: 'user',
        content: userMessage.content
      });

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: userMessage.content,
          context: conversationContext,
          userProfile: {
            subjects: user.subjects,
            level: user.level,
            examType: user.examType,
            grade: user.grade
          }
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        isUser: false,
        timestamp: new Date(),
        userId: user.id
      };

      setMessages(prev => [...prev, aiMessage]);
      
      await saveMessage(aiMessage);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Îmi pare rău, a apărut o eroare. Te rog să încerci din nou.',
        isUser: false,
        timestamp: new Date(),
        userId: user.id
      };
      
      setMessages(prev => [...prev, errorMessage]);
      await saveMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-lg shadow-md">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-indigo-200 rounded-lg">
              <Sparkles className="h-5 w-5 text-indigo-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Asistentul tău de învățare</h3>
          </div>
          
          <div className="h-[400px] flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Se încarcă conversația...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-lg shadow-md">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-200 rounded-lg">
              <Sparkles className="h-5 w-5 text-indigo-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Asistentul tău de învățare</h3>
          </div>
          
          <button
            onClick={clearChat}
            disabled={loading || messages.length <= 1}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Șterge conversația"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        
        <div className="h-[400px] overflow-y-auto mb-4 space-y-4 pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.isUser
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white shadow-sm text-gray-800'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <span className={`text-xs ${message.isUser ? 'text-indigo-200' : 'text-gray-400'} mt-1 block`}>
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Scrie un mesaj..."
            className="w-full pr-12 pl-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white bg-indigo-600 rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LearningAssistant;