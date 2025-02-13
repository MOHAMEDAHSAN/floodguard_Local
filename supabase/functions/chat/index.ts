
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
  location: {
    coordinates?: {
      latitude: number;
      longitude: number;
    };
    city: string;
    state: string;
    country: string;
  };
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
6. Weather updates and forecasts 🌤️

Keep responses concise, practical, and focused on flood-related information. Always maintain a helpful and reassuring tone. Use appropriate emojis to make responses more engaging.

Current location context: Chennai, Tamil Nadu, India
Emergency contacts:
- Police: 100 👮
- Flood Control: 1913 🌊
- Emergency Services: 108 🚑`;

const isWeatherQuery = (message: string): boolean => {
  const weatherKeywords = [
    'weather',
    'forecast',
    'temperature',
    'rain',
    'precipitation',
    'humidity',
    'climate',
    'conditions'
  ];
  const lowerMessage = message.toLowerCase();
  return weatherKeywords.some(keyword => lowerMessage.includes(keyword));
};

const getWeatherInfo = async (location: RequestBody['location']): Promise<string> => {
  const WEATHER_API_KEY = Deno.env.get('WEATHER_API_KEY');
  if (!WEATHER_API_KEY) {
    throw new Error('Weather API key not configured');
  }

  try {
    const query = location.coordinates ? 
      `${location.coordinates.latitude},${location.coordinates.longitude}` : 
      `${location.city}, ${location.state}, ${location.country}`;

    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${query}&days=3&aqi=yes`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    
    // Format weather information
    const current = data.current;
    const forecast = data.forecast.forecastday;
    
    let weatherInfo = `🌡️ Current Weather in ${data.location.name}:\n`;
    weatherInfo += `Temperature: ${current.temp_c}°C\n`;
    weatherInfo += `Feels like: ${current.feelslike_c}°C\n`;
    weatherInfo += `Condition: ${current.condition.text}\n`;
    weatherInfo += `Humidity: ${current.humidity}%\n`;
    weatherInfo += `Wind: ${current.wind_kph} km/h\n`;
    weatherInfo += `Precipitation: ${current.precip_mm} mm\n\n`;
    
    weatherInfo += "📅 3-Day Forecast:\n";
    forecast.forEach((day: any) => {
      weatherInfo += `\n${new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}:\n`;
      weatherInfo += `High: ${day.day.maxtemp_c}°C, Low: ${day.day.mintemp_c}°C\n`;
      weatherInfo += `Condition: ${day.day.condition.text}\n`;
      weatherInfo += `Rain chance: ${day.day.daily_chance_of_rain}%\n`;
    });

    return weatherInfo;
  } catch (error) {
    console.error('Weather API error:', error);
    throw new Error('Unable to fetch weather information');
  }
};

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
    return "👋 Hi! I'm here to help with flood-related information. You can ask about:\n\n- Flood risks and safety 🌊\n- Emergency preparedness 🚨\n- Current alerts for Chennai ⚠️\n- Weather updates and forecasts 🌤️\n\nWhat would you like to know more about?";
  }
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context, location } = await req.json() as RequestBody;
    console.log('Received message:', message);
    console.log('Context:', context);
    console.log('Location:', location);

    let responseContent: string;

    // Check if it's a weather-related query
    if (isWeatherQuery(message)) {
      try {
        responseContent = await getWeatherInfo(location);
      } catch (error) {
        console.error('Weather API error:', error);
        responseContent = "I'm sorry, I couldn't fetch the weather information at the moment. Please try again later.";
      }
    } else {
      // Use DeepSeek for non-weather queries
      const DEEPSEEK_API_KEY = Deno.env.get('DEEPSEEK_API_KEY');
      if (!DEEPSEEK_API_KEY) {
        throw new Error('DeepSeek API key not found');
      }

      // Format conversation history for DeepSeek
      const conversationHistory = context.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

      // Add system prompt
      conversationHistory.unshift({
        role: 'system',
        content: systemPrompt
      });

      // Add the current message
      conversationHistory.push({
        role: 'user',
        content: message
      });

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

      if (!deepseekResponse.ok) {
        console.error('DeepSeek API error:', await deepseekResponse.text());
        responseContent = getFallbackResponse(message);
      } else {
        const data = await deepseekResponse.json();
        console.log('DeepSeek response:', data);
        responseContent = data.choices[0].message.content;
      }
    }

    // Generate context-aware options
    const generateOptions = (message: string, isWeatherResponse: boolean): string[] => {
      if (isWeatherResponse) {
        return [
          "🌡️ Get detailed forecast",
          "🌧️ Check rain probability",
          "⚠️ Weather alerts",
          "🌊 Check flood risk",
          "📋 Show all options"
        ];
      }

      const lowerMessage = message.toLowerCase();
      if (lowerMessage.includes('flood risk') || lowerMessage.includes('prepare')) {
        return [
          "🏠 How can I prepare my home?",
          "🎒 What emergency supplies do I need?",
          "🚶 Show evacuation routes",
          "🌤️ Check weather forecast",
          "📋 Show all options"
        ];
      } else if (lowerMessage.includes('emergency') || lowerMessage.includes('help')) {
        return [
          "📞 Call emergency services",
          "🏘️ Find nearest shelter",
          "⚠️ Report flooding",
          "🌤️ Check weather forecast",
          "📋 Show all options"
        ];
      } else {
        return [
          "🌊 Learn about flood risks",
          "🚨 Emergency preparedness",
          "🌤️ Check weather forecast",
          "📍 Set my location",
          "📋 Show all options"
        ];
      }
    };

    const aiMessage: Message = {
      type: 'bot',
      content: responseContent,
      options: generateOptions(message, isWeatherQuery(message))
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
        "🌤️ Check weather forecast",
        "📋 Show all options"
      ]
    };
    
    return new Response(JSON.stringify(fallbackMessage), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
