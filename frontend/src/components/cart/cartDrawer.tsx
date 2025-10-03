import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import ItemCard from "../Landing/ItemCard";

import { removeFromCart, updateCartCount } from "@/store/reducers/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";

const CartDrawer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch: AppDispatch = useDispatch();
  const cartProducts = useSelector((state: RootState) => state.cart);

  const [currentIndex, setCurrentIndex] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (cartProducts.length === 0) {
      setCurrentIndex(0);
      return;
    }
    if (currentIndex >= cartProducts.length) {
      setCurrentIndex(cartProducts.length - 1);
    }
  }, [cartProducts.length, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? cartProducts.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cartProducts.length);
  };

  const currentItem =
    cartProducts.length > 0 ? cartProducts[currentIndex] : null;
  const isCartEmpty = cartProducts.length === 0;

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    }
  };

  return (
    <Drawer onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="max-w-lg mx-auto flex flex-col h-[95dvh]">
        <DrawerHeader className="text-center">
          <DrawerTitle className="text-2xl font-bold">Your Cart</DrawerTitle>
          {!isCartEmpty && (
            <DrawerDescription>
              You have {cartProducts.length} item(s) in your cart.
            </DrawerDescription>
          )}
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-4">
          {isCartEmpty ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-center text-gray-500">Your cart is empty.</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center justify-center w-full gap-2">
                <Button
                  onClick={handlePrev}
                  variant="outline"
                  size="icon"
                  disabled={cartProducts.length <= 1}
                >
                  <ChevronLeft />
                </Button>

                {currentItem && (
                  <div className="flex flex-col gap-3 w-64 md:w-72">
                    <ItemCard data={currentItem.product} />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            dispatch(
                              updateCartCount({
                                id: currentItem.product.id,
                                count: currentItem.count - 1,
                              })
                            )
                          }
                        >
                          -
                        </Button>
                        <span className="px-2 w-8 text-center font-semibold">
                          {currentItem.count}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            dispatch(
                              updateCartCount({
                                id: currentItem.product.id,
                                count: currentItem.count + 1,
                              })
                            )
                          }
                        >
                          +
                        </Button>
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          dispatch(
                            removeFromCart({ id: currentItem.product.id })
                          );
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleNext}
                  variant="outline"
                  size="icon"
                  disabled={cartProducts.length <= 1}
                >
                  <ChevronRight />
                </Button>
              </div>
            </div>
          )}
        </div>

        <DrawerFooter className="pt-4 border-t">
          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isCartEmpty}
          >
            Proceed to Checkout
          </Button>
          <DrawerClose asChild>
            {/* 💡 STEP 5: Attach the ref to the button */}
            <Button variant="outline" className="w-full" ref={closeButtonRef}>
              Continue Shopping
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
