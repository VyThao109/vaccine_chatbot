import notFoundIllustration from "../../assets/images/page-not-found.svg";
import { useNavigate } from "react-router-dom";
import GradientButton from "../../components/common/GradientButton";
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
      <div>
        <GradientButton onClick={() => navigate(-1)}>
          Quay lại trang trước
        </GradientButton>
      </div>
    </div>
  );
};

export default NotFoundPage;
