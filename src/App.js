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
    // Create PaymentIntent as soon as the page loads
    fetch(
      "https://demo-backend123.herokuapp.com/api/v1/create-payment-intent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
      }
    )
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )} 
    </div>
  );
}

export default App;
