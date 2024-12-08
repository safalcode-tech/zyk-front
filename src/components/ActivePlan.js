import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { formatDateWithAmPm } from '../utils/utils';

const ActivePlans = ({
  urlLimitShow,
  dailyUrlLimitShow,
  urlsRemainingTodayShow,
  urlsRemainingMonthShow,
  planNameShow,
  activationDateShow,
  expirationDateShow,
  daysRemainingShow,
}) => {
  const [urlLimit, setUrlLimit] = useState(null);
  const [dailyUrlLimit, setDailyUrlLimit] = useState(null);

  const [urlsRemainingToday, setUrlsRemainingToday] = useState(null);
  const [urlsRemainingMonth, setUrlsRemainingMonth] = useState(null);

  const [planName, setPlanName] = useState(null);
  const [activationDate, setActivationDate] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);
  const [daysRemaining, setDaysRemaining] = useState(null);

  const fetchMembershipPlan = async () => {
    try {
      const response = await api.get('/membership-plan');
      const {
        planName,
        urlLimit,
        dailyUrlLimit,
        urlsRemainingToday,
        urlsRemainingMonth,
        activationDate,
        expirationDate,
        daysRemaining,
      } = response.data;
      setUrlLimit(urlLimit);
      setDailyUrlLimit(dailyUrlLimit);
      setPlanName(planName);
      setActivationDate(activationDate);
      setExpirationDate(expirationDate);
      setDaysRemaining(daysRemaining);
      setUrlsRemainingToday(urlsRemainingToday);
      setUrlsRemainingMonth(urlsRemainingMonth);
    } catch (error) {
      console.error('Error fetching membership plan:', error);
    }
  };

  useEffect(() => {
    fetchMembershipPlan();
  }, []);

  return (
    <div className="plans-container">
      {/* Display the URL limit and remaining URLs */}
      {urlLimit !== null && (
        <div className="url-info">
          {planNameShow && <li>Plan Name: {planName}</li>}
          {activationDateShow && <li>Activation Date: {formatDateWithAmPm(activationDate)}</li>}
          {expirationDateShow && <li>Expiration Date Remaining: {formatDateWithAmPm(expirationDate)}</li>}
          {daysRemainingShow && <li>Days Remaining: {daysRemaining}</li>}
          {urlLimitShow && <li>URLs Monthly: {urlLimit}</li>}
          {dailyUrlLimitShow && <li>URLs Daily: {dailyUrlLimit}</li>}
          {urlsRemainingTodayShow && <li>URLs Remaining Today: {urlsRemainingToday}</li>}
          {urlsRemainingMonthShow && <li>URLs Remaining Month: {urlsRemainingMonth}</li>}
        </div>
      )}
    </div>
  );
};

export default ActivePlans;
