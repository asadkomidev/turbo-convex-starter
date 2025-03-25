import React, { useState, useRef, useEffect } from "react";
import { ImagePreview } from "./image-preview";
import { RemoveButton } from "./remove-button";
import { useImageUpload } from "../hooks";

interface ImageUploadProps {
  currentImage?: string;
  setStorageId?: (id: string) => void;
  onDelete?: () => void;
  label?: string;
  description?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
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
    <div className="flex items-start ">
      <div className="group relative  flex h-16 w-16 items-center justify-center rounded-full">
        <ImagePreview
          previewUrl={previewUrl}
          currentUrl={currentUrl}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
        />
        {previewUrl && (
          <RemoveButton
            onClick={handleRemoveImage}
            icon="X"
            position="right-0 bottom-0"
          />
        )}
        {currentUrl && (
          <RemoveButton
            onClick={handleDeleteImage}
            icon="Trash"
            position="right-0 bottom-0"
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
