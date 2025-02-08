import { useState } from "react";
import { RiskParameter } from "@/components/RiskParameter";
import { RiskScore } from "@/components/RiskScore";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import RetroHeader from "@/components/RetroHeader";
import { WeatherWidget } from "@/components/WeatherWidget";
import { VantaBackground } from "@/components/VantaBackground";

const Index = () => {
  const { toast } = useToast();
  const [predictedOutput, setPredictedOutput] = useState<string>("Water Level Rise predicted output will be displayed over here!");
  const [parameters, setParameters] = useState({
    daily_rainfall: 0,
    daily_water_release: 0.1560,
    lagged_level_3: -0.2491,
    lagged_level_5: -0.2535,
    lagged_level_7: -0.2503,
    urbanization_score: 1.0000,
    total_rainfall: 500.6121,
    drainage_quality: 1.0000,
    population_density: 1000.0000
  });

  const calculateRiskScore = (): number => {
    const normalizedRainfall = parameters.daily_rainfall / 77.6127;
    const normalizedWaterRelease = (parameters.daily_water_release - 0.1560) / (21.3906 - 0.1560);
    const normalizedLaggedLevel3 = (parameters.lagged_level_3 + 0.2491) / (1.9594 + 0.2491);
    const normalizedLaggedLevel5 = (parameters.lagged_level_5 + 0.2535) / (1.8858 + 0.2535);
    const normalizedLaggedLevel7 = (parameters.lagged_level_7 + 0.2503) / (1.8117 + 0.2503);
    const normalizedUrbanization = (parameters.urbanization_score - 1.0000) / (10.0000 - 1.0000);
    const normalizedTotalRainfall = (parameters.total_rainfall - 500.6121) / (1500.0000 - 500.6121);
    const normalizedDrainage = (parameters.drainage_quality - 1.0000) / (8.3496 - 1.0000);
    const normalizedPopulation = (parameters.population_density - 1000.0000) / (12000.0000 - 1000.0000);

    const weights = {
      rainfall: 0.2,
      waterRelease: 0.15,
      laggedLevel3: 0.15,
      laggedLevel5: 0.1,
      laggedLevel7: 0.1,
      urbanization: 0.1,
      totalRainfall: 0.1,
      drainage: 0.05,
      population: 0.05
    };

    const score = 
      (normalizedRainfall * weights.rainfall) +
      (normalizedWaterRelease * weights.waterRelease) +
      (normalizedLaggedLevel3 * weights.laggedLevel3) +
      (normalizedLaggedLevel5 * weights.laggedLevel5) +
      (normalizedLaggedLevel7 * weights.laggedLevel7) +
      (normalizedUrbanization * weights.urbanization) +
      (normalizedTotalRainfall * weights.totalRainfall) +
      (normalizedDrainage * weights.drainage) +
      (normalizedPopulation * weights.population);

    return Math.min(Math.max(score, 0), 1);
  };

  const handleCalculate = () => {
    const score = calculateRiskScore();
    setPredictedOutput(`The calculated water level rise risk is ${(score * 100).toFixed(1)}%`);
    toast({
      title: "Water Level Rise Assessment",
      description: `The calculated water level rise risk is ${(score * 100).toFixed(1)}%`,
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
                Advanced analytics and real-time assessment of water level rise based on
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
                Assessment Parameters
              </h2>
              <div className="space-y-6">
                <RiskParameter
                  label="Daily Rainfall (mm)"
                  value={parameters.daily_rainfall}
                  onChange={([value]) =>
                    setParameters((prev) => ({
                      ...prev,
                      daily_rainfall: value,
                    }))
                  }
                  min={0}
                  max={77.6127}
                  step={0.1}
                  unit=" mm"
                />
                <RiskParameter
                  label="Daily Water Release (m³/s)"
                  value={parameters.daily_water_release}
                  onChange={([value]) =>
                    setParameters((prev) => ({
                      ...prev,
                      daily_water_release: value,
                    }))
                  }
                  min={0.1560}
                  max={21.3906}
                  step={0.1}
                  unit=" m³/s"
                />
                <RiskParameter
                  label="3-Day Lagged Water Level (m)"
                  value={parameters.lagged_level_3}
                  onChange={([value]) =>
                    setParameters((prev) => ({
                      ...prev,
                      lagged_level_3: value,
                    }))
                  }
                  min={-0.2491}
                  max={1.9594}
                  step={0.1}
                  unit=" m"
                />
                <RiskParameter
                  label="5-Day Lagged Water Level (m)"
                  value={parameters.lagged_level_5}
                  onChange={([value]) =>
                    setParameters((prev) => ({
                      ...prev,
                      lagged_level_5: value,
                    }))
                  }
                  min={-0.2535}
                  max={1.8858}
                  step={0.1}
                  unit=" m"
                />
                <RiskParameter
                  label="7-Day Lagged Water Level (m)"
                  value={parameters.lagged_level_7}
                  onChange={([value]) =>
                    setParameters((prev) => ({
                      ...prev,
                      lagged_level_7: value,
                    }))
                  }
                  min={-0.2503}
                  max={1.8117}
                  step={0.1}
                  unit=" m"
                />
                <RiskParameter
                  label="Urbanization Score"
                  value={parameters.urbanization_score}
                  onChange={([value]) =>
                    setParameters((prev) => ({
                      ...prev,
                      urbanization_score: value,
                    }))
                  }
                  min={1.0000}
                  max={10.0000}
                  step={0.1}
                />
                <RiskParameter
                  label="Total Rainfall (mm)"
                  value={parameters.total_rainfall}
                  onChange={([value]) =>
                    setParameters((prev) => ({
                      ...prev,
                      total_rainfall: value,
                    }))
                  }
                  min={500.6121}
                  max={1500.0000}
                  step={0.1}
                  unit=" mm"
                />
                <RiskParameter
                  label="Drainage Quality"
                  value={parameters.drainage_quality}
                  onChange={([value]) =>
                    setParameters((prev) => ({
                      ...prev,
                      drainage_quality: value,
                    }))
                  }
                  min={1.0000}
                  max={8.3496}
                  step={0.1}
                />
                <RiskParameter
                  label="Population Density (people/km²)"
                  value={parameters.population_density}
                  onChange={([value]) =>
                    setParameters((prev) => ({
                      ...prev,
                      population_density: value,
                    }))
                  }
                  min={1000.0000}
                  max={12000.0000}
                  step={100}
                  unit=" p/km²"
                />
                <Button
                  className="w-full bg-cyan-400 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white transition-colors px-8 py-4 mt-8"
                  onClick={handleCalculate}
                >
                  Calculate Water Level Rise
                </Button>
                <div className="mt-4 p-4 bg-white/50 dark:bg-[#1A1F2C]/50 rounded-lg text-center text-lg font-medium text-primary-dark dark:text-cyan-400">
                  {predictedOutput}
                </div>
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
