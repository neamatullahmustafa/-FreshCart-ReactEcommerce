import React, { Fragment, useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../Loading/Loading";
export default function Cart() {
  const [cartData, setCartData] = useState({});
  let { getCart, deleteCartProduct, updateCartProduct } =
    useContext(cartContext);
  async function getCartDetails(id) {
    let res = await getCart(id);
    console.log(res.data.numOfCartItems);
    setCartData(res.data);
  }
  async function countItem(id, count) {
    if ((count == 0)) {
      removeItem(id);
    } else {
      let res = await updateCartProduct(id, count);
      setCartData(res.data);
    }
  }
  async function removeItem(id) {
    let res = await deleteCartProduct(id);
    console.log(res.data);
    setCartData(res.data);
  }
  useEffect(() => {
    getCartDetails();
  }, []);
  return (
    <Fragment>
      <div className="container my-5">
        {cartData.data ? (
          <div className="mx-auto bg-main-light p-5">
            <h2>Cart Shop</h2>
            <div className="d-flex justify-content-between">
              <h3 className="h5">
                total price:
                <span className="text-main">
                  {cartData.data?.totalCartPrice} EGP
                </span>
              </h3>
              <h3 className="h5">
                total cart item:
                <span className="text-main">{cartData.numOfCartItems}</span>
              </h3>
            </div>
            {cartData.data.numOfCartItems != 0 ? (
              cartData.data.products.map((ele) => (
                <div
                  key={ele.product._id}
                  className="row py-2 border-bottom-2 "
                >
                  <div className="col-md-1">
                    <img
                      src={ele.product.imageCover}
                      className="w-100"
                      alt=""
                    ></img>
                  </div>
                  <div className="col-md-11">
                    <div className="d-flex  justify-content-between">
                      <div>
                        {" "}
                        <h4 className="">{ele.product.title} </h4>
                        <p>{ele.price}EGP</p>
                        <button
                          onClick={() => removeItem(ele.product._id)}
                          className="text-danger btn"
                        >
                          <i className="fa fa-trash"></i>Delete
                        </button>
                      </div>
                      <div className=" mt-3">
                        <button
                          onClick={() =>
                            countItem(ele.product._id, ele.count - 1)
                          }
                          className="btn main-btn"
                        >
                          -
                        </button>
                        <span>{ele.count}</span>
                        <button
                          className="btn main-btn"
                          onClick={() =>
                            countItem(ele.product._id, ele.count + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center h1 m-5 p-5">no product yet</p>
            )}
          </div>
        ) : (
          <Loading></Loading>
        )}
      </div>
    </Fragment>
  );
}
