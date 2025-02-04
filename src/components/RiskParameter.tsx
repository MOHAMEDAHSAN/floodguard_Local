
import { Slider } from "@/components/ui/slider";

interface RiskParameterProps {
  label: string;
  value: number;
  onChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export const RiskParameter = ({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = "",
}: RiskParameterProps) => {
  return (
    <div className="space-y-4 px-6">
      <div className="flex justify-between items-center">
        <label className="text-base font-medium text-primary-dark dark:text-gray-300/90">{label}</label>
        <span className="text-base dark:text-gray-400/80 bg-primary-light/30 dark:bg-[#0f1117]/80 px-3 py-1.5 rounded-md">
          {value}
          {unit}
        </span>
      </div>
      <Slider
        value={[value]}
        onValueChange={onChange}
        max={max}
        min={min}
        step={step}
        className="[&_[role=slider]]:bg-cyan-400 [&_[role=slider]]:border-cyan-400 [&_[role=slider]]:shadow-md dark:[&_[role=slider]]:bg-cyan-500 dark:[&_[role=slider]]:border-cyan-500"
      />
    </div>
  );
};
