import React from "react";
import { RiskParameter } from "@/components/RiskParameter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TemporalValues {
  rainfall: number[];
  temperature: number[];
  antecedent_precipitation: number[];
  river_level: number[];
  groundwater_depth: number[];
}

interface TemporalParametersProps {
  temporalParameters: TemporalValues;
  temporalIndex: number;
  updateTemporalValue: (key: keyof TemporalValues, value: number) => void;
  handlePrevious: () => void;
  handleNext: () => void;
}

export const TemporalParameters = ({
  temporalParameters,
  temporalIndex,
  updateTemporalValue,
  handlePrevious,
  handleNext,
}: TemporalParametersProps) => {
  return (
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
    </div>
  );
};
