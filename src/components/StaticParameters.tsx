
import React from "react";
import { RiskParameter } from "@/components/RiskParameter";

interface StaticParametersProps {
  staticParameters: {
    elevation: number;
    impervious_pct: number;
    drainage_capacity: number;
    avg_slope: number;
  };
  setStaticParameters: React.Dispatch<React.SetStateAction<{
    elevation: number;
    impervious_pct: number;
    drainage_capacity: number;
    avg_slope: number;
  }>>;
}

export const StaticParameters = ({
  staticParameters,
  setStaticParameters,
}: StaticParametersProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-primary-dark dark:text-cyan-400">
        Static Parameters
      </h2>
      <div className="space-y-6">
        <RiskParameter
          label="Elevation (cm)"
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
          unit=" cm"
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
    </div>
  );
};
