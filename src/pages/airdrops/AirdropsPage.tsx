import { useNavigate } from "react-router-dom";
import { useAllAirdrops } from "../../hooks/useAllAirdrops";
import { Layout } from "../../shared/components/Layout";
import { Title } from "../../shared/components/Title";
import { NavigationButton } from "../../shared/components/NavigationButton";

export function AirdropsPage() {
  const { airdrops, loading } = useAllAirdrops();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="py-[5%] text-white">
        <div className="flex justify-between">
        <Title>All Airdrops</Title>
          <NavigationButton to={'/dashboard'}>
              Go back
          </NavigationButton>   
        </div>
        

        {loading && (
          <p className="text-center text-2xl mt-20">Loading airdrops...</p>
        )}

        {!loading && airdrops.length === 0 && (
          <p className="text-center text-lg mt-20">No airdrops found.</p>
        )}

        <div className="grid grid-cols-3 gap-6 mt-12 overflow-y-scroll  h-[80vh] pr-2">
          {airdrops.map((drop: any) => {
            const pk = drop?.publicKey?.toBase58?.();
            const acc = drop?.account;

            if (!pk || !acc) return null;

            const startTs = Number(acc.startTs);
            const endTs = Number(acc.endTs);
            const claimed = Number(acc.numNodesClaimed);
            const total = Number(acc.maxNumNodes);
            const totalTokens = Number(acc.maxTotalClaim);

            const isInstant = startTs === endTs;

            return (
              <div
                key={pk}
                className="p-6 bg-[#1e1e2e] rounded-xl cursor-pointer hover:bg-[#2a2a3a]"
                onClick={() => navigate(`/airdrop/${pk}`)}
              >
                <h3 className="text-xl font-bold">
                  {pk.slice(0, 8)}...
                </h3>

                <p className="text-gray-400 text-sm">
                  Type: {isInstant ? "Instant ⚡" : "Vested"}
                </p>

                <p className="text-gray-400 text-sm">
                  Recipients: {claimed} / {total}
                </p>

                <p className="text-gray-400 text-sm">
                  Total Tokens: {totalTokens}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
