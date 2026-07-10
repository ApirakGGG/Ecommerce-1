"use client";

import { IconType } from "react-icons";

interface CategoriesInputProps {
  selected?: boolean;
  label: string;
  icon?: IconType | string | null;
  onClick: (value: string) => void;
}

const CategoriesInput: React.FC<CategoriesInputProps> = ({
  selected,
  label,
  icon,
  onClick,
}) => {
  const isString = typeof icon === "string";
  const IconComponent = !isString && icon ? (icon as IconType) : null;

  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl border-2 p-4 flex flex-col items-center
    gap-2 hover:border-slate-500 transition cursor-pointer
    ${selected ? "border-slate-500" : "border-slate-200"}
    `}
    >
      {isString ? (
        <span className="text-[30px] leading-none">{icon}</span>
      ) : IconComponent ? (
        <IconComponent size={30} />
      ) : null}
      <div className="font-medium text-center text-sm">{label}</div>
    </div>
  );
};

export default CategoriesInput;
