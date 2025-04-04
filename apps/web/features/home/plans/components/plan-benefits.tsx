import { Check } from "lucide-react";
import { PlanBenefit } from "../config/types";

interface Props {
  benefits: PlanBenefit[];
}

export const PlanBenefits = ({ benefits }: Props) => {
  return (
    <ul className="space-y-3 text-sm">
      {benefits.map((item) => (
        <li key={item.benefitId} className="flex items-center gap-2">
          <Check className="size-3 text-green-500" />
          {item.benefitDescription}
        </li>
      ))}
    </ul>
  );
};
