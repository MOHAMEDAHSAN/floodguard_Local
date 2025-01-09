import { useState } from "react";
import { RiskParameter } from "@/components/RiskParameter";
import { RiskScore } from "@/components/RiskScore";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

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

    const normalizedRainfall = parameters.rainfallIntensity / 200; // Normalize to 0-1 range

    const score =
      alpha * normalizedRainfall +
      beta * parameters.soilSaturation +
      gamma * parameters.drainageCapacity +
      delta * parameters.urbanizationLevel -
      epsilon * parameters.vegetationCover;

    return Math.max(0, Math.min(1, score)); // Clamp between 0 and 1
  };

  const handleCalculate = () => {
    const score = calculateRiskScore();
    toast({
      title: "Risk Assessment Complete",
      description: `The calculated flood risk score is ${(score * 100).toFixed(
        1
      )}%`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-8 animate-slideIn">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">
            Flood Risk Assessment System
          </h1>
          <p className="text-muted-foreground">
            Advanced analytics and real-time assessment of flood risks based on
            environmental parameters
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-white/50 backdrop-blur-lg rounded-xl p-6 shadow-lg space-y-6">
            <h2 className="text-xl font-semibold">Flood Risk Parameters</h2>
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
                className="w-full bg-primary hover:bg-primary/90"
                onClick={handleCalculate}
              >
                Calculate Risk
              </Button>
            </div>
          </div>

          <div className="bg-white/50 backdrop-blur-lg rounded-xl p-6 shadow-lg space-y-6">
            <RiskScore score={calculateRiskScore()} />
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Risk Factors Analysis</h3>
              <ul className="space-y-2 text-sm">
                <li>• High rainfall intensity increases flood risk significantly</li>
                <li>• Soil saturation affects water absorption capacity</li>
                <li>• Good drainage systems help mitigate flood risks</li>
                <li>• Urban areas are more susceptible to flooding</li>
                <li>• Vegetation cover helps reduce flood risk</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;