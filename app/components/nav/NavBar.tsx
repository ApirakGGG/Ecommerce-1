import Link from "next/link";
import Container from "../Container";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Categories from "./Categories";
import Image from "next/image";
import Banner from "./Banner";
import Menu from "./Menu ";

const NavBar = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="relative">
      {/* Main sticky nav */}
      <div className="sticky top-0 w-full z-30 bg-[#fdf8f3]/90 backdrop-blur-md border-b border-[#e8ddd3] shadow-sm">
        <Container>
          {/* Top row: Logo | Search | Actions */}
          <div className="flex items-center justify-between gap-4 py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="relative w-9 h-9 transition-transform duration-300 group-hover:rotate-12">
                <Image src="/react.gif" fill alt="Logo" className="object-contain" />
              </div>
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-[#5c4a3d] to-[#a0856a] bg-clip-text text-transparent select-none">
                APPLE
              </span>
            </Link>

            {/* Right actions */}
            <div className="flex items-center gap-4">
              <div className="transition-all duration-200 hover:-translate-y-0.5 hover:scale-105">
                <CartCount />
              </div>
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>

        {/* Category bar */}
        <div className="border-t border-[#e8ddd3] bg-[#fdf8f3]/80 backdrop-blur-sm">
          <Menu />
        </div>
      </div>

      {/* Banner below sticky nav */}
      <Banner currentUser={currentUser} />
    </div>
  );
};

export default NavBar;
