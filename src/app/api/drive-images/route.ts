import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

export async function GET() {
  try {
    const files = fs.readdirSync(GALLERY_DIR);

    const images = files
      .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
      .map((file, index) => ({
        id: `local-${index}`,
        name: file,
        src: `/gallery/${file}`,
        createdTime: "",
      }));

    return NextResponse.json({ images });
  } catch (err) {
    console.error("[drive-images] Failed to read public/gallery:", err);
    return NextResponse.json(
      { error: "Failed to read gallery directory" },
      { status: 500 },
    );
  }
}
