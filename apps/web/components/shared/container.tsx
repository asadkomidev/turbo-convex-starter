import React from "react";
import { cn } from "@workspace/ui/lib/utils";

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

const Container = ({ className, children }: ContainerProps) => {
  return (
    <div className={cn("mx-auto max-w-5xl px-4", className)}>{children}</div>
  );
};

export default Container;
