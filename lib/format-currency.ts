export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
    }).format(value);
  };