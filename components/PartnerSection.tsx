'use client';

import React from 'react';
import { Users, Megaphone, Briefcase, ArrowRight } from 'lucide-react';

export function PartnerSection() {
  const partnerTypes = [
    {
      icon: Megaphone,
      title: 'Media Partner',
      description: 'Extend your reach to 3000+ industry leaders',
      benefits: [
        'Media coverage rights',
        'Branded content opportunities',
        'Speaker invitations',
        'Exclusive interviews access',
        'Social media collaboration',
      ],
    },
    {
      icon: Users,
      title: 'Association Partner',
      description: 'Jointly promote IoT security excellence',
      benefits: [
        'Co-branded initiatives',
        'Member ticket discounts',
        'Cross-promotion opportunities',
        'Joint research initiatives',
        'Executive networking events',
      ],
    },
    {
      icon: Briefcase,
      title: 'Government Partner',
      description: 'Shape critical infrastructure policy',
      benefits: [
        'Policy discussion forum',
        'Government speaker slots',
        'Regulatory insights sharing',
        'Strategic advisory role',
        'Exclusive government briefings',
      ],
    },
  ];

  return (
    <section id="partner" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Partner <span className="glow-text-cyan">With Us</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join as a strategic partner and help shape the future of IoT security globally.
          </p>
        </div>

        {/* Partner Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {partnerTypes.map((partner, i) => {
            const Icon = partner.icon;
            return (
              <div
                key={i}
                className="group glass-dark p-8 rounded-xl border border-cyan-500/30 hover:border-cyan-500/60 transition-all"
              >
                <div className="mb-6 p-4 w-fit rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-all">
                  <Icon size={32} className="text-cyan-400" />
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-all">
                  {partner.title}
                </h3>

                <p className="text-muted-foreground mb-6">{partner.description}</p>

                <div className="mb-8">
                  <p className="font-semibold text-sm text-cyan-400 mb-3">What&apos;s Included:</p>
                  <ul className="space-y-2">
                    {partner.benefits.map((benefit, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* <button className="w-full px-4 py-3 rounded-lg border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/60 transition-all font-semibold flex items-center justify-center gap-2">
                  Learn More
                  <ArrowRight size={16} />
                </button> */}
              </div>
            );
          })}
        </div>

        {/* Contact Section */}
        <div className="glass-dark p-8 rounded-xl border border-cyan-500/30 text-center">
          <h3 className="text-2xl font-bold mb-4 text-foreground">Ready to Partner?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our partnerships team is ready to discuss custom partnership arrangements tailored to your organization&apos;s goals.
          </p>
          <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-background font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
            Contact Partnerships Team
          </button>
        </div>
      </div>
    </section>
  );
}
