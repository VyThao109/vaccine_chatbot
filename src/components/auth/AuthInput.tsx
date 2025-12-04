interface AuthInputProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  required?: boolean;
  error?: string | null;
}

import React from "react";

export default function AuthInput({
  label,
  type,
  placeholder,
  value,
  onChange,
  icon,
  required,
  error,
}: AuthInputProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full py-3.5 pr-4 bg-gray-50 border-2 rounded-2xl text-gray-900
          placeholder-gray-400 focus:outline-none focus:bg-white transition-all duration-200
          ${icon ? "pl-12" : "pl-4"}
          ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
              : "border-gray-200 focus:border-primary-blue-light focus:ring-4 focus:ring-blue-100"
          }`}
        />
      </div>
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
}
