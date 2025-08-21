import fs from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  request: NextRequest;
  params: Promise<{ filename: string }>;
}
const audioPath = path.join(
  process.cwd(),
  "public",
  "media",
  "mondly",
  "audios"
);
export async function GET({ request, params }: Props) {
  try {
    const { filename } = await params;
    const filePath = path.join(audioPath, filename);
    const fileStat = await fs.stat(filePath);
    const audioFile = await fs.readFile(filePath);
    return new NextResponse(audioFile, {
      status: 200,
      headers: new Headers({
        "Content-Type": "audio/mpeg",
        "Content-Length": fileStat.size.toString(),
        "Content-Disposition": `attachment; filename="${filename}"`,
      }),
    });
  } catch (error) {
    console.error("Error fetching audio file:", error);
    return NextResponse.json({ error: "File Not Found" }, { status: 404 });
  }
}
