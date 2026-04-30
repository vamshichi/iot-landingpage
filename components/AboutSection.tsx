"use client";

import { Building2, ShieldCheck, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSummit() {
  return (
    <section
      id="about"
      className="relative bg-white py-20 lg:py-28 overflow-hidden"
    >
      {/* Soft Background Glow */}
      <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">

        {/* 🔥 Top Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* 🖼️ Image */}
          <motion.div
  initial={{ opacity: 0, x: -80 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="bg-white rounded-2xl p-3 shadow-xl h-full min-h-[420px]"
>
  <div className="relative w-full h-full">
    <Image
      src="/images/about-iot.png"
      alt="IoT Security"
      fill
      className="rounded-xl object-cover"
    />
  </div>
</motion.div>

          {/* 📄 Content */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-cyan-500 uppercase tracking-wide text-sm font-semibold">
              About the Summit
            </p>

            <h2 className="mt-4 text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              The UAE’s Most Critical Cybersecurity Gathering
              <br /> for Connected Infrastructure
            </h2>

            <p className="mt-6 text-gray-600 text-base md:text-lg leading-relaxed">
              The United Arab Emirates is leading the global transformation of smart cities,
              digital government, and connected infrastructure, making IoT security a national
              priority, not an option.
            </p>

            {/* 💰 Highlight */}
            <div className="mt-8 bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm max-w-md">
              <p className="text-gray-500 text-sm">
                With investments projected to reach
              </p>

              <h3 className="mt-2 text-4xl font-bold text-cyan-500">
                USD 24.6 Billion
              </h3>

              <p className="text-gray-600 mt-2">by 2031</p>
            </div>
          </motion.div>
        </div>

        {/* 🔥 Cards
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {[
            {
              icon: Building2,
              title: "Government Mandates",
              text: "Governments define cybersecurity mandates shaping national digital infrastructure",
            },
            {
              icon: ShieldCheck,
              title: "Enterprise Challenges",
              text: "Enterprises solve mission-critical vulnerabilities across connected systems",
            },
            {
              icon: Cpu,
              title: "Technology Solutions",
              text: "Technology leaders deliver real-world, scalable cybersecurity solutions",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -6 }}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-cyan-100 mb-4">
                  <Icon className="text-cyan-500" size={24} />
                </div>

                <h4 className="text-gray-900 font-semibold text-lg">
                  {item.title}
                </h4>

                <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </motion.div> */}
        <motion.div
  className="mt-20 text-center max-w-3xl mx-auto"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  viewport={{ once: true }}
>
  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
    Region’s Most Anticipated IoT Security Event supporting :
  </h3>
</motion.div>

{/* 🔥 Cards */}
<motion.div
  className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  }}
>
  {[
    {
      icon: Building2,
      label: "Execute",
      title: "Government Mandates",
      text: "Governments define cybersecurity mandates shaping national digital infrastructure",
    },
    {
      icon: ShieldCheck,
      label: "Discuss",
      title: "Enterprise Challenges",
      text: "Enterprises solve mission-critical vulnerabilities across connected systems",
    },
    {
      icon: Cpu,
      label: "Explore",
      title: "Technology Solutions",
      text: "Technology leaders deliver real-world, scalable cybersecurity solutions",
    },
  ].map((item, index) => {
    const Icon = item.icon;

    return (
      <motion.div
        key={index}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 },
        }}
        whileHover={{ y: -5 }}
        className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
      >
        {/* 🔥 Icon + Side Label */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-cyan-100">
            <Icon className="text-cyan-500" size={20} />
          </div>

          <span className="text-sm font-semibold text-cyan-600 uppercase tracking-wide">
            {item.label}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-gray-900 font-semibold text-base">
          {item.title}
        </h4>

        {/* Description */}
        <p className="mt-2 text-gray-600 text-sm leading-relaxed">
          {item.text}
        </p>
      </motion.div>
    );
  })}
</motion.div>
      </div>{/* 🔥 Section Heading */}

    </section>
  );
}