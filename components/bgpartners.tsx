"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Partner {
  id: string;
  name: string;
  logo: string;
  websiteUrl?: string;
}

export function BgPartners() {

  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    fetch("/api/admin/partners")
      .then((res) => res.json())
      .then((data) => setPartners(data.partners));
  }, []);

  return (
    <section
      id="partner"
      className="py-24 bg-gradient-to-b from-white to-cyan-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-cyan-500 font-semibold tracking-[0.25em] uppercase mb-3">
            Official Media Partners
          </p>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Our Global Media Partners
          </h2>
        </motion.div>

        {/* Auto Scrolling Logos */}
        <div className="relative w-full overflow-hidden">

          {/* Gradient Left */}
          <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-cyan-50 to-transparent" />

          {/* Gradient Right */}
          <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-cyan-50 to-transparent" />

          <motion.div
            className="flex gap-8 w-max"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
          >
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="
                  min-w-[220px]
                  h-[120px]
                  bg-white
                  rounded-2xl
                  border
                  border-cyan-100
                  shadow-md
                  flex
                  items-center
                  justify-center
                  px-8
                  hover:shadow-xl
                  transition-all
                  duration-300
                "
              >
                {partner.websiteUrl ? (
                  <a
                    href={partner.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={180}
                      height={80}
                      className="object-contain"
                    />
                  </a>
                ) : (
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={180}
                    height={80}
                    className="object-contain"
                  />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}