"use client";
import { useState } from "react";

interface StarRatingProps {
  value: number;
  readOnly?: boolean;
  size?: "small" | "medium";
  precision?: number;
  onChange?: (value: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  value,
  readOnly = true,
  size = "medium",
  precision = 0.5,
  onChange,
}) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const starSize = size === "small" ? "text-sm" : "text-xl";
  const stars = [1, 2, 3, 4, 5];
  const displayValue = hovered ?? value;

  return (
    <div className={`flex items-center gap-0.5 ${starSize}`}>
      {stars.map((star) => {
        const filled = displayValue >= star;
        const halfFilled = !filled && displayValue >= star - 0.5 && precision <= 0.5;

        return (
          <span
            key={star}
            className={`relative inline-block leading-none ${!readOnly ? "cursor-pointer" : ""}`}
            onMouseEnter={() => !readOnly && setHovered(star)}
            onMouseLeave={() => !readOnly && setHovered(null)}
            onClick={() => !readOnly && onChange?.(star)}
          >
            {/* Empty star */}
            <span className="text-gray-200">★</span>
            {/* Filled overlay */}
            {(filled || halfFilled) && (
              <span
                className="absolute inset-0 text-amber-400 overflow-hidden pointer-events-none"
                style={{ width: filled ? "100%" : "50%" }}
              >
                ★
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
