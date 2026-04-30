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
    <section
      id="industries"
      className="py-24 bg-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-cyan-600 font-semibold tracking-widest uppercase mb-4">
            Industries
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-4">
            One Platform. All Critical Sectors.
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Cross-industry security. Unified national resilience.
          </p>
        </motion.div>

        {/* Grid */}
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
                className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-cyan-500 transition-all group hover:shadow-xl flex items-center gap-4"
              >
                {/* Icon */}
                <motion.div
                  className="p-3 rounded-lg bg-cyan-50 group-hover:bg-cyan-100 transition-all"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <Icon className="text-cyan-600" size={22} />
                </motion.div>

                <p className="text-black font-medium text-sm">
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