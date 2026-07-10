'use client';

import Link from "next/link";
import AdminNavItem from "./AdminNavItem";
import { MdAccountBox, MdDashboard, MdDns, MdFormatListBulleted, MdLibraryAdd } from "react-icons/md";
import { usePathname } from "next/navigation";

const AdminNav = () => {
  const pathname = usePathname();

  return (
    <div className="w-full sticky top-0 z-40 bg-[#fdf8f3] border-b border-[#e8ddd3] shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center gap-1 py-3 overflow-x-auto scrollbar-hide">
          {/* Brand label */}
          <span className="text-[#4a3b2c] font-bold text-base tracking-tight mr-4 flex-shrink-0">
            ⚙ Admin
          </span>

          <Link href="/admin">
            <AdminNavItem
              label="Dashboard"
              icon={MdDashboard}
              selected={pathname === "/admin"}
            />
          </Link>

          <Link href="/admin/User-Mange">
            <AdminNavItem
              label="Users"
              icon={MdAccountBox}
              selected={pathname === "/admin/User-Mange"}
            />
          </Link>

          <Link href="/admin/add-products">
            <AdminNavItem
              label="Add Product"
              icon={MdLibraryAdd}
              selected={pathname === "/admin/add-products"}
            />
          </Link>

          <Link href="/admin/manage-products">
            <AdminNavItem
              label="Products"
              icon={MdDns}
              selected={pathname === "/admin/manage-products"}
            />
          </Link>

          <Link href="/admin/manage-orders">
            <AdminNavItem
              label="Orders"
              icon={MdFormatListBulleted}
              selected={pathname === "/admin/manage-orders"}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
