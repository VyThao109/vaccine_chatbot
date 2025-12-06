import React from "react";
import { LuLoaderCircle } from "react-icons/lu";

interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const GradientButton = ({
  children,
  isLoading = false,
  className = "",
  disabled,
  leftIcon,
  rightIcon,
  ...props
}: GradientButtonProps) => {
  return (
    <button
      disabled={isLoading || disabled}
      className={`
        /* Base Layout */
        w-full py-3 px-6 flex items-center justify-center gap-2
        rounded-2xl font-semibold text-white cursor-pointer
        
        /* Background & Shadow */
        bg-gradient-primary shadow-lg
        
        /* Interactions / Animations */
        transform transition-all duration-200
        hover:shadow-xl hover:scale-[1.02] hover:from-teal-600 hover:to-cyan-700 hover:brightness-105
        active:scale-[0.98]
        
        /* Focus State */
        focus:outline-none focus:ring-4 focus:ring-teal-200
        
        /* Disabled / Loading State */
        disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none

        ${className}
      `}
      {...props}
    >
      {isLoading && <LuLoaderCircle className="w-5 h-5 animate-spin" />}

      {!isLoading && leftIcon && <span>{leftIcon}</span>}

      <span>{children}</span>

      {!isLoading && rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};

export default GradientButton;
