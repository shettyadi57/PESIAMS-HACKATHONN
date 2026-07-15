import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const MAX_TEAMS = 50;

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "registrations.json");
    let count = 0;
    try {
      const raw = fs.readFileSync(filePath, "utf-8");
      const store = JSON.parse(raw);
      count = store.count || 0;
    } catch {
      count = 0;
    }
    return NextResponse.json({
      count,
      max: MAX_TEAMS,
      spotsLeft: Math.max(0, MAX_TEAMS - count),
      isFull: count >= MAX_TEAMS,
    });
  } catch {
    return NextResponse.json({ count: 0, max: MAX_TEAMS, spotsLeft: MAX_TEAMS, isFull: false });
  }
}
