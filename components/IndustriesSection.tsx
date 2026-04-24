'use client';

import React from 'react';
import {
  Building2,
  Zap,
  Truck,
  HeartPulse,
  Factory,
  Home,
  Plane,
  ShoppingCart,
  Network,
} from 'lucide-react';

export function IndustriesSection() {
  const industries = [
    { icon: Building2, title: 'Smart Cities & Government' },
    { icon: Zap, title: 'Energy, Utilities & Oil & Gas' },
    { icon: Truck, title: 'Logistics, Ports & Supply Chain' },
    { icon: HeartPulse, title: 'Healthcare & Life Sciences' },
    { icon: Factory, title: 'Manufacturing & Industry 4.0 (IIoT)' },
    { icon: Home, title: 'Real Estate & Smart Buildings' },
    { icon: Plane, title: 'Transportation, Mobility & Aviation' },
    { icon: ShoppingCart, title: 'Retail, E-Commerce & Consumer Tech' },
    { icon: Network, title: 'Telecom, Cloud & Digital Infrastructure' },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background via-cyan-500/5 to-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-cyan-400 font-semibold tracking-widest uppercase mb-4">
            Industries
          </p>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            One Platform. All Critical Sectors.
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Cross-industry security. Unified national resilience.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="glass-dark p-6 rounded-xl border border-cyan-500/30 hover:border-cyan-500/60 transition-all group hover:shadow-lg hover:shadow-cyan-500/20 flex items-center gap-4"
              >
                <div className="p-3 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-all">
                  <Icon className="text-cyan-400" size={22} />
                </div>

                <p className="text-foreground font-medium text-sm">
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