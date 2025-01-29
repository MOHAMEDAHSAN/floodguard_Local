import { RetroHeader } from "@/components/RetroHeader";
import { NovaChat } from "@/components/Nova/NovaChat";

const Chatbot = () => {
  return (
    <div className="min-h-screen bg-[#1A1F2C]">
      <RetroHeader />
      <div className="h-[calc(100vh-4rem)] pt-16">
        <div className="w-full h-full">
          <NovaChat fullScreen={true} />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;