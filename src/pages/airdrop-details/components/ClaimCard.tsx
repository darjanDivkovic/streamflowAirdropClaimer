import { TokenPrice } from "../../../shared/components/TokenPrice";

export function ClaimCard({
  connected,
  userLoading,
  userClaim,
  isInstant,
  claiming,
  claimTx,
  onClaim,
}: any) {

  if (!connected) {
    return (
      <div className="bg-[#7D6DF1] rounded-xl p-6 w-1/4 h-[200px]">
        <p className="text-gray-400">Connect your wallet to see if you're eligible</p>
      </div>
    );
  }

  if (userLoading || !userClaim) {
    return (
      <div className="bg-[#7D6DF1] rounded-xl p-6 w-1/4 h-[200px]">
        <p className="text-gray-400">Checking eligibility...</p>
      </div>
    );
  }

  const { eligible, claimed, unclaimable } = userClaim;

  return (
    <div className="bg-[#7D6DF1] rounded-xl p-6 w-1/4 h-[200px]">

      {/* ALWAYS show unlocked + price */}
      <h3 className="text-4xl font-bold text-black mb-3">
        {userClaim.unlocked.toFixed(1)}
      </h3>
      <TokenPrice amount={userClaim.total} />

      {/* CASE 1: Wallet not in airdrop at all */}
      {unclaimable ? (
        <p className="text-xl text-black mt-4">
          This wallet is not included in this airdrop.
        </p>
      ) : 
      
      /* CASE 2: Wallet exists but not eligible */
      !eligible ? (
        <p className="text-xl text-black mt-4">You are not eligible for this airdrop</p>
      ) : 
      
      /* CASE 3: Already claimed */
      claimed ? (
        <p className="text-md text-black mt-13">Already claimed 🎉</p>
      ) : (
        /* CASE 4: Eligible + unclaimed */
        <div>
          {userClaim.total > userClaim.unlocked && (
            <p className="text-lg text-gray-300">
              Total allocation: {userClaim.total.toFixed(6)} tokens (vesting)
            </p>
          )}

          {isInstant && userClaim.unlocked > 0 && (
            <div>
              <button
                onClick={onClaim}
                disabled={claiming}
                className="bg-black h-12 w-full rounded-[10px] mt-7 font-modernist text-white"
              >
                {claiming ? "Claiming..." : "CLAIM"}
              </button>

              {claimTx && (
                <p className="text-green-400 text-center text-sm mt-2">
                  Success! View on{" "}
                  <a
                    href={`https://explorer.solana.com/tx/${claimTx}?cluster=devnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-bold"
                  >
                    Explorer
                  </a>
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
