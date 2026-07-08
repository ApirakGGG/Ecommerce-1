"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  custom?: string;
  icon?: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  disabled,
  outline,
  small,
  custom,
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full flex items-center justify-center gap-2 rounded-xl font-semibold
        transition-all duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${outline
          ? "bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:text-white"
          : "bg-gray-900 text-white border-2 border-gray-900 hover:bg-gray-700"
        }
        ${small ? "text-xs py-1.5 px-3" : "text-sm py-3 px-6"}
        ${custom ?? ""}
      `}
    >
      {Icon && <Icon size={18} />}
      {label}
    </button>
  );
};

export default Button;
