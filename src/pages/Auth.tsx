
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (isAdmin: boolean) => {
    try {
      setLoading(true);
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) throw signInError;

      // Fetch user's profile to check role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', signInData.user.id)
        .single();

      if (profileError) throw profileError;

      // Check if user is trying to access the correct portal
      if (isAdmin && profile.role !== 'admin') {
        throw new Error('Access denied. This portal is for government officials only.');
      }

      if (!isAdmin && profile.role === 'admin') {
        throw new Error('Please use the admin portal to login.');
      }

      toast({
        title: "Login successful",
        description: `Welcome ${isAdmin ? 'admin' : 'user'}!`,
      });

      // Redirect admin to home page
      if (isAdmin) {
        navigate('/');
      } else {
        // Will implement user redirect in next prompt
        navigate('/');
      }

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-light/50 to-secondary dark:from-black dark:to-[#1A1F2C]">
      <div className="w-full max-w-md p-4">
        <Card className="p-6 space-y-6 backdrop-blur-lg bg-white/80 dark:bg-[#1A1F2C]/80">
          <Tabs defaultValue="admin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="admin">Government Official</TabsTrigger>
              <TabsTrigger value="user">General Public</TabsTrigger>
            </TabsList>
            
            <TabsContent value="admin" className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-center">Government Official Login</h2>
                <p className="text-center text-muted-foreground">Access the FloodGuard admin portal</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleLogin(true)}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Login as Official"}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="user" className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-center">Public Access</h2>
                <p className="text-center text-muted-foreground">Access flood information and updates</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="user-email">Email</Label>
                  <Input
                    id="user-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-password">Password</Label>
                  <Input
                    id="user-password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleLogin(false)}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Login as Public User"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
