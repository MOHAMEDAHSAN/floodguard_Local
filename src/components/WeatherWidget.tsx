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
        fetchWeather(13.0827, 80.2707);
        toast({
          description: "Using default location: Chennai",
        });
      }
    );
  }, [toast]);

  if (loading) {
    return (
      <div className="animate-pulse bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-lg space-y-6">
        <div className="h-20 bg-gray-200 rounded"></div>
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-6 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-lg space-y-6">
      <div className="flex items-center space-x-3 text-primary">
        <Cloud className="w-6 h-6" />
        <h2 className="text-xl font-semibold">Location Insights</h2>
      </div>

      <div className="bg-primary/5 rounded-xl p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <Thermometer className="w-6 h-6 text-primary" />
          <h3 className="text-lg font-medium text-gray-700">Weather Conditions</h3>
        </div>
        
        <div className="space-y-2">
          <div className="text-4xl font-bold text-primary-dark">
            {weather.current.temp_c}°C
          </div>
          <div className="text-lg text-gray-600">{weather.current.condition.text}</div>
          <div className="text-sm text-gray-500">
            Feels like {weather.current.feelslike_c}°C • UV Index: 0
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-primary/5 rounded-xl p-4 space-y-2">
          <div className="flex items-center space-x-2 text-primary">
            <Wind className="w-5 h-5" />
            <span className="text-sm font-medium">Wind Speed</span>
          </div>
          <div className="text-2xl font-semibold text-primary-dark">
            {weather.current.wind_kph} km/h
          </div>
        </div>

        <div className="bg-primary/5 rounded-xl p-4 space-y-2">
          <div className="flex items-center space-x-2 text-primary">
            <Droplet className="w-5 h-5" />
            <span className="text-sm font-medium">Humidity</span>
          </div>
          <div className="text-2xl font-semibold text-primary-dark">
            {weather.current.humidity}%
          </div>
        </div>
      </div>

      <div className="border-t pt-4 space-y-4">
        <div className="flex items-center space-x-2 text-gray-600">
          <AlertTriangle className="w-5 h-5" />
          <span className="text-sm">Nearby Alerts</span>
        </div>
        <div className="text-gray-500">No alerts in your area</div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>Last updated</span>
        </div>
        <span>{new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
};