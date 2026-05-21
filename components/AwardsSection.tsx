"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  ShieldCheck,
  BrainCircuit,
  Building2,
  Landmark,
  Cpu,
  ChevronRight,
} from "lucide-react";

const awards = [
  {
    title: "Cybersecurity Excellence Award",
    icon: ShieldCheck,
    desc: "Recognizing organizations leading innovation and resilience in cybersecurity.",
  },
  {
    title: "AI Innovation Leadership",
    icon: BrainCircuit,
    desc: "Honoring groundbreaking AI solutions transforming industries globally.",
  },
  {
    title: "Smart Infrastructure Award",
    icon: Building2,
    desc: "Celebrating advancements in IoT-enabled smart infrastructure projects.",
  },
  {
    title: "Digital Transformation Pioneer",
    icon: Landmark,
    desc: "Awarded to enterprises driving large-scale digital transformation.",
  },
  {
    title: "Emerging Tech Excellence",
    icon: Cpu,
    desc: "Recognizing disruptive technologies shaping the future ecosystem.",
  },
];

export function AwardsSection() {
  return (
    <section className="relative py-24 bg-[#050816] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-cyan-500/10 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-blue-500/10 blur-[120px]" />

        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-5xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-sm mb-6 backdrop-blur-md">
            <Trophy className="w-4 h-4" />
            Global Recognition Awards
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Celebrating{" "}
            <span className="text-cyan-400">Innovation</span> & Leadership
          </h2>

          <p className="text-gray-400 text-lg md:text-xl mt-8 leading-relaxed max-w-4xl mx-auto">
            Honoring industry leaders, innovators, and organizations shaping
            the future of cybersecurity, AI, IoT, and digital transformation.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awards.map((award, index) => {
            const Icon = award.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                className="group relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 overflow-hidden transition-all duration-500"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-cyan-500/10 to-transparent" />

                {/* Border Glow */}
                <div className="absolute inset-0 rounded-3xl border border-cyan-500/0 group-hover:border-cyan-500/20 transition-all duration-500" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                    <Icon className="w-8 h-8 text-cyan-400" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-semibold text-white mb-4 leading-snug">
                    {award.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed mb-6">
                    {award.desc}
                  </p>

                  {/* Button */}
                  {/* <button className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition duration-300 font-medium">
                    Learn More
                    <ChevronRight className="w-4 h-4" />
                  </button> */}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <a href="/awards">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <button className="px-10 py-4 rounded-full bg-cyan-500 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-2xl shadow-cyan-500/20 hover:bg-cyan-400">
            Learn More
          </button>
        </motion.div>
        </a>
      </div>
    </section>
  );
}