import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { autocorrect } from "@/utils/autocorrect";

interface Message {
  type: 'user' | 'bot';
  content: string;
  options?: string[];
}

interface Location {
  city: string;
  state: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  emergencyContacts: {
    police: string;
    floodControl: string;
    emergencyServices: string;
  };
}

const defaultLocation: Location = {
  city: "Chennai",
  state: "Tamil Nadu",
  country: "India",
  emergencyContacts: {
    police: "100",
    floodControl: "1913",
    emergencyServices: "108"
  }
};

const initialMessages: Message[] = [
  {
    type: 'bot',
    content: "Hi! I'm Nova, your flood awareness assistant. How can I help you today?",
    options: [
      "Learn about flood risks",
      "Check emergency preparedness",
      "Get local flood alerts",
      "Post-flood recovery help",
      "Set my location"
    ]
  }
];

export const NovaChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [location, setLocation] = useState<Location>(defaultLocation);
  const { toast } = useToast();

  const requestLocationPermission = async () => {
    if ("geolocation" in navigator) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        
        // Here we would typically make an API call to reverse geocode the coordinates
        // For now, we'll use the default Indian location
        setLocation(prev => ({
          ...prev,
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        }));

        toast({
          description: "Location updated to Chennai, Tamil Nadu",
          duration: 3000
        });
      } catch (error) {
        toast({
          variant: "destructive",
          description: "Unable to access location. Using default Chennai location.",
          duration: 3000
        });
      }
    }
  };

  const handleOptionClick = (option: string) => {
    setMessages(prev => [...prev, { type: 'user', content: option }]);
    handleResponse(option);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const correctedInput = autocorrect(input);
    if (correctedInput !== input) {
      toast({
        description: "I've corrected some spelling to better understand your question.",
        duration: 3000
      });
    }

    setMessages(prev => [...prev, { type: 'user', content: correctedInput }]);
    handleResponse(correctedInput);
    setInput("");
  };

  const handleResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    setTimeout(() => {
      let response: Message = { type: 'bot', content: '' };

      if (input.includes('location') || input.includes('set my location')) {
        requestLocationPermission();
        response = {
          type: 'bot',
          content: `I'm currently set to provide information for ${location.city}, ${location.state}. Your local emergency contacts are:\n\nPolice: ${location.emergencyContacts.police}\nFlood Control: ${location.emergencyContacts.floodControl}\nEmergency Services: ${location.emergencyContacts.emergencyServices}`,
          options: ["Update location", "Back to main menu"]
        };
      }
      else if (input.includes('risk')) {
        response = {
          type: 'bot',
          content: `Based on your location in ${location.city}:\n\n1. Types of Floods:\n- Flash floods\n- River floods\n- Coastal floods\n\n2. Risk Factors:\n- Heavy rainfall\n- Snow melting\n- Storm surges\n- Urban development`,
          options: ["Check local flood risks", "Preparation tips", "Back to main menu"]
        };
      }
      else if (input.includes('prepare') || input.includes('preparedness')) {
        response = {
          type: 'bot',
          content: "Essential flood preparation steps:\n\n1. Create an emergency kit with:\n- Water and non-perishable food\n- First aid supplies\n- Flashlights and batteries\n- Important documents in waterproof container\n\n2. Know your evacuation route\n3. Stay informed about weather updates\n4. Have emergency contacts ready",
          options: ["Get evacuation routes", "Emergency contacts", "Back to main menu"]
        };
      }
      else if (input.includes('recovery') || input.includes('after flood')) {
        response = {
          type: 'bot',
          content: "Post-flood recovery guidance:\n\n1. Safety First:\n- Wait for official clearance to return\n- Watch for hazards\n\n2. Document Damage:\n- Take photos\n- Contact insurance\n\n3. Clean-up:\n- Wear protective gear\n- Prevent mold growth\n\n4. Seek assistance if needed",
          options: ["Contact emergency services", "Clean-up tips", "Back to main menu"]
        };
      }
      else if (input.includes('alert')) {
        response = {
          type: 'bot',
          content: `Current flood alert status for ${location.city}:\nNo active flood warnings at this time.\n\nStay prepared by:\n1. Monitoring local weather\n2. Signing up for emergency alerts\n3. Keeping emergency supplies ready`,
          options: ["Check another location", "Preparation tips", "Back to main menu"]
        };
      }
      else if (input.includes('menu')) {
        response = initialMessages[0];
      }
      else {
        response = {
          type: 'bot',
          content: "I can help you with flood awareness, preparation, and emergency response. Could you please be more specific about what you'd like to know?",
          options: ["Show all options", "Back to main menu"]
        };
      }

      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 shadow-lg"
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
              className="hover:bg-primary/90 rounded-full"
            >
              <X className="w-5 h-5 text-white" />
            </Button>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className="space-y-2">
                  <div
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
                  {message.options && message.type === 'bot' && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {message.options.map((option, optionIndex) => (
                        <Button
                          key={optionIndex}
                          variant="outline"
                          size="sm"
                          className="text-sm"
                          onClick={() => handleOptionClick(option)}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  )}
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
                className="rounded-full bg-primary hover:bg-primary/90"
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
