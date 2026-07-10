import { IconType } from "react-icons";

interface AdminNavItemProps {
  selected?: boolean;
  icon: IconType;
  label: string;
}

const AdminNavItem: React.FC<AdminNavItemProps> = ({
  selected,
  icon: Icon,
  label,
}) => {
  return (
    <div
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
        transition-all duration-200 cursor-pointer whitespace-nowrap
        ${
          selected
            ? "bg-[#a0856a] text-white shadow-sm"
            : "text-[#a0856a] hover:text-[#5c4a3d] hover:bg-[#f5ebd9]"
        }
      `}
    >
      <Icon size={16} />
      <span>{label}</span>
    </div>
  );
};

export default AdminNavItem;
