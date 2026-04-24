'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, Target, Zap } from 'lucide-react';

export function SponsorsSection() {
  const roiPoints = [
    {
      icon: <Target className="w-5 h-5" />,
      text: 'Direct access to budget owners & regulators',
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      text: 'Tap into mandatory cybersecurity spending',
    },
    {
      icon: <Zap className="w-5 h-5" />,
      text: 'Position your brand at the center of transformation',
    },
  ];

  const impactPoints = [
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      text: 'Secure energy, healthcare, logistics, telecom & smart cities',
    },
    {
      icon: <Target className="w-5 h-5" />,
      text: 'Solve real vulnerabilities',
    },
    {
      icon: <Zap className="w-5 h-5" />,
      text: 'Discover deployable solutions',
    },
  ];

  return (
    <section
      id="sponsors"
      className="relative py-24 bg-gradient-to-b from-black via-purple-900/10 to-black overflow-hidden"
    >
      {/* 🔥 Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08),transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* 🔥 MAIN GLASS CARD */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl border border-cyan-400/20 bg-white/5 backdrop-blur-xl p-10 md:p-14 shadow-[0_0_40px_rgba(0,255,255,0.08)]"
        >
          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-cyan-400 font-semibold tracking-[0.3em] uppercase mb-4 text-sm">
              Sponsor ROI
            </p>

            <h3 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Direct access to{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                budget owners & regulators
              </span>
            </h3>

            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              This is pipeline, influence & business
            </p>
          </div>

          {/* ROI GRID */}
          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {roiPoints.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8, scale: 1.03 }}
                className="group relative p-6 rounded-xl border border-cyan-400/20 bg-white/5 backdrop-blur-lg transition-all"
              >
                <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition">
                  {item.icon}
                </div>

                <p className="text-sm text-white/90 font-medium leading-relaxed">
                  {item.text}
                </p>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition bg-cyan-500/10 blur-xl" />
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent mb-12" />

          {/* ENTERPRISE IMPACT */}
          <div>
            <h4 className="text-3xl font-bold text-center mb-10">
              Enterprise Impact
            </h4>

            <div className="grid md:grid-cols-3 gap-6">
              {impactPoints.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="group relative p-6 rounded-xl border border-cyan-400/20 bg-white/5 backdrop-blur-lg transition-all text-center"
                >
                  <div className="mb-4 flex justify-center">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition">
                      {item.icon}
                    </div>
                  </div>

                  <p className="text-sm text-white/80 font-medium leading-relaxed">
                    {item.text}
                  </p>

                  {/* Glow */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition bg-cyan-500/10 blur-xl" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}