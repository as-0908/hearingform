import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const gasUrl = process.env.GAS_URL;

  if (!gasUrl) {
    console.error("GAS_URL environment variable is not set");
    return NextResponse.json(
      { error: "GAS_URL is not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();

    const gasRes = await fetch(gasUrl, {
      method: "POST",
      body: JSON.stringify(body),
      redirect: "follow",
    });

    const responseText = await gasRes.text();
    console.log("GAS status:", gasRes.status);
    console.log("GAS response:", responseText);

    if (!gasRes.ok && gasRes.status !== 302) {
      return NextResponse.json(
        { error: "GAS request failed", status: gasRes.status, detail: responseText },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit", detail: String(error) },
      { status: 500 }
    );
  }
}
