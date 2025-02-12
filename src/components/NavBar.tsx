
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";

export const NavBar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      navigate('/auth');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="bg-gradient-to-r from-teal-600 to-cyan-400 text-white fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="text-white text-xl font-bold hover:text-white"
              >
                FloodGuard
              </Button>
            </div>
            <div className="ml-10 flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="text-white hover:text-white hover:bg-white/10"
              >
                Home
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/chatbot')}
                className="text-white hover:text-white hover:bg-white/10"
              >
                Chatbot
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/about')}
                className="text-white hover:text-white hover:bg-white/10"
              >
                About Us
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="text-white hover:text-white hover:bg-white/10 gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                onClick={() => navigate('/auth')}
                className="text-white hover:text-white hover:bg-white/10"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
