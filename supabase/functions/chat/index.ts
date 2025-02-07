import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

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

const systemPrompt = `You are Nova, a friendly and helpful flood awareness and emergency response assistant. Your primary goal is to help users with:
1. Understanding flood risks and types 🌊
2. Emergency preparedness 🚨
3. Local flood alerts and warnings ⚠️
4. Post-flood recovery guidance 🏠
5. Emergency contacts and resources 📞

Keep responses concise, practical, and focused on flood-related information. Always maintain a helpful and reassuring tone. Use appropriate emojis to make responses more engaging.

Current location context: Chennai, Tamil Nadu, India
Emergency contacts:
- Police: 100 👮
- Flood Control: 1913 🌊
- Emergency Services: 108 🚑`;

// Enhanced fallback responses with emojis
const getFallbackResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('flood risk')) {
    return "🌊 I can help you understand flood risks in Chennai. The city is prone to flooding during monsoon season. Key risks include:\n\n1. Coastal flooding\n2. Urban flooding from heavy rainfall\n3. River overflow\n\nWould you like to know about specific preventive measures? 🏠";
  } else if (lowerMessage.includes('emergency')) {
    return "🚨 For emergencies in Chennai:\n\n- Police: 100 👮\n- Flood Control: 1913 🌊\n- Emergency Services: 108 🚑\n\nIf you're in a flood-prone area, prepare an emergency kit and stay tuned to local alerts! ⚠️";
  } else if (lowerMessage.includes('prepare')) {
    return "📋 Here are key preparation steps:\n\n1. Keep emergency contacts handy 📞\n2. Prepare an emergency kit 🎒\n3. Know your evacuation route 🚶\n4. Keep important documents in a waterproof container 📑\n5. Monitor local weather updates 🌧️";
  } else {
    return "👋 Hi! I'm here to help with flood-related information. You can ask about:\n\n- Flood risks and safety 🌊\n- Emergency preparedness 🚨\n- Current alerts for Chennai ⚠️\n\nWhat would you like to know more about?";
  }
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context } = await req.json() as RequestBody;
    console.log('Received message:', message);
    console.log('Context:', context);

    // Format conversation history for DeepSeek
    const conversationHistory = context.map(msg => ({
      role: msg.type === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    // Add system prompt with enhanced formatting
    conversationHistory.unshift({
      role: 'system',
      content: systemPrompt
    });

    // Add the current message
    conversationHistory.push({
      role: 'user',
      content: message
    });

    const DEEPSEEK_API_KEY = Deno.env.get('DEEPSEEK_API_KEY');
    if (!DEEPSEEK_API_KEY) {
      throw new Error('DeepSeek API key not found');
    }

    console.log('Making request to DeepSeek API...');
    const deepseekResponse = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: conversationHistory,
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    let responseContent: string;
    if (!deepseekResponse.ok) {
      console.error('DeepSeek API error:', await deepseekResponse.text());
      responseContent = getFallbackResponse(message);
    } else {
      const data = await deepseekResponse.json();
      console.log('DeepSeek response:', data);
      responseContent = data.choices[0].message.content;
    }

    // Generate context-aware options without duplicates
    const generateUniqueOptions = (message: string): string[] => {
      const lowerMessage = message.toLowerCase();
      let options: string[] = [];
      
      if (lowerMessage.includes('flood risk') || lowerMessage.includes('prepare')) {
        options = [
          "🏠 How can I prepare my home?",
          "🎒 What emergency supplies do I need?",
          "🚶 Show evacuation routes"
        ];
      } else if (lowerMessage.includes('emergency') || lowerMessage.includes('help')) {
        options = [
          "📞 Call emergency services",
          "🏘️ Find nearest shelter",
          "⚠️ Report flooding"
        ];
      } else if (lowerMessage.includes('alert') || lowerMessage.includes('warning')) {
        options = [
          "🔔 Get current alerts",
          "📱 Set up notifications",
          "🌧️ Check weather forecast"
        ];
      } else {
        options = [
          "🌊 Learn about flood risks",
          "🚨 Emergency preparedness",
          "📍 Set my location"
        ];
      }
      
      return [...new Set(options)];
    };

    const aiMessage: Message = {
      type: 'bot',
      content: responseContent,
      options: generateUniqueOptions(message)
    };

    return new Response(JSON.stringify(aiMessage), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat function:', error);
    const fallbackMessage: Message = {
      type: 'bot',
      content: getFallbackResponse(""),
      options: [
        "🌊 Learn about flood risks",
        "🚨 Emergency preparedness",
        "📞 Contact support"
      ]
    };
    
    return new Response(JSON.stringify(fallbackMessage), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});