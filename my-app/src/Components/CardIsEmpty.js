import React from "react";

function CardIsEmpty({ card }) {
  return (
    <div className="text-center text-2xl font-semibold text-red-700 my-8">
      {card} Bag is Empty!
    </div>
  );
}

export default CardIsEmpty;
