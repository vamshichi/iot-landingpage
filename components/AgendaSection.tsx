"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Factory, Cpu } from "lucide-react";

export function AgendaSection() {
  const themes = [
    {
      icon: Shield,
      title: "Theme 1: National Cyber Resilience",
      points: [
        "Securing cross-industry infrastructure",
        "Zero Trust across ecosystems",
        "Government cybersecurity mandates",
      ],
    },
    {
      icon: Factory,
      title: "Theme 2: Industrial & Operational Security",
      points: [
        "IT/OT convergence",
        "Securing logistics, mobility & supply chains",
        "Eliminating legacy vulnerabilities",
      ],
    },
    {
      icon: Cpu,
      title: "Theme 3: Future-Ready Security",
      points: [
        "Sovereign cloud & data protection",
        "AI-driven cyber defense",
        "Quantum-ready infrastructure",
      ],
    },
  ];

  return (
    <section id="agenda" className="py-24 bg-white">
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
            Agenda
          </p>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-gray-900">
            Theme: Securing UAE’s Critical & National Infrastructure
          </h2>

          <p className="text-gray-600 text-lg">
            Themes Overview
          </p>
        </motion.div>

        {/* 🔥 Themes Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {themes.map((theme, i) => {
            const Icon = theme.icon;

            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="group bg-gray-50 p-8 rounded-xl border border-gray-200 hover:shadow-lg transition"
              >
                {/* Icon */}
                <div className="mb-5 p-3 w-fit rounded-lg bg-cyan-100 group-hover:bg-cyan-200 transition">
                  <Icon className="text-cyan-600" size={26} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  {theme.title}
                </h3>

                {/* Points */}
                <ul className="space-y-3">
                  {theme.points.map((point, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-600 text-sm"
                    >
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2"></div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}