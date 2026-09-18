import { NextResponse } from "next/server";
import { NolioConnector } from "@/lib/connectors/nolio";

export async function GET() {
  const connector = new NolioConnector();
  return NextResponse.json({
    provider: "nolio",
    configured: connector.isConfigured(),
    mode: connector.isConfigured() ? "credentials-present" : "demo",
    message: connector.isConfigured()
      ? "Credentials are present. Verify official endpoints/scopes before enabling OAuth."
      : "Set NOLIO_CLIENT_ID, NOLIO_CLIENT_SECRET and NOLIO_REDIRECT_URI to prepare the connection."
  });
}
