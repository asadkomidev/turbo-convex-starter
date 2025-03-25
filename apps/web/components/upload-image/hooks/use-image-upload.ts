import { useState } from "react";

import { api } from "@workspace/backend/convex/_generated/api";
import { toast } from "sonner";
import { useMutation } from "convex/react";

interface UseImageUploadProps {
  // eslint-disable-next-line no-unused-vars
  setStorageId?: (id: string) => void;
  onDelete?: () => void;
  setCurrentUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const MAX_FILE_SIZE_MB = 10;

export const useImageUpload = ({
  setStorageId,
  onDelete,
  setCurrentUrl,
}: UseImageUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const generateImage = useMutation(api.files.generateUrl);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      console.error(`File size must be less than ${MAX_FILE_SIZE_MB}MB`);
      return;
    }

    setCurrentUrl(undefined);
    setPreviewUrl(URL.createObjectURL(file));
    await uploadImage(file);
  };

  const uploadImage = async (fileToUpload: File) => {
    try {
      const uploadUrl = await generateImage({});
      if (!uploadUrl) {
        throw new Error("Failed to generate upload URL");
      }

      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          "Content-Type": fileToUpload.type || "application/octet-stream",
        },
        body: fileToUpload,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const { storageId } = await response.json();
      setStorageId?.(storageId);
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Error uploading image");
    }
  };

  const handleDeleteImage = () => {
    onDelete?.();
    setCurrentUrl(undefined);
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
  };

  return {
    previewUrl,
    handleFileChange,
    handleRemoveImage,
    handleDeleteImage,
  };
};
