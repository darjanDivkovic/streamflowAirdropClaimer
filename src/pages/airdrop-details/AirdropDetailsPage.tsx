import { useParams, useNavigate } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletButton } from "../../shared/components/WalletButton";
import { useAirdropDistributor } from "../../hooks/useAirdropDistributor";
import { useUserEligibility } from "../../hooks/useUserEligibility";
import { useClaimAirdrop } from "../../hooks/useClaimAirdrop";
import { NotFoundPage } from "../../shared/components/NotFound";
import { Layout } from "../../shared/components/Layout";
import { StatsCard } from "./components/StatsCard";
import { Title } from "../../shared/components/Title";
import { getDecimals, lamportsToTokens } from "../../utils/format";
import { TokenPrice } from "../../shared/components/TokenPrice";
import { ClaimCard } from "./components/ClaimCard";
import { NavigationButton } from "../../shared/components/NavigationButton";

export function AirdropDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const wallet = useWallet();
  const { connected, publicKey } = wallet;

  const { distributor, loading: distLoading, error } = useAirdropDistributor(id);
  const { claim: userClaim, loading: userLoading } = useUserEligibility(connected, publicKey, distributor, id);
  const { claim, claiming, txId } = useClaimAirdrop();

  const handleClaim = () => claim(id!, wallet);

  if (distLoading || userLoading || !userClaim) {
    return (
      <Layout>
        <div className="min-h-screen text-white flex items-center justify-center text-3xl">Loading...</div>
      </Layout>
    )
  }

  if (error || !distributor) return <NotFoundPage onBack={() => navigate("/")} />;


  const isInstant = distributor.startTs.eq(distributor.endTs);
  const decimals = getDecimals(distributor.mint);
  const totalRecipients = distributor.maxNumNodes.toNumber() || "Unknown";
  const claimedRecipients = distributor.numNodesClaimed.toNumber();
  const total = lamportsToTokens(distributor.maxTotalClaim, decimals);
  const claimed = lamportsToTokens(distributor.totalAmountClaimed, decimals);

  return (
    <Layout>
      <div className="h-full w-full py-[5%]">
        <div className="flex justify-between">
        <WalletButton />
          <NavigationButton to={'/dashboard'}>
            Go back
        </NavigationButton>
        </div>
        

        <Title className="mt-[15vh]">Airdrop</Title>

        <div className="flex gap-6 mt-10">
          <StatsCard 
           value={`${claimedRecipients} / ${totalRecipients}`} 
           label="Recipients Claimed/Total" 
           className="w-1/4"
          />
          <StatsCard 
           value={`${claimed} / ${total}`} 
           label="Ammount Claimed/Total" 
           className="w-1/4"
           children={<div className="mt-[-30px]"><TokenPrice amount={claimed} /> / <TokenPrice amount={total} /> </div> }

          />
          <StatsCard 
           value={isInstant ? "Instant⚡" : "Vested"} 
           label="Type" 
           className="w-1/4"
          />
          
          <ClaimCard
          connected={connected}
          userLoading={userLoading}
          userClaim={userClaim}
          isInstant={isInstant}
          claiming={claiming}
          claimTx={txId}
          onClaim={handleClaim}
        />
        </div>
         
        {total > 0 && (
        <div className="mt-8">
          
          <div className="w-full bg-white/10 rounded-full h-6 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#7D6DF1] to-[#C297FA] transition-all duration-1000"
              style={{ width: `${Math.min((claimed / total) * 100, 100)}%` }}
            />
          </div>

          <div className="flex justify-between text-sm text-gray-400 mt-6">
            <span>Claim Progress</span>
            <span>{((claimed / total) * 100).toFixed(1)}%</span>
          </div>
        </div>
      )}
      </div>
    </Layout>
  );
}