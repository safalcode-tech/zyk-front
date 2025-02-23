// export default Payment;
import React, { useState, useEffect } from 'react';
import { load } from '@cashfreepayments/cashfree-js';
import api from '../utils/api';

const Payment = ({ selectedPlan, selectedDuration, totalPrice,totalDays }) => {
  const [cashfree, setCashfree] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const cashfreeMode = 'PROD';

  // Load Cashfree SDK when the component mounts
  useEffect(() => {
    async function loadSdk() {
      try {
        // Set mode to "sandbox" or "production" as needed
        const cf = await load({ mode: 'production' });
        setCashfree(cf);
      } catch (err) {
        console.error('Error loading Cashfree SDK', err);
        setPaymentStatus('Error loading Cashfree SDK.');
      }
    }
    loadSdk();
  }, []);

  const handlePayment = async () => {
    if (!selectedPlan || !selectedPlan.price) {
      setPaymentStatus('Invalid plan selected');
      return;
    }
    if (!cashfree) {
      setPaymentStatus('Cashfree SDK is still loading. Please wait.');
      return;
    }
    setLoading(true);
    try {
      // Create a Cashfree order on your backend
      const { data } = await api.post('/create-order', {
        amount: totalPrice,
        daysActive: totalDays,
        planId: selectedPlan.plan_id,
        duration:selectedDuration
      });

      // Ensure required details are returned
      if (data.payment_session_id && data.order_id && data.order_meta?.return_url) {
        const checkoutOptions = {
          paymentSessionId: data.payment_session_id,
          returnUrl: data.order_meta.return_url,
        };

        // Use the Cashfree SDK's checkout method
        const result = await cashfree.checkout(checkoutOptions);
        if (result.error) {
          alert(result.error.message);
        }
        if (result.redirect) {
          console.log("Redirection initiated by Cashfree Checkout");
        }
      } else {
        setPaymentStatus('Missing payment session details from order response.');
      }
    } catch (error) {
      console.error('Error initiating payment', error);
      setPaymentStatus('Payment initiation failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Payment</h2>
      <button onClick={handlePayment} disabled={loading || !selectedPlan}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default Payment;
