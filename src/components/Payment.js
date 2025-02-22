// import React, { useState } from 'react';
// import api from '../utils/api';

// const Payment = ({ selectedPlan, selectedDuration, totalPrice,totalDays }) => {
//   const [paymentStatus, setPaymentStatus] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handlePayment = async () => {
//     if (!selectedPlan || !selectedPlan.price) {
//       setPaymentStatus('Invalid plan selected');
//       return;
//     }

//     setLoading(true);
//     try {
//       // Step 1: Create Razorpay Order and pass the selected plan ID
//       const { data } = await api.post('/create-order', {
//         amount: totalPrice,
//         planId: selectedPlan.plan_id,
//       });

//       const options = {
//         key: process.env.REACT_APP_RAZORPAY_KEY_ID,
//         amount: data.amount * 100, // Amount in paise
//         currency: 'INR',
//         name: 'ZYL.LI',
//         description: 'Subscription Payment',
//         order_id: data.order_id,
//         handler: async (response) => {
//           try {
//             // Step 2: Verify Payment on your server and pass the selected plan ID
//             const result = await api.post('/verify-payment', {
//               paymentId: response.razorpay_payment_id,
//               orderId: data.order_id,
//               amount: data.amount,
//               signature: response.razorpay_signature,
//               planId: selectedPlan.plan_id, // Send plan ID for verification
//               daysActive: totalDays, // Send the duration of the plan for verification
//             });
//             setPaymentStatus(result.data.message); // Display success message
//           } catch (error) {
//             setPaymentStatus('Payment verification failed.');
//             console.error('Error verifying payment', error);
//           }
//         },
//         prefill: {
//           name: 'User Name',
//           email: 'user@example.com',
//           contact: '1234567890',
//         },
//         theme: {
//           color: '#F37254',
//         },
//       };

//       const razorpay = new window.Razorpay(options);
//       razorpay.open();
//     } catch (error) {
//       setPaymentStatus('Payment initiation failed.');
//       console.error('Error initiating payment', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Payment</h2>
//       <button onClick={handlePayment} disabled={loading || !selectedPlan}>
//         {loading ? 'Processing...' : 'Pay Now'}
//       </button>
//       {paymentStatus && <p>{paymentStatus}</p>}
//     </div>
//   );
// };

// export default Payment;
// import React, { useState } from 'react';
// import api from '../utils/api';

// const Payment = ({ selectedPlan, selectedDuration, totalPrice, totalDays }) => {
//   const [paymentStatus, setPaymentStatus] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handlePayment = async () => {
//     if (!selectedPlan || !selectedPlan.price) {
//       setPaymentStatus('Invalid plan selected');
//       return;
//     }
//     setLoading(true);
//     try {
//       // Call your backend's Cashfree order creation endpoint
//       const { data } = await api.post('/create-order', {
//         amount: totalPrice,
//         user_id: selectedPlan.user_id,  // or use the authenticated user id from your auth state
//         daysActive: totalDays,          // duration for plan activation
//         planId: selectedPlan.plan_id    // pass plan id if needed for your upgrade logic
//       });

//       // Expect your backend to return a payment_link and order_id
//       if (data.payment_link) {
//         // Redirect the user to the Cashfree payment page
//         window.location.href = data.payment_link;
//       } else {
//         setPaymentStatus('Payment initiation failed. No payment link received.');
//       }
//     } catch (error) {
//       console.error('Error initiating payment', error);
//       setPaymentStatus('Payment initiation failed.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Payment</h2>
//       <button onClick={handlePayment} disabled={loading || !selectedPlan}>
//         {loading ? 'Processing...' : 'Pay Now'}
//       </button>
//       {paymentStatus && <p>{paymentStatus}</p>}
//     </div>
//   );
// };

// export default Payment;
import React, { useState, useEffect } from 'react';
import { load } from '@cashfreepayments/cashfree-js';
import api from '../utils/api';

const Payment = ({ selectedPlan, totalPrice, totalDays }) => {
  const [cashfree, setCashfree] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [loading, setLoading] = useState(false);

  // Load Cashfree SDK when the component mounts
  useEffect(() => {
    async function loadSdk() {
      try {
        // Set mode to "sandbox" or "production" as needed
        const cf = await load({ mode: 'sandbox' });
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
        user_id: selectedPlan.user_id,  // use authenticated user's ID
        daysActive: totalDays,
        planId: selectedPlan.plan_id,
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
