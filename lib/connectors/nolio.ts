import type { ExternalConnector } from "./types";

/**
 * Nolio connector boundary.
 *
 * Important: the product specification explicitly forbids inventing API endpoints.
 * We therefore expose the connector contract now and only activate real OAuth/API calls
 * once official Nolio documentation and application credentials are configured.
 */
export class NolioConnector implements ExternalConnector {
  provider = "nolio" as const;

  isConfigured() {
    return Boolean(
      process.env.NOLIO_CLIENT_ID &&
      process.env.NOLIO_CLIENT_SECRET &&
      process.env.NOLIO_REDIRECT_URI
    );
  }

  async getAuthorizationUrl(): Promise<string> {
    throw new Error("Nolio OAuth endpoint not configured. Verify the official Nolio API documentation before enabling.");
  }
}
