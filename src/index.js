import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AuthContextProvider from "./Context/AuthContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import CartContextProvider from "./Context/CartContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
let reactQuery =new QueryClient();
root.render(
  <CartContextProvider>
  <QueryClientProvider client={reactQuery}>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </QueryClientProvider></CartContextProvider>
);
