import React, { Fragment, useState, useEffect } from "react";
import styles from "./CategoriesSlider.module.css";
import Slider from "react-slick";
import axios from "axios";

export default function CategoriesSlider() {
  const [cat, setCat] = useState([]);

  useEffect(() => {
    async function getCat() {
      try {
        const response = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/categories"
        );
        setCat(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    getCat();
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    prevArrow: null,
    nextArrow: null,
  };

  return (
    <Fragment>
      <h3>Shop Popular Categories</h3>
      <Slider {...settings}>
        {cat.map((item, index) => (
          <div key={index}>
            <img
              src={item.image}
              height={200}
              className="w-100"
              alt={`img${index + 1}`}
            />
            <p>{item.name
            }</p>
          </div>
        ))}
      </Slider>
    </Fragment>
  );
}
