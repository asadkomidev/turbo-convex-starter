import { Modal } from "@/components/shared/modal";
import { useSettings } from "@/hooks/use-settings";
import { NotificationContent } from "./notification-content";

export const NotificationModal = () => {
  const { openNotification, setOpenNotification } = useSettings();
  return (
    <Modal open={openNotification} setOpen={setOpenNotification}>
      <NotificationContent />
    </Modal>
  );
};
