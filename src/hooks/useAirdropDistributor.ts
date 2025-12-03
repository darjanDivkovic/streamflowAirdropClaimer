import { useEffect, useState } from "react";
import { fetchDistributor } from "../services/streamflow";

export function useAirdropDistributor(id?: string) {
  const [distributor, setDistributor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchDistributor(id)
      .then(setDistributor)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  return { distributor, loading, error };
}