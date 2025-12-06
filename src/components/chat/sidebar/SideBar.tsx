import { useState, useEffect, useRef } from "react";
import { LuShield, LuSquarePen, LuTrash2 } from "react-icons/lu";
import { FiSidebar } from "react-icons/fi";
import UserMenu from "./UserMenu";
import type { IChatSessionResponseData } from "../../../interfaces/chat.interface";
import { IoEllipsisVertical } from "react-icons/io5";

interface SideBarProps {
  chatSessions: IChatSessionResponseData[];
  activeChatSessionId: string;
  onSelectChatSession: (id: string) => void;
  onNewChat: () => void;
  isOpen: boolean;
  onToggle: () => void;
  isLoading?: boolean;
  onDeleteChatSession: (id: string) => void;
  onChangePasswordClick: () => void;
  onLogoutClick: () => void;
}

const SideBar = ({
  chatSessions,
  activeChatSessionId,
  onSelectChatSession,
  onNewChat,
  isOpen,
  onToggle,
  isLoading = false,
  onDeleteChatSession,
  onChangePasswordClick,
  onLogoutClick,
}: SideBarProps) => {
  // State lưu ID của session đang mở menu options
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Ref để xử lý click outside
  const menuRef = useRef<HTMLDivElement>(null);

  // Xử lý đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Xử lý scroll thì đóng menu (tránh menu bay lung tung)
  const handleScroll = () => {
    if (openMenuId) setOpenMenuId(null);
  };

  return (
    <div
      className={`${
        isOpen ? "w-full lg:w-80" : "w-20"
      } bg-white transition-all duration-300 flex flex-col overflow-hidden h-screen relative border-r border-gray-200`}
      onClick={() => {
        if (!isOpen) onToggle();
      }}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-blue-100 bg-gradient-background">
        <div className="flex items-center justify-between mb-6">
          {isOpen && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <LuShield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">VaxBot</h2>
                <p className="text-xs text-teal-100">Tư vấn Vaccine</p>
              </div>
            </div>
          )}

          <button
            className="w-10 h-10 bg-transparent hover:bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center cursor-pointer shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
          >
            <FiSidebar className="w-5 h-5 text-white" />
          </button>
        </div>

        <button
          onClick={onNewChat}
          title="Cuộc trò chuyện mới"
          className={`
              group flex items-center p-0 overflow-hidden cursor-pointer shrink-0 shadow-sm
              transition-all duration-300 ease-in-out
              ${isOpen ? "w-full rounded-full" : "w-10 rounded-2xl"} h-11 mt-1
            `}
        >
          <div
            className={`
              h-full flex items-center justify-center
              bg-white/40 group-hover:bg-white/50 backdrop-blur-md
              transition-all duration-300
              ${isOpen ? "w-16 border-r border-white/10" : "w-full"}
            `}
          >
            <LuSquarePen className="w-5 h-5 text-white drop-shadow-sm" />
          </div>

          {isOpen && (
            <div className="h-full flex-1 flex items-center pl-3 pr-4 bg-white/20 group-hover:bg-white/30 backdrop-blur-md transition-all duration-300">
              <span className="text-sm font-bold text-white whitespace-nowrap drop-shadow-sm">
                Cuộc trò chuyện mới
              </span>
            </div>
          )}
        </button>
      </div>

      {/* Conversations List */}
      <div
        className={`flex-1 overflow-y-auto p-4 space-y-2 transition-opacity custom-scrollbar ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onScroll={handleScroll}
      >
        {isLoading && isOpen && (
          <div className="space-y-3 p-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse flex gap-2">
                <div className="h-10 w-full bg-gray-200 rounded-full"></div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && chatSessions.length === 0 && isOpen && (
          <div className="text-center text-gray-500 mt-10 text-sm">
            Chưa có cuộc trò chuyện nào.
          </div>
        )}

        <div ref={menuRef} className="space-y-2">
          {!isLoading &&
            chatSessions.map((session) => (
              <div
                key={session.idChatSession}
                onClick={() => onSelectChatSession(session.idChatSession)}
                className={`relative w-full pl-4 pr-1 py-1 rounded-full text-left transition-all duration-200 cursor-pointer border-2 border-transparent group flex items-center gap-3 ${
                  activeChatSessionId === session.idChatSession
                    ? "bg-blue-50 border-blue-100"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="flex-1 min-w-0 py-1">
                  <h3 className="font-semibold text-sm truncate text-text-primary">
                    {session.title}
                  </h3>
                </div>

                <button
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                    openMenuId === session.idChatSession
                      ? "bg-gray-200 text-gray-800"
                      : "bg-transparent hover:bg-black/5 text-gray-400"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(
                      openMenuId === session.idChatSession
                        ? null
                        : session.idChatSession
                    );
                  }}
                >
                  <IoEllipsisVertical className="w-4 h-4" />
                </button>

                {openMenuId === session.idChatSession && (
                  <div
                    className="absolute right-0 top-full mt-1 w-48 bg-gray-50 rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="py-1">
                      <button
                        className="w-full text-left px-4 py-2.5 text-sm text-text-error hover:bg-black/5 flex items-center gap-3 transition-colors cursor-pointer"
                        onClick={() => {
                          setOpenMenuId(null);
                          onDeleteChatSession(session.idChatSession);
                        }}
                      >
                        <LuTrash2 className="w-4 h-4" />
                        Xóa
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      <UserMenu
        isSidebarOpen={isOpen}
        onChangePasswordClick={onChangePasswordClick}
        onLogoutClick={onLogoutClick}
      />
    </div>
  );
};

export default SideBar;
