"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Megaphone, Users, Building2 } from "lucide-react";

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
    <section
      id="partner"
      className="py-24 bg-gradient-to-b from-white to-cyan-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Header */}
        {/* <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-cyan-500 font-semibold tracking-[0.3em] uppercase mb-4">
            Partner With Us
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-gray-900">
            PARTNER WITH US
          </h2>
        </motion.div> */}

        {/* Partner Types */}
        {/* <motion.div
          className="space-y-5 mb-20"
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
                className="
                  p-6
                  rounded-2xl
                  border
                  border-cyan-100
                  bg-white/80
                  backdrop-blur
                  hover:shadow-xl
                  hover:shadow-cyan-100
                  transition
                  flex
                  items-center
                  gap-4
                  text-left
                "
              >
                <motion.div
                  className="p-3 rounded-xl bg-cyan-100"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon className="text-cyan-600" size={22} />
                </motion.div>

                <p className="text-gray-700 text-sm md:text-base font-medium">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </motion.div> */}

        {/* Media Partner Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="
            bg-white
            border
            border-cyan-100
            rounded-3xl
            p-8
            md:p-12
            shadow-lg
          "
        >
          <p className="text-cyan-500 font-semibold tracking-[0.25em] uppercase mb-3">
            Official Media Partner
          </p>

          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Our Media Partner for IoT Security World Summit 2026
          </h3>

          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="
              flex
              justify-center
              items-center
              bg-gray-50
              rounded-2xl
              p-8
              border
              border-gray-100
            "
          >
            <Image
              src="/partners/timestech.png"
              alt="TIMESTech Media Partner"
              width={320}
              height={120}
              className="object-contain"
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}