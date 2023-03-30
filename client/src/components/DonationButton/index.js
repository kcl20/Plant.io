//https://medium.com/@kickbeck/stripe-client-side-donation-button-with-react-64730cf40f14
import React from "react";
// import "./styles.css";
// import "./styles/tailwind-pre-build.css";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51IUqMCJ2iOysJZvP3vrQpEoV2l1SpF9PzkycqVdKjmC3RYuDC3AqTvRfBDcsDwDmtxJlkUyip4GQOb8Akt0lF3O100RSHVPfch"
);
const DonationButton = ({ itemID, ammount }) => {
  const handleClick = async (event) => {
    const stripe = await stripePromise;
    stripe
      .redirectToCheckout({
        lineItems: [{ price: itemID, quantity: 1 }],
        mode: "payment",
        // change success and cancel urls...
        // successUrl: window.location.protocol + "/",
        // cancelUrl: window.location.protocol + "/",

        successUrl : `${window.location.protocol}//${window.location.host}/success`,
        cancelUrl: 'http://localhost:3000',
        submitType: "donate",
      })
      .then(function (result) {
        if (result.error) {
          console.log(result);
        }
      });
  };
  return (
    <button
      className="flex items-center justify-center bg-blue-500 text-white font-bold py-2 px-4 rounded"
      onClick={handleClick}
    >
      Donate ${ammount}
    </button>
  );
};
export default function App() {
  return (
    <>
      <div className="flex items-center justify-center bg-blue-500 text-white font-bold py-2 px-4 rounded">
        <DonationButton
          ammount={"5.00"}
          itemID="price_1IUx1FJ2iOysJZvP1LD3EzTR"
        ></DonationButton>
      </div>
    </>
  );
}
