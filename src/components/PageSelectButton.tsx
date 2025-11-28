type PageSelectButtonProps = {
  page: number;
  onClick: (page: number) => void;
};

export const PageSelectButton = ({ page, onClick }: PageSelectButtonProps) => {
  const handleClick = () => {
    onClick(page);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: "0.5rem",
        border: "1px solid #000",
        borderRadius: "0.5rem",
        cursor: "pointer",
      }}
    >
      {page}
    </button>
  );
};
