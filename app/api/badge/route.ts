import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

import { generateQRCode } from "@/lib/generateQRCode";
import { generateTicketId } from "@/lib/generateTicket";

export async function POST(req: Request) {

  const { leadId } = await req.json();

  const lead = await prisma.lead.findUnique({
    where: {
      id: leadId,
    },
  });

  if (!lead) {
    return NextResponse.json({
      success: false,
      message: "Lead not found",
    });
  }

  const ticketId = generateTicketId();

  const qrPayload = JSON.stringify({
    ticketId,
    leadId: lead.id,
    event: "IoT Security World Summit 2026",
  });

  const qrCode = await generateQRCode(qrPayload);

  const updatedLead = await prisma.lead.update({
    where: {
      id: lead.id,
    },
    data: {
      ticketId,
      qrCode,
      badgeType: lead.formType.toUpperCase(),
    },
  });

  return NextResponse.json({
    success: true,
    lead: updatedLead,
  });
}