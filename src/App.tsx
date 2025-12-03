import type { JSX } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { LandingPage } from './pages/landing/LandingPage.tsx';
import { DashboardPage } from './pages/dashboard/DashboardPage.tsx';
import { AirdropsPage } from './pages/airdrops/AirdropsPage.tsx';
import { AirdropDetailsPage } from './pages/airdrop-details/AirdropDetailsPage.tsx';

import { ROUTES } from "./utils/constants.ts";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { connected, publicKey } = useWallet();

  if (!connected && !publicKey) {
    return (
      <div className="text-white h-screen flex items-center justify-center text-2xl">
        Connecting wallet...
      </div>
    );
  }

  return connected ? children : <Navigate to={ROUTES.LANDING} replace />;
};

export default function App() {
  return (
    <Routes>
      <Route path={ROUTES.LANDING} element={<LandingPage />} />
      <Route path={ROUTES.DASHBOARD} element={<RequireAuth><DashboardPage /></RequireAuth>} />
      <Route path={ROUTES.AIRDROPS} element={<RequireAuth><AirdropsPage /></RequireAuth>} />
      <Route path={ROUTES.AIRDROP_DETAILS} element={<RequireAuth><AirdropDetailsPage /></RequireAuth>} />
      <Route path="*" element={<Navigate to={ROUTES.LANDING} replace />} />
    </Routes>
  );
}