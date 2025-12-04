import { LuShield } from "react-icons/lu";

interface AuthFormLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  submitText: string;
  onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  footerText: string;
  footerLinkText: string;
  onFooterClick: () => void;
}

export default function AuthFormLayout({
  title,
  subtitle,
  children,
  submitText,
  onSubmit,
  footerText,
  footerLinkText,
  onFooterClick,
}: AuthFormLayoutProps) {
  return (
    <div className="flex-1 flex items-center justify-center p-6 md:p-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-background p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              <LuShield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
            <p className="text-teal-50">{subtitle}</p>
          </div>

          {/* Form */}
          <div className="p-8 space-y-6">
            {children}

            {/* Submit Button */}
            <button
              onClick={onSubmit}
              className="w-full py-3.5 bg-gradient-primary text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-teal-200 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              {submitText}
            </button>

            {/* Footer */}
            <div className="text-center pt-4">
              <span className="text-sm text-gray-600">{footerText}</span>
              <button
                type="button"
                onClick={onFooterClick}
                className="text-sm font-semibold text-primary-blue hover:text-primary-blue-light hover:underline ml-1 cursor-pointer"
              >
                {footerLinkText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
