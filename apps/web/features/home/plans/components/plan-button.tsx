import { Button } from "@workspace/ui/components/button";
import { getButtonText } from "../config/utils";
import { Subscription, User } from "../config/types";
import { useState } from "react";
import { useLogin } from "@/features/auth/hooks/use-login";
import { toast } from "sonner";

interface Props {
  priceId: string;
  handleCheckout: () => Promise<void>;
  subscription: Subscription | null;
  user: User | null;
}

export const PlanButton = ({
  priceId,
  handleCheckout,
  subscription,
  user,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setOpen } = useLogin();
  const { text, disabled } = getButtonText(user, subscription, priceId);

  const handleButtonClick = async (): Promise<void> => {
    try {
      setIsLoading(true);
      if (!user) {
        setOpen(true);
        return;
      }
      await handleCheckout();
    } catch (error) {
      toast.error("Failed to process subscription");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleButtonClick}
      disabled={disabled || isLoading}
      className="w-full mt-6 rounded-3xl"
      variant="default"
    >
      {isLoading ? "Loading..." : text}
    </Button>
  );
};
