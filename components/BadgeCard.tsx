"use client";

interface Props {
  lead: any;
}

export default function BadgeCard({ lead }: Props) {

  return (
<div className="w-[350px] h-[550px] bg-white rounded-3xl overflow-hidden shadow-xl flex flex-col">

      <div className="bg-[#041220] text-white p-6 text-center">

        <h1 className="text-2xl font-bold">
          IoT Security World Summit
        </h1>

        <p className="text-sm text-cyan-300 mt-1">
          Abu Dhabi 2026
        </p>

      </div>

      <div className="p-6 flex flex-col items-center flex-1">

        {/* <div className="w-28 h-28 rounded-full bg-slate-200 mb-4" /> */}

        <h2 className="text-2xl font-bold text-black text-center">
          {lead.fullName}
        </h2>

        <p className="text-gray-500 text-center">
          {lead.jobTitle}
        </p>

        <p className="text-sm text-gray-400 text-center mt-1">
          {lead.companyName ||
            lead.organizationCompanyName ||
            lead.companyOrganizationName}
        </p>

        <div className="mt-6">
          <img
            src={lead.qrCode}
            alt="QR"
            className="w-36 h-36 object-contain"
          />
        </div>

        <div className="mt-4">
          <span className="bg-black text-white px-5 py-2 rounded-full text-sm">
            {lead.badgeType}
          </span>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          {lead.ticketId}
        </p>

      </div>
    </div>
  );
}