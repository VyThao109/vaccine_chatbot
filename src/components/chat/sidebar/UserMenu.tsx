import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { LuLock, LuLogOut } from "react-icons/lu";
import { useGetUserProfileQuery } from "../../../redux/services/user/user.service";

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
}

interface UserMenuProps {
  isSidebarOpen: boolean;
  onChangePasswordClick: () => void;
  onLogoutClick: () => void;
}

const UserMenu = ({
  isSidebarOpen,
  onChangePasswordClick,
  onLogoutClick,
}: UserMenuProps) => {
  const { data: profileResponse, isLoading } = useGetUserProfileQuery();

  const user = profileResponse?.data;

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown when sidebar closes
  useEffect(() => {
    if (!isSidebarOpen) {
      setIsOpen(false);
    }
  }, [isSidebarOpen]);

  const getInitials = (name?: string): string => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleChangePasswordClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setIsOpen(false);
    onChangePasswordClick();
  };

  return (
    <div
      className={`relative px-4 py-2 shrink-0 ${!isSidebarOpen ? "px-2" : ""}`}
      ref={menuRef}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 hover:bg-gray-100 rounded-md transition-all duration-200 group cursor-pointer ${
          isSidebarOpen
            ? "w-full p-2 pr-4 justify-between"
            : "w-12 h-12 justify-center mx-auto"
        }`}
      >
        <div
          className={`flex items-center gap-3 ${isSidebarOpen ? "flex-1" : ""}`}
        >
          <div className="w-8 h-8 bg-primary-blue-light rounded-full flex items-center justify-center text-white font-bold shadow-lg shrink-0">
            {getInitials(user?.fullName)}
          </div>
          {isSidebarOpen && (
            <span className="text-md text-gray-900 font-semibold">
              {isLoading ? "Đang tải..." : user?.fullName || "Người dùng"}
            </span>
          )}
        </div>

        {isSidebarOpen && (
          <FaChevronDown
            className={`w-4 h-4 text-gray-900 transition-transform duration-200 shrink-0 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </button>

      {isOpen && isSidebarOpen && (
        <div className="absolute left-4 bottom-full mb-2 w-60 bg-white rounded-md border-2 border-blue-200 shadow-lg overflow-hidden z-50">
          <div className="px-4 py-2 bg-linear-to-r from-blue-50 to-blue-100 border-b-2 border-blue-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-blue-light rounded-full flex items-center justify-center text-white font-bold shadow-lg shrink-0">
                {getInitials(user?.fullName)}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {user?.fullName || "Người dùng"}
                </p>
                <p className="text-xs text-gray-600">
                  {user?.email || "Không có email"}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={handleChangePasswordClick}
            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center gap-3 text-gray-500 border-t-2 border-gray-100 cursor-pointer"
          >
            <LuLock className="w-5 h-5" />
            <span className="text-sm font-medium">Thay đổi mật khẩu</span>
          </button>

          <button
            onClick={onLogoutClick}
            className="w-full px-4 py-3 text-left hover:bg-red-50 transition-colors duration-200 flex items-center gap-3 text-text-error border-t-2 border-gray-100 cursor-pointer"
          >
            <LuLogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Đăng xuất</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
