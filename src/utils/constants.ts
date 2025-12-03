import { PublicKey } from "@solana/web3.js";

// App routes - used in App.tsx
export const ROUTES = {
  LANDING: "/",
  DASHBOARD: "/dashboard",
  AIRDROPS: "/airdrops",
  AIRDROP_DETAILS: "/airdrop/:id",
} as const;

// Streamflow - used in streamflow.tsx
export const DEVNET_RPC = "https://api.devnet.solana.com";
export const STREAMFLOW_STAGING_API = "https://staging-api.streamflow.finance/v2";
export const WSOL = new PublicKey("So11111111111111111111111111111111111111112");
