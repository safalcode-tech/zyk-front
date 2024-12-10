// MyUrls.js
import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const MyUrls = () => {
  const [urls, setUrls] = useState([]); // Initialize as an empty array

  // Fetch the list of shortened URLs when the component mounts
  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await api.get('/urls');
        setUrls(response.data || []); // Safely set urls to an empty array if no data is returned
      } catch (error) {
        console.error('Error fetching URLs', error);
      }
    };

    fetchUrls();
  }, []);

  return (
    <div>
      <h3>Your Shortened URLs:</h3>
      {urls.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Original URL</th>
              <th>Shortened URL</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((item) => (
              <tr key={item.id}>
                <td>{item.original_url}</td>
                <td>{`${process.env.REACT_APP_APP_URL}/${item.shortened_url}`}</td>
                <td>{new Date(item.created_at).toLocaleString()}</td> {/* Format the date */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No URLs found.</p>
      )}
    </div>
  );
};

export default MyUrls;
