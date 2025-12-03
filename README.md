# **🚀 Streamflow Airdrop Client (Devnet)**

A lightweight React + TypeScript client for browsing Streamflow airdrops and claiming unlocked tokens via Phantom Wallet on Solana Devnet.



### **✨ Features**

**Enter Airdrop (Distributor) ID to see:**

```
Type: Instant ⚡ / Vested
Recipients claimed / total
Tokens claimed / total
Token values in USD

```

**Claim flow integrated with Phantom:**
```

Fetch claimant allocation + Merkle proof
Check eligibility & claimed status
Submit claim via Streamflow SDK
Handles unclaimable wallets (CLAIMANT_DOES_NOT_EXIST) gracefully
“All Airdrops” page using searchDistributors

```

### **🧠 Tech Stack**
React + TypeScript
@solana/wallet-adapter-react (Phantom)
@streamflow/distributor (SolanaDistributorClient)

Axios for HTTP calls
TailwindCSS for styling

### **📁 Project Structure**

```
src/
  assets/             # static assets
  hooks/              # useAirdropDistributor, useUserEligibility, useClaimAirdrop, useAllAirdrops
  pages/              # landing, dashboard, airdrops list, airdrop details
  services/           # streamflow.ts (SDK + API calls)
  shared/             # Layout, Title, WalletButton, TokenPrice, NavigationButton, etc.
  utils/              # formatting helpers (lamports, decimals)
  App.tsx             # routes + auth guard
  main.tsx            # wallet + router bootstrap
  index.css           # Tailwind + custom scrollbar
```

### **🛠️ Running Locally**
```bash
npm install
npm run dev
```

### **Requirements:**
Phantom wallet extension
Phantom set to Devnet
Valid Streamflow distributor (airdrop) ID
