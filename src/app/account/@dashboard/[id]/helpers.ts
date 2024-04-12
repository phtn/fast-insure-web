type Class = "PR" | "MT" | "LM" | "HT" | undefined;
export const getBnewPriceByClass = (classification: Class): number => {
  switch (classification) {
    case "PR":
      return 2660;
    case "MT":
      return 660;
    case "LM":
      return 2660;
    case "HT":
      return 3660;
    default:
      return 1660;
  }
};
