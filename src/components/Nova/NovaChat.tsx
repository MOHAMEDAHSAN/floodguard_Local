import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  type: 'user' | 'bot';
  content: string;
}

const initialMessages: Message[] = [
  {
    type: 'bot',
    content: "Hi! I'm Nova, your flood awareness assistant. How can I help you today? You can ask me about:\n- Flood risks and safety\n- Emergency preparedness\n- Current flood alerts\n- Post-flood recovery"
  }
];

export const NovaChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { type: 'user', content: input }]);
    
    // Simulate Nova's response
    setTimeout(() => {
      const response = generateResponse(input);
      setMessages(prev => [...prev, { type: 'bot', content: response }]);
    }, 1000);

    setInput("");
  };

  const generateResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('hello') || input.includes('hi')) {
      return "Hello! How can I assist you with flood-related information today?";
    }
    if (input.includes('flood') && input.includes('prepare')) {
      return "Here are some key flood preparation steps:\n1. Create an emergency kit\n2. Keep important documents in a waterproof container\n3. Know your evacuation route\n4. Stay informed about weather updates\n5. Have emergency contacts ready";
    }
    if (input.includes('emergency')) {
      return "For emergencies, please contact:\n- Emergency Services: 911\n- Local Flood Control: (555) 123-4567\n- Red Cross: (555) 789-0123\n\nAlways prioritize your safety and follow official evacuation orders.";
    }
    
    return "I can help you with flood awareness, preparation, and emergency response. Could you please be more specific about what you'd like to know?";
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 bg-primary hover:bg-primary-dark shadow-lg"
        >
          <MessageCircle className="w-8 h-8" />
        </Button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl w-96 h-[500px] flex flex-col">
          <div className="p-4 bg-primary text-white flex justify-between items-center rounded-t-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="font-semibold">Nova - Flood Assistant</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary-dark rounded-full"
            >
              <X className="w-5 h-5 text-white" />
            </Button>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button
                onClick={handleSend}
                className="rounded-full bg-primary hover:bg-primary-dark"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};