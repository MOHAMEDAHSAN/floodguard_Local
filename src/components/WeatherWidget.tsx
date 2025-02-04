
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Thermometer, Cloud, Wind, Droplet, CloudRain, AlertTriangle, Clock } from "lucide-react";

interface WeatherData {
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    humidity: number;
    precip_mm: number;
    feelslike_c: number;
  };
  location: {
    name: string;
    region: string;
  };
}

export const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=08664519520f4182acd154355250402&q=${lat},${lon}&aqi=no`
        );
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || 'Failed to fetch weather data');
        }
        
        const data = await response.json();
        if (!data?.current) {
          throw new Error('Invalid weather data received');
        }
        
        setWeather(data);
        setError(null);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error fetching weather data';
        setError(errorMessage);
        toast({
          variant: "destructive",
          title: "Weather Data Error",
          description: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      () => {
        fetchWeather(13.0827, 80.2707);
        toast({
          description: "Using default location: Chennai",
        });
      }
    );
  }, [toast]);

  if (loading) {
    return (
      <div className="animate-pulse bg-white/5 dark:bg-black/10 backdrop-blur-xl rounded-xl p-8 shadow-lg border border-white/20 dark:border-white/10 space-y-6">
        <div className="h-20 bg-gray-200/50 dark:bg-gray-800/50 rounded"></div>
        <div className="space-y-4">
          <div className="h-8 bg-gray-200/50 dark:bg-gray-800/50 rounded w-1/3"></div>
          <div className="h-6 bg-gray-200/50 dark:bg-gray-800/50 rounded w-1/2"></div>
          <div className="h-6 bg-gray-200/50 dark:bg-gray-800/50 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/5 dark:bg-black/10 backdrop-blur-xl rounded-xl p-8 shadow-lg border border-white/20 dark:border-white/10 space-y-6">
        <div className="flex items-center justify-center space-x-3 text-destructive">
          <AlertTriangle className="w-6 h-6" />
          <h2 className="text-xl font-semibold">Weather Data Unavailable</h2>
        </div>
        <p className="text-center text-gray-400">{error}</p>
      </div>
    );
  }

  if (!weather?.current) return null;

  return (
    <div className="bg-white/5 dark:bg-[#0f1117]/80 backdrop-blur-xl rounded-xl p-8 shadow-lg border border-white/20 dark:border-white/10 space-y-6 transition-all duration-300">
      <div className="flex items-center space-x-3 text-primary/90 dark:text-cyan-400">
        <Cloud className="w-6 h-6" />
        <h2 className="text-xl font-semibold">Location Insights</h2>
      </div>

      <div className="bg-white/5 dark:bg-[#0f1117]/80 rounded-xl p-6 space-y-4 border border-white/10">
        <div className="flex items-center space-x-3">
          <Thermometer className="w-6 h-6 text-cyan-400" />
          <h3 className="text-lg font-medium text-gray-200/90">Weather Conditions</h3>
        </div>
        
        <div className="space-y-2">
          <div className="text-4xl font-bold text-cyan-400">
            {weather?.current.temp_c}°C
          </div>
          <div className="text-lg text-gray-300/90">{weather?.current.condition.text}</div>
          <div className="text-sm text-gray-400/80">
            Feels like {weather?.current.feelslike_c}°C • UV Index: 0
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 dark:bg-[#0f1117]/80 rounded-xl p-4 space-y-2 border border-white/10">
          <div className="flex items-center space-x-2 text-cyan-400">
            <Wind className="w-5 h-5" />
            <span className="text-sm font-medium">Wind Speed</span>
          </div>
          <div className="text-2xl font-semibold text-gray-200">
            {weather?.current.wind_kph} km/h
          </div>
        </div>

        <div className="bg-white/5 dark:bg-[#0f1117]/80 rounded-xl p-4 space-y-2 border border-white/10">
          <div className="flex items-center space-x-2 text-cyan-400">
            <Droplet className="w-5 h-5" />
            <span className="text-sm font-medium">Humidity</span>
          </div>
          <div className="text-2xl font-semibold text-gray-200">
            {weather?.current.humidity}%
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-4 space-y-4">
        <div className="flex items-center space-x-2 text-gray-300/90">
          <AlertTriangle className="w-5 h-5" />
          <span className="text-sm">Nearby Alerts</span>
        </div>
        <div className="text-gray-400/80">No alerts in your area</div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-400/80">
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>Last updated</span>
        </div>
        <span>{new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
};
