import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSend: () => void;
}

export const ChatInput = ({ input, setInput, handleSend }: ChatInputProps) => {
  return (
    <div className="p-4 border-t border-border dark:bg-[#1A1F2C] mt-auto">
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border border-border dark:bg-gray-800 dark:text-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-primary-foreground/50"
        />
        <Button
          onClick={handleSend}
          className="rounded-full bg-[#00BCD4] hover:bg-[#00ACC1] text-white dark:bg-[#333] dark:hover:bg-[#444]"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};