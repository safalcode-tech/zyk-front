import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../utils/api'; // Your axios instance configured with auth tokens if needed

const PaymentStatus = () => {
  const location = useLocation();
  const [statusMessage, setStatusMessage] = useState('Verifying payment...');

  // Extract the orderId from query parameters (e.g., ?order_id=ORDER_12345)
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('order_id');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Call your backend verify-payment endpoint
        const response = await api.post('/verify-payment', { orderId });
        setStatusMessage(response.data.message);
      } catch (error) {
        console.error('Error verifying payment:', error);
        setStatusMessage('Payment verification failed.');
      }
    };

    if (orderId) {
      verifyPayment();
    } else {
      setStatusMessage('No order ID provided.');
    }
  }, [orderId]);

  return (
    <div>
      <h2>Payment Status</h2>
      <p>{statusMessage}</p>
    </div>
  );
};

export default PaymentStatus;
