'use client';

import React from 'react';
import { ShieldCheck, Building2, Cpu } from 'lucide-react';

export function AboutSection() {
  const highlights = [
    {
      icon: ShieldCheck,
      title: 'Government Mandates',
      description: 'Governments define cybersecurity mandates shaping national digital infrastructure'
    },
    {
      icon: Building2,
      title: 'Enterprise Challenges',
      description: 'Enterprises solve mission-critical vulnerabilities across connected systems'
    },
    {
      icon: Cpu,
      title: 'Technology Solutions',
      description: 'Technology leaders deliver real-world, scalable cybersecurity solutions'
    },
  ];

  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-b from-background via-purple-500/5 to-background"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-cyan-400 font-semibold tracking-widest uppercase mb-4">
            About the Summit
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            The UAE’s Most Critical Cybersecurity Gathering <br />
            for <span className="glow-text-cyan">Connected Infrastructure</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The United Arab Emirates is leading the global transformation of smart cities, 
            digital government, and connected infrastructure, making IoT security a national priority, not an option.
          </p>
        </div>

        {/* Investment Highlight */}
        <div className="glass-dark rounded-xl p-8 border border-cyan-500/30 mb-16 text-center">
          <p className="text-lg text-muted-foreground">
            With investments projected to reach
          </p>

          <h3 className="text-3xl md:text-4xl font-bold text-cyan-400 my-3">
            USD 24.6 Billion by 2031
          </h3>

          <p className="text-muted-foreground">
            this summit is where:
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="glass-dark p-6 rounded-xl border border-cyan-500/30 hover:border-cyan-500/60 transition-all group hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <div className="mb-4 p-3 w-fit rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-all">
                  <Icon size={24} className="text-cyan-400" />
                </div>

                <h3 className="font-bold text-lg mb-2 text-foreground">
                  {item.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}