import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import OrderCard from "./OrderCard";

function OrderSummary() {
  const cartProducts = useSelector((state: RootState) => state.cart);

  const subtotal = cartProducts.reduce(
    (acc, item) => acc + item.product.price * item.count,
    0
  );

  const productsCount = cartProducts.length;
  const shipping = 10;
  const total = subtotal + shipping;

  return (
    <Card className="shadow-lg rounded-2xl overflow-hidden">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cartProducts.map((item) => (
            <OrderCard
              key={item.product._id}
              product={item.product}
              count={item.count}
            />
          ))}
        </div>
        <Separator className="my-4" />
        <div className="space-y-2">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping</p>
            <p>${productsCount === 0 ? 0 : shipping.toFixed(2)}</p>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between font-bold text-lg">
          <p>Total</p>
          <p>${productsCount === 0 ? 0 : total.toFixed(2)}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button disabled={productsCount === 0} className="w-full">
          Confirm Purchase
        </Button>
      </CardFooter>
    </Card>
  );
}

export default OrderSummary;
