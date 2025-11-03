import { useNavigate } from "react-router-dom";
import AuthFormLayout from "../../compent/auth/AuthFormLayout";
import { paths } from "../../routes/paths";
import { useState } from "react";
import AuthInput from "../../compent/auth/AuthInput";
import { LuLock, LuMail, LuUser } from "react-icons/lu";
import PromoteSide from "../../compent/auth/PromoteSide";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeTerms?: string;
}

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
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

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "Bạn phải đồng ý với điều khoản";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateForm()) {
      navigate(paths.signin);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-linear-to-br from-teal-50 via-cyan-50 to-blue-50">
      {/* Left Side */}
      <PromoteSide />

      {/* Right Side - Form */}
      <AuthFormLayout
        title={"Tạo Tài Khoản"}
        subtitle={"Đăng ký để trải nghiệm dịch vụ tư vấn vaccine"}
        submitText="Đăng ký"
        onSubmit={handleSubmit}
        footerText={"Đã có tài khoản"}
        footerLinkText={"Đăng nhập ngay"}
        onFooterClick={() => navigate(paths.signin)}
      >
        <div className="space-y-6">
          {/* Full Name Field */}
          <AuthInput
            label={"Họ và Tên"}
            type="text"
            placeholder={"Nguyễn Văn A"}
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            icon={<LuUser className="w-5 h-5" />}
            error={errors.fullName}
          />

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

          {/* Confirm Password Field */}
          <AuthInput
            label={"Xác nhận mật khẩu"}
            type="password"
            placeholder={"••••••••"}
            value={formData.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            icon={<LuLock className="w-5 h-5" />}
            error={errors.confirmPassword}
          />

          {/* Term Agreement */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={(e) => handleChange("agreeTerms", e.target.checked)}
                className={`mt-0.5 w-5 h-5 text-emerald-600 border-2 ${
                  errors.agreeTerms ? "border-red-400" : "border-gray-300"
                } rounded focus:ring-2 focus:ring-emerald-500 cursor-pointer`}
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 leading-relaxed">
                Tôi đồng ý với{" "}
                <button
                  type="button"
                  onClick={() => console.log("Show terms")}
                  className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline"
                >
                  Điều khoản dịch vụ
                </button>{" "}
                và{" "}
                <button
                  type="button"
                  onClick={() => console.log("Show privacy")}
                  className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline"
                >
                  Chính sách bảo mật
                </button>
              </span>
            </label>
            {errors.agreeTerms && (
              <p className="mt-1.5 text-sm text-red-600">{errors.agreeTerms}</p>
            )}
          </div>
        </div>
      </AuthFormLayout>
    </div>
  );
};
export default SignUpPage;
