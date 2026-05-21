import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function POST(req: Request) {

  try {

    const { leadId } = await req.json();

    if (!leadId) {
      return NextResponse.json({
        success: false,
        message: "Lead ID required",
      });
    }

    await prisma.lead.update({
      where: {
        id: leadId,
      },
      data: {
        checkedIn: false,
        checkedInAt: null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Check-In Reset Successfully",
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json({
      success: false,
      message: "Failed to reset check-in",
    });
  }
}