"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const slides = [
  "/images/oil-gas.png",
  "/images/traffic.png",
  "/images/manufacturing.png",
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      
      {/* Background Images */}
      {slides.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-0" : "opacity-0 z-0"
          }`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-10" />

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center h-full text-center px-6">
        <div className="max-w-4xl text-white">
          
          {/* Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
            IoT Security World Summit Abu Dhabi 2026
          </h1>

          {/* Date */}
          <p className="mt-4 text-lg md:text-xl text-gray-300">
            9th July 2026 | Abu Dhabi
          </p>

          {/* Tagline */}
          <h2 className="mt-6 text-xl md:text-2xl font-semibold text-cyan-400">
  Leading the Global Charge Against Next-Gen IoT Threats
</h2>

          {/* Description */}
          <p className="mt-4 text-gray-300 text-sm md:text-base leading-relaxed">
            Where Nations Secure the Future. Where Deals Get Done.
            <br /><br />
            A high-impact global platform where government authorities,
            critical infrastructure leaders, and cybersecurity innovators
            converge to secure the world’s most advanced IoT ecosystem.
          </p>

          {/* CTA */}
          <div className="mt-8">
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-3 text-lg rounded-xl shadow-lg shadow-cyan-500/30">
  Register Now
</Button>
          </div>

        </div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3 z-20">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full cursor-pointer transition ${
              current === index ? "bg-cyan-400" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}