import { NextResponse } from "next/server";
export async function GET() { return NextResponse.json({ ok: true, service: "lohan-29er-season-hub", timestamp: new Date().toISOString() }); }
