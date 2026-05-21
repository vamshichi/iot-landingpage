import {prisma} from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const { ticketId } = await req.json();

  const lead = await prisma.lead.findFirst({
    where: {
      ticketId,
    },
  });

  if (!lead) {
    return NextResponse.json({
      success: false,
      message: "Invalid Ticket",
    });
  }

  if (lead.checkedIn) {
    return NextResponse.json({
      success: false,
      message: "Already Checked-In",
    });
  }

  await prisma.lead.update({
    where: {
      id: lead.id,
    },
    data: {
      checkedIn: true,
      checkedInAt: new Date(),
    },
  });

  return NextResponse.json({
    success: true,
    message: `Welcome ${lead.fullName}`,
  });
}