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
        <label className="text-base font-medium text-primary dark:text-primary-light">{label}</label>
        <span className="text-base text-muted-foreground bg-primary-light/30 dark:bg-primary-dark/30 px-3 py-1.5 rounded-md">
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
        className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_[role=slider]]:shadow-md"
      />
    </div>
  );
};