import { PlansQueryResult } from "../config/types";
import { usePlanToggle } from "../hooks/use-plan-toggle";
import { Switch } from "@workspace/ui/components/switch";
import { Label } from "@workspace/ui/components/label";
import { calculateSavePercentage } from "../config/utils";

interface PlansToggleProps {
  plans: PlansQueryResult | undefined;
}

export const PlansToggle = ({ plans }: PlansToggleProps) => {
  const { toggle, setToggle } = usePlanToggle();

  const monthlyPlans = plans?.monthlyPlans;
  const yearlyPlans = plans?.yearlyPlans;

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <Label htmlFor="billing-switch">Monthly</Label>
      <Switch
        id="billing-switch"
        checked={toggle}
        onCheckedChange={setToggle}
      />
      <Label htmlFor="billing-switch">
        Yearly{" "}
        <span className="text-sm text-green-500">
          (Save{" "}
          {calculateSavePercentage(monthlyPlans?.[0], yearlyPlans?.[0]).toFixed(
            0
          )}
          %)
        </span>
      </Label>
    </div>
  );
};
