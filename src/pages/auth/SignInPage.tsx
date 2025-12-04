import { useState } from "react";

import { LuLock, LuMail } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";
import AuthFormLayout from "../../components/auth/AuthFormLayout";
import AuthInput from "../../components/auth/AuthInput";
import PromoteSide from "../../components/auth/PromoteSide";
import { useAppDispatch } from "../../redux/hook";
import { useLoginMutation } from "../../redux/services/auth/auth.service";
import { setCredentials } from "../../redux/features/auth/auth.slice";

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
  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation();

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

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await login({
          email: formData.email,
          password: formData.password,
        }).unwrap();

        if (response.statusCode === 200) {
          dispatch(
            setCredentials({
              accessToken: response.data.token,
            })
          );
          navigate(paths.chat);
        } else {
          alert(response.message || "Đăng nhập thất bại");
        }
      } catch (err: any) {
        console.error("Login failed:", err);
        const errorMsg = err?.data?.message || "Có lỗi xảy ra";
        alert(errorMsg);
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-linear-to-br from-teal-50 via-cyan-50 to-blue-50">
      {/* Left Side - Form */}
      <AuthFormLayout
        title={"Chào mừng trở lại"}
        subtitle={"Đăng nhập vào tài khoản tư vấn vaccine của bạn"}
        submitText={isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
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
                className="w-4 h-4 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900">
                Ghi nhớ đăng nhập
              </span>
            </label>
            <button
              type="button"
              onClick={() => console.log("Forgot password")}
              className="text-sm font-medium text-primary-blue hover:text-primary-blue-light hover:underline cursor-pointer"
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
