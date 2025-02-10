
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import RetroHeader from "@/components/RetroHeader";
import { WeatherWidget } from "@/components/WeatherWidget";
import { VantaBackground } from "@/components/VantaBackground";
import { HeroSection } from "@/components/HeroSection";
import { StaticParameters } from "@/components/StaticParameters";
import { TemporalParameters } from "@/components/TemporalParameters";
import { RiskAnalysis } from "@/components/RiskAnalysis";

interface TemporalValues {
  rainfall: number[];
  temperature: number[];
  antecedent_precipitation: number[];
  river_level: number[];
  groundwater_depth: number[];
}

const Index = () => {
  const { toast } = useToast();
  const [predictedOutput, setPredictedOutput] = useState<string>("The calculated water level rise is 0.0%");
  const [temporalIndex, setTemporalIndex] = useState(0);
  
  const [staticParameters, setStaticParameters] = useState({
    elevation: 1.98,
    impervious_pct: 10.10,
    drainage_capacity: 107.46,
    avg_slope: 0.0046
  });

  const [temporalParameters, setTemporalParameters] = useState<TemporalValues>({
    rainfall: Array(5).fill(0.08),
    temperature: Array(5).fill(20.00),
    antecedent_precipitation: Array(5).fill(0.08),
    river_level: Array(5).fill(0.00),
    groundwater_depth: Array(5).fill(2.00)
  });

  const handlePrevious = () => {
    setTemporalIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setTemporalIndex((prev) => (prev < 4 ? prev + 1 : prev));
  };

  const updateTemporalValue = (key: keyof TemporalValues, value: number) => {
    setTemporalParameters((prev) => {
      const newValues = { ...prev };
      newValues[key][temporalIndex] = value;
      return newValues;
    });
  };

  const useSampleInput = () => {
    setStaticParameters({
      elevation: 1053,
      impervious_pct: 22,
      drainage_capacity: 2541,
      avg_slope: 0.88
    });

    const sampleTemporalData = [
      [271, 36, 271, 6, 0],
      [50, 28, 253, 6, 0.3],
      [189, 21, 379, 4, 1.8],
      [230, 40, 514, 4, 3.1],
      [67, 38, 453, 4, 2.4]
    ];

    setTemporalParameters({
      rainfall: sampleTemporalData.map(day => day[0]),
      temperature: sampleTemporalData.map(day => day[1]),
      antecedent_precipitation: sampleTemporalData.map(day => day[2]),
      river_level: sampleTemporalData.map(day => day[3]),
      groundwater_depth: sampleTemporalData.map(day => day[4])
    });

    toast({
      title: "Sample Input Loaded",
      description: "Sample values have been loaded into all parameters.",
    });
  };

  const calculateRiskScore = (): number => {
    const avgRainfall = temporalParameters.rainfall.reduce((a, b) => a + b, 0) / 5;
    const avgTemperature = temporalParameters.temperature.reduce((a, b) => a + b, 0) / 5;
    
    const normalizedValues = {
      elevation: (staticParameters.elevation - 1.98) / (1498.92 - 1.98),
      impervious: (staticParameters.impervious_pct - 10.10) / (79.94 - 10.10),
      drainage: (staticParameters.drainage_capacity - 107.46) / (4998.57 - 107.46),
      slope: (staticParameters.avg_slope - 0.0046) / (14.98 - 0.0046),
      rainfall: (avgRainfall - 0.08) / (299.84 - 0.08),
      temperature: (avgTemperature - 20.00) / (39.99 - 20.00)
    };

    const weights = {
      elevation: 0.2,
      impervious: 0.15,
      drainage: 0.15,
      slope: 0.1,
      rainfall: 0.25,
      temperature: 0.15
    };

    const score = Object.entries(normalizedValues).reduce(
      (acc, [key, value]) => acc + value * weights[key as keyof typeof weights],
      0
    );

    return Math.min(Math.max(score, 0), 1);
  };

  const handleCalculate = () => {
    const score = calculateRiskScore();
    setPredictedOutput(`The calculated water level rise is ${(score * 100).toFixed(1)}%`);
    toast({
      title: "Water Level Rise Assessment",
      description: `The calculated water level rise is ${(score * 100).toFixed(1)}%`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/50 to-secondary dark:from-black dark:to-[#1A1F2C] transition-colors duration-500">
      <VantaBackground />
      <RetroHeader />
      <HeroSection />
      <div className="container -mt-20 pb-20">
        <div className="max-w-4xl mx-auto space-y-8 animate-slideIn">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white/80 backdrop-blur-lg dark:bg-[#0f1117]/80 rounded-xl p-8 shadow-lg space-y-6 border border-white/20 dark:border-white/10 transition-all duration-500">
              <StaticParameters
                staticParameters={staticParameters}
                setStaticParameters={setStaticParameters}
              />
              <TemporalParameters
                temporalParameters={temporalParameters}
                temporalIndex={temporalIndex}
                updateTemporalValue={updateTemporalValue}
                handlePrevious={handlePrevious}
                handleNext={handleNext}
              />
              <div className="flex gap-4 mt-8">
                <Button
                  className="w-full bg-[#33C3F0] hover:bg-[#33C3F0]/90 dark:bg-[#33C3F0] dark:hover:bg-[#33C3F0]/90 text-white transition-colors"
                  onClick={useSampleInput}
                >
                  Use Sample Input
                </Button>
                <Button
                  className="w-full bg-[#33C3F0] hover:bg-[#33C3F0]/90 dark:bg-[#33C3F0] dark:hover:bg-[#33C3F0]/90 text-white transition-colors"
                  onClick={handleCalculate}
                >
                  Calculate Water Level Rise
                </Button>
              </div>
              <div className="mt-4 p-4 bg-white/50 dark:bg-[#1A1F2C]/50 rounded-lg text-center space-y-4">
                <p className="text-lg font-medium text-primary-dark dark:text-cyan-400">
                  {predictedOutput}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic border-t border-gray-200 dark:border-gray-700/50 pt-4">
                  Disclaimer: This product/website/app is specifically designed to satisfy and be used by officials (Government)
                  <br />
                  This product/website/app is specifically designed for FloodSimulation in Tamil Nadu, India
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <RiskAnalysis />
              <WeatherWidget />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
