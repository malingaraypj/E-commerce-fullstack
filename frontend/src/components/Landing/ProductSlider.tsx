import React from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import ItemCard from "./ItemCard";
import type { Product } from "@/models/product";

type ProductSliderProps = {
  filteredItems: Product[];
  category: string;
  idx: number;
};

const ProductSlider: React.FC<ProductSliderProps> = ({
  filteredItems,
  category,
  idx,
}) => {
  if (!filteredItems.length) return null; // Skip empty categories

  return (
    <ScrollArea
      key={category}
      className={`flex flex-col gap-6 p-6 rounded-2xl shadow-lg 
        ${
          idx % 2 === 0
            ? "bg-gradient-to-r from-blue-100 to-blue-200"
            : "bg-gradient-to-r from-green-100 to-green-200"
        }`}
    >
      {/* Category Title */}
      <div className="border-b border-gray-300 pb-2">
        <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
      </div>

      {/* Horizontal Cards Slider */}
      <div className="flex w-full gap-5 overflow-x-auto pb-2 scroll-smooth">
        {filteredItems.map((item, index) => (
          <div
            key={`${category}-${index}`}
            className="flex-shrink-0 w-[1200px]"
          >
            <ItemCard data={item} />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ProductSlider;
