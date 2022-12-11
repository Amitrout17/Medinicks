import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../layout/loader/loader";
import { resetPasswordViaEmail } from "../../actions/userAction";
import "./ResetPassword.css";
import { Link } from "react-router-dom";

function ResetPassword() {
  const dispatch = useDispatch();
  const { token } = useParams();

  const loading = useSelector(
    (state) => state.resetPasswordViaEmailReducer.loading
  );

  const reducer = useSelector((state) => state.resetPasswordViaEmailReducer);

  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  var messageErr, sucess;

  const submitUpdatePassword = async (e) => {
    e.preventDefault();
    await dispatch(resetPasswordViaEmail(password, confirmPassword, token));
  };

  if (reducer) {
    messageErr = reducer.error;
    sucess = reducer.sucess;
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="reset_password_main">
          <div className="signup_heading">
            <div className="logo">
              <i className="fa-solid fa-mortar-pestle"></i>
              <h2>Medinicks</h2>
            </div>
          </div>
          <form onSubmit={submitUpdatePassword}>
            <h3>reset password</h3>
            <div className="reset_password">
              <div className="update_password_password">
                <i class="fa-solid fa-key"></i>
                <input
                  type="password"
                  placeholder="New password"
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                  required="true"
                ></input>
              </div>
              <div className="update_password_confirm_password">
                <i class="fa-solid fa-unlock"></i>
                <input
                  type="password"
                  placeholder="Confirm password"
                  onChange={(e) => {
                    setconfirmPassword(e.target.value);
                  }}
                  required="true"
                  minLength={5}
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
            </div>
          </form>
          {sucess ? <h4>password reset sucessfully</h4> : <h4>{messageErr}</h4>}
          {/*           {messageErr ? <h4>{messageErr}</h4> : ""}
           */}{" "}
          <Link to={"/"}>
            <button>Home</button>
          </Link>
        </div>
      )}
    </>
  );
}

export default ResetPassword;
