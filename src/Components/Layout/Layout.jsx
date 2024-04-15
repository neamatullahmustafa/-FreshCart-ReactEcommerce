import React, { Fragment } from 'react';
import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer';
export default function Layout() {
  return <Fragment>
  <Navbar/>
    <Outlet></Outlet>
    <Footer></Footer>
  </Fragment>
}
