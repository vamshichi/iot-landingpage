'use client';

import React from 'react';
import { Target, Layers, Download, Sparkles } from 'lucide-react';

export function SponsorsOverviewSection() {
  const whySponsor = [
    'Meet government decision-makers',
    'Access multi-billion-dollar market',
    'Showcase cutting-edge solutions',
    'Build high-value partnerships',
  ];

  const categories = [
    'AI Cybersecurity',
    'OT / ICS Security',
    'Zero Trust Platforms',
    'Sovereign Cloud Providers',
    'Telecom & 5G Security',
    'Quantum Security',
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background via-cyan-500/5 to-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-cyan-400 font-semibold tracking-widest uppercase mb-4">
            Sponsors
          </p>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Be Part of the UAE’s National Security Transformation
          </h2>
        </div>

        {/* Why Sponsor */}
        <div className="glass-dark rounded-xl border border-cyan-500/30 p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Target className="text-cyan-400" />
            <h3 className="text-2xl font-bold">Why Sponsor</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {whySponsor.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 text-muted-foreground text-sm"
              >
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsor Categories */}
        <div className="glass-dark rounded-xl border border-cyan-500/30 p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Layers className="text-cyan-400" />
            <h3 className="text-2xl font-bold">Sponsor Categories</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {categories.map((item, i) => (
              <div
                key={i}
                className="p-4 rounded-lg border border-cyan-500/20 bg-background/40 text-center hover:border-cyan-500/50 transition-all"
              >
                <p className="text-sm font-semibold text-foreground">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsorship Packages */}
        <div className="glass-dark rounded-xl border border-cyan-500/30 p-8 text-center">
          <div className="flex justify-center mb-4">
            <Sparkles className="text-cyan-400" />
          </div>

          <h3 className="text-2xl font-bold mb-4">
            Sponsorship Packages
          </h3>

          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Custom packages designed for visibility, engagement & deal-making
          </p>

          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-background font-semibold hover:shadow-lg hover:shadow-cyan-500/40 transition-all">
            <Download size={18} />
            Download Sponsorship Brochure
          </button>

          {/* Outcome */}
          <div className="mt-8 pt-6 border-t border-cyan-500/20">
            <p className="text-lg font-semibold text-cyan-400">
              The Outcome: Meetings | Pipeline | Deals
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}