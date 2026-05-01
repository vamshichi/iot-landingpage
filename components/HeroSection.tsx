"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function HeroSection() {

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Abu Dhabi timezone (UTC+4)
    const targetDate = new Date("2026-07-23T00:00:00+04:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative w-full overflow-hidden">

      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/95 z-10" />

      {/* CYAN GLOW */}
      <div className="absolute inset-0 bg-cyan-500/10 blur-[140px] z-0" />

      {/* CONTENT */}
      <div className="relative z-20 flex items-start justify-center h-full text-center px-6 py-32">
        <motion.div
          className="max-w-5xl text-white space-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.25 } },
          }}
        >

          {/* TITLE */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight"
            variants={{
              hidden: { opacity: 0, y: 60 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              IoT Security World Summit
            </span>
            <br />
            <span className="text-cyan-400">
              Abu Dhabi 2026
            </span>
          </motion.h1>

          {/* DATE */}
          <motion.p
            className="text-lg md:text-xl text-gray-300 tracking-wide"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            23rd July 2026 | Abu Dhabi
          </motion.p>

          {/* TAGLINE */}
          <motion.h2
            className="text-xl md:text-2xl font-semibold text-cyan-400 tracking-wide"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Leading the Global Charge Against Next-Gen IoT Threats
          </motion.h2>

          {/* DESCRIPTION */}
          <motion.p
            className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
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

          {/* COUNTDOWN TIMER */}
          <motion.div
            className="flex justify-center gap-4 pt-6 flex-wrap"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 min-w-[80px] shadow-lg"
              >
                <p className="text-2xl md:text-3xl font-bold text-white">
                  {String(item.value).padStart(2, "0")}
                </p>
                <p className="text-xs text-gray-300 uppercase tracking-wider">
                  {item.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* CTA BUTTON */}
          <motion.div
            className="pt-4"
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 },
            }}
          >
            <a href="/#contact">
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-10 py-4 text-lg rounded-xl shadow-lg shadow-cyan-500/40">
                Register Now
              </Button>
            </a>
          </motion.div>

        </motion.div>
      </div>

    </section>
  );
}