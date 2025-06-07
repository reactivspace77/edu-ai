import React, { useEffect } from 'react';

const ElevenLabsWidget: React.FC = () => {
  useEffect(() => {
    // Create and append the script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    document.body.appendChild(script);

    // Create and append the widget element
    const widget = document.createElement('elevenlabs-convai');
    widget.setAttribute('agent-id', 'agent_01jwtq4zsef3cvgrpw0kzxk7ad');
    document.body.appendChild(widget);

    // Cleanup on unmount
    return () => {
      document.body.removeChild(script);
      const existingWidget = document.querySelector('elevenlabs-convai');
      if (existingWidget) {
        document.body.removeChild(existingWidget);
      }
    };
  }, []);

  return null;
};

export default ElevenLabsWidget;