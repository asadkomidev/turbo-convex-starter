import React from "react";

interface UploadButtonProps {
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UploadButton: React.FC<UploadButtonProps> = ({
  fileInputRef,
  handleFileChange,
}) => {
  return (
    <label
      htmlFor="file_upload_field"
      className="block h-24 w-24 cursor-pointer overflow-hidden rounded-lg bg-primary/40 transition active:scale-95">
      <input
        id="file_upload_field"
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </label>
  );
};
