import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

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
  };
  location: {
    name: string;
    region: string;
  };
}

export const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=d785347b2ff94fe593082140252301&q=${lat},${lon}&aqi=no`
        );
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error fetching weather data",
          description: "Please try again later",
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
        // Default to Chennai coordinates if geolocation is denied
        fetchWeather(13.0827, 80.2707);
        toast({
          description: "Using default location: Chennai",
        });
      }
    );
  }, [toast]);

  if (loading) {
    return (
      <div className="animate-pulse bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-lg space-y-6 border border-primary-light">
        <div className="h-40 bg-gray-200 rounded-lg"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-lg space-y-6 border border-primary-light">
      <div className="h-40 rounded-lg overflow-hidden mb-6">
        <div className="w-full h-full bg-wave-pattern bg-cover bg-center transform hover:scale-110 transition-transform duration-500"></div>
      </div>
      <h3 className="text-xl font-semibold text-primary-dark">
        Weather Report Analysis
      </h3>
      <ul className="space-y-3 text-sm">
        <li className="flex items-center space-x-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
          <span>Current temperature: {weather.current.temp_c}°C</span>
        </li>
        <li className="flex items-center space-x-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
          <span>Condition: {weather.current.condition.text}</span>
        </li>
        <li className="flex items-center space-x-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
          <span>Wind speed: {weather.current.wind_kph} km/h</span>
        </li>
        <li className="flex items-center space-x-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
          <span>Humidity: {weather.current.humidity}%</span>
        </li>
        <li className="flex items-center space-x-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
          <span>Precipitation: {weather.current.precip_mm} mm</span>
        </li>
      </ul>
    </div>
  );
};