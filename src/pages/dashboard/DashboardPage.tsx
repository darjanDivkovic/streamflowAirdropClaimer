import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PublicKey } from "@solana/web3.js";
import { Title } from "../../shared/components/Title";
import { Subtext } from "../../shared/components/Subtext";
import { TextInput } from "../../shared/components/TextInput";
import { PrimaryButton } from "../../shared/components/PrimaryButton";
import { Layout } from "../../shared/components/Layout";
import { WalletButton } from "../../shared/components/WalletButton";
import { NavigationButton } from "../../shared/components/NavigationButton";

export function DashboardPage() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();

    if (!trimmed) {
      setError(true);
      return;
    }

    try {
      new PublicKey(trimmed);
      setError(false); 
      navigate(`/airdrop/${trimmed}`);
    } catch (err) {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <Layout>
      <div className="h-full w-full py-[5%]">
        <div className="flex justify-between">
          <WalletButton />
          <NavigationButton to="/airdrops">
             View All Airdrops
          </NavigationButton>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-12 items-center">
          <div className="mt-[18vh] flex flex-col items-center">
            <Title>Provide the Airdrop ID</Title>
            <Subtext>Provide your Streamflow Airdrop ID to claim your airdrop</Subtext>
          </div>

          <TextInput
            placeholder="Enter distributor ID (e.g. H1y2...)"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (error) setError(false);
            }}
            className="mt-6"
            error={error}
            errorMessage="Invalid Solana address"
            autoFocus
          />

          <PrimaryButton type="submit" disabled={!input.trim()}>
            Check My Airdrop
          </PrimaryButton>
        </form>
      </div>
    </Layout>
  );
}