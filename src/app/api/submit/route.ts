import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const gasUrl = process.env.GAS_URL;
    if (!gasUrl) {
      console.error("GAS_URL is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const body = await request.text();

    await fetch(gasUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}
