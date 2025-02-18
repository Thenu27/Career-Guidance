// import React, { createContext, useEffect, useState } from 'react';
// import axios from 'axios';

// export const CsrfContext = createContext();

// export const CsrfProvider = ({ children }) => {
//     const [csrfToken, setCsrfToken] = useState('');

//     useEffect(() => {
//         axios.get('/api/get-csrf-token', { withCredentials: true })
//             .then((response) => {
//                 setCsrfToken(response.data.csrfToken || '');
//             })
//             .catch((error) => {
//                 console.error('Error fetching CSRF token:', error);
//             });
//     }, []);

//     return (
//         <CsrfContext.Provider value={csrfToken}>
//             {children}
//         </CsrfContext.Provider>
//     );
// };
