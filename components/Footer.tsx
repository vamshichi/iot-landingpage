'use client';

import React from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background border-t border-cyan-500/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* About */}
          <div>
            <h3 className="text-lg font-bold glow-text-cyan mb-4">IoT Summit</h3>
            <p className="text-muted-foreground text-sm">
              Leading global conference on IoT security and cybersecurity infrastructure in the Middle East.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {['Agenda', 'Speakers', 'Sponsors', 'Register'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-cyan-400 transition-all">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-cyan-400" />
                <a href="mailto:info@confexmeet.com" className="hover:text-cyan-400 transition-all">
                  info@confexmeet.com
                </a>
              </div>

              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-cyan-400" />
                <span>+91 7975 429 127</span>
              </div>

              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-cyan-400" />
                <span>5C, 115, OMBR Layout, Bangalore-43</span>
              </div>

            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: 'https://www.facebook.com/people/ConFex-Meet/61581833408204/' },
                { icon: Linkedin, href: 'https://www.linkedin.com/company/confex-meet/' },
                { icon: Instagram, href: 'https://www.instagram.com/confex.meet/' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
            {/* Organizer */}
              <div className="items-center pt-4">
                <span className="font-semibold text-foreground mb-4">
                  Event Organised by:
                </span>
                <div>
                <Image
                  src="/confex.png" // put logo in public folder
                  alt="ConfexMeet"
                  width={100}
                  height={30}
                  className="object-contain"
                />
                </div>
              </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-cyan-500/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground gap-4">
            
            {/* Left */}
            <p>&copy; 2026 IoT Security World Summit. All rights reserved.</p>

            {/* Right */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              
              {/* Policies */}
              <div className="flex space-x-6">
                <a href="#" className="hover:text-cyan-400 transition-all">Privacy Policy</a>
                <a href="#" className="hover:text-cyan-400 transition-all">Terms of Service</a>
                <a href="#" className="hover:text-cyan-400 transition-all">Cookie Policy</a>
              </div>

              

            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}