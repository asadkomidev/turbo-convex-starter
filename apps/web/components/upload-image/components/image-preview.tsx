import React from "react";
import { Camera, Upload } from "lucide-react";
import Image from "next/image";

interface ImagePreviewProps {
  previewUrl: string | null;
  currentUrl?: string;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  previewUrl,
  currentUrl,
  fileInputRef,
  handleFileChange,
}) => {
  return (
    <label
      htmlFor="file_upload_field"
      className="block h-16 w-16 cursor-pointer overflow-hidden rounded-full transition active:scale-95"
    >
      <input
        id="file_upload_field"
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <div className="relative h-full w-full">
        {previewUrl || currentUrl ? (
          <Image
            src={previewUrl || currentUrl || ""}
            alt="Preview"
            width={100}
            height={100}
            className="h-full w-full rounded-lg object-cover"
            priority
          />
        ) : (
          <div className="group flex h-full w-full items-center justify-center rounded-lg bg-muted">
            <Camera className="h-6 w-6 text-muted-foreground group-hover:hidden" />
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-primary/40 opacity-0 transition-opacity group-hover:opacity-100">
          <Upload className="h-6 w-6 text-secondary" />
        </div>
      </div>
    </label>
  );
};
