// useAuth.js (or useAuth.ts for TypeScript)

import { useState, useEffect } from 'react';
import { isUserLoggedIn } from '../utils/authUtils';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    setIsLoggedIn(isUserLoggedIn());
  }, []);

  return isLoggedIn;
};

export default useAuth;
