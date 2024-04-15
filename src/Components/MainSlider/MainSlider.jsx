import React, { Fragment, useEffect, useRef } from "react";
import styles from "./MainSlider.module.css";
import img1 from "../../Assets/images/slider-image-1.jpeg";
import img2 from "../../Assets/images/slider-image-2.jpeg";
import img3 from "../../Assets/images/slider-image-3.jpeg";
import Slider from "react-slick";

export default function MainSlider() {
  const sliderRef = useRef(null);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev = sliderRef.current.slickNext = () => {};
    }
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: null,
    nextArrow: null,
  };

  return (
    <header>
      <div className="container  row mb-4 ">
        <Slider ref={sliderRef} className="col-8 header p-0" {...settings}>
          <div>
            <img src={img1} alt="img1"></img>
          </div>
          <div>
            <img src={img2} alt="img2"></img>
          </div>
          <div>
            <img src={img3} alt="img3"></img>
          </div>
        </Slider>
        <div className="col-4 header1 p-0">
          <img src={img2} alt="img4"></img>
          <img src={img3}  alt="img5"></img>
        </div>
      </div>
    </header>
  );
}
