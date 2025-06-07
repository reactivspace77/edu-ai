import React, { useState } from 'react';
import { MessageCircle, Loader2 } from 'lucide-react';

const FloatingChatButton: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const openTavusChat = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://eoi4yc0jsgcnmsh.m.pipedream.net');
      const data = await response.text();
      
      window.open(
        data,
        "_blank",
        "width=400,height=600"
      );
    } catch (error) {
      console.error('Error opening chat:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={openTavusChat}
        disabled={loading}
        className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Open chat"
      >
        {loading ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>
    </div>
  );
};

export default FloatingChatButton;