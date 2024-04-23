import React, { Fragment, useContext, useEffect, useState } from "react";
import styles from './HomeProducts.module.css';
import axios from "axios";
import { useQuery } from "react-query";
import { cartContext ,addToCart } from '../../Context/CartContext';
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function HomeProducts() {
    const [pro, setPro] = useState([]);
let { addToCart } = useContext(cartContext);
    // useEffect(() => {
    //   async function getPro() {
    //     try {
    //       const response = await axios.get(
    //         "https://ecommerce.routemisr.com/api/v1/products"
    //       );
    //       setPro(response.data.data);
    //       console.log(response.data.data);
    //     } catch (error) {
    //       console.error("Error fetching categories:", error);
    //     }
    //   }
    //   getPro();
  // }, []);
  function getPro() {
 return axios.get(
          "https://ecommerce.routemisr.com/api/v1/products"
          );

     }
  let {data, isLoading} = useQuery("homeProducts", getPro)
 async function addCart(id) {
   let res = await addToCart(id);
 localStorage.setItem("cartId", res.data.data._id);

  if (res?.data?.status == "success"){
    toast.success("Product add to cart") 
     
  }
  else {
    toast.error("product not add to cart")
  }
   console.log(res.data.data)
 }
  return (
    <Fragment>
      <h4>Products</h4>
      <div className="container">
        <div className="row row-cols-md-4  row-cols-sm-2 row-cols-lg-5">
          {data?.data?.data.map((item, index) => (
            <div key={index} className="product overflow-hidden"> <Link to={"/ProductDetails/"+item.id}>
              <img
                src={item.imageCover}
                height={200}
                className="w-100"
                alt={`img${index + 1}`}
              />
              <p className="text-main">{item.category.name}</p>
              <h3 className="h6">{item.title.slice(0, 50)}...</h3>
              <div className="d-flex justify-content-between">
                <p>{item.price}EGP</p>
                <p>
                  <i className="fa fa-star rating-color"></i>
                  {item.ratingsAverage}
                </p>
              </div></Link>
              <button onClick={()=>addCart(item.id)} className="btn bg-main text-white w-100">
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}
