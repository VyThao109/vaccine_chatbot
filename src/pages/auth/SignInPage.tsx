import { useState } from "react";

import { LuLock, LuMail } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";
import AuthFormLayout from "../../compent/auth/AuthFormLayout";
import AuthInput from "../../compent/auth/AuthInput";
import PromoteSide from "../../compent/auth/PromoteSide";

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  rememberMe?: string;
}

const SignInPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateForm()) {
      navigate(paths.chat);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-linear-to-br from-teal-50 via-cyan-50 to-blue-50">
      {/* Left Side - Form */}
      <AuthFormLayout
        title={"Chào mừng trở lại"}
        subtitle={"Đăng nhập vào tài khoản tư vấn vaccine của bạn"}
        submitText="Đăng nhập"
        onSubmit={handleSubmit}
        footerText={"Chưa có tài khoản"}
        footerLinkText={"Đăng ký ngay"}
        onFooterClick={() => navigate(paths.signup)}
      >
        <div className="space-y-6">
          {/* Email Field */}
          <AuthInput
            label={"Địa chỉ Email"}
            type="email"
            placeholder={"your.email@example.com"}
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            icon={<LuMail className="w-5 h-5" />}
            error={errors.email}
          />

          {/* Password Field */}
          <AuthInput
            label={"Mật khẩu"}
            type="password"
            placeholder={"••••••••"}
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            icon={<LuLock className="w-5 h-5" />}
            error={errors.password}
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => handleChange("rememberMe", e.target.checked)}
                className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-2 focus:ring-teal-500 cursor-pointer"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900">
                Ghi nhớ đăng nhập
              </span>
            </label>
            <button
              type="button"
              onClick={() => console.log("Forgot password")}
              className="text-sm font-medium text-teal-600 hover:text-teal-700 hover:underline cursor-pointer"
            >
              Quên mật khẩu?
            </button>
          </div>
        </div>
      </AuthFormLayout>

      {/* Right Side - Visual (Hidden on mobile) */}
      <PromoteSide />
    </div>
  );
};
export default SignInPage;
