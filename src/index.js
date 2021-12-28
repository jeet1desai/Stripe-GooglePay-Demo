import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const options = {
  // passing the client secret obtained from the server
  clientSecret: process.env.REACT_APP_STRIPE_KEY,
};

ReactDOM.render(
  <Elements stripe={stripePromise} options={options}>
    <App />
  </Elements>,
  document.getElementById("root")
);
