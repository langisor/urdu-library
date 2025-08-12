import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: 200,
    message: "success",
    data: {
      name: "beginning-urdu",
      version: "1.0.0",
      description: "https://begining-urdu.netlify.app  APIs",
      endpoints: [
        {
          name: "q",
          description: "query database table for specific column values",
          method: "GET",
          parameters: [
            {
              name: "table",
              type: "string",
              description: "table name",
            },
            {
              name: "column",
              type: "string",
              description: "column name",
            },
          ],
        }
      ],
    },
  });
}
