import React from "react";
import { useState } from "react";
import styles from "../../styles/auth.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import config from "../../config";
import Link from "next/link";
import { ErrorMessage, SuccessMessage } from "../../components/message";

const resetPassword = () => {
  const router = useRouter();
  const token = router.query["token"];
  const [data, setData] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(null);
  const [apiMessage, setApiMessage] = useState({
    success: "",
    error: ""
  });
  let [errors, setErrors] = useState({});

  const handleChange = (prop) => (event) => {
    setData((prevState) => ({
      ...prevState,
      [prop]: event.target.value,
    }));
  };

  const validateData = () => {
    let errors = {};
    if (data.newPassword.length < 8) {
      errors.newPassword = "8 character long password is required";
    }
    if (data.newPassword !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
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
      .post(`${config.backendUrl}${config.routes.changePassword}/${token}`, data)
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
    <div className={styles.pageContainer}>
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
      <form className={`${styles.form} mb-auto`}>
        <header className="mb-4">
          <h2 className="text-center mb-2">New Password</h2>
          <p className="text-center">Please Fill in Your New Password</p>
        </header>
        <div className="my-3">
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label small fw-bold"
          >
            New Password
          </label>
          <input
            type="password"
            value={data.newPassword}
            onChange={handleChange("newPassword")}
            className="form-control"
            id="exampleFormControlInput1"
          />
          <div className="small text-danger fw-light">
            {errors.newPassword}
          </div>
        </div>

        <div className="mb-3">
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label small fw-bold"
          >
            Confirm Password
          </label>
          <input
            type="password"
            value={data.confirmPassword}
            onChange={handleChange("confirmPassword")}
            className="form-control"
            id="exampleFormControlInput1"
          />
          <div className="small text-danger fw-light">
            {errors.confirmPassword}
          </div>
        </div>

        <div className="mb-3 mt-5 d-grid gap-2">
          <button
            type="button"
            disabled={isLoading}
            onClick={handleSubmit}
            className="btn btn-block btn-primary"
          >
            {isLoading ? "Submitting" : "Submit"}
          </button>
        </div>
        <div className="text-center">
          <Link href="/auth/login" className="text-success fw-bold ">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default resetPassword;
