import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./App.css";

const stripePromise = loadStripe(
  "pk_test_51KBXjTSJiJf23hBTiqnwBG461YdFhGTbqxvqXzYlO2WQFK1o6H5ZH90d6SejXEbuFPPCzQYZQypSd1hv6A2jJArw00xOo2W8M2"
);

function App() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    setClientSecret(
      "sk_test_51KBXjTSJiJf23hBTl6qrq2MoMhsOGRkce9iblKCMmv3v1uzE09Jmc7uZWTGUPcbJlfonHGLEfaXK0NmPNCIHwucA00gQNCkCNx"
    );
  }, []);

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <div className="App">
      <p>app</p>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default App;
