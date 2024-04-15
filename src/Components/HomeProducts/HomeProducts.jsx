import React, { Fragment, useEffect, useState } from "react";
import styles from './HomeProducts.module.css';
import axios from "axios";

export default function HomeProducts() {
    const [pro, setPro] = useState([]);

    useEffect(() => {
      async function getPro() {
        try {
          const response = await axios.get(
            "https://ecommerce.routemisr.com/api/v1/products"
          );
          setPro(response.data.data);
          console.log(response.data.data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      }
      getPro();
    }, []);

  return (
    <Fragment>
      <h4>Products</h4>
      <div className="container">
        <div className="row row-cols-md-4  row-cols-sm-2 row-cols-lg-5">
          {pro.map((item, index) => (
            <div key={index} className="product overflow-hidden">
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
              </div>
              <button className="btn bg-main text-white w-100">
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}
