import { useEffect, useState } from "react";
import { fetchAllDistributors } from "../services/streamflow";

export function useAllAirdrops() {
  const [airdrops, setAirdrops] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      try {
        const list = await fetchAllDistributors();
        setAirdrops(list);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  return { airdrops, loading };
}
