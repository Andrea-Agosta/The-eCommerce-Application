import { CheckoutDeliveryInfo } from "../components/checkout/CheckoutDeliveryInfo";
import { CheckoutPayment } from "../components/checkout/CheckoutPayment";
import { CheckoutSummary } from "../components/checkout/CheckoutSummary";

export const Checkout = () => {
  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-gray-900 pt-10 mb-6">Checkout</h1>
        <CheckoutSummary />
        <CheckoutDeliveryInfo />
        <CheckoutPayment />
      </div>
    </div>
  )
}
