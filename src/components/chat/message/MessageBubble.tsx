import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import type { IMessageResponseData } from "../../../interfaces/chat.interface";
import { formatMessageTime } from "../../../utils/dateUtils";
import { useState } from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

interface MessageBubbleProps {
  message: IMessageResponseData;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isBot = !message.isFromUser;
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const timeString = formatMessageTime(message.createdDate);

  const isLongMessage =
    !isBot &&
    (message.msgContent.length > 300 ||
      (message.msgContent.match(/\n/g) || []).length > 5);

  const formatContent = (content: string) => {
    if (!content && isBot)
      return "Xin lỗi, hiện tại tôi chưa thể đưa ra câu trả lời cho nội dung này. Bạn vui lòng thử lại hoặc đặt câu hỏi khác nhé!";

    return content.replace(/\\n/g, "\n").replace(/\\t/g, "\t");
  };

  const processedContent = formatContent(message.msgContent);

  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
      <div
        className={`flex gap-3 max-w-full ${
          isBot ? "w-full" : "max-w-full md:max-w-2/3 flex-row-reverse"
        }`}
      >
        <div
          className={`py-1 md:py-2 min-w-0 flex-1 ${
            isBot
              ? "bg-transparent"
              : "px-2 md:px-4 bg-gradient-primary text-white rounded-xl md:rounded-3xl shadow-md"
          }`}
        >
          <div
            className={`text-sm leading-relaxed wrap-break-word ${
              isBot ? "text-gray-800" : "text-white"
            }`}
          >
            {isBot ? (
              <div className="prose prose-sm max-w-none mt-2">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkBreaks]}
                  components={{
                    p: ({ children }) => (
                      <p className="mb-2 last:mb-0 wrap-break-word text-justify hyphens-auto">
                        {children}
                      </p>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-bold">{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic">{children}</em>
                    ),
                    code: ({ children }) => (
                      <code className="bg-gray-800 text-white px-2 py-1 rounded text-xs font-mono break-all inline-block max-w-full">
                        {children}
                      </code>
                    ),
                    pre: ({ children }) => (
                      <pre className="bg-gray-800 text-white p-3 rounded-lg overflow-x-auto my-2 max-w-full">
                        <code className="block whitespace-pre-wrap wrap-break-word text-xs font-mono">
                          {children}
                        </code>
                      </pre>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc ml-4 mb-2">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal ml-4 mb-2">{children}</ol>
                    ),
                    li: ({ children }) => (
                      <li className="mb-1 wrap-break-word">{children}</li>
                    ),
                    a: ({ children, href }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-all"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {processedContent}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="flex">
                <p
                  className={`whitespace-pre-wrap wrap-break-word transition-all duration-200 ${
                    isLongMessage && !isExpanded ? "line-clamp-6" : ""
                  }`}
                >
                  {message.msgContent}
                </p>

                {isLongMessage && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="self-start p-2 text-white cursor-pointer select-none rounded-full hover:transition-colors hover:bg-white/10"
                  >
                    {isExpanded ? (
                      <>
                        <LuChevronUp className="w-5 h-5" />
                      </>
                    ) : (
                      <>
                        <LuChevronDown className="w-5 h-5" />
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
          <p
            className={`text-xs mt-2 ${
              isBot ? "text-gray-400" : "text-teal-100"
            }`}
          >
            {timeString}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
