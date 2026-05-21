"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import BadgeCard from "./BadgeCard";

export default function PrintBadge({ lead }: any) {

  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
  });

  return (
<div className="flex flex-col items-center">
  
      <div ref={componentRef}>
        <BadgeCard lead={lead} />
      </div>

      <button
        onClick={handlePrint}
        className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-lg"
      >
        Print Badge
      </button>

    </div>
  );
}