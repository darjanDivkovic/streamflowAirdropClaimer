import { SolanaDistributorClient } from "@streamflow/distributor/solana";
import { ICluster } from "@streamflow/common";
import { BN } from "@coral-xyz/anchor";

import { DEVNET_RPC, STREAMFLOW_STAGING_API, WSOL } from "../utils/constants";
import axios from "axios";

const client = new SolanaDistributorClient({
  cluster: ICluster.Devnet,
  clusterUrl: DEVNET_RPC,
  apiUrl: STREAMFLOW_STAGING_API
});

export { client as streamflowClient, WSOL };

export async function fetchDistributor(id: string) {
  const [distributor] = await client.getDistributors({ ids: [id] });
  return distributor!; 
}

export async function fetchClaimantData(airdropId: string, wallet: string) {
  try {
    const res = await axios.get(
      `${STREAMFLOW_STAGING_API}/api/airdrops/${airdropId}/claimants/${wallet}`
    );

    return res.data;
  } catch (err: any) {
    const apiError = err.response.data;

    if (apiError?.code === "CLAIMANT_DOES_NOT_EXIST") {
      const e: any = new Error(apiError.detail || "Claimant does not exist");
      e.code = apiError.code;
      throw e;
    }

    console.error("fetchClaimantData failed:", apiError || err);
    throw err;
  }
}

export async function checkEligibility( wallet: string) {
   const res = await axios.post(
    `${STREAMFLOW_STAGING_API}/api/airdrops/check-eligibility`,
    {
      claimantAddresses: [wallet],
    }
  );

  return res.data;
}

export async function fetchAllDistributors() {
  const distributors = await client.searchDistributors({});
  return distributors;
}

export async function claimAirdrop(
  params: {
    id: string;
    proof: number[][];
    amountUnlocked: BN;
    amountLocked: BN;
    claimableAmount: BN;
  },
  wallet: any
) {
  const { txId } = await client.claim(params, { invoker: wallet });
  return txId;
}