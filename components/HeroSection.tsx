"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDES = [
  "/images/traffic.png",
  "/images/oil-gas.png",
  "/images/manufacturing.png",
];

export function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      
      {/* Background Slider */}
      {SLIDES.map((img, i) => (
        <Image
          key={i}
          src={img}
          alt="hero"
          fill
          priority={i === 0}
          className={`object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-center px-6">
        
        {/* 👇 THIS padding fixes overlap */}
        <div className="max-w-3xl w-full pt-24 md:pt-28 space-y-5">
          
          <h1 className="text-white font-bold leading-tight
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            IoT Security World Summit Abu Dhabi 2026
          </h1>

          <p className="text-gray-300 text-sm sm:text-base md:text-lg">
            9th July 2026 | Abu Dhabi
          </p>

          <h2 className="text-white font-semibold
            text-lg sm:text-xl md:text-2xl">
            Leading the Global Charge Against Next-Gen IoT Threats
          </h2>

          <p className="text-gray-300 text-sm sm:text-base">
            Where Nations Secure the Future. Where Deals Get Done.
          </p>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            A high-impact global platform where government authorities,
            critical infrastructure leaders, and cybersecurity innovators
            converge to secure the world’s most advanced IoT ecosystem.
          </p>

          {/* CTA */}
          <div className="pt-4">
            <button className="px-6 py-3 rounded-full border border-white/30 
              text-white hover:bg-white hover:text-black 
              transition duration-300">
              Register Now
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}