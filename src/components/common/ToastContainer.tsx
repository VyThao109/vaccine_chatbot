import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  removeToast,
  type IToast,
} from "../../redux/features/toast/toast.slice";
import {
  LuCircleCheck,
  LuCircleX,
  LuInfo,
  LuTriangleAlert,
  LuX,
} from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";

const toastIcons = {
  success: <LuCircleCheck className="w-6 h-6 text-green-500" />,
  error: <LuCircleX className="w-6 h-6 text-red-500" />,
  warning: <LuTriangleAlert className="w-6 h-6 text-amber-500" />,
  info: <LuInfo className="w-6 h-6 text-blue-500" />,
};

const toastStyles = {
  success: "border-l-4 border-green-500",
  error: "border-l-4 border-red-500",
  warning: "border-l-4 border-amber-500",
  info: "border-l-4 border-blue-500",
};

const ToastItem = ({ id, type, message, duration = 3000 }: IToast) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeToast(id));
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, dispatch]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.9 }} // Bắt đầu: Mờ, dịch lên trên
      animate={{ opacity: 1, y: 0, scale: 1 }} // Hiện tại: Rõ, đúng vị trí
      exit={{ opacity: 0, x: 100, scale: 0.9 }} // Kết thúc: Trượt sang phải biến mất
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 500,
        damping: 30,
      }}
      className={`
        relative w-full max-w-sm flex items-start gap-3 p-4 
        bg-white rounded-lg pointer-events-auto backdrop-blur-md
        ${toastStyles[type]}
      `}
    >
      <div className="shrink-0 mt-0.5">{toastIcons[type]}</div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-900 capitalize mb-0.5">
          {type === "info"
            ? "Thông báo"
            : type === "error"
            ? "Lỗi"
            : type === "warning"
            ? "Cảnh báo"
            : "Thành công"}
        </h4>
        <p className="text-sm text-gray-600 leading-snug wrap-break-word">
          {message}
        </p>
      </div>
      <button
        onClick={() => dispatch(removeToast(id))}
        className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
      >
        <LuX className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

const ToastContainer = () => {
  const toasts = useAppSelector((state) => state.toast.toasts);

  return (
    <div className="fixed top-4 right-4 z-9999 flex flex-col gap-3 pointer-events-none w-full max-w-sm p-4 sm:p-0">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} {...toast} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
