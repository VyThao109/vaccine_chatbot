import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import LoadingIndicator from "./LoadingIndicator";
import type { IMessageResponseData } from "../../../interfaces/chat.interface";

interface MessagesAreaProps {
  messages: IMessageResponseData[];
  isLoading: boolean;
}

const MessagesArea = ({ messages, isLoading }: MessagesAreaProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);
  return (
    <div className="w-full flex-1 flex justify-center overflow-y-auto pt-6 pb-2 space-y-4 custom-scrollbar">
      <div className="w-4/5 md:w-2/3">
        {messages.map((msg) => (
          <MessageBubble key={msg.idChatMessage} message={msg} />
        ))}

        {isLoading && <LoadingIndicator />}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessagesArea;
