import { motion } from "framer-motion";
import notFoundIllustration from "../../assets/images/page-not-found.svg";
import { useNavigate } from "react-router-dom";
const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-5">
      <img src={notFoundIllustration} className="w-1/4 aspect-auto" alt="" />
      <div className="flex flex-col items-center justify-center gap-2.5">
        <span className="text-primary-black font-extrabold text-center text-base sm:text-2xl">
          Xin lỗi, chúng tôi không tìm thấy trang bạn cần!
        </span>
        <span className="text-text-gray font-normal text-center text-xs sm:text-base">
          Vui lòng thử lại sau
        </span>
      </div>
      <motion.button
        className="px-4 py-3.5 bg-gradient-primary text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-teal-200 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
        transition={{ duration: 0.3 }}
        whileHover={{
          y: -3,
          scale: 1.05,
        }}
        onClick={() => navigate(-1)}
      >
        <span className="font-medium text-sm sm:text-base">
          Quay lại trang trước
        </span>
      </motion.button>
    </div>
  );
};

export default NotFoundPage;
