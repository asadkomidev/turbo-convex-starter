import React from "react";

interface InfoDetailsProps {
  label: string;
  value?: string | number;
  subValue?: string;
}

export const InfoDetails = ({ label, value, subValue }: InfoDetailsProps) => {
  return (
    <div className="flex flex-col">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className="">
        {value}
        {subValue && (
          <span className="text-muted-foreground text-sm ml-0.5">
            {subValue}
          </span>
        )}
      </span>
    </div>
  );
};
