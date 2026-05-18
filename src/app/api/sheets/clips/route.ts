import { NextResponse } from "next/server";

const CLIPS_SHEET_URL = process.env.CLIPS_SHEET_URL;

export async function GET() {
  if (!CLIPS_SHEET_URL) {
    return NextResponse.json(
      { error: "Missing CLIPS_SHEET_URL" },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(CLIPS_SHEET_URL, {
      next: { revalidate: 600 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Sheets request failed: ${response.status}` },
        { status: response.status },
      );
    }

    const csv = await response.text();
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "content-type": "text/csv; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("[api/sheets/clips] Failed to fetch sheet:", error);
    return NextResponse.json(
      { error: "Failed to fetch sheet" },
      { status: 500 },
    );
  }
}

