import React from "react";
import { dummyProducts } from "@/data/product";
import type { Product } from "@/models/product";
import ProductSlider from "./ProductSlider";

const categories = [
  "Groceries",
  "Premium Fruits",
  "Home & Kitchen",
  "Fashion",
  "Electronics",
  "Beauty",
  "Home Improvement",
  "furniture",
  "Sports, Toys & Luggage",
];

type CategoryCardsProps = {
  data?: Product[]; // optional, falls back to dummyProducts
};

const CategoryCards: React.FC<CategoryCardsProps> = ({ data }) => {
  const items = data?.length ? data : dummyProducts;

  return (
    <div className="flex flex-col gap-12 w-[90%] m-auto py-10">
      {categories.map((category, idx) => {
        // Filter products for this category (case-insensitive)
        const filteredItems = items.filter((product) =>
          product.category
            .map((cat) => cat.toLowerCase())
            .includes(category.toLowerCase())
        );

        // Skip rendering if no products in this category
        if (!filteredItems.length) return null;

        return (
          <ProductSlider
            category={category}
            filteredItems={filteredItems}
            idx={idx}
          />
        );
      })}
    </div>
  );
};

export default CategoryCards;
