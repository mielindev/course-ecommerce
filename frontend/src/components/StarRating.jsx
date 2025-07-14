import { Star, StarHalf } from "lucide-react";
import React from "react";

const StarRating = ({ rating = 0, maxStars = 5 }) => {
  const fullStart = Math.floor(rating);
  const halfStart = rating % 1 >= 0.25 && rating % 1 < 0.75 ? 1 : 0;
  const emptyStart = maxStars - fullStart - halfStart;
  return (
    <div className="flex items-center text-warning">
      {Array.from({ length: fullStart }, (_, index) => (
        <Star key={index} fill="currentColor" className="size-5" />
      ))}
      {halfStart > 0 && <StarHalf fill="currentColor" className="size-5" />}
      {emptyStart > 0 &&
        Array.from({ length: emptyStart }, (_, index) => (
          <Star key={index} className="size-5" />
        ))}
    </div>
  );
};

export default StarRating;
