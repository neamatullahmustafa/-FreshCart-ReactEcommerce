
import { createContext, useState } from "react";
import axios from 'axios';
let headers = {
    token: localStorage.getItem("userToken")
};
export let cartContext = createContext()
function addToCart(id) {
 return  axios
     .post(
       `https://ecommerce.routemisr.com/api/v1/cart`,
       {
         productId: id,
       },
       {
         headers,
       }
     )
     .then((res) => res)
     .catch((err) => err);
}
function deleteCartProducts() {
  return axios
    .delete(
      `https://ecommerce.routemisr.com/api/v1/cart/`,

      {
        headers,
      }
    )
    .then((res) => res)
    .catch((err) => err);
}
function deleteCartProduct(id) {
  return axios
    .delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,

      {
        headers,
      }
    )
    .then((res) => res)
    .catch((err) => err);
}
function updateCartProduct(id,count) {
  return axios
    .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {count},

      {
        headers,
      }
    )
    .then((res) => res)
    .catch((err) => err);
}
function getCart() {
  return axios
    .get(
      `https://ecommerce.routemisr.com/api/v1/cart`,

      {
        headers,
      }
    )
    .then((res) => res)
    .catch((err) => err);
} 
function payment(shippingAddress) {
  let id = localStorage.getItem("cartId");
  return axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,

      { shippingAddress },
      {
        headers,
      }
    )
    .then((res) => res)
    .catch((err) => err);
}
export default function CartContextProvider({ children }) {
    return (
      <cartContext.Provider
        value={{
          addToCart,
          getCart,
          deleteCartProduct,
          updateCartProduct,
          payment,
        }}
      >
        {children}
      </cartContext.Provider>
    );
}