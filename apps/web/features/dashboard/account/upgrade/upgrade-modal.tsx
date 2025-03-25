import { Modal } from "@/components/shared/modal";
import { useSettings } from "@/hooks/use-settings";
import { UpgradeContent } from "./upgrade-content";

export const UpgradeModal = () => {
  const { openUpgrade, setOpenUpgrade } = useSettings();
  return (
    <Modal open={openUpgrade} setOpen={setOpenUpgrade}>
      <UpgradeContent />
    </Modal>
  );
};
