"use client";

import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
  const phoneNumber = "917975429127";
  const message = "Hi, I’m interested in your event. Can you share more details?";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <div className="fixed bottom-6 right-6 z-50">

        {/* Pulse Ring */}
        <span className="absolute inset-0 rounded-full bg-green-500 opacity-30 animate-ping"></span>

        {/* Main Button */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:shadow-green-500/40 group cursor-pointer"
        >

          {/* Icon */}
          <FaWhatsapp size={22} />

          {/* Hover Text */}
          <span className="max-w-0 overflow-hidden group-hover:max-w-[200px] transition-all duration-300 whitespace-nowrap text-sm font-medium">
            Chat with us
          </span>

        </motion.div>
      </div>
    </a>
  );
}