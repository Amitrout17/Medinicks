import React from "react";
import { useState } from "react";
import "./ForgetPassword.css";
import { useDispatch, useSelector } from "react-redux";
import { forgotUserPassword } from "../../actions/userAction";
import Loader from "../layout/loader/loader";

function ForgetPassword() {
  const dispatch = useDispatch();

  const [userEmail, setuserEmail] = useState("");
  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotUserPassword(userEmail));
  };

  const loading = useSelector((state) => state.passwordReset.loading);
  const sucess=useSelector((state)=>state.passwordReset.sucess)
  const error=useSelector((state)=>state.passwordReset.error)
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="forgetPassword_main">
          <div className="signup_heading">
            <div className="logo">
              <i className="fa-solid fa-mortar-pestle"></i>
              <h2>Medinicks</h2>
            </div>
          </div>
          <h3>forgot password</h3>
          <div className="forget_password">
            <form onSubmit={forgotPasswordSubmit}>
              <div>
                <i class="fa-solid fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Enter Profile Email"
                  onChange={(e) => {
                    setuserEmail(e.target.value);
                  }}
                  required="true"
                ></input>
              </div>
              <input
                type="submit"
                submit
                style={{
                  background: "white",
                  border: "none",
                  width: "97%",
                  marginTop: "11px",
                  borderRadius: "6px",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  height: "24px",
                  cursor: "pointer",
                }}
              ></input>
            </form>
          </div>
          {sucess?(<h4>Reset Password Link has been send your mail</h4>):("")}
          {error?(<h4>{error}</h4>):("")}
        </div>
      )}
    </>
  );
}

export default ForgetPassword;
