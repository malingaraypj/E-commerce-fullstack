import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ItemCard from "./ItemCard";
import { useQuery } from "@tanstack/react-query";
import { getProductByCategory } from "@/api/product";
import type { Product } from "@/models/product";
import { Skeleton } from "@/components/ui/skeleton";

type ProductSliderProps = {
  category: string;
  idx: number;
};

const ProductSlider: React.FC<ProductSliderProps> = ({ category, idx }) => {
  const {
    data: productData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", category],
    queryFn: () => getProductByCategory(category),
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const products = productData || [];

  const slideNext = React.useCallback(() => {
    if (products.length > 3) {
      setCurrentIndex((prevIndex) =>
        prevIndex >= products.length - 3 ? 0 : prevIndex + 1
      );
    }
  }, [products.length]);

  const slidePrev = React.useCallback(() => {
    if (products.length > 3) {
      setCurrentIndex((prevIndex) =>
        prevIndex <= 0 ? products.length - 3 : prevIndex - 1
      );
    }
  }, [products.length]);

  useEffect(() => {
    const slideInterval = setInterval(slideNext, 5000);
    return () => clearInterval(slideInterval);
  }, [currentIndex, slideNext]);

  if (isLoading) {
    return (
      <div className="p-6">
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (isError) {
    console.error("Error fetching products:", error);
    return (
      <div className="p-6 text-red-500">
        Could not load products for {category}.
      </div>
    );
  }

  if (!products.length) return null;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl shadow-lg p-6 ${
        idx % 2 === 0
          ? "bg-gradient-to-r from-blue-100 to-blue-200"
          : "bg-gradient-to-r from-green-100 to-green-200"
      }`}
    >
      <div className="border-b border-gray-300 pb-2 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
      </div>

      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${(currentIndex * 100) / 3}%)` }}
      >
        {products.map((item: Product, index: number) => (
          <div
            key={`${category}-${index}`}
            className="w-1/3 flex-shrink-0 px-2"
          >
            <ItemCard data={item} />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={slidePrev}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-slate-700 text-white rounded-full p-2 hover:bg-slate-800 transition"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={slideNext}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-slate-700 text-white rounded-full p-2 hover:bg-slate-800 transition"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {Array.from({ length: Math.ceil(products.length / 3) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * 3)}
              className={`h-2 w-2 rounded-full ${
                Math.floor(currentIndex / 3) === index
                  ? "bg-slate-800"
                  : "bg-gray-400"
              }`}
            />
          )
        )}
      </div>
    </div>
  );
};

export default ProductSlider;
