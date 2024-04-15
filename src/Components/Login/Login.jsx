import React, { Fragment, useContext, useState } from "react";
import styles from './Login.module.css';

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let { setToken } = useContext(authContext);
  let navigate = useNavigate();
 function callLogin(dataReq) {
   setErrorMessage("");
   setIsLoading(true);

   axios
     .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, dataReq)
     .then((response) => {
       localStorage.setItem("userToken", response.data.token);
       setIsLoading(false);
       navigate("/Home");
       setToken(response.data.token);
     })
     .catch((err) => {
       setErrorMessage(err.response.data.message);
       setIsLoading(false);
     });
 }

  const valForm = Yup.object({
   
    email: Yup.string().email("not valid").required("is required"),
    password: Yup.string()
      .matches(/^[A-z][a-z0-9]{3,8}$/, "not valid")
      .required("is required"),
  
  });
  const logForm = useFormik({
    initialValues: {
     
      email: "",
      password: "",
   
    },
    onSubmit: callLogin,
    validationSchema: valForm,
  });
  return (
    <Fragment>
      <div className="w-50 m-auto my-5">
        <h1>Login Now :</h1>
        {errorMessage == "" ? null : (
          <div className="alert mb-3 alert-danger">{errorMessage}</div>
        )}
        <form onSubmit={logForm.handleSubmit}>
          <label htmlFor="email" className="my-1">
            Email:
          </label>
          <input
            type="email"
            onChange={logForm.handleChange}
            className="form-control"
            id="email"
            value={logForm.values.email}
            onBlur={logForm.handleBlur}
          />
          {logForm.errors.email && logForm.touched.email ? (
            <div className="alert mb-3 alert-danger">
              {logForm.errors.email}
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
            onChange={logForm.handleChange}
            value={logForm.values.password}
            onBlur={logForm.handleBlur}
          />
          {logForm.errors.password && logForm.touched.password ? (
            <div className="alert mb-3 alert-danger">
              {logForm.errors.password}
            </div>
          ) : null}
          <button
            disabled={logForm.isSubmitting || !logForm.isValid}
            type="submit"
            className="btn bg-main px-3 mt-3 text-white ms-auto d-block"
          >
            {isLoading == true ? (
              <i className="fas fa-spin fa-spinner"></i>
            ) : (
              "LogIn"
            )}
          </button>
        </form>
      </div>
    </Fragment>
  );
}
