
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HouseholdSectionProps {
  numAdults: number;
  setNumAdults: (value: number) => void;
  numChildren: number;
  setNumChildren: (value: number) => void;
  numElderly: number;
  setNumElderly: (value: number) => void;
}

export const HouseholdSection = ({
  numAdults,
  setNumAdults,
  numChildren,
  setNumChildren,
  numElderly,
  setNumElderly
}: HouseholdSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">People in Household</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Number of Adults (18-60 years)</Label>
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setNumAdults(Math.max(0, numAdults - 1))}
            >
              -
            </Button>
            <Input
              type="number"
              value={numAdults}
              onChange={(e) => setNumAdults(parseInt(e.target.value) || 0)}
              className="w-20 text-center"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => setNumAdults(numAdults + 1)}
            >
              +
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Number of Children (under 18)</Label>
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setNumChildren(Math.max(0, numChildren - 1))}
            >
              -
            </Button>
            <Input
              type="number"
              value={numChildren}
              onChange={(e) => setNumChildren(parseInt(e.target.value) || 0)}
              className="w-20 text-center"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => setNumChildren(numChildren + 1)}
            >
              +
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Number of Elderly (60+ years)</Label>
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setNumElderly(Math.max(0, numElderly - 1))}
            >
              -
            </Button>
            <Input
              type="number"
              value={numElderly}
              onChange={(e) => setNumElderly(parseInt(e.target.value) || 0)}
              className="w-20 text-center"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => setNumElderly(numElderly + 1)}
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
