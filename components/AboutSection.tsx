'use client';

import React from 'react';
import { Shield, Zap, Globe, Lock } from 'lucide-react';

export function AboutSection() {
  const highlights = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Discover critical strategies for protecting IoT infrastructure at enterprise scale'
    },
    {
      icon: Zap,
      title: 'Innovation Hub',
      description: 'Explore cutting-edge technologies and next-generation security solutions'
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Connect with 3000+ industry leaders, vendors, and government officials'
    },
    {
      icon: Lock,
      title: 'Government Focus',
      description: 'Strategic sessions on critical infrastructure protection and compliance'
    },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background via-purple-500/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Attend <span className="glow-text-cyan">IoT Summit?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            The IoT Security World Summit is the premier conference bringing together governments, enterprises, 
            and technology leaders to shape the secure IoT ecosystem for the Middle East and beyond.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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
                <h3 className="font-bold text-lg mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Key Markets */}
        <div className="glass-dark rounded-xl p-8 border border-cyan-500/30">
          <h3 className="text-2xl font-bold mb-6 text-center">Focused on Critical Verticals</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              'Smart Cities',
              'Critical Infrastructure',
              'Healthcare IoT',
              'Manufacturing',
              'Energy & Utilities',
              'Government',
            ].map((industry, i) => (
              <div key={i} className="py-4 px-2 rounded-lg bg-background/50 border border-cyan-500/20 hover:border-cyan-500/50 transition-all">
                <p className="text-sm font-semibold text-cyan-400">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
