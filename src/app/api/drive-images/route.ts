import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Papa from "papaparse";

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");
const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".avif",
]);
const SHEET_ID = "1mKC3jokzjwcVFA6COD_GmAUZC3Jz-XYy3zn3c4mYtlY";
const SHEET_GID = "0";
const SKIPPED_SHEET_ROWS = 12;
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type GalleryImage = {
  id: string;
  name: string;
  src: string;
  createdTime: string;
  caption?: string;
  source: "local" | "drive";
};

type GalleryMeta = {
  localCount: number;
  driveCount: number;
  sheetUrl: string;
  sheetError: string | null;
  skippedRows: number;
  sheetRowCount: number;
  processedSheetRowCount: number;
};

function getLocalImages(): GalleryImage[] {
  const files = fs.readdirSync(GALLERY_DIR);

  return files
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .map((file, index) => ({
      id: `local-${index}`,
      name: file,
      src: `/gallery/${file}`,
      createdTime: "",
      source: "local" as const,
    }));
}

function extractDriveFileIds(value: string): string[] {
  const ids = new Set<string>();

  Array.from(
    value.matchAll(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/g),
  ).forEach((match) => {
    ids.add(match[1]);
  });

  Array.from(value.matchAll(/[?&]id=([a-zA-Z0-9_-]+)/g)).forEach((match) => {
    ids.add(match[1]);
  });

  return Array.from(ids);
}

function getCaption(row: string[]): string | undefined {
  return row
    .slice(1)
    .map((cell) => cell.trim())
    .find((cell) => cell.length > 0 && extractDriveFileIds(cell).length === 0);
}

async function getSheetDriveImages(): Promise<{
  images: GalleryImage[];
  rowCount: number;
  processedRowCount: number;
}> {
  const response = await fetch(SHEET_CSV_URL, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Sheet CSV request failed with status ${response.status}`);
  }

  const csv = await response.text();
  const parsed = Papa.parse<string[]>(csv, {
    skipEmptyLines: true,
  });

  if (parsed.errors.length > 0) {
    throw new Error(parsed.errors[0]?.message ?? "Failed to parse sheet CSV");
  }

  const rows = parsed.data;
  const processedRows = rows.slice(SKIPPED_SHEET_ROWS);
  const images = processedRows.flatMap((row, rowIndex) => {
    const timestamp = row[0]?.trim() ?? "";
    const caption = getCaption(row);
    const imageCells = row.slice(1);

    return imageCells.flatMap((cell, cellIndex) =>
      extractDriveFileIds(cell ?? "").map((fileId, fileIndex) => ({
        id: `drive-${SKIPPED_SHEET_ROWS + rowIndex + 1}-${cellIndex}-${fileIndex}-${fileId}`,
        name: caption ?? `Google Drive image ${fileId}`,
        caption,
        createdTime: timestamp,
        src: `https://drive.google.com/thumbnail?id=${encodeURIComponent(fileId)}&sz=w1600`,
        source: "drive" as const,
      })),
    );
  });

  return {
    images,
    rowCount: rows.length,
    processedRowCount: processedRows.length,
  };
}

export async function GET() {
  try {
    const localImages = getLocalImages();
    let driveImages: GalleryImage[] = [];
    let sheetError: string | null = null;
    let sheetRowCount = 0;
    let processedSheetRowCount = 0;

    try {
      const sheet = await getSheetDriveImages();
      driveImages = sheet.images;
      sheetRowCount = sheet.rowCount;
      processedSheetRowCount = sheet.processedRowCount;
    } catch (err) {
      console.error("[drive-images] Failed to read Google Sheet:", err);
      sheetError =
        err instanceof Error ? err.message : "Failed to read Google Sheet";
    }

    const meta: GalleryMeta = {
      localCount: localImages.length,
      driveCount: driveImages.length,
      sheetUrl: SHEET_CSV_URL,
      sheetError,
      skippedRows: SKIPPED_SHEET_ROWS,
      sheetRowCount,
      processedSheetRowCount,
    };

    return NextResponse.json({
      images: [...localImages, ...driveImages],
      meta,
    });
  } catch (err) {
    console.error("[drive-images] Failed to read public/gallery:", err);
    return NextResponse.json(
      { error: "Failed to read gallery directory" },
      { status: 500 },
    );
  }
}
