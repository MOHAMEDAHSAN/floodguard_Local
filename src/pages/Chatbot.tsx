import RetroHeader from "@/components/RetroHeader";
import { NovaChat } from "@/components/Nova/NovaChat";

const Chatbot = () => {
  return (
    <div className="min-h-screen bg-white">
      <RetroHeader />
      <div className="flex-1 h-[calc(100vh-64px)] relative">
        <NovaChat fullScreen={true} />
      </div>
    </div>
  );
};

export default Chatbot;
