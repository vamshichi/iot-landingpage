"use client";

import React from "react";
import { motion } from "framer-motion";
import { Megaphone, Users, Building2, ArrowRight } from "lucide-react";

export function PartnerSection() {
  const partners = [
    {
      icon: Megaphone,
      text: "Media Partners: Amplify reach across global cybersecurity communities",
    },
    {
      icon: Users,
      text: "Association Partners: Collaborate with industry bodies & ecosystems",
    },
    {
      icon: Building2,
      text: "Government Collaboration: Align with national cybersecurity initiatives",
    },
  ];

  return (
    <section id="partner" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* 🔥 Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-cyan-500 font-semibold tracking-widest uppercase mb-4">
            Partner With Us
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-12 leading-tight text-gray-900">
            PARTNER WITH US
          </h2>
        </motion.div>

        {/* 🔥 Partner Types */}
        <motion.div
          className="space-y-4 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {partners.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0 },
                }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 rounded-xl border border-gray-200 bg-gray-50 hover:shadow-md transition flex items-center gap-4 text-left"
              >
                <motion.div
                  className="p-3 rounded-lg bg-cyan-100"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon className="text-cyan-600" size={22} />
                </motion.div>

                <p className="text-gray-700 text-sm font-medium">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* 🔥 CTA */}
        {/* <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/40 transition"
        >
          Partner with us
          <motion.span
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <ArrowRight size={18} />
          </motion.span>
        </motion.button> */}

      </div>
    </section>
  );
}