"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Zap,
  Truck,
  HeartPulse,
  Factory,
  Home,
  Plane,
  ShoppingCart,
  Network,
} from "lucide-react";

export function IndustriesSection() {
  const industries = [
    { icon: Building2, title: "Smart Cities & Government" },
    { icon: Zap, title: "Energy, Utilities & Oil & Gas" },
    { icon: Truck, title: "Logistics, Ports & Supply Chain" },
    { icon: HeartPulse, title: "Healthcare & Life Sciences" },
    { icon: Factory, title: "Manufacturing & Industry 4.0 (IIoT)" },
    { icon: Home, title: "Real Estate & Smart Buildings" },
    { icon: Plane, title: "Transportation, Mobility & Aviation" },
    { icon: ShoppingCart, title: "Retail, E-Commerce & Consumer Tech" },
    { icon: Network, title: "Telecom, Cloud & Digital Infrastructure" },
  ];

  return (
    <section id="industries" className="py-24 bg-gradient-to-b from-background via-cyan-500/5 to-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 🔥 Header Animation */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-cyan-400 font-semibold tracking-widest uppercase mb-4">
            Industries
          </p>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            One Platform. All Critical Sectors.
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Cross-industry security. Unified national resilience.
          </p>
        </motion.div>

        {/* 🔥 Grid Animation (Stagger) */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {industries.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="glass-dark p-6 rounded-xl border border-cyan-500/30 hover:border-cyan-500/60 transition-all group hover:shadow-lg hover:shadow-cyan-500/20 flex items-center gap-4"
              >
                {/* 🔥 Icon Animation */}
                <motion.div
                  className="p-3 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-all"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <Icon className="text-cyan-400" size={22} />
                </motion.div>

                <p className="text-foreground font-medium text-sm">
                  {item.title}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}