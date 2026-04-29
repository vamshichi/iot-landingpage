"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section id="home" className="relative w-full h-screen overflow-hidden">

      {/* 🎬 VIDEO BACKGROUND */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* 🔥 Gradient Overlay (better than plain black) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-10" />

      {/* Optional Glow Effect (premium feel) */}
      <div className="absolute inset-0 bg-cyan-500/10 blur-[120px] z-0" />

      {/* 🔥 Content */}
      <div className="relative z-20 flex items-center justify-center h-full text-center px-6">
        <motion.div
          className="max-w-4xl text-white pt-7"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.3 },
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
            <a href="/#contact">
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-3 text-lg rounded-xl shadow-lg shadow-cyan-500/30">
                Register Now
              </Button>
            </a>
          </motion.div>

        </motion.div>
      </div>

    </section>
  );
}