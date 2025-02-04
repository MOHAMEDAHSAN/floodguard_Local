
import { useState } from "react";
import { RiskParameter } from "@/components/RiskParameter";
import { RiskScore } from "@/components/RiskScore";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import RetroHeader from "@/components/RetroHeader";
import { WeatherWidget } from "@/components/WeatherWidget";
import { VantaBackground } from "@/components/VantaBackground";

const Index = () => {
  const { toast } = useToast();
  const [parameters, setParameters] = useState({
    rainfallIntensity: 166,
    soilSaturation: 0.4,
    drainageCapacity: 1.6,
    urbanizationLevel: 0.2,
    vegetationCover: 0.7,
  });

  const calculateRiskScore = () => {
    const alpha = 0.4;
    const beta = 0.3;
    const gamma = 0.2;
    const delta = 0.05;
    const epsilon = 0.05;

    const normalizedRainfall = parameters.rainfallIntensity / 200;

    const score =
      alpha * normalizedRainfall +
      beta * parameters.soilSaturation +
      gamma * parameters.drainageCapacity +
      delta * parameters.urbanizationLevel -
      epsilon * parameters.vegetationCover;

    return Math.max(0, Math.min(1, score));
  };

  const handleCalculate = () => {
    const score = calculateRiskScore();
    toast({
      title: "Risk Assessment Complete",
      description: `The calculated flood risk score is ${(score * 100).toFixed(1)}%`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/50 to-secondary dark:from-black dark:to-[#1A1F2C] transition-colors duration-500">
      <VantaBackground />
      <RetroHeader />
      <div className="h-[50vh] bg-hero-pattern bg-cover bg-center relative mt-16">
        <div className="absolute inset-0 bg-primary-dark/40 backdrop-blur-sm">
          <div className="container h-full flex items-center justify-center">
            <div className="text-center space-y-4 animate-fadeIn">
              <h1 className="text-6xl font-bold text-white drop-shadow-lg">
                Flood Risk Assessment System
              </h1>
              <p className="text-2xl text-white/90 max-w-3xl mx-auto">
                Advanced analytics and real-time assessment of flood risks based on
                environmental parameters
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container -mt-20 pb-20">
        <div className="max-w-4xl mx-auto space-y-8 animate-slideIn">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white/80 backdrop-blur-lg dark:bg-[#0f1117]/80 rounded-xl p-8 shadow-lg space-y-6 border border-white/20 dark:border-white/10 transition-all duration-500">
              <div className="h-40 rounded-lg overflow-hidden mb-6">
                <div className="w-full h-full bg-wave-pattern bg-cover bg-center transform hover:scale-110 transition-transform duration-500"></div>
              </div>
              <h2 className="text-2xl font-semibold text-primary-dark dark:text-cyan-400">
                Risk Parameters
              </h2>
              <div className="space-y-6">
                <RiskParameter
                  label="Rainfall Intensity (mm/hr)"
                  value={parameters.rainfallIntensity}
                  onChange={([value]) =>
                    setParameters((prev) => ({
                      ...prev,
                      rainfallIntensity: value,
                    }))
                  }
                  min={50}
                  max={200}
                  unit=" mm/hr"
                />
                <RiskParameter
                  label="Soil Saturation"
                  value={parameters.soilSaturation}
                  onChange={([value]) =>
                    setParameters((prev) => ({
                      ...prev,
                      soilSaturation: value,
                    }))
                  }
                  min={0.1}
                  max={1}
                  step={0.1}
                />
                <RiskParameter
                  label="Drainage Capacity"
                  value={parameters.drainageCapacity}
                  onChange={([value]) =>
                    setParameters((prev) => ({
                      ...prev,
                      drainageCapacity: value,
                    }))
                  }
                  min={0.5}
                  max={2}
                  step={0.1}
                />
                <RiskParameter
                  label="Urbanization Level"
                  value={parameters.urbanizationLevel}
                  onChange={([value]) =>
                    setParameters((prev) => ({
                      ...prev,
                      urbanizationLevel: value,
                    }))
                  }
                  min={0.1}
                  max={1}
                  step={0.1}
                />
                <RiskParameter
                  label="Vegetation Cover"
                  value={parameters.vegetationCover}
                  onChange={([value]) =>
                    setParameters((prev) => ({
                      ...prev,
                      vegetationCover: value,
                    }))
                  }
                  min={0.1}
                  max={1}
                  step={0.1}
                />
                <Button
                  className="w-full bg-cyan-400 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white transition-colors px-8 py-4 mt-8"
                  onClick={handleCalculate}
                >
                  Calculate Risk
                </Button>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-lg dark:bg-[#0f1117]/80 rounded-xl p-8 shadow-lg space-y-6 border border-white/20 dark:border-white/10 transition-all duration-500">
                <div className="h-40 rounded-lg overflow-hidden mb-6">
                  <div className="w-full h-full bg-mountain-pattern bg-cover bg-center transform hover:scale-110 transition-transform duration-500"></div>
                </div>
                <RiskScore score={calculateRiskScore()} />
              </div>

              <div className="bg-white/80 backdrop-blur-lg dark:bg-[#0f1117]/80 rounded-xl p-8 shadow-lg space-y-6 border border-white/20 dark:border-white/10 transition-all duration-500">
                <div className="h-40 rounded-lg overflow-hidden mb-6">
                  <div className="w-full h-full bg-river-pattern bg-cover bg-center transform hover:scale-110 transition-transform duration-500"></div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary-dark dark:text-cyan-400">
                    Risk Factors Analysis
                  </h3>
                  <ul className="space-y-3 text-sm dark:text-gray-300/90">
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                      <span>High rainfall intensity increases flood risk significantly</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                      <span>Soil saturation affects water absorption capacity</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                      <span>Good drainage systems help mitigate flood risks</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                      <span>Urban areas are more susceptible to flooding</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                      <span>Vegetation cover helps reduce flood risk</span>
                    </li>
                  </ul>
                </div>
              </div>
              <WeatherWidget />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
