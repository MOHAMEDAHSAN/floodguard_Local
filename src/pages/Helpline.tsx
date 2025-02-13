import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { HouseholdSection } from "@/components/helpline/HouseholdSection";
import { VulnerabilitiesSection } from "@/components/helpline/VulnerabilitiesSection";
import { MedicalEmergenciesSection } from "@/components/helpline/MedicalEmergenciesSection";
import { ImmediateNeedsSection } from "@/components/helpline/ImmediateNeedsSection";
import { EnvironmentalRisksSection } from "@/components/helpline/EnvironmentalRisksSection";
import { LocationSection } from "@/components/helpline/LocationSection";

const Helpline = () => {
  const { toast } = useToast();
  
  // Household
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [numElderly, setNumElderly] = useState(0);
  
  // Vulnerabilities
  const [wheelchairUser, setWheelchairUser] = useState(false);
  const [blindness, setBlindness] = useState(false);
  const [otherDisabilities, setOtherDisabilities] = useState(false);
  
  // Medical Emergencies
  const [injuryStatus, setInjuryStatus] = useState<'none' | 'fracture' | 'bleeding' | 'multiple-injuries'>('none');
  const [diabetes, setDiabetes] = useState(false);
  const [heartDisease, setHeartDisease] = useState(false);
  const [dialysisDependent, setDialysisDependent] = useState(false);
  const [isPregnant, setIsPregnant] = useState(false);
  const [pregnancyTrimester, setPregnancyTrimester] = useState<'none' | 'first' | 'second' | 'third'>('none');
  
  // Immediate Needs
  const [daysWithoutSupplies, setDaysWithoutSupplies] = useState(0);
  const [medicineNeeded, setMedicineNeeded] = useState(false);
  const [toiletAccess, setToiletAccess] = useState(false);
  
  // Environmental Risks
  const [waterLevel, setWaterLevel] = useState<'knee-high' | 'waist-high' | 'chest-high' | 'neck-high'>('knee-high');
  const [structuralDamage, setStructuralDamage] = useState<'none' | 'cracked-walls' | 'collapsed-structure'>('none');
  const [vehiclesSubmerged, setVehiclesSubmerged] = useState(0);
  
  // Location
  const [region, setRegion] = useState('');
  const [area, setArea] = useState('');
  
  // Additional Info
  const [additionalInfo, setAdditionalInfo] = useState('');

  const calculatePriorityScore = () => {
    const disabilityCount = Number(wheelchairUser) + Number(blindness) + Number(otherDisabilities);
    const chronicConditionsCount = Number(diabetes) + Number(heartDisease) + Number(dialysisDependent);
    
    const injurySeverityScore = {
      'none': 0,
      'fracture': 0.5,
      'bleeding': 0.7,
      'multiple-injuries': 1
    }[injuryStatus];

    const waterLevelScore = {
      'knee-high': 0.25,
      'waist-high': 0.5,
      'chest-high': 0.75,
      'neck-high': 1
    }[waterLevel];

    const structuralDamageScore = {
      'none': 0,
      'cracked-walls': 0.5,
      'collapsed-structure': 1
    }[structuralDamage];

    return (
      (numChildren * 0.25) +
      (numElderly * 0.30) +
      (disabilityCount * 0.40) +
      (injurySeverityScore * 0.35) +
      (chronicConditionsCount * 0.30) +
      (isPregnant ? 0.25 : 0) +
      ((3 - daysWithoutSupplies) * -0.15) +
      (medicineNeeded ? 0.20 : 0) +
      (!toiletAccess ? 0.15 : 0) +
      (waterLevelScore * 0.50) +
      (structuralDamageScore * 0.45) +
      (vehiclesSubmerged * 0.10)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const priorityScore = calculatePriorityScore();
      const disabilityCount = Number(wheelchairUser) + Number(blindness) + Number(otherDisabilities);
      const chronicConditionsCount = Number(diabetes) + Number(heartDisease) + Number(dialysisDependent);

      const { error } = await supabase
        .from('helpline_responses')
        .insert({
          num_adults: numAdults,
          num_children: numChildren,
          num_elderly: numElderly,
          wheelchair_user: wheelchairUser,
          blindness: blindness,
          other_disabilities: otherDisabilities,
          disability_count: disabilityCount,
          injury_status: injuryStatus,
          diabetes: diabetes,
          heart_disease: heartDisease,
          dialysis_dependent: dialysisDependent,
          chronic_conditions_count: chronicConditionsCount,
          is_pregnant: isPregnant,
          pregnancy_trimester: isPregnant ? pregnancyTrimester : 'none',
          days_without_supplies: daysWithoutSupplies,
          medicine_needed: medicineNeeded,
          toilet_access: toiletAccess,
          water_level: waterLevel,
          structural_damage: structuralDamage,
          vehicles_submerged: vehiclesSubmerged,
          region: region,
          area: area,
          additional_info: additionalInfo,
          priority_score: priorityScore
        });

      if (error) throw error;

      toast({
        title: "Help request submitted",
        description: "Your emergency help request has been recorded. Priority score: " + priorityScore.toFixed(2),
      });
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to submit help request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 dark:from-background dark:to-background pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Emergency Help Request Form</h1>
        </div>

        <Card className="p-8 space-y-8 bg-card/50 backdrop-blur-sm border border-border/50 shadow-lg">
          <p className="text-muted-foreground">Please provide accurate information to help us assess your situation.</p>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <HouseholdSection
              numAdults={numAdults}
              setNumAdults={setNumAdults}
              numChildren={numChildren}
              setNumChildren={setNumChildren}
              numElderly={numElderly}
              setNumElderly={setNumElderly}
            />

            <VulnerabilitiesSection
              wheelchairUser={wheelchairUser}
              setWheelchairUser={setWheelchairUser}
              blindness={blindness}
              setBlindness={setBlindness}
              otherDisabilities={otherDisabilities}
              setOtherDisabilities={setOtherDisabilities}
            />

            <MedicalEmergenciesSection
              injuryStatus={injuryStatus}
              setInjuryStatus={setInjuryStatus}
              diabetes={diabetes}
              setDiabetes={setDiabetes}
              heartDisease={heartDisease}
              setHeartDisease={setHeartDisease}
              dialysisDependent={dialysisDependent}
              setDialysisDependent={setDialysisDependent}
              isPregnant={isPregnant}
              setIsPregnant={setIsPregnant}
              pregnancyTrimester={pregnancyTrimester}
              setPregnancyTrimester={setPregnancyTrimester}
            />

            <ImmediateNeedsSection
              daysWithoutSupplies={daysWithoutSupplies}
              setDaysWithoutSupplies={setDaysWithoutSupplies}
              medicineNeeded={medicineNeeded}
              setMedicineNeeded={setMedicineNeeded}
              toiletAccess={toiletAccess}
              setToiletAccess={setToiletAccess}
            />

            <EnvironmentalRisksSection
              waterLevel={waterLevel}
              setWaterLevel={setWaterLevel}
              structuralDamage={structuralDamage}
              setStructuralDamage={setStructuralDamage}
              vehiclesSubmerged={vehiclesSubmerged}
              setVehiclesSubmerged={setVehiclesSubmerged}
            />

            <LocationSection
              region={region}
              setRegion={setRegion}
              area={area}
              setArea={setArea}
            />

            <div className="space-y-4">
              <Label htmlFor="additional-info">Additional Information</Label>
              <Textarea
                id="additional-info"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Please provide any additional information that might be important..."
                className="min-h-[100px]"
              />
            </div>

            <Button type="submit" className="w-full">
              Submit Help Request
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Helpline;
