
import React from "react";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

interface VerificationBadgeProps {
  className?: string;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({ className }) => {
  return (
    <span 
      className={cn(
        "ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-white",
        className
      )}
    >
      <CheckIcon className="h-3 w-3" />
    </span>
  );
};
