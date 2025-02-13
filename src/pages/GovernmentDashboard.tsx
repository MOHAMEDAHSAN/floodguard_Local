
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

interface PriorityData {
  area: string;
  total_priority: number;
  request_count: number;
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

  const { data: priorityData, isLoading } = useQuery({
    queryKey: ['priority-data'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('helpline_responses')
        .select('area, priority_score')
        .not('area', 'is', null);

      if (error) throw error;

      // Aggregate data by area
      const aggregatedData = data.reduce((acc: { [key: string]: PriorityData }, curr) => {
        const area = curr.area.trim();
        if (!acc[area]) {
          acc[area] = {
            area,
            total_priority: 0,
            request_count: 0
          };
        }
        acc[area].total_priority += Number(curr.priority_score);
        acc[area].request_count += 1;
        return acc;
      }, {});

      return Object.values(aggregatedData).sort((a, b) => b.total_priority - a.total_priority);
    },
    refetchInterval: 5000 // Refresh every 5 seconds to get updates
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
          <h2 className="text-xl font-semibold mb-4">Priority Scores by Area</h2>
          {isLoading ? (
            <div className="text-center py-4">Loading data...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Area</TableHead>
                  <TableHead className="text-right">Total Priority Score</TableHead>
                  <TableHead className="text-right">Number of Requests</TableHead>
                  <TableHead className="text-right">Average Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {priorityData?.map((row) => (
                  <TableRow key={row.area}>
                    <TableCell className="font-medium">{row.area}</TableCell>
                    <TableCell className="text-right">
                      {row.total_priority.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">{row.request_count}</TableCell>
                    <TableCell className="text-right">
                      {(row.total_priority / row.request_count).toFixed(2)}
                    </TableCell>
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
