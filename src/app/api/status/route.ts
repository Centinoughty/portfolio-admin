import { NextResponse } from "next/server";

export async function GET() {
  const url = "https://nadeemsiyam.com";
  const start = Date.now();

  try {
    const res = await fetch(url, { cache: "no-store" });
    const responseTime = Date.now() - start;

    return NextResponse.json({
      status: res.ok ? "UP" : "DOWN",
      httpStatus: res.status,
      responseTime,
      checkedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({
      status: "DOWN",
      httpStatus: null,
      responseTime: null,
      checkedAt: new Date().toISOString(),
    });
  }
}
