"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, Users, Briefcase } from "lucide-react";

export function WhoShouldAttendSection() {
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
    <section className="py-24 bg-gradient-to-b from-background via-purple-500/5 to-background">
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
            Who Should Attend
          </p>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Built for <span className="glow-text-cyan">Decision Makers</span>
          </h2>
        </motion.div>

        {/* 🔥 Grid Animation */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
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
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="glass-dark p-8 rounded-xl border border-cyan-500/30 hover:border-cyan-500/60 transition-all group hover:shadow-lg hover:shadow-cyan-500/20"
              >
                {/* 🔥 Icon Animation */}
                <motion.div
                  className="mb-5 p-3 w-fit rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-all"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <Icon className="text-cyan-400" size={26} />
                </motion.div>

                {/* Title */}
                <motion.h3
                  className="text-xl font-bold mb-4 text-foreground"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  {section.title}
                </motion.h3>

                {/* Points */}
                <ul className="space-y-3">
                  {section.points.map((point, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3 text-muted-foreground text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                      <span>{point}</span>
                    </motion.li>
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