"use client";

import React from "react";
import { motion } from "framer-motion";

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

  return (
    <section className="py-24 bg-white">
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

        {/* Premium Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {highlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300"
            >

              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />

              {/* Content */}
              <p className="relative z-10 text-base font-semibold text-gray-800 group-hover:text-gray-900">
                {item}
              </p>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}