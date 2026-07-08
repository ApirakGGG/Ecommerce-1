/* eslint-disable @next/next/no-img-element */
"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { categories } from "@/untils/Categories";
import Category from "../components/nav/Category";
import {
  usePathname,
  useSearchParams,
} from "next/dist/client/components/navigation";
import SearchBar from "../components/nav/SearchBar";

type Anchor = "top" | "left" | "bottom" | "right";

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "right" ? "auto" : 320 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <div className="ml-3 relative  z-30 ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300">
          <span className="font-semibold">Choose Categories</span>
        </div>
        <div className="hidden md:block mt-2">
          <SearchBar />
        </div>
        <div className="mt-3 pt-4 flex flex-col items-center justify-start overflow-x-auto text-black   ">
          {categories.map((item) => (
            <Category
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected={
                category === item.label ||
                (category === null && item.label === "All")
              }
            />
          ))}
        </div>
        
      </List>
      <Divider />
    </Box>
  );

  const params = useSearchParams();
  const category = params?.get("category");

  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) return null;

  return (
    <div>
      <Button
        className="ml-9 mt-3 border border-slate-600 rounded-md"
        onClick={toggleDrawer("left", true)}
      >
        <ArrowCircleRightIcon className="h-8 w-8 animate-bounce animate-duration-[2000ms]" />
        <span className="ml-4 flex-none rounded-full bg-yellow-200 px-3.5 py-1 text-sm font-semibold text-slate-800 shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300">
          Categories
        </span>
      </Button>
      <Drawer
        anchor="left"
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </div>
  );
}
