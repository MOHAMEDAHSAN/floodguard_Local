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
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className="text-sm text-muted-foreground">
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
        className="[&_[role=slider]]:bg-primary"
      />
    </div>
  );
};