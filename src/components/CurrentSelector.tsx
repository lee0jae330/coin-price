type CurrentSelectorProps = {
  onChange: (value: "KRW" | "USD") => void;
};

export const CurrentSelector = ({ onChange }: CurrentSelectorProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as "KRW" | "USD");
  };

  return (
    <select onChange={handleChange}>
      <option value="KRW">KRW</option>
      <option value="USD">USD</option>
    </select>
  );
};
