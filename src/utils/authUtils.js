
export const isUserLoggedIn = () => {
    const token = localStorage.getItem('token');
    return token !== null; // Returns true if token exists, false otherwise
  };