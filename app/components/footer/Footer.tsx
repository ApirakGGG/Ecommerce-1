import Link from "next/link";
import Container from "../Container";
import { MdFacebook } from "react-icons/md";
import { AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-400 text-sm mt-20">
      {/* Top gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <div>
              <span className="text-2xl font-black bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                APPLE
              </span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
              Apple Inc. is an American multinational technology company
              headquartered in Cupertino, California — the world&apos;s largest
              company by market cap.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-1">
              <Link
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-blue-600 hover:text-white transition-all duration-200"
              >
                <MdFacebook size={18} />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-sky-500 hover:text-white transition-all duration-200"
              >
                <AiFillTwitterCircle size={18} />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-pink-600 hover:text-white transition-all duration-200"
              >
                <AiFillInstagram size={18} />
              </Link>
            </div>
          </div>

          {/* Shop */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-semibold text-xs uppercase tracking-widest mb-1">
              Shop
            </h3>
            {["iPhone", "iPad", "MacBook", "AirPods", "Watch"].map((item) => (
              <Link
                key={item}
                href="/"
                className="hover:text-white transition-colors duration-150"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Support */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-semibold text-xs uppercase tracking-widest mb-1">
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
                className="hover:text-white transition-colors duration-150"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Account */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-semibold text-xs uppercase tracking-widest mb-1">
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
                className="hover:text-white transition-colors duration-150"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">
            © {currentYear} Apple Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-600">
            <Link href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Terms of Use</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Legal</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
