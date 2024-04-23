import React, { Fragment, useContext, useEffect } from "react";
import styles from './AllOrders.module.css';
import { cartContext } from "../../Context/CartContext";

export default function AllOrders() {
    let {deleteCartProducts} =
      useContext(cartContext);
  async function removeItem(id) {
    let res = await deleteCartProducts();
    console.log(res?.data);
    localStorage.removeItem("cartId");
  }
  useEffect(() => {
    removeItem();
  }, []);
  return <Fragment>
    <div className="container h1 text-success text-center p-5 m-5">
    congratulation
    </div>
  </Fragment>
}
