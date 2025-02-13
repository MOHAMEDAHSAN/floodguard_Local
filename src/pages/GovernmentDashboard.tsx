
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";

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

const GovernmentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }
      
      // Fetch user role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role !== 'admin') {
        navigate('/');
        return;
      }

      setUser(user);
    };

    checkUser();
  }, [navigate]);

  const { data: aggregatedData, isLoading } = useQuery({
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

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Government Dashboard</h1>
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

        <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Aggregated Area Statistics</h2>
          {isLoading ? (
            <div className="text-center py-4">Loading data...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Area</TableHead>
                  <TableHead className="text-right">Total Priority</TableHead>
                  <TableHead className="text-right">Requests</TableHead>
                  <TableHead className="text-right">Total Adults</TableHead>
                  <TableHead className="text-right">Total Children</TableHead>
                  <TableHead className="text-right">Total Elderly</TableHead>
                  <TableHead className="text-right">Total Vehicles Submerged</TableHead>
                  <TableHead className="text-right">Avg Days Without Supplies</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {aggregatedData?.map((row) => (
                  <TableRow key={row.area}>
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
          )}
        </Card>
      </div>
    </div>
  );
};

export default GovernmentDashboard;
