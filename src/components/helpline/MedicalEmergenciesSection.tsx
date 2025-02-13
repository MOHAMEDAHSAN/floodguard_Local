
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface MedicalEmergenciesSectionProps {
  injuryStatus: 'none' | 'fracture' | 'bleeding' | 'multiple-injuries';
  setInjuryStatus: (value: 'none' | 'fracture' | 'bleeding' | 'multiple-injuries') => void;
  diabetes: boolean;
  setDiabetes: (checked: boolean) => void;
  heartDisease: boolean;
  setHeartDisease: (checked: boolean) => void;
  dialysisDependent: boolean;
  setDialysisDependent: (checked: boolean) => void;
  isPregnant: boolean;
  setIsPregnant: (value: boolean) => void;
  pregnancyTrimester: 'none' | 'first' | 'second' | 'third';
  setPregnancyTrimester: (value: 'none' | 'first' | 'second' | 'third') => void;
}

export const MedicalEmergenciesSection = ({
  injuryStatus,
  setInjuryStatus,
  diabetes,
  setDiabetes,
  heartDisease,
  setHeartDisease,
  dialysisDependent,
  setDialysisDependent,
  isPregnant,
  setIsPregnant,
  pregnancyTrimester,
  setPregnancyTrimester
}: MedicalEmergenciesSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Medical Emergencies</h2>
      
      <div className="space-y-4">
        <div>
          <Label>Injuries</Label>
          <Select value={injuryStatus} onValueChange={(value: any) => setInjuryStatus(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select injury status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="fracture">Fracture</SelectItem>
              <SelectItem value="bleeding">Bleeding</SelectItem>
              <SelectItem value="multiple-injuries">Multiple Injuries</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Chronic Conditions</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="diabetes"
                checked={diabetes}
                onCheckedChange={(checked) => setDiabetes(checked as boolean)}
              />
              <label htmlFor="diabetes">Diabetes</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="heartDisease"
                checked={heartDisease}
                onCheckedChange={(checked) => setHeartDisease(checked as boolean)}
              />
              <label htmlFor="heartDisease">Heart Disease</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="dialysis"
                checked={dialysisDependent}
                onCheckedChange={(checked) => setDialysisDependent(checked as boolean)}
              />
              <label htmlFor="dialysis">Dialysis Dependent</label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Pregnancy Status</Label>
            <RadioGroup value={isPregnant ? "yes" : "no"} onValueChange={(value) => {
              setIsPregnant(value === "yes");
              if (value === "no") setPregnancyTrimester('none');
            }}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="pregnant-yes" />
                <Label htmlFor="pregnant-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="pregnant-no" />
                <Label htmlFor="pregnant-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {isPregnant && (
            <div>
              <Label>Trimester</Label>
              <Select value={pregnancyTrimester} onValueChange={(value: any) => setPregnancyTrimester(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select trimester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first">First Trimester</SelectItem>
                  <SelectItem value="second">Second Trimester</SelectItem>
                  <SelectItem value="third">Third Trimester</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
