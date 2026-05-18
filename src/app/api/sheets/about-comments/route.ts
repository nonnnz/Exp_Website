import { NextResponse } from "next/server";

const ABOUT_COMMENTS_SHEET_URL = process.env.ABOUT_COMMENTS_SHEET_URL;

export async function GET() {
  if (!ABOUT_COMMENTS_SHEET_URL) {
    return NextResponse.json(
      { error: "Missing ABOUT_COMMENTS_SHEET_URL" },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(ABOUT_COMMENTS_SHEET_URL, {
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
    console.error("[api/sheets/about-comments] Failed to fetch sheet:", error);
    return NextResponse.json(
      { error: "Failed to fetch sheet" },
      { status: 500 },
    );
  }
}

