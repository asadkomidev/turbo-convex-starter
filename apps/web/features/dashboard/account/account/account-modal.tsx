import { Modal } from "@/components/shared/modal";
import { useSettings } from "@/hooks/use-settings";
import { AccountContent } from "./account-content";

export const AccountModal = () => {
  const { openAccount, setOpenAccount } = useSettings();
  return (
    <Modal open={openAccount} setOpen={setOpenAccount}>
      <AccountContent />
    </Modal>
  );
};
