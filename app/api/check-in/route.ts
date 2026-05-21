import {prisma} from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

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

    // Already checked in
    if (lead.checkedIn) {

      return NextResponse.json({
        success: true,
        alreadyCheckedIn: true,
        message: `${lead.fullName} already checked-in`,
        lead,
      });
    }

    // Update attendance
    const updatedLead = await prisma.lead.update({
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
      alreadyCheckedIn: false,
      message: `Welcome ${lead.fullName}`,
      lead: updatedLead,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}