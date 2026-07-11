"use client";
import { Fragment } from "react";
import Avatar from "../avatar";
import { SafeUser } from "@/types";
import { signOut } from "next-auth/react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon, PhoneIcon } from "@heroicons/react/20/solid";
import {
  ChartPieIcon,
  ListBulletIcon,
  SquaresPlusIcon,
  DocumentMagnifyingGlassIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {

  const userProfiles = [
    {
      name: "User Profile",
      href: "/profiles",
    },
  ];

  const solutions = [
    {
      name: "Dasboard",
      description: "Get a better understanding of your Dasboard",
      href: "/admin",
      icon: ChartPieIcon,
    },
    {
      name: "Add-Products",
      description:
        " add descriptive content about the products on a marketplace",
      href: "../admin/add-products",
      icon: SquaresPlusIcon,
    },
    {
      name: "Manage-Products",
      description:
        " managing information related to products that a business market",
      href: "../admin/manage-products",
      icon: DocumentMagnifyingGlassIcon,
    },
    {
      name: "Manage-Orders",
      description: "Build yourr order for customer",
      href: "../admin/manage-orders",
      icon: ListBulletIcon,
    },
  ];

  const Usersolutions = [
    {
      name: "Home Page",

      href: "/",
    },
    {
      name: "Profiles",

      href: "/profiles",
    },
    {
      name: "Cart",

      href: "/cart",
    },
    {
      name: "Orders",

      href: "/orders",
    },
  ];

  const callsToAction = [
    { name: "Contact ", href: "/sendemail", icon: PhoneIcon },
    { name: "SignOut ", onClick: signOut, icon: ArrowLeftStartOnRectangleIcon },
  ];

  const UseToAction = [
    { name: "Log In ", href: "/login" },
    { name: "Register ", href: "/register" },
  ];

  const allowedSolutionNames = [
    "Dasboard",
    "Add-Products",
    "Manage-Products",
    "Manage-Orders",
  ];

  const adminSolutions = solutions.filter((item) =>
    currentUser?.role === "ADMIN"
      ? true
      : allowedSolutionNames.includes(item.name)
  );

  return (
    <Popover className="relative z-10 ">
      <Popover.Button className="inline-flex z-10  items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 mt-1 ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300">
        <Avatar src={currentUser?.image} />
        <span className="font-semibold ml-3">{currentUser?.name}</span>
        <ChevronDownIcon
          className="h-5 w-5 animate-bounce animate-duration-[2000ms]"
          aria-hidden="true"
        />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute right-0 z-10 mt-5 flex w-screen max-w-max translate-x-0 px-5">
          <div className="w-full max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-2 ring-yellow-500   ">
            <div className="p-4">
              {currentUser &&
                userProfiles.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300"
                  >
                    <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <Avatar src={currentUser?.image} />
                    </div>
                    <div>
                      <a
                        href={item.href}
                        className="font-semibold text-gray-900"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{currentUser?.name}</p>
                    </div>
                  </div>
                ))}
            </div>
            {currentUser && <hr className="underline" />}

            <div className="p-4">
              {currentUser?.role === "ADMIN" &&
                adminSolutions.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300"
                  >
                    <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon
                        className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <a
                        href={item.href}
                        className="font-semibold text-gray-900"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
            </div>

            <div className="p-2 items-start">
              {currentUser &&
                Usersolutions.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex gap-x-6 rounded-lg p-2 hover:bg-gray-50 ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300"
                  >
                    <div className="mt-1 flex h-2 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"></div>
                    <div>
                      <a
                        href={item.href}
                        className="font-semibold text-gray-900 "
                      >
                        {item.name}
                        <span className="absolute inset-0 " />
                      </a>
                    </div>
                  </div>
                ))}
            </div>

            <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50 items-center cursor-pointer">
              {currentUser &&
                callsToAction.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={item.onClick as any}
                    className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-red-200 rounded-full"
                  >
                    <item.icon
                      className="h-5 w-5 flex-none text-green-950"
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
            </div>

            <div className="items-center text-center left-5 ">
              {!currentUser && (
                <a href="">
                  Click <span className="underline text-blue-400">Login</span>{" "}
                  <span>or</span>{" "}
                  <span className="underline text-blue-400">Register.</span>{" "}
                </a>
              )}
            </div>

            <div className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 ">
              {!currentUser &&
                UseToAction.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex flex-none items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100 border border-yellow-500 rounded-md"
                  >
                    <div className="items-center justify-center text-balance">
                      <ChevronDownIcon
                        className="h-5 w-5 animate-bounce animate-duration-[2000ms] items-center place-items-center"
                        aria-hidden="true"
                      />
                      {item.name}
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default UserMenu;
