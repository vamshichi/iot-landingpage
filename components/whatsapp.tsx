"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const phoneNumber = "917975429127"; // without spaces or +
  const message = "Hi, I’m interested in your event. Can you share more details?";
  
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:shadow-green-500/40">

        <FaWhatsapp size={22} />

        {/* Optional Text (hidden on mobile) */}
        {/* <span className="hidden md:inline font-medium">
          Chat with us
        </span> */}

      </div>
    </a>
  );
}