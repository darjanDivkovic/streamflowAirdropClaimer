import { useEffect, useState } from "react";

type Props = {
  amount: number;
  symbol?: string;
};

export function TokenPrice({ amount }: Props) {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
        );
        const json = await res.json();
        setPrice(json.solana.usd);
      } catch (err) {
        console.error("Price fetch failed", err);
      }
    };

    fetchPrice();
  }, []);

  if (!price) return <span className="text-gray-400">…</span>;

  const usd = amount * price;

  return (
    <span className="text-green-300 font-bold text-black font-modernist">
     ( ${usd.toFixed(2)} )
    </span>
  );
}
