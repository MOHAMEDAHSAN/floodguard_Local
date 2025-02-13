
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface LocationSectionProps {
  region: string;
  setRegion: (value: string) => void;
  area: string;
  setArea: (value: string) => void;
}

export const LocationSection = ({
  region,
  setRegion,
  area,
  setArea
}: LocationSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Location Information</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="region">Region</Label>
          <Input
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="Enter your region"
          />
        </div>

        <div>
          <Label htmlFor="area">Area</Label>
          <Input
            id="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Enter your area"
          />
        </div>
      </div>
    </div>
  );
};
