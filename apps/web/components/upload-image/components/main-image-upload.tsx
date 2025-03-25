import React, { useState, useRef, useEffect } from "react";
import { RemoveButton } from "./remove-button";
import { useImageUpload } from "../hooks";

import { MainImagePreview } from "./main-image-preview";
interface MainImageUploadProps {
  currentImage?: string;
  setStorageId?: (id: string) => void;
  onDelete?: () => void;
  label?: string;
  description?: string;
}

export const MainImageUpload: React.FC<MainImageUploadProps> = ({
  currentImage,
  setStorageId,
  onDelete,
  label,
  description,
}) => {
  const [currentUrl, setCurrentUrl] = useState<string | undefined>(
    currentImage
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { previewUrl, handleFileChange, handleRemoveImage, handleDeleteImage } =
    useImageUpload({
      setStorageId,
      onDelete,
      setCurrentUrl,
    });

  useEffect(() => {
    setCurrentUrl(currentImage);
  }, [currentImage]);

  return (
    <div className="flex items-start gap-4">
      <div className="group relative mb-4 flex h-24 w-24 items-center justify-center rounded-lg">
        <MainImagePreview
          previewUrl={previewUrl}
          currentUrl={currentUrl}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
        />
        {previewUrl && (
          <RemoveButton
            onClick={handleRemoveImage}
            icon="X"
            position="right-1 top-1"
          />
        )}
        {currentUrl && (
          <RemoveButton
            onClick={handleDeleteImage}
            icon="Trash"
            position="right-2 top-2"
          />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
    </div>
  );
};
