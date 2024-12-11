import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { formatDateWithAmPm } from '../utils/utils';
import '../css/ActivePlans.css'; // Custom CSS for further styling

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
    <div className="container my-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white text-center py-3">
          <h3 className="mb-0">Active Membership Plan</h3>
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            {planNameShow && (
              <li className="list-group-item d-flex align-items-center">
                <i className="bi bi-card-text text-primary me-3"></i>
                <span>Plan Name:</span> <strong className="ms-auto">{planName}</strong>
              </li>
            )}
            {activationDateShow && (
              <li className="list-group-item d-flex align-items-center">
                <i className="bi bi-calendar2-plus text-success me-3"></i>
                <span>Activation Date:</span> <strong className="ms-auto">{formatDateWithAmPm(activationDate)}</strong>
              </li>
            )}
            {expirationDateShow && (
              <li className="list-group-item d-flex align-items-center">
                <i className="bi bi-calendar2-x text-danger me-3"></i>
                <span>Expiration Date:</span> <strong className="ms-auto">{formatDateWithAmPm(expirationDate)}</strong>
              </li>
            )}
            {daysRemainingShow && (
              <li className="list-group-item d-flex align-items-center">
                <i className="bi bi-hourglass-bottom text-warning me-3"></i>
                <span>Days Remaining:</span> <strong className="ms-auto">{daysRemaining}</strong>
              </li>
            )}
            {urlLimitShow && (
              <li className="list-group-item d-flex align-items-center">
                <i className="bi bi-globe text-info me-3"></i>
                <span>URLs Monthly:</span> <strong className="ms-auto">{urlLimit}</strong>
              </li>
            )}
            {dailyUrlLimitShow && (
              <li className="list-group-item d-flex align-items-center">
                <i className="bi bi-calendar3 text-secondary me-3"></i>
                <span>URLs Daily:</span> <strong className="ms-auto">{dailyUrlLimit}</strong>
              </li>
            )}
            {urlsRemainingTodayShow && (
              <li className="list-group-item d-flex align-items-center">
                <i className="bi bi-graph-up-arrow text-primary me-3"></i>
                <span>URLs Remaining Today:</span> <strong className="ms-auto">{urlsRemainingToday}</strong>
              </li>
            )}
            {urlsRemainingMonthShow && (
              <li className="list-group-item d-flex align-items-center">
                <i className="bi bi-bar-chart-line text-warning me-3"></i>
                <span>URLs Remaining This Month:</span> <strong className="ms-auto">{urlsRemainingMonth}</strong>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ActivePlans;
