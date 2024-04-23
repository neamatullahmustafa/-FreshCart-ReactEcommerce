import React, { Fragment, useContext, useState } from "react";
import styles from './CheckOut.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import { cartContext } from "../../Context/CartContext";

export default function CheckOut() {
  let { payment } = useContext(cartContext);
    const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
    async function callPayment(dataReq) {
      let  {data}  = await payment(dataReq);
      console.log(data)
      window.location.href =data.session.url
    }

  const valForm = Yup.object({
    details: Yup.string()
      .min(10, "to short")
      .max(30, "to long")
      .required("is required"),
    city: Yup.string()
      .min(3, "to short")
      .max(10, "to long")
      .required("is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "not valid")
      .required("is required"),
  });
    const addForm = useFormik({
      initialValues: {
        details: "",
        phone: "",
        city: "",
      },
      onSubmit: callPayment,
      validationSchema: valForm,
    });
  return (
    <Fragment>
      <div className="container my-5">
        <div className="mx-auto bg-main-light p-5">
          <h2>Sapping Address</h2>

          <form onSubmit={addForm.handleSubmit} className="my-3">
            <label className="h5 mt-2" htmlFor="details">
              Details
            </label>
            <input
              type="text"
              className="form-control "
              id="details"
              onChange={addForm.handleChange}
              value={addForm.values.details}
              name="details"
              onBlur={addForm.handleBlur}
            ></input>
            {addForm.errors.details && addForm.touched.details ? (
              <div className="alert alert-danger">{addForm.errors.details}</div>
            ) : null}
            <label className="h5 mt-2" htmlFor="phone">
              Phone
            </label>
            <input
              type="tel"
              className="form-control "
              id="phone"
              onChange={addForm.handleChange}
              value={addForm.values.phone}
              name="phone"
              onBlur={addForm.handleBlur}
            ></input>
            {addForm.errors.phone && addForm.touched.phone ? (
              <div className="alert alert-danger">{addForm.errors.phone}</div>
            ) : null}
            <label className="h5 mt-2" htmlFor="city">
              City
            </label>
            <input
              type="text"
              className="form-control "
              id="city"
              onChange={addForm.handleChange}
              value={addForm.values.city}
              name="city"
              onBlur={addForm.handleBlur}
            ></input>
            {addForm.errors.city && addForm.touched.city ? (
              <div className="alert alert-danger">{addForm.errors.city}</div>
            ) : null}{" "}
            <button
              disabled={addForm.isSubmitting || !addForm.isValid}
              type="submit"
              className="btn bg-main px-3 mt-3 text-white ms-auto d-block"
            >
              {isLoading == true ? (
                <i className="fas fa-spin fa-spinner"></i>
              ) : (
                "pay naw"
              )}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
