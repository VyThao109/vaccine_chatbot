import { useEffect, useMemo, useState } from "react";
import SideBar from "../../components/chat/sidebar/SideBar";
import MessagesArea from "../../components/chat/message/MessagesArea";
import MessageInput from "../../components/chat/message/MessageInput";
import { FiSidebar } from "react-icons/fi";
import {
  useAskChatbotMutation,
  useDeleteChatSessionMutation,
  useGetChatSessionsQuery,
  useGetSessionHistoryQuery,
} from "../../redux/services/chat/chat.service";
import type { IMessageResponseData } from "../../interfaces/chat.interface";
import { LuTrash2, LuX } from "react-icons/lu";

const ChatPage = () => {
  const { data: sessionData, isLoading: isSessionLoading } =
    useGetChatSessionsQuery();
  const chatSessions = useMemo(() => {
    if (!sessionData?.data) return [];

    return [...sessionData.data].sort((a, b) => {
      return (
        new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime()
      );
    });
  }, [sessionData]);

  const [askChatbot, { isLoading: isSending }] = useAskChatbotMutation();

  const [deleteChatSession] = useDeleteChatSessionMutation();

  const [activeChatSessionId, setActiveChatSessionId] = useState<string>(() => {
    return sessionStorage.getItem("activeChatSessionId") || "";
  });
  const [message, setMessage] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const [messages, setMessages] = useState<IMessageResponseData[]>([]);
  const [sessionToDeleteId, setSessionToDeleteId] = useState<string | null>(
    null
  );

  const {
    data: historyData,
    isLoading: isHistoryLoading,
    isError: isHistoryError,
  } = useGetSessionHistoryQuery(activeChatSessionId, {
    skip: !activeChatSessionId,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (activeChatSessionId) {
      sessionStorage.setItem("activeChatSessionId", activeChatSessionId);
    } else {
      sessionStorage.removeItem("activeChatSessionId");
    }
  }, [activeChatSessionId]);

  useEffect(() => {
    if (isHistoryError) {
      setActiveChatSessionId("");
      sessionStorage.removeItem("activeChatSessionId");
    }
  }, [isHistoryError]);

  useEffect(() => {
    if (historyData?.data) {
      const sortedMessages = [...historyData.data].sort((a, b) => {
        const timeA = new Date(a.createdDate).getTime();
        const timeB = new Date(b.createdDate).getTime();
        if (timeA !== timeB) {
          return timeA - timeB;
        }
        if (a.isFromUser === b.isFromUser) return 0;
        return a.isFromUser ? -1 : 1;
      });
      setMessages(sortedMessages);
    }
  }, [historyData]);

  const activeChatSession = chatSessions.find(
    (session) => session.idChatSession === activeChatSessionId
  );

  const handleSelectChatSession = (id: string): void => {
    if (id === activeChatSessionId) return;
    setActiveChatSessionId(id);
    setMessages([]);
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const handleNewChat = (): void => {
    setActiveChatSessionId("");
    setMessages([]);
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const handleRequestDelete = (id: string) => {
    setSessionToDeleteId(id); // Mở dialog
  };

  const confirmDelete = async () => {
    if (sessionToDeleteId) {
      try {
        await deleteChatSession(sessionToDeleteId).unwrap();
        if (sessionToDeleteId === activeChatSessionId) {
          handleNewChat();
        }
      } catch (error) {
        console.error("Failed to delete session:", error);
      } finally {
        setSessionToDeleteId(null); // Đóng dialog
      }
    }
  };

  const cancelDelete = () => {
    setSessionToDeleteId(null); // Đóng dialog
  };

  const handleSendMessage = async (): Promise<void> => {
    if (!message.trim() || isSending) return;

    const currentMessage = message;
    setMessage("");
    const userMessage: IMessageResponseData = {
      idChatMessage: Date.now().toString(), // ID tạm
      msgContent: currentMessage,
      isFromUser: true,
      createdDate: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const payload = {
        idChatSession: activeChatSessionId || null,
        question: currentMessage,
      };

      const response = await askChatbot(payload).unwrap();

      if (response.statusCode === 200) {
        if (!activeChatSessionId && response.data.idChatSession) {
          setActiveChatSessionId(response.data.idChatSession);
        }
        const botMessage: IMessageResponseData = {
          idChatMessage: (Date.now() + 1).toString(),
          msgContent: response.data.answer,
          isFromUser: false,
          createdDate: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMessage: IMessageResponseData = {
        idChatMessage: Date.now().toString(),
        msgContent: "Có lỗi xảy ra, vui lòng thử lại sau.",
        isFromUser: false,
        createdDate: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen w-full flex relative overflow-hidden">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`
          fixed md:relative
          h-full
          z-50 md:z-auto
          transition-transform duration-300 ease-in-out
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        <SideBar
          chatSessions={chatSessions}
          activeChatSessionId={activeChatSessionId}
          onSelectChatSession={handleSelectChatSession}
          onNewChat={handleNewChat}
          isOpen={isSidebarOpen}
          onToggle={toggleSidebar}
          isLoading={isSessionLoading}
          onDeleteChatSession={handleRequestDelete}
        />
      </div>
      <div className="flex-1 flex flex-col items-center border-l border-gray-300 w-full md:w-auto min-w-0 bg-white">
        {/* Header */}
        <div className="w-full bg-white px-4 py-3 flex items-center gap-3 shrink-0 relative border-b border-gray-300">
          <button
            onClick={toggleSidebar}
            className="flex md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle sidebar"
          >
            <FiSidebar className="w-5 h-5 text-text-primary" />
          </button>
          <h1 className="text-md font-medium text-text-primary">
            {activeChatSession?.title || "Cuộc trò chuyện mới"}
          </h1>
        </div>

        {messages.length === 0 ? (
          <div className="flex-1 w-full flex flex-col justify-center items-center">
            <div className="mb-8 flex flex-col items-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center tracking-tight">
                Tôi có thể giúp gì cho bạn?
              </h2>
            </div>

            {/* Input Component */}
            <MessageInput
              value={message}
              onChange={setMessage}
              onSend={handleSendMessage}
              isLoading={isSending}
            />
          </div>
        ) : (
          <>
            <MessagesArea
              messages={messages}
              isLoading={isSending || isHistoryLoading}
            />
            <MessageInput
              value={message}
              onChange={setMessage}
              onSend={handleSendMessage}
              isLoading={isSending}
            />
          </>
        )}
      </div>
      {sessionToDeleteId && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={cancelDelete}
          />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all scale-100 animate-in fade-in zoom-in duration-200">
            <button
              onClick={cancelDelete}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <LuX className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <LuTrash2 className="w-6 h-6 text-text-error" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Xóa cuộc trò chuyện?
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Bạn có chắc chắn muốn xóa cuộc trò chuyện này không? Hành động
                này không thể hoàn tác.
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={cancelDelete}
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 bg-error hover:bg-red-700 text-white font-medium rounded-lg transition-colors shadow-sm cursor-pointer"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ChatPage;
