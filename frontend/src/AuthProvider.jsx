/* eslint-disable */
// import { useState } from 'react';
// import AuthContext from './context/AuthContext';

// const AuthProvider = ({ children }) => {
//   const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('userId'));

//   const logIn = () => setLoggedIn(true);

//   const logOut = () => {
//     localStorage.removeItem('userId');
//     setLoggedIn(false);
//   };

//   const getAuthHeader = () => {
//     const userData = JSON.parse(localStorage.getItem('userId'));

//     return userData.token ? { Authorization: `Bearer ${userData.token}` } : {};
//   };

//   const value = {
//     loggedIn,
//     logIn,
//     logOut,
//     getAuthHeader,
//   };

//   return (
//     <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
//   );
// };

// export default AuthProvider;
