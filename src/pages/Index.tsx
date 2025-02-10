
import { useState } from "react";
import { RiskParameter } from "@/components/RiskParameter";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import RetroHeader from "@/components/RetroHeader";
import { WeatherWidget } from "@/components/WeatherWidget";
import { VantaBackground } from "@/components/VantaBackground";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TemporalValues {
  rainfall: number[];
  temperature: number[];
  antecedent_precipitation: number[];
  river_level: number[];
  groundwater_depth: number[];
}

const Index = () => {
  const { toast } = useToast();
  const [predictedOutput, setPredictedOutput] = useState<string>("The calculated flood risk is 0.0%");
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
      elevation: 1053.31835145252,
      impervious_pct: 22.1853904552107,
      drainage_capacity: 2540.61324956426,
      avg_slope: 0.881852896963888
    });

    const sampleTemporalData = [
      [270.6704575, 35.58366715, 270.6704575, 5.6724632, 0],
      [49.9301307, 28.11305932, 252.9329738, 5.547334919, 0.322037617],
      [189.0992464, 21.27542749, 378.7989768, 4.452855787, 1.795922951],
      [230.2455971, 39.92379705, 514.3448297, 3.898579683, 3.108057646],
      [66.92101995, 37.98835514, 452.6796422, 4.083508789, 2.435415819]
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
    // Simplified risk calculation for demonstration
    const avgRainfall = temporalParameters.rainfall.reduce((a, b) => a + b, 0) / 5;
    const avgTemperature = temporalParameters.temperature.reduce((a, b) => a + b, 0) / 5;
    
    // Normalize and weight the parameters
    const normalizedValues = {
      elevation: (staticParameters.elevation - 1.98) / (1498.92 - 1.98),
      impervious: (staticParameters.impervious_pct - 10.10) / (79.94 - 10.10),
      drainage: (staticParameters.drainage_capacity - 107.46) / (4998.57 - 107.46),
      slope: (staticParameters.avg_slope - 0.0046) / (14.98 - 0.0046),
      rainfall: (avgRainfall - 0.08) / (299.84 - 0.08),
      temperature: (avgTemperature - 20.00) / (39.99 - 20.00)
    };

    // Simple weighted average
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
    setPredictedOutput(`The calculated flood risk is ${(score * 100).toFixed(1)}%`);
    toast({
      title: "Flood Risk Assessment",
      description: `The calculated flood risk is ${(score * 100).toFixed(1)}%`,
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
                Flood Simulation Model
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
              <h2 className="text-2xl font-semibold text-primary-dark dark:text-cyan-400">
                Static Parameters
              </h2>
              <div className="space-y-6">
                <RiskParameter
                  label="Elevation (m)"
                  value={staticParameters.elevation}
                  onChange={([value]) =>
                    setStaticParameters((prev) => ({
                      ...prev,
                      elevation: value,
                    }))
                  }
                  min={1.98}
                  max={1498.92}
                  step={0.01}
                  unit=" m"
                />
                <RiskParameter
                  label="Impervious Percentage (%)"
                  value={staticParameters.impervious_pct}
                  onChange={([value]) =>
                    setStaticParameters((prev) => ({
                      ...prev,
                      impervious_pct: value,
                    }))
                  }
                  min={10.10}
                  max={79.94}
                  step={0.01}
                  unit="%"
                />
                <RiskParameter
                  label="Drainage Capacity (m³/h)"
                  value={staticParameters.drainage_capacity}
                  onChange={([value]) =>
                    setStaticParameters((prev) => ({
                      ...prev,
                      drainage_capacity: value,
                    }))
                  }
                  min={107.46}
                  max={4998.57}
                  step={0.01}
                  unit=" m³/h"
                />
                <RiskParameter
                  label="Average Slope"
                  value={staticParameters.avg_slope}
                  onChange={([value]) =>
                    setStaticParameters((prev) => ({
                      ...prev,
                      avg_slope: value,
                    }))
                  }
                  min={0.0046}
                  max={14.98}
                  step={0.0001}
                />
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold text-primary-dark dark:text-cyan-400 mb-4">
                  Temporal Parameters
                </h2>
                <div className="flex items-center justify-between mb-4">
                  <Button
                    onClick={handlePrevious}
                    disabled={temporalIndex === 0}
                    variant="outline"
                    size="icon"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">
                    Time Point {temporalIndex + 1} of 5
                  </span>
                  <Button
                    onClick={handleNext}
                    disabled={temporalIndex === 4}
                    variant="outline"
                    size="icon"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-6">
                  <RiskParameter
                    label="Rainfall (mm)"
                    value={temporalParameters.rainfall[temporalIndex]}
                    onChange={([value]) => updateTemporalValue("rainfall", value)}
                    min={0.08}
                    max={299.84}
                    step={0.01}
                    unit=" mm"
                  />
                  <RiskParameter
                    label="Temperature (°C)"
                    value={temporalParameters.temperature[temporalIndex]}
                    onChange={([value]) => updateTemporalValue("temperature", value)}
                    min={20.00}
                    max={39.99}
                    step={0.01}
                    unit=" °C"
                  />
                  <RiskParameter
                    label="Antecedent Precipitation (mm)"
                    value={temporalParameters.antecedent_precipitation[temporalIndex]}
                    onChange={([value]) => updateTemporalValue("antecedent_precipitation", value)}
                    min={0.08}
                    max={819.95}
                    step={0.01}
                    unit=" mm"
                  />
                  <RiskParameter
                    label="River Level (m)"
                    value={temporalParameters.river_level[temporalIndex]}
                    onChange={([value]) => updateTemporalValue("river_level", value)}
                    min={0.00}
                    max={5.61}
                    step={0.01}
                    unit=" m"
                  />
                  <RiskParameter
                    label="Groundwater Depth (m)"
                    value={temporalParameters.groundwater_depth[temporalIndex]}
                    onChange={([value]) => updateTemporalValue("groundwater_depth", value)}
                    min={2.00}
                    max={15.87}
                    step={0.01}
                    unit=" m"
                  />
                </div>
                <div className="flex gap-4">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 dark:bg-primary/90 dark:hover:bg-primary text-white transition-colors px-8 py-4 mt-8"
                    onClick={useSampleInput}
                  >
                    Use Sample Input
                  </Button>
                  <Button
                    className="w-full bg-cyan-400 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white transition-colors px-8 py-4 mt-8"
                    onClick={handleCalculate}
                  >
                    Calculate water level rise
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
            </div>
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-lg dark:bg-[#0f1117]/80 rounded-xl p-8 shadow-lg space-y-6 border border-white/20 dark:border-white/10 transition-all duration-500">
                <img 
                  src="/lovable-uploads/0141ae5a-405b-4713-8719-8dfe5294503c.png" 
                  alt="Flood Simulation Formula"
                  className="w-full h-auto rounded-lg"
                />
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
