import { Card, CardHeader, CardTitle } from "../ui/card";

function PaymentHeader() {
  return (
    <Card className="shadow-lg rounded-2xl overflow-hidden mb-8">
      <CardHeader className="p-6">
        <CardTitle className="text-3xl font-bold text-gray-800">
          Confirm Your Purchase
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaymentHeader;
