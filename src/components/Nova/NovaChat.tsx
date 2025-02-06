import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { autocorrect } from "@/utils/autocorrect";
import { supabase } from "@/integrations/supabase/client";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Message, Location } from "./types";

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

interface NovaChatProps {
  fullScreen?: boolean;
}

export const NovaChat = ({ fullScreen = false }: NovaChatProps) => {
  const [isOpen, setIsOpen] = useState(fullScreen);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [location, setLocation] = useState<Location>(defaultLocation);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleResponse = async (userMessage: string) => {
    setIsLoading(true);
    try {
      // Add user message to the chat
      setMessages(prev => [...prev, { type: 'user', content: userMessage }]);

      // Get AI response from DeepSeek
      const response = await supabase.functions.invoke('chat', {
        body: { 
          message: userMessage, 
          context: messages.slice(-5) 
        }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (!response.data) {
        throw new Error('No response data received');
      }

      const aiMessage = response.data;
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        description: "Failed to get response. Please try again.",
        duration: 3000
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionClick = (option: string) => {
    setMessages(prev => [...prev, { type: 'user', content: option }]);
    handleResponse(option);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const correctedInput = autocorrect(input);
    if (correctedInput !== input) {
      toast({
        description: "I've corrected some spelling to better understand your question.",
        duration: 3000
      });
    }

    setInput("");
    handleResponse(correctedInput);
  };

  return (
    <div className={`${fullScreen ? 'h-full' : 'fixed bottom-4 right-4'} z-50`}>
      {!isOpen && !fullScreen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 shadow-lg"
        >
          <MessageCircle className="w-8 h-8" />
        </Button>
      ) : (
        <div className={`bg-background dark:bg-[#1A1F2C] text-foreground rounded-lg shadow-xl ${
          fullScreen ? 'w-full h-full' : 'w-96 h-[500px]'
        } flex flex-col border border-border`}>
          <div className="p-4 bg-primary/10 dark:bg-primary/5 text-primary-dark dark:text-primary-foreground flex justify-between items-center rounded-t-lg border-b border-border">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-semibold">Nova - Flood Assistant</span>
            </div>
            {!fullScreen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hover:bg-primary/10 dark:hover:bg-primary/5 rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>
          
          <ScrollArea className="flex-1 p-4 dark:bg-[#1A1F2C]">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  message={message}
                  onOptionClick={handleOptionClick}
                />
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <ChatInput
            input={input}
            setInput={setInput}
            handleSend={handleSend}
          />
        </div>
      )}
    </div>
  );
};