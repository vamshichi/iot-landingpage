import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

  const speakers =
    await prisma.speaker.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  return NextResponse.json({
    success: true,
    speakers,
  });
}

export async function POST(
  req: NextRequest
) {

  try {

    const body = await req.json();

    if (
      !body.name ||
      !body.role ||
      !body.company ||
      !body.image
    ) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Missing required fields",
        },
        { status: 400 }
      );
    }

    const speaker =
      await prisma.speaker.create({
        data: {
          name: body.name,
          role: body.role,
          company: body.company,
          image: body.image,
          linkedinUrl:
            body.linkedinUrl || "",
        },
      });

    return NextResponse.json({
      success: true,
      speaker,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create speaker",
      },
      { status: 500 }
    );
  }
}