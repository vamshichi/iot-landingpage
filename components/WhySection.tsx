"use client";

import { motion } from "framer-motion";

const points = [
  "Government-led, policy-driven ecosystem",
  "Multi-billion-dollar market access",
  "Real buyers. Real problems. Real solutions",
  "Built for impact, influence & deal-making",
];

export default function WhySection() {
  return (
    <section className="relative bg-[#020817] text-white py-20 md:py-28 border-t border-white/10">
      
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="text-cyan-400 text-sm tracking-widest uppercase mb-4">
            Why This Event Matters
          </p>

          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Where Global IoT Security Leaders Converge
          </h2>

          <p className="text-gray-400 mt-6 text-base leading-relaxed max-w-md">
            A high-impact platform designed for governments, enterprises, and
            innovators to collaborate, solve real challenges, and unlock
            large-scale opportunities.
          </p>
        </motion.div>

        {/* RIGHT CONTENT */}
        <div className="space-y-6">

          {points.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-start gap-4"
            >
              {/* Dot */}
              <div className="mt-2 w-2 h-2 rounded-full bg-cyan-400" />

              {/* Text */}
              <p className="text-gray-300 text-base leading-relaxed">
                {point}
              </p>
            </motion.div>
          ))}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
            className="pt-6 flex flex-col sm:flex-row gap-4"
          >
            <button className="px-6 py-3 rounded-full bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition">
              Register as Delegate
            </button>

            <button className="px-6 py-3 rounded-full border border-white/30 hover:bg-white hover:text-black transition">
              Become a Sponsor
            </button>

            <button className="px-6 py-3 rounded-full border border-white/20 text-gray-300 hover:text-white hover:border-white transition">
              Download Brochure
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}