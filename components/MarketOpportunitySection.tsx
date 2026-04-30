"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, ShieldAlert, ArrowRight } from "lucide-react";

export function MarketOpportunitySection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-cyan-500/5 to-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 🔥 Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-cyan-400 font-semibold tracking-widest uppercase mb-4">
            Market Opportunity
          </p>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            The World’s Fastest Growing <br />
            <span className="glow-text-cyan">IoT Security Market</span>
          </h2>
        </motion.div>

        {/* 🔥 Market Numbers (Stagger) */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {[{
            title: "IoT Market",
            value: "USD 35.5 Billion",
            year: "by 2028",
          },
          {
            title: "IoT Security",
            value: "USD 24.6 Billion",
            year: "by 2031",
          }].map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="glass-dark p-8 rounded-xl border border-cyan-500/30 text-center hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
            >
              <p className="text-muted-foreground mb-2">{item.title}</p>
              <h3 className="text-3xl md:text-4xl font-bold text-cyan-400">
                {item.value}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{item.year}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* 🔥 Growth Line */}
        <motion.div
          className="glass-dark rounded-xl p-6 border border-cyan-500/30 mb-16 text-center flex items-center justify-center gap-3"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <TrendingUp className="text-cyan-400" />
          <p className="text-lg text-foreground">
            Growth driven by smart cities, mandates & 5G
          </p>
        </motion.div>

        {/* 🔥 Reality vs Shift */}
        {/* <motion.div
          className="grid md:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {/* Reality */}
          {/* <motion.div
            variants={{
              hidden: { opacity: 0, x: -40 },
              visible: { opacity: 1, x: 0 },
            }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="glass-dark p-8 rounded-xl border border-red-500/30 hover:border-red-500/60 transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <ShieldAlert className="text-red-400" />
              <h3 className="text-xl font-bold">Reality</h3>
            </div>

            <p className="text-muted-foreground text-lg">
              Every connected device = A potential attack point
            </p>
          </motion.div> */}

          {/* Shift */}
          {/* <motion.div
            variants={{
              hidden: { opacity: 0, x: 40 },
              visible: { opacity: 1, x: 0 },
            }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="glass-dark p-8 rounded-xl border border-cyan-500/30 hover:border-cyan-500/60 transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <ArrowRight className="text-cyan-400" />
              <h3 className="text-xl font-bold">Shift</h3>
            </div>

            <p className="text-muted-foreground text-lg">
              Security is legally enforced, budget-backed, mission-critical
            </p>
          </motion.div> */}
        {/* </motion.div> */}

      </div>
    </section>
  );
}