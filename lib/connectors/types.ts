export type ExternalProviderName = "nolio" | "strava" | "garmin";

export interface ExternalActivity {
  provider: ExternalProviderName;
  externalId: string;
  occurredAt: string;
  sport: string;
  durationSeconds?: number;
  distanceMeters?: number;
  raw?: unknown;
}

export interface ExternalConnector {
  provider: ExternalProviderName;
  isConfigured(): boolean;
  getAuthorizationUrl?(): Promise<string>;
  exchangeCode?(code: string): Promise<void>;
  listActivities?(from: Date, to: Date): Promise<ExternalActivity[]>;
  revoke?(): Promise<void>;
}
