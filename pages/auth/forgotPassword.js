import styles from "../../styles/auth.module.css";
import { useState } from "react";
import isEmail from "validator/lib/isEmail";
import config from "../../config";
import axios from "axios";
import Link from "next/link";
import { ErrorMessage, SuccessMessage } from "../../components/message";


const forgotPasword = () => {
  const [data, setData] = useState({
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
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
    setErrors(prevState => ({
      ...prevState,
      [prop]: ""
    }))
  };

  const validateData = () => {
    let errors = {};
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
      .post(`${config.backendUrl}${config.routes.forgotPassword}`, data)
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
          <h2 className="text-center mb-2">Forgot Password</h2>
          <p className="text-center">Please Enter Your Email</p>
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

        <div className="mb-3 mt-5 d-grid gap-2">
          <button
            type="button"
            disabled={isLoading}
            onClick={handleSubmit}
            className="btn btn-block btn-primary"
          >
            {isLoading ? "Sending Email" : "Continue"}
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

export default forgotPasword;
