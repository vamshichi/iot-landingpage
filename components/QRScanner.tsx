"use client";

import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";

export default function QRScanner() {

  const [message, setMessage] = useState("");

  useEffect(() => {

    let scanner: Html5QrcodeScanner;

    const startScanner = async () => {

      scanner = new Html5QrcodeScanner(
        "reader",
        {
          fps: 10,
          qrbox: {
            width: 250,
            height: 250,
          },
          rememberLastUsedCamera: true,
        },
        false
      );

      scanner.render(onScanSuccess, onScanFailure);
    };

    startScanner();

    async function onScanSuccess(decodedText: string) {

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

      } catch (error) {

        console.error(error);

        setMessage("Invalid QR Code");
      }
    }

    function onScanFailure(error: any) {
      // ignore scan errors
    }

    return () => {
      scanner?.clear().catch(() => {});
    };

  }, []);

  return (
    <div className="max-w-xl mx-auto">

      <div
        id="reader"
        className="overflow-hidden rounded-2xl border border-cyan-500/20"
      />

      <div className="mt-6 text-center">

        <p className="text-lg font-semibold text-cyan-400">
          {message}
        </p>

      </div>

    </div>
  );
}