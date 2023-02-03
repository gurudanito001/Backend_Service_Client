import React from "react";
import { useState } from "react";
import styles from "../../styles/auth.module.css";
import isEmail from "validator/lib/isEmail";
import Link from "next/link";
import axios from "axios";
import config from "../../config";
import { ErrorMessage, SuccessMessage } from "../../components/message";

const login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [resendingEmail, setResendingEmail] = useState(false);
  const [apiMessage, setApiMessage] = useState({
    success: "",
    error: ""
  });
  const [errors, setErrors] = useState({})

  const handleChange = (prop) => (event) => {
    setData((prevState) => ({
      ...prevState,
      [prop]: event.target.value,
    }));
    setErrors(prevState => ({
      ...prevState,
      [prop]: ""
    }))
  };

  const validateData = () => {
    let errors = {};
    if (data.password.length < 8) {
      errors.password = "8 character long password is required";
    }
    if (!isEmail(data.email)) {
      errors.email = "Valid email is required";
    }
    return errors;
  };

  const handleSetApiMessage = ({type, message}) =>{
    setApiMessage(prevState => ({
      ...prevState,
      success: "",
      error: ""
    }))
    setApiMessage(prevState => ({
      ...prevState,
      [type]: message
    }))
  }

  const postData = () => {
    setIsLoading(true);
    axios
      .post(`${config.backendUrl}${config.routes.login}`, data)
      .then((res) => {
        setIsLoading(false);
        handleSetApiMessage({type: "success", message: res?.data?.message})
        console.log(res.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        handleSetApiMessage({type: "error", message: error?.response?.data?.message || error?.message});
      });
  };

  const handleSubmit = () => {
    setErrors({});
    let result = validateData();
    if (Object.keys(result).length > 0) {
      return setErrors(result);
    }
    postData();
  };

  return (
    <div className={`${styles.pageContainer}`}>
      {apiMessage.success && 
        <SuccessMessage message={apiMessage.success} onClick={()=>handleSetApiMessage({type: "success", message: ""})} />
      }
      {apiMessage.error && 
        <ErrorMessage message={apiMessage.error} onClick={()=>handleSetApiMessage({type: "error", message: ""})} />
      }
      
      <header className="mt-auto text-center">
        <a className="navbar-brand fw-bold logoText fs-3 " href="/">
          Marlayer
        </a>
      </header>
      <form className={styles.form}>
        <header className="mb-4">
          <h2 className="text-center mb-2">Login</h2>
          <p className="text-center">Please Enter Your Email and Password</p>
        </header>
        
        <div className="my-3">
          <label
            htmlFor="loginEmailInput"
            className="form-label small fw-bold"
          >
            Email
          </label>
          <input
            type="email"
            value={data.email}
            onChange={handleChange("email")}
            className="form-control"
            id="loginEmailInput"
          />
          <div className="small text-danger fw-light">{errors.email}</div>
        </div>
        <div className="mb-3">
          <label
            htmlFor="loginPasswordInput"
            className="form-label small fw-bold"
          >
            Password
          </label>
          <input
            type="password"
            value={data.password}
            onChange={handleChange("password")}
            className="form-control"
            id="loginPasswordInput"
          />
          <div className="small text-danger fw-light">{errors.password}</div>
        </div>

        <div className="mb-3 mt-5 d-grid gap-2">
          <button
            type="button"
            disabled={isLoading}
            onClick={handleSubmit}
            className="btn btn-block btn-primary"
          >
            {isLoading ? "logging in" : "Login"}
          </button>
        </div>
        <div className="text-center">
          <Link href="/auth/forgotPassword" className="text-success fw-bold">
            Forgot Password
          </Link>
          <br />
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-success fw-bold ">
            Create Account
          </Link>
        </div>
      </form>

      {<div className={`d-flex flex-column align-items-center mx-auto mb-auto mt-3 ${apiMessage.error.toLowerCase() === "email not verified" ? "" : "invisible"}`} style={{width: "min(400px, 650px)"}}>
        Didn't Receive Verification Email?
        <button
          type="button"
          disabled={resendingEmail}
          onClick={()=>{}} 
          className="btn btn-link text-primary p-2">{resendingEmail ? "Sending Email ..." : "Resend Verification Email"}
        </button>
      </div>}
    </div>
  );
};

export default login;
