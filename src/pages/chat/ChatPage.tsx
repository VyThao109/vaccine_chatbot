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
import { LuLock, LuLogOut, LuTrash2 } from "react-icons/lu";
import { useToast } from "../../hooks/useToast";
import AuthInput from "../../components/auth/AuthInput";
import GradientButton from "../../components/common/GradientButton";
import { useChangePasswordMutation } from "../../redux/services/user/user.service";
import DialogLayout from "../../components/common/DialogLayout";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hook";
import { signOut } from "../../redux/features/auth/auth.slice";
import { paths } from "../../routes/paths";
import { apiSlice } from "../../redux/services/base.service";

const ChatPage = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  //Delete session
  const handleRequestDelete = (id: string) => {
    setSessionToDeleteId(id);
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
        setSessionToDeleteId(null);
      }
    }
  };

  const cancelDelete = () => {
    setSessionToDeleteId(null);
  };

  //Change Password
  const [changePassword, { isLoading: isChangingPass }] =
    useChangePasswordMutation();
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [changePassData, setChangePassData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setChangePassData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  }, [isChangePasswordOpen]);

  const handleChangePassInput = (field: string, value: string) => {
    setChangePassData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitChangePass = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !changePassData.oldPassword ||
      !changePassData.newPassword ||
      !changePassData.confirmPassword
    ) {
      showToast("Vui lòng điền đầy đủ thông tin", "error");
      return;
    }

    if (changePassData.newPassword !== changePassData.confirmPassword) {
      showToast("Mật khẩu xác nhận không khớp", "error");
      return;
    }

    if (changePassData.newPassword.length < 6) {
      showToast("Mật khẩu mới phải có ít nhất 6 ký tự", "error");
      return;
    }

    try {
      await changePassword({
        oldPassword: changePassData.oldPassword,
        newPassword: changePassData.newPassword,
      }).unwrap();

      showToast("Đổi mật khẩu thành công!", "success");
      setIsChangePasswordOpen(false);
      setChangePassData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      console.error("Change pass failed:", err);
      if (
        err.status === 400 &&
        err.data.data.message === "Old password is incorrect."
      ) {
        showToast("Mật khẩu hiện tại không chính xác.", "error");
      } else {
        showToast(err?.data?.message || "Đổi mật khẩu thất bại", "error");
      }
    }
  };

  //Log out
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const handleSignout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(signOut());
    dispatch(apiSlice.util.resetApiState());
    navigate(paths.signin);
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
          onChangePasswordClick={() => setIsChangePasswordOpen(true)}
          onLogoutClick={() => setIsLogoutDialogOpen(true)}
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

      {/* Delete session */}
      <DialogLayout
        isOpen={!!sessionToDeleteId}
        onClose={cancelDelete}
        type="error"
        icon={<LuTrash2 />}
        title="Xóa cuộc trò chuyện?"
        subtitle="Bạn có chắc chắn muốn xóa cuộc trò chuyện này không? Hành động này không thể hoàn tác."
        maxWidth="max-w-sm"
      >
        <div className="flex gap-3 w-full">
          <button
            onClick={cancelDelete}
            className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors cursor-pointer"
          >
            Hủy
          </button>
          <button
            onClick={confirmDelete}
            className="flex-1 px-4 py-2 bg-gradient-red text-white font-medium rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            Xóa
          </button>
        </div>
      </DialogLayout>

      {/* Change password */}
      <DialogLayout
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
        type="info"
        icon={<LuLock />}
        title="Thay đổi mật khẩu"
        subtitle="Để bảo mật, vui lòng nhập mật khẩu cũ của bạn."
      >
        <form onSubmit={handleSubmitChangePass} className="space-y-4 text-left">
          <AuthInput
            label="Mật khẩu hiện tại"
            type="password"
            placeholder="••••••••"
            value={changePassData.oldPassword}
            onChange={(e) =>
              handleChangePassInput("oldPassword", e.target.value)
            }
            icon={<LuLock className="w-5 h-5" />}
          />
          <div className="border-t border-gray-100 my-2"></div>
          <AuthInput
            label="Mật khẩu mới"
            type="password"
            placeholder="••••••••"
            value={changePassData.newPassword}
            onChange={(e) =>
              handleChangePassInput("newPassword", e.target.value)
            }
            icon={<LuLock className="w-5 h-5" />}
          />
          <AuthInput
            label="Xác nhận mật khẩu mới"
            type="password"
            placeholder="••••••••"
            value={changePassData.confirmPassword}
            onChange={(e) =>
              handleChangePassInput("confirmPassword", e.target.value)
            }
            icon={<LuLock className="w-5 h-5" />}
          />
          <div className="pt-2">
            <GradientButton type="submit" isLoading={isChangingPass}>
              {isChangingPass ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
            </GradientButton>
          </div>
        </form>
      </DialogLayout>

      {/* Logout */}
      <DialogLayout
        isOpen={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
        type="error"
        icon={<LuLogOut />}
        title="Đăng xuất?"
        subtitle="Bạn có chắc chắn muốn đăng xuất khỏi hệ thống không?"
        maxWidth="max-w-sm"
      >
        <div className="flex gap-3 w-full">
          <button
            onClick={() => setIsLogoutDialogOpen(false)}
            className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors cursor-pointer"
          >
            Hủy
          </button>
          <button
            onClick={handleSignout}
            className="flex-1 px-4 py-2 bg-gradient-red text-white font-medium rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            Đăng xuất
          </button>
        </div>
      </DialogLayout>
    </div>
  );
};
export default ChatPage;
