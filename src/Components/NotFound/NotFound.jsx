import React from 'react';
import styles from './NotFound.module.css';
import notFoundImg from "../../Assets/images/error.svg";

export default function NotFound() {
  return (
    <div className="text-center my-5">
      <img className="w-25 py-5 " src={notFoundImg} alt="" />
    </div>
  );
}
