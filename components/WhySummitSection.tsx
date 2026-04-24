'use client';

import React from 'react';
import { Landmark, ShieldCheck, LineChart, Server } from 'lucide-react';

export function WhySummitSection() {
  const points = [
    {
      icon: Landmark,
      title: 'Abu Dhabi Digital Authority',
    },
    {
      icon: ShieldCheck,
      title: 'UAE Cyber Security Council',
    },
    {
      icon: LineChart,
      title: 'Benchmark national strategies',
    },
    {
      icon: Server,
      title: 'Secure critical infrastructure',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background via-cyan-500/5 to-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-cyan-400 font-semibold tracking-widest uppercase mb-4">
            Why This Summit
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Built for Government. Designed for Decision Makers. <br />
            <span className="glow-text-cyan">Engineered for Impact.</span>
          </h2>
        </div>

        {/* Government Focus Block */}
        <div className="glass-dark border border-cyan-500/30 rounded-xl p-8 mb-12 text-center">
          <h3 className="text-2xl font-bold mb-4 text-foreground">
            Government Focus
          </h3>

          <p className="text-muted-foreground mb-4">
            Engage with:
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-cyan-400 font-semibold">
            <span>Abu Dhabi Digital Authority</span>
            <span className="hidden md:block">•</span>
            <span>UAE Cyber Security Council</span>
          </div>
        </div>

        {/* Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {points.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="glass-dark p-6 rounded-xl border border-cyan-500/30 hover:border-cyan-500/60 transition-all group hover:shadow-lg hover:shadow-cyan-500/20 flex items-start gap-4"
              >
                <div className="p-3 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-all">
                  <Icon size={22} className="text-cyan-400" />
                </div>

                <p className="text-foreground font-medium">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}