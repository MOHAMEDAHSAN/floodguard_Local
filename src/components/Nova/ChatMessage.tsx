import { Message } from "./types";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info, CheckCircle2 } from "lucide-react";

interface ChatMessageProps {
  message: Message;
  onOptionClick: (option: string) => void;
}

const getMessageIcon = (content: string) => {
  if (content.toLowerCase().includes('emergency') || content.toLowerCase().includes('warning')) {
    return <AlertTriangle className="w-4 h-4 text-destructive" />;
  } else if (content.toLowerCase().includes('success') || content.toLowerCase().includes('prepared')) {
    return <CheckCircle2 className="w-4 h-4 text-primary" />;
  }
  return <Info className="w-4 h-4 text-primary" />;
};

export const ChatMessage = ({ message, onOptionClick }: ChatMessageProps) => {
  // Remove duplicate options if they exist
  const uniqueOptions = message.options ? [...new Set(message.options)] : [];

  return (
    <div className="space-y-2">
      <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`max-w-[80%] p-3 rounded-lg ${
            message.type === 'user'
              ? 'bg-primary/10 dark:bg-primary/20 text-primary-dark dark:text-primary-foreground'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100'
          }`}
        >
          <div className="flex items-start gap-2">
            {message.type === 'bot' && getMessageIcon(message.content)}
            <p className="whitespace-pre-line">{message.content}</p>
          </div>
        </div>
      </div>
      {uniqueOptions.length > 0 && message.type === 'bot' && (
        <div className="flex flex-wrap gap-2 mt-2">
          {uniqueOptions.map((option, optionIndex) => (
            <Button
              key={optionIndex}
              variant="outline"
              size="sm"
              className="text-sm border-primary text-primary dark:border-primary-foreground dark:text-primary-foreground hover:bg-primary/10 dark:hover:bg-primary/20"
              onClick={() => onOptionClick(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};