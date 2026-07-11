import Link from "next/link";
import Container from "../Container";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Image from "next/image";
import Menu from "./Menu ";

const NavBar = async () => {
  const currentUser = await getCurrentUser();

  return (
    <>
      {/* Main sticky nav */}
      <div className="sticky top-0 w-full z-30 bg-[#fdf8f3]/90 backdrop-blur-md border-b border-[#e8ddd3] shadow-sm">
        <Container>
          {/* Top row: Logo | Search | Actions */}
          <div className="flex items-center justify-between gap-4 py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="hidden md:block relative w-20 h-20 transition-transform duration-300 group-hover:rotate-12">
                <Image src="/logo.png" alt="Logo" className="object-contain" width={500} height={500} />
              </div>
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-[#5c4a3d] to-[#a0856a] bg-clip-text text-transparent select-none">
                Ruby Thrift
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

    </>
  );
};

export default NavBar;
