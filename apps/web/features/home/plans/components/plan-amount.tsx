import { formatPlanAmount } from "../config/utils";

interface Props {
  currency: string;
  priceAmount: number;
  planInterval: string;
}

export const PlanAmount = ({ priceAmount, planInterval }: Props) => {
  return (
    <div className="flex items-baseline">
      <span className="text-5xl font-bold tracking-tight">
        ${formatPlanAmount(priceAmount)}
      </span>
      <span className="text-lg text-muted-foreground">
        /{planInterval === "month" ? "mo" : "yr"}
      </span>
    </div>
  );
};
