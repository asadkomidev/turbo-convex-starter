import { Modal } from "@/components/shared/modal";
import { useDeleteAccount } from "@/hooks/use-delete-account";
import { DeleteAccountContent } from "./delete-account-content";

export const DeleteAccountModal = () => {
  const { isOpen, setIsOpen, userId, close } = useDeleteAccount();
  return (
    <Modal open={isOpen} setOpen={setIsOpen}>
      <DeleteAccountContent userId={userId} close={close} />
    </Modal>
  );
};
