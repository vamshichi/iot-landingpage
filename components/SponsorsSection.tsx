'use client';

import React, { useState } from 'react';
import { Crown, Star, Gem, Award } from 'lucide-react';

export function SponsorsSection() {
  const [activeTab, setActiveTab] = useState('platinum');

  const sponsorTiers = {
    platinum: {
      name: 'Platinum',
      icon: Crown,
      color: 'from-cyan-500 to-blue-500',
      price: '$150,000',
      benefits: [
        'Prime booth location & 1000 sqft',
        '10 conference passes',
        'Speaking slot in main hall',
        'Logo on all marketing materials',
        'VIP dinner invitation',
        'First-look product demo slot',
        'Featured in sponsor highlights',
        'Exclusive networking event',
      ],
      companies: ['TechCorp', 'SecureNet', 'CyberGuard'],
    },
    gold: {
      name: 'Gold',
      icon: Star,
      color: 'from-yellow-500 to-orange-500',
      price: '$75,000',
      benefits: [
        'Premium booth location & 500 sqft',
        '6 conference passes',
        'Speaking opportunity',
        'Logo on marketing materials',
        'VIP dinner invitation',
        'Product demo slot',
        'Sponsor highlights',
      ],
      companies: ['InnovateLabs', 'DefenseCore', 'SecureScale'],
    },
    silver: {
      name: 'Silver',
      icon: Gem,
      color: 'from-slate-400 to-slate-500',
      price: '$40,000',
      benefits: [
        'Standard booth location & 300 sqft',
        '4 conference passes',
        'Logo on marketing materials',
        'Networking lunch invitation',
        'Product demo slot',
        'Sponsor listing',
      ],
      companies: ['NextGen Security', 'IoT Solutions', 'Guardian Tech'],
    },
    bronze: {
      name: 'Bronze',
      icon: Award,
      color: 'from-orange-600 to-amber-600',
      price: '$20,000',
      benefits: [
        'Standard booth location & 150 sqft',
        '2 conference passes',
        'Logo on website',
        'Networking opportunities',
        'Sponsor listing',
      ],
      companies: ['Quick Sec', 'Alert Systems', 'Safe IoT'],
    },
  };

  const tier = sponsorTiers[activeTab as keyof typeof sponsorTiers];
  const Icon = tier.icon;

  return (
    <section id="sponsors" className="py-20 bg-gradient-to-b from-background via-purple-500/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Sponsorship <span className="glow-text-cyan">Opportunities</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Partner with us to reach 3000+ global IoT and cybersecurity leaders.
          </p>
        </div>

        {/* Tier Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {Object.entries(sponsorTiers).map(([key, tierData]) => {
            const TierIcon = tierData.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  activeTab === key
                    ? `bg-gradient-to-r ${tierData.color} text-background shadow-lg`
                    : 'glass-dark border-cyan-500/30 text-foreground hover:border-cyan-500/60'
                }`}
              >
                <TierIcon size={18} />
                {tierData.name}
              </button>
            );
          })}
        </div>

        {/* Tier Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Details */}
          <div className="glass-dark p-8 rounded-xl border border-cyan-500/30">
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-4 rounded-lg bg-gradient-to-r ${tier.color} bg-opacity-10`}>
                <Icon size={32} className="text-cyan-400" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-foreground">{tier.name} Sponsor</h3>
                <p className="text-2xl font-bold glow-text-cyan mt-2">{tier.price}</p>
              </div>
            </div>

            <h4 className="font-semibold text-lg mb-4 text-foreground">Package Includes:</h4>
            <ul className="space-y-3">
              {tier.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <button className="w-full mt-8 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-background font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
              Become a {tier.name} Sponsor
            </button>
          </div>

          {/* Current Sponsors */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-foreground">Current {tier.name} Sponsors</h4>
            <div className="grid grid-cols-2 gap-4">
              {tier.companies.map((company, i) => (
                <div
                  key={i}
                  className="glass-dark p-6 rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 transition-all flex items-center justify-center h-32"
                >
                  <p className="font-bold text-center text-cyan-400">{company}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 glass-dark rounded-lg border border-cyan-500/20">
              <p className="text-sm text-muted-foreground mb-4">
                <span className="font-semibold text-cyan-400">Limited Slots Available</span> for {tier.name} sponsorship tier. 
                Secure your position now to maximize brand visibility.
              </p>
              <button className="w-full px-4 py-2 rounded-lg border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-all font-semibold text-sm">
                Download Sponsorship Brochure
              </button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-6">Not sure which tier is right for you?</p>
          <button className="px-8 py-3 rounded-lg glass-dark border border-cyan-500/30 text-cyan-400 hover:border-cyan-500/60 hover:bg-cyan-500/10 transition-all font-semibold">
            Schedule a Sponsorship Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
