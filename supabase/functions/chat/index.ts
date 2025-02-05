import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

interface Message {
  type: 'user' | 'bot';
  content: string;
  options?: string[];
}

interface RequestBody {
  message: string;
  context: Message[];
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context } = await req.json() as RequestBody;

    // Format conversation history for DeepSeek
    const conversationHistory = context.map(msg => ({
      role: msg.type === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    // Add the current message
    conversationHistory.push({
      role: 'user',
      content: message
    });

    // Call DeepSeek API
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('DEEPSEEK_API_KEY')}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: conversationHistory,
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('DeepSeek response:', data);

    const aiMessage: Message = {
      type: 'bot',
      content: data.choices[0].message.content,
      options: [
        "Ask another question",
        "Back to main menu"
      ]
    };

    return new Response(JSON.stringify(aiMessage), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});