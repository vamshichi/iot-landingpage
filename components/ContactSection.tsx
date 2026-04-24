'use client';

import React from 'react';
import { Users, Briefcase, HelpCircle, ArrowRight } from 'lucide-react';

export function ContactSection() {
  const contacts = [
    {
      icon: Users,
      title: 'Delegate Enquiries',
      text: 'Register, passes, and participation details, please contact',
    },
    {
      icon: Briefcase,
      title: 'Sponsorship Enquiries',
      text: 'Partnerships, branding & business opportunities, please contact',
    },
    {
      icon: HelpCircle,
      title: 'General Contact',
      text: 'For all event-related queries, please contact',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background via-cyan-500/5 to-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-cyan-400 font-semibold tracking-widest uppercase mb-4">
            Contact
          </p>

          <h2 className="text-4xl md:text-5xl font-bold">
            CONTACT
          </h2>
        </div>

        {/* Contact Types */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {contacts.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="glass-dark p-6 rounded-xl border border-cyan-500/30 hover:border-cyan-500/60 transition-all"
              >
                <div className="mb-4 p-3 w-fit rounded-lg bg-cyan-500/10">
                  <Icon className="text-cyan-400" size={22} />
                </div>

                <h3 className="font-bold text-lg mb-2 text-foreground">
                  {item.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Main CTA Block */}
        <div className="glass-dark rounded-xl border border-cyan-500/30 p-10 text-center">

          <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Join the Movement Securing the UAE’s Future
          </h3>

          <p className="text-xl text-cyan-400 font-semibold mb-2">
            Secure Your Spot Today
          </p>

          <p className="text-muted-foreground mb-2">
            IoT Security World Summit Abu Dhabi 2026
          </p>

          <p className="text-muted-foreground mb-8">
            9th July 2026 | Abu Dhabi
          </p>

          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'REGISTER NOW',
              'BECOME A SPONSOR',
              'PARTNER WITH US',
            ].map((action, i) => (
              <button
                key={i}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-background font-semibold hover:shadow-lg hover:shadow-cyan-500/40 transition-all flex items-center gap-2"
              >
                {action}
                <ArrowRight size={16} />
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}