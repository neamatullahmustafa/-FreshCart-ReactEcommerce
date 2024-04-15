import React, { Fragment } from "react";
import { Navigate } from 'react-router-dom';


export default function ProtectedRoutes({ children }) {

 if (localStorage.getItem("userToken")!=null) {
 return children;
 } else {
   return <Navigate to="/Login" />;
 }
}
