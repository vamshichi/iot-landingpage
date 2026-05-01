"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, TrendingUp, Target, Zap } from "lucide-react";

export function SponsorsSection() {
  const roiPoints = [
    {
      icon: <Target className="w-5 h-5" />,
      text: "Access to Key Decision Makers & Regulators",
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      text: "Tap into mandatory cybersecurity spending",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      text: "Position your brand at the center of transformation",
    },
  ];

  const impactPoints = [
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      text: "Secure energy, healthcare, logistics, telecom & smart cities",
    },
    {
      icon: <Target className="w-5 h-5" />,
      text: "Solve real vulnerabilities",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      text: "Discover deployable solutions",
    },
  ];

  return (
    <section
  id="sponsors"
  className="relative py-24 overflow-hidden text-white"
>
  {/* 🌌 Background Image */}
  <div className="absolute inset-0">
    <img
      src="/images/simage.png" // 👉 replace this
      alt="background"
      className="w-full h-full object-cover"
    />
  </div>

  {/* 🌑 Dark Overlay */}
  <div className="absolute inset-0 bg-black/90" />

  {/* ✨ Glow */}
  {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.15),transparent_70%)]" /> */}

  <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

    {/* 🔥 Main Container */}
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className=""
    >

      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-cyan-400 font-semibold tracking-[0.3em] uppercase mb-4 text-sm">
          Sponsor ROI
        </p>

        <h3 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-white">
          Direct access to{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
            key decision makers and policy makers
          </span>
        </h3>

        <p className="text-white/70 max-w-xl mx-auto text-lg">
          This is pipeline, influence & business
        </p>
      </div>

      {/* 🔥 ROI GRID */}
      <motion.div
        className="grid md:grid-cols-3 gap-6 mb-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {roiPoints.map((item, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -6, scale: 1.03 }}
            className="group relative p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
          >
            <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-300 group-hover:bg-cyan-500/30 transition">
              {item.icon}
            </div>

            <p className="text-sm text-white/80 font-medium leading-relaxed">
              {item.text}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-12" />

      {/* ENTERPRISE IMPACT */}
      <div>
        <h4 className="text-3xl font-bold text-center mb-10 text-white">
          Enterprise Impact
        </h4>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {impactPoints.map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="group relative p-6 rounded-xl border border-white/10 bg-white/5 text-center hover:bg-white/10 transition"
            >
              <div className="mb-4 flex justify-center">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300 group-hover:bg-cyan-500/30 transition">
                  {item.icon}
                </div>
              </div>

              <p className="text-sm text-white/80 font-medium leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </motion.div>
  </div>
</section>
  );
}