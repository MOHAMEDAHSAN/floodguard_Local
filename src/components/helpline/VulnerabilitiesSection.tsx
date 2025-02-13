
import { Checkbox } from "@/components/ui/checkbox";

interface VulnerabilitiesSectionProps {
  wheelchairUser: boolean;
  setWheelchairUser: (checked: boolean) => void;
  blindness: boolean;
  setBlindness: (checked: boolean) => void;
  otherDisabilities: boolean;
  setOtherDisabilities: (checked: boolean) => void;
}

export const VulnerabilitiesSection = ({
  wheelchairUser,
  setWheelchairUser,
  blindness,
  setBlindness,
  otherDisabilities,
  setOtherDisabilities
}: VulnerabilitiesSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Vulnerabilities</h2>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="wheelchair"
            checked={wheelchairUser}
            onCheckedChange={(checked) => setWheelchairUser(checked as boolean)}
          />
          <label
            htmlFor="wheelchair"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Wheelchair User
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="blindness"
            checked={blindness}
            onCheckedChange={(checked) => setBlindness(checked as boolean)}
          />
          <label
            htmlFor="blindness"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Blindness
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="otherDisabilities"
            checked={otherDisabilities}
            onCheckedChange={(checked) => setOtherDisabilities(checked as boolean)}
          />
          <label
            htmlFor="otherDisabilities"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Other Disabilities
          </label>
        </div>
      </div>
    </div>
  );
};
