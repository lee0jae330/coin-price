import type { CoinData, KRWQuotes, USDQuotes } from "../types";

type CoinInfoProps = {
  coin: CoinData;
  priceFilter: "KRW" | "USD";
};

export const CoinInfo = ({ coin, priceFilter }: CoinInfoProps) => {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2>{coin.name}</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <img
            src={`https://static.upbit.com/logos/${coin.symbol.toUpperCase()}.png`}
            alt={coin.name}
            width={32}
            height={32}
          />
          <p>{coin.symbol}</p>
        </div>
      </div>
      <p>
        {priceFilter === "KRW"
          ? `${(coin.quotes as KRWQuotes).KRW.price.toFixed(2)}원`
          : `$${(coin.quotes as USDQuotes).USD.price.toFixed(2)}`}
      </p>
    </li>
  );
};
