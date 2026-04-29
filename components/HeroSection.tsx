"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  "/images/oil-gas.png",
  "/images/traffic.png",
  "/images/manufacturing.png",
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden">

      {/* 🔥 Animated Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${slides[current]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-10" />

      {/* 🔥 Content Animation */}
      <div className="relative z-20 flex items-center justify-center h-full text-center px-6">
        <motion.div
          className="max-w-4xl text-white"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >

          {/* Title */}
          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            IoT Security World Summit Abu Dhabi 2026
          </motion.h1>

          {/* Date */}
          <motion.p
            className="mt-4 text-lg md:text-xl text-gray-300"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            9th July 2026 | Abu Dhabi
          </motion.p>

          {/* Tagline */}
          <motion.h2
            className="mt-6 text-xl md:text-2xl font-semibold text-cyan-400"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Leading the Global Charge Against Next-Gen IoT Threats
          </motion.h2>

          {/* Description */}
          <motion.p
            className="mt-4 text-gray-300 text-sm md:text-base leading-relaxed"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Where Nations Secure the Future. Where Deals Get Done.
            <br /><br />
            A high-impact global platform where government authorities,
            critical infrastructure leaders, and cybersecurity innovators
            converge to secure the world’s most advanced IoT ecosystem.
          </motion.p>

          {/* CTA */}
          <motion.div
            className="mt-8"
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 },
            }}
          >
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-3 text-lg rounded-xl shadow-lg shadow-cyan-500/30">
              Register Now
            </Button>
          </motion.div>

        </motion.div>
      </div>

      {/* Dots */}
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