import { RetroHeader } from "@/components/RetroHeader";
import { NovaChat } from "@/components/Nova/NovaChat";

const Chatbot = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/50 to-secondary">
      <RetroHeader />
      <div className="h-screen pt-16">
        <div className="w-full h-full bg-gray-50">
          <NovaChat />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;