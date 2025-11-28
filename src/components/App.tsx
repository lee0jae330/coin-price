import { useEffect, useState } from "react";
import type { CoinData } from "../types";
import { CurrentSelector } from "./CurrentSelector";
import { CoinInfo } from "./CoinInfo";
import { PageSelectButton } from "./PageSelectButton";

export const App = () => {
  const [krwCoinList, setKrwCoinList] = useState<CoinData[]>([]);
  const [usdCoinList, setUsdCoinList] = useState<CoinData[]>([]);
  const [isInitial, setIsInitial] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [priceFilter, setPriceFilter] = useState<"KRW" | "USD">("KRW");

  useEffect(() => {
    const fetchCoinData = async () => {
      const [krwResponse, usdResponse] = await Promise.all([
        fetch(`https://api.coinpaprika.com/v1/tickers?quotes=KRW`),
        fetch(`https://api.coinpaprika.com/v1/tickers?quotes=USD`),
      ]);

      const krwData: CoinData[] = await krwResponse.json();
      const usdData: CoinData[] = await usdResponse.json();
      setKrwCoinList(krwData);
      setUsdCoinList(usdData);
      setIsInitial(true);
    };
    fetchCoinData();
  }, []);

  const coinList = priceFilter === "KRW" ? krwCoinList : usdCoinList;

  if (!isInitial) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <CurrentSelector onChange={setPriceFilter} />
      <ul>
        {coinList.slice((page - 1) * 10, page * 10).map((coin) => (
          <CoinInfo key={coin.id} coin={coin} priceFilter={priceFilter} />
        ))}
      </ul>

      <div style={{ display: "flex", gap: "1rem" }}>
        {Array.from({
          length: Math.min(Math.ceil(coinList.length / 10), 10),
        }).map((_, index) => (
          <PageSelectButton key={index} page={index + 1} onClick={setPage} />
        ))}
      </div>
    </div>
  );
};
