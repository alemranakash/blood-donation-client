// Payment.js


import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
//   const name = queryParams.get("name") || "";
//   const email = queryParams.get("email") || "";
  const amount = queryParams.get("amount") || "";

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Payment Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* <div>
          <p className="text-gray-700">
            <span className="font-bold">Name:</span> {name}
          </p>
        </div>
        <div>
          <p className="text-gray-700">
            <span className="font-bold">Email:</span> {email}
          </p>
        </div> */}
      </div>
      <div className="mt-4">
        <p className="text-gray-700">
          <span className="font-bold">Amount:</span> {amount}
        </p>
      </div>
      <div className="mt-6">
        <Elements stripe={stripePromise}>
          <CheckoutForm  amount={amount} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
