import ShippingCard from "@/components/checkout/ShippingCard";
import PaymentCard from "@/components/checkout/PaymentCard";
import PaymentHeader from "@/components/checkout/selectedProducts";
import OrderSummary from "@/components/checkout/OrderSummary";

const CheckoutPage = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* selected products */}
        <PaymentHeader />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side: Shipping and Payment */}
          <div className="flex flex-col gap-8">
            <ShippingCard />
            <PaymentCard />
          </div>

          {/* Right Side: Order Summary */}
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
