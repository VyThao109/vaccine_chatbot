import { motion } from "framer-motion";
import forbiddenIllustration from "../../assets/images/forbidden.svg";
import { signOut } from "../../redux/features/auth/auth.slice";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";
import { useAppDispatch } from "../../redux/hook";

const ForbiddenPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(signOut());
    navigate(paths.signin);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-5">
      <img
        src={forbiddenIllustration}
        className="w-1/3 sm:w-1/5 md:w-1/6 aspect-auto"
        alt=""
      />
      <div className="flex flex-col items-center justify-center gap-2.5">
        <span className="text-primary-black font-extrabold text-center text-base sm:text-lg md:text-2xl">
          Bạn không có quyền truy cập vào trang này
        </span>
        <span className="text-text-gray font-normal text-center text-xs sm:text-sm md:text-base">
          Vui lòng đăng nhập với tài khoản có quyền truy cập hoặc liên hệ quản
          trị viên.
        </span>
      </div>
      <motion.button
        className="flex items-center justify-center gap-2.5 px-4 py-3 border-2 border-primary-color bg-primary-color text-white rounded-lg shadow-md cursor-pointer"
        transition={{ duration: 0.3 }}
        whileHover={{
          y: -3,
          scale: 1.05,
        }}
        onClick={handleSignout}
      >
        <span className="font-medium text-sm sm:text-base">Đăng xuất</span>
      </motion.button>
    </div>
  );
};

export default ForbiddenPage;
