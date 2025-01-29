import { RetroHeader } from "@/components/RetroHeader";
import { NovaChat } from "@/components/Nova/NovaChat";

const Chatbot = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/50 to-secondary">
      <RetroHeader />
      <div className="container mx-auto px-6 pt-20">
        <div className="w-full h-[calc(100vh-5rem)]">
          <NovaChat />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;