import Link from "next/link";
import Container from "../Container";
import { MdFacebook } from "react-icons/md";
import { AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#f5ebd9] border-t border-[#e8ddd3] text-[#7a5c3a] text-sm mt-20">
      {/* Top gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#a0856a]/30 to-transparent" />

      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <div>
              <span className="text-2xl font-black bg-gradient-to-r from-[#5c4a3d] to-[#a0856a] bg-clip-text text-transparent">
                APPLE
              </span>
            </div>
            <p className="text-[#a0856a] text-xs leading-relaxed">
              Apple Inc. is an American multinational technology company
              headquartered in Cupertino, California — the world&apos;s largest
              company by market cap.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-1">
              <Link
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#e8ddd3] hover:bg-[#a0856a] hover:text-white transition-all duration-200 text-[#7a5c3a]"
              >
                <MdFacebook size={18} />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#e8ddd3] hover:bg-[#a0856a] hover:text-white transition-all duration-200 text-[#7a5c3a]"
              >
                <AiFillTwitterCircle size={18} />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#e8ddd3] hover:bg-[#a0856a] hover:text-white transition-all duration-200 text-[#7a5c3a]"
              >
                <AiFillInstagram size={18} />
              </Link>
            </div>
          </div>

          {/* Shop */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[#5c4a3d] font-bold text-xs uppercase tracking-widest mb-1">
              Shop
            </h3>
            {["iPhone", "iPad", "MacBook", "AirPods", "Watch"].map((item) => (
              <Link
                key={item}
                href="/"
                className="hover:text-[#5c4a3d] transition-colors duration-150"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Support */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[#5c4a3d] font-bold text-xs uppercase tracking-widest mb-1">
              Support
            </h3>
            {[
              { label: "Contact Us", href: "/sendemail" },
              { label: "Shipping Policy", href: "#" },
              { label: "Returns", href: "#" },
              { label: "FAQs", href: "#" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-[#5c4a3d] transition-colors duration-150"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Account */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[#5c4a3d] font-bold text-xs uppercase tracking-widest mb-1">
              Account
            </h3>
            {[
              { label: "My Profile", href: "/profiles" },
              { label: "My Orders", href: "/orders" },
              { label: "Cart", href: "/cart" },
              { label: "Log In", href: "/login" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-[#5c4a3d] transition-colors duration-150"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#e8ddd3] py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[#a0856a] text-xs">
            © {currentYear} Apple Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-[#a0856a]">
            <Link href="#" className="hover:text-[#5c4a3d] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#5c4a3d] transition-colors">Terms of Use</Link>
            <Link href="#" className="hover:text-[#5c4a3d] transition-colors">Legal</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
