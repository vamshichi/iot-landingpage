"use client";

import React from "react";
import { motion, useAnimation } from "framer-motion";

export function SessionHighlightsSection() {
  const highlights = [
    "25+ Elite Speakers",
    "10+ Strategic Sessions",
    "High-Level Panel Discussions",
    "Exclusive Fireside Chats",
    "Dedicated Networking Sessions",
    "Pre-Scheduled 1:1 Business Meetings",
    "Solution Showcase & Innovation Spotlights",
    "Designed for real-world problem solving",
  ];

  const duplicated = [...highlights, ...highlights];
  const controls = useAnimation();

  React.useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        ease: "linear",
        duration: 25,
        repeat: Infinity,
      },
    });
  }, [controls]);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-cyan-500 font-semibold tracking-widest uppercase mb-4">
            Session Highlights
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Built for{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">
              Real-World Impact
            </span>
          </h2>
        </motion.div>

        {/* 🔥 Marquee Wrapper (Fix Overflow Issue) */}
        <div className="relative overflow-hidden">

          <motion.div
            className="flex gap-5"
            animate={controls}
            onHoverStart={() => controls.stop()}
            onHoverEnd={() =>
              controls.start({
                x: ["0%", "-50%"],
                transition: {
                  ease: "linear",
                  duration: 25,
                  repeat: Infinity,
                },
              })
            }
          >
            {duplicated.map((item, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[250px] bg-gray-50 p-5 rounded-xl border border-gray-200 text-center hover:shadow-md transition"
              >
                <p className="text-sm font-semibold text-gray-800">
                  {item}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Premium Fade Edges */}
          <div className="pointer-events-none absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="pointer-events-none absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />
        </div>

      </div>
    </section>
  );
}