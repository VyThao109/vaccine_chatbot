import { LuLoader } from "react-icons/lu";

const LoadingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="flex gap-3 max-w-3xl">
        <div className="py-4">
          <LuLoader className="w-5 h-5 text-primary-blue-dark animate-spin" />
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
