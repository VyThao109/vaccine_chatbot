import { LuLock, LuShield, LuSyringe } from "react-icons/lu";

const PromoteSide = () => {
  return (
    <div className="hidden lg:flex flex-1 bg-linear-to-br from-teal-600 via-cyan-600 to-blue-700 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 flex flex-col items-center justify-center text-white p-12 text-center w-full">
        <div className="inline-flex items-center justify-center w-32 h-32 bg-white/10 backdrop-blur-md rounded-full mb-8 shadow-2xl">
          <LuSyringe className="w-16 h-16" />
        </div>

        <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-white to-teal-100">
          VaxBot
        </h1>

        <p className="text-xl mb-12 max-w-lg leading-relaxed text-teal-50">
          Trợ lý AI đáng tin cậy cho thông tin và tư vấn vaccine của bạn
        </p>

        <div className="flex gap-12 mt-8">
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3 group-hover:bg-white/20 transition-all duration-300 shadow-lg">
              <LuShield className="w-10 h-10" />
            </div>
            <span className="text-sm font-medium">An Toàn</span>
          </div>

          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3 group-hover:bg-white/20 transition-all duration-300 shadow-lg">
              <LuSyringe className="w-10 h-10" />
            </div>
            <span className="text-sm font-medium">Chuyên Nghiệp</span>
          </div>

          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3 group-hover:bg-white/20 transition-all duration-300 shadow-lg">
              <LuLock className="w-10 h-10" />
            </div>
            <span className="text-sm font-medium">Bảo Mật</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoteSide;
