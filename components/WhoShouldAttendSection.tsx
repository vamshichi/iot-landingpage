"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Users, Briefcase } from "lucide-react";
import { useFormModal } from "@/components/FormModal";

export function WhoShouldAttendSection() {
  const { openModal } = useFormModal();
  const [hovered, setHovered] = useState<number | null>(null);

  const sections = [
    {
      icon: Building2,
      title: "Government & Public Sector",
      points: [
        "Policy makers & regulators",
        "Smart city authorities",
        "National infrastructure leaders",
      ],
    },
    {
      icon: Users,
      title: "Enterprise Leaders",
      points: [
        "Energy, telecom, healthcare, logistics leaders",
        "Digital transformation heads",
        "Security decision-makers",
      ],
    },
    {
      icon: Briefcase,
      title: "Job Titles",
      points: [
        "CISO / CIO / CTO / CDO / CRO",
        "Head of Cybersecurity / IoT Security",
        "OT / ICS Security Leaders",
        "SOC / Cloud / IAM Heads",
      ],
    },
  ];

  return (
    <section className="relative py-28 bg-black overflow-hidden">

      {/* 🔥 Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black" />
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/20 blur-3xl opacity-30" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="text-cyan-400 font-semibold tracking-widest uppercase mb-4">
            Who Should Attend
          </p>

          <h2 className="text-5xl font-bold text-white">
            Built for{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              Decision Makers
            </span>
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {sections.map((section, i) => {
            const Icon = section.icon;

            return (
              <motion.div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                variants={{
                  hidden: { opacity: 0, y: 80, scale: 0.9, filter: "blur(10px)" },
                  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
                }}
                whileHover={{
                  y: -15,
                  scale: 1.04,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative group p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden"
              >

                {/* 🔥 Hover Glow */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    hovered === i ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="absolute inset-0 bg-cyan-500/10 blur-2xl" />
                </div>

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.2 }}
                  className="mb-6 p-3 w-fit rounded-lg bg-cyan-500/10"
                >
                  <Icon className="text-cyan-400" size={28} />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-4 text-white">
                  {section.title}
                </h3>

                {/* Points */}
                <ul className="space-y-3">
                  {section.points.map((point, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-300 text-sm"
                    >
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

              </motion.div>
            );
          })}
        </motion.div>

        {/* 🔥 CTA */}
        <motion.div
          className="mt-20 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.button
            onClick={() => openModal("delegate")}
            whileHover={{
              scale: 1.08,
              boxShadow: "0px 0px 40px rgba(6,182,212,0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            className="relative px-10 py-4 rounded-xl bg-cyan-500 text-white font-semibold text-lg overflow-hidden"
          >
            {/* Glow Pulse */}
            <motion.div
              className="absolute inset-0 bg-cyan-400 opacity-20 blur-xl"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="relative z-10">Join Us as a Delegate</span>
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}