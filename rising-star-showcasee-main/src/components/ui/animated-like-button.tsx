
import React, { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnimatedLikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  onToggleLike: () => void;
  className?: string;
}

export const AnimatedLikeButton: React.FC<AnimatedLikeButtonProps> = ({
  isLiked,
  likeCount,
  onToggleLike,
  className,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (!isLiked) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }
    onToggleLike();
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "flex items-center space-x-1",
        isLiked ? "text-red-500" : "",
        className
      )}
      onClick={handleClick}
    >
      <Heart
        className={cn(
          "h-4 w-4",
          isLiked ? "fill-current text-red-500" : "",
          isAnimating ? "animate-like-animation" : ""
        )}
      />
      <span>{likeCount}</span>
    </Button>
  );
};
