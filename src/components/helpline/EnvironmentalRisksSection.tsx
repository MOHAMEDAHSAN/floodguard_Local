
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface EnvironmentalRisksSectionProps {
  waterLevel: 'knee-high' | 'waist-high' | 'chest-high' | 'neck-high';
  setWaterLevel: (value: 'knee-high' | 'waist-high' | 'chest-high' | 'neck-high') => void;
  structuralDamage: 'none' | 'cracked-walls' | 'collapsed-structure';
  setStructuralDamage: (value: 'none' | 'cracked-walls' | 'collapsed-structure') => void;
  vehiclesSubmerged: number;
  setVehiclesSubmerged: (value: number) => void;
}

export const EnvironmentalRisksSection = ({
  waterLevel,
  setWaterLevel,
  structuralDamage,
  setStructuralDamage,
  vehiclesSubmerged,
  setVehiclesSubmerged
}: EnvironmentalRisksSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Environmental Risks</h2>
      
      <div className="space-y-4">
        <div>
          <Label>Water Level</Label>
          <Select value={waterLevel} onValueChange={(value: any) => setWaterLevel(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select water level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="knee-high">Knee High</SelectItem>
              <SelectItem value="waist-high">Waist High</SelectItem>
              <SelectItem value="chest-high">Chest High</SelectItem>
              <SelectItem value="neck-high">Neck High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Structural Damage</Label>
          <Select value={structuralDamage} onValueChange={(value: any) => setStructuralDamage(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select structural damage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="cracked-walls">Cracked Walls</SelectItem>
              <SelectItem value="collapsed-structure">Collapsed Structure</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Vehicles Submerged: {vehiclesSubmerged}</Label>
          <Slider
            value={[vehiclesSubmerged]}
            onValueChange={(value) => setVehiclesSubmerged(value[0])}
            min={0}
            max={3}
            step={1}
            className="mt-2"
          />
        </div>
      </div>
    </div>
  );
};
