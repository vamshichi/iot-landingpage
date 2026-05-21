"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import BadgeCard from "./BadgeCard";

export default function PrintBadge({ lead }: any) {

  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({

    contentRef: componentRef,

    documentTitle: `${lead.fullName}-badge`,

    pageStyle: `
      @page {
        margin: 0;
      }

      @media print {

        body {
          margin: 0;
          padding: 0;
          background: white;
        }

        body * {
          visibility: hidden;
        }

        #print-area,
        #print-area * {
          visibility: visible;
        }

        #print-area {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    `,
  });

  return (
    <div className="flex flex-col items-center">

      {/* PRINT AREA */}
      <div id="print-area" ref={componentRef}>
        <BadgeCard lead={lead} />
      </div>

      {/* BUTTON */}
      <button
        onClick={() => handlePrint()}
        className="mt-4 px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition-all text-white font-semibold"
      >
        Print Badge
      </button>

    </div>
  );
}