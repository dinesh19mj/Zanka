"use client";

import { useState } from "react";
import Script from "next/script";

interface RazorpayButtonProps {
  amount: number;
  productName: string;
  productId: string;
  className?: string;
}

export function RazorpayButton({ amount, productName, productId, className }: RazorpayButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // 1. Check if Razorpay script is loaded
      if (!(window as any).Razorpay) {
        alert("Razorpay SDK failed to load. Are you online?");
        setLoading(false);
        return;
      }

      // 2. Create an order on our backend
      const res = await fetch("/api/checkout/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, receipt: productId }),
      });

      const order = await res.json();

      if (order.error) {
        alert("Server error: " + order.error);
        setLoading(false);
        return;
      }

      // 3. Initialize Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_dummy_key_id",
        amount: order.amount,
        currency: order.currency,
        name: "Zanka",
        description: `Purchase of ${productName}`,
        order_id: order.id,
        handler: function (response: any) {
          // 4. Handle success callback
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          // Redirect or show success modal here
        },
        prefill: {
          name: "Zanka Customer",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#E5212B", // Zanka Red
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.on("payment.failed", function (response: any) {
        alert(`Payment failed: ${response.error.description}`);
      });

      // 5. Open the modal
      paymentObject.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong initializing the payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Load the Razorpay SDK */}
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <button
        onClick={handlePayment}
        disabled={loading}
        className={className || "w-full bg-primary text-white font-body text-xs tracking-widest uppercase py-4 hover:bg-white hover:text-black transition-colors disabled:opacity-50"}
      >
        {loading ? "Processing..." : "Buy Now"}
      </button>
    </>
  );
}
