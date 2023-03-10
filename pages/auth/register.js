import styles from "../../styles/auth.module.css";
import isEmail from "validator/lib/isEmail";
import axios from "axios";
import Link from "next/link";
import config from "../../config";
import { ErrorMessage, SuccessMessage } from "../../components/message";

import { useState } from "react";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    description: "",
    multi_tenant: false,
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

  const handleChangeSwitch = () => {
    setData((prevState) => ({
      ...prevState,
      multi_tenant: !prevState?.multi_tenant,
    }));
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

  const validateData = () => {
    let errors = {};
    if (!data.name) {
      errors.name = "Application/Project Name is Required";
    }
    if (data.password.length < 8) {
      errors.password = "8 character long password is required";
    }
    if (!data.description) {
      errors.description = "Description is required";
    }
    if (!isEmail(data.email)) {
      errors.email = "Valid email is required";
    }

    return errors;
  };

  const postData = () => {
    setIsLoading(true);
    axios
      .post(`${config.backendUrl}${config.routes.register}`, data)
      .then((res) => {
        setIsLoading(false);
        handleSetApiMessage({type: "success", message: res.data.message})
        console.log(res.data);
      })
      .catch((error) => {
        setIsLoading(false);
        handleSetApiMessage({type: "error", message: error?.response?.data?.message || error?.message});
        console.log(error);
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
          <h2 className="text-center mb-2">Register</h2>
          <p className="text-center">Please Fill the Form Below</p>
        </header>

        <div className="mb-3">
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label small fw-bold"
          >
            Application Name
          </label>
          <input
            type="text"
            value={data.name}
            onChange={handleChange("name")}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Name of Application / Project"
          />
          <div className="small text-danger fw-light">{errors.name}</div>
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleFormControlTextarea1"
            className="form-label small fw-bold"
          >
            Description
          </label>
          <textarea
            value={data.description}
            onChange={handleChange("description")}
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
          <div className="small text-danger fw-light">
            {errors.description}
          </div>
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            value={data.multi_tenant}
            onChange={handleChangeSwitch}
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
          />
          <label
            className="form-check-label small fw-bold"
            htmlFor="flexSwitchCheckChecked"
          >
            Multi-User
          </label>
          <div className="small text-danger fw-light">
            {errors.multi_tenant}
          </div>
        </div>
        {data.multi_tenant ? (
          <div className={styles.smallFont}>
            Your Frontend Application will have more than one user. It will
            require User Authentication flow.
          </div>
        ) : (
          <div className={styles.smallFont}>
            Your Frontend Application does not require multi-user access.
            There is no need for User Authentication.
          </div>
        )}

        <div className="my-3">
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label small fw-bold"
          >
            Email
          </label>
          <input
            type="email"
            value={data.email}
            onChange={handleChange("email")}
            className="form-control"
            id="exampleFormControlInput1"
          />
          <div className="small text-danger fw-light">{errors.email}</div>
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label small fw-bold"
          >
            Password
          </label>
          <input
            type="password"
            value={data.password}
            onChange={handleChange("password")}
            className="form-control"
            id="exampleFormControlInput1"
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
            {isLoading ? "Registering" : "Register"}
          </button>
        </div>
        <div className="text-center">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-success fw-bold ">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
