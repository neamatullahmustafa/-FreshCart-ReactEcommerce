import React, { Fragment, useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [errorMessage,setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  async function callReg(dataReq) {
    setErrorMessage("");
    setIsLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, dataReq)
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setIsLoading(false);
      });
   navigate("/Login") ;
      setIsLoading(false);
  }
  const valForm = Yup.object({
    name: Yup.string()
      .min(3, "to short")
      .max(30, "to long")
      .required("is required"),
    email: Yup.string().email("not valid").required("is required"),
    password: Yup.string()
      .matches(/^[A-z][a-z0-9]{3,8}$/, "not valid")
      .required("is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password", "not matches")])
      .required("is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "not valid")
      .required("is required"),
  });
  const regForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: callReg,
    validationSchema: valForm,
  });
  return (
    <Fragment>
      <div className="w-50 m-auto my-5">
        <h1>Register Now :</h1>
        {errorMessage == "" ? null : (
          <div className="alert mb-3 alert-danger">{errorMessage}</div>
        )}
        <form onSubmit={regForm.handleSubmit}>
          <label htmlFor="name" className="my-1">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            onChange={regForm.handleChange}
            value={regForm.values.name}
            name="name"
            onBlur={regForm.handleBlur}
          />
          {regForm.errors.name && regForm.touched.name ? (
            <div className="alert mb-3 alert-danger">{regForm.errors.name}</div>
          ) : null}
          <label htmlFor="email" className="my-1">
            Email:
          </label>
          <input
            type="email"
            onChange={regForm.handleChange}
            className="form-control"
            id="email"
            value={regForm.values.email}
            onBlur={regForm.handleBlur}
          />
          {regForm.errors.email && regForm.touched.email ? (
            <div className="alert mb-3 alert-danger">
              {regForm.errors.email}
            </div>
          ) : null}
          <label htmlFor="password" className="my-1">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={regForm.handleChange}
            value={regForm.values.password}
            onBlur={regForm.handleBlur}
          />
          {regForm.errors.password && regForm.touched.password ? (
            <div className="alert mb-3 alert-danger">
              {regForm.errors.password}
            </div>
          ) : null}

          <label htmlFor="rePassword" className="my-1">
            RePassword:
          </label>
          <input
            type="password"
            value={regForm.values.rePassword}
            className="form-control "
            id="rePassword"
            name="rePassword"
            onChange={regForm.handleChange}
            onBlur={regForm.handleBlur}
          />
          {regForm.errors.rePassword && regForm.touched.rePassword ? (
            <div className="alert mb-3 alert-danger">
              {regForm.errors.rePassword}
            </div>
          ) : null}
          <label htmlFor="phone" className="my-1">
            phone:
          </label>
          <input
            type="tel"
            className="form-control "
            id="phone"
            onChange={regForm.handleChange}
            value={regForm.values.phone}
            name="phone"
            onBlur={regForm.handleBlur}
          />
          {regForm.errors.phone && regForm.touched.phone ? (
            <div className="alert alert-danger">{regForm.errors.phone}</div>
          ) : null}
          <button
            disabled={regForm.isSubmitting || !regForm.isValid}
            type="submit"
            className="btn bg-main px-3 mt-3 text-white ms-auto d-block"
          >
            {isLoading == true ? (
              <i className="fas fa-spin fa-spinner"></i>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </Fragment>
  );
}
