"use client";
import { menu } from "@/untils/Menu";
import Container from "../Container";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { IconType } from "react-icons";

interface MenuItemProps {
  label: string;
  icon: IconType;
  href: string;
  active?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  label,
  icon: Icon,
  href,
  active,
}) => (
  <Link href={href}>
    <div
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
        whitespace-nowrap cursor-pointer transition-colors duration-200
        ${
          active
            ? "bg-[#a0856a] text-white"
            : "text-[#a0856a] hover:bg-[#f5ebd9] hover:text-[#5c4a3d]"
        }
      `}
    >
      <Icon size={15} />
      <span>{label}</span>
    </div>
  </Link>
);

const hrefMap: Record<string, string> = {
  หน้าแรก: "/",
  เกี่ยวกับเรา: "/about",
  ติดต่อเรา: "/contact",
};

const Menu = () => {
  const pathname = usePathname();

  const allowedPaths = ["/", "/about", "/contact"];
  if (!allowedPaths.includes(pathname ?? "")) return null;

  return (
    <div className="border-t bg-transparent border-[#e8ddd3] ">
      <Container>
        <div className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-hide">
          {menu.map((item) => (
            <MenuItem
              key={item.label}
              label={item.label}
              icon={item.icon}
              href={hrefMap[item.label] ?? "/"}
              active={pathname === (hrefMap[item.label] ?? "/")}
            />
          ))}
          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <SearchBar />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Menu;
