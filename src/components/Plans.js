// import React, { useState, useEffect } from 'react';
// import api from '../utils/api';
// import Payment from './Payment'; // Assuming you have a Payment component that handles payment processing.
// import ActivePlans from './ActivePlan';

// const Plans = () => {
//   const [plans, setPlans] = useState([]);
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [selectedDuration, setSelectedDuration] = useState(1); // Default to 1 month
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [totalDays, setTotalDays] = useState(30); // Store total days

//   const handleSelectPlan = (plan) => {
//     setSelectedPlan(plan);
//     // Reset duration selection to 1 month by default
//     setSelectedDuration(1);
//     setTotalDays(30); // 1 month = 30 days by default
//   };

//   const handleDurationChange = (event) => {
//     const duration = parseInt(event.target.value, 10);
//     setSelectedDuration(duration);
//     const calculatedDays = duration * 30; // 30 days per month
//     setTotalDays(calculatedDays);
//     // Recalculate the price
//     if (selectedPlan) {
//       setTotalPrice(selectedPlan.price * duration);
//     }
//   };

//   // Fetch available plans and membership info
//   const fetchPlans = async () => {
//     try {
//       const response = await api.get('/plans');
//       setPlans(response.data);
//     } catch (error) {
//       console.error('Error fetching plans', error);
//     }
//   };

//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   useEffect(() => {
//     // Recalculate total price when selected plan or duration changes
//     if (selectedPlan) {
//       setTotalPrice(selectedPlan.price * selectedDuration);
//     }
//   }, [selectedPlan, selectedDuration]);

//   return (
//     <div className="plans-container">
//       {/* Display active plan */}
//       <ActivePlans
//         planNameShow={true}
//         urlLimitShow={true}
//         dailyUrlLimitShow={true}
//         urlsRemainingTodayShow={true}
//         urlsRemainingMonthShow={true}
//         activationDateShow={true}
//         expirationDateShow={true}
//         daysRemainingShow={true}
//       />

//       <h2 className="plans-heading">Choose Your Membership Plan</h2>
//       {/* Show selected plan and total price */}
//       {selectedPlan && (
//         <div className="selected-plan">
//           <h3>Selected Plan: {selectedPlan.name}</h3>
//           <p>Links Per Month: {selectedPlan.url_limit}</p>
//           <p>Price: ₹{totalPrice}</p>
//           <p>Duration: {selectedDuration} months ({totalDays} days)</p>
//           {/* Duration dropdown */}
//           <div className="duration-select">
//             <label htmlFor="duration">Select Duration:</label>
//             <select
//               id="duration"
//               value={selectedDuration}
//               onChange={handleDurationChange}
//               className="duration-select-box"
//             >
//               <option value="1">1 Month</option>
//               <option value="2">2 Months</option>
//               <option value="3">3 Months</option>
//               <option value="6">6 Months</option>
//               <option value="12">12 Months</option>
//             </select>
//           </div>
//         </div>
//       )}

//       {/* Payment Component */}
//       {selectedPlan && totalPrice > 0 && (
//         <div className="payment-container">
//           <Payment
//             selectedPlan={selectedPlan}
//             selectedDuration={selectedDuration}
//             totalPrice={totalPrice}
//             totalDays={totalDays}
//           />
//         </div>
//       )}

//       {/* Plans list - Display all available plans */}
//       <div className="plans-list">
//         {plans.length > 0 ? (
//           plans.map((plan) => (
//             <div key={plan.id} className="plan-card">
//               <h3>{plan.name}</h3>
//               <p>Links Per Month: {plan.url_limit}</p>
//               <p>Price: ₹{plan.price}</p>
//               {!plan.free && (
//                 <button className="select-button" onClick={() => handleSelectPlan(plan)}>
//                   Select Plan
//                 </button>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>Loading plans...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Plans;
import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import Payment from './Payment';
import ActivePlans from './ActivePlan';
import '../css/Plans.css'; // Add a custom CSS file for styling
import useAuth from '../hooks/useAuth';
const Plans = () => {
  const isLoggedIn = useAuth(); // Use the custom auth hook
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(1); // Default to 1 month
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDays, setTotalDays] = useState(30);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setSelectedDuration(1);
    setTotalDays(30);
  };

  const handleDurationChange = (event) => {
    const duration = parseInt(event.target.value, 10);
    setSelectedDuration(duration);
    const calculatedDays = duration * 30;
    setTotalDays(calculatedDays);
    if (selectedPlan) {
      setTotalPrice(selectedPlan.price * duration);
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await api.get('/plans');
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching plans', error);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  useEffect(() => {
    if (selectedPlan) {
      setTotalPrice(selectedPlan.price * selectedDuration);
    }
  }, [selectedPlan, selectedDuration]);

  return (
    <div className="plans-container">
      {/* Active Plan Section */}
      <div className="row">
      {isLoggedIn &&(
      <div className="col-md-6 col-sm-12">
        <ActivePlans
          planNameShow={true}
          urlLimitShow={true}
          dailyUrlLimitShow={true}
          urlsRemainingTodayShow={true}
          urlsRemainingMonthShow={true}
          activationDateShow={true}
          expirationDateShow={true}
          daysRemainingShow={true}
        />
      </div>
      )}
      <div className="col-md-6 col-sm-12">

        <h2 className="plans-heading">Choose Your Membership Plan</h2>

        {/* Selected Plan Display */}
        {selectedPlan && (
          <div className="selected-plan">
            <h3 className="selected-plan-title">Selected Plan: {selectedPlan.name}</h3>
            <div className="selected-plan-details">
              <p><strong>Links Per Month:</strong> {selectedPlan.url_limit}</p>
              <p><strong>Price:</strong> ₹{totalPrice}</p>
              <p>
                <strong>Duration:</strong> {selectedDuration} month(s) ({totalDays} days)
              </p>
            </div>
            <div className="duration-select">
              <label htmlFor="duration">Select Duration:</label>
              <select
                id="duration"
                value={selectedDuration}
                onChange={handleDurationChange}
                className="duration-select-box"
              >
                <option value="1">1 Month</option>
                <option value="2">2 Months</option>
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                <option value="12">12 Months</option>
              </select>
            </div>
          </div>
        )}

        {/* Payment Section */}
        {selectedPlan && totalPrice > 0 && (
          <div className="payment-container">
            <Payment
              selectedPlan={selectedPlan}
              selectedDuration={selectedDuration}
              totalPrice={totalPrice}
              totalDays={totalDays}
            />
          </div>
        )}

        {/* Plans List */}
        <div className="plans-list">
          {plans.length > 0 ? (
            plans.map((plan) => (
              <div key={plan.id} className={`plan-card ${selectedPlan?.id === plan.id ? 'selected' : ''}`}>
                <h3 className="plan-title">{plan.name}</h3>
                <p className="plan-details">
                  <strong>Links Per Month:</strong> {plan.url_limit}
                </p>
                <p className="plan-price">
                  <strong>Price:</strong> ₹{plan.price}
                </p>
                {!plan.free && (
                  <button
                    className="select-button"
                    onClick={() => handleSelectPlan(plan)}
                  >
                    {selectedPlan?.id === plan.id ? 'Selected' : 'Select Plan'}
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>Loading plans...</p>
          )}
        </div>
      </div>
      </div>

    </div>
  );
};

export default Plans;
