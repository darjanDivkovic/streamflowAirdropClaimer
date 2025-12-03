import { useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { fetchClaimantData, checkEligibility } from "../services/streamflow";
import { getDecimals, lamportsToTokens } from "../utils/format";

type EligibilityEntry = {
  distributorAddress: string;
  amountUnlocked: string;
  amountClaimed: string;
};

export function useUserEligibility(
  connected: boolean,
  publicKey: PublicKey | null,
  distributor: any,
  airdropId?: string
) {
  const [claim, setClaim] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!connected || !publicKey || !distributor || !airdropId) {
      setClaim(null);
      return;
    }

    const check = async () => {
      setLoading(true);

      const wallet = publicKey.toBase58();
      const decimals = getDecimals(distributor.mint);

      let alloc: any;

      // 1) Try fetching claimant data (may throw if claimant does not exist)
      try {
        alloc = await fetchClaimantData(airdropId, wallet);
      } catch (err: any) {
        if (err.code === "CLAIMANT_DOES_NOT_EXIST") {
          setClaim({
            unlocked: 0,
            total: 0,
            eligible: false,
            claimed: false,
            proof: [],
            unclaimable: true,
          });
          setLoading(false);
          return;
        }

        console.error("fetchClaimantData error:", err);
        setLoading(false);
        return;
      }

      // Convert unlocked/locked values
      const unlocked = lamportsToTokens(alloc.amountUnlocked, decimals);
      const locked = lamportsToTokens(alloc.amountLocked, decimals);
      const total = unlocked + locked;

      // 2) Eligibility status
      const eligList = await checkEligibility(wallet);
      const elig = eligList.find(
        (e: EligibilityEntry) => e.distributorAddress === airdropId
      );

      const eligible = Number(elig?.amountUnlocked || 0) > 0;
      const claimed =
        Number(elig?.amountUnlocked || 0) ===
        Number(elig?.amountClaimed || 0);

      setClaim({
        unlocked,
        total,
        eligible,
        claimed,
        proof: alloc.proof ?? [],
        unclaimable: false,
      });

      setLoading(false);
    };

    check();
  }, [connected, publicKey, distributor, airdropId]);

  return { claim, loading };
}
