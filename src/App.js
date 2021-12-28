import React, { useEffect, useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";

// import CheckoutForm from "./CheckoutForm";
import "./App.css";

// const stripePromise = loadStripe(
//   "pk_test_51KBXjTSJiJf23hBTiqnwBG461YdFhGTbqxvqXzYlO2WQFK1o6H5ZH90d6SejXEbuFPPCzQYZQypSd1hv6A2jJArw00xOo2W8M2"
// );

function App() {
  const { googlePayClient } = window;

  const baseCardPaymentMethod = {
    type: "CARD",
    parameters: {
      allowedCardNetworks: ["VISA", "MASTERCARD"],
      allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
    },
  };

  const googlePayBaseConfiguration = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [baseCardPaymentMethod],
  };

  // const [clientSecret, setClientSecret] = useState("");
  const [gPayBtn, setGPayBtn] = useState(null);

  function createAndAddButton() {
    if (googlePayClient) {
      const googlePayButton = googlePayClient.createButton({
        buttonColor: "default",

        buttonType: "long",

        onClick: processPayment,
      });

      setGPayBtn(googlePayButton);
    }
  }

  function processPayment() {
    console.log("test");
    const tokenizationSpecification = {
      type: "PAYMENT_GATEWAY",
      parameters: {
        gateway: "stripe",
        "stripe:version": "v3",
        "stripe:publishableKey":
          "pk_test_51KBXjTSJiJf23hBTiqnwBG461YdFhGTbqxvqXzYlO2WQFK1o6H5ZH90d6SejXEbuFPPCzQYZQypSd1hv6A2jJArw00xOo2W8M2",
      },
    };

    const cardPaymentMethod = {
      type: "CARD",
      tokenizationSpecification: tokenizationSpecification,
      parameters: {
        allowedCardNetworks: ["VISA", "MASTERCARD"],
        allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
        billingAddressRequired: true,
        billingAddressParameters: {
          format: "FULL",
          phoneNumberRequired: true,
        },
      },
    };

    const transactionInfo = {
      totalPriceStatus: "FINAL",
      totalPrice: "123.45",
      currencyCode: "USD",
    };

    const merchantInfo = {
      merchantId: "BCR2DN4TXDNIDFIL", // Only in PRODUCTION
      merchantName: "Example Merchant Name",
    };

    const paymentDataRequest = {
      ...googlePayBaseConfiguration,
      ...{
        allowedPaymentMethods: [cardPaymentMethod],
        transactionInfo,
        merchantInfo,
      },
    };

    googlePayClient
      .loadPaymentData(paymentDataRequest)
      .then(function (paymentData) {
        console.log(paymentData);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  useEffect(() => {
    googlePayClient
      .isReadyToPay(googlePayBaseConfiguration)
      .then(function (response) {
        if (response.result) {
          createAndAddButton();
        } else {
          alert("Unable to pay using Google Pay");
        }
      })
      .catch(function (err) {
        console.error("Error determining readiness to use Google Pay: ", err);
      });
  }, []);

  // useEffect(() => {
  //   setClientSecret(
  //     "sk_test_51KBXjTSJiJf23hBTl6qrq2MoMhsOGRkce9iblKCMmv3v1uzE09Jmc7uZWTGUPcbJlfonHGLEfaXK0NmPNCIHwucA00gQNCkCNx"
  //   );
  // }, []);

  // const options = {
  //   clientSecret,
  //   appearance: {
  //     theme: "stripe",
  //   },
  // };

  return (
    <div className="App">
      {/*
       {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )} 
      */}
      <div
        onClick={processPayment}
        dangerouslySetInnerHTML={{ __html: gPayBtn && gPayBtn.innerHTML }}
      />
    </div>
  );
}

export default App;
