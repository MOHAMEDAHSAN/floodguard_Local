
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

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
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value.toString());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    const numValue = parseFloat(newValue);
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      onChange([numValue]);
    }
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    const numValue = parseFloat(inputValue);
    if (isNaN(numValue) || numValue < min || numValue > max) {
      setInputValue(value.toString());
    }
  };

  return (
    <div className="space-y-4 px-6">
      <div className="flex justify-between items-center">
        <label className="text-base font-medium text-primary-dark dark:text-gray-300/90">
          {label}
        </label>
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className="w-24 text-right"
              step={step}
              min={min}
              max={max}
            />
            <span className="text-base dark:text-gray-400/80">{unit}</span>
          </div>
        ) : (
          <span
            className="text-base dark:text-gray-400/80 bg-primary-light/30 dark:bg-[#0f1117]/80 px-3 py-1.5 rounded-md cursor-pointer hover:bg-primary-light/40 dark:hover:bg-[#0f1117]/90 transition-colors"
            onClick={() => setIsEditing(true)}
          >
            {value}
            {unit}
          </span>
        )}
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
