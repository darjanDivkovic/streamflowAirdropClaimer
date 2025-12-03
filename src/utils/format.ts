import { PublicKey } from "@solana/web3.js";
import { WSOL } from "../services/streamflow";

export function getDecimals(mint: PublicKey): number {
  return mint.equals(WSOL) ? 9 : 6;
}

export function lamportsToTokens(amount: string | number, decimals: number): number {
  return Number(amount) / 10 ** decimals;
}

export function formatTokens(amount: number, precision = 6): string {
  return amount.toFixed(precision).replace(/\.?0+$/, "");
}