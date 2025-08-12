import { NextResponse, NextRequest } from "next/server";
import { queryClient } from "@/server/postgres-client";
import {
  _db_columns_names,
  _db_tables_names,
} from "../_definitions/data-services";

/**
 *  query database table for specific column/row value/s
 * @param req
 * @returns json response with specific column/row value/s
 * @example
 * GET /api/q?table=verbs &column=verb &row=1
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  let table = searchParams.get("table");
  let column = searchParams.get("column") || "*";
  let row = searchParams.get("row") || "*";

  //  checking query and parameters

  // if table key not present
  if (!table) {
    return NextResponse.json({ error: "Missing table" }, { status: 400 });
  }

  // if table name not present  in database tables names
  if (!_db_tables_names.includes(table)) {
    return NextResponse.json({ error: "Invalid table" }, { status: 400 });
  }

  // if column name not present  in database columns names
  if (!_db_columns_names.includes(column)) {
    //  set column to *
    column = "*";
  }

  if (row !== "*" && isNaN(Number(row))) {
    //  set row to *
    row = "*";
  }
  try {
    const result =
      await queryClient`SELECT ${column} FROM ${table} WHERE id = ${row}`;
    return NextResponse.json({
      status: 200,
      message: "success",
      table,
      column,
      row,
      length: result.length,
      data: result,
    });
  } catch (error) {
    console.error("Failed to query data:", error);
    return NextResponse.json({
      message: "Internal Server Error",
      source: "q",
      status: 500,
    });
  }
}
