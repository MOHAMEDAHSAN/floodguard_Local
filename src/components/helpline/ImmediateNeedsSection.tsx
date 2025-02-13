
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ImmediateNeedsSectionProps {
  daysWithoutSupplies: number;
  setDaysWithoutSupplies: (value: number) => void;
  medicineNeeded: boolean;
  setMedicineNeeded: (value: boolean) => void;
  toiletAccess: boolean;
  setToiletAccess: (value: boolean) => void;
}

export const ImmediateNeedsSection = ({
  daysWithoutSupplies,
  setDaysWithoutSupplies,
  medicineNeeded,
  setMedicineNeeded,
  toiletAccess,
  setToiletAccess
}: ImmediateNeedsSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Immediate Needs</h2>
      
      <div className="space-y-4">
        <div>
          <Label>Days Without Food/Water: {daysWithoutSupplies}</Label>
          <Slider
            value={[daysWithoutSupplies]}
            onValueChange={(value) => setDaysWithoutSupplies(value[0])}
            min={0}
            max={3}
            step={1}
            className="mt-2"
          />
        </div>

        <div>
          <Label>Medicine Needed</Label>
          <RadioGroup value={medicineNeeded ? "yes" : "no"} onValueChange={(value) => setMedicineNeeded(value === "yes")}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="medicine-yes" />
              <Label htmlFor="medicine-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="medicine-no" />
              <Label htmlFor="medicine-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Toilet Access</Label>
          <RadioGroup value={toiletAccess ? "yes" : "no"} onValueChange={(value) => setToiletAccess(value === "yes")}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="toilet-yes" />
              <Label htmlFor="toilet-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="toilet-no" />
              <Label htmlFor="toilet-no">No</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};
