import { useState, useEffect } from 'react';

const useCashfreeSDK = () => {
  const [sdkLoaded, setSdkLoaded] = useState(false);

  useEffect(() => {
    // If already loaded, no need to load again
    if (window.cashfree) {
      setSdkLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://sdk.cashfree.com/js/ui/2.0.0/cashfree.js'; // Ensure this URL is correct per Cashfree docs
    script.async = true;
    script.onload = () => {
      console.log('Cashfree SDK loaded');
      setSdkLoaded(true);
    };
    script.onerror = () => {
      console.error('Error loading Cashfree SDK');
    };
    document.body.appendChild(script);
  }, []);

  return sdkLoaded;
};

export default useCashfreeSDK;
