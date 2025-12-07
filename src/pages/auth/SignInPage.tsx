import { useEffect, useState } from "react";

import { LuLock, LuMail } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";
import AuthFormLayout from "../../components/auth/AuthFormLayout";
import AuthInput from "../../components/auth/AuthInput";
import PromoteSide from "../../components/auth/PromoteSide";
import { useAppDispatch } from "../../redux/hook";
import {
  useForgotPassMutation,
  useLoginMutation,
} from "../../redux/services/auth/auth.service";
import { setCredentials } from "../../redux/features/auth/auth.slice";
import GradientButton from "../../components/common/GradientButton";
import { useToast } from "../../hooks/useToast";
import DialogLayout from "../../components/common/DialogLayout";

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
  const { showToast } = useToast();

  const [login, { isLoading }] = useLoginMutation();
  const [forgotPass, { isLoading: isForgotLoading }] = useForgotPassMutation();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState("");

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
          showToast(response.message || "Đăng nhập thất bại", "error");
        }
      } catch (err: any) {
        console.error("Login failed:", err);

        if (err.status === 400 && err.data.data === "User was not found.") {
          showToast("Email hoặc mật khẩu bạn nhập chưa chính xác.", "error");
        } else {
          const errorMsg = err?.data?.message || "Có lỗi xảy ra";
          showToast(errorMsg, "error");
        }
      }
    }
  };

  useEffect(() => {
    setForgotEmail("");
    setForgotError("");
  }, [isForgotPasswordOpen]);

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError("");

    if (!forgotEmail.trim()) {
      setForgotEmail("Vui lòng nhập email để khôi phục mật khẩu");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(forgotEmail)) {
      setForgotError("Email không đúng định dạng");
      return;
    }

    try {
      await forgotPass({ email: forgotEmail }).unwrap();
      setIsForgotPasswordOpen(false);
      setForgotEmail("");
      showToast("Đã gửi mật khẩu mới về email của bạn!", "success", 5000);
    } catch (err: any) {
      console.error("Forgot password failed:", err);
      if (
        err.status === 400 &&
        err.data.data === "Email không tồn tại trong hệ thống."
      ) {
        showToast("Email bạn nhập không tồn tại trong hệ thống.", "error");
      } else {
        const errorMsg = err?.data?.message || "Có lỗi xảy ra";
        showToast(errorMsg, "error");
      }
      const errorMsg =
        err?.data?.data || "Không thể gửi yêu cầu. Vui lòng thử lại.";
      setForgotError(errorMsg);
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
          <div className="flex items-center justify-end">
            {/* <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => handleChange("rememberMe", e.target.checked)}
                className="w-4 h-4 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900">
                Ghi nhớ đăng nhập
              </span>
            </label> */}
            <button
              type="button"
              onClick={() => setIsForgotPasswordOpen(true)}
              className="text-sm font-medium text-primary-blue hover:text-primary-blue-light hover:underline cursor-pointer"
            >
              Quên mật khẩu?
            </button>
          </div>
        </div>
      </AuthFormLayout>

      {/* Right Side - Visual (Hidden on mobile) */}
      <PromoteSide />

      <DialogLayout
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
        type="info"
        icon={<LuLock />}
        title="Khôi phục mật khẩu"
        subtitle="Nhập email của bạn và chúng tôi sẽ gửi cho bạn một mật khẩu mới."
      >
        <form
          onSubmit={handleForgotPasswordSubmit}
          className="space-y-6"
          noValidate
        >
          <AuthInput
            label={"Email đăng ký"}
            type="email"
            placeholder={"example@gmail.com"}
            value={forgotEmail}
            onChange={(e) => {
              setForgotEmail(e.target.value);
              if (forgotError) setForgotError("");
            }}
            icon={<LuMail className="w-5 h-5" />}
            error={forgotError}
          />
          <div className="space-y-3">
            <GradientButton
              type="submit"
              isLoading={isForgotLoading}
              className="mt-2"
            >
              {isForgotLoading ? "Đang gửi..." : "Gửi yêu cầu"}
            </GradientButton>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsForgotPasswordOpen(false)}
                className="text-sm font-medium text-gray-500 hover:text-gray-900 cursor-pointer"
              >
                Quay lại đăng nhập
              </button>
            </div>
          </div>
        </form>
      </DialogLayout>
    </div>
  );
};
export default SignInPage;
