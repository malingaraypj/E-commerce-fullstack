import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// API
import { getProductById } from "@/api/product";

// Shadcn UI components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

//  custom components
import ReviewSection from "@/components/productDetails/ReviewComponent";
import type { Product } from "@/models/product";

// redux
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/reducers/cartSlice";
import ImageGallery from "@/components/productDetails/ImageGallery";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: ({ signal }) => getProductById(id!, signal),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <Skeleton className="h-[500px] w-full" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center text-red-500">
        Failed to load product details. Please try again later.
      </div>
    );
  }

  const discount =
    product.originalPrice &&
    Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100
    );

  return (
    <div className="bg-gradient-to-br from-amber-50 to-amber-100 h-full py-5">
      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8 bg-blue-100">
        {/* Left: Image Gallery */}
        <ImageGallery images={product.images} />
        {/* Right: Product Info */}
        <div>
          <p className="text-sm text-gray-500">
            {Array.isArray(product.category)
              ? product.category.join(" → ")
              : product.category}
          </p>

          <h1 className="text-3xl font-bold mt-2">{product.name}</h1>
          {product.brand && (
            <p className="text-gray-600 text-sm mt-1">
              Brand: <span className="font-medium">{product.brand}</span>
            </p>
          )}

          {/* Badges */}
          <div className="flex gap-2 mt-2">
            {product.badges?.map((badge, idx) => (
              <Badge key={idx} variant="secondary">
                {badge}
              </Badge>
            ))}
          </div>

          {/* Price */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-bold text-green-600">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {discount && <Badge variant="destructive">-{discount}%</Badge>}
          </div>

          {/* Stock */}
          <p
            className={`mt-2 font-medium ${
              product.stock ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stock ? "In Stock" : "Out of Stock"}
          </p>

          {/* Ratings */}
          <div className="flex items-center mt-2">
            <span className="text-yellow-500 text-lg">★</span>
            <span className="ml-1">{product.averageRating}</span>
            <span className="ml-2 text-sm text-gray-600">
              ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Description */}
          <p className="mt-4 text-gray-700">{product.description}</p>

          {/* Actions */}
          <div className="mt-6 flex gap-4">
            <Button onClick={() => dispatch(addToCart(product))}>
              Add to Cart
            </Button>
            <Button
              onClick={() => navigate("/checkout")}
              variant="secondary"
              disabled={!product.stock}
            >
              Buy Now
            </Button>
          </div>

          {/* Extra Info */}
          <div className="mt-6 text-sm text-gray-600">
            <p>✅ Free delivery in 2–5 days</p>
            <p>🛡️ 1 Year Warranty</p>
          </div>
        </div>
        {/* Reviews Section */}
        <ReviewSection productId={product._id} />
      </div>
    </div>
  );
};

export default ProductDetails;
