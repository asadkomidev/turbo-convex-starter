import React from "react";
import { cn } from "@workspace/ui/lib/utils";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {}

const Logo = ({ className, ...props }: LogoProps) => {
  return (
    <div className={cn("flex items-center space-x-1", className)} {...props}>
      <svg
        viewBox="0 0 102 102"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-foreground w-full h-full"
      >
        <path
          d="M50.5 2L1 101.5H26.5L50.5 54L74.5 101.5H100.5L50.5 2Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M50.5 71L35 101.5H66L50.5 71Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
      {/* <span className="text-2xl font-bold">Tcn Inc.</span> */}
    </div>
  );
};

export default Logo;
