import { useEffect, useState } from "react";

type CoinData = {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    KRW: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
};

export const App = () => {
  const [coinList, setCoinList] = useState<CoinData[]>([]);
  useEffect(() => {
    const fetchCoinData = async () => {
      const response = await fetch(
        "https://api.coinpaprika.com/v1/tickers?quotes=KRW"
      );

      const data: CoinData[] = await response.json();
      setCoinList(data);
    };
    const interval = setInterval(fetchCoinData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {coinList.slice(0, 10).map((coin) => (
        <div key={coin.id}>
          <h2>{coin.name}</h2>
          <p>{coin.symbol}</p>
          <p>{coin.quotes.KRW.price}</p>
        </div>
      ))}
    </>
  );
};
