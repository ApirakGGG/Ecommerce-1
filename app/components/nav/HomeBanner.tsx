"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const slides = [
  
  {
    id: 1,
    badge: "Free Shipping",
    title: "ORDER",
    highlight: "฿999+",
    subtitle: "Get free delivery on all orders over ฿999.",
    sub2: "Limited time — shop while it lasts!",
    ctaHref: "/products",
    image: "/Banner.PNG",
    bg: "from-[#fdf6ec] via-[#f5e8d5] to-[#eddfc8]",
    badgeColor: "bg-[#8b5e3c]/15 border-[#8b5e3c]/30 text-[#5c3d1e]",
    dotColor: "bg-[#c8a882]",
    titleColor: "text-[#3d2a1a]",
    highlightFrom: "from-[#c8843a] via-[#a0622a] to-[#7a4520]",
    subtitleColor: "text-[#7a5c3a]",
    btnPrimary: "bg-[#8b5e3c] text-white hover:bg-[#6d4a2f] shadow-[#8b5e3c]/30",
    btnSecondary: "border-[#8b5e3c]/40 text-[#5c3d1e] hover:bg-[#8b5e3c]/10",
    glowLeft: "bg-[#e8c49a] opacity-20",
    glowRight: "bg-[#d4a86e] opacity-20",
  },
  {
    id: 2,
    badge: "Members Only",
    title: "JOIN",
    highlight: "US NOW",
    subtitle: "Sign up and unlock exclusive discounts.",
    sub2: "Early access to new collections.",
    ctaHref: "/register",
    image: "/Banner.PNG",
    bg: "from-[#f9f0e3] via-[#f0e4d0] to-[#e8d5ba]",
    badgeColor: "bg-[#8b5e3c]/15 border-[#8b5e3c]/30 text-[#5c3d1e]",
    dotColor: "bg-[#c8a882]",
    titleColor: "text-[#3d2a1a]",
    highlightFrom: "from-[#c8843a] via-[#a0622a] to-[#7a4520]",
    subtitleColor: "text-[#7a5c3a]",
    btnPrimary: "bg-[#8b5e3c] text-white hover:bg-[#6d4a2f] shadow-[#8b5e3c]/30",
    btnSecondary: "border-[#8b5e3c]/40 text-[#5c3d1e] hover:bg-[#8b5e3c]/10",
    glowLeft: "bg-[#d4b896] opacity-20",
    glowRight: "bg-[#c4a07a] opacity-20",
  },
];

const HomeBanner = () => {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent((index + slides.length) % slides.length);
        setIsAnimating(false);
      }, 350);
    },
    [isAnimating]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <div
      className={`relative overflow-hidden rounded-3xl mb-10 bg-gradient-to-br ${slide.bg} shadow-2xl transition-all duration-700`}
    >
      {/* Glowing orb effects */}
      <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl pointer-events-none ${slide.glowLeft}`} />
      <div className={`absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-3xl pointer-events-none ${slide.glowRight}`} />

      {/* Slide content */}
      <div
        className={`relative mx-auto px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-8 transition-opacity duration-350 ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Text content */}
        <div className="flex flex-col items-start gap-5 max-w-lg z-10">
          {/* Badge */}
          <span
            className={`inline-flex items-center gap-2 border text-xs font-semibold px-4 py-1.5 rounded-full backdrop-blur-sm tracking-widest uppercase ${slide.badgeColor}`}
          >
            <span className={`w-2 h-2 rounded-full animate-pulse ${slide.dotColor}`} />
            {slide.badge}
          </span>

          <h1 className={`text-5xl md:text-7xl font-black leading-none tracking-tight ${slide.titleColor}`}>
            {slide.title}
            <br />
            <span className={`bg-gradient-to-r ${slide.highlightFrom} bg-clip-text text-transparent`}>
              {slide.highlight}
            </span>
          </h1>

          <p className={`text-lg font-light leading-relaxed ${slide.subtitleColor}`}>
            {slide.subtitle} <br />
            <span className="font-medium">{slide.sub2}</span>
          </p>

          <div className="flex gap-4 mt-2">
            <button
              onClick={() => router.push("/")}
              className={`px-6 py-3 border font-semibold rounded-full text-sm transition-all duration-300 backdrop-blur-sm ${slide.btnSecondary}`}
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Product image */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0 z-10">
          <div className="absolute inset-0 rounded-full bg-[#c8843a]/20 blur-2xl scale-90" />
          <Image
            src={slide.image}
            fill
            alt="Banner"
            className="object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Prev / Next Arrows
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/50 hover:bg-white/80 text-[#5c3d1e] transition shadow-md"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/50 hover:bg-white/80 text-[#5c3d1e] transition shadow-md"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button> */}

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-[#8b5e3c]" : "w-2 bg-[#8b5e3c]/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Bottom shimmer strip */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#8b5e3c]/30 to-transparent" />
    </div>
  );
};

export default HomeBanner;
