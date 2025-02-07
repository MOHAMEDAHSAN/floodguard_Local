import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { latitude, longitude } = await req.json();
    const OPENCAGE_API_KEY = Deno.env.get('OPENCAGE_API_KEY');

    if (!OPENCAGE_API_KEY) {
      throw new Error('OpenCage API key not configured');
    }

    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`OpenCage API error: ${response.statusText}`);
    }

    const data = await response.json();
    const result = data.results[0];

    if (!result) {
      throw new Error('No location data found');
    }

    const locationData = {
      city: result.components.city || result.components.town || result.components.village,
      state: result.components.state,
      country: result.components.country,
    };

    return new Response(JSON.stringify(locationData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Geocoding error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});