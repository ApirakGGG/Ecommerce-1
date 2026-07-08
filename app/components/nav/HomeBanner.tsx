"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HomeBanner = () => {
  const router = useRouter();

  return (
    <div className="relative overflow-hidden rounded-3xl mb-10 bg-gradient-to-br from-gray-950 via-gray-900 to-slate-800 shadow-2xl">
      {/* Glowing orb effects */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600 opacity-20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-violet-600 opacity-20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Text content */}
        <div className="flex flex-col items-start gap-5 max-w-lg z-10">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full backdrop-blur-sm tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            New Arrival 2026
          </span>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight">
            APPLE
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              iPHONE
            </span>
          </h1>

          <p className="text-gray-300 text-lg font-light leading-relaxed">
            Titanium. So strong. So light. So Pro. <br />
            <span className="text-white font-medium">Designed to last forever.</span>
          </p>

          <div className="flex gap-4 mt-2">
            <button
              onClick={() => router.push("/")}
              className="px-6 py-3 bg-white text-gray-900 font-bold rounded-full text-sm hover:bg-blue-400 hover:text-white transition-all duration-300 shadow-lg hover:shadow-blue-400/40"
            >
              Shop Now
            </button>
            <button
              onClick={() => router.push("/")}
              className="px-6 py-3 border border-white/30 text-white font-semibold rounded-full text-sm hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Product image */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0 z-10">
          {/* Glow behind image */}
          <div className="absolute inset-0 rounded-full bg-blue-500/30 blur-2xl scale-90" />
          <Image
            src="/banner-image.png"
            fill
            alt="iPhone Banner"
            className="object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Bottom shimmer strip */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
};

export default HomeBanner;
