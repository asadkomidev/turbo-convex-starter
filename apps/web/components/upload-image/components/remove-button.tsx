import React from "react";
import { X, Trash } from "lucide-react";

interface RemoveButtonProps {
  onClick: () => void;
  icon: "X" | "Trash";
  position: string;
}

export const RemoveButton: React.FC<RemoveButtonProps> = ({
  onClick,
  icon,
  position,
}) => {
  const Icon = icon === "X" ? X : Trash;

  return (
    <button
      className={`absolute ${position} z-20 rounded-full bg-red-500 p-1 text-white transition-shadow duration-300 hover:bg-red-600`}
      onClick={onClick}
      type="button">
      <Icon className="h-3 w-3" />
    </button>
  );
};
