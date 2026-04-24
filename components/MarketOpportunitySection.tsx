'use client';

import React from 'react';
import { TrendingUp, ShieldAlert, ArrowRight } from 'lucide-react';

export function MarketOpportunitySection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-cyan-500/5 to-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-cyan-400 font-semibold tracking-widest uppercase mb-4">
            Market Opportunity
          </p>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            The World’s Fastest Growing <br />
            <span className="glow-text-cyan">IoT Security Market</span>
          </h2>
        </div>

        {/* Market Numbers */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          
          <div className="glass-dark p-8 rounded-xl border border-cyan-500/30 text-center hover:shadow-lg hover:shadow-cyan-500/20 transition-all">
            <p className="text-muted-foreground mb-2">IoT Market</p>
            <h3 className="text-3xl md:text-4xl font-bold text-cyan-400">
              USD 35.5 Billion
            </h3>
            <p className="text-sm text-muted-foreground mt-1">by 2028</p>
          </div>

          <div className="glass-dark p-8 rounded-xl border border-cyan-500/30 text-center hover:shadow-lg hover:shadow-cyan-500/20 transition-all">
            <p className="text-muted-foreground mb-2">IoT Security</p>
            <h3 className="text-3xl md:text-4xl font-bold text-cyan-400">
              USD 24.6 Billion
            </h3>
            <p className="text-sm text-muted-foreground mt-1">by 2031</p>
          </div>

        </div>

        {/* Growth Line */}
        <div className="glass-dark rounded-xl p-6 border border-cyan-500/30 mb-16 text-center flex items-center justify-center gap-3">
          <TrendingUp className="text-cyan-400" />
          <p className="text-lg text-foreground">
            Growth driven by smart cities, mandates & 5G
          </p>
        </div>

        {/* Reality vs Shift */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Reality */}
          <div className="glass-dark p-8 rounded-xl border border-red-500/30 hover:border-red-500/60 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <ShieldAlert className="text-red-400" />
              <h3 className="text-xl font-bold">Reality</h3>
            </div>

            <p className="text-muted-foreground text-lg">
              Every connected device = A potential attack point
            </p>
          </div>

          {/* Shift */}
          <div className="glass-dark p-8 rounded-xl border border-cyan-500/30 hover:border-cyan-500/60 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <ArrowRight className="text-cyan-400" />
              <h3 className="text-xl font-bold">Shift</h3>
            </div>

            <p className="text-muted-foreground text-lg">
              Security is legally enforced, budget-backed, mission-critical
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}