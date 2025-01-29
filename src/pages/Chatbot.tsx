import { RetroHeader } from "@/components/RetroHeader";
import { NovaChat } from "@/components/Nova/NovaChat";

const Chatbot = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/50 to-secondary">
      <RetroHeader />
      <div className="container mx-auto px-6 py-20">
        <NovaChat />
      </div>
    </div>
  );
};

export default Chatbot;