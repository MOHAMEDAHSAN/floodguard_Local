
import { useState, useEffect } from "react";
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
  const [isRegistering, setIsRegistering] = useState(false);
  const [isGovernmentRegistering, setIsGovernmentRegistering] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/helpline');
      }
    };

    checkSession();
  }, [navigate]);

  const handleAuth = async (isAdmin: boolean) => {
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      // Clear any existing session first
      await supabase.auth.signOut();

      let authResponse;
      const isRegistration = isAdmin ? isGovernmentRegistering : isRegistering;

      if (isRegistration) {
        // Sign up
        authResponse = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin
          }
        });
      } else {
        // Sign in
        authResponse = await supabase.auth.signInWithPassword({
          email,
          password
        });
      }

      const { data: userData, error: authError } = authResponse;

      if (authError) {
        if (authError.message.includes("Email not confirmed")) {
          throw new Error(
            "Please confirm your email address before logging in. Check your inbox for a confirmation email."
          );
        }
        if (authError.message.includes("Invalid login credentials")) {
          throw new Error(
            "Invalid email or password. Please check your credentials and try again."
          );
        }
        throw authError;
      }

      if (isRegistration) {
        toast({
          title: "Registration successful",
          description: "Please check your email to confirm your account.",
        });
        return;
      }

      if (!userData.user) {
        throw new Error("No user data received");
      }

      toast({
        title: "Login successful",
        description: `Welcome back!`,
      });

      // Redirect based on which portal was used for login
      if (isAdmin) {
        navigate('/'); // Government officials go to index page
      } else {
        navigate('/helpline'); // General public goes to helpline
      }

    } catch (error: any) {
      console.error('Auth error:', error);
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
    <div 
      className="min-h-screen flex items-center justify-center pt-16"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=3272&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full max-w-md p-4">
        <Card className="p-6 space-y-6 backdrop-blur-lg bg-white/80 dark:bg-[#1A1F2C]/80 shadow-xl">
          <Tabs defaultValue="user" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="admin">Government Official</TabsTrigger>
              <TabsTrigger value="user">General Public</TabsTrigger>
            </TabsList>
            
            <TabsContent value="admin" className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-center">Government Official Portal</h2>
                <p className="text-center text-muted-foreground">Access the FloodGuard admin portal using the placeholder credentials</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="abishaioff@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="abi866733"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleAuth(true)}
                  disabled={loading}
                >
                  {loading ? "Loading..." : (isGovernmentRegistering ? "Sign Up as Official" : "Login as Official")}
                </Button>
                <button
                  onClick={() => setIsGovernmentRegistering(!isGovernmentRegistering)}
                  className="w-full text-sm text-blue-600 hover:text-blue-800"
                >
                  {isGovernmentRegistering ? "Already have an account? Login" : "Need an official account? Sign Up"}
                </button>
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
                  onClick={() => handleAuth(false)}
                  disabled={loading}
                >
                  {loading ? "Loading..." : (isRegistering ? "Sign Up as Public User" : "Login as Public User")}
                </Button>
                <button
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="w-full text-sm text-blue-600 hover:text-blue-800"
                >
                  {isRegistering ? "Already have an account? Login" : "Need an account? Sign Up"}
                </button>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
