"use client";

import React, { useState } from "react";

interface RatingProps {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: number;
}

export const Rating: React.FC<RatingProps> = ({
  value = 0,
  onChange,
  max = 5,
  size = 24,
}) => {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex space-x-1">
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= (hovered || value);

        return (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            fill={isFilled ? "gold" : "none"}    // fill gold if selected
            viewBox="0 0 24 24"
            stroke={isFilled ? "gold" : "currentColor"} // optional: match stroke to fill
            strokeWidth={isFilled ? 0 : 2}       // remove stroke when filled
            className="cursor-pointer"
            width={size}
            height={size}
            onMouseEnter={() => setHovered(starValue)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange?.(starValue)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.276a1 1 0 00.95.69h6.588c.969 0 1.371 1.24.588 1.81l-5.34 3.873a1 1 0 00-.364 1.118l2.036 6.276c.3.921-.755 1.688-1.54 1.118l-5.34-3.873a1 1 0 00-1.176 0l-5.34 3.873c-.784.57-1.838-.197-1.539-1.118l2.036-6.276a1 1 0 00-.364-1.118L2.837 11.7c-.783-.57-.38-1.81.588-1.81h6.588a1 1 0 00.95-.69l2.036-6.276z"
            />
          </svg>
        );
      })}
    </div>
  );
};