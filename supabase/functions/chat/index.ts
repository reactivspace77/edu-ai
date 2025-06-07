import { createClient } from 'npm:@supabase/supabase-js@2.39.7';
import OpenAI from 'npm:openai@4.28.0';

const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY')
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface UserProfile {
  subjects?: string[];
  level?: number;
  examType?: string;
  grade?: number;
}

interface ChatRequest {
  question: string;
  context?: ChatMessage[];
  userProfile?: UserProfile;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { question, context = [], userProfile } = await req.json() as ChatRequest;

    // Build system prompt with user context
    let systemPrompt = `You are an expert AI tutor for Romanian students. 
    Your responses should be:
    - Clear and concise
    - Appropriate for a student's level
    - In Romanian language
    - Include examples when helpful
    - Encourage critical thinking
    - Be supportive and encouraging`;

    // Add user-specific context to system prompt
    if (userProfile) {
      if (userProfile.subjects && userProfile.subjects.length > 0) {
        const subjectNames = userProfile.subjects.map(subject => {
          const names: { [key: string]: string } = {
            matematica: 'Matematică',
            romana: 'Limba Română',
            fizica: 'Fizică',
            chimie: 'Chimie',
            biologie: 'Biologie',
            istorie: 'Istorie',
            geografie: 'Geografie'
          };
          return names[subject] || subject;
        });
        systemPrompt += `\n\nThe student is studying: ${subjectNames.join(', ')}.`;
      }

      if (userProfile.examType) {
        const examName = userProfile.examType === 'evaluareNationala' 
          ? 'Evaluarea Națională' 
          : 'Bacalaureat';
        systemPrompt += `\nThe student is preparing for: ${examName}.`;
      }

      if (userProfile.grade) {
        systemPrompt += `\nThe student is in grade ${userProfile.grade}.`;
      }

      if (userProfile.level) {
        systemPrompt += `\nThe student's current learning level is ${userProfile.level}.`;
      }
    }

    systemPrompt += `\n\nMaintain context from previous messages in the conversation and provide helpful, educational responses that build upon the ongoing discussion.`;

    // Prepare messages for OpenAI
    const messages: any[] = [
      { role: "system", content: systemPrompt }
    ];

    // Add conversation context (limit to last 10 messages to avoid token limits)
    const recentContext = context.slice(-10);
    messages.push(...recentContext);

    // If no context provided, add the current question
    if (context.length === 0) {
      messages.push({ role: "user", content: question });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: messages,
      temperature: 0.7,
      max_tokens: 800,
      response_format: { type: "text" }
    });

    return new Response(
      JSON.stringify({ response: completion.choices[0].message.content }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error('Chat function error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  }
});