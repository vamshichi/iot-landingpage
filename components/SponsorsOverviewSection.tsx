"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Layers, Download, Sparkles } from "lucide-react";

export function SponsorsOverviewSection() {
  const whySponsor = [
    "Meet government decision-makers",
    "Access multi-billion-dollar market",
    "Showcase cutting-edge solutions",
    "Build high-value partnerships",
  ];

  const categories = [
    "AI Cybersecurity",
    "OT / ICS Security",
    "Zero Trust Platforms",
    "Sovereign Cloud Providers",
    "Telecom & 5G Security",
    "Quantum Security",
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
            Sponsors
          </p>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-gray-900">
            Be Part of the UAE’s National Security Transformation
          </h2>
        </motion.div>

        {/* 🔥 Why Sponsor */}
        <motion.div
          className="rounded-xl border border-gray-200 p-8 mb-12 bg-gray-50"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Target className="text-cyan-500" />
            <h3 className="text-2xl font-bold text-gray-900">Why Sponsor</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {whySponsor.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3 text-gray-600 text-sm"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2"></div>
                <span>{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 🔥 Categories */}
        <motion.div
          className="rounded-xl border border-gray-200 p-8 mb-12 bg-gray-50"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Layers className="text-cyan-500" />
            <h3 className="text-2xl font-bold text-gray-900">
              Sponsor Categories
            </h3>
          </div>

          <motion.div
            className="grid md:grid-cols-3 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {categories.map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -5, scale: 1.03 }}
                className="p-4 rounded-lg border border-gray-200 bg-white text-center hover:shadow-md transition"
              >
                <p className="text-sm font-semibold text-gray-800">
                  {item}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* 🔥 Sponsorship Packages */}
        <motion.div
          className="rounded-xl border border-gray-200 p-8 text-center bg-gray-50"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex justify-center mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            viewport={{ once: true }}
          >
            <Sparkles className="text-cyan-500" />
          </motion.div>

          <h3 className="text-2xl font-bold mb-4 text-gray-900">
            Sponsorship Packages
          </h3>

          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Custom packages designed for visibility, engagement & deal-making
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/40 transition"
          >
            <Download size={18} />
            Download Sponsorship Brochure
          </motion.button>

          {/* Outcome */}
          <motion.div
            className="mt-8 pt-6 border-t border-gray-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-lg font-semibold text-cyan-500">
              The Outcome: Meetings | Pipeline | Deals
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}