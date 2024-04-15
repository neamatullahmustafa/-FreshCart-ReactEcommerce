import React ,{ Fragment } from 'react';
import styles from './Home.module.css';
import MainSlider from '../MainSlider/MainSlider';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import { Helmet } from 'react-helmet';
import Loading from '../Loading/Loading';
import HomeProducts from '../HomeProducts/HomeProducts';

export default function Home() {
  return (
    <section className="container">
      <Helmet>

        <title>Home</title>
       
      </Helmet>
      <MainSlider />

      <CategoriesSlider></CategoriesSlider>
      <HomeProducts></HomeProducts>
    </section>
  );
}
