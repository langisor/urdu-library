// app/api/updateData/route.ts
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

/**
 * Update data in the JSON file.
 *   This function will handle a POST request, read the body, and write the new data to a file.
 * @param req
 * @returns
 */
export async function POST(req: Request) {
  try {
    const updatedData = await req.json();

    // Define the path to the JSON file.
    // process.cwd() gets the current working directory, which is the project root.
    const filePath = path.join(process.cwd(), "data.json");

    // Write the updated data to the file.
    await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2));

    return NextResponse.json(
      { message: "Data updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
