'use client';

import React from 'react';
import {
  Building2,
  Zap,
  Cpu,
  PieChart,
  Users,
  Shield,
  Smartphone,
  BarChart3,
  Network,
} from 'lucide-react';

export function IndustriesSection() {
  const industries = [
    {
      icon: Building2,
      title: 'Smart Cities',
      description: 'Connected urban infrastructure and public services security',
    },
    {
      icon: Zap,
      title: 'Energy & Utilities',
      description: 'Power grid protection and renewable energy security',
    },
    {
      icon: Cpu,
      title: 'Manufacturing',
      description: 'Industrial IoT and production line cybersecurity',
    },
    {
      icon: PieChart,
      title: 'Finance',
      description: 'Financial IoT systems and transaction security',
    },
    {
      icon: Users,
      title: 'Healthcare',
      description: 'Medical device security and patient data protection',
    },
    {
      icon: Shield,
      title: 'Government',
      description: 'Critical infrastructure and national security',
    },
    {
      icon: Smartphone,
      title: 'Consumer IoT',
      description: 'Smart home devices and consumer privacy',
    },
    {
      icon: BarChart3,
      title: 'Retail',
      description: 'Point-of-sale systems and customer analytics',
    },
    {
      icon: Network,
      title: 'Telecom',
      description: '5G networks and connectivity security',
    },
  ];

  return (
    <section id="industries" className="py-20 bg-gradient-to-b from-background via-cyan-500/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Industries <span className="glow-text-cyan">We Serve</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Covering all critical sectors that depend on secure IoT infrastructure.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <div
                key={i}
                className="group relative glass-dark p-8 rounded-xl border border-cyan-500/30 hover:border-cyan-500/60 transition-all overflow-hidden"
              >
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all -z-10"></div>

                <div className="mb-4 p-4 w-fit rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all">
                  <Icon size={28} className="text-cyan-400 group-hover:text-cyan-300 transition-all" />
                </div>

                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-cyan-400 transition-all">
                  {industry.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {industry.description}
                </p>

                {/* Hover indicator */}
                {/* <div className="mt-4 pt-4 border-t border-cyan-500/20 opacity-0 group-hover:opacity-100 transition-all">
                  <span className="text-xs font-semibold text-cyan-400">Learn More →</span>
                </div> */}
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
          {/* <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-6">Your industry not listed? We cover emerging sectors too.</p>
            <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-background font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
              Explore More Industries
            </button>
          </div> */}
      </div>
    </section>
  );
}
