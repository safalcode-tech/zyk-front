import React, { useState } from 'react';
import api from '../utils/api';

const Payment = ({ selectedPlan, selectedDuration, totalPrice,totalDays }) => {
  const [paymentStatus, setPaymentStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!selectedPlan || !selectedPlan.price) {
      setPaymentStatus('Invalid plan selected');
      return;
    }

    setLoading(true);
    try {
      // Step 1: Create Razorpay Order and pass the selected plan ID
      const { data } = await api.post('/create-order', {
        amount: totalPrice,
        planId: selectedPlan.plan_id,
      });

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: data.amount * 100, // Amount in paise
        currency: 'INR',
        name: 'ZYL.LI',
        description: 'Subscription Payment',
        order_id: data.order_id,
        handler: async (response) => {
          try {
            // Step 2: Verify Payment on your server and pass the selected plan ID
            const result = await api.post('/verify-payment', {
              paymentId: response.razorpay_payment_id,
              orderId: data.order_id,
              amount: data.amount,
              signature: response.razorpay_signature,
              planId: selectedPlan.plan_id, // Send plan ID for verification
              daysActive: totalDays, // Send the duration of the plan for verification
            });
            setPaymentStatus(result.data.message); // Display success message
          } catch (error) {
            setPaymentStatus('Payment verification failed.');
            console.error('Error verifying payment', error);
          }
        },
        prefill: {
          name: 'User Name',
          email: 'user@example.com',
          contact: '1234567890',
        },
        theme: {
          color: '#F37254',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      setPaymentStatus('Payment initiation failed.');
      console.error('Error initiating payment', error);
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
