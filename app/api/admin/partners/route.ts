import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

  const partners =
    await prisma.partner.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  return NextResponse.json({
    success: true,
    partners,
  });
}

export async function POST(
  req: NextRequest
) {

  try {

    const body = await req.json();

    if (
      !body.name ||
      !body.logo
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

    const partner =
      await prisma.partner.create({
        data: {
          name: body.name,
          logo: body.logo,
          websiteUrl:
            body.websiteUrl || "",
        },
      });

    return NextResponse.json({
      success: true,
      partner,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create partner",
      },
      { status: 500 }
    );
  }
}