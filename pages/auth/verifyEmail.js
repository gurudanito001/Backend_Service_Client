import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/auth.module.css";
import isEmail from "validator/lib/isEmail";
import axios from "axios";
import config from "../../config";
import { ErrorMessage, SuccessMessage, SuccessIcon } from "../../components/message";



const confirmEmail = () => {
  const router = useRouter();
  const token = router.query["token"];
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({})
  const [verifyingToken, setVerifyingToken] = useState(false);
  const [resendingEmail, setResendingEmail] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [apiMessage, setApiMessage] = useState({
    success: "",
    error: ""
  });

  useEffect(()=>{
    if(token){
      verifyToken()
    }
  }, [token])

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

  

  const resendVerificationEmail = () =>{
    console.log(email)
    if(!isEmail(email)){
      return setErrors( prevState =>({
        ...prevState,
        email: "Email is not valid"
      }))
    }
    setResendingEmail(true);
    axios
      .post(`${config.backendUrl}${config.routes.resendVerificationEmail}/${email}`)
      .then((res) => {
        setResendingEmail(false);
        handleSetApiMessage({type: "success", message: res?.data?.message})
        console.log(res.data);
      })
      .catch((error) => {
        setResendingEmail(false);
        console.log(error);
        handleSetApiMessage({type: "error", message: error?.response?.data?.message || error?.message});
      });
  }

  const verifyToken = () => {
    setVerifyingToken(true);
    axios
      .get(`${config.backendUrl}${config.routes.confirmEmail}/${token}`)
      .then((res) => {
        setVerifyingToken(false);
        handleSetApiMessage({type: "success", message: res?.data?.message})
        console.log(res.data);
      })
      .catch((error) => {
        setVerifyingToken(false);
        console.log(error);
        handleSetApiMessage({type: "error", message: error?.response?.data?.message || error?.message});
      });
  };
  return (
    <div className={`${styles.pageContainer}`}>
      {apiMessage.success &&
        <SuccessMessage message={apiMessage.success} onClick={() => handleSetApiMessage({ type: "success", message: "" })} />
      }
      {apiMessage.error &&
        <ErrorMessage message={apiMessage.error} onClick={() => handleSetApiMessage({ type: "error", message: "" })} />
      }

      <header className="mt-auto text-center">
        <a className="navbar-brand fw-bold logoText fs-3 " href="/">
          Marlayer
        </a>
      </header>
      <form className={styles.form}>
        <header className="mb-4">
          <h2 className="text-center mb-2">Verify Email</h2>
        </header>

        {verifyingToken &&
        <div>
          <p className="text-center">Verifying Token ...</p>
        </div>}

        {showEmailInput &&
        <div className="my-3 d-flex flex-column">
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label small fw-bold text-left"
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(event)=>{
              setErrors(prevState=> ({
                ...prevState,
                email: ""
              }))
              setEmail(event.target.value)
            }}
            className="form-control"
            id="exampleFormControlInput1"
          />
          <div className="small text-danger fw-light">{errors.email}</div>

          <button
            type="button"
            disabled={resendingEmail}
            onClick={resendVerificationEmail}
            className="btn btn-primary mt-4 mx-auto">{resendingEmail ? "Sending Email ..." : "Resend Verification Email"}
          </button>
        </div>}

        {apiMessage.success &&
        <div className="text-center">
          <p><SuccessIcon /> Email Verification Successful</p>
          <a
            href="/auth/login"
            onClick={() => { }}
            className="btn btn-link text-primary p-2">
              Login
          </a>
        </div>}

      </form>

      {<div className={`d-flex flex-column align-items-center mx-auto mb-auto mt-3 ${apiMessage.error.toLowerCase() === "jwt expired" ? "" : "invisible"}`} style={{ width: "min(400px, 650px)" }}>
        JWT Token Expired?
        <button
          type="button"
          disabled={resendingEmail}
          onClick={() => setShowEmailInput(true)}
          className="btn btn-link text-primary p-2"> 
          Resend Verification Email
        </button>
      </div>}
    </div>
  );
};

export default confirmEmail;
