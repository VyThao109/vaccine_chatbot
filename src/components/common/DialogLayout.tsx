import React, { useEffect, useRef } from "react";
import { LuX } from "react-icons/lu";

// Định nghĩa các loại dialog để map màu sắc
export type DialogType = "success" | "error" | "warning" | "info";

interface DialogLayoutProps {
  isOpen: boolean;
  onClose: () => void;
  type?: DialogType; // Mặc định là 'info' nếu không truyền
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

const DialogLayout = ({
  isOpen,
  onClose,
  type = "info",
  icon,
  title,
  subtitle,
  children,
  maxWidth = "max-w-md",
}: DialogLayoutProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const colorStyles = {
    success: "bg-green-100 text-green-600",
    error: "bg-red-100 text-red-600",
    warning: "bg-amber-100 text-amber-600",
    info: "bg-blue-100 text-blue-600",
  };

  const colorDarkerStyles = {
    success: "bg-green-200",
    error: "bg-red-200",
    warning: "bg-amber-200",
    info: "bg-blue-200",
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div
        ref={contentRef}
        className={`
          relative w-full ${maxWidth} bg-white rounded-2xl shadow-xl 
          p-6 transform transition-all 
          animate-in fade-in zoom-in-95 duration-200
        `}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <LuX className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${colorStyles[type]}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${colorDarkerStyles[type]}`}
            >
              <div className="w-4 h-4 flex items-center justify-center">
                {icon}
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>

          {subtitle && (
            <p className="text-sm text-gray-500 mb-6 px-2">{subtitle}</p>
          )}

          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DialogLayout;
