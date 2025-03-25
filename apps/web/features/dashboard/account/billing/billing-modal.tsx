import { Modal } from "@/components/shared/modal";
import { useSettings } from "@/hooks/use-settings";
import { BillingContent } from "./billing-content";

export const BillingModal = () => {
  const { openBilling, setOpenBilling } = useSettings();
  return (
    <Modal open={openBilling} setOpen={setOpenBilling}>
      <BillingContent />
    </Modal>
  );
};
