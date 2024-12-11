// // MyUrls.js
// import React, { useState, useEffect } from 'react';
// import api from '../utils/api';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

// const MyUrls = () => {
//   const [urls, setUrls] = useState([]); // Initialize as an empty array

//   // Fetch the list of shortened URLs when the component mounts
//   useEffect(() => {
//     const fetchUrls = async () => {
//       try {
//         const response = await api.get('/urls');
//         setUrls(response.data || []); // Safely set urls to an empty array if no data is returned
//       } catch (error) {
//         console.error('Error fetching URLs', error);
//       }
//     };

//     fetchUrls();
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h3 className="mb-4">Your Shortened URLs:</h3>
//       {urls.length > 0 ? (
//         <table className="table table-striped table-bordered">
//           <thead className="thead-dark">
//             <tr>
//               <th>Original URL</th>
//               <th>Shortened URL</th>
//               <th>Created At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {urls.map((item) => (
//               <tr key={item.id}>
//                 <td>{item.original_url}</td>
//                 <td>
//                   <a href={`${process.env.REACT_APP_APP_URL}/${item.shortened_url}`} target="_blank" rel="noopener noreferrer">
//                     {`${process.env.REACT_APP_APP_URL}/${item.shortened_url}`}
//                   </a>
//                 </td>
//                 <td>{new Date(item.created_at).toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p className="text-muted">No URLs found.</p>
//       )}
//     </div>
//   );
// };

// export default MyUrls;
import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import { Helmet } from 'react-helmet';

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

  // Function to fetch meta data from original URL
  const fetchMetaData = async (originalUrl) => {
    try {
      const response = await api.get(`/meta-data?url=${encodeURIComponent(originalUrl)}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching meta data', error);
      return {};
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Your Shortened URLs:</h3>
      {urls.length > 0 ? (
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
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
                <td>
                  <a
                    href={`${process.env.REACT_APP_APP_URL}/${item.shortened_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={async () => {
                      const metaData = await fetchMetaData(item.original_url);
                      if (metaData) {
                        // Dynamically update the meta tags using Helmet
                        <Helmet>
                          <meta property="og:title" content={metaData.title || 'Default Title'} />
                          <meta property="og:description" content={metaData.description || 'Default Description'} />
                          <meta property="og:image" content={metaData.image || 'default-image-url'} />
                        </Helmet>;
                      }
                    }}
                  >
                    {`${process.env.REACT_APP_APP_URL}/${item.shortened_url}`}
                  </a>
                </td>
                <td>{new Date(item.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-muted">No URLs found.</p>
      )}
    </div>
  );
};

export default MyUrls;
