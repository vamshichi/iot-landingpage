"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useFormModal } from "@/components/FormModal";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openModal } = useFormModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Agenda", href: "#agenda" },
    { label: "Speakers", href: "#speakers" },
    { label: "Industries", href: "#industries" },
    { label: "Sponsors", href: "#sponsors" },
    { label: "Partner With Us", href: "#partner" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-md border-b border-gray-200"
          : "bg-gradient-to-r from-white/10 via-white/5 to-black/20 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="#" className="flex items-center">
            <Image
              src="/iotlogo.png"
              alt="IoT Summit Logo"
              width={140}
              height={40}
              priority
              className="object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  isScrolled
                    ? "text-gray-700 hover:text-cyan-500"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons (UNCHANGED COLORS) */}
          <div className="hidden md:flex items-center gap-3">

            <button
              onClick={() => openModal("delegate")}
              className="px-5 py-2 rounded-lg bg-cyan-500 text-white font-semibold hover:bg-cyan-600 hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
            >
              Delegate
            </button>

            <button
              onClick={() => openModal("sponsor")}
              className="px-5 py-2 rounded-lg border border-cyan-500 text-cyan-500 font-semibold hover:bg-cyan-500 hover:text-white transition-all"
            >
              Sponsor
            </button>

          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition ${
              isScrolled ? "text-gray-700" : "text-white"
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 bg-white/95 backdrop-blur-md mt-2 rounded-xl shadow-lg">

            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-cyan-500 transition-all"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}

            {/* Mobile CTA Buttons */}
            <div className="flex flex-col gap-2 px-3 pt-2">

              <button
                onClick={() => {
                  openModal("delegate");
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 rounded-lg bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition-all"
              >
                Register as Delegate
              </button>

              <button
                onClick={() => {
                  openModal("sponsor");
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 rounded-lg border border-cyan-500 text-cyan-500 font-semibold hover:bg-cyan-500 hover:text-white transition-all"
              >
                Become a Sponsor
              </button>

            </div>
          </div>
        )}
      </div>
    </nav>
  );
}