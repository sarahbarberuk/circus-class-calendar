// app/api/classes/route.ts
import { NextResponse } from "next/server";
import { fetchClasses } from "../../../lib/db";

export async function GET() {
  try {
    const classes = await fetchClasses();
    return NextResponse.json({ classes });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch classes" },
      { status: 500 }
    );
  }
}
