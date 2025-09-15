import React, { useState } from "react";
import type { Product } from "@/models/product";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";

// Shadcn UI components
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { addToCart } from "@/store/reducers/cartSlice";

// Dummy product data
const dummyProduct: Product = {
  id: "p1",
  name: "Wireless Noise Cancelling Headphones",
  description:
    "Experience premium sound with active noise cancellation, long battery life, and superior comfort. Perfect for travel, work, and everyday use.",
  images: [
    "https://picsum.photos/seed/headphones1/600/400",
    "https://picsum.photos/seed/headphones2/600/400",
    "https://picsum.photos/seed/headphones3/600/400",
    "https://picsum.photos/seed/headphones1/600/400",
    "https://picsum.photos/seed/headphones1/600/400",
    "https://picsum.photos/seed/headphones2/600/400",
    "https://picsum.photos/seed/headphones3/600/400",
  ],
  category: ["Electronics", "Audio", "Headphones"],
  discountedPrice: 149.99,
  originalPrice: 199.99,
  brand: "SoundMax",
  rating: 4.5,
  reviewCount: 1287,
  inStock: true,
  isAvailable: true,
  averageRating: 4.5,
  badges: ["Best Seller", "Limited Stock"],
};

const ProductDetails: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(dummyProduct.images[0]);
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch: AppDispatch = useDispatch();

  console.log(cart);

  const discount =
    dummyProduct.originalPrice &&
    Math.round(
      ((dummyProduct.originalPrice - dummyProduct.discountedPrice) /
        dummyProduct.originalPrice) *
        100
    );

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      {/* Left: Image Gallery */}
      <div>
        <Card className="overflow-hidden">
          <img
            src={selectedImage}
            alt={dummyProduct.name}
            className="w-full h-96 object-cover"
          />
          <ScrollArea className="w-full rounded-md border whitespace-nowrap">
            <div className="flex gap-2 p-4">
              {dummyProduct.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`thumb-${idx}`}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border ${
                    selectedImage === img
                      ? "ring ring-blue-400"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>

            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </Card>
      </div>

      {/* Right: Product Info */}
      <div>
        <p className="text-sm text-gray-500">
          {dummyProduct.category.join(" → ")}
        </p>

        <h1 className="text-3xl font-bold mt-2">{dummyProduct.name}</h1>
        {dummyProduct.brand && (
          <p className="text-gray-600 text-sm mt-1">
            Brand: <span className="font-medium">{dummyProduct.brand}</span>
          </p>
        )}

        {/* Badges */}
        <div className="flex gap-2 mt-2">
          {dummyProduct.badges?.map((badge, idx) => (
            <Badge key={idx} variant="secondary">
              {badge}
            </Badge>
          ))}
        </div>

        {/* Price */}
        <div className="mt-4 flex items-center gap-3">
          <span className="text-2xl font-bold text-green-600">
            ${dummyProduct.discountedPrice.toFixed(2)}
          </span>
          {dummyProduct.originalPrice && (
            <span className="text-gray-500 line-through">
              ${dummyProduct.originalPrice.toFixed(2)}
            </span>
          )}
          {discount && <Badge variant="destructive">-{discount}%</Badge>}
        </div>

        {/* Stock */}
        <p
          className={`mt-2 font-medium ${
            dummyProduct.inStock ? "text-green-600" : "text-red-600"
          }`}
        >
          {dummyProduct.inStock ? "In Stock" : "Out of Stock"}
        </p>

        {/* Ratings */}
        <div className="flex items-center mt-2">
          <span className="text-yellow-500 text-lg">★</span>
          <span className="ml-1">{dummyProduct.averageRating}</span>
          <span className="ml-2 text-sm text-gray-600">
            ({dummyProduct.reviewCount} reviews)
          </span>
        </div>

        {/* Description */}
        <p className="mt-4 text-gray-700">{dummyProduct.description}</p>

        {/* Actions */}
        <div className="mt-6 flex gap-4">
          <Button
            onClick={() => dispatch(addToCart(dummyProduct))}
            disabled={!dummyProduct.inStock}
          >
            Add to Cart
          </Button>
          <Button variant="secondary" disabled={!dummyProduct.inStock}>
            Buy Now
          </Button>
        </div>

        {/* Extra Info */}
        <div className="mt-6 text-sm text-gray-600">
          <p>✅ Free delivery in 2–5 days</p>
          <p>🛡️ 1 Year Warranty</p>
        </div>
      </div>

      {/* Reviews Section
      <ReviewSection /> */}
    </div>
  );
};

export default ProductDetails;
