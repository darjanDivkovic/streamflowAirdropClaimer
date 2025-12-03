import { useState } from "react";
import { BN } from "@coral-xyz/anchor";
import { claimAirdrop, fetchClaimantData } from "../services/streamflow";

export function useClaimAirdrop() {
  const [claiming, setClaiming] = useState(false);
  const [txId, setTxId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const claim = async (
    airdropId: string,
    wallet: any,
    onSuccess?: () => void
  ) => {
    if (!wallet?.publicKey || !wallet?.signTransaction) return;

    setClaiming(true);
    setError(null);
    setTxId(null);

    try {
      const claimantData = await fetchClaimantData(airdropId, wallet.publicKey.toBase58());

      const txId = await claimAirdrop(
        {
          id: airdropId,
          proof: claimantData.proof,
          amountUnlocked: new BN(claimantData.amountUnlocked),
          amountLocked: new BN(claimantData.amountLocked || "0"),
          claimableAmount: new BN(claimantData.amountUnlocked).sub(new BN(claimantData.amountLocked ))
        },
        wallet
      );

      setTxId(txId);
      onSuccess?.();
    } catch (err: any) {
      setError(err.message || "Claim failed");
    } finally {
      setClaiming(false);
    }
  };

  return { claim, claiming, txId, error, reset: () => { setTxId(null); setError(null); } };
}