// import React, { useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import api from '../utils/api';

// const RedirectHandler = () => {
//   const { shortenedUrl } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchOriginalUrl = async () => {
//       try {
//         const response = await api.get(`/redirect/${shortenedUrl}`);
//         window.location.href = response.data.originalUrl;
//       } catch (error) {
//         console.error('Error resolving URL', error);
//         navigate('/');
//       }
//     };

//     fetchOriginalUrl();
//   }, [shortenedUrl, navigate]);

//   return;
// };

// export default RedirectHandler;
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const RedirectHandler = () => {
  const { shortenedUrl } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Forcefully hide the navbar
    document.body.classList.add('hide-navbar');
    
    const fetchOriginalUrl = async () => {
      try {
        const response = await api.get(`/redirect/${shortenedUrl}`);
        window.location.href = response.data.originalUrl;
      } catch (error) {
        console.error('Error resolving URL', error);
        navigate('/');
      }
    };

    fetchOriginalUrl();

    // Cleanup: Remove hide-navbar class when this component is unmounted
    return () => {
      document.body.classList.remove('hide-navbar');
    };
  }, [shortenedUrl, navigate]);

  return null;
};

export default RedirectHandler;
