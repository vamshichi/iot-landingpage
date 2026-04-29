"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mic, ArrowRight } from "lucide-react";

export function SpeakersSection() {
  return (
    <section id="speakers" className="py-24 bg-gradient-to-b from-background via-purple-500/5 to-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* 🔥 Header Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-cyan-400 font-semibold tracking-widest uppercase mb-4">
            Speakers
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Speaker Line-Up
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Featuring government leaders, national infrastructure experts & global cybersecurity pioneers
          </p>
        </motion.div>

        {/* 🔥 CTA Card Animation */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          whileHover={{ y: -6 }}
          className="glass-dark border border-cyan-500/30 rounded-xl p-10 hover:border-cyan-500/60 transition-all"
        >

          {/* 🔥 Icon Animation */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            viewport={{ once: true }}
          >
            <div className="p-4 rounded-full bg-cyan-500/10">
              <Mic className="text-cyan-400" size={28} />
            </div>
          </motion.div>

          {/* Text */}
          <motion.h3
            className="text-2xl md:text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Become a Speaker & Position yourself as a thought leader in national cybersecurity
          </motion.h3>

          {/* 🔥 Button Animation */}
          <a href="/#contact" >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-background font-semibold hover:shadow-lg hover:shadow-cyan-500/40 transition-all"
          >
            Apply to Speak
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <ArrowRight size={18} />
            </motion.span>
          </motion.button>
          </a>

        </motion.div>

      </div>
    </section>
  );
}