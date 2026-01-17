import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { message: "Quote API under construction" },
    { status: 200 }
  );
}
