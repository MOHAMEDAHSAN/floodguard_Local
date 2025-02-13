
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { NovaChat } from "@/components/Nova/NovaChat";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import About from "./pages/About";
import Chatbot from "./pages/Chatbot";
import Auth from "./pages/Auth";
import Helpline from "./pages/Helpline";
import { NavBar } from "./components/NavBar";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      <Sonner />
      {!isAuthPage && <NavBar />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/helpline" element={<Helpline />} />
      </Routes>
      {!isAuthPage && <NovaChat />}
      {!isAuthPage && <Footer />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
      <TooltipProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
