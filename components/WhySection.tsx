"use client";

import { Shield, Globe, Briefcase, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useFormModal, type ModalKey } from "@/components/FormModal";

const points = [
  { icon: Shield, title: "Government-led, policy-driven ecosystem" },
  { icon: TrendingUp, title: "Multi-billion-dollar market access" },
  { icon: Briefcase, title: "Real buyers. Real problems. Real solutions" },
  { icon: Globe, title: "Built for impact, influence & deal-making" },
];

const BUTTONS: { label: string; key: ModalKey; style: string }[] = [
  {
    label: "Register as Delegate",
    key: "delegate",
    style:
      "bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/30",
  },
  {
    label: "Become a Sponsor",
    key: "sponsor",
    style: "bg-white/10 hover:bg-white/20 text-white border border-white/20",
  },
  {
    label: "Download Brochure",
    key: "brochure",
    style:
      "bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10",
  },
];

export default function WhyEventMatters() {
  const { openModal } = useFormModal();

  return (
    <section className="relative pt-20 lg:py-18 overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/whybgimage.png"
          alt="Why Event Background"
          fill
          priority
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-[#0A0F1C]/75" />
      </div>

      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
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
          <p className="mt-6 text-gray-300 text-base md:text-lg leading-relaxed">
            A high-impact platform designed for governments, enterprises, and innovators
            to collaborate, solve real challenges, and unlock large-scale opportunities.
          </p>
        </motion.div>
        <div className="relative py-10 lg:py-18 overflow-hidden min-h-[5px] flex flex-col"></div>

        {/* Auto Scrolling Cards */}
        <div className="mt-16 overflow-hidden ">
          <div className="flex gap-6 w-max animate-scroll">

            {[...points, ...points].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="min-w-[260px] flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-5 py-4 hover:border-cyan-400/40 transition-all"
                >
                  {/* Icon */}
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-cyan-500/10 shrink-0">
                    <Icon className="text-cyan-400" size={20} />
                  </div>

                  {/* Text */}
                  <p className="text-white text-sm leading-relaxed">
                    {item.title}
                  </p>
                </div>
              );
            })}

          </div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          {BUTTONS.map(({ label, key, style }) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openModal(key)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${style}`}
            >
              {label}
            </motion.button>
          ))}
        </motion.div>

      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
      `}</style>
    </section>
  );
}