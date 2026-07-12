"use client";
import { Fragment } from "react";
import Avatar from "../avatar";
import { SafeUser } from "@/types";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  MdDashboard,
  MdOutlineShoppingBag,
  MdOutlineInventory2,
  MdOutlineAccountCircle,
  MdLogout,
  MdLogin,
  MdPersonAdd,
} from "react-icons/md";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  return (
    <Popover className="relative z-50">
      {({ open, close }) => (
        <>
          <Popover.Button className="flex items-center gap-2 px-1.5 py-1.5 md:px-3 md:py-2 bg-white rounded-full border border-[#e8ddd3] hover:shadow-md hover:border-[#c8a882] transition-all duration-200 outline-none max-w-[150px] md:max-w-xs group cursor-pointer">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center">
              <Avatar src={currentUser?.image} />
            </div>
            <span className="hidden sm:block text-sm font-semibold text-[#4a3b2c] truncate">
              {currentUser?.name || "สมาชิก"}
            </span>
            <ChevronDownIcon
              className={`h-4 w-4 text-[#a0856a] transition-transform duration-200 ${
                open ? "rotate-180" : "group-hover:translate-y-0.5"
              }`}
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95 translate-y-2"
            enterTo="transform opacity-100 scale-100 translate-y-0"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100 translate-y-0"
            leaveTo="transform opacity-0 scale-95 translate-y-2"
          >
            <Popover.Panel className="absolute right-0 mt-2 w-72 origin-top-right rounded-2xl bg-white shadow-xl shadow-[#e8ddd3]/60 border border-[#e8ddd3] overflow-hidden focus:outline-none">
              {!currentUser ? (
                /* ── Logged Out State ── */
                <div className="p-3 space-y-1">
                  <div className="px-3 py-2 mb-2 text-xs font-medium text-gray-500">
                    ยินดีต้อนรับสู่ Ruby Thrift!
                  </div>
                  <Link
                    href="/login"
                    onClick={() => close()}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-[#4a3b2c] rounded-xl hover:bg-[#fdf8f3] hover:text-[#a0856a] transition-all"
                  >
                    <MdLogin size={20} />
                    เข้าสู่ระบบ (Login)
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => close()}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-[#4a3b2c] rounded-xl hover:bg-[#fdf8f3] hover:text-[#a0856a] transition-all"
                  >
                    <MdPersonAdd size={20} />
                    สมัครสมาชิก (Register)
                  </Link>
                </div>
              ) : (
                /* ── Logged In State ── */
                <div className="flex flex-col">
                  {/* Header / Info */}
                  <div className="px-5 py-4 border-b border-[#e8ddd3] bg-[#fdf8f3]">
                    <p className="text-sm font-bold text-[#4a3b2c] truncate">
                      {currentUser.name}
                    </p>
                    <p className="text-xs text-[#a0856a] truncate mt-0.5 font-medium">
                      {currentUser.email}
                    </p>
                  </div>

                  {/* Normal User Menu */}
                  <div className="p-2 space-y-0.5 border-b border-[#e8ddd3]">
                    <Link
                      href="/profiles"
                      onClick={() => close()}
                      className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-semibold text-[#4a3b2c] rounded-xl hover:bg-[#fdf8f3] transition-colors"
                    >
                      <MdOutlineAccountCircle size={20} className="text-[#a0856a]" />
                      โปรไฟล์ของฉัน
                    </Link>
                    <Link
                      href="/orders"
                      onClick={() => close()}
                      className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-semibold text-[#4a3b2c] rounded-xl hover:bg-[#fdf8f3] transition-colors"
                    >
                      <MdOutlineShoppingBag size={20} className="text-[#a0856a]" />
                      ประวัติการสั่งซื้อ
                    </Link>
                  </div>

                  {/* Admin Only Menu */}
                  {currentUser.role === "ADMIN" && (
                    <div className="p-2 space-y-0.5 border-b border-[#e8ddd3] bg-amber-50/30">
                      <div className="px-3 py-1.5 mb-1 text-[10px] font-bold text-amber-600 uppercase tracking-widest flex items-center gap-2">
                        <div className="h-px bg-amber-200 flex-1"></div>
                        Admin Tools
                        <div className="h-px bg-amber-200 flex-1"></div>
                      </div>
                      <Link
                        href="/admin"
                        onClick={() => close()}
                        className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-amber-900 rounded-xl hover:bg-amber-100/50 transition-colors"
                      >
                        <MdDashboard size={20} className="text-amber-600" />
                        แดชบอร์ด
                      </Link>
                      <Link
                        href="/admin/manage-products"
                        onClick={() => close()}
                        className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-amber-900 rounded-xl hover:bg-amber-100/50 transition-colors"
                      >
                        <MdOutlineInventory2 size={20} className="text-amber-600" />
                        จัดการสินค้าทั้งหมด
                      </Link>
                      <Link
                        href="/admin/manage-orders"
                        onClick={() => close()}
                        className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-amber-900 rounded-xl hover:bg-amber-100/50 transition-colors"
                      >
                        <MdOutlineShoppingBag size={20} className="text-amber-600" />
                        จัดการออเดอร์ลูกค้า
                      </Link>
                    </div>
                  )}

                  {/* Logout Footer */}
                  <div className="p-2">
                    <button
                      onClick={() => {
                        signOut();
                        close();
                      }}
                      className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-bold text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                    >
                      <MdLogout size={20} className="text-red-500" />
                      ออกจากระบบ
                    </button>
                  </div>
                </div>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default UserMenu;
