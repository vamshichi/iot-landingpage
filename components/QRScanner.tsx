"use client";

import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";

export default function QRScanner() {

  const [message, setMessage] = useState("");

  useEffect(() => {

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: 250,
      },
      false
    );

    scanner.render(success, error);

    async function success(decodedText: string) {

      try {

        const parsed = JSON.parse(decodedText);

        const res = await fetch("/api/check-in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ticketId: parsed.ticketId,
          }),
        });

        const data = await res.json();

        setMessage(data.message);

      } catch (err) {
        setMessage("Invalid QR Code");
      }

    }

    function error(err: any) {
      console.log(err);
    }

  }, []);

  return (
    <div>

      <div id="reader" />

      <div className="mt-6 text-xl font-semibold">
        {message}
      </div>

    </div>
  );
}