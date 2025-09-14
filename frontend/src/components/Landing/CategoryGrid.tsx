import React from "react";
import ItemCard from "./ItemCard";
import { dummyProducts } from "@/data/product";
import type { Product } from "@/models/product";

type Category = {
  name: string;
  data: Product[];
};

type CategoryCardsProps = {
  category: Category;
};

const CategoryCards: React.FC<CategoryCardsProps> = ({ category }) => {
  const items = category.data.length ? category.data : dummyProducts;
  return (
    <div className="flex flex-col gap-6 bg-blue-400 items-center p-6 rounded-lg">
      {/* Title */}
      <div className="flex items-center justify-start w-full">
        <h2 className="text-3xl font-bold text-gray-800">{category.name}</h2>
      </div>

      {/* Cards */}
      <div className="w-full grid grid-cols-4 gap-6 px-5">
        {items.map((item, index) => (
          <ItemCard key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default CategoryCards;
