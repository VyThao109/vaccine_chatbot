import { useEffect, useRef, useState } from "react";
import { LuSend } from "react-icons/lu";

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

const MessageInput = ({
  value,
  onChange,
  onSend,
  isLoading,
}: MessageInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Theo dõi kích thước màn hình
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="pb-4 md:pb-6 w-full">
      <div className="w-[95%] sm:w-4/5 md:w-2/3 mx-auto">
        <div className="flex flex-col gap-2 items-end px-3 md:px-4 pb-3 md:pb-4 bg-gray-50 border-2 border-gray-200 rounded-3xl">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            placeholder="Hỏi về vaccine, tác dụng phụ, lịch tiêm..."
            rows={1}
            className="w-full py-3 md:py-4 text-gray-900 placeholder-gray-400 focus:outline-none transition-all duration-200 text-sm resize-none bg-transparent"
            style={{
              minHeight: isMobile ? "56px" : "72px", // Mobile: ~2 dòng, Desktop: ~3 dòng
              maxHeight: isMobile ? "200px" : "320px", // Mobile: ~6 dòng, Desktop: ~10 dòng
            }}
          />

          <button
            onClick={onSend}
            disabled={!value.trim() || isLoading}
            className="p-2 md:p-3 bg-gradient-primary text-white rounded-3xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-teal-200 transform hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <LuSend className="w-4 h-4 md:w-6 md:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
