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
      className="relative w-full h-[420px] rounded-xl shadow-sm hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-1 overflow-hidden bg-card flex flex-col product-card-hover"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image */}
      <div className="relative p-3 bg-muted/30 h-48 flex-shrink-0">
        <img
          src={data.images[0] ? data.images[0] : dummyImg}
          alt={data.name}
          className="w-full h-full object-contain rounded-lg"
        />

        {/* Badges */}
        {data.badges && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-2 z-10">
            {data.badges.map((badge, idx) => (
              <span
                key={idx}
                className="bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-md shadow-sm"
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
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                {data.brand}
              </p>
            )}
            <CardTitle className="text-lg font-semibold text-card-foreground line-clamp-1">
              {data.name}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground line-clamp-2 h-10">
              {data.description}
            </CardDescription>
          </CardHeader>

          {/* Price */}
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xl font-bold text-primary">
              ${data.price?.toFixed(2)}
            </p>
            {data.originalPrice && (
              <p className="text-sm text-muted-foreground line-through">
                ${data.originalPrice.toFixed(2)}
              </p>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < Math.floor(data.averageRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground/40"
                }
              />
            ))}
            <span className="ml-1">{data.averageRating?.toFixed(1)}</span>
            {data.reviewCount !== undefined && (
              <span className="text-muted-foreground/70">
                ({data.reviewCount})
              </span>
            )}
          </div>

          {/* Stock Info */}
          <p
            className={`mt-1 text-xs font-medium ${
              data.stock > 0 ? "text-green-600" : "text-destructive"
            }`}
          >
            {data.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>
        </div>
      </CardContent>

      {/* move to product details */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={hovered ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute bottom-0 left-0 right-0 px-4 pb-4"
        style={{ pointerEvents: hovered ? "auto" : "none" }}
      >
        <button
          disabled={data.stock == 0}
          onClick={() => navigate(`/products/${data.id}`)}
          className={`w-full rounded-lg py-2 transition-transform duration-200 ${
            data.stock > 0
              ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 cursor-pointer"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {data.stock > 0 ? "View Details" : "Currently Unavailable"}
        </button>
      </motion.div>
    </Card>
  );
};

export default ItemCard;
