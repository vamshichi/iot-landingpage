"use client";

import { Button } from "@/components/ui/button";
import { Shield, Globe, Briefcase, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const points = [
  { icon: Shield, title: "Government-led, policy-driven ecosystem" },
  { icon: TrendingUp, title: "Multi-billion-dollar market access" },
  { icon: Briefcase, title: "Real buyers. Real problems. Real solutions" },
  { icon: Globe, title: "Built for impact, influence & deal-making" },
];

export default function WhyEventMatters() {
  return (
    <section className="relative bg-[#0A0F1C] py-20 lg:py-28 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* 🔥 Heading Animation */}
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-cyan-400 font-medium tracking-wide uppercase text-sm">
            Why This Event Matters
          </p>

          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white leading-tight">
            Where Global IoT Security Leaders Converge
          </h2>

          <p className="mt-6 text-gray-400 text-base md:text-lg leading-relaxed">
            A high-impact platform designed for governments, enterprises, and innovators 
            to collaborate, solve real challenges, and unlock large-scale opportunities.
          </p>
        </motion.div>

        {/* 🔥 Cards Animation (Stagger Effect) */}
        <motion.div
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {points.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ duration: 0.4 }}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-cyan-400/40"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-cyan-500/10 mb-4">
                  <Icon className="text-cyan-400" size={24} />
                </div>

                <p className="text-white font-medium leading-relaxed">
                  {item.title}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* 🔥 CTA Animation */}
        <motion.div
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl shadow-lg shadow-cyan-500/30">
              Register as Delegate
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl border border-white/20">
              Become a Sponsor
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Button className="bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 px-6 py-3 rounded-xl">
              Download Brochure
            </Button>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}