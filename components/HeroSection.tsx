"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    image: "/images/traffic.png",
    title: "Smart Traffic Intelligence",
    subtitle:
      "AI-powered IoT systems transforming urban mobility, reducing congestion, enhancing real-time traffic monitoring, and enabling smarter, safer city infrastructure.",
  },
  {
    image: "/images/oil-gas.png",
    title: "Intelligent Oil & Gas Operations",
    subtitle:
      "Advanced IoT solutions enabling real-time monitoring, predictive maintenance, asset optimization, and enhanced safety across complex industrial environments.",
  },
  {
    image: "/images/manufacturing.png",
    title: "Smart Manufacturing Revolution",
    subtitle:
      "Connected machines and intelligent automation driving efficiency, reducing downtime, improving quality control, and enabling fully data-driven production systems.",
  },
];

export function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">

      {/* Background Slider */}
      <div className="absolute inset-0 -z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[index].image}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={slides[index].image}
              alt="hero-bg"
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="text-center px-6 max-w-5xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            {/* Premium Badge */}
            <div className="mb-6 px-4 py-2 rounded-full border border-cyan-400/30 bg-white/5 backdrop-blur-md text-sm text-cyan-300">
              Future of IoT Security
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {slides[index].title}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-gray-300 max-w-2xl mb-10 leading-relaxed">
              {slides[index].subtitle}
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {/* Primary Button */}
              <button className="group relative px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-medium text-base flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-300">
                <span className="relative z-10">Register Now</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition" />

                {/* Subtle Glow */}
                <div className="absolute inset-0 rounded-lg bg-cyan-400/20 blur-lg opacity-0 group-hover:opacity-100 transition"></div>
              </button>

              {/* Secondary Button */}
              <button className="px-6 py-3 rounded-lg border border-white/20 text-white font-medium text-base backdrop-blur-md hover:bg-white/10 transition-all">
                Explore Event
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 flex gap-3">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full cursor-pointer transition-all ${i === index ? "bg-cyan-400 w-6" : "bg-gray-500"
              }`}
          />
        ))}
      </div>
    </section>
  );
}