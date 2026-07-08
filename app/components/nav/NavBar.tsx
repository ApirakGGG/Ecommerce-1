import Link from "next/link";
import Container from "../Container";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Categories from "./Categories";
import SearchBar from "./SearchBar";
import Image from "next/image";
import Banner from "./Banner";

const NavBar = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="relative">
      {/* Main sticky nav */}
      <div className="sticky top-0 w-full z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <Container>
          {/* Top row: Logo | Search | Actions */}
          <div className="flex items-center justify-between gap-4 py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="relative w-9 h-9 transition-transform duration-300 group-hover:rotate-12">
                <Image src="/react.gif" fill alt="Logo" className="object-contain" />
              </div>
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent select-none">
                APPLE
              </span>
            </Link>

            {/* Search – centered */}
            <div className="hidden md:flex flex-1 max-w-xl mx-4">
              <SearchBar />
            </div>

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
        <div className="border-t border-gray-100 bg-white/60 backdrop-blur-sm">
          <Categories />
        </div>
      </div>

      {/* Banner below sticky nav */}
      <Banner currentUser={currentUser} />
    </div>
  );
};

export default NavBar;
