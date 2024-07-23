import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import PaymentModuleForm from "./PaymentModuleForm";

function PaymentModule({ clientSecret }: { clientSecret: string }) {
  const options = {
    clientSecret,
  };
  const [stripe, setStripe] = useState<Stripe | null>();
  const getStripeInstance = async () => {
    try {
      const stripePromise = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLIC_API_KEY!
      );
      setStripe(stripePromise);
    } catch (err) {
      console.log("Il y a eu une erreur");
    }
  };
  useEffect(() => {
    getStripeInstance();
  }, [clientSecret]);

  return clientSecret && stripe ? (
    <Elements stripe={stripe} options={options}>
      <PaymentModuleForm />
    </Elements>
  ) : null;
}

export default PaymentModule;
