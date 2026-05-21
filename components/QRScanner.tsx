"use client";

import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import PrintBadge from "./PrintBadge";

export default function QRScanner() {

  const [message, setMessage] = useState("");
  const [scannedLead, setScannedLead] = useState<any>(null);
  const [alreadyCheckedIn, setAlreadyCheckedIn] = useState(false);

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

        setScannedLead(data.lead);

        setAlreadyCheckedIn(
          data.alreadyCheckedIn || false
        );

      } catch (error) {

        console.error(error);

        setMessage("Invalid QR Code");
      }
    }

    function onScanFailure(error: any) {
      // ignore scan errors
    }

    return () => {
      scanner?.clear().catch(() => { });
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

        {scannedLead && (

  <div className="mt-8 bg-[#06111f] border border-cyan-500/20 rounded-2xl p-6">

    <div className="text-center">

      <h2 className="text-2xl font-bold text-white">
        {scannedLead.fullName}
      </h2>

      <p className="text-slate-400 mt-2">
        {scannedLead.jobTitle}
      </p>

      <p className="text-cyan-400 text-sm mt-1">
        {scannedLead.companyName ||
          scannedLead.organizationCompanyName ||
          scannedLead.companyOrganizationName}
      </p>

      <div className="mt-4">

        {alreadyCheckedIn ? (

          <span className="px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-sm">
            Already Checked-In
          </span>

        ) : (

          <span className="px-4 py-2 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-sm">
            Checked-In Successfully
          </span>

        )}

      </div>

    </div>

    <div className="mt-8 flex justify-center">
      <PrintBadge lead={scannedLead} />
    </div>

  </div>
)}

      </div>

    </div>
  );
}