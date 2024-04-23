import React, { Fragment, useContext } from "react";
import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";import Slider from "react-slick";
import { useQuery } from "react-query";
import Loading from '../Loading/Loading';
import { cartContext, addToCart } from "../../Context/CartContext";
import toast from "react-hot-toast";
export default function ProductDetails() {
  let { addToCart } = useContext(cartContext);
  let { id } = useParams();
  let { data, isLoading } = useQuery("productDetails", () => getProDtls(id));
  function getProDtls(id) {
     return axios.get("https://ecommerce.routemisr.com/api/v1/products/"+id);
   }var settings = {
     dots: true,
     infinite: true,
     speed: 500,
     slidesToShow: 1,
     slidesToScroll: 1,
     prevArrow: null,
     nextArrow: null,
   };
  async function addCart(id) {
    let res = await addToCart(id);
    if (res.data.status == "success") {
      toast.success("Product add to cart");
    } else {
      toast.error("product not add to cart");
    }
  }
  return (
    <Fragment>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="container mb-5">
          {" "}
          <h2>ProductDetails</h2>
          <div className="row align-items-center">
            <div className="col-md-4 ">
              <Slider {...settings}>
                {data?.data?.data?.images.map((item, index) => (
                  <div key={index}>
                    <img src={item} className="w-100" alt={`img${index + 1}`} />
                    <p>{item.name}</p>
                  </div>
                ))}
              </Slider>
            </div>
            <div className="col-md-8">
              {" "}
              <p className="text-main">{data?.data?.data?.category.name}</p>
              <h3>{data?.data?.data?.title}</h3>
              <div className="d-flex justify-content-between">
                <p>{data?.data?.data?.price}EGP</p>
                <p>
                  <i className="fa fa-star rating-color"></i>
                  {data?.data?.data?.ratingsAverage}
                </p>
              </div>
              <button
                onClick={() => addCart(data?.data?.data?.id)}
                className="btn bg-main text-white w-100"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
