
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

export const NavBar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);

      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        setIsAdmin(profile?.role === 'admin');
      }
    };

    // Check initial auth state
    checkUser();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setIsLoggedIn(!!session);
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        setIsAdmin(profile?.role === 'admin');
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthClick = async () => {
    if (isLoggedIn) {
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
    } else {
      navigate('/auth');
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Button variant="ghost" onClick={() => navigate('/')}>
                FloodGuard
              </Button>
            </div>
            <ul className="flex space-x-4">
              <li>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/')}
                >
                  Home
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/chatbot')}
                >
                  Chatbot
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/about')}
                >
                  About Us
                </Button>
              </li>
              {isAdmin && (
                <li>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/government')}
                    className="text-primary hover:text-primary/80"
                  >
                    Government Dashboard
                  </Button>
                </li>
              )}
            </ul>
          </div>
          <div className="flex items-center">
            <Button 
              onClick={handleAuthClick}
              className={isLoggedIn ? 
                "bg-destructive text-destructive-foreground hover:bg-destructive/90" : 
                "bg-gradient-to-r from-cyan-500 to-teal-400 text-white hover:from-cyan-600 hover:to-teal-500"}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
