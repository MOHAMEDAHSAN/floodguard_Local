import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import RetroHeader from "@/components/RetroHeader";
import { WeatherWidget } from "@/components/WeatherWidget";
import { VantaBackground } from "@/components/VantaBackground";
import { HeroSection } from "@/components/HeroSection";
import { StaticParameters } from "@/components/StaticParameters";
import { TemporalParameters } from "@/components/TemporalParameters";
import { RiskAnalysis } from "@/components/RiskAnalysis";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

interface TemporalValues {
  rainfall: number[];
  temperature: number[];
  antecedent_precipitation: number[];
  river_level: number[];
  groundwater_depth: number[];
}

interface AggregatedData {
  area: string;
  total_priority: number;
  request_count: number;
  total_adults: number;
  total_children: number;
  total_elderly: number;
  total_vehicles: number;
  avg_days_without_supplies: number;
}

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [predictions, setPredictions] = useState<number[]>([]);
  const [temporalIndex, setTemporalIndex] = useState(0);
  
  const [staticParameters, setStaticParameters] = useState({
    elevation: 1.98,
    impervious_pct: 10.10,
    drainage_capacity: 107.46,
    avg_slope: 0.0046
  });

  const [temporalParameters, setTemporalParameters] = useState<TemporalValues>({
    rainfall: Array(5).fill(0.08),
    temperature: Array(5).fill(20.00),
    antecedent_precipitation: Array(5).fill(0.08),
    river_level: Array(5).fill(0.00),
    groundwater_depth: Array(5).fill(2.00)
  });

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (profileError) throw profileError;

      if (profile.role !== 'admin') {
        toast({
          title: "Access Denied",
          description: "This page is only accessible to government officials.",
          variant: "destructive",
        });
        navigate('/auth');
      }
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      navigate('/auth');
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    setTemporalIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setTemporalIndex((prev) => (prev < 4 ? prev + 1 : prev));
  };

  const updateTemporalValue = (key: keyof TemporalValues, value: number) => {
    setTemporalParameters((prev) => {
      const newValues = { ...prev };
      newValues[key][temporalIndex] = value;
      return newValues;
    });
  };

  const useSampleInput = () => {
    setStaticParameters({
      elevation: 1053,
      impervious_pct: 22,
      drainage_capacity: 2541,
      avg_slope: 0.88
    });

    const sampleTemporalData = [
      [271, 36, 271, 6, 0],
      [50, 28, 253, 6, 0.3],
      [189, 21, 379, 4, 1.8],
      [230, 40, 514, 4, 3.1],
      [67, 38, 453, 4, 2.4]
    ];

    setTemporalParameters({
      rainfall: sampleTemporalData.map(day => day[0]),
      temperature: sampleTemporalData.map(day => day[1]),
      antecedent_precipitation: sampleTemporalData.map(day => day[2]),
      river_level: sampleTemporalData.map(day => day[3]),
      groundwater_depth: sampleTemporalData.map(day => day[4])
    });

    toast({
      title: "Sample Input Loaded",
      description: "Sample values have been loaded into all parameters.",
    });
  };

  const handleCalculate = async () => {
    try {
      const inputData = {
        ...staticParameters,
        ...temporalParameters
      };
      console.log("Sending input data:", inputData);

      // Updated API endpoint to Render URL
      const response = await fetch('https://flood-20.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      });

      const data = await response.json();
      console.log("Received prediction data:", data);

      if (data.error) {
        throw new Error(data.error);
      }

      const prediction = data.prediction[0];
      setPredictions(prediction);

      const avgPrediction = prediction.reduce((a: number, b: number) => a + b, 0) / prediction.length;
      
      toast({
        title: "Water Level Rise Assessment",
        description: `Average water level rise: ${avgPrediction.toFixed(2)} meters`,
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to calculate water level rise.",
      });
    }
  };

  const { data: aggregatedData, isLoading: isLoadingHelpline } = useQuery({
    queryKey: ['priority-data'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('helpline_responses')
        .select('*')
        .not('area', 'is', null);

      if (error) throw error;

      const aggregated = data.reduce((acc: { [key: string]: AggregatedData }, curr) => {
        const area = curr.area.trim();
        if (!acc[area]) {
          acc[area] = {
            area,
            total_priority: 0,
            request_count: 0,
            total_adults: 0,
            total_children: 0,
            total_elderly: 0,
            total_vehicles: 0,
            avg_days_without_supplies: 0,
          };
        }

        acc[area].total_priority += Number(curr.priority_score);
        acc[area].request_count += 1;
        acc[area].total_adults += curr.num_adults;
        acc[area].total_children += curr.num_children;
        acc[area].total_elderly += curr.num_elderly;
        acc[area].total_vehicles += curr.vehicles_submerged;
        acc[area].avg_days_without_supplies = 
          (acc[area].avg_days_without_supplies * (acc[area].request_count - 1) + curr.days_without_supplies) 
          / acc[area].request_count;

        return acc;
      }, {});

      return Object.values(aggregated).sort((a, b) => b.total_priority - a.total_priority);
    },
    refetchInterval: 5000
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

return (
  <div className="min-h-screen bg-gradient-to-b from-primary-light/50 to-secondary dark:from-black dark:to-[#1A1F2C] transition-colors duration-500">
    <VantaBackground />
    <RetroHeader />
    <HeroSection />
    <div className="container -mt-20 pb-20">
      <div className="max-w-4xl mx-auto space-y-8 animate-slideIn">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-white/80 backdrop-blur-lg dark:bg-[#0f1117]/80 rounded-xl p-8 shadow-lg space-y-6 border border-white/20 dark:border-white/10 transition-all duration-500">
              <StaticParameters
                staticParameters={staticParameters}
                setStaticParameters={setStaticParameters}
              />
              <TemporalParameters
                temporalParameters={temporalParameters}
                temporalIndex={temporalIndex}
                updateTemporalValue={updateTemporalValue}
                handlePrevious={handlePrevious}
                handleNext={handleNext}
              />
              <div className="flex gap-4 mt-8">
                <Button
                  className="w-full bg-[#33C3F0] hover:bg-[#33C3F0]/90 dark:bg-[#33C3F0] dark:hover:bg-[#33C3F0]/90 text-white transition-colors"
                  onClick={useSampleInput}
                >
                  Use Sample Input
                </Button>
                <Button
                  className="w-full bg-[#33C3F0] hover:bg-[#33C3F0]/90 dark:bg-[#33C3F0] dark:hover:bg-[#33C3F0]/90 text-white transition-colors"
                  onClick={handleCalculate}
                >
                  Calculate Water Level Rise
                </Button>
              </div>
              <div className="mt-4 p-4 bg-white/50 dark:bg-[#1A1F2C]/50 rounded-lg text-center space-y-4">
                <div className="space-y-2">
                  {predictions.length > 0 ? (
                    predictions.map((value, index) => (
                      <p 
                        key={index}
                        className="text-lg font-medium text-primary-dark dark:text-cyan-400"
                      >
                        Day {index + 1} water level rise: {value.toFixed(2)} meters
                      </p>
                    ))
                  ) : (
                    <p className="text-lg font-medium text-primary-dark dark:text-cyan-400">
                      The calculated water level rise is 0.0 meters
                    </p>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic border-t border-gray-200 dark:border-gray-700/50 pt-4">
                  Disclaimer: This product/website/app is specifically designed to satisfy and be used by officials (Government)
                  <br />
                  This product/website/app is specifically designed for FloodSimulation in Tamil Nadu, India
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <RiskAnalysis />
              <WeatherWidget />
            </div>
        </div>
      </div>
    </div>

    {/* Government Dashboard Section */}
    <div className="container py-12">
      <div className="bg-white/95 dark:bg-gray-900/95 rounded-xl p-8 shadow-lg">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#00BCD4] dark:text-[#00BCD4]">Government Dashboard</h1>
          <Button 
            variant="destructive"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate('/auth');
            }}
          >
            Logout
          </Button>
        </div>

        <Card className="bg-white dark:bg-gray-800">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Aggregated Area Statistics</h2>
            {isLoadingHelpline ? (
              <div className="text-center py-4">Loading helpline data...</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 dark:bg-gray-900">
                      <TableHead className="text-left font-medium text-[#00838F]">Area</TableHead>
                      <TableHead className="text-right font-medium text-[#00838F]">Total Priority</TableHead>
                      <TableHead className="text-right font-medium text-[#00838F]">Requests</TableHead>
                      <TableHead className="text-right font-medium text-[#00838F]">Total Adults</TableHead>
                      <TableHead className="text-right font-medium text-[#00838F]">Total Children</TableHead>
                      <TableHead className="text-right font-medium text-[#00838F]">Total Elderly</TableHead>
                      <TableHead className="text-right font-medium text-[#00838F]">Total Vehicles Submerged</TableHead>
                      <TableHead className="text-right font-medium text-[#00838F]">Avg Days Without Supplies</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {aggregatedData?.map((row) => (
                      <TableRow key={row.area} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <TableCell className="font-medium">{row.area}</TableCell>
                        <TableCell className="text-right">{row.total_priority.toFixed(2)}</TableCell>
                        <TableCell className="text-right">{row.request_count}</TableCell>
                        <TableCell className="text-right">{row.total_adults}</TableCell>
                        <TableCell className="text-right">{row.total_children}</TableCell>
                        <TableCell className="text-right">{row.total_elderly}</TableCell>
                        <TableCell className="text-right">{row.total_vehicles}</TableCell>
                        <TableCell className="text-right">{row.avg_days_without_supplies.toFixed(1)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  </div>
);
};

export default Index;
