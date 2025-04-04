// a function to capitalize the first letter of a string
export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatPlanAmount = (amount?: number): string => {
  return amount ? (amount / 100).toFixed(0) : "0";
};
