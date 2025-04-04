"use client";

import { Modal } from "@/components/shared/modal";
import { useLogin } from "@/features/auth/hooks/use-login";
import { SignInScreen } from "../signin-screen";

export const LoginModal = () => {
  const { open, setOpen } = useLogin();

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      showWithoutUser={true}
      className="!rounded-4xl !w-[400px]"
    >
      <div className="p-10">
        <SignInScreen modal />
      </div>
    </Modal>
  );
};
