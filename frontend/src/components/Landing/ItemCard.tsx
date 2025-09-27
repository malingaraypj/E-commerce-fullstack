import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import dummyImg from "@/assets/image.png";
import type { Product } from "@/models/product";
import { useNavigate } from "react-router-dom";

type ItemCardProps = {
  data: Product;
};

const ItemCard: React.FC<ItemCardProps> = ({ data }) => {
  const [hovered, setHovered] = React.useState(false);
  const navigate = useNavigate();

  return (
    <Card
      className="relative w-full h-[420px] rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105 overflow-hidden bg-white flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image */}
      <div className="relative p-3 bg-white h-48 flex-shrink-0">
        <img
          src={dummyImg}
          alt={data.name}
          className="w-full h-full object-contain rounded-lg"
        />

        {/* Badges */}
        {data.badges && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-2 z-10">
            {data.badges.map((badge, idx) => (
              <span
                key={idx}
                className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md shadow"
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Content */}
      <CardContent className="p-4 pt-2 flex-grow flex flex-col justify-between">
        <div>
          <CardHeader className="p-0 mb-2">
            {data.brand && (
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                {data.brand}
              </p>
            )}
            <CardTitle className="text-lg font-semibold text-gray-800 line-clamp-1">
              {data.name}
            </CardTitle>
            <CardDescription className="text-sm text-gray-500 line-clamp-2 h-10">
              {data.description}
            </CardDescription>
          </CardHeader>

          {/* Price */}
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xl font-bold text-blue-600">
              ${data.discountedPrice.toFixed(2)}
            </p>
            {data.originalPrice && (
              <p className="text-sm text-gray-400 line-through">
                ${data.originalPrice.toFixed(2)}
              </p>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < Math.floor(data.averageRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
            <span className="ml-1">{data.averageRating.toFixed(1)}</span>
            {data.reviewCount !== undefined && (
              <span className="text-gray-400">({data.reviewCount})</span>
            )}
          </div>

          {/* Stock Info */}
          <p
            className={`mt-1 text-xs font-medium ${
              data.inStock ? "text-green-600" : "text-red-500"
            }`}
          >
            {data.inStock ? "In Stock" : "Out of Stock"}
          </p>
        </div>
      </CardContent>

      {/* Add to Cart */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={hovered ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute bottom-0 left-0 right-0 px-4 pb-4"
        style={{ pointerEvents: hovered ? "auto" : "none" }}
      >
        <button
          disabled={!data.isAvailable || !data.inStock}
          onClick={() => navigate(`/products/${data.id}`)}
          className={`w-full rounded-lg py-2 transition-transform duration-200 ${
            data.isAvailable && data.inStock
              ? "bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {data.isAvailable && data.inStock
            ? "Add to Cart"
            : "Currently Unavailable"}
        </button>
      </motion.div>
    </Card>
  );
};

export default ItemCard;
