import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "react-router-dom";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import WalletIcon from "../../assets/WalletIcon.svg";

import { ROUTES } from "../../utils/constants.ts"
import { Layout } from "../../shared/components/Layout.tsx";
import { Title } from "../../shared/components/Title.tsx";
import { Subtext } from "../../shared/components/Subtext.tsx";

export function LandingPage() {
  const { connected } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (connected) {
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  }, [connected, navigate]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen relative overflow-hidden text-white gap-4">
        <img src={WalletIcon} alt="logo" className="w-16 h-16 mb-4" />

        <Title>
          Connect your Phantom wallet to get started.
        </Title>

        <Subtext className="w-[35%]">
          Once connected, simply paste any Streamflow Airdrop ID and instantly see your eligible amount — whether it’s an instant drop or a vesting schedule.
        </Subtext>

        <div className="mt-8">
            <WalletMultiButton className="h-14 px-8 text-lg rounded-xl" />
        </div>
      </div>
    </Layout>
  );
}