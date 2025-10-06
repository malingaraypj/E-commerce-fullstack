import { updateCartCount, removeFromCart } from "@/store/reducers/cartSlice";
import { Trash2 } from "lucide-react";
import type { Product } from "@/models/product";
import { Button } from "../ui/button";

import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";

function OrderCard({ product, count }: { product: Product; count: number }) {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div key={product._id} className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-16 h-16 object-cover rounded-md"
        />
        <div>
          <p className="font-semibold">{product.name}</p>
          <div className="flex items-center gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                dispatch(
                  updateCartCount({
                    id: product._id,
                    count: count - 1,
                  })
                )
              }
            >
              -
            </Button>
            <span className="px-2 w-8 text-center font-semibold">{count}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                dispatch(
                  updateCartCount({
                    id: product._id,
                    count: count + 1,
                  })
                )
              }
            >
              +
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p>${(product.price * count).toFixed(2)}</p>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500"
          onClick={() => dispatch(removeFromCart({ id: product._id }))}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default OrderCard;
