"use client";

import React from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

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

        {/* 🔥 Header */}
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

          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Built for{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">
              Real-World Impact
            </span>
          </h2>
        </motion.div>

        {/* 🔥 Highlights Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="bg-gray-50 p-5 rounded-xl border border-gray-200 text-center hover:shadow-md transition"
            >
              <p className="text-sm font-semibold text-gray-800">
                {item}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* 🔥 CTA Block */}
        <motion.div
          className="rounded-xl border border-gray-200 p-8 text-center bg-gray-50"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4 text-gray-900">
            Full Conference Agenda
          </h3>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/40 transition"
          >
            <Download size={18} />
            Download Full Agenda
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}