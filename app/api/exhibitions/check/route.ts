import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const count = await prisma.exhibition.count();
    return NextResponse.json(
      { hasExhibitions: count > 0, count },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("Error checking exhibitions count:", error);
    return NextResponse.json({ hasExhibitions: false, count: 0 });
  }
}
