import { Message } from "./types";
import { Button } from "@/components/ui/button";

interface ChatMessageProps {
  message: Message;
  onOptionClick: (option: string) => void;
}

export const ChatMessage = ({ message, onOptionClick }: ChatMessageProps) => {
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